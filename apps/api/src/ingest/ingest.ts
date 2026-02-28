import type { Env } from '../env.js';
import { embedText } from '../rag/embedding.js';
import { buildSearchText, enrichRag } from '../rag/enrich.js';
import { fetchUpstreamPage } from './upstream.js';
import type { IngestMode, RegistryStore } from '../store/types.js';
import { META_OFFICIAL_KEY, META_PUBLISHER_KEY } from '@ragmap/shared';

export const REACHABILITY_TIMEOUT_MS = 5000;
export const REACHABILITY_DELAY_MS = 800;
export const REACHABILITY_MAX_PER_RUN = 150;

export function getStreamableHttpUrl(server: any): string | null {
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

export type ReachabilityProbeResult = {
  ok: boolean;
  status?: number;
  method?: 'HEAD' | 'GET';
};

function isReachableStatus(status: number): boolean {
  if (status >= 200 && status <= 399) return true;
  if (status === 401 || status === 403 || status === 405 || status === 429) return true;
  if (status === 404 || status === 410) return false;
  if (status >= 500 && status <= 599) return false;
  return false;
}

async function requestStatus(
  url: string,
  method: 'HEAD' | 'GET',
  timeoutMs: number
): Promise<{ status?: number; method: 'HEAD' | 'GET'; threw: boolean }> {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method,
      signal: controller.signal,
      redirect: 'manual'
    });
    return { status: res.status, method, threw: false };
  } catch {
    return { status: undefined, method, threw: true };
  } finally {
    clearTimeout(t);
  }
}

export async function probeReachable(url: string, timeoutMs: number): Promise<ReachabilityProbeResult> {
  const head = await requestStatus(url, 'HEAD', timeoutMs);
  if (!head.threw && head.status != null && head.status !== 405) {
    return { ok: isReachableStatus(head.status), status: head.status, method: 'HEAD' };
  }

  const get = await requestStatus(url, 'GET', timeoutMs);
  if (!get.threw && get.status != null) {
    return { ok: isReachableStatus(get.status), status: get.status, method: 'GET' };
  }

  if (!head.threw && head.status != null) {
    return { ok: isReachableStatus(head.status), status: head.status, method: 'HEAD' };
  }

  return { ok: false };
}

export function shuffleInPlace<T>(items: T[]): void {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = items[i];
    items[i] = items[j];
    items[j] = tmp;
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
    shuffleInPlace(toCheck);
    for (const { name, url } of toCheck.slice(0, REACHABILITY_MAX_PER_RUN)) {
      const probe = await probeReachable(url, REACHABILITY_TIMEOUT_MS);
      await params.store.setReachability(name, probe.ok, new Date(), {
        status: probe.status,
        method: probe.method
      });
      reachabilityChecked += 1;
      await sleep(REACHABILITY_DELAY_MS);
    }
    if (params.store.setLastReachabilityRunAt) {
      await params.store.setLastReachabilityRunAt(new Date());
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
