import { resolveChunkingConfig } from "./chunking/chunkText.js";
import { createEmbedder } from "./embeddings/createEmbedder.js";
import { indexDocuments } from "./orchestration/indexDocuments.js";
import { retrieveContext } from "./orchestration/retrieveContext.js";
import type {
  EmbedTextFn,
  RagOptions,
  RagPluginHost,
  RagSource,
  RagStore,
  ResolvedRagSearchConfig,
} from "./types.js";

const DEFAULT_SEARCH_LIMIT = 5;
const LOG_PREFIX = "[ai-chat-toolkit-rag]";

export interface RagPlugin {
  install(server: RagPluginHost): void;
  index(): Promise<number>;
}

interface RagRuntimeState {
  sources: RagSource[];
  store: RagStore | null | undefined;
  embed: EmbedTextFn;
  chunking: ReturnType<typeof resolveChunkingConfig>;
  search: ResolvedRagSearchConfig;
}

function resolveSearchConfig(search?: { limit?: number }): ResolvedRagSearchConfig {
  return {
    limit: search?.limit ?? DEFAULT_SEARCH_LIMIT,
  };
}

function logError(message: string, error: unknown): void {
  const detail = error instanceof Error ? error.message : String(error);
  console.error(`${LOG_PREFIX} ${message}: ${detail}`);
}

function canIndex(state: RagRuntimeState): state is RagRuntimeState & { store: RagStore } {
  return Boolean(state.store) && state.sources.length > 0;
}

function createRuntimeState(options: RagOptions): RagRuntimeState {
  return {
    sources: options.sources ?? [],
    store: options.store ?? null,
    embed: createEmbedder(options.embeddings),
    chunking: resolveChunkingConfig(options.chunking),
    search: resolveSearchConfig(options.search),
  };
}

export function rag(options: RagOptions): RagPlugin {
  const state = createRuntimeState(options);

  async function index(): Promise<number> {
    if (!canIndex(state)) {
      return 0;
    }

    try {
      return await indexDocuments({
        sources: state.sources,
        store: state.store,
        embed: state.embed,
        chunking: state.chunking,
      });
    } catch (error) {
      logError("indexing failed", error);
      return 0;
    }
  }

  return {
    install(server: RagPluginHost) {
      if (canIndex(state)) {
        void index();
      }

      server.registerBeforeLLMHook(async ({ message }) => {
        if (!state.store) {
          return {};
        }

        try {
          const context = await retrieveContext({
            message,
            store: state.store,
            embed: state.embed,
            search: state.search,
          });

          return context ? { context } : {};
        } catch (error) {
          logError("retrieval failed", error);
          return {};
        }
      });
    },
    index,
  };
}
