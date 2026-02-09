# Privacy

RAGMap ingests **public** MCP Registry metadata and stores it to provide RAG-focused search and filtering.

## Stored data

- Public server records from the official registry (name, description, repository URL, package/remote descriptors)
- Derived enrichment (categories, scores, optional embeddings for semantic search)
- Minimal operational telemetry (request timestamps, aggregated metrics)

## Notes

- Do not store secrets in Firestore.
- Server-side secrets must come from GCP Secret Manager and be injected into Cloud Run at runtime.

