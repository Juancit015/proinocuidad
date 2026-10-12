import { toErrorMessage } from "../utils/errors.js";
import type { BeforeLLMHook, BeforeLLMHookInput } from "./types.js";

export async function runBeforeLLMHooks(
  hooks: BeforeLLMHook[],
  input: BeforeLLMHookInput,
): Promise<string | undefined> {
  const parts: string[] = [];

  for (const hook of hooks) {
    try {
      const result = await hook(input);
      const context = result?.context?.trim();
      if (context) {
        parts.push(context);
      }
    } catch (error) {
      console.error(
        "[ai-chat-toolkit-server] beforeLLM hook failed:",
        toErrorMessage(error),
      );
    }
  }

  if (parts.length === 0) {
    return undefined;
  }

  return parts.join("\n\n");
}
