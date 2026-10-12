import type { RagSource } from "ai-chat-toolkit-rag";
import { loadLocalDocuments, type LocalSourceOptions } from "./loadLocalDocuments.js";

export function localSource(options: LocalSourceOptions): RagSource {
  return {
    load: () => loadLocalDocuments(options),
  };
}
