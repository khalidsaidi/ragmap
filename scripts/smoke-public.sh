#!/usr/bin/env bash
set -euo pipefail

API_BASE_URL="${API_BASE_URL:-https://ragmap-api.web.app}"
API_BASE_URL="${API_BASE_URL%/}"

health_body="$(mktemp)"
ready_body="$(mktemp)"
agent_body="$(mktemp)"
servers_body="$(mktemp)"
versions_body="$(mktemp)"
latest_body="$(mktemp)"
categories_body="$(mktemp)"
search_body="$(mktemp)"
ingest_body="$(mktemp)"

cleanup() {
  rm -f "$health_body" "$ready_body" "$agent_body" "$servers_body" "$versions_body" "$latest_body" "$categories_body" "$search_body" "$ingest_body"
}
trap cleanup EXIT

code=$(curl -sS -o "$health_body" -w "%{http_code}" "${API_BASE_URL}/health")
test "$code" = "200"
jq -e '.status == "ok"' "$health_body" >/dev/null

code=$(curl -sS -o "$ready_body" -w "%{http_code}" "${API_BASE_URL}/readyz")
test "$code" = "200"

code=$(curl -sS -o "$agent_body" -w "%{http_code}" "${API_BASE_URL}/.well-known/agent.json")
test "$code" = "200"
jq -e '.name == "RAGMap"' "$agent_body" >/dev/null

code=$(curl -sS -o "$servers_body" -w "%{http_code}" "${API_BASE_URL}/v0.1/servers?limit=3")
test "$code" = "200"
jq -e '.servers | type == "array"' "$servers_body" >/dev/null

count=$(jq -r '.servers | length' "$servers_body")
if [[ "$count" -lt 1 ]]; then
  echo "Expected at least 1 server in registry listing" >&2
  cat "$servers_body" >&2
  exit 1
fi

name="$(jq -r '.servers[0].server.name // empty' "$servers_body")"
if [[ -z "$name" ]]; then
  echo "Failed to read first server name from /v0.1/servers" >&2
  cat "$servers_body" >&2
  exit 1
fi

encoded="$(node -e "console.log(encodeURIComponent(process.argv[1] || ''))" "$name")"

code=$(curl -sS -o "$versions_body" -w "%{http_code}" "${API_BASE_URL}/v0.1/servers/${encoded}/versions")
test "$code" = "200"
jq -e '.servers | length >= 1' "$versions_body" >/dev/null

code=$(curl -sS -o "$latest_body" -w "%{http_code}" "${API_BASE_URL}/v0.1/servers/${encoded}/versions/latest")
test "$code" = "200"
jq -e --arg n "$name" '.server.name == $n' "$latest_body" >/dev/null

code=$(curl -sS -o "$categories_body" -w "%{http_code}" "${API_BASE_URL}/rag/categories")
test "$code" = "200"
jq -e '.categories | type == "array"' "$categories_body" >/dev/null

code=$(curl -sS -o "$search_body" -w "%{http_code}" "${API_BASE_URL}/rag/search?q=rag&limit=5")
test "$code" = "200"
jq -e '.results | type == "array"' "$search_body" >/dev/null

# Search with filters (real-user flow)
code=$(curl -sS -o "$search_body" -w "%{http_code}" "${API_BASE_URL}/rag/search?q=rag&hasRemote=true&limit=3")
test "$code" = "200"
jq -e '.results | type == "array"' "$search_body" >/dev/null

# Browse page (static; 200 or 302; do not follow redirects - /browse/ can 302 to self on some hosting)
browse_code=$(curl -sS -o /dev/null -w "%{http_code}" "${API_BASE_URL}/browse/")
if [[ "$browse_code" = "200" || "$browse_code" = "302" ]]; then
  echo "Browse page: OK ($browse_code)"
else
  echo "Browse page: $browse_code (deploy to get /browse)"
fi

# Ingestion endpoint must not be publicly callable from Hosting:
# - 401 means route is reachable but protected by token.
# - 404 means /internal/* is intentionally not exposed on Hosting.
ingest_code=$(curl -sS -o "$ingest_body" -w "%{http_code}" -X POST "${API_BASE_URL}/internal/ingest/run" -H "Content-Type: application/json" -d '{"mode":"incremental"}')
if [[ "$ingest_code" != "401" && "$ingest_code" != "404" ]]; then
  echo "Unexpected ingest endpoint status: $ingest_code" >&2
  cat "$ingest_body" >&2 || true
  exit 1
fi

echo "smoke-public: OK"
