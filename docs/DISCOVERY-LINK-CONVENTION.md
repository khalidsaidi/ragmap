# Discovery link convention

MCP server authors can point to a **discovery service** (a subregistry or search API) so that users and agents can “find more servers like this” without leaving your docs or registry entry.

## Optional field: `discoveryService`

In your **server manifest** (e.g. `server.json` for the MCP Registry, or any JSON that describes your MCP server), you can add:

```json
{
  "name": "your/package-name",
  "discoveryService": "https://ragmap-api.web.app"
}
```

- **Key:** `discoveryService`
- **Value:** URL of a discovery/subregistry API (e.g. RAGMap). No trailing slash. Should support at least search or list endpoints so clients can “discover more” servers.
- **Optional:** Omitted if you don’t want to advertise a discovery service.

Clients (IDEs, launchers, directories) can use this to show a “Discover more” or “Search similar” link. RAGMap uses it in the browse UI to show a **Discovery** badge on servers that declare it.

## Example: RAGMap

RAGMap’s own server declares:

```json
"discoveryService": "https://ragmap-api.web.app"
```

So any client that understands the convention can offer “Explore at RAGMap” or “Search RAGMap” when showing RAGMap’s card.

## Not part of the official MCP schema

This is a **convention** only. The official MCP server schema does not define `discoveryService`; it’s an optional extension. Registry validators may ignore unknown fields. If the official schema later adds a similar field, we can align.
