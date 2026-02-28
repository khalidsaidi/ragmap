import 'dotenv/config';
import { createServer } from 'node:http';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { z } from 'zod';

const API_BASE_URL = process.env.API_BASE_URL ?? 'http://localhost:3000';
const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL ?? API_BASE_URL;
const PUBLIC_MCP_URL = process.env.PUBLIC_MCP_URL ?? 'http://localhost:4000/mcp';
const PORT = Number(process.env.PORT ?? process.env.MCP_PORT ?? 4000);
const SERVICE_VERSION = process.env.SERVICE_VERSION ?? '0.1.0';
const MCP_AGENT_NAME = process.env.MCP_AGENT_NAME ?? 'ragmap-mcp-remote';
const ALLOWED_ORIGINS = (process.env.MCP_ALLOWED_ORIGINS ?? '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

function allowOrigin(origin: string | undefined | null) {
  if (!origin) return null;
  if (ALLOWED_ORIGINS.length === 0) return origin;
  return ALLOWED_ORIGINS.includes(origin) ? origin : null;
}

function respondJson(res: any, code: number, body: unknown) {
  res.statusCode = code;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body));
}

function respondText(res: any, code: number, body: string) {
  res.statusCode = code;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end(body);
}

async function apiGet(path: string, params?: Record<string, string>) {
  const url = new URL(path, API_BASE_URL);
  if (params) {
    for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  }
  const headers: Record<string, string> = { accept: 'application/json' };
  if (MCP_AGENT_NAME) headers['X-Agent-Name'] = MCP_AGENT_NAME;
  return fetch(url, { headers });
}

function createMcpServer() {
  return new McpServer({ name: 'RAGMap', version: SERVICE_VERSION });
}

function registerTools(server: McpServer) {
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
      if (!response.ok) {
        return { content: [{ type: 'text', text: JSON.stringify({ results: [] }) }] };
      }
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
      if (!response.ok) {
        return { content: [{ type: 'text', text: JSON.stringify({ results: [] }) }] };
      }
      const data = (await response.json()) as any;
      return { content: [{ type: 'text', text: JSON.stringify(data) }] };
    }
  );

  server.registerTool(
    'rag_get_server',
    {
      title: 'Get server',
      description: 'Fetch a server record by name (latest version).',
      inputSchema: { name: z.string().min(1) }
    },
    async ({ name }) => {
      const response = await apiGet(`/v0.1/servers/${encodeURIComponent(name)}/versions/latest`);
      if (!response.ok) {
        return { isError: true, content: [{ type: 'text', text: JSON.stringify({ error: 'Not found' }) }] };
      }
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
      if (!response.ok) {
        return { content: [{ type: 'text', text: JSON.stringify({ categories: [] }) }] };
      }
      const data = (await response.json()) as any;
      return { content: [{ type: 'text', text: JSON.stringify(data) }] };
    }
  );

  server.registerTool(
    'rag_explain_score',
    {
      title: 'Explain score',
      description: 'Explain RAGMap scoring for a server.',
      inputSchema: { name: z.string().min(1) }
    },
    async ({ name }) => {
      const response = await apiGet(`/rag/servers/${encodeURIComponent(name)}/explain`);
      if (!response.ok) {
        return { isError: true, content: [{ type: 'text', text: JSON.stringify({ error: 'Not found' }) }] };
      }
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
      if (!response.ok) {
        return { isError: true, content: [{ type: 'text', text: JSON.stringify({ error: 'Not found' }) }] };
      }
      const data = (await response.json()) as any;
      return { content: [{ type: 'text', text: JSON.stringify(data) }] };
    }
  );
}

async function main() {
  const httpServer = createServer(async (req, res) => {
    const origin = Array.isArray(req.headers.origin) ? req.headers.origin[0] : req.headers.origin;
    const allowed = allowOrigin(origin);
    if (allowed) res.setHeader('Access-Control-Allow-Origin', allowed);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Agent-Name, X-MCP-Client-Name, MCP-Protocol-Version, MCP-Session-Id');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,HEAD');

    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      res.end();
      return;
    }

    const url = new URL(req.url ?? '/', PUBLIC_MCP_URL);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (path === '/health') return respondJson(res, 200, { status: 'ok', service: 'ragmap-mcp-remote', version: SERVICE_VERSION });
    if (path === '/readyz') {
      try {
        const r = await apiGet('/readyz');
        if (!r.ok) return respondJson(res, 503, { status: 'not_ready' });
      } catch {
        return respondJson(res, 503, { status: 'not_ready' });
      }
      return respondJson(res, 200, { status: 'ready' });
    }

    if (path !== '/mcp') {
      res.statusCode = 404;
      res.end('Not found');
      return;
    }

    if (req.method === 'HEAD') {
      res.statusCode = 200;
      res.end();
      return;
    }

    const accept = Array.isArray(req.headers.accept) ? req.headers.accept.join(',') : req.headers.accept ?? '';
    if (accept && !accept.includes('text/event-stream')) {
      req.headers.accept = accept.trim() + ', text/event-stream';
    }
    const wantsEventStream = accept.includes('text/event-stream');
    const hasMcpHeaders =
      'mcp-protocol-version' in req.headers ||
      'mcp-session-id' in req.headers ||
      'mcp-client-name' in req.headers ||
      'x-mcp-client-name' in req.headers;

    const handleMcpHttp = async () => {
      const mcpServer = createMcpServer();
      registerTools(mcpServer);
      const transport = new StreamableHTTPServerTransport({
        // Stateless mode: create a fresh transport per request.
        sessionIdGenerator: undefined,
        enableJsonResponse: true
      });
      await mcpServer.connect(transport);
      res.on('close', () => {
        void transport.close();
        void mcpServer.close();
      });
      await transport.handleRequest(req, res, undefined);
    };

    if (req.method === 'GET') {
      if (wantsEventStream || hasMcpHeaders) return handleMcpHttp();
      return respondText(
        res,
        200,
        `RAGMap MCP endpoint. Use an MCP client.\nEndpoint: ${PUBLIC_MCP_URL}\nAPI: ${PUBLIC_BASE_URL}`
      );
    }

    if (req.method !== 'POST') {
      res.statusCode = 405;
      res.end('Method not allowed');
      return;
    }

    try {
      await handleMcpHttp();
    } catch {
      if (!res.headersSent) respondText(res, 500, 'Internal error');
    }
  });

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`ragmap mcp-remote listening on :${PORT}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
