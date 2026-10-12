import type { AiTool, LLMMessage, ProviderCompletionResult } from "../types.js";

export interface LLMProvider {
  readonly name: string;
  readonly supportsToolCalling: boolean;
  complete(
    messages: LLMMessage[],
    tools?: AiTool[],
  ): Promise<ProviderCompletionResult>;
}
