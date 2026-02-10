# RAGMap One-shot Run Plan

This repo mirrors `khalidsaidi/a2abench` conventions:
- pnpm monorepo with `apps/*` and `packages/*`
- Fastify API with OpenAPI + health/readiness endpoints
- Remote MCP server (Streamable HTTP) + local MCP server (stdio)
- Firebase Hosting rewrites to Cloud Run
- `.ai/` for agent artifacts (gitignored runs)

Delta vs A2ABench:
- Firestore is the primary datastore.
- Includes an MCP Registry-compatible subregistry API (`/v0.1/*`).
- Adds RAG enrichment (categories + ragScore + optional embeddings).

## Current Run (2026-02-09 / 2026-02-10)

- GCP project: `ragmap-22xp3a`
- Region: `us-central1`
- Cloud Run:
  - API: `ragmap-api` (health: `/health`, ready: `/readyz`)
  - MCP: `ragmap-mcp-remote` (endpoint: `/mcp`)
- Firestore:
  - Native mode, `(default)` database in `us-central1`
  - Composite index created for listing servers (`hidden` + `name`)
- Ingest:
  - Full ingest executed successfully and populated Firestore
  - Cloud Scheduler job created: `ragmap-ingest` (HTTP POST to `/internal/ingest/run`)
- Firebase:
  - `firebase projects:addfirebase` currently fails with `403 The caller does not have permission` (likely needs Firebase ToS acceptance in console)
