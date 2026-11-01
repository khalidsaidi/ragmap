import fs from 'node:fs/promises';

export const DATA_URL = 'https://raw.githubusercontent.com/khalidsaidi/ragmap/main/data/servers.json';

export type Server = {
  name: string;
  title: string | null;
  description: string | null;
  url: string;
  knowledge: string;
  topics: string[];
  tools: string[];
  repository: string | null;
  lastOk: string;
};

export type Catalog = {
  generatedAt: string;
  source: string;
  count: number;
  servers: Server[];
};

const STOPWORDS = new Set(['a', 'an', 'and', 'about', 'for', 'from', 'in', 'of', 'on', 'or', 'the', 'to', 'with', 'me', 'my', 'i', 'need', 'find', 'server', 'servers', 'mcp', 'search', 'that', 'which', 'who', 'knows']);

function words(text: string): string[] {
  return text.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 1 && !STOPWORDS.has(w));
}

// Fresh data from GitHub when reachable, otherwise the copy bundled in the package.
export async function loadCatalog(opts: { url?: string; bundledPath: URL; timeoutMs?: number }): Promise<Catalog> {
  try {
    const resp = await fetch(opts.url ?? DATA_URL, { signal: AbortSignal.timeout(opts.timeoutMs ?? 3000) });
    if (resp.ok) {
      const catalog = (await resp.json()) as Catalog;
      if (Array.isArray(catalog?.servers)) return catalog;
    }
  } catch {
    // offline or blocked: use the bundled copy
  }
  return JSON.parse(await fs.readFile(opts.bundledPath, 'utf8')) as Catalog;
}

function fields(server: Server): Array<[Set<string>, number]> {
  return [
    [new Set(words(server.topics.join(' '))), 3],
    [new Set(words(server.knowledge)), 2],
    [new Set(words(`${server.name} ${server.title ?? ''} ${server.description ?? ''}`)), 1],
    [new Set(words(server.tools.join(' '))), 1]
  ];
}

function matches(have: Set<string>, w: string): boolean {
  return have.has(w) || [...have].some((h) => h.length > 3 && w.length > 3 && (h.startsWith(w) || w.startsWith(h)));
}

export function findServers(catalog: Catalog, need: string | undefined, limit = 10): Server[] {
  const query = words(need ?? '');
  if (!query.length) return catalog.servers.slice(0, limit);
  const indexed = catalog.servers.map((server) => ({ server, fields: fields(server) }));
  // Rare words say more about what is needed than common ones like "documentation".
  const rarity = new Map(
    query.map((w) => {
      const df = indexed.filter((s) => s.fields.some(([have]) => matches(have, w))).length;
      return [w, Math.log((indexed.length + 1) / (df + 1)) + 1];
    })
  );
  const scored = indexed.map(({ server, fields }) => {
    let score = 0;
    for (const [have, weight] of fields) {
      for (const w of query) if (matches(have, w)) score += weight * rarity.get(w)!;
    }
    return { server, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || a.server.name.localeCompare(b.server.name))
    .slice(0, limit)
    .map((s) => s.server);
}

export function getServer(catalog: Catalog, name: string): Server | undefined {
  return catalog.servers.find((s) => s.name === name);
}

export function installConfig(server: Server) {
  const key = server.name.split('/').pop()!.replace(/[^a-zA-Z0-9_.-]/g, '_');
  return {
    claudeCode: `claude mcp add --transport http ${key} ${server.url}`,
    json: { mcpServers: { [key]: { type: 'http', url: server.url } } }
  };
}
