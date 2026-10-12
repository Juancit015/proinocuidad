const NAV_ITEMS = [
  { label: "Products", href: "#products" },
  { label: "Documentation", href: "#documentation" },
  { label: "Support", href: "#support" },
  { label: "Knowledge Base", href: "#knowledge-base" },
] as const;

export function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <a href="/" className="header__brand">
          AI Chat Toolkit
        </a>

        <nav className="header__nav" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className="header__link">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
