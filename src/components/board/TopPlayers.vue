<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useBoardGameStore } from "@/stores/BoardGameStore";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const boardGame = useBoardGameStore();
const { playerStats } = storeToRefs(boardGame);

const topPlayers = computed(() => {
  return [...playerStats.value]
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .slice(0, 3);
});

const hasStats = computed(() => {
  return topPlayers.value.length > 0;
});
</script>

<template>
  <div
    class="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-4 flex flex-col h-[280px] w-full"
  >
    <h3
      class="text-sm font-bold uppercase text-gray-700 dark:text-gray-300 mb-3"
    >
      {{ t("gameStats.topPlayers") }}
    </h3>

    <div v-if="!hasStats" class="flex-1 flex items-center justify-center">
      <p class="text-gray-500 dark:text-gray-400 text-sm text-center">
        {{ t("gameStats.noStats") }}
      </p>
    </div>

    <div v-else class="flex-1 overflow-y-auto space-y-3">
      <div
        v-for="(stat, index) in topPlayers"
        :key="stat.playerId"
        class="bg-gray-50 dark:bg-gray-600 rounded-lg p-3"
      >
        <div class="flex items-center gap-2 mb-2">
          <span class="text-sm font-bold text-gray-600 dark:text-gray-400">
            {{ index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉" }}
          </span>
          <span class="font-semibold text-sm text-gray-800 dark:text-white">
            {{ stat.playerName }}
          </span>
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
              {{ stat.longestWord.length }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
