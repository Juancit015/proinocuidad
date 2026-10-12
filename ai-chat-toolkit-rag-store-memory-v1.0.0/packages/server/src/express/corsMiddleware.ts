import type { NextFunction, Request, Response } from "express";
import type { CorsOptions } from "../types.js";

const BLOCKED_ORIGINS = new Set(["null", "undefined"]);

function normalizeOrigin(origin: string | undefined): string | null {
  if (!origin || BLOCKED_ORIGINS.has(origin)) {
    return null;
  }
  try {
    const parsed = new URL(origin);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return null;
    }
    return parsed.origin;
  } catch {
    return null;
  }
}

export function createCorsMiddleware(options?: CorsOptions) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const requestOrigin = req.headers.origin;
    const configured = options?.origin;
    let allowed: string | null = null;

    if (configured === false) {
      allowed = null;
    } else if (configured === undefined || configured === true) {
      allowed = "*";
    } else if (typeof configured === "string") {
      allowed = normalizeOrigin(configured);
    } else if (Array.isArray(configured)) {
      const normalizedRequest = normalizeOrigin(requestOrigin);
      for (const entry of configured) {
        const normalizedEntry = normalizeOrigin(entry);
        if (normalizedEntry && normalizedEntry === normalizedRequest) {
          allowed = normalizedEntry;
          break;
        }
      }
    }

    if (allowed) {
      res.setHeader("Access-Control-Allow-Origin", allowed);
      if (allowed !== "*") {
        res.setHeader("Vary", "Origin");
      }
    }

    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");

    if (req.method === "OPTIONS") {
      res.status(204).end();
      return;
    }

    next();
  };
}
