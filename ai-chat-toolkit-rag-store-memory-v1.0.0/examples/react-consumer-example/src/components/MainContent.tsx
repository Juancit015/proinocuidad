export function MainContent() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <h1 className="hero__title">React Consumer Example</h1>
        <p className="hero__description">
          This sample app shows how to embed the{" "}
          <code>ai-chat-toolkit-widget</code> package in a React + TypeScript
          project. The chat widget floats in the corner — open it and send a
          message to try the demo backend.
        </p>
        <p className="hero__note">
          Start the app with <code>npm run dev</code>. Chat requests use the same
          origin as the page (no CORS) and are proxied to the mock API on port
          3000.
        </p>
      </div>
    </section>
  );
}
