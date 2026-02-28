import { META_OFFICIAL_KEY, META_RAGMAP_KEY, type RagFilters, type RagmapEnrichment, type RegistryServerEntry, type ServerKind } from '@ragmap/shared';

function tokenize(query: string) {
  return query
    .toLowerCase()
    .split(/[^a-z0-9]+/g)
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 16);
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function keywordScore(text: string, tokenRegexes: RegExp[]) {
  if (!tokenRegexes.length) return 0;
  const lower = text.toLowerCase();
  let score = 0;
  for (const re of tokenRegexes) {
    if (re.test(lower)) score += 1;
  }
  return score;
}

function dot(a: number[], b: number[]) {
  const n = Math.min(a.length, b.length);
  let sum = 0;
  for (let i = 0; i < n; i++) sum += a[i] * b[i];
  return sum;
}

function norm(a: number[]) {
  let sum = 0;
  for (const v of a) sum += v * v;
  return Math.sqrt(sum);
}

export function cosineSimilarity(a: number[], b: number[]) {
  const denom = norm(a) * norm(b);
  if (!denom) return 0;
  return dot(a, b) / denom;
}

export type RagSearchItem = {
  entry: RegistryServerEntry;
  enrichment?: RagmapEnrichment | null;
  searchText: string;
};

export type RagSearchHit = {
  entry: RegistryServerEntry;
  kind: 'keyword' | 'semantic';
  score: number;
};

export function inferHasRemoteFromServer(server: any): boolean {
  const remotes: any[] = Array.isArray(server?.remotes) ? server.remotes : [];
  for (const remote of remotes) {
    if (typeof remote?.url === 'string' && remote.url) return true;
  }

  const packages: any[] = Array.isArray(server?.packages) ? server.packages : [];
  for (const pkg of packages) {
    const transport = pkg?.transport;
    if (!transport || typeof transport !== 'object') continue;
    if (transport.type !== 'streamable-http') continue;
    if (
      (typeof transport.url === 'string' && transport.url) ||
      (typeof transport.endpoint === 'string' && transport.endpoint) ||
      (typeof pkg?.url === 'string' && pkg.url)
    ) {
      return true;
    }
  }

  return false;
}

export function inferServerKindFromServer(server: any): ServerKind {
  const text = [server?.name, server?.title, server?.description]
    .filter((part) => typeof part === 'string' && part)
    .join(' ');
  if (/\bevaluate|evaluation|benchmark|dataset|leaderboard|judge\b/i.test(text)) return 'evaluator';
  if (/\bingest|ingestion|index|indexing|crawl|crawler|scrape|etl|connector\b/i.test(text)) return 'indexer';
  if (/\brouter|select tool|tool selection|orchestrate|orchestration\b/i.test(text)) return 'router';
  if (/\bsearch|retrieval|retriever|semantic search|\brag\b|vector search\b/i.test(text)) return 'retriever';
  return 'other';
}

function inferServerKind(enrichment: RagmapEnrichment | null | undefined, server: any): ServerKind {
  const kind = enrichment?.serverKind;
  if (kind === 'retriever' || kind === 'evaluator' || kind === 'indexer' || kind === 'router' || kind === 'other') {
    return kind;
  }
  return inferServerKindFromServer(server);
}

function getOfficialUpdatedAtMs(entry: RegistryServerEntry): number {
  const official = (entry._meta?.[META_OFFICIAL_KEY] as any) ?? {};
  const updatedAt = official?.updatedAt;
  if (typeof updatedAt !== 'string' || !updatedAt) return 0;
  const ts = Date.parse(updatedAt);
  return Number.isFinite(ts) ? ts : 0;
}

function getRagmapMeta(entry: RegistryServerEntry): any {
  return (entry._meta?.[META_RAGMAP_KEY] as any) ?? {};
}

function compareQualitySignals(a: RagSearchHit, b: RagSearchHit): number {
  const ragA = getRagmapMeta(a.entry);
  const ragB = getRagmapMeta(b.entry);
  const reachableA = ragA?.reachable === true ? 1 : 0;
  const reachableB = ragB?.reachable === true ? 1 : 0;
  if (reachableA !== reachableB) return reachableB - reachableA;

  const ragScoreA = Number(ragA?.ragScore ?? 0);
  const ragScoreB = Number(ragB?.ragScore ?? 0);
  if (ragScoreA !== ragScoreB) return ragScoreB - ragScoreA;

  const updatedAtA = getOfficialUpdatedAtMs(a.entry);
  const updatedAtB = getOfficialUpdatedAtMs(b.entry);
  if (updatedAtA !== updatedAtB) return updatedAtB - updatedAtA;

  return a.entry.server.name.localeCompare(b.entry.server.name);
}

function passesFilters(item: RagSearchItem, filters: RagFilters | undefined) {
  if (!filters) return true;
  const enrichment: RagmapEnrichment | null | undefined = item.enrichment ?? null;
  const inferredHasRemote =
    typeof enrichment?.hasRemote === 'boolean'
      ? enrichment.hasRemote
      : inferHasRemoteFromServer(item.entry.server as any);
  const inferredLocalOnly =
    typeof enrichment?.localOnly === 'boolean' ? enrichment.localOnly : !inferredHasRemote;
  const inferredServerKind = inferServerKind(enrichment, item.entry.server as any);

  if (filters.minScore != null) {
    const score = enrichment?.ragScore ?? 0;
    if (score < filters.minScore) return false;
  }
  if (filters.categories && filters.categories.length) {
    const categories = new Set((enrichment?.categories ?? []).map((c) => c.toLowerCase()));
    for (const need of filters.categories) {
      if (!categories.has(need.toLowerCase())) return false;
    }
  }
  if (filters.transport) {
    const need = filters.transport;
    const server: any = item.entry.server as any;
    const packages: any[] = Array.isArray(server?.packages) ? server.packages : [];
    const remotes: any[] = Array.isArray(server?.remotes) ? server.remotes : [];

    let ok = false;
    for (const pkg of packages) {
      const t = pkg?.transport?.type;
      if (t === need) {
        ok = true;
        break;
      }
    }
    if (!ok) {
      for (const remote of remotes) {
        if (remote?.type === need) {
          ok = true;
          break;
        }
      }
    }
    if (!ok) return false;
  }
  if (filters.registryType) {
    const need = filters.registryType.toLowerCase();
    const server: any = item.entry.server as any;
    const packages: any[] = Array.isArray(server?.packages) ? server.packages : [];
    let ok = false;
    for (const pkg of packages) {
      const rt = pkg?.registryType;
      if (typeof rt === 'string' && rt.toLowerCase() === need) {
        ok = true;
        break;
      }
    }
    if (!ok) return false;
  }
  if (filters.hasRemote === true) {
    if (!inferredHasRemote) return false;
  }
  if (filters.hasRemote === false) {
    if (inferredHasRemote) return false;
  }
  if (filters.reachable === true) {
    if (enrichment?.reachable !== true) return false;
  }
  if (filters.citations === true) {
    if (enrichment?.citations !== true) return false;
  }
  if (filters.localOnly === true) {
    if (!inferredLocalOnly) return false;
  }
  if (filters.serverKind) {
    if (inferredServerKind !== filters.serverKind) return false;
  }
  return true;
}

export function ragSearchKeyword(
  items: RagSearchItem[],
  query: string,
  limit: number,
  filters?: RagFilters
): RagSearchHit[] {
  const tokens = tokenize(query);
  // Match tokens at word boundaries (prefix match) so "rag" doesn't match "storage".
  const tokenRegexes = tokens.map((t) => new RegExp(`\\b${escapeRegExp(t)}`, 'i'));
  const scored: RagSearchHit[] = [];
  for (const item of items) {
    if (!passesFilters(item, filters)) continue;
    const score = keywordScore(item.searchText, tokenRegexes);
    if (score <= 0) continue;
    scored.push({ entry: item.entry, kind: 'keyword', score });
  }
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return compareQualitySignals(a, b);
  });
  return scored.slice(0, limit);
}

export function ragSearchSemantic(
  items: RagSearchItem[],
  queryVector: number[],
  limit: number,
  filters?: RagFilters
): RagSearchHit[] {
  const scored: RagSearchHit[] = [];
  for (const item of items) {
    if (!passesFilters(item, filters)) continue;
    const vec = item.enrichment?.embedding?.vector;
    if (!Array.isArray(vec) || vec.length === 0) continue;
    const score = cosineSimilarity(queryVector, vec);
    if (score <= 0) continue;
    scored.push({ entry: item.entry, kind: 'semantic', score });
  }
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return compareQualitySignals(a, b);
  });
  return scored.slice(0, limit);
}

export function ragSearchTop(
  items: RagSearchItem[],
  limit: number,
  filters?: RagFilters
): RagSearchHit[] {
  const scored: RagSearchHit[] = [];
  for (const item of items) {
    if (!passesFilters(item, filters)) continue;
    const score = Number(item.enrichment?.ragScore ?? 0);
    scored.push({ entry: item.entry, kind: 'keyword', score });
  }
  scored.sort(compareQualitySignals);
  return scored.slice(0, limit);
}
