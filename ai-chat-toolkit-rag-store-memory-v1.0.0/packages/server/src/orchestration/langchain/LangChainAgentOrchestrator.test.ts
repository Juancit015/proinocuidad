import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { Request } from "express";
import { ToolRegistry } from "../../tool-registry/ToolRegistry.js";
import type { AiTool } from "../../types.js";
import { LangChainAgentOrchestrator } from "./LangChainAgentOrchestrator.js";
import { MockLLMProvider } from "./MockLLMProvider.js";

const mockRequest = { headers: {} } as Request;
const context = { request: mockRequest, headers: mockRequest.headers };

function createRegistry(tools: AiTool[]): ToolRegistry {
  const registry = new ToolRegistry();
  registry.register(tools);
  return registry;
}

describe("LangChainAgentOrchestrator", () => {
  it("returns a direct answer without calling tools", async () => {
    const provider = new MockLLMProvider([
      { type: "message", content: "Hello! How can I help?" },
    ]);

    const registry = createRegistry([
      {
        name: "lookup",
        description: "Lookup data",
        inputSchema: {
          type: "object",
          properties: { id: { type: "string" } },
          required: ["id"],
        },
        handler: async () => {
          throw new Error("tool should not run");
        },
      },
    ]);

    const orchestrator = new LangChainAgentOrchestrator({
      provider,
      toolRegistry: registry,
      maxToolRounds: 5,
    });

    const reply = await orchestrator.run({
      history: [],
      userMessage: "Hi",
      context,
    });

    assert.equal(reply, "Hello! How can I help?");
    assert.equal(provider.completeCalls.length, 1);
  });

  it("calls a single tool then responds", async () => {
    let toolCalls = 0;

    const provider = new MockLLMProvider([
      {
        type: "tool_calls",
        content: "",
        toolCalls: [
          { id: "call-1", name: "get_status", arguments: { orderId: "1" } },
        ],
      },
      { type: "message", content: "Order 1 is shipped." },
    ]);

    const registry = createRegistry([
      {
        name: "get_status",
        description: "Get order status",
        inputSchema: {
          type: "object",
          properties: { orderId: { type: "string" } },
          required: ["orderId"],
        },
        handler: async () => {
          toolCalls += 1;
          return { orderId: "1", status: "shipped" };
        },
      },
    ]);

    const orchestrator = new LangChainAgentOrchestrator({
      provider,
      toolRegistry: registry,
      maxToolRounds: 5,
    });

    const reply = await orchestrator.run({
      history: [],
      userMessage: "What is the status of order 1?",
      context,
    });

    assert.equal(reply, "Order 1 is shipped.");
    assert.equal(toolCalls, 1);
  });

  it("chains multiple tools and passes prior output forward", async () => {
    const seenArgs: Record<string, unknown>[] = [];

    const provider = new MockLLMProvider([
      {
        type: "tool_calls",
        content: "",
        toolCalls: [
          { id: "call-1", name: "find_customer", arguments: { email: "a@b.com" } },
        ],
      },
      {
        type: "tool_calls",
        content: "",
        toolCalls: [
          { id: "call-2", name: "get_orders", arguments: { customerId: "cust-1" } },
        ],
      },
      { type: "message", content: "Found one order for cust-1." },
    ]);

    const registry = createRegistry([
      {
        name: "find_customer",
        description: "Find customer by email",
        inputSchema: {
          type: "object",
          properties: { email: { type: "string" } },
          required: ["email"],
        },
        handler: async () => ({ customerId: "cust-1" }),
      },
      {
        name: "get_orders",
        description: "Get orders for customer",
        inputSchema: {
          type: "object",
          properties: { customerId: { type: "string" } },
          required: ["customerId"],
        },
        handler: async (input) => {
          seenArgs.push(input);
          return [{ orderId: "99" }];
        },
      },
    ]);

    const orchestrator = new LangChainAgentOrchestrator({
      provider,
      toolRegistry: registry,
      maxToolRounds: 6,
    });

    const reply = await orchestrator.run({
      history: [],
      userMessage: "Find orders for a@b.com",
      context,
    });

    assert.equal(reply, "Found one order for cust-1.");
    assert.equal(seenArgs.length, 1);
    assert.equal(seenArgs[0]?.customerId, "cust-1");

    const secondCompleteMessages = provider.completeCalls[1] ?? [];
    const toolMessage = secondCompleteMessages.find((msg) => msg.role === "tool");
    assert.ok(toolMessage?.content.includes("cust-1"));
  });

  it("continues safely when a tool fails", async () => {
    const provider = new MockLLMProvider([
      {
        type: "tool_calls",
        content: "",
        toolCalls: [
          { id: "call-1", name: "broken_tool", arguments: {} },
        ],
      },
      { type: "message", content: "The lookup failed, please try again later." },
    ]);

    const registry = createRegistry([
      {
        name: "broken_tool",
        description: "Always fails",
        inputSchema: { type: "object", properties: {} },
        handler: async () => {
          throw new Error("database unavailable");
        },
      },
    ]);

    const orchestrator = new LangChainAgentOrchestrator({
      provider,
      toolRegistry: registry,
      maxToolRounds: 5,
    });

    const reply = await orchestrator.run({
      history: [],
      userMessage: "Run broken tool",
      context,
    });

    assert.equal(reply, "The lookup failed, please try again later.");

    const toolMessages = (provider.completeCalls[1] ?? []).filter(
      (msg) => msg.role === "tool",
    );
    assert.equal(toolMessages.length, 1);
    assert.match(toolMessages[0]?.content ?? "", /failed/i);
  });
});
