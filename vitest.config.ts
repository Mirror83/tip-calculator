import config from "./vite.config";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: config.plugins,
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "vitest-setup.ts",
  },
});
