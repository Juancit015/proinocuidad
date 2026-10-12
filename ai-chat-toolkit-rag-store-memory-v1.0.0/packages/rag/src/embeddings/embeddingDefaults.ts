export type EmbeddingProvider = "openai" | "google" | "cohere" | "voyage";

export interface EmbeddingProviderDefaults {
  model: string;
  baseUrl: string;
}

export const DEFAULT_EMBEDDING_PROVIDER: EmbeddingProvider = "openai";

export const EMBEDDING_PROVIDER_DEFAULTS: Record<
  EmbeddingProvider,
  EmbeddingProviderDefaults
> = {
  openai: {
    model: "text-embedding-3-small",
    baseUrl: "https://api.openai.com/v1",
  },
  google: {
    model: "text-embedding-004",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta",
  },
  cohere: {
    model: "embed-english-v3.0",
    baseUrl: "https://api.cohere.com/v1",
  },
  voyage: {
    model: "voyage-3",
    baseUrl: "https://api.voyageai.com/v1",
  },
};

export const IMPLEMENTED_EMBEDDING_PROVIDERS: readonly EmbeddingProvider[] = [
  "openai",
];
