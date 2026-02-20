# How agents use RAGMap

For AI agents (Cursor, Claude, custom MCP clients) that need to discover RAG-capable MCP servers without human intervention.

## Discovery

- **Agent card (machine-readable):** `GET https://ragmap-api.web.app/.well-known/agent.json`  
  Returns: name, description, skills (rag_find_servers, rag_get_server, rag_list_categories, rag_explain_score), `apiEndpoints`, `mcpInstall`, `keywords`. No auth for read.

- **OpenAPI:** `https://ragmap-api.web.app/docs` or `https://ragmap-api.web.app/api/openapi.json`

## Option A: Call the REST API directly

Base URL: `https://ragmap-api.web.app`

| Use case | Method | Path | Key params |
|----------|--------|------|------------|
| Search by meaning or keywords | GET | `/rag/search` | `q` (required), `limit`, `hasRemote`, `reachable`, `citations`, `localOnly`, `minScore`, `categories` |
| List servers (registry) | GET | `/v0.1/servers` | `limit`, `cursor` |
| Get one server (latest) | GET | `/v0.1/servers/{name}/versions/latest` | `name` = URL-encoded registry name (e.g. `io.github.khalidsaidi%2Fragmap` for RAGMap) |
| List categories | GET | `/rag/categories` | — |
| Explain score for a server | GET | `/rag/servers/{name}/explain` | `name` = URL-encoded registry name (e.g. `io.github.khalidsaidi%2Fragmap` for RAGMap) |

Example (find remote-only RAG servers):

```http
GET https://ragmap-api.web.app/rag/search?q=documents&hasRemote=true&limit=10
Accept: application/json
```

## Option B: Use the RAGMap MCP (tools)

Install once, then use tools from your agent runtime:

```bash
npx -y @khalidsaidi/ragmap-mcp@latest
```

Env (optional): `RAGMAP_API_BASE_URL` (default: https://ragmap-api.web.app), `MCP_AGENT_NAME` (for usage attribution).

Tools:

- **rag_find_servers** — query, limit, hasRemote, reachable, citations, localOnly, minScore, categories
- **rag_get_server** — `name` (registry server name, e.g. `io.github.khalidsaidi/ragmap` for RAGMap)
- **rag_list_categories**
- **rag_explain_score** — `name` (registry server name, e.g. `io.github.khalidsaidi/ragmap` for RAGMap)

## Up-to-date info

Ingest runs daily (Cloud Scheduler). Server list and reachability are updated without your intervention. For fresh data, rely on the hosted API; no need to run ingest yourself.

## Submitting RAGMap MCP to the official registry

The package includes `server.json` (in `packages/mcp-local/`) for the [MCP Registry](https://github.com/modelcontextprotocol/registry). To publish to the official registry (one-time, requires your login): from `packages/mcp-local` run `../bin/mcp-publisher login github` then `../bin/mcp-publisher publish`. See [Registry publishing](https://modelcontextprotocol.io/tools/registry/publishing/).
