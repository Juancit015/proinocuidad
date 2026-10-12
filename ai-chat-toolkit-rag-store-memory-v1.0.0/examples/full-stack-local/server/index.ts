import dotenv from "dotenv";
import express from "express";
import { AiChatServer } from "ai-chat-toolkit-server";

dotenv.config();

if (!process.env.API_KEY?.trim()) {
  console.error(
    "Error: API_KEY is not set in .env — copy .env.example and fill in your key.",
  );
  process.exit(1);
}

const app = express();
const PORT = Number(process.env.PORT) || 3334;

const aiChat = new AiChatServer({
  path: "/my-chat",
  provider: "groq",
  apiKey: process.env.API_KEY,
  model: process.env.MODEL || "llama-3.3-70b-versatile",
  cors: {
    origin: "http://localhost:5173",
  },
  // Customize the assistant behavior for your application
  systemPrompt: `You are a helpful demo assistant for this sample application. Keep answers concise and friendly.

Answer directly without tools for greetings, thanks, small talk, and general knowledge.

Use tools only for demo data in this app:
- get_products — when the user wants products by category
- get_order_status — when the user asks about order, shipment, or record status (pass their ID as orderId, e.g. "order 1" or "record 1" → orderId "1")
- get_support_articles — when the user wants help articles or documentation`,
});

aiChat.addTools([
  {
    name: "get_products",
    description:
      "List demo products in a category. Use when the user asks to browse or list products.",
    inputSchema: {
      type: "object",
      properties: {
        category: {
          type: "string",
          description: "Category name, e.g. Electronics or general",
        },
      },
      required: ["category"],
    },
    handler: async (input) => {
      const category = String(input.category ?? "general");
      return [
        { id: "p1", name: "Sample Item A", category },
        { id: "p2", name: "Sample Item B", category },
        { id: "p3", name: "Sample Item C", category },
      ];
    },
  },
  {
    name: "get_order_status",
    description:
      "Look up demo shipping status by order ID. Use for order status, shipment, delivery, or when the user gives an order/record number.",
    inputSchema: {
      type: "object",
      properties: {
        orderId: {
          type: "string",
          description: "Order or record ID from the user, e.g. 1",
        },
      },
      required: ["orderId"],
    },
    handler: async (input) => {
      const orderId = String(input.orderId ?? "unknown");
      return {
        orderId,
        status: "shipped",
        carrier: "Demo Logistics",
        eta: "2026-06-05",
      };
    },
  },
  {
    name: "get_support_articles",
    description:
      "Search demo support articles by keyword. Use when the user asks for help docs or troubleshooting guides.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Keywords from the user's question",
        },
      },
      required: ["query"],
    },
    handler: async (input) => {
      const query = String(input.query ?? "");
      return [
        {
          id: "doc-101",
          title: `Getting started with ${query || "your account"}`,
          summary: "Mock documentation article for local testing.",
        },
        {
          id: "doc-102",
          title: `Troubleshooting ${query || "common issues"}`,
          summary: "Another mock article returned by the demo tool.",
        },
      ];
    },
  },
]);

aiChat.attach(app);

app.get("/", (_req, res) => {
  res.json({ status: "ok" });
});

const server = app.listen(PORT);

server.on("listening", () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
  console.log(`Chat endpoint: POST http://localhost:${PORT}/my-chat`);
  console.log(`Health: GET http://localhost:${PORT}/ai-chat/health`);
});

server.on("error", (err: NodeJS.ErrnoException) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use.`);
  } else {
    console.error("Failed to start server:", err.message);
  }
  process.exit(1);
});
