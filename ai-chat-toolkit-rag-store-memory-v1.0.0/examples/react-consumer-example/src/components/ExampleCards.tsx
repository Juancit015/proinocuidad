const CARDS = [
  {
    id: "products",
    title: "Products",
    description:
      "Browse available offerings and learn how the chat widget can be added to any product surface.",
  },
  {
    id: "documentation",
    title: "Documentation",
    description:
      "Step-by-step guides for installation, configuration, and backend integration.",
  },
  {
    id: "support",
    title: "Support",
    description:
      "Get help with setup, troubleshooting, and best practices for production deployments.",
  },
  {
    id: "knowledge-base",
    title: "Knowledge Base",
    description:
      "Search articles, FAQs, and tutorials to answer common questions quickly.",
  },
] as const;

export function ExampleCards() {
  return (
    <section className="cards">
      <div className="container">
        <h2 className="section-title">Explore</h2>
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
  );
}
