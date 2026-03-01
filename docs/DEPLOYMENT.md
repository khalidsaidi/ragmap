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
- `ragmap-admin-dash-pass` -> `ADMIN_DASH_PASS` (for `/admin/*`)
- `ragmap-openai-api-key` -> `OPENAI_API_KEY` (optional). When set, `EMBEDDINGS_ENABLED` defaults to true: ingest stores vectors and `/rag/search` uses semantic ranking. Set `EMBEDDINGS_ENABLED=false` to disable.

**Enable semantic search in production (Cloud Run)**  
1. Create the secret: `gcloud secrets create ragmap-openai-api-key --replication-policy=automatic` (or use an existing secret), then add your key value.  
2. Grant the Cloud Run runtime SA access: `gcloud secrets add-iam-policy-binding ragmap-openai-api-key --member="serviceAccount:RUNTIME_SA_EMAIL" --role="roles/secretmanager.secretAccessor"`.  
3. Update the API service to use it:  
   `gcloud run services update ragmap-api --region=REGION --project=PROJECT_ID --set-secrets="OPENAI_API_KEY=ragmap-openai-api-key:latest" --set-env-vars="EMBEDDINGS_ENABLED=true"`.  
4. Run a full ingest so vectors are stored: `POST /internal/ingest/run` with `{"mode":"full"}` and `X-Ingest-Token`.  
After that, `/rag/search` returns meaning-based (semantic) ranking in addition to keyword match.

### Cloud Run services

Build with the repo Dockerfiles:
- `apps/api/Dockerfile` -> service `ragmap-api`
- `apps/mcp-remote/Dockerfile` -> service `ragmap-mcp-remote`

To build and push with Cloud Build from the repo root:

```bash
BUILD_SA="projects/PROJECT_ID/serviceAccounts/ragmap-build@PROJECT_ID.iam.gserviceaccount.com"
CB_BUCKET="gs://PROJECT_ID_cloudbuild"

gcloud builds submit \
  --service-account "$BUILD_SA" \
  --gcs-log-dir "${CB_BUCKET}/logs" \
  --gcs-source-staging-dir "${CB_BUCKET}/source" \
  --config cloudbuild.dockerfile.yaml \
  --substitutions _IMAGE="REGION-docker.pkg.dev/PROJECT_ID/ragmap/ragmap-api:TAG",_DOCKERFILE="apps/api/Dockerfile" \
  .
```

### Firebase Hosting

This repo includes `firebase.json` rewrites similar to A2ABench:
- Hosting target `api` rewrites `/v0.1/**`, `/rag/**`, `/docs/**`, etc to `ragmap-api`
- Hosting target `mcp` rewrites `/mcp/**` and `/readyz` to `ragmap-mcp-remote`, while serving `/health` from static JSON

### Scheduled ingestion (keep data fresh)

You need to run ingest periodically so new/updated servers and reachability stay current.

**Option A: Cloud Scheduler (recommended, very cheap)**  
Run one job `ragmap-ingest` once daily at 2:00 UTC; point it at your **Cloud Run service URL** (not the public Hosting URL) so only your job can hit ingest.

- **Cost:** Cloud Scheduler free tier = first 3 jobs per month free (a “job” is the definition, not per run). One job = $0. Running once per day keeps Cloud Run invocations minimal (~30/month for ingest).
- **URL:** Use your **Cloud Run service URL** (e.g. `https://ragmap-api-XXXXX-uc.a.run.app/internal/ingest/run`), not the public Hosting URL. The `/internal/*` routes are not exposed on the public site. Get it: `gcloud run services describe ragmap-api --region=us-central1 --format='value(status.url)'`.

Check or update the job:

```bash
gcloud scheduler jobs list --project=YOUR_PROJECT_ID --location=us-central1

# Set RUN_URL to your Cloud Run URL first: RUN_URL=$(gcloud run services describe ragmap-api --project=YOUR_PROJECT_ID --region=us-central1 --format='value(status.url)')
gcloud scheduler jobs update http ragmap-ingest \
  --project=YOUR_PROJECT_ID --location=us-central1 \
  --schedule="0 2 * * *" \
  --uri="${RUN_URL}/internal/ingest/run"
```

**Option B: GitHub Actions (free for public repos)**  
Add a scheduled workflow that calls your **Cloud Run service URL** (not the public Hosting URL) for ingest. Store `INGEST_TOKEN` and the Run URL in repo Secrets. No GCP Scheduler cost. See the optional workflow below.

For repository workflows that call `/internal/*` routes:
- `API_BASE_URL` must be the Cloud Run service URL (example: `https://ragmap-api-xxxxx-uc.a.run.app`)
- Do not set `API_BASE_URL` to `https://ragmap-api.web.app` because Hosting does not expose `/internal/*`
- `INGEST_TOKEN` must match the API's `INGEST_TOKEN` env var
- `REACHABILITY_POLICY` controls how HTTP probe statuses map to reachable:
  - `strict` (default): reachable for `200-399`, `401`, `403`, `405`, `429`; unreachable for `404`, `410`, `5xx`, and network/timeout errors.
  - `loose`: reachable for any status `<500` except `404` and `410`; still unreachable on network/timeout errors.
- Reachability probes now cover both `streamable-http` and `sse` remotes:
  - `streamable-http`: `HEAD` probe, with `GET` fallback.
  - `sse`: short `GET` with `Accept: text/event-stream`, then immediate body cancel so checks do not hang on streaming responses.

This applies to both scheduled ingest (`/internal/ingest/run`) and scheduled reachability refresh (`/internal/reachability/run`).

**Option C: Cron on an existing VM**  
If you already have a small VM (or always-on machine), add one line to crontab:

```bash
# e.g. daily at 2am
0 2 * * * curl -sS -X POST "$RUN_URL/internal/ingest/run" -H "Content-Type: application/json" -H "X-Ingest-Token: $INGEST_TOKEN" -d '{"mode":"incremental"}' --max-time 600
```

Set `INGEST_TOKEN` and `RUN_URL` (your Cloud Run service URL) in the environment.

**Manual (no schedule)**  
Call the Cloud Run service URL when you want a refresh:

```bash
curl -X POST "https://YOUR-CLOUD-RUN-URL/internal/ingest/run" \
  -H "Content-Type: application/json" \
  -H "X-Ingest-Token: $INGEST_TOKEN" \
  -d '{"mode":"full"}'
```

Use `mode: "incremental"` for faster, change-only runs; use `"full"` occasionally (e.g. weekly) to refresh reachability and hide deleted servers.

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
- `ADMIN_DASH_USER` (default: `admin`)
- `ADMIN_DASH_PASS_SECRET` (default: `ragmap-admin-dash-pass`)
- `OPENAI_API_KEY_SECRET` (optional): Secret Manager secret name for OpenAI API key, e.g. `ragmap-openai-api-key`. When set, deploy injects it and enables semantic search; run a full ingest after deploy.
- `CAPTURE_AGENT_PAYLOADS` (default: `true`)

4) Ensure Firebase Hosting targets exist for the project:

```bash
PROJECT_ID=ragmap-xxxxxx ./scripts/bootstrap-firebase.sh
```
