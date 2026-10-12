import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, it } from "node:test";
import type { RagChunkWithEmbedding, RagStore } from "ai-chat-toolkit-rag";
import { rag } from "ai-chat-toolkit-rag";
import { localSource } from "./localSource.js";
import { loadLocalDocuments } from "./loadLocalDocuments.js";

function createMockEmbedder(): (text: string) => Promise<number[]> {
  return async (text: string) => {
    const vector = new Array<number>(8).fill(0);
    for (let index = 0; index < text.length; index += 1) {
      vector[index % vector.length]! += text.charCodeAt(index);
    }
    return vector;
  };
}

function createTestMemoryStore(): RagStore {
  const chunks: RagChunkWithEmbedding[] = [];

  const cosineSimilarity = (left: number[], right: number[]): number => {
    let dot = 0;
    let leftNorm = 0;
    let rightNorm = 0;
    for (let index = 0; index < left.length; index += 1) {
      dot += left[index]! * right[index]!;
      leftNorm += left[index]! * left[index]!;
      rightNorm += right[index]! * right[index]!;
    }
    const denominator = Math.sqrt(leftNorm) * Math.sqrt(rightNorm);
    return denominator === 0 ? 0 : dot / denominator;
  };

  return {
    add(newChunks: RagChunkWithEmbedding[]): void {
      chunks.push(...newChunks);
    },
    search(queryEmbedding: number[], options?: { limit?: number }) {
      const limit = options?.limit ?? 5;
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

async function createFixtureDirectory(): Promise<string> {
  const directoryPath = await fs.mkdtemp(path.join(os.tmpdir(), "rag-local-source-"));
  await fs.writeFile(path.join(directoryPath, "note.txt"), "Plain text document content.");
  await fs.writeFile(path.join(directoryPath, "guide.md"), "# Guide\n\nMarkdown document content.");
  await fs.writeFile(
    path.join(directoryPath, "config.json"),
    JSON.stringify({ topic: "pricing", price: 19.99 }),
  );
  await fs.writeFile(path.join(directoryPath, "skip.exe"), "binary");
  await fs.mkdir(path.join(directoryPath, "nested"));
  await fs.writeFile(
    path.join(directoryPath, "nested", "details.txt"),
    "Nested text file content.",
  );
  return directoryPath;
}

describe("localSource", () => {
  it("loads .txt, .md, and .json files", async () => {
    const directoryPath = await createFixtureDirectory();
    const documents = await loadLocalDocuments({ path: directoryPath });

    assert.equal(documents.length, 4);
    assert.ok(documents.some((document) => document.metadata?.extension === "txt"));
    assert.ok(documents.some((document) => document.metadata?.extension === "md"));
    assert.ok(documents.some((document) => document.metadata?.extension === "json"));
    assert.ok(documents.every((document) => typeof document.metadata?.filePath === "string"));
    assert.ok(documents.every((document) => typeof document.metadata?.modifiedAt === "string"));
  });

  it("ignores unsupported files", async () => {
    const directoryPath = await createFixtureDirectory();
    const documents = await loadLocalDocuments({ path: directoryPath });

    assert.equal(
      documents.some((document) => String(document.metadata?.filePath).endsWith("skip.exe")),
      false,
    );
  });

  it("returns an empty list when the folder is missing", async () => {
    const documents = await loadLocalDocuments({
      path: path.join(os.tmpdir(), "missing-rag-local-source-folder"),
    });

    assert.deepEqual(documents, []);
  });

  it("returns an empty list for unreadable nested files without crashing", async () => {
    const directoryPath = await createFixtureDirectory();
    const blockedPath = path.join(directoryPath, "blocked.txt");
    await fs.writeFile(blockedPath, "blocked content");
    await fs.chmod(directoryPath, 0o500);

    try {
      const documents = await loadLocalDocuments({ path: directoryPath });
      assert.ok(Array.isArray(documents));
    } finally {
      await fs.chmod(directoryPath, 0o700);
    }
  });
});

describe("localSource RAG integration", () => {
  it("indexes local documents and retrieves nearest chunk with mocked embeddings", async () => {
    const directoryPath = await fs.mkdtemp(path.join(os.tmpdir(), "rag-local-integration-"));
    const pricingText =
      "Demo Product pricing: Starter plan is $19.99 per month and Pro plan is $49.99.";
    await fs.writeFile(path.join(directoryPath, "pricing.txt"), pricingText);

    const store = createTestMemoryStore();
    const embed = createMockEmbedder();
    const plugin = rag({
      sources: [localSource({ path: directoryPath })],
      store,
      embeddings: {
        provider: "custom",
        embed,
      },
      search: { limit: 1 },
    });

    const indexedCount = await plugin.index();
    assert.ok(indexedCount > 0);

    const queryEmbedding = await embed("What is the Demo Product pricing?");
    const results = await Promise.resolve(store.search(queryEmbedding, { limit: 1 }));

    assert.equal(results.length, 1);
    assert.ok(results[0]?.score > 0);
    assert.match(results[0]?.chunk.text ?? "", /19\.99/);
  });
});
