const CARDS = [
  {
    id: "products",
    title: "Products",
    description:
      "Browse sample catalog items. Ask the assistant to list products by category.",
  },
  {
    id: "orders",
    title: "Orders",
    description:
      "Track shipments and delivery status. Try asking about an order ID.",
  },
  {
    id: "support",
    title: "Support Docs",
    description:
      "Search help articles and guides. The assistant can fetch mock documentation.",
  },
] as const;

export default function App() {
  return (
    <>
      <header className="header">
        <div className="container header__inner">
          <span className="header__brand">Full Stack Local Demo</span>
          <nav className="header__nav" aria-label="Sections">
            {CARDS.map((card) => (
              <a key={card.id} href={`#${card.id}`} className="header__link">
                {card.title}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <p className="hero__badge">Local workspace test</p>
            <h1 className="hero__title">
              Widget + server, linked from the monorepo
            </h1>
            <p className="hero__text">
              This app uses <code>ai-chat-toolkit-widget</code> and{" "}
              <code>ai-chat-toolkit-server</code> via pnpm workspace — not
              published npm packages. Open the chat in the corner and ask about
              products, orders, or support docs.
            </p>
            <ul className="hero__meta">
              <li>
                Frontend: <strong>http://localhost:5173</strong>
              </li>
              <li>
                Backend: <strong>http://localhost:3334</strong> (set via{" "}
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
            <h2 className="section-title">Try the assistant</h2>
            <ul className="cards__grid">
              {CARDS.map((card) => (
                <li key={card.id} id={card.id} className="card">
                  <h3 className="card__title">{card.title}</h3>
                  <p className="card__description">{card.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>
            Pre-publish integration test · packages/widget + packages/server
          </p>
        </div>
      </footer>

      <ai-chat
        title="AI Assistant"
        subtitle="Ask about products, orders, or docs"
        primary-color="#2563eb"
        path="/my-chat"
      />
    </>
  );
}
