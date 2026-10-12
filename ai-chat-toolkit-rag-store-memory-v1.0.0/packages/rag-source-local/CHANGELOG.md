# Changelog

All notable changes to **ai-chat-toolkit-rag-source-local** are documented here.

Versioning follows [Semantic Versioning](https://semver.org/).

## [1.0.0] — 2026-05-30

First stable release.

- **`localSource(options)`** — factory that returns a `RagSource` for use with `rag()` from `ai-chat-toolkit-rag`.
- **Recursive directory scan** — walks subfolders under a configurable root `path` and loads matching files.
- **Supported formats** — `.txt`, `.md`, and `.json`; other extensions are ignored.
- **JSON documents** — valid JSON is pretty-printed into text; invalid JSON is kept as raw file content.
- **Document metadata** — each `RagDocument` includes `filePath` (relative to the root), `extension`, and `modifiedAt` (ISO mtime).
- **Stable document ids** — `id` is the relative file path within the source root.
- **Resilience** — missing folders, non-directory paths, unreadable files, and empty files are handled safely (empty results or skipped files with a console warning; no thrown errors).
- **Peer dependency** — requires `ai-chat-toolkit-rag@^0.1.1`.

[1.0.0]: https://github.com/sudheeshshetty/ai-chat-toolkit/releases/tag/rag-source-local-v1.0.0
