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
import TurnAnnouncer from "@/components/board/TurnAnnouncer.vue";
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
  completeTurnAnnouncement,
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
  turnAnnouncement,
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
        <!-- Timer (first on mobile, inside right column on desktop) -->
        <div class="order-1 lg:hidden">
          <CircularTimer
            :timer="timer"
            :total-seconds="seconds"
            @pause="pauseTimer"
            @restart="restartTimer"
          />
        </div>

        <!-- Left: Board (spans 2 columns on large screens) -->
        <div
          class="lg:col-span-2 order-2 lg:order-1 bg-white dark:bg-gray-700 rounded-xl shadow-lg py-4 lg:p-4 relative"
        >
          <!-- Overlay quando non ci sono giocatori -->
          <div
            v-if="players.length === 0"
            class="absolute inset-0 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center z-10"
          >
            <div
              class="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 border-2 border-amber-400 dark:border-amber-600 rounded-xl p-6 shadow-xl max-w-md mx-4"
            >
              <div class="text-center">
                <div
                  class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500 mb-4"
                >
                  <svg
                    class="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3
                  class="text-xl font-bold text-gray-900 dark:text-white mb-2"
                >
                  {{ t("boardView.addPlayerToStart") }}
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {{ t("boardView.addPlayersPrompt") }}
                </p>
                <div
                  class="flex items-center justify-center gap-2 text-amber-600 dark:text-amber-400"
                >
                  <span class="text-2xl">→</span>
                  <span class="font-semibold">Ranking</span>
                </div>
              </div>
            </div>
          </div>

          <div
            class="mx-auto w-fit"
            :class="{ 'opacity-30': players.length === 0 }"
          >
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
              :disabled="players.length === 0"
            />
            <div v-else class="w-full flex items-center justify-center p-8">
              <div class="text-gray-500 dark:text-gray-400">
                {{ t("boardView.loading") }}
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Timer, LeaderBoard and History (stack vertically on desktop) -->
        <div
          class="gap-2 lg:gap-0 lg:space-y-4 mb-4 flex flex-col order-3 lg:order-2"
        >
          <!-- Timer (hidden on mobile, shown here on desktop) -->
          <div class="hidden lg:block">
            <CircularTimer
              :timer="timer"
              :total-seconds="seconds"
              @pause="pauseTimer"
              @restart="restartTimer"
            />
          </div>

          <!-- LeaderBoard -->
          <div class="flex-1 min-h-[250px]">
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
          <div class="h-[200px] md:h-[200px] flex-shrink-0 mt-0 lg:mt-0">
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

      <!-- Floating Word Input (appears when cell is selected AND there are players) -->
      <BoardWordPlacement
        v-if="players.length > 0"
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

      <!-- Fullscreen Turn Announcement -->
      <TurnAnnouncer
        :player-name="turnAnnouncement.playerName"
        :show="turnAnnouncement.show"
        @animation-complete="completeTurnAnnouncement"
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

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
