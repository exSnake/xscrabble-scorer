<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useBoardGameStore } from "@/stores/BoardGameStore";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const boardGame = useBoardGameStore();
const { longestWord, highestScoringWord } = storeToRefs(boardGame);

const hasStats = computed(() => {
  return longestWord.value || highestScoringWord.value;
});
</script>

<template>
  <div
    class="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-4 flex flex-col h-[280px] w-full overflow-y-auto"
  >
    <h3
      class="text-sm font-bold uppercase text-gray-700 dark:text-gray-300 mb-3"
    >
      {{ t("gameStats.bestWords") }}
    </h3>

    <div v-if="!hasStats" class="flex-1 flex items-center justify-center">
      <p class="text-gray-500 dark:text-gray-400 text-sm text-center">
        {{ t("gameStats.noStats") }}
      </p>
    </div>

    <div v-else class="flex-1 flex flex-col justify-center space-y-4">
      <!-- Longest Word -->
      <div
        v-if="longestWord"
        class="bg-gray-50 dark:bg-gray-600 rounded-lg p-4"
      >
        <div class="text-xs text-gray-600 dark:text-gray-400 mb-2">
          {{ t("gameStats.longestWord") }}
        </div>
        <div class="flex justify-between items-center mb-1">
          <span class="text-base font-semibold text-gray-800 dark:text-white">
            {{ longestWord.word }}
          </span>
          <span class="text-xs text-gray-600 dark:text-gray-400">
            {{ longestWord.length }} {{ t("gameStats.letters") }}
          </span>
        </div>
        <div class="text-xs text-gray-600 dark:text-gray-400">
          {{ longestWord.points }} {{ t("common.points") }}
        </div>
      </div>

      <!-- Highest Scoring Word -->
      <div
        v-if="highestScoringWord"
        class="bg-gray-50 dark:bg-gray-600 rounded-lg p-4"
      >
        <div class="text-xs text-gray-600 dark:text-gray-400 mb-2">
          {{ t("gameStats.highestScoringWord") }}
        </div>
        <div class="flex justify-between items-center mb-1">
          <span class="text-base font-semibold text-gray-800 dark:text-white">
            {{ highestScoringWord.word }}
          </span>
          <span class="text-base font-bold text-blue-600 dark:text-blue-400">
            {{ highestScoringWord.points }} {{ t("common.points") }}
          </span>
        </div>
        <div class="text-xs text-gray-600 dark:text-gray-400">
          {{ t("gameStats.by") }} {{ highestScoringWord.playerName }}
        </div>
      </div>
    </div>
  </div>
</template>
