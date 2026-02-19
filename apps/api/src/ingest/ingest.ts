import type { Env } from '../env.js';
import { embedText } from '../rag/embedding.js';
import { buildSearchText, enrichRag } from '../rag/enrich.js';
import { fetchUpstreamPage } from './upstream.js';
import type { IngestMode, RegistryStore } from '../store/types.js';
import { META_OFFICIAL_KEY, META_PUBLISHER_KEY } from '@ragmap/shared';

const REACHABILITY_TIMEOUT_MS = 5000;
const REACHABILITY_DELAY_MS = 800;
const REACHABILITY_MAX_PER_RUN = 150;

function getStreamableHttpUrl(server: any): string | null {
  const remotes = server?.remotes;
  if (Array.isArray(remotes)) {
    for (const r of remotes) {
      if (r?.type === 'streamable-http' && typeof r?.url === 'string') return r.url;
    }
  }
  const packages = server?.packages;
  if (Array.isArray(packages)) {
    for (const p of packages) {
      if (p?.transport?.type === 'streamable-http' && typeof p?.transport?.url === 'string')
        return p.transport.url;
    }
  }
  return null;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function headWithTimeout(url: string, timeoutMs: number): Promise<boolean> {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { method: 'HEAD', signal: controller.signal });
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(t);
  }
}

export type IngestStats = {
  mode: IngestMode;
  runId: string;
  startedAt: string;
  finishedAt: string;
  fetched: number;
  upserted: number;
  hidden: number;
  reachabilityChecked?: number;
  durationMs: number;
};

export async function runIngest(params: { env: Env; store: RegistryStore; mode: IngestMode }): Promise<IngestStats> {
  const startedAt = new Date();
  const { runId } = await params.store.beginIngestRun(params.mode);

  const updatedSince =
    params.mode === 'incremental' ? await params.store.getLastSuccessfulIngestAt() : null;

  let cursor: string | null = null;
  let fetched = 0;
  let upserted = 0;

  for (;;) {
    const page = await fetchUpstreamPage({
      baseUrl: params.env.registryBaseUrl,
      cursor,
      limit: params.env.ingestPageLimit,
      updatedSince
    });

    const servers = page.servers ?? [];
    if (servers.length === 0) break;

    for (const item of servers) {
      const server = item.server as any;
      if (!server?.name || !server?.version) continue;
      const official = (item._meta as any)?.[META_OFFICIAL_KEY] ?? null;
      const publisherProvided = (item._meta as any)?.[META_PUBLISHER_KEY] ?? null;

      // Only hide upstream-deleted entries from public listings.
      // Deprecated entries should remain visible (with official status preserved in _meta).
      const status = typeof official?.status === 'string' ? official.status : '';
      const hidden = status.toLowerCase() === 'deleted';

      const enrichment = enrichRag(server);
      const embeddingText = buildSearchText(server);
      let embedding = null as null | { model: string; vector: number[] };
      try {
        embedding = await embedText(params.env, embeddingText);
      } catch {
        embedding = null;
      }
      const ragmap = embedding
        ? {
            ...enrichment,
            embedding: {
              model: embedding.model,
              dims: embedding.vector.length,
              vector: embedding.vector,
              createdAt: new Date().toISOString()
            }
          }
        : enrichment;

      const at = new Date();
      fetched += 1;
      await params.store.markServerSeen(runId, server.name, at);
      await params.store.upsertServerVersion({
        runId,
        at,
        server,
        official,
        publisherProvided,
        ragmap,
        hidden
      });
      upserted += 1;
    }

    cursor = page.nextCursor ?? null;
    if (!cursor) break;
  }

  let hidden = 0;
  if (params.mode === 'full') {
    hidden = await params.store.hideServersNotSeen(runId);
  }

  let reachabilityChecked = 0;
  if (params.mode === 'full' && params.store.setReachability) {
    const toCheck: { name: string; url: string }[] = [];
    let cursor: string | undefined;
    do {
      const page = await params.store.listLatestServers({ limit: 200, cursor });
      for (const s of page.servers) {
        const url = getStreamableHttpUrl(s.server);
        if (url) toCheck.push({ name: s.server.name, url });
      }
      cursor = page.nextCursor;
    } while (cursor);
    for (const { name, url } of toCheck.slice(0, REACHABILITY_MAX_PER_RUN)) {
      const ok = await headWithTimeout(url, REACHABILITY_TIMEOUT_MS);
      await params.store.setReachability(name, ok, new Date());
      reachabilityChecked += 1;
      await sleep(REACHABILITY_DELAY_MS);
    }
  }

  const finishedAt = new Date();
  await params.store.setLastSuccessfulIngestAt(finishedAt);

  return {
    mode: params.mode,
    runId,
    startedAt: startedAt.toISOString(),
    finishedAt: finishedAt.toISOString(),
    fetched,
    upserted,
    hidden,
    reachabilityChecked,
    durationMs: finishedAt.getTime() - startedAt.getTime()
  };
}
