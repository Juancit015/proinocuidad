import { formatSearchResultsAsContext } from "../context/formatSearchResults.js";
import type {
  EmbedTextFn,
  RagStore,
  ResolvedRagSearchConfig,
} from "../types.js";

export interface RetrieveContextInput {
  message: string;
  store: RagStore | null | undefined;
  embed: EmbedTextFn;
  search: ResolvedRagSearchConfig;
}

export async function retrieveContext(
  input: RetrieveContextInput,
): Promise<string | undefined> {
  const { message, store, embed, search } = input;
  const query = message.trim();

  if (!store || !query) {
    return undefined;
  }

  const queryEmbedding = await embed(query);
  const results = await Promise.resolve(
    store.search(queryEmbedding, { limit: search.limit }),
  );

  return formatSearchResultsAsContext(results);
}
