import { IMPLEMENTED_EMBEDDING_PROVIDERS } from "./embeddingDefaults.js";
import { createOpenAIEmbedder } from "./openaiEmbeddings.js";
import {
  isProviderConfig,
  resolveEmbeddingsConfig,
} from "./resolveEmbeddingsConfig.js";
import type {
  CustomEmbeddingsConfig,
  EmbedTextFn,
  RagEmbeddingsConfig,
} from "../types.js";

function isCustomEmbeddingsConfig(
  config: RagEmbeddingsConfig,
): config is CustomEmbeddingsConfig {
  return typeof (config as CustomEmbeddingsConfig).embed === "function";
}

export function createEmbedder(config: RagEmbeddingsConfig): EmbedTextFn {
  if (isProviderConfig(config)) {
    const resolved = resolveEmbeddingsConfig(config);

    if (resolved.provider === "openai") {
      return createOpenAIEmbedder(resolved);
    }

    if (!IMPLEMENTED_EMBEDDING_PROVIDERS.includes(resolved.provider)) {
      throw new Error(
        `Embeddings provider "${resolved.provider}" is not implemented yet. Use provider: "openai" or a custom embed function.`,
      );
    }
  }

  if (isCustomEmbeddingsConfig(config)) {
    return config.embed;
  }

  throw new Error(
    "Invalid embeddings config: provide a supported provider with apiKey or a custom embed function.",
  );
}
