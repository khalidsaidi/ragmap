import { z } from 'zod';

export const META_OFFICIAL_KEY = 'io.modelcontextprotocol.registry/official';
export const META_PUBLISHER_KEY = 'io.modelcontextprotocol.registry/publisher-provided';
export const META_RAGMAP_KEY = 'io.github.khalidsaidi/ragmap';

export const OfficialMetaSchema = z
  .object({
    status: z.string().optional(),
    publishedAt: z.string().optional(),
    updatedAt: z.string().optional(),
    isLatest: z.boolean().optional()
  })
  .passthrough();

export type OfficialMeta = z.infer<typeof OfficialMetaSchema>;

export const RegistryServerSchema = z
  .object({
    $schema: z.string().optional(),
    name: z.string().min(1),
    version: z.string().min(1),
    description: z.string().optional(),
    title: z.string().optional()
  })
  .passthrough();

export type RegistryServer = z.infer<typeof RegistryServerSchema>;

export const RegistryServerEntrySchema = z
  .object({
    server: RegistryServerSchema,
    _meta: z.record(z.string(), z.unknown()).optional()
  })
  .passthrough();

export type RegistryServerEntry = z.infer<typeof RegistryServerEntrySchema>;

export const ListServersResponseSchema = z
  .object({
    servers: z.array(RegistryServerEntrySchema),
    metadata: z
      .object({
        nextCursor: z.string().optional(),
        count: z.number().int().nonnegative().optional()
      })
      .passthrough()
      .optional()
  })
  .passthrough();

export type ListServersResponse = z.infer<typeof ListServersResponseSchema>;

export const RagmapEnrichmentSchema = z
  .object({
    categories: z.array(z.string()).default([]),
    ragScore: z.number().int().min(0).max(100),
    reasons: z.array(z.string()).default([]),
    keywords: z.array(z.string()).default([]),
    hasRemote: z.boolean().optional(),
    citations: z.boolean().optional(),
    localOnly: z.boolean().optional(),
    reachable: z.boolean().optional(),
    lastReachableAt: z.string().optional(),
    embedding: z
      .object({
        model: z.string(),
        dims: z.number().int().positive(),
        vector: z.array(z.number()),
        createdAt: z.string()
      })
      .optional(),
    embeddingTextHash: z.string().optional()
  })
  .passthrough();

export type RagmapEnrichment = z.infer<typeof RagmapEnrichmentSchema>;

export const RagFiltersSchema = z
  .object({
    categories: z.array(z.string()).optional(),
    minScore: z.number().int().min(0).max(100).optional(),
    transport: z.enum(['stdio', 'streamable-http']).optional(),
    registryType: z.string().optional(),
    hasRemote: z.boolean().optional(),
    reachable: z.boolean().optional(),
    citations: z.boolean().optional(),
    localOnly: z.boolean().optional()
  })
  .passthrough();

export type RagFilters = z.infer<typeof RagFiltersSchema>;
