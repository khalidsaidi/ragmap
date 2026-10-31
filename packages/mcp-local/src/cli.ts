#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

type CatalogServer = {
  name: string;
  version: string;
  title: string | null;
  description: string | null;
  remotes: Array<{ type: string; url: string }>;
  packages: Array<{ registryType?: string; identifier?: string; version?: string; transport?: { type?: string } }>;
  ragScore: number;
  categories: string[];
  serverKind: string;
  hasRemote: boolean;
  citations: boolean;
};

type Catalog = { generatedAt: string; count: number; servers: CatalogServer[] };

const here = path.dirname(fileURLToPath(import.meta.url));
const catalog: Catalog = JSON.parse(
  fs.readFileSync(path.join(here, '..', 'data', 'catalog.json'), 'utf8')
);

const KIND = z.enum(['retriever', 'evaluator', 'indexer', 'router', 'other']);

function matchesQuery(server: CatalogServer, query: string) {
  const haystack = [server.name, server.title ?? '', server.description ?? '', ...server.categories]
    .join(' ')
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .every((token) => haystack.includes(token));
}

function filterServers(args: {
  query?: string;
  categories?: string[];
  minScore?: number;
  transport?: 'stdio' | 'streamable-http';
  registryType?: string;
  hasRemote?: boolean;
  citations?: boolean;
  localOnly?: boolean;
  serverKind?: z.infer<typeof KIND>;
}) {
  return catalog.servers.filter((s) => {
    if (args.query && !matchesQuery(s, args.query)) return false;
    if (args.categories?.length && !args.categories.every((c) => s.categories.includes(c))) return false;
    if (args.minScore != null && s.ragScore < args.minScore) return false;
    if (args.transport === 'streamable-http' && !s.remotes.some((r) => r.type === 'streamable-http')) return false;
    if (args.transport === 'stdio' && !s.packages.some((p) => p.transport?.type === 'stdio')) return false;
    if (args.registryType && !s.packages.some((p) => p.registryType === args.registryType)) return false;
    if (args.hasRemote !== undefined && s.hasRemote !== args.hasRemote) return false;
    if (args.citations !== undefined && s.citations !== args.citations) return false;
    if (args.localOnly !== undefined && !s.hasRemote !== args.localOnly) return false;
    if (args.serverKind && s.serverKind !== args.serverKind) return false;
    return true;
  });
}

function result(data: unknown, isError = false) {
  return {
    ...(isError ? { isError: true } : {}),
    content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }]
  };
}

function findByName(name: string) {
  return catalog.servers.find((s) => s.name === name) ?? null;
}

const server = new McpServer({ name: 'RAGMap', version: '1.1.0' });

server.registerTool(
  'rag_find_servers',
  {
    title: 'Find RAG MCP servers',
    description: `Search RAG-related MCP servers in the bundled RAGMap catalog (generated ${catalog.generatedAt}).`,
    inputSchema: {
      query: z.string().min(1).optional(),
      categories: z.array(z.string()).optional(),
      minScore: z.number().int().min(0).max(100).optional(),
      transport: z.enum(['stdio', 'streamable-http']).optional(),
      registryType: z.string().min(1).optional(),
      hasRemote: z.boolean().optional(),
      citations: z.boolean().optional(),
      localOnly: z.boolean().optional(),
      serverKind: KIND.optional(),
      limit: z.number().int().min(1).max(50).optional()
    }
  },
  async (args) => {
    const hits = filterServers(args).slice(0, args.limit ?? 10);
    return result({ results: hits, metadata: { count: hits.length, generatedAt: catalog.generatedAt } });
  }
);

server.registerTool(
  'rag_top_servers',
  {
    title: 'Top recommended servers',
    description: 'Top RAG MCP servers by RAG score, with optional filters.',
    inputSchema: {
      categories: z.array(z.string()).optional(),
      minScore: z.number().int().min(0).max(100).optional(),
      hasRemote: z.boolean().optional(),
      localOnly: z.boolean().optional(),
      serverKind: KIND.optional(),
      limit: z.number().int().min(1).max(50).optional()
    }
  },
  async (args) => {
    const hits = filterServers({
      ...args,
      minScore: args.minScore ?? 10,
      serverKind: args.serverKind ?? 'retriever'
    }).slice(0, args.limit ?? 25);
    return result({ results: hits, metadata: { count: hits.length, generatedAt: catalog.generatedAt } });
  }
);

server.registerTool(
  'rag_get_server',
  {
    title: 'Get server',
    description: 'Get one server from the catalog by its exact registry name, e.g. io.github.khalidsaidi/ragmap.',
    inputSchema: { name: z.string().min(1) }
  },
  async ({ name }) => {
    const hit = findByName(name);
    return hit ? result(hit) : result({ error: 'Not found in catalog' }, true);
  }
);

server.registerTool(
  'rag_list_categories',
  {
    title: 'List categories',
    description: 'List all RAG categories in the catalog.',
    inputSchema: {}
  },
  async () => {
    const categories = [...new Set(catalog.servers.flatMap((s) => s.categories))].sort();
    return result({ categories });
  }
);

server.registerTool(
  'rag_explain_score',
  {
    title: 'Explain score',
    description: 'Show the RAG score and categories for one server, by exact registry name.',
    inputSchema: { name: z.string().min(1) }
  },
  async ({ name }) => {
    const hit = findByName(name);
    if (!hit) return result({ error: 'Not found in catalog' }, true);
    return result({ name: hit.name, version: hit.version, ragScore: hit.ragScore, categories: hit.categories, serverKind: hit.serverKind });
  }
);

server.registerTool(
  'rag_get_install_config',
  {
    title: 'Get install config',
    description: 'Get a copy-ready MCP host config snippet for one server, by exact registry name.',
    inputSchema: { name: z.string().min(1) }
  },
  async ({ name }) => {
    const hit = findByName(name);
    if (!hit) return result({ error: 'Not found in catalog' }, true);
    const key = hit.name.replace(/[^a-zA-Z0-9_.-]/g, '_');
    const remote = hit.remotes.find((r) => r.type === 'streamable-http') ?? hit.remotes[0];
    const pkg = hit.packages.find((p) => p.transport?.type === 'stdio') ?? hit.packages[0];
    const config = remote
      ? { mcpServers: { [key]: { transport: remote.type, url: remote.url } } }
      : pkg?.identifier
        ? { mcpServers: { [key]: { command: 'npx', args: ['-y', pkg.version ? `${pkg.identifier}@${pkg.version}` : pkg.identifier] } } }
        : { mcpServers: {} };
    return result({ serverName: hit.name, version: hit.version, config });
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
