export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__text">
          Official React consumer example for{" "}
          <a
            href="https://www.npmjs.com/package/ai-chat-toolkit-widget"
            target="_blank"
            rel="noreferrer"
          >
            ai-chat-toolkit-widget
          </a>
          .
        </p>
        <p className="footer__text footer__text--muted">
          MIT License · Part of the ai-chat-toolkit monorepo
        </p>
      </div>
    </footer>
  );
}
