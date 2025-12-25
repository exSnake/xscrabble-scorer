<script setup>
import BoardGrid from "@/components/board/BoardGrid.vue";
import BoardWordPlacement from "@/components/board/BoardWordPlacement.vue";
import CircularTimer from "@/components/board/CircularTimer.vue";
import LeaderBoard from "@/components/board/LeaderBoard.vue";
import PlayerDetailsModal from "@/components/board/PlayerDetailsModal.vue";
import GlobalStats from "@/components/board/GlobalStats.vue";
import BestWords from "@/components/board/BestWords.vue";
import TopPlayers from "@/components/board/TopPlayers.vue";
import MoveHistory from "@/components/board/MoveHistory.vue";
import GameExportImport from "@/components/board/GameExportImport.vue";
import { useBoardGameStore } from "@/stores/BoardGameStore";
import { ref, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const selectedPlayerForModal = ref(null);
const showPlayerModal = ref(false);
const boardGame = useBoardGameStore();
const {
  activatePlayer,
  addPlayer,
  placeWord,
  deletePlayer,
  deleteWord,
  updateWordPoints,
  pauseTimer,
  restartTimer,
  resetBoard,
} = boardGame;

const {
  activePlayer,
  players,
  timer,
  boardGrid,
  currentBoardConfig,
  canAddPlayer,
  canResetBoard,
  seconds,
} = storeToRefs(boardGame);

const handleDeleteWord = ({ id, player }) => {
  deleteWord({ wordId: id, player });
};

const handleUpdateWordPoints = ({ wordId, player, newPoints }) => {
  updateWordPoints({ wordId, player, newPoints });
};

const handlePlaceWord = (wordData) => {
  placeWord(wordData);
};

const handleSelectPlayer = (player) => {
  selectedPlayerForModal.value = player;
  showPlayerModal.value = true;
};

const handleDeletePlayer = (player) => {
  deletePlayer(player);
  showPlayerModal.value = false;
};

const handleAddPlayer = (name) => {
  addPlayer(name);
};

const handleResetBoard = () => {
  resetBoard();
};

// Debug: watch seconds changes
watch(
  seconds,
  (newSeconds, oldSeconds) => {
    console.log(
      "[BoardView] seconds changed from",
      oldSeconds,
      "to",
      newSeconds,
    );
  },
  { immediate: true },
);

// Import from URL on mount (if present)
onMounted(() => {
  // Import is handled in store's onMounted, but we can add additional logic here if needed
});
</script>

<template>
  <div class="bg-white dark:bg-gray-800 min-h-screen p-4">
    <div class="max-w-[1600px] mx-auto">
      <!-- Export/Import Controls -->
      <div class="mb-4 flex justify-end">
        <GameExportImport />
      </div>

      <!-- Main Layout: Board left, Timer and LeaderBoard right -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <!-- Left: Board (spans 2 columns on large screens) -->
        <div
          class="lg:col-span-2 bg-white dark:bg-gray-700 rounded-xl shadow-lg p-4"
        >
          <div class="mx-auto w-fit">
            <!-- Header aligned to board edges -->
            <div class="flex justify-between items-center mb-3">
              <h2
                class="text-sm font-bold uppercase text-gray-700 dark:text-gray-300"
              >
                Scrabble Board
              </h2>
              <div
                v-if="activePlayer"
                class="text-sm font-semibold bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full"
              >
                {{
                  activePlayer
                    ? t("boardView.playerTurn", { name: activePlayer.name })
                    : ""
                }}
              </div>
            </div>

            <!-- Board Grid -->
            <BoardGrid
              v-if="currentBoardConfig"
              :grid="boardGrid"
              :board-config="currentBoardConfig"
            />
            <div v-else class="w-full flex items-center justify-center p-8">
              <div class="text-gray-500 dark:text-gray-400">
                {{ t("boardView.loading") }}
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Timer, LeaderBoard, Stats, and History (stack vertically) -->
        <div class="space-y-4 flex flex-col">
          <!-- Timer -->
          <div class="flex-1 min-h-[200px]">
            <CircularTimer
              :timer="timer"
              :total-seconds="seconds"
              @pause="pauseTimer"
              @restart="restartTimer"
            />
          </div>

          <!-- LeaderBoard -->
          <div class="flex-1 min-h-[200px]">
            <LeaderBoard
              :players="players"
              :active-player="activePlayer"
              :can-add-player="canAddPlayer"
              :can-reset-board="canResetBoard"
              @select-player="handleSelectPlayer"
              @activate-player="activatePlayer"
              @add-player="handleAddPlayer"
              @reset-board="handleResetBoard"
            />
          </div>

          <!-- Move History -->
          <div class="flex-1 min-h-[200px]">
            <MoveHistory />
          </div>
        </div>
      </div>

      <!-- Statistics Cards (below board, flex layout) -->
      <div class="mt-4 flex flex-wrap gap-4">
        <!-- Global Stats -->
        <div class="flex-1 min-w-[300px]">
          <GlobalStats />
        </div>

        <!-- Best Words -->
        <div class="flex-1 min-w-[300px]">
          <BestWords />
        </div>

        <!-- Top Players -->
        <div class="flex-1 min-w-[300px]">
          <TopPlayers />
        </div>
      </div>

      <!-- Floating Word Input (appears when cell is selected) -->
      <BoardWordPlacement
        :enabled="activePlayer != null"
        @place="handlePlaceWord"
      />

      <!-- Player Details Modal -->
      <PlayerDetailsModal
        :player="selectedPlayerForModal"
        :show="showPlayerModal"
        @close="showPlayerModal = false"
        @delete-word="handleDeleteWord"
        @delete-player="handleDeletePlayer"
        @update-word-points="handleUpdateWordPoints"
      />
    </div>
  </div>
</template>

<style scoped>
/* Transition animations */
.v-enter-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
