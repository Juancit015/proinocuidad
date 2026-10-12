import type {
  RagChunkWithEmbedding,
  RagDocument,
  RagSearchOptions,
  RagSearchResult,
  RagSource,
  RagStore,
} from "../types.js";

function cosineSimilarity(a: number[], b: number[]): number {
  const length = Math.min(a.length, b.length);
  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let index = 0; index < length; index += 1) {
    dot += a[index]! * b[index]!;
    normA += a[index]! * a[index]!;
    normB += b[index]! * b[index]!;
  }

  if (normA === 0 || normB === 0) {
    return 0;
  }

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export class MockRagStore implements RagStore {
  readonly #chunks: RagChunkWithEmbedding[] = [];

  add(chunks: RagChunkWithEmbedding[]): void {
    this.#chunks.push(...chunks);
  }

  search(queryEmbedding: number[], options?: RagSearchOptions): RagSearchResult[] {
    const limit = options?.limit ?? 5;

    return [...this.#chunks]
      .map((chunk) => ({
        chunk,
        score: cosineSimilarity(queryEmbedding, chunk.embedding),
      }))
      .sort((left, right) => right.score - left.score)
      .slice(0, limit);
  }

  get size(): number {
    return this.#chunks.length;
  }
}

export function createMockSource(documents: RagDocument[]): RagSource {
  return {
    load: () => documents,
  };
}

export function createMockEmbedder(): (text: string) => Promise<number[]> {
  return async (text: string) => {
    const vector = new Array<number>(8).fill(0);
    for (let index = 0; index < text.length; index += 1) {
      vector[index % vector.length]! += text.charCodeAt(index);
    }
    return vector;
  };
}
