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
    include: ["vue", "@iconify/vue"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Separare Vue core e runtime
          if (id.includes("node_modules")) {
            if (id.includes("vue") && !id.includes("vue3-toastify")) {
              if (id.includes("vue-router") || id.includes("pinia")) {
                return "vue-vendor";
              }
              return "vue-core";
            }
            // Separare le librerie di UI
            if (
              id.includes("vue3-toastify") ||
              id.includes("@variantjs") ||
              id.includes("flowbite")
            ) {
              return "ui-vendor";
            }
            // Separare le icone
            if (id.includes("@iconify")) {
              return "icons-vendor";
            }
            // Separare i18n
            if (id.includes("vue-i18n")) {
              return "i18n-vendor";
            }
            // Separare altre dipendenze
            if (
              id.includes("@vueuse") ||
              id.includes("vue-gtag") ||
              id.includes("@chenfengyuan") ||
              id.includes("vue-timer-hook") ||
              id.includes("body-scroll-lock")
            ) {
              return "utils-vendor";
            }
            // Tutte le altre dipendenze node_modules
            return "vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
