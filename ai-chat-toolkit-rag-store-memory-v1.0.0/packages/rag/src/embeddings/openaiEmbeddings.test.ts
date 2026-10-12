import assert from "node:assert/strict";
import { after, before, describe, it, mock } from "node:test";
import { EMBEDDING_PROVIDER_DEFAULTS } from "./embeddingDefaults.js";
import { createOpenAIEmbedder } from "./openaiEmbeddings.js";

describe("createOpenAIEmbedder", () => {
  let originalFetch: typeof globalThis.fetch;

  before(() => {
    originalFetch = globalThis.fetch;
  });

  after(() => {
    globalThis.fetch = originalFetch;
  });

  it("uses OpenAI default model and baseUrl when they are empty", async () => {
    let requestUrl = "";
    let requestBody: { model?: string; input?: string } = {};

    globalThis.fetch = mock.fn(async (input, init) => {
      requestUrl = String(input);
      requestBody = JSON.parse(String(init?.body)) as {
        model?: string;
        input?: string;
      };

      return new Response(
        JSON.stringify({
          data: [{ embedding: [0.1, 0.2, 0.3] }],
        }),
        { status: 200 },
      );
    }) as typeof fetch;

    const embedder = createOpenAIEmbedder({
      provider: "openai",
      apiKey: "test-key",
      model: "",
      baseUrl: "",
    });

    const embedding = await embedder("hello");

    assert.deepEqual(embedding, [0.1, 0.2, 0.3]);
    assert.equal(
      requestUrl,
      `${EMBEDDING_PROVIDER_DEFAULTS.openai.baseUrl}/embeddings`,
    );
    assert.equal(requestBody.model, EMBEDDING_PROVIDER_DEFAULTS.openai.model);
    assert.equal(requestBody.input, "hello");
  });
});
