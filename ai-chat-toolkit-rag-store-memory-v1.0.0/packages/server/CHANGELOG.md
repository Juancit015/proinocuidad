# Changelog

All notable changes to **ai-chat-toolkit-server** are documented here.

Versioning follows [Semantic Versioning](https://semver.org/).

## [1.2.1] — 2026-06-15

- **`serverOptionsFromEnv()`** — build `AiChatServer` options from env-style inputs (`provider`, `apiKey`, `model`, `baseUrl`).
- **Provider aliases** — `openai` maps to `openai-compatible`; unknown/missing provider defaults to `groq`.
- **Defaults** — `CHAT_PROVIDER_DEFAULTS` and `DEFAULT_CHAT_PROVIDER` exported for per-provider model/base URL defaults.

## [1.2.0] — 2026-06-14

Backward-compatible minor release. Default behavior is unchanged — existing apps work without code changes.

- **Generic plugin support** — `server.use(plugin)` calls `plugin.install(server)` for optional extensions.
- **Before-LLM hooks** — `server.registerBeforeLLMHook(fn)` runs registered hooks before each LLM call; returned `context` is appended to the system prompt (native and LangChain paths).
- **New exported types** — `AiChatServerPlugin`, `AiChatServerPluginHost`, `BeforeLLMHook`, `BeforeLLMHookInput`, `BeforeLLMHookResult`.
- **Hook resilience** — hook failures are logged and do not crash the request.
- **Tests** — plugin install, hook registration, context injection, and backward compatibility coverage.

**GitHub tag:** [server-v1.2.0](https://github.com/sudheeshshetty/ai-chat-toolkit/compare/server-v1.1.0...server-v1.2.0)

## [1.1.0] — 2026-06-09

**Why minor, not major?** This release adds an optional orchestration mode. Default behavior is unchanged (`orchestration: "native"`). No routes, request/response shapes, or existing options were removed or renamed. Existing apps that do not set `orchestration` behave exactly as in 1.0.0.

- **LangChain orchestration (opt-in)** — `orchestration: "langchain"` for multi-step tool chaining via an internal LangChain agent loop. Default remains `"native"` (the original server-owned tool loop).
- **New optional option** — `orchestration?: "native" | "langchain"` on `AiChatServerOptions`.
- **New exported type** — `OrchestrationMode`.
- **Dependencies** — `langchain`, `@langchain/core`, and `zod` added as regular dependencies (install footprint grows even when using `"native"`; behavior does not change).
- **Tests** — orchestration prompt merge and `LangChainAgentOrchestrator` coverage (direct reply, single tool, multi-tool chain, tool failure).
- **Example** — `examples/langchain-orchestration/` (npm packages, ports 5174 / 3335).

**GitHub tag:** [server-v1.1.0](https://github.com/sudheeshshetty/ai-chat-toolkit/releases/tag/server-v1.1.0)

## [1.0.0] — 2026-06-01

First stable release.

- Express `AiChatServer` with OpenAI-compatible, Groq, Gemini, and Ollama providers
- MCP-style tool registration and tool-call loop
- Scoped CORS on chat routes only
- Credentials-safe CORS (explicit origin allowlist when `credentials: true`)
- Optional `systemPrompt`, `maxToolRounds`, and custom chat path

**GitHub tag:** [server-v1.0.0](https://github.com/sudheeshshetty/ai-chat-toolkit/releases/tag/server-v1.0.0)

[1.2.0]: https://github.com/sudheeshshetty/ai-chat-toolkit/compare/server-v1.1.0...server-v1.2.0
[1.1.0]: https://github.com/sudheeshshetty/ai-chat-toolkit/releases/tag/server-v1.1.0
[1.0.0]: https://github.com/sudheeshshetty/ai-chat-toolkit/releases/tag/server-v1.0.0
