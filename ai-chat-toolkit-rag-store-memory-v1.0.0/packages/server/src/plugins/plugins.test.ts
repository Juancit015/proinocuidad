import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { Request } from "express";
import { AiChatServer } from "../AiChatServer.js";
import { LangChainAgentOrchestrator } from "../orchestration/langchain/LangChainAgentOrchestrator.js";
import { MockLLMProvider } from "../orchestration/langchain/MockLLMProvider.js";
import { ToolRegistry } from "../tool-registry/ToolRegistry.js";
import type { AiChatServerPlugin } from "./types.js";
import { mergeHookContextIntoSystemContent } from "./systemPrompt.js";
import { runBeforeLLMHooks } from "./runBeforeLLMHooks.js";

const mockRequest = { headers: {} } as Request;

describe("AiChatServer plugins", () => {
  it("calls plugin.install(server) via use(plugin)", () => {
    let installCalled = false;

    const plugin: AiChatServerPlugin = {
      install(server) {
        installCalled = true;
        assert.equal(typeof server.registerBeforeLLMHook, "function");
      },
    };

    const server = new AiChatServer({
      provider: "groq",
      apiKey: "test-key",
      model: "llama-3.3-70b-versatile",
    });

    server.use(plugin);
    assert.equal(installCalled, true);
  });

  it("exposes registerBeforeLLMHook on the server instance", () => {
    const server = new AiChatServer({
      provider: "groq",
      apiKey: "test-key",
      model: "llama-3.3-70b-versatile",
    });

    assert.equal(typeof server.use, "function");
    assert.equal(typeof server.registerBeforeLLMHook, "function");
  });

  it("works without plugins registered", () => {
    const server = new AiChatServer({
      provider: "groq",
      apiKey: "test-key",
      model: "llama-3.3-70b-versatile",
    });

    assert.equal(typeof server.addTools, "function");
    assert.equal(typeof server.attach, "function");
  });
});

describe("runBeforeLLMHooks", () => {
  it("returns hook context from a registered-style hook", async () => {
    const hookContext = await runBeforeLLMHooks(
      [
        async () => ({
          context: "Plugin context added",
        }),
      ],
      { message: "hello", history: [], request: mockRequest },
    );

    assert.equal(hookContext, "Plugin context added");
  });

  it("combines context from multiple hooks", async () => {
    const hookContext = await runBeforeLLMHooks(
      [
        async () => ({ context: "First block" }),
        async () => ({ context: "Second block" }),
      ],
      { message: "hello", history: [], request: mockRequest },
    );

    assert.equal(hookContext, "First block\n\nSecond block");
  });

  it("continues when a hook throws", async () => {
    const hookContext = await runBeforeLLMHooks(
      [
        async () => {
          throw new Error("hook failed");
        },
        async () => ({ context: "Recovered context" }),
      ],
      { message: "hello", history: [], request: mockRequest },
    );

    assert.equal(hookContext, "Recovered context");
  });
});

describe("mergeHookContextIntoSystemContent", () => {
  it("appends hook context to the system prompt", () => {
    const merged = mergeHookContextIntoSystemContent(
      "You are helpful.",
      "Extra context before LLM call",
    );

    assert.equal(
      merged,
      "You are helpful.\n\nExtra context before LLM call",
    );
  });

  it("returns only hook context when system prompt is omitted", () => {
    const merged = mergeHookContextIntoSystemContent(
      undefined,
      "Extra context before LLM call",
    );

    assert.equal(merged, "Extra context before LLM call");
  });
});

describe("LangChain orchestration with hook context", () => {
  it("includes retrieved hook context in the system prompt", async () => {
    const provider = new MockLLMProvider([
      { type: "message", content: "Answer with context" },
    ]);

    const orchestrator = new LangChainAgentOrchestrator({
      provider,
      toolRegistry: new ToolRegistry(),
      systemPrompt: "Base prompt",
      maxToolRounds: 3,
    });

    await orchestrator.run({
      history: [],
      userMessage: "hello",
      context: { request: mockRequest, headers: mockRequest.headers },
      hookContext: "Extra context before LLM call",
    });

    const firstCall = provider.completeCalls[0];
    const systemMessage = firstCall.find((message) => message.role === "system");
    assert.ok(systemMessage?.content.includes("Base prompt"));
    assert.ok(systemMessage?.content.includes("Extra context before LLM call"));
  });
});
