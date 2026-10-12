import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const backendPort = env.PORT || "3335";
  const backendUrl = `http://localhost:${backendPort}`;

  return {
    plugins: [react()],
    server: {
      host: "0.0.0.0",
      port: 5174,
      proxy: {
        "/my-chat": {
          target: backendUrl,
          changeOrigin: true,
        },
        "/ai-chat": {
          target: backendUrl,
          changeOrigin: true,
        },
      },
    },
  };
});
