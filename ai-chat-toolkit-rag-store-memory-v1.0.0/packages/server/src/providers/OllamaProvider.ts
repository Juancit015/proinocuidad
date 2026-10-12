import type { AiTool } from "../types.js";
import type { LLMMessage, ProviderCompletionResult } from "../types.js";
import { AiChatServerError } from "../utils/errors.js";
import type { LLMProvider } from "./LLMProvider.js";

const DEFAULT_BASE_URL = "http://localhost:11434";

/**
 * Ollama chat provider (basic chat only).
 * TODO: Implement Ollama native tool calling when model supports it.
 */
export class OllamaProvider implements LLMProvider {
  readonly name = "ollama";
  readonly supportsToolCalling = false;

  readonly #model: string;
  readonly #baseUrl: string;

  constructor(options: { model: string; baseUrl?: string }) {
    this.#model = options.model;
    this.#baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, "");
  }

  async complete(
    messages: LLMMessage[],
    tools?: AiTool[],
  ): Promise<ProviderCompletionResult> {
    if (tools && tools.length > 0) {
      throw new AiChatServerError(
        "Ollama tool calling is not implemented yet. Use openai-compatible or groq for tools.",
        501,
      );
    }

    const response = await fetch(`${this.#baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: this.#model,
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        stream: false,
      }),
    });

    const data = (await response.json()) as {
      error?: string;
      message?: { content?: string };
    };

    if (!response.ok) {
      throw new AiChatServerError(
        data.error ?? `Ollama request failed (${response.status}).`,
        response.status,
      );
    }

    const content = data.message?.content?.trim();
    if (!content) {
      throw new AiChatServerError("Ollama returned an empty response.", 502);
    }

    return { type: "message", content };
  }
}
