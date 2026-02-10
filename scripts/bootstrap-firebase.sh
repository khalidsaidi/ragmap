#!/usr/bin/env bash
set -euo pipefail

# Configure Firebase Hosting targets for RAGMap.
#
# Prereqs:
# - firebase CLI installed + authenticated
# - .firebaserc updated with your project id OR pass PROJECT_ID
#
# Usage:
#   PROJECT_ID=ragmap-abc123 ./scripts/bootstrap-firebase.sh

PROJECT_ID="${PROJECT_ID:-}"
if [[ -z "$PROJECT_ID" ]]; then
  echo "PROJECT_ID is required" >&2
  exit 1
fi

echo "Adding Firebase to project (if not already enabled)..."
if ! firebase projects:addfirebase "$PROJECT_ID" >/tmp/firebase-addfirebase.out 2>/tmp/firebase-addfirebase.err; then
  # If Firebase is already enabled, `projects:addfirebase` returns 409 but
  # prints a generic error. Detect "already enabled" via projects list.
  if firebase projects:list --json | jq -e --arg pid "$PROJECT_ID" '.result[]? | select(.projectId == $pid)' >/dev/null; then
    echo "Firebase already enabled for $PROJECT_ID"
  else
    cat /tmp/firebase-addfirebase.err >&2 || true
    cat <<EOF >&2

Failed to add Firebase to $PROJECT_ID.

Common root cause: the account hasn't accepted Firebase Terms of Service yet.
Open the Firebase console, accept the terms, then re-run:
  firebase projects:addfirebase $PROJECT_ID

EOF
    exit 1
  fi
fi

API_SITE_ID="${API_SITE_ID:-ragmap-api}"
MCP_SITE_ID="${MCP_SITE_ID:-ragmap-mcp}"

echo "Creating Hosting sites..."
if ! out="$(firebase hosting:sites:create "$API_SITE_ID" --project "$PROJECT_ID" 2>&1)"; then
  if echo "$out" | grep -qE "ALREADY_EXISTS|already exists|Requested entity already exists"; then
    echo "Hosting site already exists: $API_SITE_ID"
  else
    echo "$out" >&2
    exit 1
  fi
fi
if ! out="$(firebase hosting:sites:create "$MCP_SITE_ID" --project "$PROJECT_ID" 2>&1)"; then
  if echo "$out" | grep -qE "ALREADY_EXISTS|already exists|Requested entity already exists"; then
    echo "Hosting site already exists: $MCP_SITE_ID"
  else
    echo "$out" >&2
    exit 1
  fi
fi

echo "Applying hosting targets..."
firebase target:apply hosting api "$API_SITE_ID" --project "$PROJECT_ID"
firebase target:apply hosting mcp "$MCP_SITE_ID" --project "$PROJECT_ID"

echo "Firebase targets configured."
