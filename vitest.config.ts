import { defineConfig, configDefaults } from "vitest/config";

export default defineConfig({
  test: {
    ...configDefaults,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
});
