import fs from "node:fs/promises";
import path from "node:path";
import type { RagDocument } from "ai-chat-toolkit-rag";

const LOG_PREFIX = "[ai-chat-toolkit-rag-source-local]";
const SUPPORTED_EXTENSIONS = new Set([".txt", ".md", ".json"]);

export interface LocalSourceOptions {
  path: string;
}

async function walkDirectory(directoryPath: string): Promise<string[]> {
  let entries;
  try {
    entries = await fs.readdir(directoryPath, { withFileTypes: true });
  } catch {
    return [];
  }

  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await walkDirectory(fullPath)));
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();
    if (SUPPORTED_EXTENSIONS.has(extension)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function readDocument(
  filePath: string,
  rootPath: string,
): Promise<RagDocument | null> {
  try {
    const stat = await fs.stat(filePath);
    const extension = path.extname(filePath).toLowerCase();
    let text = await fs.readFile(filePath, "utf8");

    if (extension === ".json") {
      try {
        text = JSON.stringify(JSON.parse(text), null, 2);
      } catch {
        // Keep raw text when JSON parsing fails.
      }
    }

    const relativePath = path.relative(rootPath, filePath);

    return {
      id: relativePath,
      text,
      metadata: {
        filePath: relativePath,
        extension: extension.slice(1),
        modifiedAt: stat.mtime.toISOString(),
      },
    };
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.warn(`${LOG_PREFIX} skipped unreadable file ${filePath}: ${detail}`);
    return null;
  }
}

export async function loadLocalDocuments(
  options: LocalSourceOptions,
): Promise<RagDocument[]> {
  const rootPath = path.resolve(options.path);

  try {
    const stat = await fs.stat(rootPath);
    if (!stat.isDirectory()) {
      console.warn(`${LOG_PREFIX} path is not a directory: ${rootPath}`);
      return [];
    }
  } catch {
    console.warn(`${LOG_PREFIX} folder not found: ${rootPath}`);
    return [];
  }

  const files = await walkDirectory(rootPath);
  const documents = await Promise.all(
    files.map((filePath) => readDocument(filePath, rootPath)),
  );

  return documents.filter(
    (document): document is RagDocument =>
      document !== null && document.text.trim().length > 0,
  );
}
