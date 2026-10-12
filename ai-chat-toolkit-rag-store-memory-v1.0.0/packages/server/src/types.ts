import type { Request } from "express";

export type ChatRole = "user" | "assistant" | "system" | "tool";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export type SupportedProvider =
  | "openai-compatible"
  | "groq"
  | "gemini"
  | "ollama";

export interface CorsOptions {
  origin?: string | string[] | boolean;
}

export type OrchestrationMode = "native" | "langchain";

export interface AiChatServerOptions {
  path?: string;
  provider: SupportedProvider;
  apiKey?: string;
  model: string;
  baseUrl?: string;
  systemPrompt?: string;
  maxToolRounds?: number;
  /** Default: "native" (existing provider loop). Use "langchain" for multi-step tool orchestration. */
  orchestration?: OrchestrationMode;
  cors?: CorsOptions;
}

export interface AiTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  handler: (
    input: Record<string, unknown>,
    context: ToolExecutionContext,
  ) => Promise<unknown> | unknown;
  requiresConfirmation?: boolean;
}

export interface ToolExecutionContext {
  request: Request;
  headers: Record<string, string | string[] | undefined>;
}

export interface ChatRequestBody {
  message: string;
  history?: ChatMessage[];
}

export interface ChatResponseBody {
  message: string;
}

export interface HealthResponseBody {
  status: string;
  package: string;
}

export interface ToolsListResponseBody {
  tools: Array<{
    name: string;
    description: string;
  }>;
}

export interface ProviderToolCall {
  id: string;
  name: string;
  arguments: Record<string, unknown>;
}

export interface CompletionResult {
  type: "message";
  content: string;
}

export interface ToolCallsResult {
  type: "tool_calls";
  toolCalls: ProviderToolCall[];
  /** Raw assistant message content if any (OpenAI-compatible). */
  content?: string | null;
}

export type ProviderCompletionResult = CompletionResult | ToolCallsResult;

export interface LLMMessage {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
  toolCallId?: string;
  toolCalls?: ProviderToolCall[];
}

export interface ProviderConfig {
  provider: SupportedProvider;
  apiKey?: string;
  model: string;
  baseUrl?: string;
}
