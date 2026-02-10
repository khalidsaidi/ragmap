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
BILLING_ACCOUNT_ID="${BILLING_ACCOUNT_ID:-}"

if [[ -n "${PROJECT_ID:-}" ]]; then
  project_id="$PROJECT_ID"
else
  suffix="$(python3 -c "import secrets,string; a=string.ascii_lowercase+string.digits; print(''.join(secrets.choice(a) for _ in range(6)))")"
  project_id="ragmap-${suffix}"
fi

echo "Project: $project_id"
echo "Region:  $REGION"

gcloud projects create "$project_id" --name "ragmap" >/dev/null
gcloud config set project "$project_id" >/dev/null

if [[ -z "$BILLING_ACCOUNT_ID" ]]; then
  BILLING_ACCOUNT_ID="$(gcloud billing accounts list --format='value(ACCOUNT_ID)' --filter='OPEN=True' | head -n 1 || true)"
fi
if [[ -z "$BILLING_ACCOUNT_ID" ]]; then
  echo "No open billing account found. Set BILLING_ACCOUNT_ID and re-run." >&2
  exit 1
fi
echo "Billing: $BILLING_ACCOUNT_ID"
gcloud billing projects link "$project_id" --billing-account="$BILLING_ACCOUNT_ID" >/dev/null

echo "Enabling APIs..."
gcloud services enable \
  firestore.googleapis.com \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  secretmanager.googleapis.com \
  cloudscheduler.googleapis.com \
  iam.googleapis.com \
  firebase.googleapis.com \
  firebaserules.googleapis.com >/dev/null

echo "Creating Firestore database (native, default)..."
gcloud firestore databases create \
  --database="(default)" \
  --location="$REGION" \
  --type=firestore-native >/dev/null || true

echo "Creating Artifact Registry (docker)..."
gcloud artifacts repositories create ragmap \
  --repository-format=docker \
  --location="$REGION" \
  --description="ragmap images" >/dev/null || true

echo "Creating Firestore composite index for listing servers..."
gcloud firestore indexes composite create \
  --collection-group="servers" \
  --query-scope="COLLECTION" \
  --field-config field-path="hidden",order="ascending" \
  --field-config field-path="name",order="ascending" >/dev/null || true

echo "Creating Secret Manager placeholders..."
gcloud secrets create ragmap-ingest-token --replication-policy=automatic >/dev/null || true
gcloud secrets create ragmap-openai-api-key --replication-policy=automatic >/dev/null || true

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
