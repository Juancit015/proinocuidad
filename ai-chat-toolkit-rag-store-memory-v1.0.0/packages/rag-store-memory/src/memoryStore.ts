import type {
  RagChunkWithEmbedding,
  RagSearchOptions,
  RagSearchResult,
  RagStore,
} from "ai-chat-toolkit-rag";
import { cosineSimilarity } from "./cosineSimilarity.js";

const DEFAULT_LIMIT = 5;

export function memoryStore(): RagStore {
  const chunks: RagChunkWithEmbedding[] = [];

  return {
    add(newChunks: RagChunkWithEmbedding[]): void {
      chunks.push(...newChunks);
    },
    search(
      queryEmbedding: number[],
      options?: RagSearchOptions,
    ): RagSearchResult[] {
      const limit = options?.limit ?? DEFAULT_LIMIT;

      return [...chunks]
        .map((chunk) => ({
          chunk,
          score: cosineSimilarity(queryEmbedding, chunk.embedding),
        }))
        .sort((left, right) => right.score - left.score)
        .slice(0, limit);
    },
  };
}
