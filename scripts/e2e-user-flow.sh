#!/usr/bin/env bash
# E2E test as a real user: health, search, filters, browse-style request, get server, explain.
# Usage: API_BASE_URL=https://ragmap-api.web.app ./scripts/e2e-user-flow.sh
# Or against local: API_BASE_URL=http://localhost:3001 ./scripts/e2e-user-flow.sh
set -euo pipefail

BASE="${API_BASE_URL:-https://ragmap-api.web.app}"
BASE="${BASE%/}"

echo "=== E2E User flow: $BASE ==="

echo "1. Health"
curl -sS "$BASE/health" | jq -e '.status == "ok"'
echo "   embeddings: $(curl -sS "$BASE/health" | jq -r '.embeddings')"

echo "2. Search (default)"
n=$(curl -sS "$BASE/rag/search?q=rag&limit=5" | jq -r '.results | length')
test "$n" -ge 1 && echo "   results: $n" || (echo "   FAIL: no results"; exit 1)

echo "3. Search (hasRemote=true)"
n=$(curl -sS "$BASE/rag/search?q=rag&hasRemote=true&limit=10" | jq -r '.results | length')
echo "   remote-only results: $n"

echo "4. Search (minScore=20)"
n=$(curl -sS "$BASE/rag/search?q=rag&minScore=20&limit=5" | jq -r '.results | length')
echo "   minScore results: $n"

echo "5. Categories"
cats=$(curl -sS "$BASE/rag/categories" | jq -r '.categories | length')
test "$cats" -ge 1 && echo "   categories: $cats" || (echo "   FAIL"; exit 1)

echo "6. Get first server name and fetch latest"
name=$(curl -sS "$BASE/rag/search?q=rag&limit=1" | jq -r '.results[0].name')
enc=$(node -e "console.log(encodeURIComponent(process.argv[1]))" "$name")
curl -sS "$BASE/v0.1/servers/$enc/versions/latest" | jq -e '.server.name != null'
echo "   server: $name"

echo "7. Explain score"
curl -sS "$BASE/rag/servers/$enc/explain" | jq -e '.ragScore >= 0'
echo "   explain: OK"

echo "8. Browse-style request (what the UI sends)"
body=$(curl -sS "$BASE/rag/search?q=rag&limit=24&hasRemote=true")
n=$(echo "$body" | jq -r '.results | length')
echo "$body" | jq -e '.results[0] | has("name") and has("ragScore")' >/dev/null
echo "   browse-style results: $n, shape OK"

echo "9. Optional filters (reachable, citations, localOnly)"
curl -sS "$BASE/rag/search?q=rag&reachable=true&limit=2" | jq -r '.results | length' | xargs -I{} echo "   reachable=true: {} results"
curl -sS "$BASE/rag/search?q=rag&citations=true&limit=2" | jq -r '.results | length' | xargs -I{} echo "   citations=true: {} results"
curl -sS "$BASE/rag/search?q=rag&localOnly=true&limit=2" | jq -r '.results | length' | xargs -I{} echo "   localOnly=true: {} results"

echo ""
echo "=== E2E user flow: OK ==="
