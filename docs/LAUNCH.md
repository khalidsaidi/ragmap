# MapRag / RAGMap Launch Kit (v0.1.2)

This file is a lightweight checklist + copy deck for announcing RAGMap/MapRag in places where MCP developers hang out.

## TL;DR

**MapRag is a discovery + routing layer for retrieval.** It indexes and enriches **RAG-capable MCP servers**, then lets agents query a small set of stable tools to pick the right retrieval server under constraints (domain, privacy, citations, freshness, auth, limits) with explainable reasons.

Links:
- Repo: `https://github.com/khalidsaidi/ragmap`
- NPM (local MCP server): `https://www.npmjs.com/package/@khalidsaidi/ragmap-mcp`
- GitHub release: `https://github.com/khalidsaidi/ragmap/releases/tag/v0.1.2`

## One-liners (pick one)

- "MapRag routes agents to the right retrieval MCP server under constraints, with explainable ranking."
- "A RAG-focused MCP subregistry + MCP server: discover and select retrieval tools without tool overload."
- "A map of the retrieval landscape for MCP: structured metadata + trust signals + agent-native querying."

## Demo snippet (copy/paste)

Local (stdio):

```bash
npx -y @khalidsaidi/ragmap-mcp@latest ragmap-mcp
```

Example tool call:

```json
{
  "tool": "rag_find_servers",
  "input": {
    "query": "docs rag citations",
    "categories": ["documents"],
    "minScore": 30,
    "transport": "stdio",
    "limit": 5
  }
}
```

## Where To Post (high-signal, MCP-adjacent)

GitHub directories/lists:
- `punkpeye/awesome-mcp-servers` (largest; also feeds glama.ai directory). Suggested section: **Aggregators**.
- `chatmcp/mcpso` (mcp.so) (directory; submit link is in their site nav).

Communities:
- r/mcp (Reddit)
- MCP Discords (linked from `punkpeye/awesome-mcp-servers`)

Broad "launch" channels:
- Hacker News (Show HN)
- Product Hunt
- X / LinkedIn (short clip + diagram)

## PR Template: awesome-mcp-servers

Suggested line for the **Aggregators** section:

```md
- [khalidsaidi/ragmap](https://github.com/khalidsaidi/ragmap) 📇 ☁️ 🏠 🍎 🪟 🐧 - MapRag: RAG-focused subregistry + MCP server to discover and route to retrieval-capable MCP servers using structured constraints and explainable ranking.
```

## Post Copy (short)

### Reddit / Discord (short)

Title:
`MapRag: a RAG-focused MCP subregistry + MCP server (discover and route to retrieval tools)`

Body:
`MapRag is a discovery + routing layer for retrieval. It indexes/enriches RAG-capable MCP servers and exposes agent-native tools (rag_find_servers, rag_get_server, rag_list_categories, rag_explain_score) so agents can pick the right retrieval server under constraints with explainable reasons. Repo + npm: https://github.com/khalidsaidi/ragmap`

### Show HN (longer)

Title:
`Show HN: MapRag (RAGMap) – a RAG-focused MCP subregistry + routing MCP server for retrieval tools`

Body:
- Problem: MCP ecosystems get tool overload; "RAG server" can mean many things.
- Solution: MapRag ingests registries, normalizes and enriches server records, and provides a stable tool interface for discovery + explainable selection.
- Interfaces: registry-compatible REST API + MCP server (remote + local stdio via npm).
- Repo: https://github.com/khalidsaidi/ragmap

