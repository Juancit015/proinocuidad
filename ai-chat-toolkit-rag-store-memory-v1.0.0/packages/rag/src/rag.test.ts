import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { Request } from "express";
import {
  chunkDocument,
  chunkDocuments,
  resolveChunkingConfig,
} from "./chunking/chunkText.js";
import { rag } from "./rag.js";
import {
  createMockEmbedder,
  createMockSource,
  MockRagStore,
} from "./test/mocks.js";

const mockRequest = { headers: {} } as Request;

type TestHook = (input: {
  message: string;
  history: [];
  request: Request;
}) => Promise<{ context?: string } | void>;

async function runCollectedHooks(
  hooks: TestHook[],
  input: { message: string; history: []; request: Request },
): Promise<string | undefined> {
  const contexts: string[] = [];

  for (const hook of hooks) {
    try {
      const result = await hook(input);
      if (result?.context?.trim()) {
        contexts.push(result.context.trim());
      }
    } catch {
      // Hook failures should not crash the request.
    }
  }

  return contexts.length > 0 ? contexts.join("\n\n") : undefined;
}

describe("rag()", () => {
  it("returns a plugin with install() and index()", () => {
    const plugin = rag({
      sources: [],
      store: null,
      embeddings: {
        provider: "custom",
        embed: createMockEmbedder(),
      },
    });

    assert.equal(typeof plugin.install, "function");
    assert.equal(typeof plugin.index, "function");
  });

  it("install registers a before-LLM hook", async () => {
    const hooks: Array<(input: { message: string }) => Promise<{ context?: string }>> =
      [];

    const plugin = rag({
      sources: [],
      store: null,
      embeddings: {
        provider: "custom",
        embed: createMockEmbedder(),
      },
    });

    plugin.install({
      registerBeforeLLMHook(hook) {
        hooks.push(hook as (input: { message: string }) => Promise<{ context?: string }>);
      },
    });

    assert.equal(hooks.length, 1);

    const hookContext = await runCollectedHooks(hooks, {
      message: "hello",
      history: [],
      request: mockRequest,
    });

    assert.equal(hookContext, undefined);
  });

  it("does not crash when source or store is missing", async () => {
    const plugin = rag({
      sources: [],
      store: null,
      embeddings: {
        provider: "custom",
        embed: createMockEmbedder(),
      },
    });

    await assert.doesNotReject(async () => {
      plugin.install({
        registerBeforeLLMHook() {},
      });
      await plugin.index();
    });
  });
});

describe("chunking", () => {
  it("chunks text using chunkSize and overlap", () => {
    const text = "abcdefghijklmnopqrstuvwxyz".repeat(20);
    const chunks = chunkDocuments(
      [{ id: "doc-1", text, metadata: { source: "test" } }],
      resolveChunkingConfig({ chunkSize: 100, overlap: 20 }),
    );

    assert.ok(chunks.length > 1);
    assert.equal(chunks[0]?.text.length, 100);
    assert.equal(chunks[0]?.documentId, "doc-1");
    assert.equal(chunks[0]?.metadata?.source, "test");
    assert.equal(chunks[1]?.metadata?.chunkIndex, 1);
  });

  it("preserves document metadata on each chunk", () => {
    const chunks = chunkDocument(
      {
        id: "doc-2",
        text: "hello world",
        metadata: { title: "Example" },
      },
      resolveChunkingConfig({ chunkSize: 1000, overlap: 200 }),
    );

    assert.equal(chunks.length, 1);
    assert.equal(chunks[0]?.metadata?.title, "Example");
    assert.equal(chunks[0]?.id, "doc-2#0");
  });
});

describe("rag indexing and retrieval", () => {
  it("indexes mock source documents into mock store", async () => {
    const store = new MockRagStore();
    const plugin = rag({
      sources: [
        createMockSource([
          {
            id: "doc-a",
            text: "Alpha beta gamma delta content for retrieval testing.",
            metadata: { topic: "alpha" },
          },
        ]),
      ],
      store,
      embeddings: {
        provider: "custom",
        embed: createMockEmbedder(),
      },
      chunking: {
        chunkSize: 20,
        overlap: 5,
      },
    });

    const indexedCount = await plugin.index();
    assert.ok(indexedCount > 0);
    assert.ok(store.size > 0);
  });

  it("returns hook context when store has relevant chunks", async () => {
    const store = new MockRagStore();
    const hooks: Array<
      (input: { message: string }) => Promise<{ context?: string } | void>
    > = [];

    const plugin = rag({
      sources: [
        createMockSource([
          {
            id: "doc-b",
            text: "The capital of France is Paris.",
            metadata: { topic: "geography" },
          },
        ]),
      ],
      store,
      embeddings: {
        provider: "custom",
        embed: createMockEmbedder(),
      },
      search: {
        limit: 1,
      },
    });

    plugin.install({
      registerBeforeLLMHook(hook) {
        hooks.push(hook as (input: { message: string }) => Promise<{ context?: string }>);
      },
    });

    await plugin.index();

    const hookContext = await runCollectedHooks(hooks, {
      message: "What is the capital of France?",
      history: [],
      request: mockRequest,
    });

    assert.ok(hookContext);
    assert.match(hookContext!, /Relevant context:/);
    assert.match(hookContext!, /Paris/);
  });

  it("continues safely when indexing or retrieval fails", async () => {
    const hooks: Array<
      (input: { message: string }) => Promise<{ context?: string } | void>
    > = [];

    const plugin = rag({
      sources: [
        {
          load: async () => {
            throw new Error("source failed");
          },
        },
      ],
      store: new MockRagStore(),
      embeddings: {
        provider: "custom",
        embed: async () => {
          throw new Error("embed failed");
        },
      },
    });

    plugin.install({
      registerBeforeLLMHook(hook) {
        hooks.push(hook as (input: { message: string }) => Promise<{ context?: string }>);
      },
    });

    const indexedCount = await plugin.index();
    assert.equal(indexedCount, 0);

    const hookContext = await runCollectedHooks(hooks, {
      message: "hello",
      history: [],
      request: mockRequest,
    });

    assert.equal(hookContext, undefined);
  });
});
