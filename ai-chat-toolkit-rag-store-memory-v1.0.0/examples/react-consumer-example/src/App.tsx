import { Header } from "./components/Header";
import { MainContent } from "./components/MainContent";
import { ExampleCards } from "./components/ExampleCards";
import { DocsSection } from "./components/DocsSection";
import { Footer } from "./components/Footer";

/**
 * Official React consumer example for ai-chat-toolkit-widget.
 *
 * The widget is a Web Component — React renders the <ai-chat> tag, and the
 * browser handles everything inside Shadow DOM. Import the package once in
 * main.tsx to register the custom element globally.
 */
export default function App() {
  return (
    <>
      <Header />
      <main>
        <MainContent />
        <ExampleCards />
        <DocsSection />
      </main>
      <Footer />

      <ai-chat
        backend-url="http://localhost:3030"
        title="AI Assistant"
        subtitle="Ask me anything"
        primary-color="#2563eb"
        path="/ai-chat/custom"
      />
    </>
  );
}
