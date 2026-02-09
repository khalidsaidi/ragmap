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

