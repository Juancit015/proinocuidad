import {
  CHAT_PROVIDER_DEFAULTS,
  DEFAULT_CHAT_PROVIDER,
} from "./providerDefaults.js";
import type { AiChatServerOptions, SupportedProvider } from "../types.js";

export interface ServerOptionsFromEnvInput {
  provider?: string;
  apiKey?: string;
  model?: string;
  baseUrl?: string;
}

function parseProvider(value?: string): SupportedProvider {
  const normalized = value?.trim().toLowerCase();

  switch (normalized) {
    case "groq":
      return "groq";
    case "openai":
    case "openai-compatible":
      return "openai-compatible";
    case "gemini":
      return "gemini";
    case "ollama":
      return "ollama";
    default:
      return DEFAULT_CHAT_PROVIDER;
  }
}

export function serverOptionsFromEnv(
  input: ServerOptionsFromEnvInput = {},
): Pick<AiChatServerOptions, "provider" | "apiKey" | "model" | "baseUrl"> {
  const provider = parseProvider(input.provider);
  const defaults = CHAT_PROVIDER_DEFAULTS[provider];
  const model = input.model?.trim() || defaults.model;
  const baseUrl = input.baseUrl?.trim() || defaults.baseUrl;

  return {
    provider,
    ...(input.apiKey?.trim() ? { apiKey: input.apiKey.trim() } : {}),
    model,
    ...(baseUrl ? { baseUrl } : {}),
  };
}
