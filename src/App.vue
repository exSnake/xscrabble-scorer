<script setup>
import { RouterView, useRoute } from "vue-router";
import { watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { Analytics } from "@vercel/analytics/vue";
import NavBar from "@/components/NavBar.vue";

const { t, locale } = useI18n();
const route = useRoute();

// Ottieni la lingua corrente dalla route
const currentLang = computed(() => route.path.split("/")[1] || "en");

// Sync vue-i18n locale with route language
watch(
  currentLang,
  (newLang) => {
    if (newLang && locale.value !== newLang) {
      locale.value = newLang;
      localStorage.setItem("locale", newLang);
    }
  },
  { immediate: true },
);
</script>

<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
  >
    <Analytics />

    <!-- NavBar -->
    <NavBar />

    <!-- Main Content -->
    <main class="flex-1">
      <RouterView />
    </main>

    <!-- Global Footer -->
    <footer
      class="w-full py-6 px-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
    >
      <div class="max-w-7xl mx-auto flex flex-col items-center">
        <p class="text-gray-600 dark:text-gray-300 text-sm mb-2">
          {{ t("home.footer") }}
        </p>
        <div class="text-gray-500 dark:text-gray-400 text-xs">
          {{ t("home.madeBy") }}
          <a
            href="https://github.com/exSnake"
            target="_blank"
            rel="noopener noreferrer"
            class="text-rose-600 dark:text-rose-400 hover:underline"
            aria-label="Visita il profilo GitHub di exSnake"
            >exSnake</a
          >
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.router-link-active {
  color: theme("colors.rose.600");
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}
</style>
