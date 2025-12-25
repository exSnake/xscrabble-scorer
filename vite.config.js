import { fileURLToPath, URL } from "node:url";
import path from "node:path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      // Force all Vue imports to use the same instance
      vue: path.resolve("./node_modules/vue"),
    },
    dedupe: ["vue", "@vue/runtime-core", "@vue/runtime-dom"],
  },
  optimizeDeps: {
    include: ["vue", "lucide-vue-next"],
  },
});
