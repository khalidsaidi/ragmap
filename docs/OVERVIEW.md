# MapRag (RAGMap)

**MapRag is a discovery + routing layer for retrieval.**
It indexes **RAG-capable MCP servers**, enriches them with lightweight explainable metadata today (and richer **capabilities + trust signals** over time), and lets **agents (and humans)** quickly find the right retrieval server for a task under constraints like **citations, freshness, privacy, domain, and latency**.

MapRag does **not** do RAG itself.
It helps you choose the best *RAG tool/server* to do the retrieval.

**Today:** Keyword + optional **semantic search** (when OpenAI API key is set), categories and score, **hasRemote** and transport filters. Registry-compatible API and MCP server.

RAGMap is the current implementation name (repo + deployments). “MapRag” is the product concept: a map of retrieval, and a router for agents.

---

## Why MapRag exists

As the MCP ecosystem grows, you get a real problem:

- There are **too many servers/tools** to load into a model at once.
- “RAG server” means wildly different things (docs vs code vs web; local vs remote; citations vs none).
- Some servers are outdated or unreliable, and agents need a way to reason about that.

MapRag aims to answer:

> Which retrieval MCP server should I use for this task, given my constraints?

---

## What MapRag provides

### 1) RAG discovery

- Ingests upstream MCP registries/directories (official registry today).
- **Implemented today (v0.1):** Keyword-based enrichment (regex on name, title, description, URLs, packages). Assigns `categories` (rag, retrieval, embeddings, vector-db, documents, search, etc.) and `ragScore` (additive). “Search” is only tagged when at least one core RAG-related category also matches (to reduce noise). No check that a server actually implements retrieval; enrichment is text-only.
- **hasRemote:** Computed from `remotes` or streamable-http packages so you can filter to callable endpoints.

### 2) Capability-aware selection

MapRag’s target state is structured selection (domain, retrieval type, freshness, grounding, privacy, auth, limits). **Implemented today (v0.1):** Filters: `categories`, `minScore`, `transport`, `registryType`, `hasRemote`, **`reachable`** (HEAD-checked), **`citations`** (inferred from text), **`localOnly`** (stdio-only, no remote). Lightweight capability inference; no formal capability model.

### 3) Trust signals (lightweight, practical)

**Implemented today (v0.1):** Upstream official status in `_meta`; upstream `deleted` entries hidden from listings. **Reachability:** on full ingest, RAGMap sends a HEAD request to each server’s streamable-http URL (rate-limited) and stores `reachable` / `lastReachableAt`; filter with `reachable=true`. No latency or schema checks.

MapRag returns **explanations** with results so decisions are auditable.

### 4) Two programmable interfaces

MapRag is both:

**A. A registry-compatible REST API (subregistry)**
So developers can use it like a registry endpoint.

**B. An MCP server (agent-native)**
So models/agents can call MapRag as a tool to pick retrieval servers dynamically.

### 5) A human UI

Browse, filter, compare, and copy install/connect configs.

**Status**: implemented. **[/browse](https://ragmap-api.web.app/browse)** — search by meaning or keywords, filter by remote-only and min score, copy server name or install command (npx/URL), and copy RAGMap MCP config for Cursor or Claude.

---

## The core idea

MapRag is a “tool router” for retrieval:

1. A user/agent has an information need (example: “search my codebase, cite sources”).
2. MapRag finds the best matching **retrieval MCP server(s)**.
3. The agent connects to the chosen server(s) and performs retrieval.

MapRag stays out of the content path; it’s about **selection**, not generation.

---

## Agent usage

### MCP tools exposed by RAGMap

Tool names are stable and versioned. Current tools:

- `rag_find_servers`
  - Input: `{ query?, categories?, minScore?, transport?, registryType?, hasRemote?, reachable?, citations?, localOnly?, limit? }`
  - Output: ranked candidates + reasons (see `_meta["io.github.khalidsaidi/ragmap"]`)
  - Search: keyword match over server text always; when `OPENAI_API_KEY` is set, ingest stores embeddings and results use semantic ranking (cosine similarity) plus keyword.
- `rag_get_server`
  - Input: `{ name }` — registry server name (e.g. `io.github.khalidsaidi/ragmap` for RAGMap)
  - Output: full server record (latest) including `_meta`
- `rag_list_categories`
  - Output: known category list
- `rag_explain_score`
  - Input: `{ name }` — registry server name (e.g. `io.github.khalidsaidi/ragmap` for RAGMap)
  - Output: score + categories + reasons for the latest version

### Example: “privacy-first docs RAG with citations”

This is the kind of query MapRag is designed for. Today you can approximate it using categories and transport:

```json
{
  "tool": "rag_find_servers",
  "input": {
    "query": "RAG over local docs with citations",
    "categories": ["documents"],
    "transport": "stdio",
    "minScore": 30,
    "limit": 5
  }
}
```

Roadmap: first-class constraints (privacy, freshness, citations) once the capability model is implemented.

---

## REST API usage (subregistry)

RAGMap mirrors the MCP Registry API shape so existing consumers can integrate easily:

- `GET /v0.1/servers`
- `GET /v0.1/servers/{serverName}/versions`
- `GET /v0.1/servers/{serverName}/versions/{version}` (including `latest`)

Plus RAGMap-specific helpers:

- `GET /rag/search`
- `GET /rag/categories`

Enrichment is returned under `_meta["io.github.khalidsaidi/ragmap"]`.

### Current enrichment shape (v0.1)

Illustrative example:

```json
{
  "server": { "name": "example/name", "version": "0.1.0" },
  "_meta": {
    "io.modelcontextprotocol.registry/official": {
      "status": "active",
      "publishedAt": "2026-02-01T00:00:00Z",
      "updatedAt": "2026-02-01T00:00:00Z",
      "isLatest": true
    },
    "io.github.khalidsaidi/ragmap": {
      "categories": ["rag", "retrieval", "documents"],
      "ragScore": 65,
      "reasons": ["matched:rag", "matched:retrieval", "matched:documents"],
      "keywords": ["rag", "retrieval", "documents"],
      "embeddingTextHash": "..."
    }
  }
}
```

Note: when embeddings are enabled, RAGMap stores vectors in Firestore for semantic search, but does not return raw vectors in public `_meta`.

---

## Capability model (illustrative)

MapRag treats “RAG-ness” as structured capabilities, not a loose tag. Example (future shape, illustrative):

```json
{
  "io.github.khalidsaidi/ragmap": {
    "capabilities": {
      "domains": ["docs"],
      "retrieval": { "modes": ["hybrid"], "rerank": true, "max_top_k": 50 },
      "freshness": { "mode": "continuous", "max_lag_minutes": 30 },
      "grounding": { "citations": true, "provenance_fields": ["source_url", "chunk_id"] },
      "privacy": { "data_residency": "local", "stores_user_data": "no" },
      "auth": { "required": false },
      "limits": { "rate_limited": true }
    }
  }
}
```

---

## Trust philosophy

MapRag aims to be conservative and explainable:

- Prefer observed/verified signals when available.
- Fall back to declared/inferred metadata with a lower trust tier.
- Hide or warn on upstream `deleted`/flagged entries by default.
- Never claim certainty without a basis.

---

## Security stance

MapRag is a directory/router, not an execution engine:

- Treat upstream metadata as untrusted input.
- Do not execute third-party MCP packages by default.
- If probing remote endpoints, only do safe read-only discovery calls.
- Rate-limit and validate public endpoints.

---

## Repo conventions

MapRag keeps product code clean and agent artifacts isolated:

- `apps/` + `packages/` = production code
- `docs/` = durable documentation
- Local agent/IDE scratch and plans are gitignored

---

## What success looks like

MapRag becomes the default answer to:

> I need retrieval. Which MCP server should I use, and why?

It’s a map of the retrieval landscape and a router for agent systems that need grounding without tool overload.
