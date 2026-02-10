import { Firestore, Timestamp } from '@google-cloud/firestore';
import type { RagFilters, RagmapEnrichment, RegistryServer, RegistryServerEntry } from '@ragmap/shared';
import { META_RAGMAP_KEY } from '@ragmap/shared';
import { buildSearchText } from '../rag/enrich.js';
import { ragSearchKeyword, ragSearchSemantic, type RagSearchItem } from '../rag/search.js';
import type { Env } from '../env.js';
import { buildMeta } from './types.js';
import type { IngestMode, ListServersParams, ListServersResult, RagExplain, RagSearchResult, RegistryStore, StoreHealth } from './types.js';

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

function buildEntry(doc: any): RegistryServerEntry {
  return {
    server: doc.server as any,
    _meta: buildMeta({
      official: doc.official ?? null,
      publisherProvided: doc.publisherProvided ?? undefined,
      ragmap: doc.ragmap ?? null
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
          ragmap: data.latestRagmap ?? null
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
        ragmap: data.latestRagmap ?? null
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
        .select('name', 'latestServer', 'latestOfficial', 'latestPublisherProvided', 'latestRagmap')
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
          ragmap: data.latestRagmap ?? null
        });
        items.push({
          entry,
          enrichment: data.latestRagmap ?? null,
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
}
