import type { LLMProvider } from "../../providers/LLMProvider.js";
import type {
  AiTool,
  LLMMessage,
  ProviderCompletionResult,
} from "../../types.js";

export class MockLLMProvider implements LLMProvider {
  readonly name = "mock";
  readonly supportsToolCalling = true;

  readonly completeCalls: LLMMessage[][] = [];
  readonly #responses: ProviderCompletionResult[];

  constructor(responses: ProviderCompletionResult[]) {
    this.#responses = [...responses];
  }

  async complete(
    messages: LLMMessage[],
    _tools?: AiTool[],
  ): Promise<ProviderCompletionResult> {
    this.completeCalls.push(structuredClone(messages));

    const next = this.#responses.shift();
    if (!next) {
      throw new Error("MockLLMProvider has no more scripted responses.");
    }

    return next;
  }
}
