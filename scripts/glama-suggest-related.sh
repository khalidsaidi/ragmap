#!/usr/bin/env bash
set -euo pipefail

MCP_SERVER_UID="${MCP_SERVER_UID:-mq9ehyfqen}"

RELATED_UIDS=(
  j0xogqgoak
  bh04byu77a
  g4jkr5rjt5
  co522bhy31
  f4hsrjhmq9
  kuoeczkg9v
  q4uywrflxx
)

for rid in "${RELATED_UIDS[@]}"; do
  body="$(curl -sS -X POST 'https://glama.ai/mcp/servers/suggest-related' \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    --data "mcpServerUid=${MCP_SERVER_UID}&relatedMcpServerUid=${rid}")"
  status="$(echo "$body" | jq -r '.submission.status // .error // "unknown"')"
  printf '%s\t%s\n' "$rid" "$status"
done
