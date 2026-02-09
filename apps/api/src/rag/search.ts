import type { RagFilters, RagmapEnrichment, RegistryServerEntry } from '@ragmap/shared';

function tokenize(query: string) {
  return query
    .toLowerCase()
    .split(/[^a-z0-9]+/g)
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 16);
}

function keywordScore(text: string, tokens: string[]) {
  if (!tokens.length) return 0;
  const lower = text.toLowerCase();
  let score = 0;
  for (const token of tokens) {
    if (!token) continue;
    if (lower.includes(token)) score += 1;
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

function passesFilters(enrichment: RagmapEnrichment | null | undefined, filters: RagFilters | undefined) {
  if (!filters) return true;
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
  return true;
}

export function ragSearchKeyword(
  items: RagSearchItem[],
  query: string,
  limit: number,
  filters?: RagFilters
): RagSearchHit[] {
  const tokens = tokenize(query);
  const scored: RagSearchHit[] = [];
  for (const item of items) {
    if (!passesFilters(item.enrichment ?? null, filters)) continue;
    const score = keywordScore(item.searchText, tokens);
    if (score <= 0) continue;
    scored.push({ entry: item.entry, kind: 'keyword', score });
  }
  scored.sort((a, b) => b.score - a.score);
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
    if (!passesFilters(item.enrichment ?? null, filters)) continue;
    const vec = item.enrichment?.embedding?.vector;
    if (!Array.isArray(vec) || vec.length === 0) continue;
    const score = cosineSimilarity(queryVector, vec);
    if (score <= 0) continue;
    scored.push({ entry: item.entry, kind: 'semantic', score });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit);
}

