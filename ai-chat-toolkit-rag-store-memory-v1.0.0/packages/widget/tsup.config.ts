import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: { index: "src/ai-chat.ts" },
    format: ["esm"],
    dts: true,
    sourcemap: true,
    clean: true,
    outDir: "dist",
  },
  {
    entry: { widget: "src/ai-chat.ts" },
    format: ["iife"],
    globalName: "AiChatToolkit",
    sourcemap: true,
    outDir: "dist",
    outExtension: () => ({ js: ".global.js" }),
    esbuildOptions(options) {
      options.banner = {
        js: "/* @ai-chat-toolkit/widget - browser bundle; auto-registers <ai-chat> */",
      };
    },
  },
]);
