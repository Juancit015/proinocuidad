# LangChain Orchestration Example

Demonstrates **`orchestration: "langchain"`** on `ai-chat-toolkit-server@^1.1.0` — the same public API as the [full-stack-local](../full-stack-local/) example, with LangChain handling the internal tool-calling loop.

Installs both packages from npm — the same way any production app would.

---

## What it includes

| Layer | URL |
|-------|-----|
| React + Vite frontend | http://localhost:5174 |
| Express + Groq backend | http://localhost:3335 |
| Chat endpoint | `POST /my-chat` |

Demo tools (designed for multi-step chains):

| Tool | Purpose |
|------|---------|
| `lookup_customer` | Resolve email → customer ID |
| `list_customer_orders` | Orders for a customer ID |
| `check_inventory` | Stock for a SKU |

---

## Quick start

```bash
npm install
cp .env.example .env
# Edit .env: fill in your API_KEY
npm run dev
```

Open http://localhost:5174 and click the chat bubble.

---

## Environment variables

```env
API_KEY=              # Required — your LLM provider API key
MODEL=llama-3.3-70b-versatile
PORT=3335
```

Get a free Groq API key at [console.groq.com](https://console.groq.com).

---

## Try the assistant

| Try asking… | What happens |
|-------------|-------------|
| "What orders does alice@example.com have?" | `lookup_customer` → `list_customer_orders` |
| "How many WIDGET-1 units are in stock?" | `check_inventory` |
| "Hi" / "Thank you" | Direct reply — no tool call |

---

## LangChain vs native

The server enables LangChain with one option:

```ts
const aiChat = new AiChatServer({
  // ...
  orchestration: "langchain",
  maxToolRounds: 6,
});
```

Omit `orchestration` (or set `"native"`) to use the default loop — see [full-stack-local](../full-stack-local/).

---

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start backend + Vite frontend |
| `npm run dev:web` | Frontend only (port 5174) |
| `npm run dev:server` | Backend only (port 3335) |
| `npm run build` | Production build |

---

## License

MIT
