import fs from 'node:fs/promises';
import path from 'node:path';
import { fetchUpstreamPage } from '../src/ingest/upstream.js';
import { enrichRag } from '../src/rag/enrich.js';

const REGISTRY = 'https://registry.modelcontextprotocol.io';
const OUT = path.resolve(import.meta.dirname, '../../../packages/mcp-local/data/catalog.json');
const MIN_SCORE = 1;

async function main() {
  const servers: any[] = [];
  let cursor: string | null = null;
  do {
    const page = await fetchUpstreamPage({ baseUrl: REGISTRY, cursor, limit: 100 });
    for (const item of page.servers) {
      const server = item.server as any;
      const official = (item._meta as any)?.['io.modelcontextprotocol.registry/official'];
      if (String(official?.status ?? '').toLowerCase() === 'deleted') continue;
      const ragmap = enrichRag(server);
      if (ragmap.ragScore < MIN_SCORE) continue;
      servers.push({
        name: server.name,
        version: server.version,
        title: server.title ?? null,
        description: server.description ?? null,
        remotes: server.remotes ?? [],
        packages: server.packages ?? [],
        ragScore: ragmap.ragScore,
        categories: ragmap.categories,
        serverKind: ragmap.serverKind,
        hasRemote: ragmap.hasRemote,
        citations: ragmap.citations
      });
    }
    cursor = page.nextCursor ?? null;
  } while (cursor);

  servers.sort((a, b) => b.ragScore - a.ragScore || a.name.localeCompare(b.name));
  const catalog = {
    generatedAt: new Date().toISOString(),
    source: REGISTRY,
    minScore: MIN_SCORE,
    count: servers.length,
    servers
  };
  await fs.mkdir(path.dirname(OUT), { recursive: true });
  await fs.writeFile(OUT, JSON.stringify(catalog, null, 2) + '\n');
  console.log(`wrote ${catalog.count} servers to ${OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
