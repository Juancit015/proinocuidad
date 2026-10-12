import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { RagChunkWithEmbedding } from "ai-chat-toolkit-rag";
import { cosineSimilarity } from "./cosineSimilarity.js";
import { memoryStore } from "./memoryStore.js";

function makeChunk(id: string, text: string, embedding: number[]): RagChunkWithEmbedding {
  return {
    id,
    documentId: "doc-1",
    text,
    embedding,
  };
}

describe("cosineSimilarity", () => {
  it("returns the highest score for the nearest vector", () => {
    const query = [1, 0, 0];
    const nearest = [0.9, 0.1, 0];
    const farther = [0, 1, 0];

    assert.ok(cosineSimilarity(query, nearest) > cosineSimilarity(query, farther));
  });
});

describe("memoryStore", () => {
  it("adds chunks and returns top matches", () => {
    const store = memoryStore();

    store.add([
      makeChunk("chunk-a", "Alpha content", [1, 0, 0]),
      makeChunk("chunk-b", "Beta content", [0, 1, 0]),
    ]);

    const results = store.search([1, 0, 0], { limit: 1 });

    assert.equal(results.length, 1);
    assert.equal(results[0]?.chunk.id, "chunk-a");
    assert.ok(results[0]?.score > 0);
  });

  it("returns multiple results sorted by score", () => {
    const store = memoryStore();

    store.add([
      makeChunk("chunk-a", "Alpha", [1, 0, 0]),
      makeChunk("chunk-b", "Beta", [0.8, 0.2, 0]),
      makeChunk("chunk-c", "Gamma", [0, 1, 0]),
    ]);

    const results = store.search([1, 0, 0], { limit: 2 });

    assert.equal(results.length, 2);
    assert.equal(results[0]?.chunk.id, "chunk-a");
    assert.equal(results[1]?.chunk.id, "chunk-b");
    assert.ok(results[0]!.score >= results[1]!.score);
  });
});
