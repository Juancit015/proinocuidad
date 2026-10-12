import type { AiChatServerOptions } from "../types.js";
import { AiChatServerError } from "../utils/errors.js";
import { GeminiProvider } from "./GeminiProvider.js";
import type { LLMProvider } from "./LLMProvider.js";
import { OllamaProvider } from "./OllamaProvider.js";
import { OpenAICompatibleProvider } from "./OpenAICompatibleProvider.js";

const GROQ_BASE_URL = "https://api.groq.com/openai/v1";

export function createProvider(options: AiChatServerOptions): LLMProvider {
  const { provider, apiKey, model, baseUrl } = options;

  switch (provider) {
    case "groq":
      return new OpenAICompatibleProvider({
        apiKey: apiKey ?? "",
        model,
        baseUrl: GROQ_BASE_URL,
      });

    case "openai-compatible":
      return new OpenAICompatibleProvider({
        apiKey: apiKey ?? "",
        model,
        baseUrl,
      });

    case "gemini":
      return new GeminiProvider({
        apiKey: apiKey ?? "",
        model,
      });

    case "ollama":
      return new OllamaProvider({
        model,
        baseUrl,
      });

    default:
      throw new AiChatServerError(`Unsupported provider: ${provider}`, 400);
  }
}
