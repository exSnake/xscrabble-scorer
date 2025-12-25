<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useBoardGameStore } from "@/stores/BoardGameStore";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const boardGame = useBoardGameStore();
const { totalWordsPlaced, totalScore, averageScorePerWord } =
  storeToRefs(boardGame);

const hasStats = computed(() => {
  return totalWordsPlaced.value > 0;
});
</script>

<template>
  <div
    class="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-4 flex flex-col h-[280px] w-full overflow-y-auto"
  >
    <h3
      class="text-sm font-bold uppercase text-gray-700 dark:text-gray-300 mb-3"
    >
      {{ t("gameStats.global") }}
    </h3>

    <div v-if="!hasStats" class="flex-1 flex items-center justify-center">
      <p class="text-gray-500 dark:text-gray-400 text-sm text-center">
        {{ t("gameStats.noStats") }}
      </p>
    </div>

    <div v-else class="flex-1 flex flex-col justify-center space-y-4">
      <div class="bg-gray-50 dark:bg-gray-600 rounded-lg p-4">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm text-gray-700 dark:text-gray-300">
            {{ t("gameStats.totalWords") }}
          </span>
          <span class="text-lg font-bold text-gray-800 dark:text-white">
            {{ totalWordsPlaced }}
          </span>
        </div>
      </div>

      <div class="bg-gray-50 dark:bg-gray-600 rounded-lg p-4">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm text-gray-700 dark:text-gray-300">
            {{ t("gameStats.totalScore") }}
          </span>
          <span class="text-lg font-bold text-gray-800 dark:text-white">
            {{ totalScore }}
          </span>
        </div>
      </div>

      <div class="bg-gray-50 dark:bg-gray-600 rounded-lg p-4">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm text-gray-700 dark:text-gray-300">
            {{ t("gameStats.averageScore") }}
          </span>
          <span class="text-lg font-bold text-gray-800 dark:text-white">
            {{ averageScorePerWord }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
