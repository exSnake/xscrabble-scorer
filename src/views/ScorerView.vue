<script setup>
import PlayerDetails from "@/components/PlayerDetails.vue";
import TimerTool from "@/components/TimerTool.vue";
import { useGameStore } from "@/stores/GameStore";
import { useLocaleStore } from "@/stores/LocaleStore";
import { TButton, TInput } from "@variantjs/vue";
import { ref } from "vue";
import ScorerAddWord from "@/components/ScorerAddWord.vue";
import { storeToRefs } from "pinia";

const newPlayerName = ref("");
const showAddPlayerModal = ref(false);
const game = useGameStore();
const localeStore = useLocaleStore();
const { t } = localeStore;
const {
  activatePlayer,
  addPlayer,
  addWord,
  deletePlayer,
  deleteWord,
  pauseTimer,
  restartTimer,
} = game;
const timerTool = ref(null);
const { activePlayer, canAddPlayer, players, seconds, timer } =
  storeToRefs(game);

const handleDeleteWord = ({ id, player }) => {
  deleteWord({ wordId: id, player });
};

const handleAddPlayer = () => {
  if (newPlayerName.value.trim()) {
    addPlayer(newPlayerName.value);
    newPlayerName.value = "";
    showAddPlayerModal.value = false;
  }
};

const openAddPlayerModal = () => {
  showAddPlayerModal.value = true;
  // Focus sull'input dopo l'apertura del modale
  setTimeout(() => {
    document.getElementById("newPlayerInput")?.focus();
  }, 100);
};

const closeAddPlayerModal = () => {
  showAddPlayerModal.value = false;
  newPlayerName.value = "";
};

const handleAddWord = (word) => {
  addWord(word);
};

const handleRestartTimer = () => {
  restartTimer();
  timerTool.value.updateTimerReference();
};
</script>

<template>
  <div
    class="container mx-auto bg-gradient-to-b from-white to-gray-50 px-3 sm:px-4 md:px-6 py-4 sm:py-6 dark:from-gray-800 dark:to-gray-900 min-h-screen w-full overflow-x-hidden max-w-7xl"
  >
    <!-- Timer -->
    <div class="mb-4 sm:mb-6">
      <TimerTool
        ref="timerTool"
        class="flex flex-1 w-full flex-col items-center rounded-lg sm:rounded-xl bg-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 text-5xl sm:text-6xl md:text-7xl text-gray-700 shadow-lg dark:bg-gray-800 dark:text-white border dark:border-gray-700 transition-all duration-200 hover:shadow-xl"
        :timer="timer"
        :initial-time="seconds"
        :canAddPlayer="canAddPlayer"
        @restart="handleRestartTimer()"
        @pause="pauseTimer()"
        @openAddPlayerModal="openAddPlayerModal"
      />
    </div>

    <div
      class="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-start"
    >
      <!-- Add Word -->
      <Transition>
        <div
          class="order-1 flex w-full flex-col rounded-lg sm:rounded-xl bg-white p-3 sm:p-4 dark:bg-gray-800 shadow-md border dark:border-gray-700 transition-all duration-200 hover:shadow-lg"
          v-if="activePlayer"
        >
          <ScorerAddWord :enabled="activePlayer != null" @add="handleAddWord" />
        </div>
      </Transition>
    </div>

    <!-- Players Section -->
    <div class="mt-6 sm:mt-8">
      <Transition>
        <div v-if="players.length == 0" class="text-center mt-6 sm:mt-8">
          <div
            class="text-xl sm:text-2xl font-medium text-gray-600 dark:text-gray-300"
          >
            {{ t("scorer.addPlayerToStart") }}
          </div>
          <div
            class="mt-2 sm:mt-4 text-sm sm:text-base text-gray-500 dark:text-gray-400"
          >
            {{ t("scorer.playersTrackScores") }}
          </div>
          <button
            @click="openAddPlayerModal"
            class="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow transition-colors"
          >
            <div class="flex items-center justify-center gap-2">
              <LucideUserPlus class="w-5 h-5" />
              <span>{{ t("scorer.addPlayer") }}</span>
            </div>
          </button>
        </div>
      </Transition>

      <Transition>
        <div v-if="players.length != 0" class="mt-4 sm:mt-6">
          <!-- Players title with small hint to click in player to activate -->
          <div class="mb-3 sm:mb-4">
            <div
              class="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white"
            >
              {{ t("scorer.players") }}
            </div>
            <div
              class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1"
              v-if="activePlayer === null"
            >
              {{ t("scorer.selectPlayerToAddWord") }}
            </div>
          </div>

          <!-- Dynamic grid layout based on number of players -->
          <div
            :class="{
              'grid gap-3 sm:gap-4 md:gap-5': true,
              'grid-cols-1 sm:grid-cols-2': players.length <= 3,
              'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4': players.length === 4,
              'grid-cols-1 sm:grid-cols-3 xl:grid-cols-4':
                players.length > 4 && players.length <= 8,
              'grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5':
                players.length > 8,
            }"
          >
            <PlayerDetails
              v-for="player in game.players"
              :key="player.id"
              class="transition-all duration-300 hover:scale-102 hover:shadow-lg w-full h-full"
              :player="player"
              @deleteWord="handleDeleteWord"
              @delete="deletePlayer(player)"
              @activate="activatePlayer(player)"
            />
          </div>
        </div>
      </Transition>
    </div>

    <!-- Modal per aggiungere un nuovo giocatore -->
    <Transition name="fade">
      <div
        v-if="showAddPlayerModal"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div
          class="absolute inset-0 bg-black opacity-50"
          @click="closeAddPlayerModal"
        ></div>
        <div
          class="relative z-10 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-5 sm:p-6 max-w-md w-full"
        >
          <div class="flex justify-between items-center mb-4">
            <h2
              class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white"
            >
              {{ t("scorer.addNewPlayer") }}
            </h2>
            <button
              @click="closeAddPlayerModal"
              class="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <LucideX class="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          <div class="mb-3">
            <TInput
              id="newPlayerInput"
              :placeholder="t('scorer.playerName')"
              class="h-12 w-full bg-gray-50 px-4 py-2 text-gray-900 rounded-lg border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              type="text"
              @keyup.enter="handleAddPlayer"
              v-model="newPlayerName"
            />
          </div>

          <div class="flex justify-end gap-3">
            <button
              @click="closeAddPlayerModal"
              class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {{ t("general.cancelButton") }}
            </button>
            <TButton
              class="h-10 cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-300 disabled:opacity-70"
              @click="handleAddPlayer"
              :disabled="!newPlayerName.trim() || !canAddPlayer"
            >
              {{ t("general.addButton") }}
            </TButton>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.v-enter-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Hover scale effect */
.hover\:scale-102:hover {
  transform: scale(1.02);
}

@media (max-width: 640px) {
  .hover\:scale-102:hover {
    transform: scale(1.01); /* Smaller scale effect on mobile */
  }
}

/* Fade transition for modal */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Correzione per i campi input in dark mode */
:deep(.dark input) {
  color: white;
}
</style>
