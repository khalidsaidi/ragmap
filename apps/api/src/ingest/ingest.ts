import type { Env } from '../env.js';
import { embedText } from '../rag/embedding.js';
import { buildSearchText, enrichRag } from '../rag/enrich.js';
import { fetchUpstreamPage } from './upstream.js';
import type { IngestMode, RegistryStore } from '../store/types.js';
import { META_OFFICIAL_KEY, META_PUBLISHER_KEY } from '@ragmap/shared';

export type IngestStats = {
  mode: IngestMode;
  runId: string;
  startedAt: string;
  finishedAt: string;
  fetched: number;
  upserted: number;
  hidden: number;
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
    durationMs: finishedAt.getTime() - startedAt.getTime()
  };
}
