#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { findServers, getServer, installConfig, loadCatalog, type Catalog } from './data.js';

const VERSION = '2.0.0';
const bundledPath = new URL('../data/servers.json', import.meta.url);

let catalogPromise: Promise<Catalog> | null = null;
function catalog() {
  catalogPromise ??= loadCatalog({ url: process.env.RAGMAP_DATA_URL, bundledPath });
  return catalogPromise;
}

function json(value: unknown) {
  return { content: [{ type: 'text' as const, text: JSON.stringify(value, null, 2) }] };
}

const server = new McpServer({ name: 'ragmap', version: VERSION });

server.registerTool(
  'ragmap_find',
  {
    description:
      'Find a remote MCP server that can search a body of knowledge (docs, web, papers, laws, a product, a topic). ' +
      'Every listed server answered an MCP connection with no API key in the last daily check. ' +
      'Describe what you need to know about, e.g. "EU cosmetics regulation" or "web search". Leave empty to list servers.',
    inputSchema: {
      need: z.string().optional().describe('What knowledge you need, in a few words'),
      limit: z.number().int().min(1).max(50).optional()
    }
  },
  async ({ need, limit }) => {
    const data = await catalog();
    const results = findServers(data, need, limit ?? 10);
    return json({
      checkedAt: data.generatedAt,
      count: results.length,
      servers: results.map((s) => ({ name: s.name, knowledge: s.knowledge, topics: s.topics, url: s.url, tools: s.tools, lastOk: s.lastOk })),
      ...(results.length ? {} : { hint: 'No match. Try broader words, or call with no need to see every server.' })
    });
  }
);

server.registerTool(
  'ragmap_get',
  {
    description: 'Get one server from the RAGMap list by its registry name, e.g. "io.github.example/docs".',
    inputSchema: { name: z.string() }
  },
  async ({ name }) => {
    const found = getServer(await catalog(), name);
    return found ? json(found) : json({ error: `Not in the list: ${name}` });
  }
);

server.registerTool(
  'ragmap_install',
  {
    description: 'Get copy-paste config to connect a listed server to Claude Code or any MCP client.',
    inputSchema: { name: z.string() }
  },
  async ({ name }) => {
    const found = getServer(await catalog(), name);
    return found ? json({ name: found.name, url: found.url, ...installConfig(found) }) : json({ error: `Not in the list: ${name}` });
  }
);

await server.connect(new StdioServerTransport());
