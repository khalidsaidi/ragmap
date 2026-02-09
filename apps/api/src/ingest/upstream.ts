import { ListServersResponseSchema, type ListServersResponse, type RegistryServerEntry } from '@ragmap/shared';

export async function fetchUpstreamPage(params: {
  baseUrl: string;
  cursor?: string | null;
  limit: number;
  updatedSince?: Date | null;
}): Promise<{ servers: RegistryServerEntry[]; nextCursor?: string | null }> {
  const url = new URL('/v0.1/servers', params.baseUrl);
  url.searchParams.set('limit', String(params.limit));
  if (params.cursor) url.searchParams.set('cursor', params.cursor);
  if (params.updatedSince) url.searchParams.set('updated_since', params.updatedSince.toISOString());

  const resp = await fetch(url, { headers: { accept: 'application/json' } });
  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    throw new Error(`Upstream registry failed: ${resp.status} ${text}`);
  }
  const json = (await resp.json()) as unknown;
  const parsed = ListServersResponseSchema.safeParse(json);
  if (!parsed.success) {
    throw new Error(`Upstream response did not match expected shape`);
  }
  const data: ListServersResponse = parsed.data;
  const servers = data.servers ?? [];
  const nextCursor = (data.metadata as any)?.nextCursor ?? null;
  return { servers, nextCursor };
}

