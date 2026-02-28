import { buildSearchText } from '../rag/enrich.js';
import type { RagFilters, RagmapEnrichment, RegistryServerEntry, RegistryServer } from '@ragmap/shared';
import { ragSearchKeyword, ragSearchSemantic, type RagSearchItem } from '../rag/search.js';
import { buildMeta, type AgentPayloadEvent, type AgentPayloadEventInput, type IngestMode, type RegistryStore, type UsageEvent, type UsageSummary } from './types.js';

type VersionRow = {
  server: RegistryServer;
  official: any;
  publisherProvided?: unknown;
  ragmap: RagmapEnrichment | null;
  hidden: boolean;
  lastSeenRunId: string;
  lastSeenAt: Date;
};

type ServerRow = {
  name: string;
  latestVersion: string;
  hidden: boolean;
  lastSeenRunId: string;
  lastSeenAt: Date;
  versions: Map<string, VersionRow>;
};

function parseCursor(cursor: string | undefined) {
  if (!cursor) return null;
  const idx = cursor.lastIndexOf(':');
  if (idx <= 0) return null;
  return { name: cursor.slice(0, idx), version: cursor.slice(idx + 1) };
}

function sortByName(a: ServerRow, b: ServerRow) {
  return a.name.localeCompare(b.name);
}

function sortByPublishedDesc(a: VersionRow, b: VersionRow) {
  const aAt = Date.parse(a.official?.publishedAt ?? '') || 0;
  const bAt = Date.parse(b.official?.publishedAt ?? '') || 0;
  return bAt - aAt;
}

function buildEntry(row: VersionRow): RegistryServerEntry {
  return {
    server: row.server as any,
    _meta: buildMeta({
      official: row.official ?? null,
      publisherProvided: row.publisherProvided,
      ragmap: row.ragmap ?? null
    })
  };
}

export class InMemoryStore implements RegistryStore {
  kind = 'inmemory' as const;
  private servers = new Map<string, ServerRow>();
  private lastIngestAt: Date | null = null;
  private usageEvents: UsageEvent[] = [];
  private agentPayloadEvents: AgentPayloadEventInput[] = [];

  async healthCheck() {
    return { ok: true };
  }

  async beginIngestRun(_mode: IngestMode) {
    const runId = `run_${Math.random().toString(16).slice(2)}_${Date.now()}`;
    return { runId, startedAt: new Date() };
  }

  async getLastSuccessfulIngestAt() {
    return this.lastIngestAt;
  }

  async setLastSuccessfulIngestAt(at: Date) {
    this.lastIngestAt = at;
  }

  async markServerSeen(runId: string, name: string, at: Date) {
    const existing = this.servers.get(name);
    if (existing) {
      existing.lastSeenRunId = runId;
      existing.lastSeenAt = at;
    } else {
      this.servers.set(name, {
        name,
        latestVersion: '',
        hidden: false,
        lastSeenRunId: runId,
        lastSeenAt: at,
        versions: new Map()
      });
    }
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

    const row: VersionRow = {
      server,
      official: input.official,
      publisherProvided: input.publisherProvided,
      ragmap: input.ragmap,
      hidden: input.hidden,
      lastSeenRunId: input.runId,
      lastSeenAt: input.at
    };

    const srv = this.servers.get(name) ?? {
      name,
      latestVersion: '',
      hidden: false,
      lastSeenRunId: input.runId,
      lastSeenAt: input.at,
      versions: new Map<string, VersionRow>()
    };
    srv.versions.set(version, row);
    srv.hidden = input.hidden;
    srv.lastSeenRunId = input.runId;
    srv.lastSeenAt = input.at;
    const isLatest = Boolean(input.official?.isLatest);
    if (isLatest || !srv.latestVersion) srv.latestVersion = version;
    this.servers.set(name, srv);
  }

  async hideServersNotSeen(runId: string) {
    let hidden = 0;
    for (const srv of this.servers.values()) {
      if (srv.lastSeenRunId !== runId && !srv.hidden) {
        srv.hidden = true;
        hidden += 1;
      }
    }
    return hidden;
  }

  async listLatestServers(params: { cursor?: string; limit: number; updatedSince?: Date | null }) {
    const cursor = parseCursor(params.cursor);
    const updatedSinceMs = params.updatedSince ? params.updatedSince.getTime() : null;

    const all = Array.from(this.servers.values())
      .filter((srv) => !srv.hidden)
      .sort(sortByName);

    const startIdx = cursor ? all.findIndex((srv) => srv.name === cursor.name) + 1 : 0;
    const servers: RegistryServerEntry[] = [];
    let nextCursor: string | undefined;

    for (let i = startIdx; i < all.length; i++) {
      const srv = all[i];
      const latest = srv.versions.get(srv.latestVersion);
      if (!latest || latest.hidden) continue;
      if (updatedSinceMs != null) {
        const updatedAt = Date.parse(latest.official?.updatedAt ?? '') || 0;
        if (updatedAt <= updatedSinceMs) continue;
      }
      servers.push(buildEntry(latest));
      if (servers.length >= params.limit) {
        nextCursor = `${srv.name}:${srv.latestVersion}`;
        break;
      }
    }

    return { servers, nextCursor };
  }

  async listServerVersions(name: string) {
    const srv = this.servers.get(name);
    if (!srv || srv.hidden) return [];
    const rows = Array.from(srv.versions.values())
      .filter((row) => !row.hidden)
      .sort(sortByPublishedDesc);
    return rows.map(buildEntry);
  }

  async getServerVersion(name: string, version: string | 'latest') {
    const srv = this.servers.get(name);
    if (!srv || srv.hidden) return null;
    const v = version === 'latest' ? srv.latestVersion : version;
    const row = srv.versions.get(v);
    if (!row || row.hidden) return null;
    return buildEntry(row);
  }

  async listCategories() {
    const categories = new Set<string>();
    for (const srv of this.servers.values()) {
      if (srv.hidden) continue;
      const latest = srv.versions.get(srv.latestVersion);
      if (!latest || latest.hidden) continue;
      for (const cat of latest.ragmap?.categories ?? []) categories.add(cat);
    }
    return Array.from(categories).sort();
  }

  private buildSearchItems(filters?: RagFilters): RagSearchItem[] {
    const items: RagSearchItem[] = [];
    for (const srv of this.servers.values()) {
      if (srv.hidden) continue;
      const latest = srv.versions.get(srv.latestVersion);
      if (!latest || latest.hidden) continue;
      const meta = buildMeta({ official: latest.official, publisherProvided: latest.publisherProvided, ragmap: latest.ragmap });
      items.push({
        entry: { server: latest.server as any, _meta: meta },
        enrichment: latest.ragmap ?? null,
        searchText: buildSearchText(latest.server)
      });
    }
    // Filter is applied downstream by ragSearch* helpers.
    void filters;
    return items;
  }

  async searchRag(params: { query: string; limit: number; filters?: RagFilters; queryEmbedding?: number[] | null }) {
    const items = this.buildSearchItems(params.filters);
    const keyword = ragSearchKeyword(items, params.query, params.limit, params.filters);
    const semantic =
      params.queryEmbedding && params.queryEmbedding.length
        ? ragSearchSemantic(items, params.queryEmbedding, params.limit, params.filters)
        : [];

    const merged: Array<{ entry: RegistryServerEntry; kind: 'keyword' | 'semantic'; score: number }> = [];
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

  async getRagExplain(name: string) {
    const srv = this.servers.get(name);
    if (!srv) return null;
    const latest = srv.versions.get(srv.latestVersion);
    if (!latest || latest.hidden || !latest.ragmap) return null;
    return {
      name,
      version: latest.server.version,
      ragScore: latest.ragmap.ragScore,
      categories: latest.ragmap.categories,
      reasons: latest.ragmap.reasons
    };
  }

  async setReachability(
    serverName: string,
    ok: boolean,
    lastCheckedAt: Date,
    details?: { status?: number; method?: 'HEAD' | 'GET' }
  ) {
    const srv = this.servers.get(serverName);
    if (!srv || srv.hidden) return;
    const latest = srv.versions.get(srv.latestVersion);
    if (!latest || latest.hidden) return;
    const base = latest.ragmap ?? { categories: [], ragScore: 0, reasons: [], keywords: [] };
    latest.ragmap = {
      ...base,
      reachable: ok,
      lastReachableAt: lastCheckedAt.toISOString(),
      reachableCheckedAt: lastCheckedAt.toISOString(),
      ...(details?.status != null ? { reachableStatus: details.status } : {}),
      ...(details?.method ? { reachableMethod: details.method } : {})
    } as RagmapEnrichment;
  }

  async writeUsageEvent(event: UsageEvent) {
    this.usageEvents.push(event);
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

    for (const ev of this.usageEvents) {
      if (ev.createdAt.getTime() < since.getTime()) continue;
      if (!includeNoise && isNoiseEvent(ev)) continue;

      total += 1;
      if (ev.createdAt.getTime() >= last24h.getTime()) lastDay += 1;

      byRoute.set(ev.route, (byRoute.get(ev.route) ?? 0) + 1);
      byStatus.set(ev.status, (byStatus.get(ev.status) ?? 0) + 1);
      if (ev.ip) byIp.set(ev.ip, (byIp.get(ev.ip) ?? 0) + 1);
      if (ev.referer) byReferer.set(ev.referer, (byReferer.get(ev.referer) ?? 0) + 1);
      if (ev.userAgent) byUserAgent.set(ev.userAgent, (byUserAgent.get(ev.userAgent) ?? 0) + 1);
      if (ev.agentName) byAgentName.set(ev.agentName, (byAgentName.get(ev.agentName) ?? 0) + 1);
      byTrafficClass.set(ev.trafficClass, (byTrafficClass.get(ev.trafficClass) ?? 0) + 1);

      const day = ev.createdAt.toISOString().slice(0, 10);
      daily.set(day, (daily.get(day) ?? 0) + 1);

      if (ev.status >= 400 && (includeCrawlerProbesInErrors || ev.trafficClass !== 'crawler_probe')) {
        recentErrors.push({
          createdAt: ev.createdAt.toISOString(),
          status: ev.status,
          route: ev.route,
          ip: ev.ip ?? null,
          referer: ev.referer ?? null,
          userAgent: ev.userAgent ?? null,
          agentName: ev.agentName ?? null,
          trafficClass: ev.trafficClass
        });
      }
    }

    recentErrors.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

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
      recentErrors: recentErrors.slice(0, 50),
      daily: dailyRows
    };
  }

  async writeAgentPayloadEvent(event: AgentPayloadEventInput) {
    this.agentPayloadEvents.push(event);
  }

  async listAgentPayloadEvents(params: { limit: number; source?: string; kind?: string }): Promise<AgentPayloadEvent[]> {
    const limit = Math.min(500, Math.max(1, params.limit));
    let rows = this.agentPayloadEvents.slice();
    if (params.source) rows = rows.filter((row) => row.source === params.source);
    if (params.kind) rows = rows.filter((row) => row.kind === params.kind);
    rows.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return rows.slice(0, limit).map((row) => ({
      createdAt: row.createdAt.toISOString(),
      source: row.source,
      kind: row.kind,
      method: row.method ?? null,
      route: row.route ?? null,
      status: row.status ?? null,
      durationMs: row.durationMs ?? null,
      tool: row.tool ?? null,
      requestId: row.requestId ?? null,
      agentName: row.agentName ?? null,
      userAgent: row.userAgent ?? null,
      ip: row.ip ?? null,
      requestBody: row.requestBody ?? null,
      responseBody: row.responseBody ?? null
    }));
  }
}
