// Daily job: find remote MCP servers in the official registry that answer with no key,
// keep the ones that search a body of knowledge, and write data/servers.json + the README list.
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import Anthropic from '@anthropic-ai/sdk';
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod';
import { z } from 'zod/v4';
import type { Catalog, Server } from '../src/data.ts';

const REGISTRY = 'https://registry.modelcontextprotocol.io';
const ROOT = new URL('../', import.meta.url);
const SERVERS_PATH = new URL('data/servers.json', ROOT);
const LABELS_PATH = new URL('data/labels.json', ROOT);
const README_PATH = new URL('README.md', ROOT);
const MODEL = 'claude-opus-5-5';
const KEEP_FAILING_DAYS = 3;
const CONCURRENCY = 32;
const PER_HOST = 2;

// Loose on purpose: the label step decides what really is retrieval.
const CANDIDATE = /\b(rag|retriev\w*|semantic|vector|embedding\w*|knowledge|search\w*|docs?|documentation|corpus|research|lookup|look up|reference|encyclopedia|wiki\w*|papers?|laws?|regulations?|answers?|questions?)\b/i;
const SEARCH_TOOL = /search|query|retriev|lookup|find|ask|answer|recall|semantic|rag|knowledge|docs?|research|reference/i;

type Label = { hash: string; retrieval: boolean; free: boolean; knowledge: string; topics: string[]; by: string };
type Probed = { server: any; url: string; tools: Array<{ name: string; description: string }> };

async function fetchRegistry(): Promise<any[]> {
  const out: any[] = [];
  let cursor: string | null = null;
  do {
    const url = new URL('/v0.1/servers', REGISTRY);
    url.searchParams.set('limit', '100');
    url.searchParams.set('version', 'latest');
    if (cursor) url.searchParams.set('cursor', cursor);
    const resp = await fetch(url, { headers: { accept: 'application/json' } });
    if (!resp.ok) throw new Error(`registry ${resp.status}`);
    const page = (await resp.json()) as any;
    for (const item of page.servers ?? []) {
      const status = String(item._meta?.['io.modelcontextprotocol.registry/official']?.status ?? '').toLowerCase();
      if (status !== 'deleted' && status !== 'deprecated') out.push(item.server);
    }
    cursor = page.metadata?.nextCursor ?? null;
  } while (cursor);
  return out;
}

function remoteUrl(server: any): string | null {
  for (const remote of server.remotes ?? []) {
    if (remote?.type !== 'streamable-http' || typeof remote.url !== 'string') continue;
    if (remote.url.includes('{')) continue;
    if ((remote.headers ?? []).some((h: any) => h?.isRequired)) continue;
    return remote.url;
  }
  return null;
}

function findReply(text: string, id: unknown): any {
  const messages = text.trimStart().startsWith('{')
    ? [text]
    : text.split('\n').filter((l) => l.startsWith('data:')).map((l) => l.slice(5).trim());
  for (const m of messages) {
    try {
      const parsed = JSON.parse(m);
      if (parsed.id === id) return parsed;
    } catch {
      // incomplete or not JSON: keep reading
    }
  }
  return null;
}

// Some servers keep the event stream open after replying, so read only until the reply arrives.
// The timer is a plain setTimeout so it keeps the process alive until it fires.
async function rpc(url: string, body: { jsonrpc: string; id?: number; method: string; params?: object }, sessionId?: string | null) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json, text/event-stream',
        'user-agent': 'ragmap-check/2 (+https://github.com/khalidsaidi/ragmap)',
        ...(sessionId ? { 'mcp-session-id': sessionId } : {})
      },
      body: JSON.stringify(body),
      signal: controller.signal
    });
    const newSessionId = resp.headers.get('mcp-session-id');
    if (!resp.ok) throw new Error(`http ${resp.status}`);
    if (body.id === undefined || !resp.body) {
      resp.body?.cancel().catch(() => {});
      return { message: null, sessionId: newSessionId };
    }
    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let text = '';
    for (;;) {
      const { done, value } = await reader.read();
      if (value) text += decoder.decode(value, { stream: true });
      const reply = findReply(text, body.id);
      if (reply || done || text.length > 2_000_000) {
        reader.cancel().catch(() => {});
        return { message: reply, sessionId: newSessionId };
      }
    }
  } finally {
    clearTimeout(timer);
  }
}

// A server "works" if it completes initialize + tools/list with no credentials.
export async function probe(url: string): Promise<Array<{ name: string; description: string }> | null> {
  let timer: NodeJS.Timeout | undefined;
  const deadline = new Promise<null>((resolve) => (timer = setTimeout(() => resolve(null), 60000)));
  try {
    return await Promise.race([handshake(url), deadline]);
  } finally {
    clearTimeout(timer);
  }
}

async function handshake(url: string): Promise<Array<{ name: string; description: string }> | null> {
  try {
    const init = await rpc(url, {
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
      params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'ragmap-check', version: '2' } }
    });
    if (!init.message?.result) return null;
    await rpc(url, { jsonrpc: '2.0', method: 'notifications/initialized' }, init.sessionId).catch(() => null);
    const list = await rpc(url, { jsonrpc: '2.0', id: 2, method: 'tools/list' }, init.sessionId);
    const tools = list.message?.result?.tools;
    if (!Array.isArray(tools) || !tools.length) return null;
    return tools.map((t: any) => ({ name: String(t.name ?? ''), description: String(t.description ?? '').slice(0, 300) }));
  } catch {
    return null;
  }
}

// Runs fn over items with at most `size` calls at once and `perHost` calls per host,
// because many registry entries share one host and hosts rate-limit bursts.
async function pool<T extends { url: string }, R>(items: T[], size: number, perHost: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  const waiting = items.map((_, i) => i);
  const busy = new Map<string, number>();
  const host = (i: number) => new URL(items[i].url).host;
  await Promise.all(
    Array.from({ length: size }, async () => {
      for (;;) {
        const at = waiting.findIndex((i) => (busy.get(host(i)) ?? 0) < perHost);
        if (at === -1) {
          if (!waiting.length) return;
          await new Promise((r) => setTimeout(r, 50));
          continue;
        }
        const [i] = waiting.splice(at, 1);
        busy.set(host(i), (busy.get(host(i)) ?? 0) + 1);
        try {
          out[i] = await fn(items[i]);
        } finally {
          busy.set(host(i), busy.get(host(i))! - 1);
        }
      }
    })
  );
  return out;
}

// Tool names only: some servers put changing text (dates, counts) in tool descriptions,
// which would otherwise trigger a paid relabel every day.
export function labelHash(p: Probed): string {
  const tools = p.tools.map((t) => t.name).sort().join('\n');
  return crypto.createHash('sha256').update(`${p.server.description ?? ''}\n${tools}`).digest('hex').slice(0, 16);
}

const LabelBatch = z.object({
  servers: z.array(
    z.object({
      name: z.string(),
      retrieval: z.boolean(),
      free: z.boolean(),
      knowledge: z.string(),
      topics: z.array(z.string())
    })
  )
});

const LABEL_INSTRUCTIONS = `You sort MCP servers for RAGMap, a list that helps AI agents find a server that knows about something.

For each server, decide "retrieval": true only if its main job is letting an agent search or look up information in a body of knowledge and get that content back. Examples: web search, documentation search, papers, laws and regulations, encyclopedias, news archives, a company's knowledge base, a catalog of facts about a domain.

"retrieval": false for servers whose main job is something else, even if they have a search tool: booking, shopping, sending messages, creating or converting files, running code, analytics on the user's own accounts, personal memory or note storage, fetching a single URL the caller already has, calculators.

"free": false if its description or tools say results cost money: pay per query, prepaid credits, x402 or crypto payments, a paid plan. Otherwise true.

"knowledge": what an agent can learn from it, in at most 12 plain words, e.g. "EU cosmetics safety rules and required documents". Empty string if retrieval is false.
"topics": 1 to 4 short lowercase topic tags, e.g. ["regulation", "cosmetics", "eu"]. Empty array if retrieval is false.

Return one entry per server, using the exact name given.`;

async function labelWithClaude(batch: Probed[]): Promise<Map<string, Omit<Label, 'hash' | 'by'>>> {
  const client = new Anthropic();
  const listing = batch
    .map((p) =>
      JSON.stringify({
        name: p.server.name,
        title: p.server.title ?? null,
        description: p.server.description ?? null,
        tools: p.tools.map((t) => `${t.name}: ${t.description}`.slice(0, 200))
      })
    )
    .join('\n');
  const response = await client.messages.parse({
    model: MODEL,
    max_tokens: 16000,
    output_config: { effort: 'low', format: zodOutputFormat(LabelBatch) },
    system: LABEL_INSTRUCTIONS,
    messages: [{ role: 'user', content: `Servers, one JSON object per line:\n${listing}` }]
  });
  if (response.stop_reason === 'refusal' || !response.parsed_output) throw new Error(`label batch failed: ${response.stop_reason}`);
  return new Map(response.parsed_output.servers.map((s) => [s.name, { retrieval: s.retrieval, free: s.free, knowledge: s.knowledge, topics: s.topics }]));
}

async function readJson<T>(url: URL, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(url, 'utf8')) as T;
  } catch {
    return fallback;
  }
}

function readmeList(servers: Server[], generatedAt: string): string {
  const cell = (s: string) => s.replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim();
  const rows = servers.map((s) => `| \`${s.name}\` | ${cell(s.knowledge)} | ${s.url} |`);
  return [
    `${servers.length} servers, checked ${generatedAt.slice(0, 10)}.`,
    '',
    '| Server | Knows about | URL |',
    '| --- | --- | --- |',
    ...rows
  ].join('\n');
}

async function main() {
  const today = new Date().toISOString();
  const pendingOut = process.argv.includes('--pending') ? process.argv[process.argv.indexOf('--pending') + 1] : null;

  const registry = await fetchRegistry();
  const candidates = registry
    .map((server) => ({ server, url: remoteUrl(server) }))
    .filter((c): c is { server: any; url: string } => !!c.url)
    .filter((c) => CANDIDATE.test(`${c.server.name} ${c.server.title ?? ''} ${c.server.description ?? ''}`));
  console.log(`registry ${registry.length}, keyless remote candidates ${candidates.length}`);

  const first = await pool(candidates, CONCURRENCY, PER_HOST, async (c) => ({ ...c, tools: await probe(c.url) }));
  // One slower retry for failures, so a busy moment doesn't drop a server.
  const failed = first.filter((p) => !p.tools);
  const retried = await pool(failed, 8, 1, async (c) => ({ ...c, tools: await probe(c.url) }));
  const probed = [...first.filter((p) => p.tools), ...retried]
    .filter((p): p is Probed => !!p.tools)
    .filter((p) => p.tools.some((t) => SEARCH_TOOL.test(`${t.name} ${t.description}`)));
  console.log(`working with a search-like tool ${probed.length}`);

  const labels = await readJson<Record<string, Label>>(LABELS_PATH, {});
  const needLabel = probed.filter((p) => labels[p.server.name]?.hash !== labelHash(p));
  if (needLabel.length && process.env.ANTHROPIC_API_KEY) {
    for (let i = 0; i < needLabel.length; i += 25) {
      const batch = needLabel.slice(i, i + 25);
      const result = await labelWithClaude(batch);
      for (const p of batch) {
        const l = result.get(p.server.name);
        if (l) labels[p.server.name] = { hash: labelHash(p), ...l, by: MODEL };
      }
    }
  }
  const unlabeled = probed.filter((p) => !labels[p.server.name]);
  console.log(`labels needed ${needLabel.length}, still unlabeled ${unlabeled.length}`);
  if (pendingOut) {
    const pending = needLabel.map((p) => ({ name: p.server.name, hash: labelHash(p), title: p.server.title ?? null, description: p.server.description ?? null, tools: p.tools }));
    await fs.writeFile(pendingOut, JSON.stringify(pending, null, 1));
  }

  const previous = await readJson<Catalog>(SERVERS_PATH, { generatedAt: today, source: REGISTRY, count: 0, servers: [] });
  const byName = new Map<string, Server>();
  for (const p of probed) {
    const l = labels[p.server.name];
    if (!l?.retrieval || !l.free) continue;
    byName.set(p.server.name, {
      name: p.server.name,
      title: p.server.title ?? null,
      description: p.server.description ?? null,
      url: p.url,
      knowledge: l.knowledge,
      topics: l.topics,
      tools: p.tools.map((t) => t.name),
      repository: p.server.repository?.url ?? null,
      lastOk: today.slice(0, 10)
    });
  }
  // A server that failed today stays listed for a few days, so one bad check doesn't drop it.
  const cutoff = new Date(Date.now() - KEEP_FAILING_DAYS * 86400000).toISOString().slice(0, 10);
  const stillRegistered = new Set(registry.map((s) => s.name));
  for (const s of previous.servers) {
    if (!byName.has(s.name) && s.lastOk >= cutoff && stillRegistered.has(s.name) && labels[s.name]?.retrieval && labels[s.name]?.free) byName.set(s.name, s);
  }

  for (const name of Object.keys(labels)) if (!stillRegistered.has(name)) delete labels[name];

  const servers = [...byName.values()].sort((a, b) => a.name.localeCompare(b.name));
  const catalog: Catalog = { generatedAt: today, source: REGISTRY, count: servers.length, servers };
  await fs.writeFile(SERVERS_PATH, JSON.stringify(catalog, null, 2) + '\n');
  await fs.writeFile(LABELS_PATH, JSON.stringify(Object.fromEntries(Object.entries(labels).sort(([a], [b]) => a.localeCompare(b))), null, 1) + '\n');

  const readme = await fs.readFile(README_PATH, 'utf8');
  const updated = readme.replace(/(<!-- list:start -->\n)[\s\S]*?(<!-- list:end -->)/, `$1${readmeList(servers, today)}\n$2`);
  await fs.writeFile(README_PATH, updated);
  console.log(`listed ${servers.length}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
