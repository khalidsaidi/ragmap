import type { OfficialMeta, RagFilters, RagmapEnrichment, RegistryServerEntry } from '@ragmap/shared';
import { META_OFFICIAL_KEY, META_PUBLISHER_KEY, META_RAGMAP_KEY } from '@ragmap/shared';

export type IngestMode = 'full' | 'incremental';

export function buildMeta(params: {
  official: OfficialMeta | null;
  publisherProvided?: unknown;
  ragmap?: RagmapEnrichment | null;
}): Record<string, unknown> {
  const meta: Record<string, unknown> = {};
  if (params.official) meta[META_OFFICIAL_KEY] = params.official;
  if (params.publisherProvided) meta[META_PUBLISHER_KEY] = params.publisherProvided;
  if (params.ragmap) {
    const { embedding, ...rest } = params.ragmap;
    meta[META_RAGMAP_KEY] = embedding ? { ...rest, embedding: { ...embedding, vector: undefined } } : rest;
  }
  return meta;
}

export type StoreHealth = { ok: boolean; detail?: string };

export type ListServersParams = {
  cursor?: string;
  limit: number;
  updatedSince?: Date | null;
};

export type ListServersResult = {
  servers: RegistryServerEntry[];
  nextCursor?: string;
};

export type RagSearchParams = {
  query: string;
  limit: number;
  filters?: RagFilters;
  queryEmbedding?: number[] | null;
};

export type RagSearchResult = Array<{
  entry: RegistryServerEntry;
  kind: 'keyword' | 'semantic';
  score: number;
}>;

export type RagExplain = {
  name: string;
  version: string;
  ragScore: number;
  categories: string[];
  reasons: string[];
};

export interface RegistryStore {
  kind: 'firestore' | 'inmemory';
  healthCheck(): Promise<StoreHealth>;

  beginIngestRun(mode: IngestMode): Promise<{ runId: string; startedAt: Date }>;
  getLastSuccessfulIngestAt(): Promise<Date | null>;
  setLastSuccessfulIngestAt(at: Date): Promise<void>;
  markServerSeen(runId: string, name: string, at: Date): Promise<void>;
  upsertServerVersion(input: {
    runId: string;
    at: Date;
    server: any;
    official: OfficialMeta | null;
    publisherProvided?: unknown;
    ragmap: RagmapEnrichment | null;
    hidden: boolean;
  }): Promise<void>;
  hideServersNotSeen(runId: string): Promise<number>;

  listLatestServers(params: ListServersParams): Promise<ListServersResult>;
  listServerVersions(name: string): Promise<RegistryServerEntry[]>;
  getServerVersion(name: string, version: string | 'latest'): Promise<RegistryServerEntry | null>;

  listCategories(): Promise<string[]>;
  searchRag(params: RagSearchParams): Promise<RagSearchResult>;
  getRagExplain(name: string): Promise<RagExplain | null>;
}
