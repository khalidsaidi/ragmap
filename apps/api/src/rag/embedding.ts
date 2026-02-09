import type { Env } from '../env.js';

export async function embedText(env: Env, input: string): Promise<{ model: string; vector: number[] } | null> {
  if (!env.embeddingsEnabled) return null;
  if (env.embeddingsProvider !== 'openai') return null;
  if (!env.openaiApiKey) return null;

  const resp = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${env.openaiApiKey}`
    },
    body: JSON.stringify({
      model: env.openaiEmbeddingsModel,
      input
    })
  });

  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    throw new Error(`OpenAI embeddings failed: ${resp.status} ${text}`);
  }

  const data = (await resp.json()) as { data?: Array<{ embedding?: number[] }> };
  const vector = data.data?.[0]?.embedding;
  if (!Array.isArray(vector) || vector.length === 0) return null;
  return { model: env.openaiEmbeddingsModel, vector };
}

