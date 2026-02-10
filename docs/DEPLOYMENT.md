# Deployment

## Local (dev)

```bash
cp .env.example .env
corepack enable
pnpm -r install
pnpm -r dev
```

## Cloud Run + Firebase Hosting (recommended)

RAGMap is designed to run on:
- Cloud Run for `apps/api` and `apps/mcp-remote`
- Firebase Hosting for stable public URLs and rewrites to Cloud Run
- Firestore (native mode) as primary datastore
- Secret Manager for server-side secrets (inject into Cloud Run env)
- Cloud Scheduler to trigger ingestion via a protected endpoint

### Secrets (Secret Manager)

Create and grant access to your Cloud Run service account, then inject as env vars.

Suggested secrets:
- `ragmap-ingest-token` -> `INGEST_TOKEN`
- `ragmap-openai-api-key` -> `OPENAI_API_KEY` (optional, embeddings)

### Cloud Run services

Build with the repo Dockerfiles:
- `apps/api/Dockerfile` -> service `ragmap-api`
- `apps/mcp-remote/Dockerfile` -> service `ragmap-mcp-remote`

To build and push with Cloud Build from the repo root:

```bash
gcloud builds submit \
  --config cloudbuild.dockerfile.yaml \
  --substitutions _IMAGE="REGION-docker.pkg.dev/PROJECT_ID/ragmap/ragmap-api:TAG",_DOCKERFILE="apps/api/Dockerfile" \
  .
```

### Firebase Hosting

This repo includes `firebase.json` rewrites similar to A2ABench:
- Hosting target `api` rewrites `/v0.1/**`, `/rag/**`, `/docs/**`, etc to `ragmap-api`
- Hosting target `mcp` rewrites `/mcp/**` and `/readyz` to `ragmap-mcp-remote`, while serving `/health` from static JSON

### Cloud Scheduler ingestion

Call the protected endpoint:

```bash
curl -X POST https://<your-api-domain>/internal/ingest/run \\
  -H "Content-Type: application/json" \\
  -H "X-Ingest-Token: $INGEST_TOKEN" \\
  -d '{\"mode\":\"full\"}'
```

### Firestore indexes

Firestore requires a composite index for listing servers (query on `servers` with `hidden == false` ordered by `name`).
If `/v0.1/servers` returns `FAILED_PRECONDITION: The query requires an index`, create this index:

```bash
gcloud firestore indexes composite create \
  --collection-group="servers" \
  --query-scope="COLLECTION" \
  --field-config field-path="hidden",order="ascending" \
  --field-config field-path="name",order="ascending"
```

## GitHub Actions (CI/CD)

This repo includes:
- `.github/workflows/ci.yml` (lint/typecheck/test)
- `.github/workflows/deploy.yml` (Cloud Build + Cloud Run + Firebase Hosting)

### Workload Identity Federation (recommended)

1) Create WIF + deployer service account:

```bash
PROJECT_ID=ragmap-xxxxxx ./scripts/setup-github-wif.sh
```

2) In GitHub repo settings add secrets:
- `WIF_PROVIDER`
- `WIF_SERVICE_ACCOUNT`

3) Add GitHub repo variables:
- `GCP_PROJECT_ID`
- `GCP_REGION` (default: `us-central1`)
- `ARTIFACT_REPO` (default: `ragmap`)
- `API_SERVICE` (default: `ragmap-api`)
- `MCP_SERVICE` (default: `ragmap-mcp-remote`)

4) Ensure Firebase Hosting targets exist for the project:

```bash
PROJECT_ID=ragmap-xxxxxx ./scripts/bootstrap-firebase.sh
```
