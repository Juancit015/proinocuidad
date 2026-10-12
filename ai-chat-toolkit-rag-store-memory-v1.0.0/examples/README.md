# Examples

Four standalone examples showing how to use the published npm packages. Each runs independently — no monorepo build step required.

| Folder | What it shows | Packages used |
|--------|---------------|---------------|
| [static-html](./static-html/) | Drop the widget into any HTML page via CDN | `ai-chat-toolkit-widget@1.0.0` (CDN) |
| [react-consumer-example](./react-consumer-example/) | Use the widget in a React + TypeScript app | `ai-chat-toolkit-widget@^1.0.0` (npm) |
| [full-stack-local](./full-stack-local/) | Widget + server + tools (native loop) | `ai-chat-toolkit-widget@^1.0.0` + `ai-chat-toolkit-server@^1.1.0` (npm) |
| [langchain-orchestration](./langchain-orchestration/) | Same stack with `orchestration: "langchain"` | `ai-chat-toolkit-widget@^1.0.0` + `ai-chat-toolkit-server@^1.1.0` (npm) |

## Which example should I use?

- **No framework, just HTML?** → `static-html`
- **Building a React app?** → `react-consumer-example`
- **Need the full picture — widget, backend, and tools?** → `full-stack-local`
- **Trying LangChain internal orchestration?** → `langchain-orchestration`
