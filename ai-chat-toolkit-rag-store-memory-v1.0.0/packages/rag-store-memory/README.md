# ai-chat-toolkit-rag-store-memory

In-memory vector store adapter for [ai-chat-toolkit-rag](https://www.npmjs.com/package/ai-chat-toolkit-rag).

**Current release:** 1.0.0

## Install

```bash
npm install ai-chat-toolkit-rag-store-memory ai-chat-toolkit-rag@^0.1.1
```

## Usage

```js
const { memoryStore } = require("ai-chat-toolkit-rag-store-memory");
// or: import { memoryStore } from "ai-chat-toolkit-rag-store-memory";

server.use(
  rag({
    sources: [localSource({ path: "./docs" })],
    store: memoryStore(),
    embeddings: {
      provider: "openai",
      apiKey: process.env.OPENAI_API_KEY,
    },
  }),
);
```

## Behavior

- Stores chunk embeddings in process memory (no persistence)
- Searches with cosine similarity
- Returns top matches as `RagSearchResult[]` (respects `search.limit` from `rag()` options)

## Peer dependency

Requires `ai-chat-toolkit-rag@^0.1.1`.

## License

MIT
