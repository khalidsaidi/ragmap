# 0001 - Architecture

## Decision

Use a three-layer design:

1. `apps/api` owns Firestore access + ingestion + registry-compatible endpoints.
2. `apps/mcp-remote` is a thin MCP wrapper over the API (HTTP client).
3. `packages/mcp-local` is a thin local stdio MCP wrapper over the API (HTTP client).

Shared contracts live in `packages/shared`.

## Rationale

- Keeps Firestore access centralized.
- MCP tooling stays simple and deployable.
- API remains the source of truth for RAG scoring/enrichment semantics.

