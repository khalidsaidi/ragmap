import {
  getStreamableHttpUrl,
  probeReachable,
  REACHABILITY_DELAY_MS,
  REACHABILITY_MAX_PER_RUN,
  REACHABILITY_TIMEOUT_MS,
  shuffleInPlace
} from '../ingest/ingest.js';
import type { Env } from '../env.js';
import type { RegistryStore } from '../store/types.js';
import {
  META_OFFICIAL_KEY,
  META_RAGMAP_KEY,
  type RegistryServerEntry,
  type ServerKind
} from '@ragmap/shared';
import { inferHasRemoteFromServer, inferServerKindFromServer } from '../rag/search.js';

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

export type ReachabilityCandidate = {
  name: string;
  url: string;
  ragScore: number;
  serverKind: ServerKind;
  updatedAtMs: number;
  reachableCheckedAtMs: number | null;
};

function getRagmap(entry: RegistryServerEntry): Record<string, unknown> {
  const ragmap = (entry._meta?.[META_RAGMAP_KEY] as Record<string, unknown> | undefined) ?? {};
  return ragmap;
}

function inferHasRemote(entry: RegistryServerEntry): boolean {
  const ragmap = getRagmap(entry);
  if (typeof ragmap.hasRemote === 'boolean') return ragmap.hasRemote;
  return inferHasRemoteFromServer(entry.server as any);
}

function inferServerKind(entry: RegistryServerEntry): ServerKind {
  const ragmap = getRagmap(entry);
  const kind = ragmap.serverKind;
  if (
    kind === 'retriever' ||
    kind === 'evaluator' ||
    kind === 'indexer' ||
    kind === 'router' ||
    kind === 'other'
  ) {
    return kind;
  }
  return inferServerKindFromServer(entry.server as any);
}

function getRagScore(entry: RegistryServerEntry): number {
  const ragmap = getRagmap(entry);
  const parsed = Number(ragmap.ragScore ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function getOfficialUpdatedAtMs(entry: RegistryServerEntry): number {
  const official = (entry._meta?.[META_OFFICIAL_KEY] as Record<string, unknown> | undefined) ?? {};
  const raw = official.updatedAt;
  if (typeof raw !== 'string' || !raw) return 0;
  const parsed = Date.parse(raw);
  return Number.isFinite(parsed) ? parsed : 0;
}

function getReachableCheckedAtMs(entry: RegistryServerEntry): number | null {
  const ragmap = getRagmap(entry);
  const rawCheckedAt =
    typeof ragmap.reachableCheckedAt === 'string'
      ? ragmap.reachableCheckedAt
      : typeof ragmap.lastReachableAt === 'string'
        ? ragmap.lastReachableAt
        : null;
  if (!rawCheckedAt) return null;
  const parsed = Date.parse(rawCheckedAt);
  return Number.isFinite(parsed) ? parsed : null;
}

function comparePriority(a: ReachabilityCandidate, b: ReachabilityCandidate): number {
  if (b.ragScore !== a.ragScore) return b.ragScore - a.ragScore;
  if (b.updatedAtMs !== a.updatedAtMs) return b.updatedAtMs - a.updatedAtMs;
  return a.name.localeCompare(b.name);
}

function comparePriorityA(a: ReachabilityCandidate, b: ReachabilityCandidate): number {
  const aUnknown = a.reachableCheckedAtMs == null;
  const bUnknown = b.reachableCheckedAtMs == null;
  if (aUnknown !== bUnknown) return aUnknown ? -1 : 1;

  if (a.reachableCheckedAtMs != null && b.reachableCheckedAtMs != null) {
    if (a.reachableCheckedAtMs !== b.reachableCheckedAtMs) {
      return a.reachableCheckedAtMs - b.reachableCheckedAtMs;
    }
  }

  return comparePriority(a, b);
}

export function selectReachabilityCandidates(
  candidates: ReachabilityCandidate[],
  requested: number
): ReachabilityCandidate[] {
  const priorityA: ReachabilityCandidate[] = [];
  const priorityB: ReachabilityCandidate[] = [];
  const bucketC: ReachabilityCandidate[] = [];

  for (const candidate of candidates) {
    if (candidate.serverKind === 'retriever' && candidate.ragScore >= 10) {
      priorityA.push(candidate);
      continue;
    }
    if (candidate.serverKind === 'retriever' && candidate.ragScore >= 1) {
      priorityB.push(candidate);
      continue;
    }
    bucketC.push(candidate);
  }

  priorityA.sort(comparePriorityA);
  priorityB.sort(comparePriority);
  shuffleInPlace(bucketC);

  const selected: ReachabilityCandidate[] = [];
  const targetA = Math.min(Math.ceil(requested * 0.7), priorityA.length);
  selected.push(...priorityA.slice(0, targetA));

  if (selected.length < requested) {
    selected.push(...priorityB.slice(0, requested - selected.length));
  }

  if (selected.length < requested) {
    selected.push(...bucketC.slice(0, requested - selected.length));
  }

  return selected;
}

export async function runReachabilityRefresh(params: {
  env: Pick<Env, 'reachabilityPolicy'>;
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

  const candidates: ReachabilityCandidate[] = [];
  let cursor: string | undefined;
  do {
    const page = await params.store.listLatestServers({ limit: 200, cursor });
    for (const entry of page.servers) {
      const url = getStreamableHttpUrl(entry.server);
      if (!url) continue;
      if (!inferHasRemote(entry)) continue;
      candidates.push({
        name: entry.server.name,
        url,
        ragScore: getRagScore(entry),
        serverKind: inferServerKind(entry),
        updatedAtMs: getOfficialUpdatedAtMs(entry),
        reachableCheckedAtMs: getReachableCheckedAtMs(entry)
      });
    }
    cursor = page.nextCursor;
  } while (cursor);

  const selected = selectReachabilityCandidates(candidates, requested);

  let checked = 0;
  let reachable = 0;
  for (const item of selected) {
    const probe = await probeReachable(
      item.url,
      REACHABILITY_TIMEOUT_MS,
      params.env.reachabilityPolicy
    );
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
