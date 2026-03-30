import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // This creates a alias for Reddit
      '/reddit-api': {
        target: 'https://www.reddit.com',
        changeOrigin: true,
        followRedirects: true,
        rewrite: (path) => path.replace(/^\/reddit-api/, ''),
        headers: {
          // Reddit hates "unidentified" bots. 
          // Always set a unique User-Agent to avoid 429 errors.
          'User-Agent': 'ReaditApp:v1.0.0 (by /u/ReaditClient)',
        }
      }
    }
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts",
  },
});
