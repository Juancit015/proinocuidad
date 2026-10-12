# ai-chat-toolkit

Open-source toolkit for embedding an AI-powered chat widget in any web app, backed by your own Express server with LLM provider support and tool calling.

**Stable releases:** [`ai-chat-toolkit-widget@1.0.0`](https://www.npmjs.com/package/ai-chat-toolkit-widget/v/1.0.0) and [`ai-chat-toolkit-server@1.1.0`](https://www.npmjs.com/package/ai-chat-toolkit-server/v/1.1.0) on npm.

## Packages

| Package | Version | Description |
|---------|---------|-------------|
| [`ai-chat-toolkit-widget`](./packages/widget/) | [![npm](https://img.shields.io/npm/v/ai-chat-toolkit-widget)](https://www.npmjs.com/package/ai-chat-toolkit-widget) **1.0.0** | Embeddable Web Component (Shadow DOM, no framework required) |
| [`ai-chat-toolkit-server`](./packages/server/) | [![npm](https://img.shields.io/npm/v/ai-chat-toolkit-server)](https://www.npmjs.com/package/ai-chat-toolkit-server) **1.1.0** | Express backend with LLM providers + tool calling |

```
Your web app
    │
    ▼
<ai-chat> widget          ← ai-chat-toolkit-widget
    │  POST /ai-chat/custom
    ▼
Express backend           ← ai-chat-toolkit-server
    │
    ├── LLM Provider (OpenAI · Groq · Gemini · Ollama · …)
    │
    └── Your tools / APIs / database
```

---

## Quick start

### 1. Add the widget (CDN)

```html
<script src="https://cdn.jsdelivr.net/npm/ai-chat-toolkit-widget@1.0.0/dist/widget.global.js"></script>

<ai-chat
  title="AI Assistant"
  subtitle="How can I help?"
  backend-url="http://localhost:3000"
  path="/ai-chat/custom"
></ai-chat>
```

### 2. Add the backend (Express)

```bash
npm install ai-chat-toolkit-server@^1.1.0 express
```

```ts
import express from "express";
import { AiChatServer } from "ai-chat-toolkit-server";

const app = express();

const aiChat = new AiChatServer({
  provider: "groq",
  apiKey: process.env.API_KEY,
  model: "llama-3.3-70b-versatile",
  cors: { origin: "http://localhost:5173" },
});

aiChat.attach(app);
app.listen(3000, () => console.log("Listening on http://localhost:3000"));
```

The server now accepts `POST /ai-chat/custom` and the widget is ready to chat.

See [packages/server/README.md](./packages/server/README.md) for providers, tools, `systemPrompt`, CORS options, and security notes.

---

## Chat API contract

The widget and server communicate over a simple JSON API:

```
POST ${backend-url}${path}
Content-Type: application/json
```

**Request:**
```json
{
  "message": "What products do you have?",
  "history": [
    { "role": "user", "content": "Hi" },
    { "role": "assistant", "content": "Hello!" }
  ]
}
```

**Response:**
```json
{ "message": "Here are our products..." }
```

Any backend that follows this contract works with the widget — you don't have to use `ai-chat-toolkit-server`.

---

## Full Stack Demo

![Full Stack Demo — widget + server with tools](./docs/assets/demo-ai-chat-toolkit.gif)

End-to-end example using **`ai-chat-toolkit-widget@^1.0.0`** and **`ai-chat-toolkit-server@^1.1.0`** — a React frontend with the chat widget connected to a Groq-powered Express backend with three demo tools.

| Layer | URL |
|-------|-----|
| React + Vite frontend | http://localhost:5173 |
| Express + Groq backend | http://localhost:3334 |
| Chat endpoint | `POST /my-chat` |

### Run it

```bash
cd examples/full-stack-local
npm install
cp .env.example .env
# Edit .env: set API_KEY (get a free key at console.groq.com)
npm run dev
```

Open http://localhost:5173 and try the chat widget.

| Prompt | What it does |
|--------|-------------|
| "List products in Electronics" | Calls `get_products` tool |
| "What is the status of order 1?" | Calls `get_order_status` tool |
| "Find help articles about login" | Calls `get_support_articles` tool |

Details: [examples/full-stack-local/README.md](./examples/full-stack-local/README.md)

---

## Examples

All examples install published packages from npm and run standalone.

| Folder | What it shows |
|--------|---------------|
| [static-html](./examples/static-html/) | Widget via CDN `<script>` tag — no install needed |
| [react-consumer-example](./examples/react-consumer-example/) | Widget in a React + TypeScript app |
| [full-stack-local](./examples/full-stack-local/) | Widget + server + LLM tools working together |
| [langchain-orchestration](./examples/langchain-orchestration/) | LangChain internal orchestration (`orchestration: "langchain"`) |

See [examples/README.md](./examples/README.md) for guidance on which to use.

---

## Monorepo layout

```
ai-chat-toolkit/
├── packages/
│   ├── widget/                    # ai-chat-toolkit-widget (source)
│   └── server/                    # ai-chat-toolkit-server (source)
└── examples/
    ├── static-html/               # CDN usage example
    ├── react-consumer-example/    # React + npm widget example
    ├── full-stack-local/          # Widget + server + tools example
    └── langchain-orchestration/   # LangChain orchestration example
```

---

## Monorepo scripts

Examples under `examples/` use **`npm install`** and published packages. To work on package source, use **`pnpm`** from the repo root:

| Command | Description |
|---------|-------------|
| `pnpm build` | Build all packages |
| `pnpm clean` | Remove build artifacts |
| `pnpm dev:widget` | Watch-build widget |
| `pnpm dev:server` | Watch-build server |

---

## Publishing

Packages are released independently via GitHub Actions (manual dispatch):

| Workflow | Package | npm name |
|----------|---------|----------|
| **Release ai-chat-toolkit-widget** | `packages/widget` | `ai-chat-toolkit-widget` |
| **Release ai-chat-toolkit-server** | `packages/server` | `ai-chat-toolkit-server` |
| **Release ai-chat-toolkit-rag** | `packages/rag` | `ai-chat-toolkit-rag` |

Each workflow creates a prefixed git tag (`widget-v*`, `server-v*`, `rag-v*`) and publishes to npm. Use **`current`** to publish the version in `package.json`; use **patch** / **minor** / **major** to bump first. Requires `NPM_TOKEN` in repo secrets.

See [CHANGELOG.md](./CHANGELOG.md) for a monorepo overview, or each package's `CHANGELOG.md` for package-specific release notes.

---

## Development workflow

- **PR required** — changes merge into `main` through pull requests.
- **Build validation required** — the [CI workflow](.github/workflows/ci.yml) must pass (`build` check).
- **Maintainer review required** — see [.github/CODEOWNERS](.github/CODEOWNERS).

See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup and PR guidelines.

---

## Roadmap

- [x] Widget package
- [x] Server package with tool calling
- [ ] Streaming responses
- [ ] Gemini / Ollama tool calling
- [ ] Claude / Bedrock support
- [ ] Fastify / NestJS adapters

---

## License

MIT — see [LICENSE](./LICENSE).
