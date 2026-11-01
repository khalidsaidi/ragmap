# Changelog

## v2.0.0 - 2026-10-31
Rewritten from scratch. The hosted API, database and web pages are gone.

- A daily GitHub Actions job takes the official MCP Registry, connects to every keyless remote server, lists its tools, and keeps the ones whose main job is free retrieval (labeled by Claude).
- The list lives in `data/servers.json` and in the README.
- The npm package is a local MCP server with three tools: `ragmap_find`, `ragmap_get`, `ragmap_install`. It reads the latest list from GitHub and falls back to its bundled copy.
- Removed: keyword `ragScore`, categories, semantic search, REST API, browse page, stats.

## v1.0.0 - 2026-03-01
Hosted subregistry with search, reachability probes, install configs and stats (discontinued).
