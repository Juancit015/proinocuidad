const PROMPTS = [
  {
    id: "orders",
    title: "Multi-step orders",
    description:
      'Ask for order history by email — the agent should call lookup_customer, then list_customer_orders.',
    example: "What orders does alice@example.com have?",
  },
  {
    id: "inventory",
    title: "Inventory lookup",
    description:
      "Single-tool stock check. Try SKU WIDGET-1 or GADGET-9.",
    example: "How many WIDGET-1 units are in stock?",
  },
  {
    id: "greeting",
    title: "Direct reply",
    description:
      "Simple greetings should answer without calling tools (native and LangChain paths both skip tools).",
    example: "Hi there!",
  },
] as const;

export default function App() {
  return (
    <>
      <header className="header">
        <div className="container header__inner">
          <span className="header__brand">LangChain Orchestration</span>
          <nav className="header__nav" aria-label="Sections">
            {PROMPTS.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="header__link">
                {item.title}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <p className="hero__badge">Internal orchestration demo</p>
            <h1 className="hero__title">
              Widget + server with LangChain agent loop
            </h1>
            <p className="hero__text">
              This example sets <code>orchestration: &quot;langchain&quot;</code> on{" "}
              <code>ai-chat-toolkit-server@^1.1.0</code>. The public API is
              unchanged — only the internal tool-calling loop uses LangChain.
              Packages install from npm like any production app.
            </p>
            <ul className="hero__meta">
              <li>
                Frontend: <strong>http://localhost:5174</strong>
              </li>
              <li>
                Backend: <strong>http://localhost:3335</strong> (set via{" "}
                <code>PORT</code> in <code>.env</code>)
              </li>
              <li>
                Chat: <strong>POST /my-chat</strong> — use the widget, not the
                browser address bar
              </li>
            </ul>
          </div>
        </section>

        <section className="cards">
          <div className="container">
            <h2 className="section-title">Try these prompts</h2>
            <ul className="cards__grid">
              {PROMPTS.map((item) => (
                <li key={item.id} id={item.id} className="card">
                  <h3 className="card__title">{item.title}</h3>
                  <p className="card__description">{item.description}</p>
                  <p className="card__example">
                    <em>&ldquo;{item.example}&rdquo;</em>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>
            LangChain orchestration · ai-chat-toolkit-widget + ai-chat-toolkit-server
            (npm)
          </p>
        </div>
      </footer>

      <ai-chat
        title="Ops Assistant"
        subtitle="Customers, orders, and inventory"
        primary-color="#7c3aed"
        path="/my-chat"
      />
    </>
  );
}
