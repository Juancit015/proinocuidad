import type {
  AiTool,
  LLMMessage,
  ProviderCompletionResult,
  ProviderToolCall,
} from "../types.js";
import { AiChatServerError } from "../utils/errors.js";
import type { LLMProvider } from "./LLMProvider.js";

const DEFAULT_BASE_URL = "https://api.openai.com/v1";

interface OpenAIToolCall {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: string;
  };
}

interface OpenAIChatMessage {
  role: string;
  content?: string | null;
  tool_calls?: OpenAIToolCall[];
  tool_call_id?: string;
}

export class OpenAICompatibleProvider implements LLMProvider {
  readonly name = "openai-compatible";
  readonly supportsToolCalling = true;

  readonly #apiKey: string;
  readonly #model: string;
  readonly #baseUrl: string;

  constructor(options: {
    apiKey: string;
    model: string;
    baseUrl?: string;
  }) {
    if (!options.apiKey?.trim()) {
      throw new AiChatServerError("API key is required for this provider.", 400);
    }
    this.#apiKey = options.apiKey;
    this.#model = options.model;
    this.#baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, "");
  }

  async complete(
    messages: LLMMessage[],
    tools?: AiTool[],
  ): Promise<ProviderCompletionResult> {
    const body: Record<string, unknown> = {
      model: this.#model,
      messages: this.#toApiMessages(messages),
    };

    if (tools && tools.length > 0) {
      body.tools = tools.map((tool) => ({
        type: "function",
        function: {
          name: tool.name,
          description: tool.description,
          parameters: tool.inputSchema,
        },
      }));
      body.tool_choice = "auto";
    }

    const response = await fetch(`${this.#baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.#apiKey}`,
      },
      body: JSON.stringify(body),
    });

    const data = (await response.json()) as {
      error?: { message?: string };
      choices?: Array<{
        message?: OpenAIChatMessage;
        finish_reason?: string;
      }>;
    };

    if (!response.ok) {
      throw new AiChatServerError(
        data.error?.message ?? `LLM request failed (${response.status}).`,
        response.status,
      );
    }

    const message = data.choices?.[0]?.message;
    if (!message) {
      throw new AiChatServerError("LLM returned an empty response.", 502);
    }

    if (message.tool_calls && message.tool_calls.length > 0) {
      return {
        type: "tool_calls",
        content: message.content,
        toolCalls: message.tool_calls.map((call) =>
          this.#parseToolCall(call),
        ),
      };
    }

    const content = message.content?.trim();
    if (!content) {
      throw new AiChatServerError("LLM returned an empty message.", 502);
    }

    return { type: "message", content };
  }

  #parseToolCall(call: OpenAIToolCall): ProviderToolCall {
    let args: Record<string, unknown> = {};
    try {
      args = JSON.parse(call.function.arguments || "{}") as Record<
        string,
        unknown
      >;
    } catch {
      console.warn(
        `[ai-chat-toolkit-server] Failed to parse tool arguments for "${call.function.name}". Raw: ${call.function.arguments}`,
      );
    }
    return {
      id: call.id,
      name: call.function.name,
      arguments: args,
    };
  }

  #toApiMessages(messages: LLMMessage[]): OpenAIChatMessage[] {
    return messages.map((msg) => {
      if (msg.role === "tool") {
        return {
          role: "tool",
          content: msg.content,
          tool_call_id: msg.toolCallId,
        };
      }

      if (msg.role === "assistant" && msg.toolCalls?.length) {
        return {
          role: "assistant",
          content: msg.content || null,
          tool_calls: msg.toolCalls.map((call) => ({
            id: call.id,
            type: "function" as const,
            function: {
              name: call.name,
              arguments: JSON.stringify(call.arguments),
            },
          })),
        };
      }

      return {
        role: msg.role,
        content: msg.content,
      };
    });
  }
}
