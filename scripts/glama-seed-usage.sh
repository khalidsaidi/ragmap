#!/usr/bin/env bash
set -euo pipefail

# Seed usage through Glama "try in browser" instances.
# This exercises real MCP tool calls on Glama-hosted instances.
#
# Usage:
#   ./scripts/glama-seed-usage.sh
#   INSTANCES=4 CALLS_PER_INSTANCE=8 ./scripts/glama-seed-usage.sh

SERVER_PATH="${SERVER_PATH:-@khalidsaidi/ragmap}"
INSTANCES="${INSTANCES:-4}"
CALLS_PER_INSTANCE="${CALLS_PER_INSTANCE:-8}"
STATUS_TIMEOUT_SECONDS="${STATUS_TIMEOUT_SECONDS:-60}"

create_instance() {
  local jar body code uid token
  jar="$(mktemp)"
  body="$(mktemp)"

  code="$(curl -sS -c "$jar" -b "$jar" -o "$body" -w "%{http_code}" \
    -X POST "https://glama.ai/mcp/servers/${SERVER_PATH}/inspect" \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    --data 'intent=try-in-browser')"

  if [[ "$code" != "200" ]]; then
    echo "create failed (HTTP $code)"
    sed -n '1,20p' "$body" || true
    rm -f "$jar" "$body"
    return 1
  fi

  uid="$(jq -r '.mcpServerInstance.uid // empty' "$body")"
  token="$(jq -r '.token // empty' "$body")"

  if [[ -z "$uid" || -z "$token" ]]; then
    echo "create missing uid/token"
    sed -n '1,20p' "$body" || true
    rm -f "$jar" "$body"
    return 1
  fi

  echo "$jar|$uid|$token"
  rm -f "$body"
}

wait_started() {
  local jar uid i body code state
  jar="$1"
  uid="$2"

  for ((i = 1; i <= STATUS_TIMEOUT_SECONDS; i++)); do
    body="$(mktemp)"
    code="$(curl -sS -c "$jar" -b "$jar" -o "$body" -w "%{http_code}" \
      -X POST "https://glama.ai/api/mcp/instances/${uid}/status")"

    if [[ "$code" == "200" ]]; then
      state="$(jq -r '.state // empty' "$body")"
    else
      state="pending"
    fi
    rm -f "$body"

    if [[ "$state" == "started" ]]; then
      return 0
    fi
    if [[ "$state" == "unhealthy" || "$state" == "failed" || "$state" == "stopped" ]]; then
      return 1
    fi
    sleep 1
  done

  return 1
}

call_mcp() {
  local jar url payload code
  jar="$1"
  url="$2"
  payload="$3"

  code="$(curl -sS -c "$jar" -b "$jar" -o /dev/null -w "%{http_code}" \
    -X POST "$url" \
    -H 'Content-Type: application/json' \
    -H 'Accept: application/json, text/event-stream' \
    --data "$payload")"
  [[ "$code" == "200" ]]
}

started_instances=0
successful_calls=0

echo "Seeding usage for ${SERVER_PATH} ..."
echo "instances=${INSTANCES} calls_per_instance=${CALLS_PER_INSTANCE}"

for ((n = 1; n <= INSTANCES; n++)); do
  if ! created="$(create_instance)"; then
    echo "instance ${n}: create failed"
    continue
  fi

  IFS='|' read -r jar uid token <<< "$created"
  echo "instance ${n}: uid=${uid} created"

  if ! wait_started "$jar" "$uid"; then
    echo "instance ${n}: uid=${uid} did not reach started state"
    rm -f "$jar"
    continue
  fi

  started_instances=$((started_instances + 1))
  mcp_url="https://glama.ai/mcp/instances/${uid}/mcp?token=${token}"

  if call_mcp "$jar" "$mcp_url" '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-11-25","capabilities":{},"clientInfo":{"name":"glama-usage-seeder","version":"1.0.0"}}}'; then
    successful_calls=$((successful_calls + 1))
  fi
  if call_mcp "$jar" "$mcp_url" '{"jsonrpc":"2.0","id":2,"method":"tools/list","params":{}}'; then
    successful_calls=$((successful_calls + 1))
  fi

  for ((j = 1; j <= CALLS_PER_INSTANCE; j++)); do
    payload="$(cat <<JSON
{"jsonrpc":"2.0","id":$((100 + j)),"method":"tools/call","params":{"name":"rag_find_servers","arguments":{"query":"rag seed ${n}-${j}","limit":5,"hasRemote":true,"reachable":true}}}
JSON
)"
    if call_mcp "$jar" "$mcp_url" "$payload"; then
      successful_calls=$((successful_calls + 1))
    fi
  done

  if call_mcp "$jar" "$mcp_url" '{"jsonrpc":"2.0","id":999,"method":"tools/call","params":{"name":"rag_list_categories","arguments":{}}}'; then
    successful_calls=$((successful_calls + 1))
  fi

  echo "instance ${n}: uid=${uid} seeded (calls_ok=${successful_calls})"
  rm -f "$jar"
done

echo "SUMMARY started_instances=${started_instances} successful_calls=${successful_calls}"

if [[ "$successful_calls" -eq 0 ]]; then
  echo "No successful Glama instance tool calls were recorded."
  exit 1
fi
