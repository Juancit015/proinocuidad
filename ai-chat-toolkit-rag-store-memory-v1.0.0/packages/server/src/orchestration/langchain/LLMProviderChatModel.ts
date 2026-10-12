import type { CallbackManagerForLLMRun } from "@langchain/core/callbacks/manager";
import {
  BaseChatModel,
  type BaseChatModelCallOptions,
  type BaseChatModelParams,
  type BindToolsInput,
} from "@langchain/core/language_models/chat_models";
import type { ChatResult } from "@langchain/core/outputs";
import { AIMessage, type BaseMessage } from "@langchain/core/messages";
import type { Runnable } from "@langchain/core/runnables";
import type { LLMProvider } from "../../providers/LLMProvider.js";
import type { AiTool } from "../../types.js";
import { langChainMessagesToLLMMessages } from "./messageConversion.js";

export interface LLMProviderChatModelFields extends BaseChatModelParams {
  provider: LLMProvider;
  aiTools: AiTool[];
}

export class LLMProviderChatModel extends BaseChatModel {
  static lc_name() {
    return "LLMProviderChatModel";
  }

  readonly #provider: LLMProvider;
  readonly #aiTools: AiTool[];
  #boundAiTools: AiTool[] | undefined;

  constructor(fields: LLMProviderChatModelFields) {
    super(fields);
    this.#provider = fields.provider;
    this.#aiTools = fields.aiTools;
  }

  _llmType(): string {
    return "ai-chat-toolkit-provider";
  }

  bindTools(
    tools: BindToolsInput[],
    kwargs?: Partial<BaseChatModelCallOptions>,
  ): Runnable {
    const toolNames = new Set(
      tools.map((tool) => {
        if ("name" in tool && typeof tool.name === "string") {
          return tool.name;
        }
        if ("function" in tool && tool.function?.name) {
          return tool.function.name;
        }
        return "";
      }).filter(Boolean),
    );

    this.#boundAiTools =
      toolNames.size > 0
        ? this.#aiTools.filter((tool) => toolNames.has(tool.name))
        : this.#aiTools;

    return this as unknown as Runnable;
  }

  async _generate(
    messages: BaseMessage[],
    _options: this["ParsedCallOptions"],
    _runManager?: CallbackManagerForLLMRun,
  ): Promise<ChatResult> {
    const llmMessages = langChainMessagesToLLMMessages(messages);
    const tools =
      this.#boundAiTools && this.#boundAiTools.length > 0
        ? this.#boundAiTools
        : undefined;

    const result = await this.#provider.complete(llmMessages, tools);

    if (result.type === "message") {
      return {
        generations: [
          {
            text: result.content,
            message: new AIMessage(result.content),
          },
        ],
      };
    }

    const toolCalls = result.toolCalls.map((call) => ({
      id: call.id,
      name: call.name,
      args: call.arguments,
      type: "tool_call" as const,
    }));

    return {
      generations: [
        {
          text: result.content ?? "",
          message: new AIMessage({
            content: result.content ?? "",
            tool_calls: toolCalls,
          }),
        },
      ],
    };
  }
}
