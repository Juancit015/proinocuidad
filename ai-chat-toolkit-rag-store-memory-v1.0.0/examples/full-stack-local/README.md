# Full Stack Example

Complete example showing **`ai-chat-toolkit-widget@^1.0.0`** and **`ai-chat-toolkit-server@^1.1.0`** working together with a real LLM provider and custom tools.

Installs both packages from npm — the same way any production app would.

---

## What it includes

| Layer | URL |
|-------|-----|
| React + Vite frontend | http://localhost:5173 |
| Express + Groq backend | http://localhost:3334 |
| Chat endpoint | `POST /my-chat` |

Demo tools registered on the backend: `get_products`, `get_order_status`, `get_support_articles`

---

## Quick start

```bash
npm install
cp .env.example .env
# Edit .env: fill in your API_KEY
npm run dev
```

Open http://localhost:5173 and click the chat bubble.

---

## Environment variables

```env
API_KEY=              # Required — your LLM provider API key
MODEL=llama-3.3-70b-versatile
PORT=3334
```

Get a free Groq API key at [console.groq.com](https://console.groq.com). To switch providers, edit `server/index.ts` and update `API_KEY` and `MODEL` accordingly.

---

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start backend + Vite frontend (recommended) |
| `npm run dev:web` | Frontend only (port 5173) |
| `npm run dev:server` | Backend only (port 3334) |
| `npm run build` | Production build |

---

## Try the assistant

Open http://localhost:5173 and use the chat widget:

| Try asking… | What happens |
|-------------|-------------|
| "List products in Electronics" | Calls the `get_products` tool |
| "What is the status of order 1?" | Calls the `get_order_status` tool |
| "Find help articles about login" | Calls the `get_support_articles` tool |
| "Hi" / "Thank you" | Direct reply — no tool call needed |

---

## How the widget connects to the backend

The widget is configured with just a `path`:

```tsx
<ai-chat
  title="AI Assistant"
  subtitle="Ask about products, orders, or docs"
  primary-color="#2563eb"
  path="/my-chat"
/>
```

`backend-url` is omitted — the browser calls `http://localhost:5173/my-chat` and Vite proxies it to the backend on port 3334. No CORS configuration needed during development.

---

## Customizing the backend

Open `server/index.ts` to change the provider, system prompt, or registered tools:

```ts
const aiChat = new AiChatServer({
  provider: "groq",               // or "openai-compatible", "gemini", "ollama"
  apiKey: process.env.API_KEY,
  model: process.env.MODEL,
  systemPrompt: "You are a helpful assistant for...",
});
```

See the [ai-chat-toolkit-server docs](https://www.npmjs.com/package/ai-chat-toolkit-server) for all available options.

---

## Troubleshooting

**Server exits immediately with "API_KEY is not set"**

Open `.env` and fill in your `API_KEY`. If you haven't created `.env` yet, run `cp .env.example .env` first.

**Browser shows `Cannot GET /my-chat`**

The chat endpoint only accepts `POST` requests. Use the widget in the UI, or test with curl:

```bash
curl -X POST http://localhost:3334/my-chat \
  -H "Content-Type: application/json" \
  -d '{"message": "hello", "history": []}'
```

**Chat shows a network error**

Make sure you ran `npm run dev` (not just `npm run dev:web`) — the backend must be running for the widget to work.

---

## License

MIT
