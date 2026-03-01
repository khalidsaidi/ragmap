import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { buildApp } from '../src/app.js';
import type { Env } from '../src/env.js';
import { META_RAGMAP_KEY } from '@ragmap/shared';
import { getProbeTargets, isReachableStatus, probeSseReachable } from '../src/ingest/ingest.js';
import { selectReachabilityCandidates } from '../src/reachability/run.js';
import { InMemoryStore } from '../src/store/inmemory.js';

const env: Env = {
  nodeEnv: 'test',
  port: 0,
  publicBaseUrl: 'http://localhost:3000',
  serviceVersion: '0.1.0-test',
  logLevel: 'silent',
  logNoise: false,
  storage: 'inmemory',
  gcpProjectId: '',
  cacheTtlMs: 0,
  adminDashUser: 'admin',
  adminDashPass: 'password',
  registryBaseUrl: 'https://registry.modelcontextprotocol.io',
  ingestToken: 'test-token',
  ingestPageLimit: 2,
  reachabilityPolicy: 'strict',
  captureAgentPayloads: false,
  agentPayloadTtlHours: 24,
  agentPayloadMaxEvents: 1000,
  agentPayloadMaxBytes: 16_384,
  agentEventToken: 'test-agent-event-token',
  embeddingsEnabled: false,
  embeddingsProvider: 'openai',
  openaiApiKey: '',
  openaiEmbeddingsModel: 'text-embedding-3-small'
};

function basicAuthHeader(user: string, pass: string) {
  const encoded = Buffer.from(`${user}:${pass}`, 'utf8').toString('base64');
  return `Basic ${encoded}`;
}

test('isReachableStatus supports strict and loose policies', () => {
  assert.equal(isReachableStatus(200, 'strict'), true);
  assert.equal(isReachableStatus(302, 'strict'), true);
  assert.equal(isReachableStatus(401, 'strict'), true);
  assert.equal(isReachableStatus(403, 'strict'), true);
  assert.equal(isReachableStatus(405, 'strict'), true);
  assert.equal(isReachableStatus(429, 'strict'), true);
  assert.equal(isReachableStatus(404, 'strict'), false);
  assert.equal(isReachableStatus(410, 'strict'), false);
  assert.equal(isReachableStatus(500, 'strict'), false);

  assert.equal(isReachableStatus(400, 'loose'), true);
  assert.equal(isReachableStatus(422, 'loose'), true);
  assert.equal(isReachableStatus(429, 'loose'), true);
  assert.equal(isReachableStatus(404, 'loose'), false);
  assert.equal(isReachableStatus(410, 'loose'), false);
  assert.equal(isReachableStatus(500, 'loose'), false);
});

test('getProbeTargets includes streamable-http and sse targets once per url', () => {
  const targets = getProbeTargets({
    remotes: [
      { type: 'streamable-http', url: 'https://example.com/mcp-http' },
      { type: 'sse', url: 'https://example.com/mcp-sse' },
      { type: 'sse', url: 'https://example.com/mcp-sse' }
    ]
  });

  assert.deepEqual(targets, [
    { url: 'https://example.com/mcp-http', remoteType: 'streamable-http' },
    { url: 'https://example.com/mcp-sse', remoteType: 'sse' }
  ]);
});

test('selectReachabilityCandidates preserves A/B/C allocation priority', () => {
  const selected = selectReachabilityCandidates(
    [
      {
        name: 'other/random-high',
        probeTargets: [{ url: 'https://example.com/other', remoteType: 'streamable-http' }],
        ragScore: 99,
        serverKind: 'other',
        updatedAtMs: Date.parse('2026-02-01T00:00:00.000Z'),
        reachableCheckedAtMs: null
      },
      {
        name: 'retriever/priority-a-old',
        probeTargets: [{ url: 'https://example.com/a-old', remoteType: 'streamable-http' }],
        ragScore: 50,
        serverKind: 'retriever',
        updatedAtMs: Date.parse('2026-01-01T00:00:00.000Z'),
        reachableCheckedAtMs: Date.parse('2026-02-01T00:00:00.000Z')
      },
      {
        name: 'retriever/priority-a-new',
        probeTargets: [{ url: 'https://example.com/a-new', remoteType: 'streamable-http' }],
        ragScore: 50,
        serverKind: 'retriever',
        updatedAtMs: Date.parse('2026-03-01T00:00:00.000Z'),
        reachableCheckedAtMs: Date.parse('2026-02-01T00:00:00.000Z')
      },
      {
        name: 'retriever/priority-b',
        probeTargets: [{ url: 'https://example.com/b', remoteType: 'streamable-http' }],
        ragScore: 5,
        serverKind: 'retriever',
        updatedAtMs: Date.parse('2026-02-15T00:00:00.000Z'),
        reachableCheckedAtMs: Date.parse('2026-02-01T00:00:00.000Z')
      },
      {
        name: 'retriever/zero-score',
        probeTargets: [{ url: 'https://example.com/z', remoteType: 'streamable-http' }],
        ragScore: 0,
        serverKind: 'retriever',
        updatedAtMs: Date.parse('2026-02-10T00:00:00.000Z'),
        reachableCheckedAtMs: Date.parse('2026-02-01T00:00:00.000Z')
      }
    ],
    3
  );

  assert.deepEqual(
    selected.map((s) => s.name),
    ['retriever/priority-a-new', 'retriever/priority-a-old', 'retriever/priority-b']
  );
});

test('selectReachabilityCandidates rotates priority A by unknown and oldest checked first', () => {
  const selected = selectReachabilityCandidates(
    [
      {
        name: 'retriever/unknown',
        probeTargets: [{ url: 'https://example.com/unknown', remoteType: 'streamable-http' }],
        ragScore: 10,
        serverKind: 'retriever',
        updatedAtMs: Date.parse('2026-03-01T00:00:00.000Z'),
        reachableCheckedAtMs: null
      },
      {
        name: 'retriever/oldest',
        probeTargets: [{ url: 'https://example.com/oldest', remoteType: 'streamable-http' }],
        ragScore: 5_000,
        serverKind: 'retriever',
        updatedAtMs: Date.parse('2026-01-01T00:00:00.000Z'),
        reachableCheckedAtMs: Date.parse('2026-01-15T00:00:00.000Z')
      },
      {
        name: 'retriever/high-newer-check',
        probeTargets: [{ url: 'https://example.com/high-newer-check', remoteType: 'streamable-http' }],
        ragScore: 9_000,
        serverKind: 'retriever',
        updatedAtMs: Date.parse('2026-03-01T00:00:00.000Z'),
        reachableCheckedAtMs: Date.parse('2026-02-01T00:00:00.000Z')
      },
      {
        name: 'retriever/same-check-high-updated',
        probeTargets: [{ url: 'https://example.com/same-check-high-updated', remoteType: 'streamable-http' }],
        ragScore: 100,
        serverKind: 'retriever',
        updatedAtMs: Date.parse('2026-03-10T00:00:00.000Z'),
        reachableCheckedAtMs: Date.parse('2026-02-10T00:00:00.000Z')
      },
      {
        name: 'retriever/same-check-high-old',
        probeTargets: [{ url: 'https://example.com/same-check-high-old', remoteType: 'streamable-http' }],
        ragScore: 100,
        serverKind: 'retriever',
        updatedAtMs: Date.parse('2026-03-01T00:00:00.000Z'),
        reachableCheckedAtMs: Date.parse('2026-02-10T00:00:00.000Z')
      }
    ],
    8
  );

  assert.deepEqual(
    selected.map((s) => s.name),
    [
      'retriever/unknown',
      'retriever/oldest',
      'retriever/high-newer-check',
      'retriever/same-check-high-updated',
      'retriever/same-check-high-old'
    ]
  );
});

test('probeSseReachable returns after headers for open event-stream responses', async () => {
  const sockets = new Set<any>();
  const upstream = http.createServer((req, res) => {
    if (req.url === '/sse') {
      res.writeHead(200, {
        'content-type': 'text/event-stream',
        'cache-control': 'no-cache'
      });
      res.write('data: ping\n\n');
      return;
    }
    res.statusCode = 404;
    res.end('not found');
  });
  upstream.on('connection', (socket) => {
    sockets.add(socket);
    socket.on('close', () => sockets.delete(socket));
  });
  await new Promise<void>((resolve, reject) => upstream.listen(0, '127.0.0.1', (err?: Error) => (err ? reject(err) : resolve())));
  const address = upstream.address();
  const port = typeof address === 'object' && address ? address.port : 0;
  const url = `http://127.0.0.1:${port}/sse`;

  const startedAtMs = Date.now();
  const probe = await probeSseReachable(url, 1500, 'strict');
  const durationMs = Date.now() - startedAtMs;

  assert.equal(probe.ok, true);
  assert.equal(probe.status, 200);
  assert.equal(probe.method, 'GET');
  assert.equal(probe.remoteType, 'sse');
  assert.equal(durationMs < 1200, true);

  for (const socket of sockets) socket.destroy();
  await new Promise<void>((resolve, reject) => upstream.close((err) => (err ? reject(err) : resolve())));
});

test('probeSseReachable applies strict/loose policy to SSE statuses', async () => {
  const upstream = http.createServer((req, res) => {
    if (req.url === '/sse-422') {
      res.statusCode = 422;
      res.end('unprocessable');
      return;
    }
    res.statusCode = 404;
    res.end('not found');
  });
  await new Promise<void>((resolve, reject) =>
    upstream.listen(0, '127.0.0.1', (err?: Error) => (err ? reject(err) : resolve()))
  );
  const address = upstream.address();
  const port = typeof address === 'object' && address ? address.port : 0;
  const url = `http://127.0.0.1:${port}/sse-422`;

  const strictProbe = await probeSseReachable(url, 1500, 'strict');
  const looseProbe = await probeSseReachable(url, 1500, 'loose');

  assert.equal(strictProbe.status, 422);
  assert.equal(strictProbe.ok, false);
  assert.equal(looseProbe.status, 422);
  assert.equal(looseProbe.ok, true);

  await new Promise<void>((resolve, reject) => upstream.close((err) => (err ? reject(err) : resolve())));
});

test('health endpoint', async () => {
  const store = new InMemoryStore();
  const app = await buildApp({ env, store });
  const res = await app.inject({ method: 'GET', url: '/health' });
  assert.equal(res.statusCode, 200);
  const body = res.json();
  assert.equal(body.status, 'ok');
  await app.close();
});

test('admin usage is protected by basic auth', async () => {
  const store = new InMemoryStore();
  const app = await buildApp({ env, store });

  const unauthorized = await app.inject({ method: 'GET', url: '/admin/usage' });
  assert.equal(unauthorized.statusCode, 401);
  assert.ok(unauthorized.headers['www-authenticate']);

  const ok = await app.inject({
    method: 'GET',
    url: '/admin/usage',
    headers: { authorization: basicAuthHeader(env.adminDashUser, env.adminDashPass) }
  });
  assert.equal(ok.statusCode, 200);
  assert.match(ok.headers['content-type'] ?? '', /text\/html/);

  const data = await app.inject({
    method: 'GET',
    url: '/admin/usage/data?days=7',
    headers: { authorization: basicAuthHeader(env.adminDashUser, env.adminDashPass) }
  });
  assert.equal(data.statusCode, 200);
  const body = data.json() as any;
  assert.equal(typeof body.total, 'number');

  await app.close();
});

test('admin agent-events is protected by basic auth', async () => {
  const store = new InMemoryStore();
  const app = await buildApp({ env, store });

  const unauthorized = await app.inject({ method: 'GET', url: '/admin/agent-events' });
  assert.equal(unauthorized.statusCode, 401);

  const ok = await app.inject({
    method: 'GET',
    url: '/admin/agent-events',
    headers: { authorization: basicAuthHeader(env.adminDashUser, env.adminDashPass) }
  });
  assert.equal(ok.statusCode, 200);
  assert.match(ok.headers['content-type'] ?? '', /text\/html/);

  const data = await app.inject({
    method: 'GET',
    url: '/admin/agent-events/data?limit=50',
    headers: { authorization: basicAuthHeader(env.adminDashUser, env.adminDashPass) }
  });
  assert.equal(data.statusCode, 200);
  const body = data.json() as any;
  assert.equal(Array.isArray(body), true);

  await app.close();
});

test('malformed well-known discovery path redirects to canonical and preserves query', async () => {
  const store = new InMemoryStore();
  const app = await buildApp({ env, store });

  const redirected = await app.inject({
    method: 'GET',
    url: '/foo/bar/.well-known/agent.json?source=crawler&v=1'
  });
  assert.equal(redirected.statusCode, 301);
  assert.equal(redirected.headers.location, '/.well-known/agent.json?source=crawler&v=1');

  const usage = await app.inject({
    method: 'GET',
    url: '/admin/usage/data?days=7&includeNoise=1',
    headers: { authorization: basicAuthHeader(env.adminDashUser, env.adminDashPass) }
  });
  assert.equal(usage.statusCode, 200);
  const body = usage.json() as any;
  assert.equal(
    body.byTrafficClass.some((row: any) => row.trafficClass === 'crawler_probe' && row.count >= 1),
    true
  );
  assert.equal(
    body.byRoute.some((row: any) => row.route === '/foo/bar/.well-known/agent.json'),
    true
  );

  await app.close();
});

test('recent errors hide crawler probes by default and can include them via toggle', async () => {
  const store = new InMemoryStore();
  const app = await buildApp({ env, store });

  await store.writeUsageEvent({
    createdAt: new Date(),
    method: 'GET',
    route: '/foo/.well-known/agent-card.json',
    status: 404,
    durationMs: 3,
    userAgent: 'test-crawler/1.0',
    ip: '127.0.0.1',
    referer: null,
    agentName: null,
    trafficClass: 'crawler_probe'
  });

  const defaultRes = await app.inject({
    method: 'GET',
    url: '/admin/usage/data?days=7',
    headers: { authorization: basicAuthHeader(env.adminDashUser, env.adminDashPass) }
  });
  assert.equal(defaultRes.statusCode, 200);
  const defaultBody = defaultRes.json() as any;
  assert.equal(defaultBody.recentErrors.some((row: any) => row.trafficClass === 'crawler_probe'), false);

  const includeRes = await app.inject({
    method: 'GET',
    url: '/admin/usage/data?days=7&includeCrawlerProbes=1',
    headers: { authorization: basicAuthHeader(env.adminDashUser, env.adminDashPass) }
  });
  assert.equal(includeRes.statusCode, 200);
  const includeBody = includeRes.json() as any;
  assert.equal(includeBody.recentErrors.some((row: any) => row.trafficClass === 'crawler_probe'), true);

  await app.close();
});

test('v0.1 servers empty -> count 0', async () => {
  const store = new InMemoryStore();
  const app = await buildApp({ env, store });
  const res = await app.inject({ method: 'GET', url: '/v0.1/servers' });
  assert.equal(res.statusCode, 200);
  const body = res.json();
  assert.equal(Array.isArray(body.servers), true);
  assert.equal(body.metadata.count, 0);
  await app.close();
});

test('v0.1 serverName with slash works for versions + latest', async () => {
  const store = new InMemoryStore();
  await store.upsertServerVersion({
    runId: 'run_test',
    at: new Date(),
    server: { name: 'ai.aliengiraffe/spotdb', version: '0.1.0', description: 'test' },
    official: { isLatest: true, updatedAt: new Date().toISOString(), publishedAt: new Date().toISOString() },
    ragmap: { categories: ['vector-db'], ragScore: 42, reasons: ['test'], keywords: [] },
    hidden: false
  });
  const app = await buildApp({ env, store });

  const versionsRes = await app.inject({ method: 'GET', url: '/v0.1/servers/ai.aliengiraffe/spotdb/versions' });
  assert.equal(versionsRes.statusCode, 200);
  const versionsBody = versionsRes.json();
  assert.equal(versionsBody.metadata.count, 1);
  assert.equal(versionsBody.servers[0].server.name, 'ai.aliengiraffe/spotdb');

  const latestRes = await app.inject({
    method: 'GET',
    url: '/v0.1/servers/ai.aliengiraffe/spotdb/versions/latest'
  });
  assert.equal(latestRes.statusCode, 200);
  const latestBody = latestRes.json();
  assert.equal(latestBody.server.name, 'ai.aliengiraffe/spotdb');
  assert.equal(latestBody.server.version, '0.1.0');

  await app.close();
});

test('rag explain supports serverName with slash', async () => {
  const store = new InMemoryStore();
  await store.upsertServerVersion({
    runId: 'run_test',
    at: new Date(),
    server: { name: 'ai.aliengiraffe/spotdb', version: '0.1.0', description: 'test' },
    official: { isLatest: true, updatedAt: new Date().toISOString(), publishedAt: new Date().toISOString() },
    ragmap: { categories: ['vector-db'], ragScore: 42, reasons: ['test'], keywords: [] },
    hidden: false
  });
  const app = await buildApp({ env, store });
  const res = await app.inject({ method: 'GET', url: '/rag/servers/ai.aliengiraffe/spotdb/explain' });
  assert.equal(res.statusCode, 200);
  const body = res.json();
  assert.equal(body.name, 'ai.aliengiraffe/spotdb');
  assert.equal(body.ragScore, 42);
  await app.close();
});

test('rag search does not match substring inside words (rag vs storage)', async () => {
  const store = new InMemoryStore();
  await store.upsertServerVersion({
    runId: 'run_test',
    at: new Date(),
    server: { name: 'example/storage-only', version: '0.1.0', description: 'storage' },
    official: { isLatest: true, updatedAt: new Date().toISOString(), publishedAt: new Date().toISOString() },
    ragmap: { categories: [], ragScore: 0, reasons: [], keywords: [] },
    hidden: false
  });
  const app = await buildApp({ env, store });

  const res = await app.inject({ method: 'GET', url: '/rag/search?q=rag&limit=10' });
  assert.equal(res.statusCode, 200);
  const body = res.json();
  assert.equal(body.results.length, 0);

  await app.close();
});

test('internal reachability run marks 401 endpoints reachable and searchable', async () => {
  const upstream = http.createServer((req, res) => {
    if (req.url === '/mcp') {
      res.statusCode = 401;
      res.end('auth required');
      return;
    }
    res.statusCode = 404;
    res.end('not found');
  });
  await new Promise<void>((resolve, reject) => upstream.listen(0, '127.0.0.1', (err?: Error) => (err ? reject(err) : resolve())));
  const address = upstream.address();
  const port = typeof address === 'object' && address ? address.port : 0;
  const remoteUrl = `http://127.0.0.1:${port}/mcp`;

  const store = new InMemoryStore();
  await store.upsertServerVersion({
    runId: 'run_test',
    at: new Date(),
    server: {
      name: 'example/reachability-401',
      version: '0.1.0',
      description: 'rag remote endpoint',
      remotes: [{ type: 'streamable-http', url: remoteUrl }]
    },
    official: { isLatest: true, updatedAt: new Date().toISOString(), publishedAt: new Date().toISOString() },
    ragmap: { categories: ['rag'], ragScore: 60, reasons: ['test'], keywords: ['rag'] },
    hidden: false
  });

  const app = await buildApp({ env, store });

  const run = await app.inject({
    method: 'POST',
    url: '/internal/reachability/run',
    headers: {
      'content-type': 'application/json',
      'x-ingest-token': env.ingestToken
    },
    payload: { limit: 10 }
  });
  assert.equal(run.statusCode, 200);
  const stats = run.json() as any;
  assert.equal(stats.checked >= 1, true);
  assert.equal(stats.reachable >= 1, true);

  const search = await app.inject({
    method: 'GET',
    url: '/rag/search?q=rag&hasRemote=true&reachable=true&limit=5'
  });
  assert.equal(search.statusCode, 200);
  const body = search.json() as any;
  assert.equal(body.metadata.count >= 1, true);
  assert.equal(body.results[0].reachable, true);

  await app.close();
  await new Promise<void>((resolve, reject) => upstream.close((err) => (err ? reject(err) : resolve())));
});

test('internal reachability run respects strict vs loose policy for SSE targets', async () => {
  const upstream = http.createServer((req, res) => {
    if (req.url === '/mcp-sse') {
      res.statusCode = 422;
      res.end('unprocessable');
      return;
    }
    res.statusCode = 404;
    res.end('not found');
  });
  await new Promise<void>((resolve, reject) =>
    upstream.listen(0, '127.0.0.1', (err?: Error) => (err ? reject(err) : resolve()))
  );
  const address = upstream.address();
  const port = typeof address === 'object' && address ? address.port : 0;
  const remoteUrl = `http://127.0.0.1:${port}/mcp-sse`;

  async function runForPolicy(policy: Env['reachabilityPolicy'], expectedReachable: boolean) {
    const store = new InMemoryStore();
    await store.upsertServerVersion({
      runId: 'run_test',
      at: new Date(),
      server: {
        name: `example/reachability-422-${policy}`,
        version: '0.1.0',
        description: 'rag remote endpoint',
        remotes: [{ type: 'sse', url: remoteUrl }]
      },
      official: {
        isLatest: true,
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString()
      },
      ragmap: { categories: ['rag'], ragScore: 60, reasons: ['test'], keywords: ['rag'] },
      hidden: false
    });

    const app = await buildApp({
      env: { ...env, reachabilityPolicy: policy },
      store
    });

    const run = await app.inject({
      method: 'POST',
      url: '/internal/reachability/run',
      headers: {
        'content-type': 'application/json',
        'x-ingest-token': env.ingestToken
      },
      payload: { limit: 1 }
    });
    assert.equal(run.statusCode, 200);
    const stats = run.json() as any;
    assert.equal(stats.checked, 1);
    assert.equal(stats.reachable, expectedReachable ? 1 : 0);

    const reachableOnly = await app.inject({
      method: 'GET',
      url: '/rag/search?q=rag&hasRemote=true&reachable=true&limit=5'
    });
    assert.equal(reachableOnly.statusCode, 200);
    const body = reachableOnly.json() as any;
    assert.equal(body.metadata.count, expectedReachable ? 1 : 0);

    await app.close();
  }

  await runForPolicy('strict', false);
  await runForPolicy('loose', true);

  await new Promise<void>((resolve, reject) => upstream.close((err) => (err ? reject(err) : resolve())));
});

test('internal reachability run falls back from streamable-http failure to SSE success', async () => {
  const sockets = new Set<any>();
  const upstream = http.createServer((req, res) => {
    if (req.url === '/mcp-http') {
      res.statusCode = 404;
      res.end('missing');
      return;
    }
    if (req.url === '/mcp-sse') {
      res.writeHead(200, {
        'content-type': 'text/event-stream',
        'cache-control': 'no-cache'
      });
      res.write('data: ready\n\n');
      return;
    }
    res.statusCode = 404;
    res.end('not found');
  });
  upstream.on('connection', (socket) => {
    sockets.add(socket);
    socket.on('close', () => sockets.delete(socket));
  });
  await new Promise<void>((resolve, reject) =>
    upstream.listen(0, '127.0.0.1', (err?: Error) => (err ? reject(err) : resolve()))
  );
  const address = upstream.address();
  const port = typeof address === 'object' && address ? address.port : 0;

  const store = new InMemoryStore();
  await store.upsertServerVersion({
    runId: 'run_test',
    at: new Date(),
    server: {
      name: 'example/reachability-streamable-fallback-sse',
      version: '0.1.0',
      description: 'rag remote endpoint',
      remotes: [
        { type: 'streamable-http', url: `http://127.0.0.1:${port}/mcp-http` },
        { type: 'sse', url: `http://127.0.0.1:${port}/mcp-sse` }
      ]
    },
    official: {
      isLatest: true,
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString()
    },
    ragmap: { categories: ['rag'], ragScore: 60, reasons: ['test'], keywords: ['rag'] },
    hidden: false
  });

  const app = await buildApp({ env, store });
  const run = await app.inject({
    method: 'POST',
    url: '/internal/reachability/run',
    headers: {
      'content-type': 'application/json',
      'x-ingest-token': env.ingestToken
    },
    payload: { limit: 1 }
  });
  assert.equal(run.statusCode, 200);
  const stats = run.json() as any;
  assert.equal(stats.checked, 1);
  assert.equal(stats.reachable, 1);

  const latest = await store.getServerVersion('example/reachability-streamable-fallback-sse', 'latest');
  const ragmap = (latest?._meta?.[META_RAGMAP_KEY] as any) ?? {};
  assert.equal(ragmap.reachable, true);
  assert.equal(ragmap.reachableMethod, 'GET');
  assert.equal(ragmap.reachableStatus, 200);
  assert.equal(ragmap.reachableRemoteType, 'sse');
  assert.equal(ragmap.reachableUrl, `http://127.0.0.1:${port}/mcp-sse`);

  await app.close();
  for (const socket of sockets) socket.destroy();
  await new Promise<void>((resolve, reject) => upstream.close((err) => (err ? reject(err) : resolve())));
});

test('rag search hasRemote response flag matches hasRemote filter even without enrichment booleans', async () => {
  const store = new InMemoryStore();
  await store.upsertServerVersion({
    runId: 'run_test',
    at: new Date(),
    server: {
      name: 'example/remote-no-enrichment-boolean',
      version: '0.1.0',
      description: 'remote server',
      remotes: [{ type: 'streamable-http', url: 'https://example.com/mcp' }]
    },
    official: { isLatest: true, updatedAt: new Date().toISOString(), publishedAt: new Date().toISOString() },
    ragmap: { categories: ['rag'], ragScore: 40, reasons: ['test'], keywords: ['enrichment'] },
    hidden: false
  });

  const app = await buildApp({ env, store });
  const res = await app.inject({
    method: 'GET',
    url: '/rag/search?q=enrichment&hasRemote=true&limit=5'
  });
  assert.equal(res.statusCode, 200);
  const body = res.json() as any;
  assert.equal(body.metadata.count >= 1, true);
  assert.equal(body.results[0].name, 'example/remote-no-enrichment-boolean');
  assert.equal(body.results[0].hasRemote, true);
  assert.equal(body.results[0].localOnly, false);

  await app.close();
});

test('rag top returns non-empty recommended retrievers with default filters', async () => {
  const store = new InMemoryStore();
  await store.upsertServerVersion({
    runId: 'run_test',
    at: new Date(),
    server: {
      name: 'example/top-retriever',
      version: '0.1.0',
      description: 'retrieval semantic search rag server',
      remotes: [{ type: 'streamable-http', url: 'https://example.com/mcp' }]
    },
    official: { isLatest: true, updatedAt: new Date().toISOString(), publishedAt: new Date().toISOString() },
    ragmap: { categories: ['rag'], ragScore: 80, reasons: ['test'], keywords: ['retrieval'], serverKind: 'retriever' },
    hidden: false
  });

  const app = await buildApp({ env, store });
  const res = await app.inject({ method: 'GET', url: '/rag/top' });
  assert.equal(res.statusCode, 200);
  const body = res.json() as any;
  assert.equal(body.metadata.count >= 1, true);
  assert.equal(body.results[0].name, 'example/top-retriever');
  assert.equal(body.results[0].serverKind, 'retriever');
  await app.close();
});

test('rag install returns copy-ready config object', async () => {
  const store = new InMemoryStore();
  await store.upsertServerVersion({
    runId: 'run_test',
    at: new Date(),
    server: {
      name: 'example/installable',
      version: '1.2.3',
      description: 'retrieval server',
      packages: [
        {
          registryType: 'npm',
          identifier: '@example/installable-mcp',
          version: '1.2.3',
          runtimeHint: 'npx',
          transport: { type: 'stdio' }
        }
      ]
    },
    official: { isLatest: true, updatedAt: new Date().toISOString(), publishedAt: new Date().toISOString() },
    ragmap: { categories: ['rag'], ragScore: 55, reasons: ['test'], keywords: ['rag'] },
    hidden: false
  });

  const app = await buildApp({ env, store });
  const res = await app.inject({ method: 'GET', url: '/rag/install?name=example/installable' });
  assert.equal(res.statusCode, 200);
  const body = res.json() as any;
  assert.equal(body.serverName, 'example/installable');
  assert.equal(body.version, '1.2.3');
  assert.equal(body.transport.hasStdio, true);
  assert.equal(typeof body.genericMcpHostConfig?.json, 'string');
  assert.equal(body.genericMcpHostConfig.json.includes('mcpServers'), true);
  await app.close();
});

test('rag stats returns freshness and coverage fields', async () => {
  const store = new InMemoryStore();
  await store.upsertServerVersion({
    runId: 'run_test',
    at: new Date(),
    server: {
      name: 'example/stats-retriever',
      version: '0.3.0',
      description: 'retrieval rag search server',
      remotes: [{ type: 'streamable-http', url: 'https://example.com/r1' }]
    },
    official: { isLatest: true, updatedAt: '2026-02-28T00:00:00.000Z', publishedAt: '2026-02-28T00:00:00.000Z' },
    ragmap: {
      categories: ['rag'],
      ragScore: 30,
      reasons: ['test'],
      keywords: ['rag'],
      serverKind: 'retriever',
      hasRemote: true,
      reachable: true,
      lastReachableAt: '2026-02-28T02:00:00.000Z',
      reachableCheckedAt: '2026-02-28T02:00:00.000Z'
    },
    hidden: false
  });
  await store.upsertServerVersion({
    runId: 'run_test',
    at: new Date(),
    server: {
      name: 'example/stats-unknown',
      version: '0.1.0',
      description: 'remote without reachability yet',
      remotes: [{ type: 'sse', url: 'https://example.com/r2-sse' }]
    },
    official: { isLatest: true, updatedAt: '2026-02-27T00:00:00.000Z', publishedAt: '2026-02-27T00:00:00.000Z' },
    ragmap: {
      categories: ['rag'],
      ragScore: 2,
      reasons: ['test'],
      keywords: ['rag'],
      serverKind: 'retriever',
      hasRemote: true
    },
    hidden: false
  });
  await store.upsertServerVersion({
    runId: 'run_test',
    at: new Date(),
    server: {
      name: 'example/stats-local-only',
      version: '0.1.0',
      description: 'local stdio retriever',
      packages: [{ registryType: 'npm', identifier: '@example/local', version: '0.1.0', transport: { type: 'stdio' } }]
    },
    official: { isLatest: true, updatedAt: '2026-02-26T00:00:00.000Z', publishedAt: '2026-02-26T00:00:00.000Z' },
    ragmap: { categories: ['rag'], ragScore: 0, reasons: ['test'], keywords: ['rag'], hasRemote: false },
    hidden: false
  });
  await store.setLastSuccessfulIngestAt(new Date('2026-02-28T01:00:00.000Z'));
  await store.setLastReachabilityRunAt(new Date('2026-02-28T02:00:00.000Z'));

  const app = await buildApp({ env, store });
  const res = await app.inject({ method: 'GET', url: '/rag/stats' });
  assert.equal(res.statusCode, 200);
  const body = res.json() as any;
  assert.equal(typeof body.totalLatestServers, 'number');
  assert.equal(typeof body.countRagScoreGte1, 'number');
  assert.equal(typeof body.countRagScoreGte25, 'number');
  assert.equal(body.reachabilityCandidates, 2);
  assert.equal(body.reachabilityKnown, 1);
  assert.equal(body.reachabilityTrue, 1);
  assert.equal(body.reachabilityUnknown, 1);
  assert.equal(typeof body.lastSuccessfulIngestAt, 'string');
  assert.equal(typeof body.lastReachabilityRunAt, 'string');
  await app.close();
});
