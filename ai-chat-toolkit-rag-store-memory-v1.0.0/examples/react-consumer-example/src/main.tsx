import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Registers the <ai-chat> custom element when this module loads.
import "ai-chat-toolkit-widget";

import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
