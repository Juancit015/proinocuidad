import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { DEFAULT_CHAT_PROVIDER } from "./providerDefaults.js";
import { serverOptionsFromEnv } from "./serverOptionsFromEnv.js";

describe("serverOptionsFromEnv", () => {
  it("defaults to groq with default model", () => {
    const options = serverOptionsFromEnv({});

    assert.equal(options.provider, DEFAULT_CHAT_PROVIDER);
    assert.equal(options.model, "llama-3.3-70b-versatile");
    assert.equal(options.baseUrl, "https://api.groq.com/openai/v1");
    assert.equal(options.apiKey, undefined);
  });

  it("maps openai alias to openai-compatible", () => {
    const options = serverOptionsFromEnv({ provider: "openai" });

    assert.equal(options.provider, "openai-compatible");
    assert.equal(options.model, "gpt-4o-mini");
    assert.equal(options.baseUrl, "https://api.openai.com/v1");
  });

  it("accepts explicit model and apiKey", () => {
    const options = serverOptionsFromEnv({
      provider: "groq",
      apiKey: "gsk_test",
      model: "custom-model",
    });

    assert.equal(options.provider, "groq");
    assert.equal(options.apiKey, "gsk_test");
    assert.equal(options.model, "custom-model");
  });

  it("uses custom baseUrl when provided", () => {
    const options = serverOptionsFromEnv({
      provider: "ollama",
      baseUrl: "http://127.0.0.1:11434/v1",
    });

    assert.equal(options.provider, "ollama");
    assert.equal(options.baseUrl, "http://127.0.0.1:11434/v1");
  });

  it("falls back to groq for unknown provider", () => {
    const options = serverOptionsFromEnv({ provider: "unknown" });

    assert.equal(options.provider, "groq");
  });
});
