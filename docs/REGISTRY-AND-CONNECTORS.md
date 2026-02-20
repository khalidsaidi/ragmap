# Registry and connector directories (what we learned)

Any directory that lists external streamable HTTP MCP servers (connectors) typically gets the URL from the **official MCP Registry**. If your server has no **`remotes`** in the registry payload, they have nothing to health-check and will not list or will delist you.

## Rules that matter

1. **`remotes` in server.json**  
   Publish to the MCP Registry with `server.json` that includes:
   `"remotes": [{ "type": "streamable-http", "url": "https://your-mcp-endpoint/mcp" }]`  
   So the registry stores it and directories can use that URL.

2. **Health-check = initialize + tools/list**  
   Directories or generic clients POST to your URL with `Content-Type: application/json` and often only `Accept: application/json`. If your server returns **406** (e.g. "Client must accept both application/json and text/event-stream"), the check fails and you get marked unhealthy or delisted.

3. **Fix for 406**  
   Before passing the request to the MCP SDK, if `Accept` does not include `text/event-stream`, append it. RAGMap does this in `apps/mcp-remote/src/index.ts`.

4. **One URL for API + MCP**  
   Exposing `/mcp` on the same host as your API (e.g. ragmap-api.web.app/mcp) means one base URL for docs and MCP.

## RAGMap status

- server.json has remotes; publish to the MCP Registry so the stored payload includes it (see docs/PUBLISHING.md).
- mcp-remote appends text/event-stream to Accept when missing so clients that send only application/json work.
- firebase.json rewrites /mcp on the API host to ragmap-mcp-remote so https://ragmap-api.web.app/mcp works after deploy.

## A2ABench (apply in that repo)

- Registry: A2ABench already has remotes in the registry; keep it in server.json on every publish.
- Accept header: If the streamable HTTP server uses the same MCP SDK, add the same fix: when Accept does not include text/event-stream, append it before calling the transport.
- Verify: POST to the MCP URL with only Accept: application/json and initialize; should return 200 and serverInfo, not 406.
