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
if ! firebase projects:addfirebase "$PROJECT_ID"; then
  cat <<EOF >&2

Failed to add Firebase to $PROJECT_ID.

Common root cause: the account hasn't accepted Firebase Terms of Service yet.
Open the Firebase console, accept the terms, then re-run:
  firebase projects:addfirebase $PROJECT_ID

EOF
  exit 1
fi

firebase use --add "$PROJECT_ID"

echo "Creating Hosting sites..."
firebase hosting:sites:create ragmap-api || true
firebase hosting:sites:create ragmap-mcp || true

echo "Applying hosting targets..."
firebase target:apply hosting api ragmap-api
firebase target:apply hosting mcp ragmap-mcp

echo "Firebase targets configured."
