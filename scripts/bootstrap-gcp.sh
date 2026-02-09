#!/usr/bin/env bash
set -euo pipefail

# Bootstrap a GCP project for RAGMap (Cloud Run + Firestore + Secret Manager).
#
# Prereqs:
# - gcloud installed + authenticated
# - billing account available
#
# Usage:
#   ./scripts/bootstrap-gcp.sh
#   PROJECT_ID=ragmap-abc123 REGION=us-central1 ./scripts/bootstrap-gcp.sh

REGION="${REGION:-us-central1}"

if [[ -n "${PROJECT_ID:-}" ]]; then
  project_id="$PROJECT_ID"
else
  suffix="$(LC_ALL=C tr -dc a-z0-9 </dev/urandom | head -c 6)"
  project_id="ragmap-${suffix}"
fi

echo "Project: $project_id"
echo "Region:  $REGION"

gcloud projects create "$project_id" --name "ragmap" >/dev/null
gcloud config set project "$project_id" >/dev/null

echo "Enabling APIs..."
gcloud services enable \
  firestore.googleapis.com \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  secretmanager.googleapis.com \
  cloudscheduler.googleapis.com \
  iam.googleapis.com >/dev/null

echo "Creating Firestore database (native, default)..."
gcloud firestore databases create \
  --database="(default)" \
  --location="$REGION" \
  --type=firestore-native >/dev/null

echo "Creating Artifact Registry (docker)..."
gcloud artifacts repositories create ragmap \
  --repository-format=docker \
  --location="$REGION" \
  --description="ragmap images" >/dev/null || true

cat <<EOF

Done.

Next:
1) Add Firebase to this project:
   firebase projects:addfirebase $project_id

2) Create secrets in Secret Manager, and map them to Cloud Run env vars:
   - ragmap-ingest-token -> INGEST_TOKEN
   - ragmap-openai-api-key -> OPENAI_API_KEY (optional)

3) Deploy via GitHub Actions or manually (see docs/DEPLOYMENT.md).
EOF

