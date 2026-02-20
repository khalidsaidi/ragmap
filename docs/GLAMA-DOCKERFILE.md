# Glama Admin Dockerfile Config

Use this on:

- `https://glama.ai/mcp/servers/@khalidsaidi/ragmap/admin/dockerfile`

Important:

- This page does not accept a pasted Dockerfile.
- It accepts build-spec fields and generates Dockerfile content automatically.

## Ready values

Node.js version:

- `24`

Python version:

- `3.13`

Build steps (JSON array):

```json
[
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

Do not include `INGEST_TOKEN` or `OPENAI_API_KEY` in this schema.

- This Glama Dockerfile config is for the MCP server process (`packages/mcp-local/dist/cli.js`).
- That process only uses `RAGMAP_API_BASE_URL`, `MCP_AGENT_NAME`, and `SERVICE_VERSION`.
- `INGEST_TOKEN` / `OPENAI_API_KEY` belong to the API deployment, not the MCP runtime.

Placeholder parameters:

```json
{
  "RAGMAP_API_BASE_URL": "https://ragmap-api.web.app",
  "MCP_AGENT_NAME": "glama-inspector"
}
```

Pinned commit SHA:

- Leave empty, or set to the current short SHA from `git rev-parse --short HEAD`.
- If you pin a commit, Glama logs will show a `detached HEAD` message during `git checkout`; this is expected.

## Notes

- This page requires authenticated maintainer access.
- If not signed in as maintainer, Glama redirects to sign-up.
- Flow after `Deploy`: wait for successful test -> `Make Release` -> publish in `.../admin/dockerfile/releases`.
- Validated on 2026-02-20 with local `docker build` + `docker run`:
  - Build completed successfully with Node 24 + Python 3.13.
  - MCP endpoint responded on `/mcp` with successful `initialize`, `tools/list`, and `tools/call`.
- `--stateless` is recommended for better compatibility with raw/manual HTTP clients because it removes session-header requirements between calls.
