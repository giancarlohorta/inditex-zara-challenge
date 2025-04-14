/// <reference types="vitest" />

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  build: {
    minify: "esbuild",
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    coverage: {
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "**/index.tsx",
        "src/App.{ts,tsx}",
        "src/main.{ts,tsx}",
        "src/types/*.{ts,tsx}",
      ],
    },
  },
});
