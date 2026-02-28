import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { buildApp } from '../src/app.js';
import type { Env } from '../src/env.js';
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
