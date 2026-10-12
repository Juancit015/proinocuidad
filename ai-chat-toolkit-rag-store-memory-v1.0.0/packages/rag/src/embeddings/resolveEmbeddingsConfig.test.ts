import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createEmbedder } from "./createEmbedder.js";
import {
  DEFAULT_EMBEDDING_PROVIDER,
  EMBEDDING_PROVIDER_DEFAULTS,
} from "./embeddingDefaults.js";
import { embeddingsFromEnv } from "./embeddingsFromEnv.js";
import { resolveEmbeddingsConfig } from "./resolveEmbeddingsConfig.js";

describe("resolveEmbeddingsConfig", () => {
  it("applies OpenAI defaults when model and baseUrl are omitted", () => {
    const resolved = resolveEmbeddingsConfig({
      provider: "openai",
      apiKey: "test-key",
    });

    assert.equal(resolved.provider, "openai");
    assert.equal(resolved.model, EMBEDDING_PROVIDER_DEFAULTS.openai.model);
    assert.equal(resolved.baseUrl, EMBEDDING_PROVIDER_DEFAULTS.openai.baseUrl);
  });

  it("respects explicit model and baseUrl overrides", () => {
    const resolved = resolveEmbeddingsConfig({
      provider: "openai",
      apiKey: "test-key",
      model: "text-embedding-3-large",
      baseUrl: "https://example.com/v1/",
    });

    assert.equal(resolved.model, "text-embedding-3-large");
    assert.equal(resolved.baseUrl, "https://example.com/v1");
  });

  it("throws when apiKey is missing", () => {
    assert.throws(
      () =>
        resolveEmbeddingsConfig({
          provider: "openai",
          apiKey: "",
        }),
      /requires an apiKey/,
    );
  });
});

describe("embeddingsFromEnv", () => {
  it("defaults to openai provider and model", () => {
    const config = embeddingsFromEnv({
      apiKey: "env-key",
    });

    assert.equal(config.provider, DEFAULT_EMBEDDING_PROVIDER);
    assert.equal(config.apiKey, "env-key");
    assert.equal(config.model, EMBEDDING_PROVIDER_DEFAULTS.openai.model);
    assert.equal(config.baseUrl, EMBEDDING_PROVIDER_DEFAULTS.openai.baseUrl);
  });

  it("parses provider and overrides from env-style input", () => {
    const config = embeddingsFromEnv({
      provider: "openai",
      apiKey: "env-key",
      model: "text-embedding-3-large",
      baseUrl: "https://custom.example/v1",
    });

    assert.equal(config.model, "text-embedding-3-large");
    assert.equal(config.baseUrl, "https://custom.example/v1");
  });
});

describe("createEmbedder provider routing", () => {
  it("returns a function for openai provider config", () => {
    const embedder = createEmbedder({
      provider: "openai",
      apiKey: "test-key",
    });

    assert.equal(typeof embedder, "function");
  });

  it("throws for unimplemented google provider", () => {
    assert.throws(
      () =>
        createEmbedder({
          provider: "google",
          apiKey: "test-key",
        }),
      /google.*not implemented yet/i,
    );
  });
});
