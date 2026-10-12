import type { Express, Request } from "express";
import { createProvider } from "./providers/ProviderFactory.js";
import type { LLMProvider } from "./providers/LLMProvider.js";
import { ToolRegistry } from "./tool-registry/ToolRegistry.js";
import { runBeforeLLMHooks } from "./plugins/runBeforeLLMHooks.js";
import { mergeHookContextIntoSystemContent } from "./plugins/systemPrompt.js";
import type {
  AiChatServerOptions,
  AiTool,
  ChatMessage,
  CorsOptions,
  HealthResponseBody,
  LLMMessage,
  ToolsListResponseBody,
} from "./types.js";
import type {
  AiChatServerPlugin,
  AiChatServerPluginHost,
  BeforeLLMHook,
} from "./plugins/types.js";
import { AiChatServerError } from "./utils/errors.js";
import { normalizeHistory } from "./utils/normalizeHistory.js";
import { LangChainAgentOrchestrator } from "./orchestration/langchain/LangChainAgentOrchestrator.js";
import {
  attachExpressRoutes,
} from "./express/attachExpressRoutes.js";

const DEFAULT_PATH = "/ai-chat/custom";
const DEFAULT_MAX_TOOL_ROUNDS = 3;
const PACKAGE_NAME = "ai-chat-toolkit-server";

export class AiChatServer implements AiChatServerPluginHost {
  readonly chatPath: string;
  readonly corsOptions: CorsOptions | undefined;

  readonly #provider: LLMProvider;
  readonly #toolRegistry = new ToolRegistry();
  readonly #systemPrompt?: string;
  readonly #maxToolRounds: number;
  readonly #orchestration: "native" | "langchain";
  readonly #langChainOrchestrator?: LangChainAgentOrchestrator;
  readonly #beforeLLMHooks: BeforeLLMHook[] = [];

  constructor(options: AiChatServerOptions) {
    this.chatPath = normalizeChatPath(options.path ?? DEFAULT_PATH);
    this.corsOptions = options.cors;
    this.#systemPrompt = options.systemPrompt;
    this.#maxToolRounds = options.maxToolRounds ?? DEFAULT_MAX_TOOL_ROUNDS;
    this.#orchestration = options.orchestration ?? "native";
    this.#provider = createProvider(options);

    if (this.#orchestration === "langchain") {
      this.#langChainOrchestrator = new LangChainAgentOrchestrator({
        provider: this.#provider,
        toolRegistry: this.#toolRegistry,
        systemPrompt: this.#systemPrompt,
        maxToolRounds: this.#maxToolRounds,
      });
    }
  }

  use(plugin: AiChatServerPlugin): this {
    plugin.install(this);
    return this;
  }

  registerBeforeLLMHook(hook: BeforeLLMHook): void {
    this.#beforeLLMHooks.push(hook);
  }

  addTools(tools: AiTool[]): this {
    this.#toolRegistry.register(tools);
    return this;
  }

  attach(app: Express): this {
    attachExpressRoutes(app, this);
    return this;
  }

  getHealthResponse(): HealthResponseBody {
    return {
      status: "ok",
      package: PACKAGE_NAME,
    };
  }

  getToolsResponse(): ToolsListResponseBody {
    return { tools: this.#toolRegistry.list() };
  }

  async handleChat(input: {
    message: string;
    history?: ChatMessage[];
    request: Request;
  }): Promise<string> {
    const userMessage = input.message.trim();
    if (!userMessage) {
      throw new AiChatServerError("Message cannot be empty.", 400);
    }

    const history = normalizeHistory(input.history);

    const tools = this.#toolRegistry.hasTools()
      ? this.#toolRegistry.getAll()
      : undefined;

    if (tools?.length && !this.#provider.supportsToolCalling) {
      throw new AiChatServerError(
        `Provider "${this.#provider.name}" does not support tool calling.`,
        501,
      );
    }

    const context = {
      request: input.request,
      headers: input.request.headers,
    };

    const hookContext = await runBeforeLLMHooks(this.#beforeLLMHooks, {
      message: userMessage,
      history: history.filter(
        (entry): entry is ChatMessage & { role: "user" | "assistant" } =>
          entry.role === "user" || entry.role === "assistant",
      ),
      request: input.request,
    });

    if (this.#orchestration === "langchain" && this.#langChainOrchestrator) {
      return this.#langChainOrchestrator.run({
        history,
        userMessage,
        context,
        hookContext,
      });
    }

    let messages = this.#buildInitialMessages(history, userMessage, hookContext);

    for (let round = 0; round < this.#maxToolRounds; round++) {
      const result = await this.#provider.complete(messages, tools);

      if (result.type === "message") {
        return result.content;
      }

      messages.push({
        role: "assistant",
        content: result.content ?? "",
        toolCalls: result.toolCalls,
      });

      const toolResults = await this.#toolRegistry.executeAll(
        result.toolCalls,
        context,
      );

      for (const { toolCallId, output } of toolResults) {
        messages.push({
          role: "tool",
          content: output,
          toolCallId,
        });
      }
    }

    const final = await this.#provider.complete(messages, undefined);
    if (final.type === "message") {
      return final.content;
    }

    return "I could not complete the request within the allowed tool rounds.";
  }

  #buildInitialMessages(
    history: ChatMessage[],
    userMessage: string,
    hookContext?: string,
  ): LLMMessage[] {
    const messages: LLMMessage[] = [];

    const systemContent = mergeHookContextIntoSystemContent(
      this.#systemPrompt,
      hookContext,
    );

    if (systemContent) {
      messages.push({ role: "system", content: systemContent });
    }

    for (const entry of history) {
      messages.push({ role: entry.role, content: entry.content });
    }

    messages.push({ role: "user", content: userMessage });
    return messages;
  }
}

function normalizeChatPath(path: string): string {
  const trimmed = path.trim();
  if (!trimmed) {
    return DEFAULT_PATH;
  }
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}
