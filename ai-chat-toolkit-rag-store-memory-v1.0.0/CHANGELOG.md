# Changelog

All notable changes to this monorepo are documented here.

Each published package also has its own changelog (included on npm):

| Package | Changelog | Current version |
|---------|-----------|-----------------|
| ai-chat-toolkit-server | [packages/server/CHANGELOG.md](./packages/server/CHANGELOG.md) | 1.2.1 |
| ai-chat-toolkit-widget | [packages/widget/CHANGELOG.md](./packages/widget/CHANGELOG.md) | 1.0.0 |
| ai-chat-toolkit-rag | [packages/rag/CHANGELOG.md](./packages/rag/CHANGELOG.md) | 0.1.1 |
| ai-chat-toolkit-rag-source-local | [packages/rag-source-local/CHANGELOG.md](./packages/rag-source-local/CHANGELOG.md) | 1.0.0 |
| ai-chat-toolkit-rag-store-memory | [packages/rag-store-memory/CHANGELOG.md](./packages/rag-store-memory/CHANGELOG.md) | 1.0.0 |

Versioning follows [Semantic Versioning](https://semver.org/) per package. Packages release independently with prefixed git tags (`server-v*`, `widget-v*`, `rag-v*`).

## Recent releases

### 2026-05-30

- **ai-chat-toolkit-rag-source-local@1.0.0** — filesystem `RagSource` for `.txt`, `.md`, and `.json` documents ([details](./packages/rag-source-local/CHANGELOG.md#100--2026-05-30))
- **ai-chat-toolkit-rag-store-memory@1.0.0** — in-memory `RagStore` with cosine similarity search ([details](./packages/rag-store-memory/CHANGELOG.md#100--2026-05-30))

### 2026-06-15

- **ai-chat-toolkit-server@1.2.1** — `serverOptionsFromEnv()` for env-based chat provider config ([details](./packages/server/CHANGELOG.md#121--unreleased))

### 2026-06-14

- **ai-chat-toolkit-server@1.2.0** — generic plugin support and before-LLM hooks ([details](./packages/server/CHANGELOG.md#120--2026-06-14))
- **ai-chat-toolkit-rag@0.1.0** — initial optional RAG plugin ([details](./packages/rag/CHANGELOG.md#010--2026-06-14))

### 2026-06-09

- **ai-chat-toolkit-server@1.1.0** — opt-in LangChain orchestration ([details](./packages/server/CHANGELOG.md#110--2026-06-09))

### 2026-06-01

- **ai-chat-toolkit-server@1.0.0** — first stable server release ([details](./packages/server/CHANGELOG.md#100--2026-06-01))
- **ai-chat-toolkit-widget@1.0.0** — first stable widget release ([details](./packages/widget/CHANGELOG.md#100--2026-06-01))
