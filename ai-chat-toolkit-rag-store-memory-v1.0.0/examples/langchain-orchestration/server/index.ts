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

const CUSTOMERS: Record<string, { customerId: string; name: string; email: string }> = {
  "alice@example.com": {
    customerId: "cust-1",
    name: "Alice",
    email: "alice@example.com",
  },
  "bob@example.com": {
    customerId: "cust-2",
    name: "Bob",
    email: "bob@example.com",
  },
};

const ORDERS: Record<string, Array<{ orderId: string; status: string; total: number }>> = {
  "cust-1": [
    { orderId: "101", status: "shipped", total: 49.99 },
    { orderId: "102", status: "processing", total: 129.0 },
  ],
  "cust-2": [{ orderId: "201", status: "delivered", total: 24.5 }],
};

const INVENTORY: Record<string, { sku: string; name: string; quantity: number }> = {
  "WIDGET-1": { sku: "WIDGET-1", name: "Demo Widget", quantity: 42 },
  "GADGET-9": { sku: "GADGET-9", name: "Demo Gadget", quantity: 7 },
};

const app = express();
const PORT = Number(process.env.PORT) || 3335;

const aiChat = new AiChatServer({
  path: "/my-chat",
  provider: "groq",
  apiKey: process.env.API_KEY,
  model: process.env.MODEL || "llama-3.3-70b-versatile",
  cors: {
    origin: "http://localhost:5174",
  },
  orchestration: "langchain",
  maxToolRounds: 6,
  systemPrompt:
    "You are a helpful operations assistant for a demo store. Keep answers concise.",
});

aiChat.addTools([
  {
    name: "lookup_customer",
    description:
      "Find a customer by email. Use first when the user mentions a customer email or asks to find a customer.",
    inputSchema: {
      type: "object",
      properties: {
        email: {
          type: "string",
          description: "Customer email address",
        },
      },
      required: ["email"],
    },
    handler: async (input) => {
      const email = String(input.email ?? "").trim().toLowerCase();
      const customer = CUSTOMERS[email];
      if (!customer) {
        return { found: false, email };
      }
      return { found: true, ...customer };
    },
  },
  {
    name: "list_customer_orders",
    description:
      "List orders for a customer ID. Use after lookup_customer when the user wants order history or order details.",
    inputSchema: {
      type: "object",
      properties: {
        customerId: {
          type: "string",
          description: "Customer ID from lookup_customer, e.g. cust-1",
        },
      },
      required: ["customerId"],
    },
    handler: async (input) => {
      const customerId = String(input.customerId ?? "");
      return {
        customerId,
        orders: ORDERS[customerId] ?? [],
      };
    },
  },
  {
    name: "check_inventory",
    description:
      "Check stock for a product SKU. Use when the user asks about inventory or availability.",
    inputSchema: {
      type: "object",
      properties: {
        sku: {
          type: "string",
          description: "Product SKU, e.g. WIDGET-1",
        },
      },
      required: ["sku"],
    },
    handler: async (input) => {
      const sku = String(input.sku ?? "").toUpperCase();
      const item = INVENTORY[sku];
      if (!item) {
        return { found: false, sku };
      }
      return { found: true, ...item };
    },
  },
]);

aiChat.attach(app);

app.get("/", (_req, res) => {
  res.json({
    status: "ok",
    orchestration: "langchain",
  });
});

const server = app.listen(PORT);

server.on("listening", () => {
  console.log(`LangChain orchestration backend: http://localhost:${PORT}`);
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
