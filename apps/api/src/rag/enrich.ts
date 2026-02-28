import crypto from 'node:crypto';
import type { RagmapEnrichment, RegistryServer } from '@ragmap/shared';

function uniq(values: string[]) {
  return Array.from(new Set(values));
}

function toHttpUrl(value: unknown) {
  if (typeof value !== 'string' || !value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function listStreamableHttpUrls(server: RegistryServer) {
  const urls = new Set<string>();

  const remotes = (server as any)?.remotes;
  if (Array.isArray(remotes)) {
    for (const remote of remotes) {
      if (!remote || typeof remote !== 'object') continue;
      if ((remote as any).type !== 'streamable-http') continue;
      const url = toHttpUrl((remote as any).url);
      if (url) urls.add(url);
    }
  }

  const packages = (server as any)?.packages;
  if (Array.isArray(packages)) {
    for (const pkg of packages) {
      if (!pkg || typeof pkg !== 'object') continue;
      const transport = (pkg as any)?.transport;
      if (!transport || typeof transport !== 'object') continue;
      if ((transport as any).type !== 'streamable-http') continue;
      const url = toHttpUrl((transport as any).url ?? (transport as any).endpoint ?? (pkg as any).url);
      if (url) urls.add(url);
    }
  }

  return Array.from(urls);
}

export function inferHasRemote(server: RegistryServer) {
  const remotes = (server as any)?.remotes;
  if (Array.isArray(remotes)) {
    for (const remote of remotes) {
      if (!remote || typeof remote !== 'object') continue;
      if (typeof (remote as any).url === 'string' && (remote as any).url) return true;
    }
  }
  return listStreamableHttpUrls(server).length > 0;
}

export function inferCitations(text: string) {
  return /\bcitation(s)?\b|\bprovenance\b|\bsources?\b/i.test(text);
}

export function buildSearchText(server: RegistryServer) {
  const parts: string[] = [];
  parts.push(server.name ?? '');
  parts.push(server.title ?? '');
  parts.push(server.description ?? '');
  const repoUrl = (server as any)?.repository?.url;
  if (typeof repoUrl === 'string') parts.push(repoUrl);
  const websiteUrl = (server as any)?.websiteUrl;
  if (typeof websiteUrl === 'string') parts.push(websiteUrl);

  const packages = (server as any)?.packages;
  if (Array.isArray(packages)) {
    for (const pkg of packages) {
      if (pkg && typeof pkg === 'object') {
        if (typeof (pkg as any).identifier === 'string') parts.push((pkg as any).identifier);
        if (typeof (pkg as any).registryType === 'string') parts.push((pkg as any).registryType);
        const transportType = (pkg as any)?.transport?.type;
        if (typeof transportType === 'string') parts.push(transportType);
      }
    }
  }

  const remotes = (server as any)?.remotes;
  if (Array.isArray(remotes)) {
    for (const remote of remotes) {
      if (remote && typeof remote === 'object') {
        if (typeof (remote as any).type === 'string') parts.push((remote as any).type);
        if (typeof (remote as any).url === 'string') parts.push((remote as any).url);
      }
    }
  }

  return parts.filter(Boolean).join('\n');
}

export function sha256(value: string) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

const RULES: Array<{
  category: string;
  score: number;
  pattern: RegExp;
  keyword: string;
  /** Only add if at least one "core" category already matched (reduces false positives) */
  requireCore?: boolean;
}> = [
  { category: 'rag', score: 30, keyword: 'rag', pattern: /\brag\b|retrieval[- ]augmented/i },
  { category: 'retrieval', score: 15, keyword: 'retrieval', pattern: /\bretriev(al|e)\b|semantic search/i },
  { category: 'embeddings', score: 20, keyword: 'embeddings', pattern: /\bembedding(s)?\b|vectorize|text-embedding/i },
  { category: 'vector-db', score: 20, keyword: 'vector db', pattern: /\bvector\s*(db|database)\b|vector store|pgvector/i },
  { category: 'qdrant', score: 15, keyword: 'qdrant', pattern: /\bqdrant\b/i },
  { category: 'pinecone', score: 15, keyword: 'pinecone', pattern: /\bpinecone\b/i },
  { category: 'weaviate', score: 15, keyword: 'weaviate', pattern: /\bweaviate\b/i },
  { category: 'milvus', score: 15, keyword: 'milvus', pattern: /\bmilvus\b/i },
  { category: 'chroma', score: 15, keyword: 'chroma', pattern: /\bchroma\b/i },
  { category: 'reranking', score: 12, keyword: 'rerank', pattern: /\brerank(er|ing)?\b/i },
  { category: 'documents', score: 10, keyword: 'documents', pattern: /\bpdf\b|docx|markdown|documents?\b/i },
  { category: 'ingestion', score: 10, keyword: 'ingestion', pattern: /\bingest(ion|ing)?\b|etl|connector/i },
  { category: 'search', score: 8, keyword: 'search', pattern: /\bsearch\b|query\b/i, requireCore: true }
];

const CORE_CATEGORIES = new Set(['rag', 'retrieval', 'embeddings', 'vector-db', 'qdrant', 'pinecone', 'weaviate', 'milvus', 'chroma', 'reranking', 'documents', 'ingestion']);

function hasRemoteEndpoint(server: RegistryServer): boolean {
  const remotes = (server as any)?.remotes;
  if (Array.isArray(remotes) && remotes.some((r: any) => r?.url)) return true;
  const packages = (server as any)?.packages;
  if (Array.isArray(packages)) {
    for (const p of packages) {
      if (p?.transport?.type === 'streamable-http' && p?.transport?.url) return true;
    }
  }
  return false;
}

export function enrichRag(server: RegistryServer): RagmapEnrichment {
  const text = buildSearchText(server);
  const categories: string[] = [];
  const reasons: string[] = [];
  const keywords: string[] = [];
  const hasRemote = inferHasRemote(server);
  const citations = inferCitations(text);

  let score = 0;
  for (const rule of RULES) {
    if (!rule.pattern.test(text)) continue;
    if (rule.requireCore) {
      const hasCore = categories.some((c) => CORE_CATEGORIES.has(c));
      if (!hasCore) continue;
    }
    categories.push(rule.category);
    keywords.push(rule.keyword);
    reasons.push(`matched:${rule.category}`);
    score += rule.score;
  }

  const capped = Math.max(0, Math.min(100, score));
  const hasRemote = hasRemoteEndpoint(server);
  const citationsMatch = /\bcitation(s)?\b|cite(s|d)?\s+(source|reference)|source\s+attribution|grounding\b|provenance\b/i.test(text);
  return {
    categories: uniq(categories),
    ragScore: capped,
    reasons: uniq(reasons).slice(0, 12),
    keywords: uniq(keywords).slice(0, 24),
    hasRemote,
    localOnly: !hasRemote,
    citations: citationsMatch,
    embeddingTextHash: sha256(text)
  };
}
