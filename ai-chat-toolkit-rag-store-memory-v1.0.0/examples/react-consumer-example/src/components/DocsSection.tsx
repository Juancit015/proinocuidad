export function DocsSection() {
  return (
    <section className="docs">
      <div className="container">
        <h2 className="section-title">Usage Examples</h2>

        <article className="docs__block">
          <h3 className="docs__heading">Basic Usage</h3>
          <p className="docs__text">
            Import the package once to register the custom element, then add
            the tag anywhere in your JSX.
          </p>
          <pre className="docs__code">
            <code>{`import "ai-chat-toolkit-widget";

<ai-chat />`}</code>
          </pre>
        </article>

        <article className="docs__block">
          <h3 className="docs__heading">Customized Usage</h3>
          <p className="docs__text">
            Pass attributes to configure title, colors, logo, and backend
            endpoint. Attribute names use kebab-case.
          </p>
          <pre className="docs__code">
            <code>{`<ai-chat
  title="Support Assistant"
  subtitle="How can I help?"
  logo="https://example.com/logo.png"
  primary-color="#2563eb"
  path="/ai-chat/custom"
/>`}</code>
          </pre>
        </article>
      </div>
    </section>
  );
}
