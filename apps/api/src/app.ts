import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { z } from 'zod';
import type { Env } from './env.js';
import type { RegistryStore } from './store/types.js';
import { META_RAGMAP_KEY, RagFiltersSchema, type RagFilters } from '@ragmap/shared';
import { getProbeTargets, runIngest } from './ingest/ingest.js';
import { runReachabilityRefresh } from './reachability/run.js';
import { embedText } from './rag/embedding.js';
import { inferHasRemoteFromServer, inferServerKindFromServer } from './rag/search.js';

type RouteRequest = {
  routerPath?: string;
  routeOptions?: { url?: string };
  raw: { url?: string };
  url: string;
  method: string;
  ip?: string;
  socket?: { remoteAddress?: string };
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
  query?: unknown;
  params?: unknown;
  id?: string;
};

type UsageTrafficClass = 'product_api' | 'crawler_probe';

const CANONICAL_DISCOVERY_PATHS = ['/.well-known/agent.json', '/.well-known/agent-card.json'] as const;

function normalizeHeader(value: string | string[] | undefined) {
  if (value == null) return '';
  if (Array.isArray(value)) return String(value[0] ?? '').trim();
  return String(value).trim();
}

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

function resolveRoute(request: RouteRequest) {
  const value = request.routerPath ?? request.routeOptions?.url ?? request.raw.url ?? request.url ?? '';
  return value.split('?')[0] ?? '';
}

function parseBoolish(value: unknown) {
  if (value === true || value === 1 || value === '1') return true;
  if (typeof value === 'string' && value.toLowerCase() === 'true') return true;
  return false;
}

function getDiscoveryRedirectTarget(rawUrl: string) {
  let parsed: URL;
  try {
    parsed = new URL(rawUrl, 'http://localhost');
  } catch {
    return null;
  }

  const pathname = parsed.pathname;
  for (const canonicalPath of CANONICAL_DISCOVERY_PATHS) {
    if (pathname === canonicalPath) return null;
    if (pathname.endsWith(canonicalPath)) return `${canonicalPath}${parsed.search}`;
    if (pathname.length > 1 && pathname.endsWith('/')) {
      const trimmed = pathname.replace(/\/+$/, '');
      if (trimmed === canonicalPath) return `${canonicalPath}${parsed.search}`;
      if (trimmed.endsWith(canonicalPath)) return `${canonicalPath}${parsed.search}`;
    }
  }

  return null;
}

function firstHeaderIp(value: string) {
  return value.split(',')[0]?.trim();
}

function getClientIp(request: RouteRequest) {
  const forwarded = normalizeHeader(request.headers['x-forwarded-for']);
  if (forwarded) return firstHeaderIp(forwarded);
  const realIp = normalizeHeader(request.headers['x-real-ip']);
  if (realIp) return realIp;
  const cfIp = normalizeHeader(request.headers['cf-connecting-ip']);
  if (cfIp) return cfIp;
  const appEngineIp = normalizeHeader(request.headers['x-appengine-user-ip']);
  if (appEngineIp) return appEngineIp;
  return request.ip ?? request.socket?.remoteAddress ?? null;
}

function getAgentName(headers: Record<string, string | string[] | undefined>) {
  const name = normalizeHeader(
    headers['x-agent-name'] ??
      headers['x-mcp-client-name'] ??
      headers['mcp-client-name'] ??
      headers['x-client-name']
  );
  if (!name) return null;
  return name.slice(0, 128);
}

function isAgentTraffic(agentName: string | null, userAgent: string | null) {
  if (agentName) return true;
  if (!userAgent) return false;
  return /(chatgpt|claude|agent|mcp|bot)/i.test(userAgent);
}

function parseBasicAuth(headers: Record<string, string | string[] | undefined>) {
  const header = normalizeHeader(headers.authorization);
  if (!header || !header.toLowerCase().startsWith('basic ')) return null;
  const encoded = header.slice(6).trim();
  if (!encoded) return null;
  try {
    const decoded = Buffer.from(encoded, 'base64').toString('utf8');
    const [user, pass] = decoded.split(':');
    if (!user || !pass) return null;
    return { user, pass };
  } catch {
    return null;
  }
}

async function requireAdminDashboard(env: Env, request: { headers: Record<string, string | string[] | undefined> }, reply: any) {
  if (!env.adminDashUser || !env.adminDashPass) {
    reply.code(500).send('Admin dashboard credentials are not configured');
    return false;
  }
  const creds = parseBasicAuth(request.headers);
  if (!creds || creds.user !== env.adminDashUser || creds.pass !== env.adminDashPass) {
    reply.header('WWW-Authenticate', 'Basic realm="RAGMap Admin"');
    reply.code(401).send('Unauthorized');
    return false;
  }
  return true;
}

function requireIngestToken(env: Env, request: { headers: Record<string, string | string[] | undefined> }, reply: any) {
  if (!env.ingestToken) {
    reply.code(500).send({ error: 'INGEST_TOKEN is not configured' });
    return false;
  }
  const token = (request.headers['x-ingest-token'] as string | undefined) ?? '';
  if (!token || token !== env.ingestToken) {
    reply.code(401).send({ error: 'Unauthorized' });
    return false;
  }
  return true;
}

function parseOptionalBool(value: 'true' | 'false' | undefined) {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return undefined;
}

function parseCategories(value: string | undefined) {
  if (!value) return undefined;
  const categories = value.split(',').map((c) => c.trim()).filter(Boolean);
  return categories.length ? categories : undefined;
}

function isoOrNull(value: Date | null) {
  return value ? value.toISOString() : null;
}

function sanitizeHeaderValue(name: string, rawValue: unknown, isSecret: boolean) {
  if (isSecret || /authorization|token|secret|password|api[-_]?key/i.test(name)) return '<set-secret>';
  if (typeof rawValue === 'string' && rawValue && rawValue.length <= 120) return rawValue;
  return '<set-value>';
}

function buildStdioCommand(pkg: any) {
  const registryType = String(pkg?.registryType ?? '').toLowerCase();
  const runtimeHint = String(pkg?.runtimeHint ?? pkg?.runtime?.name ?? '').toLowerCase();
  const identifier = String(pkg?.identifier ?? pkg?.name ?? '').trim();
  if (!identifier) return null;

  let command = 'npx';
  let args: string[] = ['-y'];
  if (runtimeHint === 'uvx' || registryType === 'pypi' || registryType === 'python') {
    command = 'uvx';
    args = [];
  } else if (runtimeHint === 'pipx') {
    command = 'pipx';
    args = ['run'];
  } else if (runtimeHint === 'npm' || runtimeHint === 'npx' || registryType === 'npm') {
    command = 'npx';
    args = ['-y'];
  }

  let target = identifier;
  if (command === 'npx' && typeof pkg?.version === 'string' && pkg.version && !identifier.includes('@')) {
    target = `${identifier}@${pkg.version}`;
  }
  if ((command === 'uvx' || command === 'pipx') && typeof pkg?.version === 'string' && pkg.version) {
    target = `${identifier}==${pkg.version}`;
  }

  const extraArgs: string[] = Array.isArray(pkg?.packageArguments)
    ? pkg.packageArguments
        .filter((arg: any) => arg && arg.type === 'positional' && typeof arg.value === 'string' && arg.value)
        .map((arg: any) => arg.value)
    : [];
  return { command, args: [...args, target, ...extraArgs] };
}

function mapRemoteEndpoints(server: any) {
  const endpoints: Array<{ url: string; headers: Array<{ name: string; description: string | null; isSecret: boolean; required: boolean }> }> = [];
  const remotes: any[] = Array.isArray(server?.remotes) ? server.remotes : [];
  for (const remote of remotes) {
    if (remote?.type !== 'streamable-http') continue;
    const url = typeof remote?.url === 'string' ? remote.url : '';
    if (!url) continue;
    const headers: Array<{ name: string; description: string | null; isSecret: boolean; required: boolean }> = [];
    if (Array.isArray(remote?.headers)) {
      for (const h of remote.headers) {
        if (!h || typeof h !== 'object') continue;
        const name = typeof h.name === 'string' ? h.name : '';
        if (!name) continue;
        headers.push({
          name,
          description: typeof h.description === 'string' ? h.description : null,
          isSecret: h.isSecret === true,
          required: h.required !== false
        });
      }
    } else if (remote?.headers && typeof remote.headers === 'object') {
      for (const [name, value] of Object.entries(remote.headers as Record<string, unknown>)) {
        headers.push({
          name,
          description: null,
          isSecret: /authorization|token|secret|password|api[-_]?key/i.test(name),
          required: true
        });
        void value;
      }
    }
    endpoints.push({ url, headers });
  }
  return endpoints;
}

function mapRagHit(hit: { entry: any; kind: string; score: number }) {
  const ragmap = (hit.entry._meta?.[META_RAGMAP_KEY] as any) ?? {};
  const serverAny = hit.entry.server as any;
  const hasRemoteOut =
    typeof ragmap.hasRemote === 'boolean'
      ? ragmap.hasRemote
      : inferHasRemoteFromServer(hit.entry.server as any);
  const localOnlyOut =
    typeof ragmap.localOnly === 'boolean' ? ragmap.localOnly : !hasRemoteOut;
  const serverKindOut =
    typeof ragmap.serverKind === 'string'
      ? ragmap.serverKind
      : inferServerKindFromServer(hit.entry.server as any);
  return {
    name: hit.entry.server.name,
    version: hit.entry.server.version,
    title: serverAny.title ?? null,
    description: hit.entry.server.description ?? null,
    categories: ragmap.categories ?? [],
    ragScore: ragmap.ragScore ?? 0,
    hasRemote: hasRemoteOut,
    reachable: ragmap.reachable ?? false,
    citations: ragmap.citations ?? false,
    localOnly: localOnlyOut,
    serverKind: serverKindOut,
    discoveryService: typeof serverAny.discoveryService === 'string' ? serverAny.discoveryService : null,
    kind: hit.kind,
    score: hit.score,
    server: hit.entry.server
  };
}

const SENSITIVE_PATTERNS: Array<{ pattern: RegExp; label: string }> = [
  { pattern: /-----BEGIN [A-Z ]*PRIVATE KEY-----/i, label: 'private-key' },
  { pattern: /\bsk-[A-Za-z0-9]{16,}\b/, label: 'openai-key' },
  { pattern: /\bAIza[0-9A-Za-z\-_]{20,}\b/, label: 'google-api-key' },
  { pattern: /\bAKIA[0-9A-Z]{16}\b/, label: 'aws-access-key' },
  { pattern: /\bASIA[0-9A-Z]{16}\b/, label: 'aws-temp-key' },
  { pattern: /\bghp_[A-Za-z0-9]{20,}\b/, label: 'github-token' },
  { pattern: /\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/, label: 'phone' },
  { pattern: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i, label: 'email' }
];

const PAYLOAD_REDACT_KEYS = [
  'authorization',
  'apiKey',
  'api_key',
  'token',
  'secret',
  'password',
  'x-llm-api-key',
  'llm_api_key'
];

function redactString(text: string) {
  let output = text;
  for (const entry of SENSITIVE_PATTERNS) {
    output = output.replace(entry.pattern, `[redacted:${entry.label}]`);
  }
  output = output.replace(/Bearer\\s+[A-Za-z0-9._-]+/gi, 'Bearer [redacted]');
  return output;
}

function redactPayload(value: unknown): unknown {
  if (typeof value === 'string') return redactString(value);
  if (typeof value === 'number' || typeof value === 'boolean' || value == null) return value;
  if (Array.isArray(value)) return value.map((item) => redactPayload(item));
  if (value instanceof Buffer) return redactString(value.toString('utf8'));
  if (typeof value === 'object') {
    const output: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      const lower = key.toLowerCase();
      if (PAYLOAD_REDACT_KEYS.some((needle) => lower.includes(needle))) {
        output[key] = '[redacted]';
      } else {
        output[key] = redactPayload(val);
      }
    }
    return output;
  }
  return value;
}

function stringifyPayload(env: Env, value: unknown) {
  const safeValue = redactPayload(value);
  const text = typeof safeValue === 'string' ? safeValue : JSON.stringify(safeValue);
  const redacted = redactString(text);
  if (Buffer.byteLength(redacted, 'utf8') <= env.agentPayloadMaxBytes) return redacted;
  return `${redacted.slice(0, env.agentPayloadMaxBytes)}...<truncated>`;
}

function buildRequestPayload(request: { body?: unknown; query?: unknown; params?: unknown }) {
  const payload: Record<string, unknown> = {};
  if (request.body !== undefined) payload.body = request.body;
  if (request.query !== undefined && Object.keys(request.query as Record<string, unknown>).length > 0) {
    payload.query = request.query;
  }
  if (request.params !== undefined && Object.keys(request.params as Record<string, unknown>).length > 0) {
    payload.params = request.params;
  }
  return payload;
}

function isNoiseEvent(entry: { method: string; route: string; status: number }) {
  const method = entry.method.toUpperCase();
  if (method !== 'GET' && method !== 'HEAD') return false;

  if (entry.status === 404) {
    if (entry.route === '/') return true;
  }

  if (entry.status === 401 || entry.status === 403) {
    if (entry.route === '/admin/usage') return true;
    if (entry.route === '/admin/usage/data') return true;
    if (entry.route === '/admin/agent-events') return true;
    if (entry.route === '/admin/agent-events/data') return true;
  }

  return false;
}

function agentCard(baseUrl: string) {
  return {
    name: 'RAGMap',
    description:
      'Discover and filter RAG-capable MCP servers. Semantic + keyword search over retrieval servers. Use for Cursor, Claude, or any agent that needs to find the right retrieval MCP (by meaning, remote-only, citations, local-only).',
    url: baseUrl,
    version: '0.1.0',
    protocolVersion: '0.1',
    skills: [
      { id: 'rag_find_servers', name: 'Find servers', description: 'Search/filter RAG-related MCP servers. Params: query (q), limit, hasRemote, reachable, citations, localOnly, minScore, categories, serverKind.' },
      { id: 'rag_top_servers', name: 'Top servers', description: 'Get top recommended retriever servers with smart defaults and filters.' },
      { id: 'rag_get_install_config', name: 'Get install config', description: 'Get copy-ready Claude Desktop and generic MCP host snippets for a server.' },
      { id: 'rag_get_server', name: 'Get server', description: 'Fetch a server record by name (latest version).' },
      { id: 'rag_list_categories', name: 'List categories', description: 'List RAG categories.' },
      { id: 'rag_explain_score', name: 'Explain score', description: 'Explain RAG scoring for a server.' }
    ],
    auth: {
      type: 'none',
      description: 'Read-only endpoints are public. Ingestion endpoint is protected by X-Ingest-Token.'
    },
    // So HTTP-only agents can call the API directly without installing the MCP
    apiEndpoints: {
      search: { method: 'GET', path: '/rag/search', params: ['q', 'limit', 'hasRemote', 'reachable', 'citations', 'localOnly', 'minScore', 'categories', 'serverKind'] },
      top: { method: 'GET', path: '/rag/top', params: ['limit', 'minScore', 'hasRemote', 'reachable', 'localOnly', 'categories', 'serverKind'] },
      install: { method: 'GET', path: '/rag/install', params: ['name'] },
      stats: { method: 'GET', path: '/rag/stats', params: [] },
      listServers: { method: 'GET', path: '/v0.1/servers', params: ['limit', 'cursor'] },
      getServer: { method: 'GET', path: '/v0.1/servers/{name}/versions/latest' },
      categories: { method: 'GET', path: '/rag/categories' }
    },
    mcpInstall: 'npx -y @khalidsaidi/ragmap-mcp@latest',
    mcpUrl: `${baseUrl}/mcp`,
    keywords: ['mcp', 'rag', 'retrieval', 'discovery', 'cursor', 'claude', 'registry', 'search']
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
  minScore: z.coerce.number().int().min(0).max(100).optional(),
  transport: z.enum(['stdio', 'streamable-http']).optional(),
  registryType: z.string().optional(),
  hasRemote: z.enum(['true', 'false']).optional(),
  reachable: z.enum(['true', 'false']).optional(),
  citations: z.enum(['true', 'false']).optional(),
  localOnly: z.enum(['true', 'false']).optional(),
  serverKind: z.enum(['retriever', 'evaluator', 'indexer', 'router', 'other']).optional()
});

const RagTopQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(50).optional(),
  categories: z.string().optional(),
  minScore: z.coerce.number().int().min(0).max(100).optional(),
  hasRemote: z.enum(['true', 'false']).optional(),
  reachable: z.enum(['true', 'false']).optional(),
  localOnly: z.enum(['true', 'false']).optional(),
  serverKind: z.enum(['retriever', 'evaluator', 'indexer', 'router', 'other']).optional()
});

const RagInstallQuerySchema = z.object({
  name: z.string().min(1)
});

const IngestRunBodySchema = z.object({
  mode: z.enum(['full', 'incremental']).optional()
});

const ReachabilityRunBodySchema = z.object({
  limit: z.coerce.number().int().min(1).max(500).optional()
});

const AdminUsageQuerySchema = z.object({
  days: z.coerce.number().int().min(1).max(90).optional(),
  includeNoise: z.union([z.string(), z.number(), z.boolean()]).optional(),
  includeCrawlerProbes: z.union([z.string(), z.number(), z.boolean()]).optional()
});

const AdminAgentEventsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(200).optional(),
  source: z.string().min(1).optional(),
  kind: z.string().min(1).optional()
});

const AgentEventsIngestBodySchema = z.object({
  source: z.string().min(1),
  kind: z.string().min(1),
  method: z.string().optional(),
  route: z.string().optional(),
  status: z.number().int().optional(),
  durationMs: z.number().int().optional(),
  tool: z.string().optional(),
  requestId: z.string().optional(),
  agentName: z.string().optional(),
  userAgent: z.string().optional(),
  ip: z.string().optional(),
  requestBody: z.unknown().optional(),
  responseBody: z.unknown().optional()
});

export async function buildApp(params: { env: Env; store: RegistryStore }) {
  const fastify = Fastify({ logger: true, trustProxy: true, routerOptions: { ignoreTrailingSlash: true } });

  await fastify.register(cors, { origin: true });
  await fastify.register(rateLimit, { global: false });

  const CAPTURED_ROUTES = new Set([
    '/v0.1/servers',
    '/v0.1/servers/*',
    '/rag/search',
    '/rag/top',
    '/rag/install',
    '/rag/categories',
    '/rag/servers/*'
  ]);

  fastify.addHook('onRequest', async (request, reply) => {
    (request as { startTimeNs?: bigint }).startTimeNs = process.hrtime.bigint();
    (request as { usageTrafficClass?: UsageTrafficClass }).usageTrafficClass = 'product_api';

    const rawUrl = request.raw.url ?? request.url;
    if (rawUrl && (request.method === 'GET' || request.method === 'HEAD')) {
      const redirectTarget = getDiscoveryRedirectTarget(rawUrl);
      if (redirectTarget) {
        (request as { usageTrafficClass?: UsageTrafficClass }).usageTrafficClass = 'crawler_probe';
        reply.redirect(redirectTarget, 301);
        return;
      }
    }
  });

  fastify.addHook('preHandler', async (request) => {
    if (!params.env.captureAgentPayloads) return;
    const route = resolveRoute(request as unknown as RouteRequest);
    if (!CAPTURED_ROUTES.has(route)) return;
    const userAgent = normalizeHeader(request.headers['user-agent']).slice(0, 256) || null;
    const agentName = getAgentName(request.headers);
    if (!isAgentTraffic(agentName, userAgent)) return;
    const payload = buildRequestPayload(request as unknown as { body?: unknown; query?: unknown; params?: unknown });
    (request as { payloadCapture?: { requestBody?: unknown; responseBody?: unknown; route?: string } }).payloadCapture = {
      requestBody: payload,
      route
    };
  });

  fastify.addHook('onSend', async (request, _reply, payload) => {
    if (!params.env.captureAgentPayloads) return payload;
    const capture = (request as { payloadCapture?: { requestBody?: unknown; responseBody?: unknown } }).payloadCapture;
    if (capture) capture.responseBody = payload;
    return payload;
  });

  fastify.addHook('onResponse', async (request, reply) => {
    if (request.method === 'OPTIONS') return;
    const startNs = (request as { startTimeNs?: bigint }).startTimeNs;
    const durationMs = startNs ? Math.max(0, Number(process.hrtime.bigint() - startNs) / 1_000_000) : 0;
    const route = resolveRoute(request as unknown as RouteRequest);

    const userAgent = normalizeHeader(request.headers['user-agent']).slice(0, 256) || null;
    const ip = getClientIp(request as unknown as RouteRequest);
    const referer = normalizeHeader((request.headers as any).referer ?? (request.headers as any).referrer).slice(0, 512) || null;
    const agentName = getAgentName(request.headers);
    const trafficClass = (request as { usageTrafficClass?: UsageTrafficClass }).usageTrafficClass ?? 'product_api';

    if (!params.env.logNoise && isNoiseEvent({ method: request.method, route, status: reply.statusCode })) {
      return;
    }

    void params.store
      .writeUsageEvent({
        createdAt: new Date(),
        method: request.method,
        route,
        status: reply.statusCode,
        durationMs: Math.round(durationMs),
        userAgent,
        ip,
        referer,
        agentName,
        trafficClass
      })
      .catch((err) => {
        request.log.warn({ err }, 'usage event logging failed');
      });

    const capture = (request as { payloadCapture?: { requestBody?: unknown; responseBody?: unknown; route?: string } }).payloadCapture;
    if (capture) {
      try {
        await params.store.writeAgentPayloadEvent({
          createdAt: new Date(),
          source: 'api',
          kind: request.method === 'GET' ? 'rest_read' : 'rest_write',
          method: request.method,
          route: capture.route ?? route,
          status: reply.statusCode,
          durationMs: Math.round(durationMs),
          tool: null,
          requestId: (request as any).id ?? null,
          agentName,
          userAgent,
          ip,
          requestBody: capture.requestBody !== undefined ? stringifyPayload(params.env, capture.requestBody) : null,
          responseBody: capture.responseBody !== undefined ? stringifyPayload(params.env, capture.responseBody) : null
        });
      } catch (err) {
        request.log.warn({ err }, 'agent payload logging failed');
      }
    }
  });

  await fastify.register(swagger, {
    mode: 'dynamic',
    openapi: {
      info: {
        title: 'RAGMap API',
        description:
          'MCP Registry-compatible subregistry API + RAG-focused search. Agents: use GET /rag/search?q=... to find retrieval MCP servers by meaning; or install the MCP (npx -y @khalidsaidi/ragmap-mcp@latest) for tool-based discovery. Discovery: GET /.well-known/agent.json',
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

  // Public usage stats (aggregates only, no PII) — so you can see "is it used" without admin login
  fastify.get('/api/stats', async (_request, reply) => {
    reply.header('Cache-Control', 'public, max-age=60');
    const summary = await params.store.getUsageSummary(7, false, false);
    return {
      days: summary.days,
      since: summary.since,
      total: summary.total,
      last24h: summary.last24h,
      byRoute: summary.byRoute,
      daily: summary.daily,
      byTrafficClass: summary.byTrafficClass,
      truncated: summary.truncated ?? false
    };
  });

  // Public usage graph page: fetches /api/stats and draws a simple bar chart
  fastify.get('/api/usage-graph', async (_request, reply) => {
    reply.header('Cache-Control', 'public, max-age=60');
    reply.type('text/html').send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>RAGMap usage</title>
  <style>
    body { font-family: ui-sans-serif, system-ui, sans-serif; margin: 0; padding: 20px; background: #0f172a; color: #e2e8f0; }
    h1 { font-size: 1.25rem; margin: 0 0 8px; }
    .meta { font-size: 0.875rem; color: #94a3b8; margin-bottom: 20px; }
    .card { background: #1e293b; border-radius: 10px; padding: 16px; margin-bottom: 16px; }
    .row { display: flex; gap: 24px; flex-wrap: wrap; margin-bottom: 8px; }
    .stat { font-size: 1.5rem; font-weight: 700; }
    .label { font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; }
    .chart { display: flex; flex-direction: column; gap: 8px; }
    .bar-row { display: flex; align-items: center; gap: 12px; font-size: 0.875rem; }
    .bar-label { min-width: 140px; }
    .bar-track { flex: 1; height: 20px; background: #334155; border-radius: 6px; overflow: hidden; }
    .bar-fill { height: 100%; background: linear-gradient(90deg, #3b82f6, #22c55e); border-radius: 6px; }
    .bar-n { min-width: 48px; text-align: right; color: #94a3b8; }
    .error { color: #f87171; }
    a { color: #7dd3fc; }
  </style>
</head>
<body>
  <h1>RAGMap usage (last 7 days)</h1>
  <div class="meta">Fetched from <a href="/api/stats">/api/stats</a> · <a href="/admin/usage">Admin usage</a> (login)</div>
  <div id="root">Loading…</div>
  <script>
    (function(){
      fetch('/api/stats').then(r => r.json()).then(function(d) {
        var root = document.getElementById('root');
        if (d.total === 0) {
          root.innerHTML = '<p class="card">No usage in the last ' + d.days + ' days. Either nothing is calling the API or events are not being recorded.</p>';
          return;
        }
        var maxDaily = Math.max(1, Math.max.apply(null, (d.daily || []).map(function(x){ return x.count; })));
        var maxRoute = Math.max(1, Math.max.apply(null, (d.byRoute || []).map(function(x){ return x.count; })));
        var html = '';
        html += '<div class="card"><div class="row"><div><div class="label">Total requests</div><div class="stat">' + d.total + '</div></div>';
        html += '<div><div class="label">Last 24h</div><div class="stat">' + d.last24h + '</div></div>';
        html += '<div><div class="label">Since</div><div class="stat">' + (d.since || '').slice(0,10) + '</div></div></div></div>';
        html += '<div class="card"><h2 style="margin:0 0 12px;font-size:1rem;">Daily</h2><div class="chart">';
        (d.daily || []).forEach(function(r) {
          var pct = (100 * r.count / maxDaily).toFixed(0);
          html += '<div class="bar-row"><span class="bar-label">' + r.day + '</span><div class="bar-track"><div class="bar-fill" style="width:' + pct + '%"></div></div><span class="bar-n">' + r.count + '</span></div>';
        });
        html += '</div></div>';
        html += '<div class="card"><h2 style="margin:0 0 12px;font-size:1rem;">Top routes</h2><div class="chart">';
        (d.byRoute || []).forEach(function(r) {
          var pct = (100 * r.count / maxRoute).toFixed(0);
          html += '<div class="bar-row"><span class="bar-label">' + r.route + '</span><div class="bar-track"><div class="bar-fill" style="width:' + pct + '%"></div></div><span class="bar-n">' + r.count + '</span></div>';
        });
        html += '</div></div>';
        root.innerHTML = html;
      }).catch(function(e) {
        document.getElementById('root').innerHTML = '<p class="card error">Failed to load stats: ' + e.message + '</p>';
      });
    })();
  </script>
</body>
</html>`);
  });

  // Admin dashboard (Basic Auth protected)
  fastify.get('/admin/usage/data', async (request, reply) => {
    if (!(await requireAdminDashboard(params.env, request, reply))) return;
    const query = parse(AdminUsageQuerySchema, (request as any).query, reply);
    if (!query) return;
    const days = query.days ?? 7;
    const includeNoise = parseBoolish(query.includeNoise);
    const includeCrawlerProbes = parseBoolish(query.includeCrawlerProbes);
    reply.header('Cache-Control', 'no-store');
    return params.store.getUsageSummary(days, includeNoise, includeCrawlerProbes);
  });

  fastify.get('/admin/usage', async (request, reply) => {
    if (!(await requireAdminDashboard(params.env, request, reply))) return;
    const baseUrl = getBaseUrl(params.env, request);
    reply.type('text/html').send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>RAGMap Usage</title>
    <style>
      :root { color-scheme: light; }
      body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif; margin: 0; background: #f6f7fb; color: #101827; }
      header { background: #0b0f1a; color: #fff; padding: 24px 20px; }
      header h1 { margin: 0 0 6px; font-size: 20px; }
      header p { margin: 0; color: #c7c9d3; font-size: 13px; }
      header a { color: #c7c9d3; }
      main { max-width: 960px; margin: 0 auto; padding: 20px; }
      .card { background: #fff; border-radius: 12px; padding: 16px; box-shadow: 0 8px 24px rgba(17, 24, 39, 0.08); margin-bottom: 16px; }
      .row { display: flex; gap: 16px; flex-wrap: wrap; }
      .field { display: flex; flex-direction: column; gap: 6px; min-width: 220px; }
      label { font-size: 12px; color: #6b7280; }
      input { border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 10px; font-size: 14px; }
      button { background: #2563eb; color: #fff; border: 0; border-radius: 8px; padding: 10px 14px; font-weight: 600; cursor: pointer; }
      button:disabled { opacity: 0.6; cursor: not-allowed; }
      .metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; }
      .metric { background: #f9fafb; border-radius: 10px; padding: 12px; }
      .metric h3 { margin: 0; font-size: 13px; color: #6b7280; }
      .metric div { font-size: 22px; font-weight: 700; margin-top: 6px; }
      .list { display: grid; grid-template-columns: 1fr; gap: 6px; }
      .pill { display: flex; justify-content: space-between; gap: 12px; padding: 8px 10px; background: #f3f4f6; border-radius: 8px; font-size: 13px; word-break: break-word; }
      .pill span:first-child { overflow-wrap: anywhere; }
      .bar { height: 10px; background: #e5e7eb; border-radius: 999px; overflow: hidden; }
      .bar > span { display: block; height: 100%; background: #22c55e; }
      .muted { color: #6b7280; font-size: 12px; }
      .error { color: #b91c1c; font-size: 13px; margin-top: 8px; }
      .error-item { display: grid; grid-template-columns: 90px 1fr; gap: 8px 12px; padding: 10px; border-radius: 10px; background: #fff7ed; border: 1px solid #fed7aa; font-size: 12px; }
      .error-item code { background: #fff; padding: 2px 6px; border-radius: 6px; }
    </style>
  </head>
  <body>
    <header>
      <h1>RAGMap Usage</h1>
      <p>Live usage summary from ${baseUrl} · <a href="/admin/agent-events">Agent events</a></p>
    </header>
    <main>
      <div class="card">
        <div class="row">
          <div class="field">
            <label for="days">Days</label>
            <input id="days" type="number" min="1" max="90" value="7" />
          </div>
          <div class="field">
            <label for="noise">Include bot noise</label>
            <input id="noise" type="checkbox" />
          </div>
          <div class="field">
            <label for="crawler">Include crawler probes in errors</label>
            <input id="crawler" type="checkbox" />
          </div>
          <div class="field" style="align-self: flex-end;">
            <button id="load">Load usage</button>
          </div>
        </div>
        <div id="status" class="muted" style="margin-top:8px;"></div>
        <div id="error" class="error"></div>
      </div>

      <div class="card">
        <div class="metrics">
          <div class="metric"><h3>Total (range)</h3><div id="total">—</div></div>
          <div class="metric"><h3>Last 24h</h3><div id="last24h">—</div></div>
          <div class="metric"><h3>Since</h3><div id="since">—</div></div>
        </div>
      </div>

      <div class="card">
        <h2 style="margin-top:0;">Top routes</h2>
        <div id="routes" class="list"></div>
      </div>

      <div class="card">
        <h2 style="margin-top:0;">Status codes</h2>
        <div id="statuses" class="list"></div>
      </div>

      <div class="card">
        <h2 style="margin-top:0;">Daily</h2>
        <div id="daily" class="list"></div>
      </div>

      <div class="card">
        <h2 style="margin-top:0;">Top IPs</h2>
        <div id="ips" class="list"></div>
      </div>

      <div class="card">
        <h2 style="margin-top:0;">Top referrers</h2>
        <div id="referrers" class="list"></div>
      </div>

      <div class="card">
        <h2 style="margin-top:0;">Top user agents</h2>
        <div id="userAgents" class="list"></div>
      </div>

      <div class="card">
        <h2 style="margin-top:0;">Top agent names</h2>
        <div id="agentNames" class="list"></div>
      </div>

      <div class="card">
        <h2 style="margin-top:0;">Traffic classes</h2>
        <div id="trafficClasses" class="list"></div>
      </div>

      <div class="card">
        <h2 style="margin-top:0;">Recent errors (4xx/5xx)</h2>
        <div id="errors" class="list"></div>
      </div>
    </main>
    <script>
      const daysInput = document.getElementById('days');
      const noiseInput = document.getElementById('noise');
      const crawlerInput = document.getElementById('crawler');
      const loadBtn = document.getElementById('load');
      const statusEl = document.getElementById('status');
      const errorEl = document.getElementById('error');
      const totalEl = document.getElementById('total');
      const last24hEl = document.getElementById('last24h');
      const sinceEl = document.getElementById('since');
      const routesEl = document.getElementById('routes');
      const statusesEl = document.getElementById('statuses');
      const dailyEl = document.getElementById('daily');
      const ipsEl = document.getElementById('ips');
      const referrersEl = document.getElementById('referrers');
      const userAgentsEl = document.getElementById('userAgents');
      const agentNamesEl = document.getElementById('agentNames');
      const trafficClassesEl = document.getElementById('trafficClasses');
      const errorsEl = document.getElementById('errors');

      function setStatus(text) { statusEl.textContent = text || ''; }
      function setError(text) { errorEl.textContent = text || ''; }

      function renderList(container, rows, labelKey, countKey) {
        container.innerHTML = '';
        const max = Math.max(...rows.map(r => r[countKey]), 1);
        rows.forEach(row => {
          const wrapper = document.createElement('div');
          wrapper.className = 'pill';
          wrapper.innerHTML = '<span>' + row[labelKey] + '</span><span>' + row[countKey] + '</span>';
          const bar = document.createElement('div');
          bar.className = 'bar';
          const fill = document.createElement('span');
          fill.style.width = Math.round((row[countKey] / max) * 100) + '%';
          bar.appendChild(fill);
          const containerWrap = document.createElement('div');
          containerWrap.style.display = 'flex';
          containerWrap.style.flexDirection = 'column';
          containerWrap.style.gap = '6px';
          containerWrap.appendChild(wrapper);
          containerWrap.appendChild(bar);
          container.appendChild(containerWrap);
        });
        if (!rows.length) {
          container.innerHTML = '<div class="muted">No data yet.</div>';
        }
      }

      function renderErrors(rows) {
        errorsEl.innerHTML = '';
        if (!rows.length) {
          errorsEl.innerHTML = '<div class="muted">No errors yet.</div>';
          return;
        }
        rows.forEach(row => {
          const wrap = document.createElement('div');
          wrap.className = 'error-item';
          wrap.innerHTML =
            '<div><strong>' + row.status + '</strong></div>' +
            '<div><code>' + row.route + '</code></div>' +
            '<div class="muted">Time</div><div>' + new Date(row.createdAt).toLocaleString() + '</div>' +
            '<div class="muted">Agent</div><div>' + (row.agentName || '—') + '</div>' +
            '<div class="muted">Class</div><div>' + (row.trafficClass || 'product_api') + '</div>' +
            '<div class="muted">IP</div><div>' + (row.ip || '—') + '</div>' +
            '<div class="muted">Referrer</div><div>' + (row.referer || '—') + '</div>' +
            '<div class="muted">User-Agent</div><div>' + (row.userAgent || '—') + '</div>';
          errorsEl.appendChild(wrap);
        });
      }

      async function loadUsage() {
        setError('');
        setStatus('Loading…');
        const days = Math.min(90, Math.max(1, Number(daysInput.value || 7)));
        try {
          const params = new URLSearchParams();
          params.set('days', String(days));
          if (noiseInput.checked) params.set('includeNoise', '1');
          if (crawlerInput.checked) params.set('includeCrawlerProbes', '1');
          const res = await fetch('/admin/usage/data?' + params.toString());
          if (!res.ok) {
            const text = await res.text();
            throw new Error(text || ('Request failed: ' + res.status));
          }
          const data = await res.json();
          totalEl.textContent = data.total ?? '0';
          last24hEl.textContent = data.last24h ?? '0';
          sinceEl.textContent = (data.since || '').slice(0, 10);
          renderList(routesEl, data.byRoute || [], 'route', 'count');
          renderList(statusesEl, data.byStatus || [], 'status', 'count');
          renderList(dailyEl, data.daily || [], 'day', 'count');
          renderList(ipsEl, data.byIp || [], 'ip', 'count');
          renderList(referrersEl, data.byReferer || [], 'referer', 'count');
          renderList(userAgentsEl, data.byUserAgent || [], 'userAgent', 'count');
          renderList(agentNamesEl, data.byAgentName || [], 'agentName', 'count');
          renderList(trafficClassesEl, data.byTrafficClass || [], 'trafficClass', 'count');
          renderErrors(data.recentErrors || []);
          setStatus('Updated just now.');
        } catch (err) {
          setStatus('');
          setError(err.message || 'Failed to load usage.');
        }
      }

      loadBtn.addEventListener('click', loadUsage);
      loadUsage();
    </script>
  </body>
</html>`);
  });

  fastify.get('/admin/agent-events/data', async (request, reply) => {
    if (!(await requireAdminDashboard(params.env, request, reply))) return;
    const query = parse(AdminAgentEventsQuerySchema, (request as any).query, reply);
    if (!query) return;
    reply.header('Cache-Control', 'no-store');
    return params.store.listAgentPayloadEvents({
      limit: query.limit ?? 50,
      source: query.source,
      kind: query.kind
    });
  });

  fastify.get('/admin/agent-events', async (request, reply) => {
    if (!(await requireAdminDashboard(params.env, request, reply))) return;
    const baseUrl = getBaseUrl(params.env, request);
    reply.type('text/html').send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>RAGMap Agent Events</title>
    <style>
      :root { color-scheme: light; }
      body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif; margin: 0; background: #f6f7fb; color: #101827; }
      header { background: #0b0f1a; color: #fff; padding: 24px 20px; }
      header h1 { margin: 0 0 6px; font-size: 20px; }
      header p { margin: 0; color: #c7c9d3; font-size: 13px; }
      header a { color: #c7c9d3; }
      main { max-width: 1000px; margin: 0 auto; padding: 20px; }
      .card { background: #fff; border-radius: 12px; padding: 16px; box-shadow: 0 8px 24px rgba(17, 24, 39, 0.08); margin-bottom: 16px; }
      .row { display: flex; gap: 16px; flex-wrap: wrap; align-items: flex-end; }
      .field { display: flex; flex-direction: column; gap: 6px; min-width: 180px; }
      label { font-size: 12px; color: #6b7280; }
      input, select { border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 10px; font-size: 14px; }
      button { background: #2563eb; color: #fff; border: 0; border-radius: 8px; padding: 10px 14px; font-weight: 600; cursor: pointer; }
      button:disabled { opacity: 0.6; cursor: not-allowed; }
      .event { border: 1px solid #e5e7eb; border-radius: 10px; padding: 12px; margin-bottom: 12px; }
      .meta { display: flex; gap: 12px; flex-wrap: wrap; font-size: 12px; color: #6b7280; margin-bottom: 8px; }
      pre { background: #f3f4f6; padding: 10px; border-radius: 8px; overflow-x: auto; font-size: 12px; white-space: pre-wrap; }
      .muted { color: #6b7280; font-size: 12px; }
    </style>
  </head>
  <body>
    <header>
      <h1>RAGMap Agent Events</h1>
      <p>Recent captured payloads from ${baseUrl} · <a href="/admin/usage">Usage</a></p>
    </header>
    <main>
      <div class="card">
        <div class="row">
          <div class="field">
            <label for="limit">Limit</label>
            <input id="limit" type="number" min="1" max="200" value="50" />
          </div>
          <div class="field">
            <label for="source">Source</label>
            <select id="source">
              <option value="">All</option>
              <option value="api">api</option>
              <option value="mcp-remote">mcp-remote</option>
            </select>
          </div>
          <div class="field">
            <label for="kind">Kind</label>
            <select id="kind">
              <option value="">All</option>
              <option value="rest_read">rest_read</option>
              <option value="rest_write">rest_write</option>
              <option value="mcp_tool">mcp_tool</option>
            </select>
          </div>
          <div class="field">
            <button id="load">Load events</button>
          </div>
        </div>
        <div id="status" class="muted" style="margin-top:8px;"></div>
      </div>

      <div id="events" class="card"></div>
    </main>
    <script>
      const loadBtn = document.getElementById('load');
      const statusEl = document.getElementById('status');
      const eventsEl = document.getElementById('events');
      async function loadEvents() {
        statusEl.textContent = 'Loading...';
        eventsEl.innerHTML = '';
        const limit = document.getElementById('limit').value || 50;
        const source = document.getElementById('source').value;
        const kind = document.getElementById('kind').value;
        const params = new URLSearchParams();
        params.set('limit', limit);
        if (source) params.set('source', source);
        if (kind) params.set('kind', kind);
        const res = await fetch('/admin/agent-events/data?' + params.toString());
        if (!res.ok) {
          statusEl.textContent = 'Failed to load events.';
          return;
        }
        const data = await res.json();
        statusEl.textContent = 'Loaded ' + data.length + ' event(s).';
        for (const row of data) {
          const card = document.createElement('div');
          card.className = 'event';
          const meta = document.createElement('div');
          meta.className = 'meta';
          meta.innerHTML = [
            '<span>' + row.createdAt + '</span>',
            '<span>' + (row.source || 'unknown') + '</span>',
            '<span>' + (row.kind || 'unknown') + '</span>',
            row.tool ? '<span>tool: ' + row.tool + '</span>' : '',
            row.route ? '<span>route: ' + row.route + '</span>' : '',
            row.status ? '<span>status: ' + row.status + '</span>' : '',
            row.agentName ? '<span>agent: ' + row.agentName + '</span>' : ''
          ].filter(Boolean).join(' ');
          card.appendChild(meta);
          if (row.requestBody) {
            const pre = document.createElement('pre');
            pre.textContent = 'request: ' + row.requestBody;
            card.appendChild(pre);
          }
          if (row.responseBody) {
            const pre = document.createElement('pre');
            pre.textContent = 'response: ' + row.responseBody;
            card.appendChild(pre);
          }
          eventsEl.appendChild(card);
        }
      }
      loadBtn.addEventListener('click', loadEvents);
      loadEvents();
    </script>
  </body>
</html>`);
  });

  fastify.get('/health', async () => ({
    status: 'ok',
    service: 'ragmap-api',
    version: params.env.serviceVersion,
    storage: params.store.kind,
    embeddings: params.env.embeddingsEnabled,
    ts: new Date().toISOString()
  }));

  fastify.get('/readyz', async (_req, reply) => {
    const health = await params.store.healthCheck();
    if (!health.ok) return reply.code(503).send({ status: 'not_ready', detail: health.detail ?? 'unknown' });
    return { status: 'ready' };
  });

  fastify.get(CANONICAL_DISCOVERY_PATHS[0], async (request) => agentCard(getBaseUrl(params.env, request)));
  fastify.get(CANONICAL_DISCOVERY_PATHS[1], async (request) => agentCard(getBaseUrl(params.env, request)));

  fastify.get('/favicon.ico', async (_req, reply) => reply.code(204).send());
  fastify.get('/.well-known/mcp', async (request, reply) => {
    const base = getBaseUrl(params.env, request);
    return reply.type('application/json').send({ url: `${base}/.well-known/agent.json` });
  });
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

  // IMPORTANT:
  // Many registry server names contain "/" (e.g. "ai.auteng/mcp"). Most clients URL-encode this as "%2F".
  // Firebase Hosting decodes "%2F" to "/" before proxying to Cloud Run, which breaks normal ":param" routes.
  // We use a wildcard route so both encoded and decoded forms work:
  // - /v0.1/servers/ai.auteng%2Fmcp/versions
  // - /v0.1/servers/ai.auteng/mcp/versions
  fastify.get('/v0.1/servers/*', async (request, reply) => {
    const splat = (request.params as any)['*'] as string | undefined;
    const raw = (splat ?? '').replace(/^\/+/, '').replace(/\/+$/, '');
    if (!raw) return reply.code(404).send({ error: 'Not found', message: 'Server name required' });

    const parts = raw.split('/').filter(Boolean);
    const versionsIdx = parts.lastIndexOf('versions');
    if (versionsIdx < 1) return reply.code(404).send({ error: 'Not found', message: 'Invalid path; use /v0.1/servers/{name}/versions or .../versions/latest' });

    const serverNameRaw = parts.slice(0, versionsIdx).join('/');
    const serverName = decodeURIComponent(serverNameRaw);
    const rest = parts.slice(versionsIdx + 1);

    if (rest.length === 0) {
      const servers = await params.store.listServerVersions(serverName);
      if (servers.length === 0) return reply.code(404).send({ error: 'Not found', message: 'Server not in registry or not indexed' });
      return { servers, metadata: { count: servers.length } };
    }

    if (rest.length !== 1) return reply.code(404).send({ error: 'Not found', message: 'Invalid path' });
    const version = rest[0];
    const entry = await params.store.getServerVersion(serverName, version === 'latest' ? 'latest' : version);
    if (!entry) return reply.code(404).send({ error: 'Not found', message: 'Server or version not in registry' });
    return entry;
  });

  // RAG endpoints
  fastify.get('/rag/categories', async () => {
    const categories = await params.store.listCategories();
    return { categories };
  });

  // Same "serverName may contain '/'" issue as above.
  fastify.get('/rag/servers/*', async (request, reply) => {
    const splat = (request.params as any)['*'] as string | undefined;
    const raw = (splat ?? '').replace(/^\/+/, '').replace(/\/+$/, '');
    if (!raw) return reply.code(404).send({ error: 'Not found', message: 'Path must be /rag/servers/{name}/explain' });

    const parts = raw.split('/').filter(Boolean);
    if (parts.length < 2) return reply.code(404).send({ error: 'Not found', message: 'Invalid path' });
    if (parts[parts.length - 1] !== 'explain') return reply.code(404).send({ error: 'Not found', message: 'Path must end with /explain' });

    const serverNameRaw = parts.slice(0, -1).join('/');
    const serverName = decodeURIComponent(serverNameRaw);
    const explain = await params.store.getRagExplain(serverName);
    if (!explain) return reply.code(404).send({ error: 'Not found', message: 'Server not in registry or not indexed' });
    return explain;
  });

  fastify.get('/rag/search', async (request, reply) => {
    const query = parse(RagSearchQuerySchema, (request as any).query, reply);
    if (!query) return;

    const q = (query.q ?? '').trim() || 'rag';
    const limit = query.limit ?? 10;
    const categories = parseCategories(query.categories);
    const registryType = (query.registryType ?? '').trim() || undefined;
    const hasRemote = parseOptionalBool(query.hasRemote);
    const reachable = parseOptionalBool(query.reachable);
    const citations = parseOptionalBool(query.citations);
    const localOnly = parseOptionalBool(query.localOnly);
    const filters: RagFilters = RagFiltersSchema.parse({
      categories,
      minScore: query.minScore,
      transport: query.transport,
      registryType,
      hasRemote,
      reachable,
      citations,
      localOnly,
      serverKind: query.serverKind
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
      results: results.map(mapRagHit),
      metadata: { count: results.length }
    };
  });

  fastify.get('/rag/top', async (request, reply) => {
    const query = parse(RagTopQuerySchema, (request as any).query, reply);
    if (!query) return;

    const limit = query.limit ?? 25;
    const filters: RagFilters = RagFiltersSchema.parse({
      categories: parseCategories(query.categories),
      minScore: query.minScore ?? 10,
      hasRemote: parseOptionalBool(query.hasRemote),
      reachable: parseOptionalBool(query.reachable),
      localOnly: parseOptionalBool(query.localOnly),
      serverKind: query.serverKind ?? 'retriever'
    });

    const results = await params.store.searchRagTop({ limit, filters });
    return {
      results: results.map(mapRagHit),
      metadata: { count: results.length }
    };
  });

  fastify.get('/rag/install', async (request, reply) => {
    const query = parse(RagInstallQuerySchema, (request as any).query, reply);
    if (!query) return;

    const entry = await params.store.getServerVersion(decodeURIComponent(query.name), 'latest');
    if (!entry) return reply.code(404).send({ error: 'Not found', message: 'Server not in registry' });

    const server = entry.server as any;
    const packages: any[] = Array.isArray(server?.packages) ? server.packages : [];
    const stdioPackage =
      packages.find((pkg) => pkg?.transport?.type === 'stdio') ??
      packages.find((pkg) => !pkg?.transport || pkg?.transport?.type !== 'streamable-http') ??
      null;
    const stdioCommand = stdioPackage ? buildStdioCommand(stdioPackage) : null;
    const remoteEndpoints = mapRemoteEndpoints(server);
    const primaryRemote = remoteEndpoints[0] ?? null;
    const remoteHeadersObject = primaryRemote
      ? Object.fromEntries(
          primaryRemote.headers.map((h) => [h.name, sanitizeHeaderValue(h.name, undefined, h.isSecret)])
        )
      : {};

    const transportSummary =
      stdioCommand && primaryRemote
        ? 'hybrid'
        : primaryRemote
          ? 'remote'
          : stdioCommand
            ? 'stdio'
            : 'unknown';

    const configName = entry.server.name.replace(/[^a-zA-Z0-9_.-]/g, '_');
    const genericConfig =
      primaryRemote
        ? {
            mcpServers: {
              [configName]: {
                transport: 'streamable-http',
                url: primaryRemote.url,
                ...(Object.keys(remoteHeadersObject).length ? { headers: remoteHeadersObject } : {})
              }
            }
          }
        : stdioCommand
          ? {
              mcpServers: {
                [configName]: {
                  command: stdioCommand.command,
                  args: stdioCommand.args
                }
              }
            }
          : { mcpServers: {} };

    const claudeDesktopConfig = JSON.parse(JSON.stringify(genericConfig));

    return {
      serverName: entry.server.name,
      version: entry.server.version,
      transport: {
        summary: transportSummary,
        hasStdio: Boolean(stdioCommand),
        hasRemote: Boolean(primaryRemote)
      },
      stdio: stdioCommand
        ? {
            registryType: typeof stdioPackage?.registryType === 'string' ? stdioPackage.registryType : null,
            identifier: typeof stdioPackage?.identifier === 'string' ? stdioPackage.identifier : null,
            command: [stdioCommand.command, ...stdioCommand.args].join(' '),
            commandParts: stdioCommand
          }
        : null,
      remote: primaryRemote
        ? {
            url: primaryRemote.url,
            headers: primaryRemote.headers.map((h) => ({
              name: h.name,
              description: h.description,
              required: h.required,
              isSecret: h.isSecret,
              value: sanitizeHeaderValue(h.name, undefined, h.isSecret)
            }))
          }
        : null,
      claudeDesktopConfig: {
        object: claudeDesktopConfig,
        json: JSON.stringify(claudeDesktopConfig, null, 2)
      },
      genericMcpHostConfig: {
        object: genericConfig,
        json: JSON.stringify(genericConfig, null, 2)
      }
    };
  });

  fastify.get('/rag/stats', async () => {
    let totalLatestServers = 0;
    let countRagScoreGte1 = 0;
    let countRagScoreGte25 = 0;
    let reachabilityCandidates = 0;
    let reachabilityKnown = 0;
    let reachabilityTrue = 0;
    let cursor: string | undefined;
    do {
      const page = await params.store.listLatestServers({ limit: 200, cursor });
      for (const entry of page.servers) {
        totalLatestServers += 1;
        const ragmap = (entry._meta?.[META_RAGMAP_KEY] as any) ?? {};
        const ragScore = Number(ragmap?.ragScore ?? 0);
        if (ragScore >= 1) countRagScoreGte1 += 1;
        if (ragScore >= 25) countRagScoreGte25 += 1;

        const inferredHasRemote =
          typeof ragmap?.hasRemote === 'boolean'
            ? ragmap.hasRemote
            : inferHasRemoteFromServer(entry.server as any);
        const probeTargets = getProbeTargets(entry.server);
        if (inferredHasRemote && probeTargets.length > 0) {
          reachabilityCandidates += 1;
          const hasReachabilityMetadata =
            typeof ragmap?.lastReachableAt === 'string' ||
            typeof ragmap?.reachableCheckedAt === 'string' ||
            typeof ragmap?.reachableStatus === 'number' ||
            typeof ragmap?.reachableMethod === 'string' ||
            typeof ragmap?.reachableRemoteType === 'string' ||
            typeof ragmap?.reachableUrl === 'string';
          if (typeof ragmap?.reachable === 'boolean' || hasReachabilityMetadata) {
            reachabilityKnown += 1;
          }
          if (ragmap?.reachable === true) {
            reachabilityTrue += 1;
          }
        }
      }
      cursor = page.nextCursor;
    } while (cursor);

    const lastSuccessfulIngestAt = await params.store.getLastSuccessfulIngestAt();
    const lastReachabilityRunAt = params.store.getLastReachabilityRunAt
      ? await params.store.getLastReachabilityRunAt()
      : null;

    return {
      totalLatestServers,
      countRagScoreGte1,
      countRagScoreGte25,
      reachabilityCandidates,
      reachabilityKnown,
      reachabilityTrue,
      reachabilityUnknown: Math.max(0, reachabilityCandidates - reachabilityKnown),
      lastSuccessfulIngestAt: isoOrNull(lastSuccessfulIngestAt),
      lastReachabilityRunAt: isoOrNull(lastReachabilityRunAt)
    };
  });

  // Internal ingestion (protected by token). Not exposed on public Hosting; call Cloud Run URL directly.
  fastify.post('/internal/ingest/run', async (request, reply) => {
    if (!requireIngestToken(params.env, request, reply)) return;

    const body = parse(IngestRunBodySchema, (request as any).body, reply);
    if (!body) return;
    const mode = body.mode ?? 'incremental';
    const stats = await runIngest({ env: params.env, store: params.store, mode });
    return stats;
  });

  // Internal reachability-only refresh (protected by token). No ingest fetch or embeddings.
  fastify.post('/internal/reachability/run', async (request, reply) => {
    if (!requireIngestToken(params.env, request, reply)) return;

    const body = parse(ReachabilityRunBodySchema, (request as any).body ?? {}, reply);
    if (!body) return;
    const stats = await runReachabilityRefresh({
      env: params.env,
      store: params.store,
      limit: body.limit ?? 150
    });
    return stats;
  });

  // Internal agent-event ingestion (protected by token; used for cross-service capture)
  fastify.post('/internal/agent-events/ingest', async (request, reply) => {
    if (!params.env.agentEventToken) return reply.code(500).send({ error: 'AGENT_EVENT_TOKEN is not configured' });
    const token = (request.headers['x-agent-event-token'] as string | undefined) ?? '';
    if (!token || token !== params.env.agentEventToken) return reply.code(401).send({ error: 'Unauthorized' });

    const body = parse(AgentEventsIngestBodySchema, (request as any).body, reply);
    if (!body) return;

    await params.store.writeAgentPayloadEvent({
      createdAt: new Date(),
      source: body.source,
      kind: body.kind,
      method: body.method ?? null,
      route: body.route ?? null,
      status: body.status ?? null,
      durationMs: body.durationMs ?? null,
      tool: body.tool ?? null,
      requestId: body.requestId ?? null,
      agentName: body.agentName ?? null,
      userAgent: body.userAgent ?? null,
      ip: body.ip ?? null,
      requestBody: body.requestBody !== undefined ? stringifyPayload(params.env, body.requestBody) : null,
      responseBody: body.responseBody !== undefined ? stringifyPayload(params.env, body.responseBody) : null
    });

    reply.code(200).send({ ok: true });
  });

  return fastify;
}
