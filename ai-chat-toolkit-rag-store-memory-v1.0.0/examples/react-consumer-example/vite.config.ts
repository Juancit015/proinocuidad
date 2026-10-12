import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/ai-chat": {
        target: "http://localhost:3030",
        changeOrigin: true,
      },
    },
  },
});
