<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <footer
    class="w-full py-6 px-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
  >
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <div></div>
      <div class="flex flex-col items-center sm:items-center">
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
      <a
        href="https://github.com/exSnake/scrabble-scorer"
        target="_blank"
        rel="noopener noreferrer"
        class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors duration-200"
        aria-label="GitHub Repository"
      >
        <LucideGithub class="w-5 h-5" />
      </a>
    </div>
  </footer>
</template>

