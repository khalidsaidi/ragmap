import { listStreamableHttpUrls } from '../rag/enrich.js';
import type { RegistryStore } from '../store/types.js';
import { REACHABILITY_MAX_PER_RUN, runReachabilityChecks, type ReachabilityRunStats } from '../ingest/ingest.js';

export type ReachabilityRefreshStats = ReachabilityRunStats & {
  startedAt: string;
  finishedAt: string;
  durationMs: number;
};

export async function runReachabilityRefresh(params: { store: RegistryStore; limit?: number }): Promise<ReachabilityRefreshStats> {
  const startedAt = new Date();
  const limit = Math.max(1, Math.min(params.limit ?? REACHABILITY_MAX_PER_RUN, REACHABILITY_MAX_PER_RUN));

  const candidates: Array<{ serverName: string; url: string }> = [];
  let cursor: string | undefined;

  for (;;) {
    const page = await params.store.listLatestServers({ cursor, limit: 200 });
    const servers = page.servers ?? [];
    if (servers.length === 0) break;

    for (const entry of servers) {
      const urls = listStreamableHttpUrls(entry.server as any);
      if (!urls.length) continue;
      candidates.push({ serverName: entry.server.name, url: urls[0] });
    }

    if (!page.nextCursor) break;
    cursor = page.nextCursor;
  }

  const stats = await runReachabilityChecks({
    store: params.store,
    candidates,
    limit
  });

  const finishedAt = new Date();
  return {
    ...stats,
    startedAt: startedAt.toISOString(),
    finishedAt: finishedAt.toISOString(),
    durationMs: finishedAt.getTime() - startedAt.getTime()
  };
}

