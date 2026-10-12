export interface RagBeforeLLMHookHistoryEntry {
  role: "user" | "assistant";
  content: string;
}

export interface RagBeforeLLMHookInput {
  message: string;
  history: RagBeforeLLMHookHistoryEntry[];
  request: unknown;
}

export interface RagBeforeLLMHookResult {
  context?: string;
}

export type RagBeforeLLMHook = (
  input: RagBeforeLLMHookInput,
) =>
  | Promise<RagBeforeLLMHookResult | void>
  | RagBeforeLLMHookResult
  | void;

/** Minimal server surface used by rag(); compatible with AiChatServer from ai-chat-toolkit-server. */
export interface RagPluginHost {
  registerBeforeLLMHook(hook: RagBeforeLLMHook): void;
}

export interface RagDocument {
  id: string;
  text: string;
  metadata?: Record<string, unknown>;
}

export interface RagChunk {
  id: string;
  documentId: string;
  text: string;
  metadata?: Record<string, unknown>;
}

export interface RagChunkWithEmbedding extends RagChunk {
  embedding: number[];
}

export interface RagSearchResult {
  chunk: RagChunk;
  score: number;
}

export interface RagSearchOptions {
  limit?: number;
}

export interface RagSource {
  load(): Promise<RagDocument[]> | RagDocument[];
}

export interface RagStore {
  add(
    chunks: RagChunkWithEmbedding[],
  ): Promise<void> | void;
  search(
    queryEmbedding: number[],
    options?: RagSearchOptions,
  ): Promise<RagSearchResult[]> | RagSearchResult[];
}

export type EmbedTextFn = (text: string) => Promise<number[]>;

export type { EmbeddingProvider } from "./embeddings/embeddingDefaults.js";

export interface ProviderEmbeddingsConfig {
  provider: import("./embeddings/embeddingDefaults.js").EmbeddingProvider;
  apiKey: string;
  model?: string;
  baseUrl?: string;
}

export interface OpenAIEmbeddingsConfig extends ProviderEmbeddingsConfig {
  provider: "openai";
}

export interface CustomEmbeddingsConfig {
  provider?: "custom";
  embed: EmbedTextFn;
}

export type RagEmbeddingsConfig =
  | ProviderEmbeddingsConfig
  | CustomEmbeddingsConfig;

export interface RagChunkingConfig {
  chunkSize?: number;
  overlap?: number;
}

export interface RagSearchConfig {
  limit?: number;
}

export interface RagOptions {
  sources?: RagSource[];
  store?: RagStore | null;
  embeddings: RagEmbeddingsConfig;
  chunking?: RagChunkingConfig;
  search?: RagSearchConfig;
}

export interface ResolvedRagChunkingConfig {
  chunkSize: number;
  overlap: number;
}

export interface ResolvedRagSearchConfig {
  limit: number;
}
