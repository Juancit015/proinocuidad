# ai-chat-toolkit-widget

[![npm version](https://img.shields.io/npm/v/ai-chat-toolkit-widget)](https://www.npmjs.com/package/ai-chat-toolkit-widget/v/1.0.0)

Embeddable AI chat widget for any website or app. Drop it in with a `<script>` tag or import it as an npm package — no framework required.

**Current release:** [1.0.0](https://www.npmjs.com/package/ai-chat-toolkit-widget/v/1.0.0) on npm.

Built with vanilla Web Components and Shadow DOM, so it works in React, Vue, plain HTML, or anything else without conflicts.

---

## Install

### CDN (easiest)

```html
<script src="https://cdn.jsdelivr.net/npm/ai-chat-toolkit-widget@1.0.0/dist/widget.global.js"></script>

<ai-chat
  title="AI Assistant"
  subtitle="How can I help?"
  backend-url="https://api.example.com"
  path="/ai-chat/custom"
></ai-chat>
```

The script auto-registers the `<ai-chat>` custom element when it loads.

### npm

```bash
npm install ai-chat-toolkit-widget@^1.0.0
```

```ts
import "ai-chat-toolkit-widget";
```

```html
<ai-chat title="Support" backend-url="https://api.example.com"></ai-chat>
```

---

## Attributes

| Attribute | Default | Description |
|-----------|---------|-------------|
| `title` | `AI Assistant` | Header title |
| `subtitle` | `How can I help you today?` | Header subtitle |
| `logo` | _(none)_ | Image URL for the FAB button and header. Falls back to the default chat icon if the URL fails to load. |
| `primary-color` | `#2563eb` | Accent color for the header, FAB button, and send button |
| `backend-url` | `window.location.origin` | Base URL of your API server (no trailing slash) |
| `path` | `/ai-chat/custom` | Endpoint path appended to `backend-url` |
| `placeholder` | `Type a message…` | Textarea placeholder text |
| `position` | `bottom-right` | Corner position: `bottom-right`, `bottom-left`, `top-right`, `top-left` |

---

## Backend API

The widget sends a `POST` request to `${backend-url}${path}` on every message.

**Request body:**

```json
{
  "message": "user message text",
  "history": [
    { "role": "user", "content": "previous message" },
    { "role": "assistant", "content": "previous reply" }
  ]
}
```

**Expected response** — either field is accepted:

```json
{ "message": "assistant reply" }
```

```json
{ "response": "assistant reply" }
```

**Error handling:**

- Non-2xx responses display the error text inline in the chat (no popup).
- Network failures and CORS errors also display inline with a descriptive message.
- If the logo URL fails to load, the widget silently falls back to the default chat icon.

If your API is on a different domain, enable CORS on the server. See [`ai-chat-toolkit-server`](https://www.npmjs.com/package/ai-chat-toolkit-server) for a ready-made backend.

---

## Programmatic API

```ts
const el = document.querySelector("ai-chat") as AiChatElement;

el.open();         // Open the chat panel
el.close();        // Close the chat panel
el.toggle();       // Toggle open/closed
el.clearHistory(); // Clear all messages
```

---

## React usage

Import once in `main.tsx`:

```tsx
import "ai-chat-toolkit-widget";
```

Add TypeScript types in `src/types/web-components.d.ts`:

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

Use in JSX:

```tsx
<ai-chat
  title="Support"
  primary-color="#2563eb"
  path="/ai-chat/custom"
/>
```

---

## Build outputs

| File | Use case |
|------|----------|
| `dist/widget.global.js` | CDN / `<script>` tag |
| `dist/index.js` | ESM import |
| `dist/index.d.ts` | TypeScript types |

---

## Development

From the monorepo root:

```bash
pnpm install
pnpm --filter ai-chat-toolkit-widget dev
```

---

## License

MIT
