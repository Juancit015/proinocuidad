export function mergeHookContextIntoSystemContent(
  systemPrompt: string | undefined,
  hookContext: string | undefined,
): string | undefined {
  const parts: string[] = [];

  if (systemPrompt?.trim()) {
    parts.push(systemPrompt.trim());
  }

  if (hookContext?.trim()) {
    parts.push(hookContext.trim());
  }

  if (parts.length === 0) {
    return undefined;
  }

  return parts.join("\n\n");
}
