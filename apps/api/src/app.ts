import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { z } from 'zod';
import type { Env } from './env.js';
import type { RegistryStore } from './store/types.js';
import { META_RAGMAP_KEY, RagFiltersSchema, type RagFilters } from '@ragmap/shared';
import { runIngest } from './ingest/ingest.js';
import { embedText } from './rag/embedding.js';

function getBaseUrl(env: Env, request: { headers: Record<string, string | string[] | undefined>; protocol?: string }) {
  if (env.publicBaseUrl) return env.publicBaseUrl;
  const forwardedProto = request.headers['x-forwarded-proto'];
  const proto = Array.isArray(forwardedProto)
    ? forwardedProto[0]
    : forwardedProto ?? request.protocol ?? 'http';
  const forwardedHost = request.headers['x-forwarded-host'];
  const host = Array.isArray(forwardedHost) ? forwardedHost[0] : forwardedHost ?? request.headers.host ?? 'localhost';
  return `${proto}://${host}`;
}

function agentCard(baseUrl: string) {
  return {
    name: 'RAGMap',
    description: 'RAG-focused MCP Registry subregistry + MCP server.',
    url: baseUrl,
    version: '0.1.0',
    protocolVersion: '0.1',
    skills: [
      { id: 'rag_find_servers', name: 'Find servers', description: 'Search/filter RAG-related MCP servers.' },
      { id: 'rag_get_server', name: 'Get server', description: 'Fetch a server record by name.' },
      { id: 'rag_list_categories', name: 'List categories', description: 'List RAG categories.' },
      { id: 'rag_explain_score', name: 'Explain score', description: 'Explain RAG scoring for a server.' }
    ],
    auth: {
      type: 'none',
      description: 'Read-only endpoints are public. Ingestion endpoint is protected by X-Ingest-Token.'
    }
  };
}

function parse<T>(schema: z.ZodSchema<T>, input: unknown, reply: any) {
  const result = schema.safeParse(input);
  if (!result.success) {
    reply.code(400).send({ error: 'Invalid request', issues: result.error.flatten() });
    return null;
  }
  return result.data;
}

const ListServersQuerySchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(200).optional(),
  updated_since: z.string().optional()
});

const RagSearchQuerySchema = z.object({
  q: z.string().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(50).optional(),
  categories: z.string().optional(),
  minScore: z.coerce.number().int().min(0).max(100).optional()
});

const IngestRunBodySchema = z.object({
  mode: z.enum(['full', 'incremental']).optional()
});

export async function buildApp(params: { env: Env; store: RegistryStore }) {
  const fastify = Fastify({ logger: true, trustProxy: true, ignoreTrailingSlash: true });

  await fastify.register(cors, { origin: true });
  await fastify.register(rateLimit, { global: false });

  await fastify.register(swagger, {
    mode: 'dynamic',
    openapi: {
      info: {
        title: 'RAGMap API',
        description: 'MCP Registry-compatible subregistry API + RAG-focused search',
        version: params.env.serviceVersion
      }
    }
  });

  await fastify.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list'
    }
  });

  fastify.get('/api/openapi.json', async () => fastify.swagger());

  fastify.get('/health', async () => ({
    status: 'ok',
    service: 'ragmap-api',
    version: params.env.serviceVersion,
    storage: params.store.kind,
    ts: new Date().toISOString()
  }));

  fastify.get('/readyz', async (_req, reply) => {
    const health = await params.store.healthCheck();
    if (!health.ok) return reply.code(503).send({ status: 'not_ready', detail: health.detail ?? 'unknown' });
    return { status: 'ready' };
  });

  fastify.get('/.well-known/agent.json', async (request) => agentCard(getBaseUrl(params.env, request)));
  fastify.get('/.well-known/agent-card.json', async (request) => agentCard(getBaseUrl(params.env, request)));

  // MCP Registry compatible: list latest servers
  fastify.get('/v0.1/servers', async (request, reply) => {
    const query = parse(ListServersQuerySchema, (request as any).query, reply);
    if (!query) return;

    const limit = query.limit ?? 50;
    const updatedSince = query.updated_since ? new Date(query.updated_since) : null;
    const result = await params.store.listLatestServers({
      cursor: query.cursor,
      limit,
      updatedSince: updatedSince && Number.isFinite(updatedSince.getTime()) ? updatedSince : null
    });
    return {
      servers: result.servers,
      metadata: {
        count: result.servers.length,
        ...(result.nextCursor ? { nextCursor: result.nextCursor } : {})
      }
    };
  });

  fastify.get('/v0.1/servers/:serverName/versions', async (request, reply) => {
    const serverName = decodeURIComponent((request.params as any).serverName);
    const servers = await params.store.listServerVersions(serverName);
    if (servers.length === 0) return reply.code(404).send({ error: 'Not found' });
    return { servers, metadata: { count: servers.length } };
  });

  fastify.get('/v0.1/servers/:serverName/versions/:version', async (request, reply) => {
    const serverName = decodeURIComponent((request.params as any).serverName);
    const version = (request.params as any).version as string;
    const entry = await params.store.getServerVersion(serverName, version === 'latest' ? 'latest' : version);
    if (!entry) return reply.code(404).send({ error: 'Not found' });
    return entry;
  });

  // RAG endpoints
  fastify.get('/rag/categories', async () => {
    const categories = await params.store.listCategories();
    return { categories };
  });

  fastify.get('/rag/servers/:serverName/explain', async (request, reply) => {
    const serverName = decodeURIComponent((request.params as any).serverName);
    const explain = await params.store.getRagExplain(serverName);
    if (!explain) return reply.code(404).send({ error: 'Not found' });
    return explain;
  });

  fastify.get('/rag/search', async (request, reply) => {
    const query = parse(RagSearchQuerySchema, (request as any).query, reply);
    if (!query) return;

    const q = (query.q ?? '').trim() || 'rag';
    const limit = query.limit ?? 10;
    const categories = query.categories
      ? query.categories.split(',').map((c) => c.trim()).filter(Boolean)
      : undefined;
    const filters: RagFilters = RagFiltersSchema.parse({
      categories,
      minScore: query.minScore
    });

    let queryEmbedding: number[] | null = null;
    try {
      const embedded = await embedText(params.env, q);
      queryEmbedding = embedded?.vector ?? null;
    } catch {
      queryEmbedding = null;
    }

    const results = await params.store.searchRag({ query: q, limit, filters, queryEmbedding });

    return {
      query: q,
      results: results.map((hit) => {
        const ragmap = (hit.entry._meta?.[META_RAGMAP_KEY] as any) ?? {};
        return {
          name: hit.entry.server.name,
          version: hit.entry.server.version,
          title: (hit.entry.server as any).title ?? null,
          description: hit.entry.server.description ?? null,
          categories: ragmap.categories ?? [],
          ragScore: ragmap.ragScore ?? 0,
          kind: hit.kind,
          score: hit.score,
          server: hit.entry.server
        };
      }),
      metadata: { count: results.length }
    };
  });

  // Internal ingestion (protected)
  fastify.post('/internal/ingest/run', async (request, reply) => {
    if (!params.env.ingestToken) return reply.code(500).send({ error: 'INGEST_TOKEN is not configured' });
    const token = (request.headers['x-ingest-token'] as string | undefined) ?? '';
    if (!token || token !== params.env.ingestToken) return reply.code(401).send({ error: 'Unauthorized' });

    const body = parse(IngestRunBodySchema, (request as any).body, reply);
    if (!body) return;
    const mode = body.mode ?? 'incremental';
    const stats = await runIngest({ env: params.env, store: params.store, mode });
    return stats;
  });

  return fastify;
}
