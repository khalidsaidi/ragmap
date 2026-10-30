# RAGMap MCP (Local)

Find **RAG-related MCP servers** from a bundled catalog. This package is a local stdio MCP server. It makes no network calls and needs no API key or backend.

The catalog holds 2,830 servers from the official MCP Registry whose descriptions match RAG-related keywords. Each entry has a keyword score, categories, and a server kind. The catalog is a snapshot: its `generatedAt` date is returned with every search.

## Quick start

```bash
npx -y @khalidsaidi/ragmap-mcp@latest
```

## Claude Desktop config

```json
{
  "mcpServers": {
    "ragmap": {
      "command": "npx",
      "args": ["-y", "@khalidsaidi/ragmap-mcp@latest"]
    }
  }
}
```

## Tools

- `rag_find_servers`: search by keyword, with filters for categories, minimum score, transport, registry type, remote endpoint, citations, local-only, and server kind.
- `rag_top_servers`: highest-scoring retriever servers, with the same filters.
- `rag_get_server`: one server by exact registry name, e.g. `io.github.khalidsaidi/ragmap`.
- `rag_list_categories`: all categories in the catalog.
- `rag_explain_score`: the score, categories, and server kind for one server.
- `rag_get_install_config`: a copy-ready MCP host config snippet for one server.

## Limits

- The keyword score only reflects what a server says about itself. It does not test whether the server works.
- Reachability is not checked, so the catalog can list servers that are offline or need credentials.
- The catalog is not updated automatically. Rebuild it with `apps/api/scripts/build-catalog.ts` in the repo.

Repo: `https://github.com/khalidsaidi/ragmap`
