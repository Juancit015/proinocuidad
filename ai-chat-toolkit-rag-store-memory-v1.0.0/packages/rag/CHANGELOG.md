# Changelog

All notable changes to **ai-chat-toolkit-rag** are documented here.

Versioning follows [Semantic Versioning](https://semver.org/).

## [0.1.1] — 2026-06-15

- **Configurable embeddings** — `resolveEmbeddingsConfig()`, `embeddingsFromEnv()`, and `EMBEDDING_PROVIDER_DEFAULTS` for provider, apiKey, model, and baseUrl.
- **Provider types** — `EmbeddingProvider`, `ProviderEmbeddingsConfig`; Google, Cohere, and Voyage typed with defaults (only OpenAI implemented).
- **OpenAI fallbacks** — `createOpenAIEmbedder()` applies default model/baseUrl from central defaults when omitted.

## [0.1.0] — 2026-06-14

- Added initial optional RAG plugin via `rag(options)` and `server.use(rag(...))`.
- Added chunking with configurable `chunkSize` and `overlap` (defaults 1000 / 200).
- Added OpenAI embeddings support and custom embedder option.
- Added source/store contracts: `RagSource`, `RagStore`, `RagDocument`, `RagChunk`, `RagSearchResult`.
- Added before-LLM context injection using the ai-chat-toolkit-server plugin API.
- Added explicit `ragPlugin.index()` for manual re-indexing.

[0.1.0]: https://github.com/sudheeshshetty/ai-chat-toolkit/releases/tag/rag-v0.1.0
