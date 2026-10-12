import type { EmbedTextFn } from "../types.js";
import { EMBEDDING_PROVIDER_DEFAULTS } from "./embeddingDefaults.js";
import type { ResolvedProviderEmbeddingsConfig } from "./resolveEmbeddingsConfig.js";

const OPENAI_DEFAULTS = EMBEDDING_PROVIDER_DEFAULTS.openai;

interface OpenAIEmbeddingsResponse {
  data?: Array<{ embedding?: number[] }>;
  error?: { message?: string };
}

export function createOpenAIEmbedder(
  config: ResolvedProviderEmbeddingsConfig,
): EmbedTextFn {
  const apiKey = config.apiKey;
  const model = config.model?.trim() || OPENAI_DEFAULTS.model;
  const baseUrl = (config.baseUrl?.trim() || OPENAI_DEFAULTS.baseUrl).replace(
    /\/$/,
    "",
  );

  return async (text: string): Promise<number[]> => {
    const response = await fetch(`${baseUrl}/embeddings`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        input: text,
      }),
    });

    const payload = (await response.json()) as OpenAIEmbeddingsResponse;

    if (!response.ok) {
      const message =
        payload.error?.message ??
        `OpenAI embeddings request failed with status ${response.status}.`;
      throw new Error(message);
    }

    const embedding = payload.data?.[0]?.embedding;
    if (!embedding || embedding.length === 0) {
      throw new Error("OpenAI embeddings response did not include an embedding.");
    }

    return embedding;
  };
}
