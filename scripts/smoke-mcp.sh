#!/usr/bin/env bash
set -euo pipefail

MCP_URL="${MCP_URL:-https://ragmap-mcp.web.app/mcp}"

init_out="$(mktemp)"
tools_out="$(mktemp)"
call_out="$(mktemp)"

cleanup() {
  rm -f "$init_out" "$tools_out" "$call_out"
}
trap cleanup EXIT

init='{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"ci-smoke","version":"0.0.0"}}}'
tools='{"jsonrpc":"2.0","id":2,"method":"tools/list"}'
call='{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"rag_find_servers","arguments":{"query":"rag","limit":3}}}'

code=$(curl -sS -o "$init_out" -w "%{http_code}" -H "Content-Type: application/json" -H "Accept: application/json, text/event-stream" -X POST "$MCP_URL" -d "$init")
test "$code" = "200"
grep -q '"result"' "$init_out"

code=$(curl -sS -o "$tools_out" -w "%{http_code}" -H "Content-Type: application/json" -H "Accept: application/json, text/event-stream" -X POST "$MCP_URL" -d "$tools")
test "$code" = "200"
grep -q '"rag_find_servers"' "$tools_out"

code=$(curl -sS -o "$call_out" -w "%{http_code}" -H "Content-Type: application/json" -H "Accept: application/json, text/event-stream" -X POST "$MCP_URL" -d "$call")
test "$code" = "200"
grep -q '"content"' "$call_out"

echo "smoke-mcp: OK"

