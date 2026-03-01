# Start here: Ragmap (What it is + how to use it)

Ragmap helps you discover MCP servers, especially retrievers/RAG servers, with **reachability you can trust**.

**Try it:** https://ragmap-api.web.app/browse/

## What Ragmap is
- A discovery + trust layer for MCP servers.
- It ingests upstream registry data, enriches it for RAG use cases, and continuously probes remotes.
- It exposes:

  - `/rag/top` for smart defaults.
  - `/rag/search` for discovery.
  - `/rag/install` for copy/paste install configs.
  - `/rag/stats` for freshness + coverage visibility.

## The one trust concept to know
If you want "reachable recently" results, use:

- `reachable=true&reachableMaxAgeHours=24`

This avoids "reachable at some unknown time" and instead means: **reachable and checked within the last N hours**.

## Quickstart (copy/paste)
### Top reachable retrievers (checked within 24h)

```bash
curl -s "https://ragmap-api.web.app/rag/top?hasRemote=true&reachable=true&reachableMaxAgeHours=24&serverKind=retriever&limit=25" | jq .
```

### Search with trust filter

```bash
curl -s "https://ragmap-api.web.app/rag/search?q=rag&hasRemote=true&reachable=true&reachableMaxAgeHours=24&limit=10" | jq .
```

### Get install config (URL-encoded name)

```bash
curl -s "https://ragmap-api.web.app/rag/install?name=ai.filegraph%2Fdocument-processing" | jq .
```

### Inspect freshness + coverage

```bash
curl -s "https://ragmap-api.web.app/rag/stats" | jq .
```

## Where to post what (so we can respond fast)
- Bug: include the exact URL + query params you ran, and the JSON output.
- Feature request: describe the user story ("as an agent builder...") + what success looks like.
- New server suggestion: link to the server repo/registry entry and what category it belongs in.
