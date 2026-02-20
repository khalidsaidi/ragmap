# RAGMap — RAG-focused MCP subregistry (launch)

**TL;DR:** [RAGMap](https://ragmap-api.web.app) is a subregistry + MCP server for **finding retrieval-capable MCP servers by meaning or keywords**. Use it from Cursor, Claude, or any MCP client. No API keys for search.

---

## What it is

- **API:** Registry-compatible REST API at `https://ragmap-api.web.app` — list servers, search by query, filter by category, transport, `hasRemote`, `reachable`, etc.
- **Semantic search:** When embeddings are enabled, search uses meaning (e.g. “document Q&A”) as well as keywords.
- **MCP tools:** `rag_find_servers`, `rag_get_server`, `rag_list_categories`, `rag_explain_score` — use via the hosted Streamable HTTP endpoint or the local stdio package.

## Try it

- **Browse (no install):** [ragmap-api.web.app/browse](https://ragmap-api.web.app/browse) — filter, compare, copy Cursor/Claude config.
- **In Cursor:** Add MCP server → Streamable HTTP → `https://ragmap-api.web.app/mcp`.
- **Local (stdio):** `npx -y @khalidsaidi/ragmap-mcp@latest` (talks to the hosted API).

## Why

The official MCP Registry lists hundreds of servers; RAGMap focuses on **retrieval / RAG** and adds:

- Search by intent (e.g. “vector search”, “document Q&A”) when embeddings are on.
- Filters: remote-only, reachable, citations, local-only, min score.
- Explainable relevance scores so you can see why a server was ranked.

## Links

- **API & health:** [ragmap-api.web.app](https://ragmap-api.web.app) · [OpenAPI](https://ragmap-api.web.app/docs)
- **Repo:** [github.com/khalidsaidi/ragmap](https://github.com/khalidsaidi/ragmap)
- **npm:** [@khalidsaidi/ragmap-mcp](https://www.npmjs.com/package/@khalidsaidi/ragmap-mcp)

---

*Copy-paste note: You can use the “TL;DR” + “What it is” + “Try it” sections for a Reddit/HN/Dev.to post. Shorten as needed.*
