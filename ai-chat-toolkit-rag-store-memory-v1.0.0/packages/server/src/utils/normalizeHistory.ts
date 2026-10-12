import type { ChatMessage } from "../types.js";

const ALLOWED_ROLES = new Set(["user", "assistant"]);

export function normalizeHistory(
  history: ChatMessage[] | undefined,
): ChatMessage[] {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .filter(
      (entry): entry is ChatMessage =>
        Boolean(entry) &&
        typeof entry.content === "string" &&
        ALLOWED_ROLES.has(entry.role),
    )
    .map((entry) => ({
      role: entry.role,
      content: entry.content.trim(),
    }))
    .filter((entry) => entry.content.length > 0);
}
