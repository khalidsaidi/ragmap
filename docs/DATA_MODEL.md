# Data model

Firestore collections (recommended):

- `servers/{serverId}`
  - `name`: MCP server name from the registry (e.g. `io.github.khalidsaidi/ragmap` for RAGMap, `ai.auteng/mcp`)
  - `latestVersion`: latest version string
  - `latestServer`: raw server JSON from upstream registry
  - `latestOfficial`: official upstream meta (status, publishedAt, updatedAt, isLatest)
  - `latestRagmap`: RAG enrichment (categories, ragScore, reasons, optional embedding)
  - `hidden`: if the server should be excluded from public listings
  - `lastSeenRunId`, `lastSeenAt`: ingestion tracking

- `servers/{serverId}/versions/{version}`
  - `server`: raw server JSON from upstream registry (version-specific)
  - `official`: official upstream meta
  - `publisherProvided`: optional publisher-provided meta when present
  - `ragmap`: enrichment for this version
  - `hidden`, `lastSeenRunId`, `lastSeenAt`

API responses reconstruct MCP Registry-compatible shapes:

- `GET /v0.1/servers` returns:
  - `servers[]` items like `{ server: <server>, _meta: { ... } }`
  - `metadata` like `{ count, nextCursor? }`

RAG enrichment is exposed under `_meta["io.github.khalidsaidi/ragmap"]`.

