import { chunkDocuments } from "../chunking/chunkText.js";
import type {
  EmbedTextFn,
  RagSource,
  RagStore,
  ResolvedRagChunkingConfig,
} from "../types.js";

export interface IndexDocumentsInput {
  sources: RagSource[];
  store: RagStore;
  embed: EmbedTextFn;
  chunking: ResolvedRagChunkingConfig;
}

export async function indexDocuments(input: IndexDocumentsInput): Promise<number> {
  const { sources, store, embed, chunking } = input;

  if (sources.length === 0) {
    return 0;
  }

  const documents = (
    await Promise.all(sources.map((source) => Promise.resolve(source.load())))
  ).flat();

  if (documents.length === 0) {
    return 0;
  }

  const chunks = chunkDocuments(documents, chunking);
  if (chunks.length === 0) {
    return 0;
  }

  const chunksWithEmbeddings = await Promise.all(
    chunks.map(async (chunk) => ({
      ...chunk,
      embedding: await embed(chunk.text),
    })),
  );

  await Promise.resolve(store.add(chunksWithEmbeddings));
  return chunksWithEmbeddings.length;
}
