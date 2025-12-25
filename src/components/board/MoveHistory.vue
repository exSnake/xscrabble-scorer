<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useBoardGameStore } from "@/stores/BoardGameStore";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const boardGame = useBoardGameStore();
const { moveHistory } = storeToRefs(boardGame);
const { undoLastMove } = boardGame;

const reversedHistory = computed(() => {
  return [...moveHistory.value].reverse();
});

const canUndo = computed(() => {
  return moveHistory.value.length > 0;
});

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const handleUndo = () => {
  undoLastMove();
};
</script>

<template>
  <div
    class="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-4 flex flex-col h-full"
  >
    <div class="flex justify-between items-center mb-3">
      <h3 class="text-sm font-bold uppercase text-gray-700 dark:text-gray-300">
        {{ t("moveHistory.title") }}
      </h3>
      <button
        v-if="canUndo"
        class="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white text-xs rounded-lg font-semibold transition-colors flex items-center gap-1"
        @click="handleUndo"
      >
        <span>↶</span>
        <span>{{ t("moveHistory.undo") }}</span>
      </button>
    </div>

    <div
      v-if="moveHistory.length === 0"
      class="flex-1 flex items-center justify-center"
    >
      <p class="text-gray-500 dark:text-gray-400 text-sm text-center">
        {{ t("moveHistory.noMoves") }}
      </p>
    </div>

    <div v-else class="flex-1 overflow-y-auto space-y-2">
      <div
        v-for="move in reversedHistory"
        :key="move.id"
        class="bg-gray-50 dark:bg-gray-600 rounded-lg p-3 border-l-4"
        :class="{
          'border-blue-500':
            move.id === moveHistory[moveHistory.length - 1]?.id,
          'border-gray-300 dark:border-gray-500':
            move.id !== moveHistory[moveHistory.length - 1]?.id,
        }"
      >
        <div class="flex justify-between items-start mb-1">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <span
                class="text-xs font-semibold text-gray-600 dark:text-gray-400"
              >
                #{{ move.id }}
              </span>
              <span class="text-sm font-bold text-gray-800 dark:text-white">
                {{ move.playerName }}
              </span>
            </div>
            <div
              class="text-lg font-mono font-bold text-gray-800 dark:text-white"
            >
              {{ move.word }}
            </div>
          </div>
          <div class="text-right">
            <div class="text-sm font-bold text-blue-600 dark:text-blue-400">
              +{{ move.points }}
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              {{ formatTime(move.timestamp) }}
            </div>
          </div>
        </div>
        <!-- Breakdown if available -->
        <div
          v-if="move.breakdown"
          class="text-xs text-green-600 dark:text-green-400 mt-1 font-medium"
        >
          {{ move.breakdown }}
        </div>
        <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {{ t("moveHistory.position") }}: ({{ move.startRow }},
          {{ move.startCol }})
          {{ move.direction === "horizontal" ? "→" : "↓" }}
        </div>
      </div>
    </div>
  </div>
</template>
