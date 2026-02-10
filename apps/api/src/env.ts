export type Env = {
  nodeEnv: string;
  port: number;
  publicBaseUrl: string;
  serviceVersion: string;
  logLevel: string;
  logNoise: boolean;

  storage: 'firestore' | 'inmemory';
  gcpProjectId: string;

  cacheTtlMs: number;

  adminDashUser: string;
  adminDashPass: string;

  registryBaseUrl: string;
  ingestToken: string;
  ingestPageLimit: number;

  captureAgentPayloads: boolean;
  agentPayloadTtlHours: number;
  agentPayloadMaxEvents: number;
  agentPayloadMaxBytes: number;
  agentEventToken: string;

  embeddingsEnabled: boolean;
  embeddingsProvider: 'openai';
  openaiApiKey: string;
  openaiEmbeddingsModel: string;
};

function parseBool(value: string | undefined, fallback: boolean) {
  if (value == null || value === '') return fallback;
  return value.trim().toLowerCase() === 'true';
}

function parseIntStrict(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.trunc(parsed);
}

export function loadEnv(): Env {
  const nodeEnv = process.env.NODE_ENV ?? 'development';
  const port = parseIntStrict(process.env.PORT, 3000);
  const publicBaseUrl = process.env.PUBLIC_BASE_URL ?? '';
  const serviceVersion = process.env.SERVICE_VERSION ?? '0.1.0';
  const logLevel = process.env.LOG_LEVEL ?? 'info';
  const logNoise = parseBool(process.env.LOG_NOISE, false);

  const storageRaw = (process.env.RAGMAP_STORAGE ?? 'firestore').trim().toLowerCase();
  const storage = storageRaw === 'inmemory' ? 'inmemory' : 'firestore';
  const gcpProjectId = process.env.GCP_PROJECT_ID ?? '';

  const cacheTtlMs = Math.max(0, Math.min(60 * 60 * 1000, parseIntStrict(process.env.CACHE_TTL_MS, 60_000)));

  const adminDashUser = process.env.ADMIN_DASH_USER ?? '';
  const adminDashPass = process.env.ADMIN_DASH_PASS ?? '';

  const registryBaseUrl = process.env.REGISTRY_BASE_URL ?? 'https://registry.modelcontextprotocol.io';
  const ingestToken = process.env.INGEST_TOKEN ?? '';
  // Upstream registry currently enforces `limit <= 100`.
  const ingestPageLimit = Math.max(1, Math.min(100, parseIntStrict(process.env.INGEST_PAGE_LIMIT, 100)));

  const captureAgentPayloads = parseBool(process.env.CAPTURE_AGENT_PAYLOADS, false);
  const agentPayloadTtlHours = Math.max(0, parseIntStrict(process.env.AGENT_PAYLOAD_TTL_HOURS, 24));
  const agentPayloadMaxEvents = Math.max(0, parseIntStrict(process.env.AGENT_PAYLOAD_MAX_EVENTS, 1000));
  const agentPayloadMaxBytes = Math.max(
    1024,
    Math.min(256 * 1024, parseIntStrict(process.env.AGENT_PAYLOAD_MAX_BYTES, 16_384))
  );
  const agentEventToken = process.env.AGENT_EVENT_TOKEN ?? '';

  const embeddingsEnabled = parseBool(process.env.EMBEDDINGS_ENABLED, false);
  const embeddingsProvider = 'openai' as const;
  const openaiApiKey = process.env.OPENAI_API_KEY ?? '';
  const openaiEmbeddingsModel = process.env.OPENAI_EMBEDDINGS_MODEL ?? 'text-embedding-3-small';

  return {
    nodeEnv,
    port,
    publicBaseUrl,
    serviceVersion,
    logLevel,
    logNoise,
    storage,
    gcpProjectId,
    cacheTtlMs,
    adminDashUser,
    adminDashPass,
    registryBaseUrl,
    ingestToken,
    ingestPageLimit,
    captureAgentPayloads,
    agentPayloadTtlHours,
    agentPayloadMaxEvents,
    agentPayloadMaxBytes,
    agentEventToken,
    embeddingsEnabled,
    embeddingsProvider,
    openaiApiKey,
    openaiEmbeddingsModel
  };
}
