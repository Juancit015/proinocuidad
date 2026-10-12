import type { SupportedProvider } from "../types.js";

export interface ChatProviderDefaults {
  model: string;
  baseUrl?: string;
}

export const DEFAULT_CHAT_PROVIDER: SupportedProvider = "groq";

export const CHAT_PROVIDER_DEFAULTS: Record<
  SupportedProvider,
  ChatProviderDefaults
> = {
  groq: {
    model: "llama-3.3-70b-versatile",
    baseUrl: "https://api.groq.com/openai/v1",
  },
  "openai-compatible": {
    model: "gpt-4o-mini",
    baseUrl: "https://api.openai.com/v1",
  },
  gemini: {
    model: "gemini-2.0-flash",
  },
  ollama: {
    model: "llama3.2",
    baseUrl: "http://localhost:11434/v1",
  },
};
