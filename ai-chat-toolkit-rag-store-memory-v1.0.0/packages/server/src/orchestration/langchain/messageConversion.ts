import {
  AIMessage,
  HumanMessage,
  type BaseMessage,
} from "@langchain/core/messages";
import type { ChatMessage, LLMMessage, ProviderToolCall } from "../../types.js";

export function chatHistoryToLangChainMessages(
  history: ChatMessage[],
  userMessage: string,
): BaseMessage[] {
  const messages: BaseMessage[] = [];

  for (const entry of history) {
    if (entry.role === "user") {
      messages.push(new HumanMessage(entry.content));
    } else if (entry.role === "assistant") {
      messages.push(new AIMessage(entry.content));
    }
  }

  messages.push(new HumanMessage(userMessage));
  return messages;
}

export function langChainMessagesToLLMMessages(
  messages: BaseMessage[],
): LLMMessage[] {
  const result: LLMMessage[] = [];

  for (const message of messages) {
    const type = message._getType();

    if (type === "system") {
      result.push({ role: "system", content: stringifyContent(message.content) });
      continue;
    }

    if (type === "human") {
      result.push({ role: "user", content: stringifyContent(message.content) });
      continue;
    }

    if (type === "ai") {
      const aiMessage = message as AIMessage;
      const toolCalls = extractToolCalls(aiMessage);
      result.push({
        role: "assistant",
        content: stringifyContent(aiMessage.content),
        toolCalls: toolCalls.length > 0 ? toolCalls : undefined,
      });
      continue;
    }

    if (type === "tool") {
      result.push({
        role: "tool",
        content: stringifyContent(message.content),
        toolCallId: (message as { tool_call_id?: string }).tool_call_id ?? "",
      });
    }
  }

  return result;
}

function extractToolCalls(message: AIMessage): ProviderToolCall[] {
  if (!message.tool_calls?.length) {
    return [];
  }

  return message.tool_calls.map((call) => ({
    id: call.id ?? crypto.randomUUID(),
    name: call.name,
    arguments:
      typeof call.args === "object" && call.args !== null
        ? (call.args as Record<string, unknown>)
        : {},
  }));
}

function stringifyContent(content: BaseMessage["content"]): string {
  if (typeof content === "string") {
    return content;
  }
  if (Array.isArray(content)) {
    return content
      .map((block) => {
        if (typeof block === "string") {
          return block;
        }
        if (block && typeof block === "object" && "text" in block) {
          return String((block as { text?: unknown }).text ?? "");
        }
        return "";
      })
      .join("");
  }
  return String(content ?? "");
}

export function extractFinalAssistantText(messages: BaseMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    const message = messages[i];
    if (message._getType() !== "ai") {
      continue;
    }

    const text = stringifyContent(message.content).trim();
    if (text) {
      return text;
    }
  }

  return "I could not complete the request.";
}
