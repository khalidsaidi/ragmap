import {
  getStreamableHttpUrl,
  probeReachable,
  REACHABILITY_DELAY_MS,
  REACHABILITY_MAX_PER_RUN,
  REACHABILITY_TIMEOUT_MS,
  shuffleInPlace
} from '../ingest/ingest.js';
import type { RegistryStore } from '../store/types.js';

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export type ReachabilityRunStats = {
  startedAt: string;
  finishedAt: string;
  durationMs: number;
  requested: number;
  candidates: number;
  checked: number;
  reachable: number;
};

export async function runReachabilityRefresh(params: {
  store: RegistryStore;
  limit?: number;
}): Promise<ReachabilityRunStats> {
  const startedAt = new Date();
  const requested = Math.max(1, Math.min(500, Math.floor(params.limit ?? REACHABILITY_MAX_PER_RUN)));

  if (!params.store.setReachability) {
    const finishedAt = new Date();
    return {
      startedAt: startedAt.toISOString(),
      finishedAt: finishedAt.toISOString(),
      durationMs: finishedAt.getTime() - startedAt.getTime(),
      requested,
      candidates: 0,
      checked: 0,
      reachable: 0
    };
  }

  const candidates: Array<{ name: string; url: string }> = [];
  let cursor: string | undefined;
  do {
    const page = await params.store.listLatestServers({ limit: 200, cursor });
    for (const entry of page.servers) {
      const url = getStreamableHttpUrl(entry.server);
      if (url) candidates.push({ name: entry.server.name, url });
    }
    cursor = page.nextCursor;
  } while (cursor);

  shuffleInPlace(candidates);
  const selected = candidates.slice(0, requested);

  let checked = 0;
  let reachable = 0;
  for (const item of selected) {
    const probe = await probeReachable(item.url, REACHABILITY_TIMEOUT_MS);
    if (probe.ok) reachable += 1;
    await params.store.setReachability(item.name, probe.ok, new Date(), {
      status: probe.status,
      method: probe.method
    });
    checked += 1;
    await sleep(REACHABILITY_DELAY_MS);
  }

  const finishedAt = new Date();
  if (params.store.setLastReachabilityRunAt) {
    await params.store.setLastReachabilityRunAt(finishedAt);
  }
  return {
    startedAt: startedAt.toISOString(),
    finishedAt: finishedAt.toISOString(),
    durationMs: finishedAt.getTime() - startedAt.getTime(),
    requested,
    candidates: candidates.length,
    checked,
    reachable
  };
}
