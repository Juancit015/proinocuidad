# Changelog

All notable changes to **ai-chat-toolkit-rag-store-memory** are documented here.

Versioning follows [Semantic Versioning](https://semver.org/).

## [1.0.0] — 2026-05-30

First stable release.

- **`memoryStore()`** — factory that returns a `RagStore` for use with `rag()` from `ai-chat-toolkit-rag`.
- **In-process storage** — chunk embeddings are kept in memory for the lifetime of the store instance (no disk persistence).
- **Cosine similarity search** — ranks stored chunks by similarity to the query embedding and returns `RagSearchResult[]`.
- **Configurable limit** — respects `search.limit` from `rag()` options; defaults to 5 when omitted.
- **Immutable search results** — search copies and sorts chunks without mutating the underlying store.
- **Peer dependency** — requires `ai-chat-toolkit-rag@^0.1.1`.

[1.0.0]: https://github.com/sudheeshshetty/ai-chat-toolkit/releases/tag/rag-store-memory-v1.0.0
