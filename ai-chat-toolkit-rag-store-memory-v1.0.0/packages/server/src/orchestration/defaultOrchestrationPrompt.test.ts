import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  DEFAULT_ORCHESTRATION_PROMPT,
  resolveOrchestrationSystemPrompt,
} from "./defaultOrchestrationPrompt.js";

describe("resolveOrchestrationSystemPrompt", () => {
  it("uses default orchestration prompt when custom prompt is omitted", () => {
    assert.equal(resolveOrchestrationSystemPrompt(), DEFAULT_ORCHESTRATION_PROMPT);
    assert.equal(resolveOrchestrationSystemPrompt(undefined), DEFAULT_ORCHESTRATION_PROMPT);
    assert.equal(resolveOrchestrationSystemPrompt("   "), DEFAULT_ORCHESTRATION_PROMPT);
  });

  it("appends custom instructions without replacing orchestration rules", () => {
    const result = resolveOrchestrationSystemPrompt("You are a support bot.");
    assert.match(result, /^You are a helpful AI assistant with access to registered tools\./);
    assert.match(result, /Additional user instructions:\nYou are a support bot\.$/);
  });
});
