<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useBoardGameStore } from "@/stores/BoardGameStore";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const boardGame = useBoardGameStore();
const {
  totalWordsPlaced,
  totalScore,
  averageScorePerWord,
  longestWord,
  highestScoringWord,
  playerStats,
} = storeToRefs(boardGame);

const hasStats = computed(() => {
  return totalWordsPlaced.value > 0;
});
</script>

<template>
  <div
    class="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-4 flex flex-col h-full"
  >
    <h3
      class="text-sm font-bold uppercase text-gray-700 dark:text-gray-300 mb-3"
    >
      {{ t("gameStats.title") }}
    </h3>

    <div v-if="!hasStats" class="flex-1 flex items-center justify-center">
      <p class="text-gray-500 dark:text-gray-400 text-sm text-center">
        {{ t("gameStats.noStats") }}
      </p>
    </div>

    <div v-else class="space-y-4 flex-1 overflow-y-auto">
      <!-- Global Statistics -->
      <div class="space-y-2">
        <h4
          class="text-xs font-semibold uppercase text-gray-600 dark:text-gray-400"
        >
          {{ t("gameStats.global") }}
        </h4>
        <div class="bg-gray-50 dark:bg-gray-600 rounded-lg p-3 space-y-2">
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-700 dark:text-gray-300">
              {{ t("gameStats.totalWords") }}
            </span>
            <span class="text-sm font-bold text-gray-800 dark:text-white">
              {{ totalWordsPlaced }}
            </span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-700 dark:text-gray-300">
              {{ t("gameStats.totalScore") }}
            </span>
            <span class="text-sm font-bold text-gray-800 dark:text-white">
              {{ totalScore }}
            </span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-700 dark:text-gray-300">
              {{ t("gameStats.averageScore") }}
            </span>
            <span class="text-sm font-bold text-gray-800 dark:text-white">
              {{ averageScorePerWord }}
            </span>
          </div>
        </div>
      </div>

      <!-- Longest Word -->
      <div v-if="longestWord" class="space-y-2">
        <h4
          class="text-xs font-semibold uppercase text-gray-600 dark:text-gray-400"
        >
          {{ t("gameStats.longestWord") }}
        </h4>
        <div class="bg-gray-50 dark:bg-gray-600 rounded-lg p-3">
          <div class="flex justify-between items-center mb-1">
            <span class="text-sm font-semibold text-gray-800 dark:text-white">
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
      </div>

      <!-- Highest Scoring Word -->
      <div v-if="highestScoringWord" class="space-y-2">
        <h4
          class="text-xs font-semibold uppercase text-gray-600 dark:text-gray-400"
        >
          {{ t("gameStats.highestScoringWord") }}
        </h4>
        <div class="bg-gray-50 dark:bg-gray-600 rounded-lg p-3">
          <div class="flex justify-between items-center mb-1">
            <span class="text-sm font-semibold text-gray-800 dark:text-white">
              {{ highestScoringWord.word }}
            </span>
            <span class="text-sm font-bold text-blue-600 dark:text-blue-400">
              {{ highestScoringWord.points }} {{ t("common.points") }}
            </span>
          </div>
          <div class="text-xs text-gray-600 dark:text-gray-400">
            {{ t("gameStats.by") }} {{ highestScoringWord.playerName }}
          </div>
        </div>
      </div>

      <!-- Player Statistics -->
      <div v-if="playerStats.length > 0" class="space-y-2">
        <h4
          class="text-xs font-semibold uppercase text-gray-600 dark:text-gray-400"
        >
          {{ t("gameStats.byPlayer") }}
        </h4>
        <div class="space-y-2">
          <div
            v-for="stat in playerStats"
            :key="stat.playerId"
            class="bg-gray-50 dark:bg-gray-600 rounded-lg p-3 space-y-1"
          >
            <div class="font-semibold text-sm text-gray-800 dark:text-white">
              {{ stat.playerName }}
            </div>
            <div class="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span class="text-gray-600 dark:text-gray-400">
                  {{ t("gameStats.words") }}:
                </span>
                <span class="font-semibold text-gray-800 dark:text-white ml-1">
                  {{ stat.totalWords }}
                </span>
              </div>
              <div>
                <span class="text-gray-600 dark:text-gray-400">
                  {{ t("gameStats.total") }}:
                </span>
                <span class="font-semibold text-gray-800 dark:text-white ml-1">
                  {{ stat.totalPoints }}
                </span>
              </div>
              <div>
                <span class="text-gray-600 dark:text-gray-400">
                  {{ t("gameStats.average") }}:
                </span>
                <span class="font-semibold text-gray-800 dark:text-white ml-1">
                  {{ stat.averagePoints }}
                </span>
              </div>
              <div v-if="stat.longestWord">
                <span class="text-gray-600 dark:text-gray-400">
                  {{ t("gameStats.longest") }}:
                </span>
                <span class="font-semibold text-gray-800 dark:text-white ml-1">
                  {{ stat.longestWord.word }} ({{ stat.longestWord.length }})
                </span>
              </div>
            </div>
            <div
              v-if="stat.highestScoringWord"
              class="text-xs pt-1 border-t border-gray-300 dark:border-gray-500"
            >
              <span class="text-gray-600 dark:text-gray-400">
                {{ t("gameStats.bestWord") }}:
              </span>
              <span class="font-semibold text-blue-600 dark:text-blue-400 ml-1">
                {{ stat.highestScoringWord.word }} ({{
                  stat.highestScoringWord.points
                }})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
