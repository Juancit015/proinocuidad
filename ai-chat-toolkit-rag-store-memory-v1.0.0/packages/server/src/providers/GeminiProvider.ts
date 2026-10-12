import type { AiTool } from "../types.js";
import type { LLMMessage, ProviderCompletionResult } from "../types.js";
import { AiChatServerError } from "../utils/errors.js";
import type { LLMProvider } from "./LLMProvider.js";

/**
 * Gemini chat provider (basic chat only).
 * TODO: Implement native Gemini function calling / tool use.
 */
export class GeminiProvider implements LLMProvider {
  readonly name = "gemini";
  readonly supportsToolCalling = false;

  readonly #apiKey: string;
  readonly #model: string;

  constructor(options: { apiKey: string; model: string }) {
    if (!options.apiKey?.trim()) {
      throw new AiChatServerError("API key is required for Gemini.", 400);
    }
    this.#apiKey = options.apiKey;
    this.#model = options.model;
  }

  async complete(
    messages: LLMMessage[],
    tools?: AiTool[],
  ): Promise<ProviderCompletionResult> {
    if (tools && tools.length > 0) {
      throw new AiChatServerError(
        "Gemini tool calling is not implemented yet. Use openai-compatible or groq for tools.",
        501,
      );
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(this.#model)}:generateContent?key=${encodeURIComponent(this.#apiKey)}`;

    const contents = messages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

    const system = messages.find((m) => m.role === "system");
    const body: Record<string, unknown> = { contents };
    if (system) {
      body.systemInstruction = { parts: [{ text: system.content }] };
    }

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = (await response.json()) as {
      error?: { message?: string };
      candidates?: Array<{
        content?: { parts?: Array<{ text?: string }> };
      }>;
    };

    if (!response.ok) {
      throw new AiChatServerError(
        data.error?.message ?? `Gemini request failed (${response.status}).`,
        response.status,
      );
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!text) {
      throw new AiChatServerError("Gemini returned an empty response.", 502);
    }

    return { type: "message", content: text };
  }
}
