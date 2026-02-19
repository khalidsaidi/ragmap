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
2. Make sure you are not publishing secrets (e.g. `.env` and other gitignored files).
3. Build + sanity-check the tarball locally:

```bash
pnpm -C packages/mcp-local build
pnpm -C packages/mcp-local pack --pack-destination /tmp/ragmap-pack
tar -tzf /tmp/ragmap-pack/*.tgz
```

## Publish (manual)

```bash
pnpm -C packages/mcp-local publish
```

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
