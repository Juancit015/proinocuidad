# ai-chat-toolkit-rag-source-local

Local filesystem source adapter for [ai-chat-toolkit-rag](https://www.npmjs.com/package/ai-chat-toolkit-rag).

**Current release:** 0.1.0

## Install

```bash
npm install ai-chat-toolkit-rag-source-local ai-chat-toolkit-rag@^0.1.0
```

## Usage

```js
const { localSource } = require("ai-chat-toolkit-rag-source-local");
// or: import { localSource } from "ai-chat-toolkit-rag-source-local";

const source = localSource({
  path: "./docs",
});
```

Use with `rag()`:

```js
server.use(
  rag({
    sources: [localSource({ path: "./docs" })],
    store: memoryStore(),
    embeddings: { /* ... */ },
  }),
);
```

## Supported files

Recursively reads:

- `.txt`
- `.md`
- `.json`

Unsupported extensions are ignored. Missing folders and unreadable files are handled safely (empty results or skipped files with a warning).

## Document metadata

Each `RagDocument` includes:

- `filePath` — path relative to the source root
- `extension` — file extension without the dot
- `modifiedAt` — ISO timestamp from the file mtime

## Peer dependency

Requires `ai-chat-toolkit-rag@^0.1.0`.

## License

MIT
