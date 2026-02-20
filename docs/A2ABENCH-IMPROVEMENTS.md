# Improvements to apply in the A2ABench repo

Use this checklist when you work on [khalidsaidi/a2abench](https://github.com/khalidsaidi/a2abench). Same findings as RAGMap (registry + streamable HTTP compatibility).

## 1. Keep `remotes` in server.json and in the MCP Registry

- A2ABench already has `remotes` in the registry; keep it in `server.json` and publish so every version in the registry includes the streamable HTTP URL.
- Before each MCP Registry publish, confirm `server.json` contains:
  ```json
  "remotes": [{ "type": "streamable-http", "url": "https://a2abench-mcp.web.app/mcp" }]
  ```

## 2. Accept clients that send only `Accept: application/json`

The MCP SDK’s Streamable HTTP transport returns **406** if the client does not send both `application/json` and `text/event-stream` in `Accept`. Many directories and scripts send only `Accept: application/json`.

**Fix (in the a2abench streamable HTTP server, before passing the request to the transport):**

```ts
const accept = Array.isArray(req.headers.accept) ? req.headers.accept.join(',') : req.headers.accept ?? '';
if (accept && !accept.includes('text/event-stream')) {
  req.headers.accept = accept.trim() + ', text/event-stream';
}
```

RAGMap does this in `apps/mcp-remote/src/index.ts` (around the `/mcp` handler). Apply the same in A2ABench’s HTTP MCP handler.

## 3. Verify after changes

```bash
# Should return 200 + serverInfo (not 406)
curl -sS -X POST https://a2abench-mcp.web.app/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"t","version":"0.1"}}}'
```

## Reference

See `docs/REGISTRY-AND-CONNECTORS.md` in this repo for the full context (registry, health-checks, 406 fix).
