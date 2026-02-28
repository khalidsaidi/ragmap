#!/usr/bin/env node
import 'dotenv/config';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

// Default to the hosted API so `npx @khalidsaidi/ragmap-mcp` works out of the box.
const API_BASE_URL =
  process.env.RAGMAP_API_BASE_URL ?? process.env.API_BASE_URL ?? 'https://ragmap-api.web.app';
const MCP_AGENT_NAME = process.env.MCP_AGENT_NAME ?? 'ragmap-mcp-local';
const SERVICE_VERSION = process.env.SERVICE_VERSION ?? '0.1.0';

async function apiGet(path: string, params?: Record<string, string>) {
  const url = new URL(path, API_BASE_URL);
  if (params) {
    Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  }
  const headers: Record<string, string> = { accept: 'application/json' };
  if (MCP_AGENT_NAME) headers['X-Agent-Name'] = MCP_AGENT_NAME;
  return fetch(url, { headers });
}

const server = new McpServer({
  name: 'RAGMap',
  version: SERVICE_VERSION
});

server.registerTool(
  'rag_find_servers',
  {
    title: 'Find RAG MCP servers',
    description: 'Search/filter RAG-related MCP servers from the RAGMap subregistry.',
    inputSchema: {
      query: z.string().min(1).optional(),
      categories: z.array(z.string()).optional(),
      minScore: z.number().int().min(0).max(100).optional(),
      transport: z.enum(['stdio', 'streamable-http']).optional(),
      registryType: z.string().min(1).optional(),
      hasRemote: z.boolean().optional(),
      reachable: z.boolean().optional(),
      citations: z.boolean().optional(),
      localOnly: z.boolean().optional(),
      serverKind: z.enum(['retriever', 'evaluator', 'indexer', 'router', 'other']).optional(),
      limit: z.number().int().min(1).max(50).optional()
    }
  },
  async ({ query, categories, minScore, transport, registryType, hasRemote, reachable, citations, localOnly, serverKind, limit }) => {
    const response = await apiGet('/rag/search', {
      q: query ?? 'rag',
      limit: String(limit ?? 10),
      ...(categories && categories.length ? { categories: categories.join(',') } : {}),
      ...(minScore != null ? { minScore: String(minScore) } : {}),
      ...(transport ? { transport } : {}),
      ...(registryType ? { registryType } : {}),
      ...(hasRemote !== undefined ? { hasRemote: String(hasRemote) } : {}),
      ...(reachable !== undefined ? { reachable: String(reachable) } : {}),
      ...(citations !== undefined ? { citations: String(citations) } : {}),
      ...(localOnly !== undefined ? { localOnly: String(localOnly) } : {}),
      ...(serverKind ? { serverKind } : {})
    });
    if (!response.ok) return { content: [{ type: 'text', text: JSON.stringify({ results: [] }) }] };
    const data = (await response.json()) as any;
    return { content: [{ type: 'text', text: JSON.stringify(data) }] };
  }
);

server.registerTool(
  'rag_top_servers',
  {
    title: 'Top recommended servers',
    description: 'Get top recommended retriever MCP servers with smart defaults.',
    inputSchema: {
      categories: z.array(z.string()).optional(),
      minScore: z.number().int().min(0).max(100).optional(),
      hasRemote: z.boolean().optional(),
      reachable: z.boolean().optional(),
      localOnly: z.boolean().optional(),
      serverKind: z.enum(['retriever', 'evaluator', 'indexer', 'router', 'other']).optional(),
      limit: z.number().int().min(1).max(50).optional()
    }
  },
  async ({ categories, minScore, hasRemote, reachable, localOnly, serverKind, limit }) => {
    const response = await apiGet('/rag/top', {
      limit: String(limit ?? 25),
      ...(categories && categories.length ? { categories: categories.join(',') } : {}),
      ...(minScore != null ? { minScore: String(minScore) } : {}),
      ...(hasRemote !== undefined ? { hasRemote: String(hasRemote) } : {}),
      ...(reachable !== undefined ? { reachable: String(reachable) } : {}),
      ...(localOnly !== undefined ? { localOnly: String(localOnly) } : {}),
      ...(serverKind ? { serverKind } : {})
    });
    if (!response.ok) return { content: [{ type: 'text', text: JSON.stringify({ results: [] }) }] };
    const data = (await response.json()) as any;
    return { content: [{ type: 'text', text: JSON.stringify(data) }] };
  }
);

server.registerTool(
  'rag_get_server',
  {
    title: 'Get server',
    description: 'Fetch a server record by registry name (latest version). Use the exact name from the registry, e.g. io.github.khalidsaidi/ragmap for RAGMap.',
    inputSchema: { name: z.string().min(1) }
  },
  async ({ name }) => {
    const response = await apiGet(`/v0.1/servers/${encodeURIComponent(name)}/versions/latest`);
    if (!response.ok) return { isError: true, content: [{ type: 'text', text: JSON.stringify({ error: 'Not found' }) }] };
    const data = (await response.json()) as any;
    return { content: [{ type: 'text', text: JSON.stringify(data) }] };
  }
);

server.registerTool(
  'rag_list_categories',
  {
    title: 'List categories',
    description: 'List all RAG categories known to RAGMap.',
    inputSchema: {}
  },
  async () => {
    const response = await apiGet('/rag/categories');
    if (!response.ok) return { content: [{ type: 'text', text: JSON.stringify({ categories: [] }) }] };
    const data = (await response.json()) as any;
    return { content: [{ type: 'text', text: JSON.stringify(data) }] };
  }
);

server.registerTool(
  'rag_explain_score',
  {
    title: 'Explain score',
    description: 'Explain RAGMap scoring for a server. Use the registry server name, e.g. io.github.khalidsaidi/ragmap for RAGMap.',
    inputSchema: { name: z.string().min(1) }
  },
  async ({ name }) => {
    const response = await apiGet(`/rag/servers/${encodeURIComponent(name)}/explain`);
    if (!response.ok) return { isError: true, content: [{ type: 'text', text: JSON.stringify({ error: 'Not found' }) }] };
    const data = (await response.json()) as any;
    return { content: [{ type: 'text', text: JSON.stringify(data) }] };
  }
);

server.registerTool(
  'rag_get_install_config',
  {
    title: 'Get install config',
    description: 'Get copy-ready Claude Desktop and generic MCP host config for a server.',
    inputSchema: { name: z.string().min(1) }
  },
  async ({ name }) => {
    const response = await apiGet('/rag/install', { name });
    if (!response.ok) return { isError: true, content: [{ type: 'text', text: JSON.stringify({ error: 'Not found' }) }] };
    const data = (await response.json()) as any;
    return { content: [{ type: 'text', text: JSON.stringify(data) }] };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
