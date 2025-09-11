import { defineConfig } from "vitest/config";
export default defineConfig({
  test: { environment: "node" } // für reine TS/Server-Tests
});
