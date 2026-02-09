import { buildSearchText } from '../rag/enrich.js';
import type { RagFilters, RagmapEnrichment, RegistryServerEntry, RegistryServer } from '@ragmap/shared';
import { ragSearchKeyword, ragSearchSemantic, type RagSearchItem } from '../rag/search.js';
import { buildMeta, type IngestMode, type RegistryStore } from './types.js';

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
}
