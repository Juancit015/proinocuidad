import type { Express, Request, Response } from "express";
import express from "express";
import type { AiChatServer } from "../AiChatServer.js";
import type { ChatRequestBody } from "../types.js";
import { AiChatServerError, toErrorMessage } from "../utils/errors.js";
import { createCorsMiddleware } from "./corsMiddleware.js";

const HEALTH_PATH = "/ai-chat/health";
const TOOLS_PATH = "/ai-chat/tools";

export function attachExpressRoutes(
  app: Express,
  server: AiChatServer,
): void {
  const cors = createCorsMiddleware(server.corsOptions);
  const json = express.json();

  const chatPath = server.chatPath;

  app.options(chatPath, cors);
  app.get(chatPath, cors, (_req, res) => {
    res.json({
      message:
        "This endpoint accepts POST only. Send JSON with { message, history? }.",
      method: "POST",
      path: chatPath,
      health: HEALTH_PATH,
      tools: TOOLS_PATH,
    });
  });
  app.post(chatPath, cors, json, createChatHandler(server));

  app.options(HEALTH_PATH, cors);
  app.get(HEALTH_PATH, cors, (_req, res) => {
    res.json(server.getHealthResponse());
  });

  app.options(TOOLS_PATH, cors);
  app.get(TOOLS_PATH, cors, (_req, res) => {
    res.json(server.getToolsResponse());
  });
}

function createChatHandler(server: AiChatServer) {
  return async (req: Request, res: Response) => {
    try {
      const body = req.body as ChatRequestBody;
      if (!body?.message || typeof body.message !== "string") {
        throw new AiChatServerError(
          'Request body must include a "message" string.',
          400,
        );
      }

      const result = await server.handleChat({
        message: body.message,
        history: body.history,
        request: req,
      });

      res.json({ message: result });
    } catch (error) {
      if (error instanceof AiChatServerError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: toErrorMessage(error) });
    }
  };
}
