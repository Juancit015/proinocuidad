import {
  DEFAULT_EMBEDDING_PROVIDER,
  EMBEDDING_PROVIDER_DEFAULTS,
  type EmbeddingProvider,
} from "./embeddingDefaults.js";
import type { ProviderEmbeddingsConfig, RagEmbeddingsConfig } from "../types.js";

export interface ResolvedProviderEmbeddingsConfig {
  provider: EmbeddingProvider;
  apiKey: string;
  model: string;
  baseUrl: string;
}

function isProviderEmbeddingsConfig(
  config: RagEmbeddingsConfig,
): config is ProviderEmbeddingsConfig {
  return (
    config.provider === "openai" ||
    config.provider === "google" ||
    config.provider === "cohere" ||
    config.provider === "voyage"
  );
}

export function resolveEmbeddingsConfig(
  config: ProviderEmbeddingsConfig,
): ResolvedProviderEmbeddingsConfig {
  const provider = config.provider ?? DEFAULT_EMBEDDING_PROVIDER;
  const defaults = EMBEDDING_PROVIDER_DEFAULTS[provider];
  const apiKey = config.apiKey?.trim();

  if (!apiKey) {
    throw new Error(`Embeddings provider "${provider}" requires an apiKey.`);
  }

  return {
    provider,
    apiKey,
    model: config.model ?? defaults.model,
    baseUrl: (config.baseUrl ?? defaults.baseUrl).replace(/\/$/, ""),
  };
}

export function isProviderConfig(
  config: RagEmbeddingsConfig,
): config is ProviderEmbeddingsConfig {
  return isProviderEmbeddingsConfig(config);
}
