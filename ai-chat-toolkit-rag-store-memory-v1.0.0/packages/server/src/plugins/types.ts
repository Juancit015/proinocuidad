import type { Request } from "express";

export interface BeforeLLMHookHistoryEntry {
  role: "user" | "assistant";
  content: string;
}

export interface BeforeLLMHookInput {
  message: string;
  history: BeforeLLMHookHistoryEntry[];
  request: Request;
}

export interface BeforeLLMHookResult {
  /** Optional text appended to the system prompt before the LLM call. */
  context?: string;
}

export type BeforeLLMHook = (
  input: BeforeLLMHookInput,
) =>
  | Promise<BeforeLLMHookResult | void>
  | BeforeLLMHookResult
  | void;

export interface AiChatServerPluginHost {
  registerBeforeLLMHook(hook: BeforeLLMHook): void;
}

export interface AiChatServerPlugin {
  install(server: AiChatServerPluginHost): void;
}
