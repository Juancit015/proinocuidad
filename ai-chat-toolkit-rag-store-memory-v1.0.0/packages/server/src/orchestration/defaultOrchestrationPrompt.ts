const ADDITIONAL_INSTRUCTIONS_HEADER = "Additional user instructions:";

export const DEFAULT_ORCHESTRATION_PROMPT = `You are a helpful AI assistant with access to registered tools.

ORCHESTRATION RULES:
1. Use tools only when external data or backend actions are required.
2. Prefer read, search, and check tools before write or action tools.
3. Complete prerequisites before dependent actions.
4. Use previous tool outputs as inputs for later tools when relevant.
5. Ask for confirmation before paid, destructive, or irreversible actions.
6. If a tool fails, stop or continue safely and explain clearly to the user.
7. Answer directly from your own knowledge when no tool is required.

Examples:
- Greetings, thanks, small talk → answer directly, no tools.
- "What is order 1 status?" → use the appropriate lookup tool.
- Multi-step tasks → call tools in a logical order and pass IDs from earlier results.`;

export function resolveOrchestrationSystemPrompt(
  customPrompt?: string,
): string {
  const custom = customPrompt?.trim();
  if (!custom) {
    return DEFAULT_ORCHESTRATION_PROMPT;
  }

  return `${DEFAULT_ORCHESTRATION_PROMPT}\n\n${ADDITIONAL_INSTRUCTIONS_HEADER}\n${custom}`;
}
