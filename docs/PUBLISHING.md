# Publishing

This repo is a pnpm monorepo. The only npm-published package is currently:

- `packages/mcp-local` -> `@khalidsaidi/ragmap-mcp`

## GitHub Actions (recommended)

This repo mirrors A2ABench publishing conventions:

- Tag push `v*` triggers `.github/workflows/release.yml` (GitHub Release)
- Tag push `v*` triggers `.github/workflows/publish-npm.yml` (npm publish)

Prereq:
- GitHub Actions secret `NPM_TOKEN` must be set (no secrets are committed to git).

## Pre-publish checklist

1. Confirm CI is green on `main` (typecheck + tests + deployed smoke tests).
2. **Registry discovery:** `packages/mcp-local/server.json` must include **`remotes`** with your streamable HTTP URL so the MCP Registry (and any directory that uses it) can list and health-check the server. Without `remotes`, connectors/directories have no URL to use.
3. Make sure you are not publishing secrets (e.g. `.env` and other gitignored files).
4. Build + sanity-check the tarball locally:

```bash
pnpm -C packages/mcp-local build
pnpm -C packages/mcp-local pack --pack-destination /tmp/ragmap-pack
tar -tzf /tmp/ragmap-pack/*.tgz
```

## Publish (manual)

**npm:**
```bash
pnpm -C packages/mcp-local publish
```

**MCP Registry (so directories can discover the streamable URL):** From `packages/mcp-local`, run the official publisher so the registry has `server.json` including `remotes`:
```bash
cd packages/mcp-local
../bin/mcp-publisher login github   # if needed
../bin/mcp-publisher publish
```
Verify: `curl -sS 'https://registry.modelcontextprotocol.io/v0.1/servers/io.github.khalidsaidi%2Fragmap/versions/latest' | jq '.server.remotes'` should show the streamable-http URL.

Notes:
- `packages/mcp-local/package.json` sets `publishConfig.access=public`.
- `prepublishOnly` runs `pnpm build` so `dist/` is generated for the tarball.

## Versioning

This repo uses package-level versions. Bump `packages/mcp-local/package.json` and publish:

```bash
pnpm -C packages/mcp-local version patch
pnpm -C packages/mcp-local publish
```

## Recommended (future)

Automate publishing from GitHub Actions with npm provenance:

- `npm publish --provenance --access public`

This requires configuring an npm publishing token/identity for the repo.
