import type { RagSearchResult } from "../types.js";

export function formatSearchResultsAsContext(
  results: RagSearchResult[],
): string | undefined {
  if (results.length === 0) {
    return undefined;
  }

  const blocks = results.map((result, index) => {
    const prefix = `[${index + 1}]`;
    const text = result.chunk.text.trim();
    return text ? `${prefix} ${text}` : undefined;
  }).filter((block): block is string => Boolean(block));

  if (blocks.length === 0) {
    return undefined;
  }

  return `Relevant context:\n\n${blocks.join("\n\n")}`;
}
