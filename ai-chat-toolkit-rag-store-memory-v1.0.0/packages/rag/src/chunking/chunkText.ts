import type { RagChunk, RagDocument, ResolvedRagChunkingConfig } from "../types.js";

export const DEFAULT_CHUNK_SIZE = 1000;
export const DEFAULT_CHUNK_OVERLAP = 200;

export function resolveChunkingConfig(
  chunking?: { chunkSize?: number; overlap?: number },
): ResolvedRagChunkingConfig {
  const chunkSize = chunking?.chunkSize ?? DEFAULT_CHUNK_SIZE;
  const overlap = chunking?.overlap ?? DEFAULT_CHUNK_OVERLAP;

  if (chunkSize <= 0) {
    throw new Error("chunkSize must be greater than 0.");
  }

  if (overlap < 0) {
    throw new Error("overlap must be 0 or greater.");
  }

  if (overlap >= chunkSize) {
    throw new Error("overlap must be smaller than chunkSize.");
  }

  return { chunkSize, overlap };
}

export function chunkDocument(
  document: RagDocument,
  config: ResolvedRagChunkingConfig,
): RagChunk[] {
  const text = document.text ?? "";
  if (!text.trim()) {
    return [];
  }

  const { chunkSize, overlap } = config;
  const step = chunkSize - overlap;
  const chunks: RagChunk[] = [];

  for (let start = 0; start < text.length; start += step) {
    const end = Math.min(start + chunkSize, text.length);
    const chunkText = text.slice(start, end);
    const chunkIndex = chunks.length;

    chunks.push({
      id: `${document.id}#${chunkIndex}`,
      documentId: document.id,
      text: chunkText,
      metadata: {
        ...(document.metadata ?? {}),
        chunkIndex,
        chunkStart: start,
        chunkEnd: end,
      },
    });

    if (end >= text.length) {
      break;
    }
  }

  return chunks;
}

export function chunkDocuments(
  documents: RagDocument[],
  config: ResolvedRagChunkingConfig,
): RagChunk[] {
  return documents.flatMap((document) => chunkDocument(document, config));
}
