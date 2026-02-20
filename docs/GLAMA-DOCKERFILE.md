# Glama Admin Dockerfile Config

Use this on:

- `https://glama.ai/mcp/servers/@khalidsaidi/ragmap/admin/dockerfile`

## Ready values

Node.js version:

- `24`

Python version:

- `3.13`

Build steps (JSON array):

```json
[
  "corepack enable",
  "pnpm install --filter @khalidsaidi/ragmap-mcp...",
  "pnpm --filter @khalidsaidi/ragmap-mcp build"
]
```

CMD arguments (JSON array):

```json
[
  "--stateless",
  "node",
  "packages/mcp-local/dist/cli.js"
]
```

Environment variables JSON schema:

```json
{
  "type": "object",
  "properties": {
    "RAGMAP_API_BASE_URL": {
      "type": "string",
      "description": "Optional API base URL override (default is hosted ragmap API)."
    },
    "MCP_AGENT_NAME": {
      "type": "string",
      "description": "Optional agent name header."
    },
    "SERVICE_VERSION": {
      "type": "string",
      "description": "Optional version override."
    }
  },
  "required": []
}
```

Placeholder parameters:

```json
{
  "RAGMAP_API_BASE_URL": "https://ragmap-api.web.app",
  "MCP_AGENT_NAME": "glama-inspector"
}
```

Pinned commit SHA:

- Leave empty, or set to the current short SHA from `git rev-parse --short HEAD`.

## Notes

- This page requires authenticated maintainer access.
- Anonymous form submission is redirected to sign-up.
- Validated on 2026-02-20 with local `docker build` + `docker run`:
  - Build completed successfully with Node 24 + Python 3.13.
  - MCP endpoint responded on `/mcp` with successful `initialize`, `tools/list`, and `tools/call`.
- `--stateless` is recommended for better compatibility with raw/manual HTTP clients because it removes session-header requirements between calls.
