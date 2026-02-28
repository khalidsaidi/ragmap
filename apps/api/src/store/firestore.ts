import { Firestore, Timestamp } from '@google-cloud/firestore';
import type { RagFilters, RagmapEnrichment, RegistryServer, RegistryServerEntry } from '@ragmap/shared';
import { META_RAGMAP_KEY } from '@ragmap/shared';
import { buildSearchText } from '../rag/enrich.js';
import { ragSearchKeyword, ragSearchSemantic, ragSearchTop, type RagSearchItem } from '../rag/search.js';
import type { Env } from '../env.js';
import { buildMeta } from './types.js';
import type {
  AgentPayloadEvent,
  AgentPayloadEventInput,
  IngestMode,
  ListServersParams,
  ListServersResult,
  RagExplain,
  RagSearchResult,
  RegistryStore,
  StoreHealth,
  UsageEvent,
  UsageSummary
} from './types.js';

type CacheEntry<T> = {
  value: T;
  expiresAtMs: number;
};

function encodeServerId(name: string) {
  return encodeURIComponent(name);
}

function parseIsoToDate(value: string | undefined | null) {
  if (!value) return null;
  const m = value.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})(\.(\d+))?Z$/);
  if (!m) return null;
  const base = m[1];
  const frac = m[3] ?? '';
  const ms = (frac + '000').slice(0, 3);
  return new Date(`${base}.${ms}Z`);
}

function mergeReachabilityIntoRagmap(
  ragmap: RagmapEnrichment | null,
  reachability: any
): RagmapEnrichment | null {
  if (!reachability || typeof reachability !== 'object') return ragmap;
  const base = ragmap ?? ({ categories: [], ragScore: 0, reasons: [], keywords: [] } as RagmapEnrichment);
  const checkedAt = typeof reachability.lastCheckedAt === 'string' ? reachability.lastCheckedAt : undefined;
  return {
    ...base,
    ...(typeof base.reachable === 'boolean' ? {} : { reachable: Boolean(reachability.ok) }),
    ...(base.lastReachableAt ? {} : checkedAt ? { lastReachableAt: checkedAt } : {}),
    ...(checkedAt ? { reachableCheckedAt: checkedAt } : {})
  } as RagmapEnrichment;
}

function normalizeLatestRagmap(data: any): RagmapEnrichment | null {
  const base = data?.latestRagmap && typeof data.latestRagmap === 'object'
    ? (data.latestRagmap as RagmapEnrichment)
    : null;
  const dottedReachable = data?.['latestRagmap.reachable'];
  const dottedCheckedAt = data?.['latestRagmap.reachableCheckedAt'];
  const dottedStatus = data?.['latestRagmap.reachableStatus'];
  const dottedMethod = data?.['latestRagmap.reachableMethod'];

  const hasDottedFallback =
    dottedReachable !== undefined ||
    dottedCheckedAt !== undefined ||
    dottedStatus !== undefined ||
    dottedMethod !== undefined;

  if (!hasDottedFallback) {
    return mergeReachabilityIntoRagmap(base, data?.reachability);
  }

  const merged = {
    ...(base ?? { categories: [], ragScore: 0, reasons: [], keywords: [] }),
    ...(typeof dottedReachable === 'boolean' ? { reachable: dottedReachable } : {}),
    ...(typeof dottedCheckedAt === 'string' ? { reachableCheckedAt: dottedCheckedAt, lastReachableAt: dottedCheckedAt } : {}),
    ...(typeof dottedStatus === 'number' ? { reachableStatus: dottedStatus } : {}),
    ...(dottedMethod === 'HEAD' || dottedMethod === 'GET' ? { reachableMethod: dottedMethod } : {})
  } as RagmapEnrichment;

  return mergeReachabilityIntoRagmap(merged, data?.reachability);
}

function buildEntry(doc: any): RegistryServerEntry {
  const ragmapWithReach = mergeReachabilityIntoRagmap(doc.ragmap ?? null, doc.reachability);
  return {
    server: doc.server as any,
    _meta: buildMeta({
      official: doc.official ?? null,
      publisherProvided: doc.publisherProvided ?? undefined,
      ragmap: ragmapWithReach
    })
  };
}

export class FirestoreStore implements RegistryStore {
  kind = 'firestore' as const;
  private firestore: Firestore;
  private categoriesCache: CacheEntry<string[]> | null = null;
  private searchItemsCache: CacheEntry<RagSearchItem[]> | null = null;

  constructor(private env: Env) {
    this.firestore = new Firestore(env.gcpProjectId ? { projectId: env.gcpProjectId } : undefined);
  }

  private clearCaches() {
    this.categoriesCache = null;
    this.searchItemsCache = null;
  }

  private cacheGet<T>(cache: CacheEntry<T> | null): T | null {
    if (!this.env.cacheTtlMs) return null;
    if (!cache) return null;
    if (Date.now() >= cache.expiresAtMs) return null;
    return cache.value;
  }

  private cacheSet<T>(value: T): CacheEntry<T> | null {
    if (!this.env.cacheTtlMs) return null;
    return { value, expiresAtMs: Date.now() + this.env.cacheTtlMs };
  }

  private serversCol() {
    return this.firestore.collection('servers');
  }

  private usageEventsCol() {
    return this.firestore.collection('usageEvents');
  }

  private agentPayloadEventsCol() {
    return this.firestore.collection('agentPayloadEvents');
  }

  private metaDoc() {
    return this.firestore.collection('meta').doc('ingest');
  }

  async healthCheck(): Promise<StoreHealth> {
    try {
      await this.metaDoc().get();
      return { ok: true };
    } catch (err) {
      return { ok: false, detail: err instanceof Error ? err.message : 'unknown' };
    }
  }

  async beginIngestRun(_mode: IngestMode) {
    // Avoid serving stale results during/after an ingestion run.
    this.clearCaches();
    const runId = `run_${Math.random().toString(16).slice(2)}_${Date.now()}`;
    return { runId, startedAt: new Date() };
  }

  async getLastSuccessfulIngestAt() {
    const snap = await this.metaDoc().get();
    const data = snap.data() as any;
    const ts = data?.lastSuccessfulIngestAt;
    if (!ts) return null;
    if (ts instanceof Timestamp) return ts.toDate();
    if (typeof ts === 'string') return parseIsoToDate(ts);
    return null;
  }

  async setLastSuccessfulIngestAt(at: Date) {
    await this.metaDoc().set({ lastSuccessfulIngestAt: Timestamp.fromDate(at) }, { merge: true });
  }

  async getLastReachabilityRunAt() {
    const snap = await this.metaDoc().get();
    const data = snap.data() as any;
    const ts = data?.lastReachabilityRunAt;
    if (!ts) return null;
    if (ts instanceof Timestamp) return ts.toDate();
    if (typeof ts === 'string') return parseIsoToDate(ts);
    return null;
  }

  async setLastReachabilityRunAt(at: Date) {
    await this.metaDoc().set({ lastReachabilityRunAt: Timestamp.fromDate(at) }, { merge: true });
  }

  async markServerSeen(runId: string, name: string, at: Date) {
    const id = encodeServerId(name);
    await this.serversCol().doc(id).set(
      {
        name,
        lastSeenRunId: runId,
        lastSeenAt: Timestamp.fromDate(at),
        hidden: false
      },
      { merge: true }
    );
  }

  async upsertServerVersion(input: {
    runId: string;
    at: Date;
    server: any;
    official: any;
    publisherProvided?: unknown;
    ragmap: RagmapEnrichment | null;
    hidden: boolean;
  }) {
    const server = input.server as RegistryServer;
    const name = server.name;
    const version = server.version;
    const serverId = encodeServerId(name);

    const officialUpdatedAt = parseIsoToDate(input.official?.updatedAt) ?? input.at;
    const officialPublishedAt = parseIsoToDate(input.official?.publishedAt) ?? input.at;

    const versionDoc = this.serversCol().doc(serverId).collection('versions').doc(version);
    await versionDoc.set(
      {
        server,
        official: input.official,
        publisherProvided: input.publisherProvided ?? null,
        ragmap: input.ragmap ?? null,
        hidden: input.hidden,
        lastSeenRunId: input.runId,
        lastSeenAt: Timestamp.fromDate(input.at),
        officialUpdatedAt: Timestamp.fromDate(officialUpdatedAt),
        officialPublishedAt: Timestamp.fromDate(officialPublishedAt),
        isLatest: Boolean(input.official?.isLatest)
      },
      { merge: true }
    );

    // Maintain server snapshot for fast listing.
    const isLatest = Boolean(input.official?.isLatest);
    if (isLatest) {
      await this.serversCol().doc(serverId).set(
        {
          name,
          latestVersion: version,
          latestServer: server,
          latestOfficial: input.official,
          latestPublisherProvided: input.publisherProvided ?? null,
          latestRagmap: input.ragmap ?? null,
          latestOfficialUpdatedAt: Timestamp.fromDate(officialUpdatedAt),
          hidden: input.hidden,
          lastSeenRunId: input.runId,
          lastSeenAt: Timestamp.fromDate(input.at)
        },
        { merge: true }
      );
    }
  }

  async hideServersNotSeen(runId: string) {
    this.clearCaches();
    const col = this.serversCol();
    const writer = this.firestore.bulkWriter();
    let hidden = 0;

    let last: FirebaseFirestore.QueryDocumentSnapshot | null = null;
    for (;;) {
      let q = col.orderBy('name').limit(500);
      if (last) q = q.startAfter(last);
      const snap = await q.get();
      if (snap.empty) break;

      for (const doc of snap.docs) {
        last = doc;
        const data = doc.data() as any;
        if (!data) continue;
        if (data.lastSeenRunId !== runId && data.hidden !== true) {
          hidden += 1;
          writer.set(doc.ref, { hidden: true }, { merge: true });
        }
      }
    }

    await writer.close();
    return hidden;
  }

  async listLatestServers(params: ListServersParams): Promise<ListServersResult> {
    const limit = Math.max(1, Math.min(200, params.limit));
    const updatedSinceMs = params.updatedSince ? params.updatedSince.getTime() : null;

    const cursorName = params.cursor ? params.cursor.split(':')[0] : null;
    const results: RegistryServerEntry[] = [];
    let nextCursor: string | undefined;

    let last: FirebaseFirestore.QueryDocumentSnapshot | null = null;
    for (;;) {
      let q = this.serversCol().where('hidden', '==', false).orderBy('name').limit(200);
      if (cursorName && !last) {
        q = q.startAfter(cursorName);
      } else if (last) {
        q = q.startAfter(last);
      }

      const snap = await q.get();
      if (snap.empty) break;

      for (const doc of snap.docs) {
        last = doc;
        const data = doc.data() as any;
        if (!data) continue;
        const latestVersion = data.latestVersion as string | undefined;
        const latestServer = data.latestServer;
        if (!latestVersion || !latestServer) continue;
        if (updatedSinceMs != null) {
          const ts = data.latestOfficialUpdatedAt as Timestamp | undefined;
          const dt = ts instanceof Timestamp ? ts.toDate() : null;
          if (!dt || dt.getTime() <= updatedSinceMs) continue;
        }

        const entry = buildEntry({
          server: latestServer,
          official: data.latestOfficial ?? null,
          publisherProvided: data.latestPublisherProvided ?? null,
          ragmap: normalizeLatestRagmap(data),
          reachability: data.reachability
        });
        results.push(entry);

        if (results.length >= limit) {
          nextCursor = `${data.name}:${latestVersion}`;
          return { servers: results, nextCursor };
        }
      }
    }

    return { servers: results };
  }

  async listServerVersions(name: string): Promise<RegistryServerEntry[]> {
    const serverId = encodeServerId(name);
    const serverRef = this.serversCol().doc(serverId);
    const srvSnap = await serverRef.get();
    if (!srvSnap.exists) return [];
    const srvData = srvSnap.data() as any;
    if (srvData?.hidden === true) return [];

    const col = serverRef.collection('versions');
    const snap = await col.get();
    const rows = snap.docs
      .map((doc) => doc.data() as any)
      .filter((row) => row && row.hidden !== true)
      .sort((a, b) => {
        const aLatest = Boolean(a.official?.isLatest);
        const bLatest = Boolean(b.official?.isLatest);
        if (aLatest !== bLatest) return aLatest ? -1 : 1;
        const aAt = parseIsoToDate(a.official?.publishedAt)?.getTime() ?? 0;
        const bAt = parseIsoToDate(b.official?.publishedAt)?.getTime() ?? 0;
        return bAt - aAt;
      });
    return rows.map(buildEntry);
  }

  async getServerVersion(name: string, version: string | 'latest'): Promise<RegistryServerEntry | null> {
    const serverId = encodeServerId(name);
    const serverRef = this.serversCol().doc(serverId);
    if (version === 'latest') {
      const srvSnap = await serverRef.get();
      if (!srvSnap.exists) return null;
      const data = srvSnap.data() as any;
      if (!data || data.hidden === true || !data.latestServer) return null;
      return buildEntry({
        server: data.latestServer,
        official: data.latestOfficial ?? null,
        publisherProvided: data.latestPublisherProvided ?? null,
        ragmap: normalizeLatestRagmap(data),
        reachability: data.reachability
      });
    }

    const srvSnap = await serverRef.get();
    if (!srvSnap.exists) return null;
    const srvData = srvSnap.data() as any;
    if (srvData?.hidden === true) return null;

    const verSnap = await serverRef.collection('versions').doc(version).get();
    if (!verSnap.exists) return null;
    const row = verSnap.data() as any;
    if (!row || row.hidden === true) return null;
    return buildEntry(row);
  }

  async listCategories(): Promise<string[]> {
    const cached = this.cacheGet(this.categoriesCache);
    if (cached) return cached;

    const categories = new Set<string>();
    const col = this.serversCol();
    let last: FirebaseFirestore.QueryDocumentSnapshot | null = null;
    for (;;) {
      let q = col.where('hidden', '==', false).orderBy('name').select('name', 'latestRagmap').limit(500);
      if (last) q = q.startAfter(last);
      const snap = await q.get();
      if (snap.empty) break;
      for (const doc of snap.docs) {
        last = doc;
        const data = doc.data() as any;
        const cats: unknown = data?.latestRagmap?.categories;
        if (Array.isArray(cats)) {
          for (const c of cats) {
            if (typeof c === 'string' && c) categories.add(c);
          }
        }
      }
    }
    const out = Array.from(categories).sort();
    this.categoriesCache = this.cacheSet(out);
    return out;
  }

  private async loadSearchItems(filters?: RagFilters): Promise<RagSearchItem[]> {
    const cached = this.cacheGet(this.searchItemsCache);
    if (cached) return cached;

    const items: RagSearchItem[] = [];
    const col = this.serversCol();
    let last: FirebaseFirestore.QueryDocumentSnapshot | null = null;
    for (;;) {
      let q = col
        .where('hidden', '==', false)
        .orderBy('name')
        .select('name', 'latestServer', 'latestOfficial', 'latestPublisherProvided', 'latestRagmap', 'reachability')
        .limit(500);
      if (last) q = q.startAfter(last);
      const snap = await q.get();
      if (snap.empty) break;
      for (const doc of snap.docs) {
        last = doc;
        const data = doc.data() as any;
        if (!data?.latestServer) continue;
        const entry = buildEntry({
          server: data.latestServer,
          official: data.latestOfficial ?? null,
          publisherProvided: data.latestPublisherProvided ?? null,
          ragmap: normalizeLatestRagmap(data),
          reachability: data.reachability
        });
        items.push({
          entry,
          enrichment: normalizeLatestRagmap(data),
          searchText: buildSearchText(data.latestServer)
        });
      }
    }
    void filters;
    this.searchItemsCache = this.cacheSet(items);
    return items;
  }

  async searchRag(params: { query: string; limit: number; filters?: RagFilters; queryEmbedding?: number[] | null }): Promise<RagSearchResult> {
    const items = await this.loadSearchItems(params.filters);
    const keyword = ragSearchKeyword(items, params.query, params.limit, params.filters);
    const semantic =
      params.queryEmbedding && params.queryEmbedding.length
        ? ragSearchSemantic(items, params.queryEmbedding, params.limit, params.filters)
        : [];

    const merged: RagSearchResult = [];
    const seen = new Set<string>();
    for (const hit of semantic) {
      const name = hit.entry.server.name;
      seen.add(name);
      merged.push(hit);
    }
    for (const hit of keyword) {
      const name = hit.entry.server.name;
      if (seen.has(name)) continue;
      merged.push(hit);
      if (merged.length >= params.limit) break;
    }
    return merged.slice(0, params.limit);
  }

  async searchRagTop(params: { limit: number; filters?: RagFilters }): Promise<RagSearchResult> {
    const items = await this.loadSearchItems(params.filters);
    return ragSearchTop(items, params.limit, params.filters);
  }

  async getRagExplain(name: string): Promise<RagExplain | null> {
    const entry = await this.getServerVersion(name, 'latest');
    if (!entry) return null;
    const ragmap = (entry._meta?.[META_RAGMAP_KEY] as any) ?? null;
    if (!ragmap) return null;
    return {
      name,
      version: entry.server.version,
      ragScore: Number(ragmap.ragScore ?? 0),
      categories: Array.isArray(ragmap.categories) ? ragmap.categories : [],
      reasons: Array.isArray(ragmap.reasons) ? ragmap.reasons : []
    };
  }

  async setReachability(
    serverName: string,
    ok: boolean,
    lastCheckedAt: Date,
    details?: { status?: number; method?: 'HEAD' | 'GET' }
  ): Promise<void> {
    const serverId = encodeServerId(serverName);
    const checkedAtIso = lastCheckedAt.toISOString();
    await this.serversCol().doc(serverId).set(
      {
        reachability: {
          ok,
          lastCheckedAt: checkedAtIso
        },
        latestRagmap: {
          reachable: ok,
          lastReachableAt: checkedAtIso,
          reachableCheckedAt: checkedAtIso,
          reachableStatus: details?.status ?? null,
          reachableMethod: details?.method ?? null
        }
      },
      { merge: true }
    );
    this.clearCaches();
  }

  async writeUsageEvent(event: UsageEvent): Promise<void> {
    await this.usageEventsCol().add({
      createdAt: Timestamp.fromDate(event.createdAt),
      method: event.method,
      route: event.route,
      status: event.status,
      durationMs: event.durationMs,
      userAgent: event.userAgent ?? null,
      ip: event.ip ?? null,
      referer: event.referer ?? null,
      agentName: event.agentName ?? null,
      trafficClass: event.trafficClass ?? 'product_api'
    });
  }

  async getUsageSummary(
    days: number,
    includeNoise: boolean,
    includeCrawlerProbesInErrors = false
  ): Promise<UsageSummary> {
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);

    function isNoiseEvent(entry: { method: string; route: string; status: number }) {
      const method = entry.method.toUpperCase();
      if (method !== 'GET' && method !== 'HEAD') return false;

      if (entry.status === 404) {
        if (entry.route === '/') return true;
      }

      if (entry.status === 401 || entry.status === 403) {
        if (entry.route === '/admin/usage') return true;
        if (entry.route === '/admin/usage/data') return true;
        if (entry.route === '/admin/agent-events') return true;
        if (entry.route === '/admin/agent-events/data') return true;
      }

      return false;
    }

    const byRoute = new Map<string, number>();
    const byStatus = new Map<number, number>();
    const byIp = new Map<string, number>();
    const byReferer = new Map<string, number>();
    const byUserAgent = new Map<string, number>();
    const byAgentName = new Map<string, number>();
    const byTrafficClass = new Map<string, number>();
    const daily = new Map<string, number>();
    const recentErrors: UsageSummary['recentErrors'] = [];

    let total = 0;
    let lastDay = 0;
    let truncated = false;
    const maxDocs = 50_000;

    const col = this.usageEventsCol();
    let last: FirebaseFirestore.QueryDocumentSnapshot | null = null;
    for (;;) {
      let q = col
        .where('createdAt', '>=', Timestamp.fromDate(since))
        .orderBy('createdAt', 'desc')
        .limit(500);
      if (last) q = q.startAfter(last);
      const snap = await q.get();
      if (snap.empty) break;

      for (const doc of snap.docs) {
        last = doc;
        const data = doc.data() as any;
        const createdAt = data?.createdAt instanceof Timestamp ? data.createdAt.toDate() : null;
        if (!createdAt) continue;
        const method = typeof data?.method === 'string' ? data.method : 'GET';
        const route = typeof data?.route === 'string' ? data.route : '';
        const status = Number(data?.status ?? 0) || 0;
        const ip = typeof data?.ip === 'string' && data.ip ? data.ip : null;
        const referer = typeof data?.referer === 'string' && data.referer ? data.referer : null;
        const userAgent = typeof data?.userAgent === 'string' && data.userAgent ? data.userAgent : null;
        const agentName = typeof data?.agentName === 'string' && data.agentName ? data.agentName : null;
        const trafficClass =
          typeof data?.trafficClass === 'string' && data.trafficClass ? data.trafficClass : 'product_api';

        if (!route) continue;
        if (!includeNoise && isNoiseEvent({ method, route, status })) continue;

        total += 1;
        if (createdAt.getTime() >= last24h.getTime()) lastDay += 1;

        byRoute.set(route, (byRoute.get(route) ?? 0) + 1);
        byStatus.set(status, (byStatus.get(status) ?? 0) + 1);
        if (ip) byIp.set(ip, (byIp.get(ip) ?? 0) + 1);
        if (referer) byReferer.set(referer, (byReferer.get(referer) ?? 0) + 1);
        if (userAgent) byUserAgent.set(userAgent, (byUserAgent.get(userAgent) ?? 0) + 1);
        if (agentName) byAgentName.set(agentName, (byAgentName.get(agentName) ?? 0) + 1);
        byTrafficClass.set(trafficClass, (byTrafficClass.get(trafficClass) ?? 0) + 1);

        const day = createdAt.toISOString().slice(0, 10);
        daily.set(day, (daily.get(day) ?? 0) + 1);

        if (status >= 400 && (includeCrawlerProbesInErrors || trafficClass !== 'crawler_probe') && recentErrors.length < 50) {
          recentErrors.push({
            createdAt: createdAt.toISOString(),
            status,
            route,
            ip,
            referer,
            userAgent,
            agentName,
            trafficClass
          });
        }

        if (total >= maxDocs) {
          truncated = true;
          break;
        }
      }

      if (truncated) break;
    }

    function topK<K>(map: Map<K, number>, limit: number) {
      const rows = Array.from(map.entries()).map(([key, count]) => ({ key, count }));
      rows.sort((a, b) => b.count - a.count);
      return rows.slice(0, limit);
    }

    const dailyRows = Array.from(daily.entries())
      .map(([day, count]) => ({ day, count }))
      .sort((a, b) => a.day.localeCompare(b.day));

    return {
      days,
      since: since.toISOString(),
      total,
      last24h: lastDay,
      byRoute: topK(byRoute, 10).map((row) => ({ route: String(row.key), count: row.count })),
      byStatus: topK(byStatus, 100).map((row) => ({ status: Number(row.key), count: row.count })),
      byIp: topK(byIp, 10).map((row) => ({ ip: String(row.key), count: row.count })),
      byReferer: topK(byReferer, 10).map((row) => ({ referer: String(row.key), count: row.count })),
      byUserAgent: topK(byUserAgent, 10).map((row) => ({ userAgent: String(row.key), count: row.count })),
      byAgentName: topK(byAgentName, 10).map((row) => ({ agentName: String(row.key), count: row.count })),
      byTrafficClass: topK(byTrafficClass, 10).map((row) => ({ trafficClass: String(row.key), count: row.count })),
      recentErrors,
      daily: dailyRows,
      ...(truncated ? { truncated: true } : {})
    };
  }

  private async pruneAgentPayloadEvents() {
    const col = this.agentPayloadEventsCol();

    const ttlMs = this.env.agentPayloadTtlHours * 60 * 60 * 1000;
    if (ttlMs > 0) {
      const cutoff = Timestamp.fromDate(new Date(Date.now() - ttlMs));
      const writer = this.firestore.bulkWriter();
      let last: FirebaseFirestore.QueryDocumentSnapshot | null = null;
      for (;;) {
        let q = col.where('createdAt', '<', cutoff).orderBy('createdAt').limit(500);
        if (last) q = q.startAfter(last);
        const snap = await q.get();
        if (snap.empty) break;
        for (const doc of snap.docs) {
          last = doc;
          writer.delete(doc.ref);
        }
      }
      await writer.close();
    }

    const maxEvents = this.env.agentPayloadMaxEvents;
    if (maxEvents > 0) {
      const keep = await col.orderBy('createdAt', 'desc').limit(maxEvents).get();
      if (keep.empty) return;
      const lastKept = keep.docs[keep.docs.length - 1];

      const writer = this.firestore.bulkWriter();
      let last = lastKept;
      for (;;) {
        const snap = await col.orderBy('createdAt', 'desc').startAfter(last).limit(500).get();
        if (snap.empty) break;
        for (const doc of snap.docs) {
          last = doc;
          writer.delete(doc.ref);
        }
      }
      await writer.close();
    }
  }

  async writeAgentPayloadEvent(event: AgentPayloadEventInput): Promise<void> {
    if (!this.env.captureAgentPayloads) return;
    await this.agentPayloadEventsCol().add({
      createdAt: Timestamp.fromDate(event.createdAt),
      source: event.source,
      kind: event.kind,
      method: event.method ?? null,
      route: event.route ?? null,
      status: event.status ?? null,
      durationMs: event.durationMs ?? null,
      tool: event.tool ?? null,
      requestId: event.requestId ?? null,
      agentName: event.agentName ?? null,
      userAgent: event.userAgent ?? null,
      ip: event.ip ?? null,
      requestBody: event.requestBody ?? null,
      responseBody: event.responseBody ?? null
    });
    void this.pruneAgentPayloadEvents().catch(() => undefined);
  }

  async listAgentPayloadEvents(params: { limit: number; source?: string; kind?: string }): Promise<AgentPayloadEvent[]> {
    const want = Math.min(500, Math.max(1, params.limit));
    const out: AgentPayloadEvent[] = [];
    const col = this.agentPayloadEventsCol();

    let last: FirebaseFirestore.QueryDocumentSnapshot | null = null;
    for (;;) {
      let q = col.orderBy('createdAt', 'desc').limit(200);
      if (last) q = q.startAfter(last);
      const snap = await q.get();
      if (snap.empty) break;

      for (const doc of snap.docs) {
        last = doc;
        const data = doc.data() as any;
        const createdAt = data?.createdAt instanceof Timestamp ? data.createdAt.toDate() : null;
        if (!createdAt) continue;
        const source = typeof data?.source === 'string' ? data.source : '';
        const kind = typeof data?.kind === 'string' ? data.kind : '';
        if (!source || !kind) continue;

        if (params.source && source !== params.source) continue;
        if (params.kind && kind !== params.kind) continue;

        out.push({
          createdAt: createdAt.toISOString(),
          source,
          kind,
          method: typeof data?.method === 'string' ? data.method : null,
          route: typeof data?.route === 'string' ? data.route : null,
          status: typeof data?.status === 'number' ? data.status : data?.status != null ? Number(data.status) : null,
          durationMs: typeof data?.durationMs === 'number' ? data.durationMs : data?.durationMs != null ? Number(data.durationMs) : null,
          tool: typeof data?.tool === 'string' ? data.tool : null,
          requestId: typeof data?.requestId === 'string' ? data.requestId : null,
          agentName: typeof data?.agentName === 'string' ? data.agentName : null,
          userAgent: typeof data?.userAgent === 'string' ? data.userAgent : null,
          ip: typeof data?.ip === 'string' ? data.ip : null,
          requestBody: typeof data?.requestBody === 'string' ? data.requestBody : null,
          responseBody: typeof data?.responseBody === 'string' ? data.responseBody : null
        });
        if (out.length >= want) return out;
      }

      // Avoid scanning unbounded history if filters are too selective.
      if (out.length >= want) break;
      if (!last) break;
      if (out.length === 0 && !params.source && !params.kind) break;
    }

    return out;
  }
}
