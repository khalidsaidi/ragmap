#!/usr/bin/env bash
# Simulate ~20 different users hitting RAGMap in different ways.
# Usage: API_BASE_URL=https://ragmap-api.web.app ./scripts/tests-20-users.sh
set -euo pipefail

BASE="${API_BASE_URL:-https://ragmap-api.web.app}"
BASE="${BASE%/}"
FAILED=0
OK=0

run() {
  local label="$1"
  shift
  local code
  code=$(curl -sS -o /tmp/ragmap_20u_out -w "%{http_code}" "$@")
  if [[ "$code" =~ ^(200|201)$ ]]; then
    echo "  OK [$code] $label"
    ((OK+=1))
    return 0
  else
    echo "  FAIL [$code] $label"
    ((FAILED+=1))
    cat /tmp/ragmap_20u_out 2>/dev/null | head -5
    return 1
  fi
}

run_404() {
  local label="$1"
  shift
  local code
  code=$(curl -sS -o /tmp/ragmap_20u_out -w "%{http_code}" "$@")
  if [[ "$code" = "404" ]]; then
    echo "  OK [404 expected] $label"
    ((OK+=1))
    return 0
  else
    echo "  FAIL [got $code, expected 404] $label"
    ((FAILED+=1))
    return 1
  fi
}

run_401() {
  local label="$1"
  shift
  local code
  code=$(curl -sS -o /tmp/ragmap_20u_out -w "%{http_code}" "$@")
  if [[ "$code" = "401" ]]; then
    echo "  OK [401 expected] $label"
    ((OK+=1))
    return 0
  else
    echo "  FAIL [got $code, expected 401] $label"
    ((FAILED+=1))
    return 1
  fi
}

# Accept 200 or 302 (e.g. browse can 302 to self on some hosting)
run_200_or_302() {
  local label="$1"
  shift
  local code
  code=$(curl -sS -o /tmp/ragmap_20u_out -w "%{http_code}" "$@")
  if [[ "$code" = "200" || "$code" = "302" ]]; then
    echo "  OK [$code] $label"
    ((OK+=1))
    return 0
  else
    echo "  FAIL [$code] $label"
    ((FAILED+=1))
    return 1
  fi
}

run_302() {
  local label="$1"
  shift
  local code
  code=$(curl -sS -o /tmp/ragmap_20u_out -w "%{http_code}" "$@")
  if [[ "$code" = "302" ]]; then
    echo "  OK [302 redirect] $label"
    ((OK+=1))
    return 0
  else
    echo "  FAIL [got $code, expected 302] $label"
    ((FAILED+=1))
    return 1
  fi
}

echo "=== 20-user simulation: $BASE ==="
echo ""

echo "--- 1. Health / ops ---"
run "User 1: Health check" "$BASE/health"
run "User 2: Readiness" "$BASE/readyz"
run "User 3: Agent discovery" "$BASE/.well-known/agent.json"
echo ""

echo "--- 2. Registry (list, versions, latest) ---"
run "User 4: List servers (limit=5)" "$BASE/v0.1/servers?limit=5"
# Get first server name for later (may contain /)
FIRST_NAME=$(jq -r '.servers[0].server.name // empty' /tmp/ragmap_20u_out)
if [[ -z "$FIRST_NAME" ]]; then
  FIRST_NAME=$(jq -r '.servers[0].name // empty' /tmp/ragmap_20u_out)
fi
if [[ -n "$FIRST_NAME" ]]; then
  ENC=$(node -e "console.log(encodeURIComponent(process.argv[1]))" "$FIRST_NAME")
  run "User 5: Server versions (encoded name)" "$BASE/v0.1/servers/${ENC}/versions"
  run "User 6: Latest version" "$BASE/v0.1/servers/${ENC}/versions/latest"
else
  echo "  SKIP (no server name) User 5, 6"
fi
run "User 7: List with cursor (paginate)" "$BASE/v0.1/servers?limit=2"
echo ""

echo "--- 3. Search (different intents) ---"
run "User 8: Search 'rag' default" "$BASE/rag/search?q=rag&limit=5"
run "User 9: Search 'code' (semantic-style)" "$BASE/rag/search?q=code&limit=5"
run "User 10: Search 'mcp'" "$BASE/rag/search?q=mcp&limit=3"
run "User 11: Search with limit=1" "$BASE/rag/search?q=search&limit=1"
run "User 12: Search limit=24 (browse-style)" "$BASE/rag/search?q=rag&limit=24"
run "User 13: Search with minScore=10" "$BASE/rag/search?q=rag&minScore=10&limit=5"
run "User 14: Search categories filter" "$BASE/rag/search?q=rag&categories=developer-tools&limit=3"
echo ""

echo "--- 4. Search filters (capabilities) ---"
run "User 15: hasRemote=true" "$BASE/rag/search?q=rag&hasRemote=true&limit=5"
run "User 16: reachable=true" "$BASE/rag/search?q=rag&reachable=true&limit=3"
run "User 17: citations=true" "$BASE/rag/search?q=rag&citations=true&limit=3"
run "User 18: localOnly=true" "$BASE/rag/search?q=rag&localOnly=true&limit=3"
run "User 19: Combined filters" "$BASE/rag/search?q=rag&hasRemote=true&limit=10"
echo ""

echo "--- 5. Categories + explain ---"
run "User 20: Categories list" "$BASE/rag/categories"
if [[ -n "$ENC" ]]; then
  run "Explain score for first server" "$BASE/rag/servers/${ENC}/explain"
fi
echo ""

echo "--- 6. Browse UI & static pages ---"
run_200_or_302 "Browse page" "$BASE/browse/"
run "RAG demo page" "$BASE/rag-demo/"
run "OpenAPI docs" "$BASE/docs"
run "Root serves landing" "$BASE/"
echo ""

echo "--- 7. Edge cases & security ---"
run_404 "Non-existent server versions" "$BASE/v0.1/servers/nonexistent%2Ffake%2Fserver/versions"
run_404 "Non-existent explain" "$BASE/rag/servers/nonexistent%2Ffake/explain"
run_401 "Ingest without token" "-X" "POST" "$BASE/internal/ingest/run" "-H" "Content-Type: application/json" "-d" '{"mode":"incremental"}'
run_401 "Ingest wrong token" "-X" "POST" "$BASE/internal/ingest/run" "-H" "Content-Type: application/json" "-H" "X-Ingest-Token: wrong" "-d" '{"mode":"incremental"}'
echo ""

echo "--- 8. Response shape (search) ---"
run "Search returns results array + metadata" "$BASE/rag/search?q=rag&limit=2"
jq -e '.results | type == "array"' /tmp/ragmap_20u_out >/dev/null && echo "  OK shape: .results array" || { echo "  FAIL shape"; ((FAILED+=1)); }
jq -e '.results[0] | has("name") and has("ragScore")' /tmp/ragmap_20u_out >/dev/null 2>/dev/null && echo "  OK shape: result has name, ragScore" || true
echo ""

echo "=== Summary: $OK passed, $FAILED failed ==="
if [[ "$FAILED" -gt 0 ]]; then
  exit 1
fi
exit 0
