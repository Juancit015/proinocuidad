# React Consumer Example

Official sample showing how to use [`ai-chat-toolkit-widget@1.0.0`](https://www.npmjs.com/package/ai-chat-toolkit-widget/v/1.0.0) in a React + TypeScript project.

This example **installs the widget from the public npm registry** (`^1.0.0`) — the same way a real consumer app would. It does not use workspace linking. You can copy this folder outside the monorepo and run it standalone.

---

## Quick start

```bash
npm install
npm run dev
```

This starts two things:

| Service | URL |
|---------|-----|
| React app (Vite) | http://localhost:5173 |
| Mock backend (Express) | http://localhost:3030 |

Open http://localhost:5173, click the chat bubble, and send a message. The widget proxies requests through Vite to the mock backend — no CORS setup needed.

> **Note:** Run `npm run dev` (not just `npm start`). The script starts both the Vite dev server and the mock backend concurrently.

---

## Using the widget in React

### 1. Install

```bash
npm install ai-chat-toolkit-widget@^1.0.0
```

### 2. Register the custom element

Import once in `main.tsx`:

```tsx
import "ai-chat-toolkit-widget";
```

This auto-registers the `<ai-chat>` custom element.

### 3. Add TypeScript types

Create `src/types/web-components.d.ts`:

```ts
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ai-chat": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          title?: string;
          subtitle?: string;
          logo?: string;
          "primary-color"?: string;
          "backend-url"?: string;
          path?: string;
          placeholder?: string;
          position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
        },
        HTMLElement
      >;
    }
  }
}
```

### 4. Use in JSX

```tsx
<ai-chat
  title="AI Assistant"
  subtitle="Ask me anything"
  primary-color="#2563eb"
  path="/ai-chat/custom"
/>
```

Omit `backend-url` to use the same origin as the page (recommended during development — Vite proxies the requests).

For a cross-origin API, set `backend-url="https://api.example.com"` and enable CORS on the server.

---

## Widget attributes

| Attribute | Default | Description |
|-----------|---------|-------------|
| `title` | `AI Assistant` | Header title |
| `subtitle` | `How can I help you today?` | Header subtitle |
| `logo` | _(none)_ | Logo URL — falls back to chat icon if missing or fails to load |
| `primary-color` | `#2563eb` | Theme accent color |
| `backend-url` | `window.location.origin` | API base URL |
| `path` | `/ai-chat/custom` | Chat endpoint path |
| `placeholder` | `Type a message…` | Input placeholder |
| `position` | `bottom-right` | Corner placement: `bottom-right`, `bottom-left`, `top-right`, `top-left` |

---

## Available scripts

```bash
npm run dev          # Start Vite + mock backend together
npm run dev:web      # Vite dev server only (port 5173)
npm run dev:server   # Mock backend only (port 3030)
npm run build        # Production build
npm run preview      # Preview production build
```

---

## The mock backend

`server/index.js` is a minimal Express server that echoes messages back:

```js
app.post("/ai-chat/custom", (req, res) => {
  const { message } = req.body ?? {};
  res.json({
    message: message
      ? `Hello from the demo backend! You said: "${message}"`
      : "Hello from the demo backend",
  });
});
```

Replace this with a real backend using [`ai-chat-toolkit-server`](https://www.npmjs.com/package/ai-chat-toolkit-server) when you're ready.

---

## Project structure

```
react-consumer-example/
├── server/
│   └── index.js          # Mock Express backend (port 3030)
├── src/
│   ├── components/       # Header, cards, docs, footer
│   ├── types/
│   │   └── web-components.d.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.ts        # Proxies /ai-chat/* → localhost:3030
```

---

## License

MIT
