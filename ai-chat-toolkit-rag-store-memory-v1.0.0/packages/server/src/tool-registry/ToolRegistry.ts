import type {
  AiTool,
  ProviderToolCall,
  ToolExecutionContext,
} from "../types.js";
import { toErrorMessage } from "../utils/errors.js";

export class ToolRegistry {
  #tools = new Map<string, AiTool>();

  register(tools: AiTool[]): void {
    for (const tool of tools) {
      this.#tools.set(tool.name, tool);
    }
  }

  list(): Array<{ name: string; description: string }> {
    return [...this.#tools.values()].map((tool) => ({
      name: tool.name,
      description: tool.description,
    }));
  }

  hasTools(): boolean {
    return this.#tools.size > 0;
  }

  getAll(): AiTool[] {
    return [...this.#tools.values()];
  }

  toOpenAITools(): Array<{
    type: "function";
    function: {
      name: string;
      description: string;
      parameters: Record<string, unknown>;
    };
  }> {
    return [...this.#tools.values()].map((tool) => ({
      type: "function",
      function: {
        name: tool.name,
        description: tool.description,
        parameters: tool.inputSchema,
      },
    }));
  }

  async execute(
    toolCall: ProviderToolCall,
    context: ToolExecutionContext,
  ): Promise<string> {
    const tool = this.#tools.get(toolCall.name);
    if (!tool) {
      return JSON.stringify({
        error: `Tool "${toolCall.name}" is not registered.`,
      });
    }

    if (tool.requiresConfirmation) {
      return JSON.stringify({
        error: `Tool "${toolCall.name}" requires user confirmation before execution.`,
      });
    }

    try {
      const result = await tool.handler(toolCall.arguments, context);
      return JSON.stringify(result ?? { ok: true });
    } catch (error) {
      return JSON.stringify({
        error: `Tool "${toolCall.name}" failed: ${toErrorMessage(error)}`,
      });
    }
  }

  async executeAll(
    toolCalls: ProviderToolCall[],
    context: ToolExecutionContext,
  ): Promise<Array<{ toolCallId: string; output: string }>> {
    const results = await Promise.all(
      toolCalls.map(async (call) => ({
        toolCallId: call.id,
        output: await this.execute(call, context),
      })),
    );
    return results;
  }
}
