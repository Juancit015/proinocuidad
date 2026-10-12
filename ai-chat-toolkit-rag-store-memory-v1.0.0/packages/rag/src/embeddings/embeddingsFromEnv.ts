import {
  DEFAULT_EMBEDDING_PROVIDER,
  EMBEDDING_PROVIDER_DEFAULTS,
  type EmbeddingProvider,
} from "./embeddingDefaults.js";
import type { ProviderEmbeddingsConfig } from "../types.js";

export interface EmbeddingsFromEnvInput {
  provider?: string;
  apiKey?: string;
  model?: string;
  baseUrl?: string;
}

function parseProvider(value?: string): EmbeddingProvider {
  const provider = value?.trim().toLowerCase();

  if (
    provider === "openai" ||
    provider === "google" ||
    provider === "cohere" ||
    provider === "voyage"
  ) {
    return provider;
  }

  return DEFAULT_EMBEDDING_PROVIDER;
}

export function embeddingsFromEnv(
  input: EmbeddingsFromEnvInput = {},
): ProviderEmbeddingsConfig {
  const provider = parseProvider(input.provider);
  const defaults = EMBEDDING_PROVIDER_DEFAULTS[provider];
  const apiKey = input.apiKey?.trim() ?? "";
  const model = input.model?.trim() || defaults.model;
  const baseUrl = input.baseUrl?.trim() || defaults.baseUrl;

  return {
    provider,
    apiKey,
    model,
    baseUrl,
  };
}
