#!/usr/bin/env bash
set -euo pipefail

# Configure Workload Identity Federation (WIF) for GitHub Actions deploys.
#
# This creates:
# - Workload Identity Pool + OIDC Provider for GitHub
# - A deployer service account
# - IAM bindings so only the configured GitHub repo can impersonate the SA
#
# Usage:
#   PROJECT_ID=ragmap-xxxxxx ./scripts/setup-github-wif.sh
#   PROJECT_ID=ragmap-xxxxxx GITHUB_REPO=khalidsaidi/ragmap ./scripts/setup-github-wif.sh

PROJECT_ID="${PROJECT_ID:-}"
if [[ -z "$PROJECT_ID" ]]; then
  echo "PROJECT_ID is required" >&2
  exit 1
fi

GITHUB_REPO="${GITHUB_REPO:-khalidsaidi/ragmap}"
REGION="${REGION:-us-central1}"

POOL_ID="${POOL_ID:-ragmap-github}"
PROVIDER_ID="${PROVIDER_ID:-github}"
DEPLOYER_SA_ID="${DEPLOYER_SA_ID:-ragmap-github-deployer}"
RUNTIME_SA_EMAIL="${RUNTIME_SA_EMAIL:-ragmap-runtime@${PROJECT_ID}.iam.gserviceaccount.com}"
BUILD_SA_ID="${BUILD_SA_ID:-ragmap-build}"
CLOUDBUILD_BUCKET="${CLOUDBUILD_BUCKET:-${PROJECT_ID}_cloudbuild}"

PROJECT_NUMBER="$(gcloud projects describe "$PROJECT_ID" --format='value(projectNumber)')"

echo "Project:   $PROJECT_ID ($PROJECT_NUMBER)"
echo "Repo:      $GITHUB_REPO"
echo "Pool:      $POOL_ID"
echo "Provider:  $PROVIDER_ID"
echo "Deployer:  $DEPLOYER_SA_ID"
echo "Build SA:  $BUILD_SA_ID"
echo "CB bucket: $CLOUDBUILD_BUCKET"
echo "Region:    $REGION"

echo "Enabling required APIs..."
gcloud services enable \
  iamcredentials.googleapis.com \
  sts.googleapis.com \
  --project "$PROJECT_ID" >/dev/null

echo "Creating Workload Identity Pool (if needed)..."
gcloud iam workload-identity-pools create "$POOL_ID" \
  --project "$PROJECT_ID" \
  --location "global" \
  --display-name "GitHub Actions" >/dev/null 2>&1 || true

echo "Creating OIDC provider (if needed)..."
gcloud iam workload-identity-pools providers create-oidc "$PROVIDER_ID" \
  --project "$PROJECT_ID" \
  --location "global" \
  --workload-identity-pool "$POOL_ID" \
  --display-name "GitHub" \
  --issuer-uri "https://token.actions.githubusercontent.com" \
  --attribute-mapping "google.subject=assertion.sub,attribute.repository=assertion.repository,attribute.ref=assertion.ref" \
  --attribute-condition "assertion.repository == '${GITHUB_REPO}'" >/dev/null 2>&1 || true

DEPLOYER_SA_EMAIL="${DEPLOYER_SA_ID}@${PROJECT_ID}.iam.gserviceaccount.com"
BUILD_SA_EMAIL="${BUILD_SA_ID}@${PROJECT_ID}.iam.gserviceaccount.com"
CLOUDBUILD_BUCKET_URL="gs://${CLOUDBUILD_BUCKET}"
CLOUDBUILD_AGENT="service-${PROJECT_NUMBER}@gcp-sa-cloudbuild.iam.gserviceaccount.com"

echo "Creating deployer service account (if needed)..."
gcloud iam service-accounts create "$DEPLOYER_SA_ID" \
  --project "$PROJECT_ID" \
  --display-name "ragmap github deployer" >/dev/null 2>&1 || true

echo "Granting project roles to deployer..."
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member "serviceAccount:${DEPLOYER_SA_EMAIL}" \
  --role "roles/run.admin" >/dev/null

gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member "serviceAccount:${DEPLOYER_SA_EMAIL}" \
  --role "roles/cloudbuild.builds.editor" >/dev/null

# Needed for gcloud builds submit source upload to the Cloud Build bucket.
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member "serviceAccount:${DEPLOYER_SA_EMAIL}" \
  --role "roles/storage.admin" >/dev/null

# Needed for `firebase deploy --only hosting:*` from CI.
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member "serviceAccount:${DEPLOYER_SA_EMAIL}" \
  --role "roles/firebasehosting.admin" >/dev/null

# Helpful for other Firebase management calls during deploy.
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member "serviceAccount:${DEPLOYER_SA_EMAIL}" \
  --role "roles/firebase.admin" >/dev/null

# Allows configuring Cloud Run secret refs without granting secret access.
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member "serviceAccount:${DEPLOYER_SA_EMAIL}" \
  --role "roles/secretmanager.viewer" >/dev/null

echo "Creating build service account (if needed)..."
gcloud iam service-accounts create "$BUILD_SA_ID" \
  --project "$PROJECT_ID" \
  --display-name "ragmap build" >/dev/null 2>&1 || true

echo "Ensuring Cloud Build staging bucket exists..."
gcloud storage buckets describe "$CLOUDBUILD_BUCKET_URL" --project "$PROJECT_ID" >/dev/null 2>&1 || \
  gcloud storage buckets create "$CLOUDBUILD_BUCKET_URL" --project "$PROJECT_ID" --location "US" >/dev/null

echo "Granting Artifact Registry writer to build service account..."
gcloud artifacts repositories add-iam-policy-binding ragmap \
  --project "$PROJECT_ID" \
  --location "$REGION" \
  --member "serviceAccount:${BUILD_SA_EMAIL}" \
  --role "roles/artifactregistry.writer" >/dev/null

echo "Granting Cloud Build bucket access to build service account..."
gcloud storage buckets add-iam-policy-binding "$CLOUDBUILD_BUCKET_URL" \
  --member "serviceAccount:${BUILD_SA_EMAIL}" \
  --role "roles/storage.bucketViewer" >/dev/null
gcloud storage buckets add-iam-policy-binding "$CLOUDBUILD_BUCKET_URL" \
  --member "serviceAccount:${BUILD_SA_EMAIL}" \
  --role "roles/storage.objectAdmin" >/dev/null

echo "Allowing Cloud Build service agent to actAs build service account..."
gcloud iam service-accounts add-iam-policy-binding "$BUILD_SA_EMAIL" \
  --project "$PROJECT_ID" \
  --member "serviceAccount:${CLOUDBUILD_AGENT}" \
  --role "roles/iam.serviceAccountUser" >/dev/null

echo "Allowing GitHub deployer to actAs build service account..."
gcloud iam service-accounts add-iam-policy-binding "$BUILD_SA_EMAIL" \
  --project "$PROJECT_ID" \
  --member "serviceAccount:${DEPLOYER_SA_EMAIL}" \
  --role "roles/iam.serviceAccountUser" >/dev/null

echo "Granting actAs on runtime service account..."
gcloud iam service-accounts add-iam-policy-binding "$RUNTIME_SA_EMAIL" \
  --project "$PROJECT_ID" \
  --member "serviceAccount:${DEPLOYER_SA_EMAIL}" \
  --role "roles/iam.serviceAccountUser" >/dev/null

echo "Allowing GitHub repo to impersonate deployer via WIF..."
gcloud iam service-accounts add-iam-policy-binding "$DEPLOYER_SA_EMAIL" \
  --project "$PROJECT_ID" \
  --member "principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${POOL_ID}/attribute.repository/${GITHUB_REPO}" \
  --role "roles/iam.workloadIdentityUser" >/dev/null

WIF_PROVIDER="projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${POOL_ID}/providers/${PROVIDER_ID}"

cat <<EOF

Done.

GitHub repo secrets to add:
- WIF_PROVIDER:        $WIF_PROVIDER
- WIF_SERVICE_ACCOUNT: $DEPLOYER_SA_EMAIL

GitHub repo variables to add:
- GCP_PROJECT_ID: $PROJECT_ID
- GCP_REGION:     us-central1
- ARTIFACT_REPO:  ragmap
- API_SERVICE:    ragmap-api
- MCP_SERVICE:    ragmap-mcp-remote

Cloud Build:
- Build service account: $BUILD_SA_EMAIL
- Staging bucket:        $CLOUDBUILD_BUCKET_URL

EOF
