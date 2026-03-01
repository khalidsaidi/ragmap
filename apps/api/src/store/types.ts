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

export type UsageEvent = {
  createdAt: Date;
  method: string;
  route: string;
  status: number;
  durationMs: number;
  userAgent: string | null;
  ip: string | null;
  referer: string | null;
  agentName: string | null;
  trafficClass: 'product_api' | 'crawler_probe';
};

export type UsageSummary = {
  days: number;
  since: string;
  total: number;
  last24h: number;
  byRoute: Array<{ route: string; count: number }>;
  byStatus: Array<{ status: number; count: number }>;
  byIp: Array<{ ip: string; count: number }>;
  byReferer: Array<{ referer: string; count: number }>;
  byUserAgent: Array<{ userAgent: string; count: number }>;
  byAgentName: Array<{ agentName: string; count: number }>;
  byTrafficClass: Array<{ trafficClass: string; count: number }>;
  recentErrors: Array<{
    createdAt: string;
    status: number;
    route: string;
    ip: string | null;
    referer: string | null;
    userAgent: string | null;
    agentName: string | null;
    trafficClass: string;
  }>;
  daily: Array<{ day: string; count: number }>;
  truncated?: boolean;
};

export type AgentPayloadEventInput = {
  createdAt: Date;
  source: string;
  kind: string;
  method?: string | null;
  route?: string | null;
  status?: number | null;
  durationMs?: number | null;
  tool?: string | null;
  requestId?: string | null;
  agentName?: string | null;
  userAgent?: string | null;
  ip?: string | null;
  requestBody?: string | null;
  responseBody?: string | null;
};

export type AgentPayloadEvent = Omit<AgentPayloadEventInput, 'createdAt'> & {
  createdAt: string;
};

export interface RegistryStore {
  kind: 'firestore' | 'inmemory';
  healthCheck(): Promise<StoreHealth>;

  beginIngestRun(mode: IngestMode): Promise<{ runId: string; startedAt: Date }>;
  getLastSuccessfulIngestAt(): Promise<Date | null>;
  setLastSuccessfulIngestAt(at: Date): Promise<void>;
  getLastReachabilityRunAt?(): Promise<Date | null>;
  setLastReachabilityRunAt?(at: Date): Promise<void>;
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
  searchRagTop(params: { limit: number; filters?: RagFilters }): Promise<RagSearchResult>;
  getRagExplain(name: string): Promise<RagExplain | null>;

  setReachability?(
    serverName: string,
    ok: boolean,
    lastCheckedAt: Date,
    details?: {
      status?: number;
      method?: 'HEAD' | 'GET';
      remoteType?: 'streamable-http' | 'sse';
      url?: string;
    }
  ): Promise<void>;

  writeUsageEvent(event: UsageEvent): Promise<void>;
  getUsageSummary(days: number, includeNoise: boolean, includeCrawlerProbesInErrors?: boolean): Promise<UsageSummary>;

  writeAgentPayloadEvent(event: AgentPayloadEventInput): Promise<void>;
  listAgentPayloadEvents(params: { limit: number; source?: string; kind?: string }): Promise<AgentPayloadEvent[]>;
}
