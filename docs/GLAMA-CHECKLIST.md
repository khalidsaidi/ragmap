# Glama Checklist

This checklist is for the Glama MCP server page at:

- `https://glama.ai/mcp/servers/@khalidsaidi/ragmap`

## Repo-side status

- `README.md` exists.
- `LICENSE` exists.
- `glama.json` exists and declares maintainers.
- GitHub Release `v0.1.3` is published (2026-02-20).
- Usage seeding workflow exists: `.github/workflows/usage-seed.yml`.

## Why "Server not inspectable" happens

Glama requires the server to be claimed by a GitHub-authenticated maintainer before inspection and installation are enabled.

Action:

1. Open `https://glama.ai/mcp/servers/@khalidsaidi/ragmap/score`.
2. Click `Claim server`.
3. Complete GitHub auth in Glama.

After claim, tool detection and installation eligibility should become available.

## Force a metadata refresh after claim

From the server page, click `Sync now` in the admin controls.

## Admin Dockerfile

- Page: `https://glama.ai/mcp/servers/@khalidsaidi/ragmap/admin/dockerfile`
- This endpoint requires authenticated maintainer access.
- Pre-filled values: `docs/GLAMA-DOCKERFILE.md`.

## Related servers to add

Use the related-servers page:

- `https://glama.ai/mcp/servers/@khalidsaidi/ragmap/related-servers`

Already submitted suggestions (by UID):

1. `j0xogqgoak` (`andnp/ragdocs-mcp`)
2. `bh04byu77a` (`heltonteixeira/ragdocs`)
3. `g4jkr5rjt5` (`sanderkooger/mcp-server-ragdocs`)
4. `co522bhy31` (`rahulretnan/mcp-ragdocs`)
5. `f4hsrjhmq9` (`hannesrudolph/mcp-ragdocs`)
6. `kuoeczkg9v` (`jumasheff/mcp-ragdoc-fork`)
7. `q4uywrflxx` (`qpd-v/mcp-ragdocs`)

Re-submit helper:

- `./scripts/glama-suggest-related.sh`

Legacy shortlist links:

1. `https://glama.ai/mcp/servers/@kazuph/mcp-docs-rag`
2. `https://glama.ai/mcp/servers/@MIDS-Lab/mcp-ragdocs`
3. `https://glama.ai/mcp/servers/@wssja/mcp-ragdocs-supabase`
4. `https://glama.ai/mcp/servers/@xizon/fullstack-rag-server`
5. `https://glama.ai/mcp/servers/@f/mcp-ragdocs-qdrant`
6. `https://glama.ai/mcp/servers/@longhuuu/MCP-RAG-Web-Browser`
7. `https://glama.ai/mcp/servers/@Anu-Ramanujam/mcp-ragdocs-cloudflare`
8. `https://glama.ai/mcp/servers/@ntegralsolutions/ragdocs-opensearch-mcp-server`

## Seed usage now

The workflow below runs the public smoke checks and creates real endpoint traffic:

- `.github/workflows/usage-seed.yml`

Manual run:

1. GitHub Actions -> `usage-seed` -> `Run workflow`.
2. Confirm both steps passed:
   - `Seed public API usage`
   - `Seed MCP usage`
