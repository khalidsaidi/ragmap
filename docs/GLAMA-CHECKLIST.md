# Glama Checklist

This checklist is for:

- `https://glama.ai/mcp/servers/@khalidsaidi/ragmap`

## Repo-side status

- `README.md` exists.
- `LICENSE` exists.
- `glama.json` exists and is schema-qualified.
- GitHub releases/tags exist (`v0.1.0` ... `v0.1.3`).
- NPM package exists (`@khalidsaidi/ragmap-mcp@0.1.3`).
- Usage seeding workflow exists: `.github/workflows/usage-seed.yml`.

## Important: what "No release" means in Glama

- On Glama score pages, `No release` means **no Glama Dockerfile release** has been created.
- This is separate from GitHub Releases.
- A GitHub release alone does not flip this score item.

## Important: why `/admin/dockerfile` has no paste field

- Glama now uses a build-spec form (Node version, Python version, build steps, CMD args, env schema, placeholders).
- The platform generates the Dockerfile from those values.
- Existing Dockerfiles are used as reference only.

## Required Glama maintainer flow

1. If needed, claim the server from `.../score` (`Claim this server`).
2. Open `https://glama.ai/mcp/servers/@khalidsaidi/ragmap/admin/dockerfile` while signed in as the maintainer.
3. Enter the prepared values from `docs/GLAMA-DOCKERFILE.md` and click `Deploy`.
   - Use only MCP runtime env vars (`RAGMAP_API_BASE_URL`, `MCP_AGENT_NAME`, `SERVICE_VERSION`).
   - Do not use API-only secrets (`INGEST_TOKEN`, `OPENAI_API_KEY`) in Glama's MCP Dockerfile form.
4. Wait for a successful build test, then click `Make Release`.
5. Publish the release from `.../admin/dockerfile/releases`.
6. Recheck `.../score` (this enables inspectability/tool detection and resolves `No release`).

## Related servers to add

Use:

- `https://glama.ai/mcp/servers/@khalidsaidi/ragmap/related-servers`

Already submitted suggestions (UIDs):

1. `j0xogqgoak` (`andnp/ragdocs-mcp`)
2. `bh04byu77a` (`heltonteixeira/ragdocs`)
3. `g4jkr5rjt5` (`sanderkooger/mcp-server-ragdocs`)
4. `co522bhy31` (`rahulretnan/mcp-ragdocs`)
5. `f4hsrjhmq9` (`hannesrudolph/mcp-ragdocs`)
6. `kuoeczkg9v` (`jumasheff/mcp-ragdoc-fork`)
7. `q4uywrflxx` (`qpd-v/mcp-ragdocs`)

Re-submit helper:

- `./scripts/glama-suggest-related.sh`

## Seed usage now

Workflow:

- `.github/workflows/usage-seed.yml`

Manual run:

1. GitHub Actions -> `usage-seed` -> `Run workflow`.
2. Confirm both steps passed:
3. `Seed public API usage`
4. `Seed MCP usage`

## Quick status check

Run:

- `./scripts/glama-score-status.sh`
