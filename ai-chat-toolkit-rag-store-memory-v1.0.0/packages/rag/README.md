# ai-chat-toolkit-rag

Optional RAG plugin for [ai-chat-toolkit-server](https://www.npmjs.com/package/ai-chat-toolkit-server). Index documents from pluggable sources, embed and store chunks, and inject retrieved context before each LLM call via the server plugin API.

**Current release:** 0.1.1 (configurable embeddings)

## Install

```bash
npm install ai-chat-toolkit-rag@^0.1.1 ai-chat-toolkit-server@^1.2.0
```

You also need a compatible `RagSource` and `RagStore` implementation (separate packages or your own adapters). This core package defines the contracts only.

## Usage

```js
const { rag } = require("ai-chat-toolkit-rag");
// or: import { rag } from "ai-chat-toolkit-rag";

server.use(
  rag({
    sources: [],
    store: null,
    embeddings: {
      provider: "openai",
      apiKey: process.env.OPENAI_API_KEY,
      model: "text-embedding-3-small",
    },
    chunking: {
      chunkSize: 1000,
      overlap: 200,
    },
  }),
);
```

With your own source and store adapters:

```js
server.use(
  rag({
    sources: [mySource],
    store: myStore,
    embeddings: {
      provider: "openai",
      apiKey: process.env.OPENAI_API_KEY,
    },
  }),
);

// Optional explicit re-index
await ragPlugin.index();
```

## Plugin behavior

1. `rag(options)` returns `{ install(server), index() }`.
2. `install(server)` registers a before-LLM hook on the server.
3. If `sources` and `store` are provided, indexing starts automatically on install (non-blocking).
4. On each user message, the plugin embeds the question, searches the store, and returns `{ context }` for the server to append to the system prompt.
5. Missing source/store, indexing failures, and retrieval failures are handled safely — the chat request continues without RAG context.

## Contracts

### RagSource

```js
{
  async load() {
    return [{ id, text, metadata }];
  }
}
```

### RagStore

```js
{
  add(chunksWithEmbeddings) {},
  search(queryEmbedding, { limit }) {
    return [{ chunk, score }];
  }
}
```

### Exported types

- `RagDocument`, `RagChunk`, `RagChunkWithEmbedding`
- `RagSearchResult`, `RagSource`, `RagStore`
- `RagOptions`, `RagEmbeddingsConfig`, `RagChunkingConfig`

## Chunking

Defaults:

- `chunkSize`: 1000
- `overlap`: 200

Each chunk includes `id`, `documentId`, `text`, and `metadata` (document metadata plus chunk position fields).

Helpers: `chunkDocument`, `chunkDocuments`, `resolveChunkingConfig`.

## Embeddings

OpenAI (default model `text-embedding-3-small`):

```js
embeddings: {
  provider: "openai",
  apiKey: process.env.OPENAI_API_KEY,
  model: "text-embedding-3-small",
}
```

### Environment-based config

```js
import { rag, embeddingsFromEnv } from "ai-chat-toolkit-rag";

server.use(
  rag({
    sources: [mySource],
    store: myStore,
    embeddings: embeddingsFromEnv({
      provider: process.env.EMBEDDING_PROVIDER,
      apiKey: process.env.EMBEDDING_API_KEY || process.env.OPENAI_API_KEY,
      model: process.env.EMBEDDING_MODEL,
      baseUrl: process.env.EMBEDDING_BASE_URL,
    }),
  }),
);
```

| Input | Typical env var | Default |
|-------|-----------------|---------|
| `provider` | `EMBEDDING_PROVIDER` | `openai` |
| `apiKey` | `EMBEDDING_API_KEY` | — |
| `model` | `EMBEDDING_MODEL` | per-provider default |
| `baseUrl` | `EMBEDDING_BASE_URL` | per-provider default |

Google, Cohere, and Voyage have defaults in `EMBEDDING_PROVIDER_DEFAULTS`; only **openai** is implemented today.

Custom embedder:

```js
embeddings: {
  provider: "custom",
  embed: async (text) => [/* number[] */],
}
```

## Peer dependency

Requires `ai-chat-toolkit-server@^1.2.0` (plugin API with `server.use()` and `registerBeforeLLMHook()`).

The server package does **not** depend on this package.

## License

MIT
