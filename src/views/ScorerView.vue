<script setup>
import PlayerDetails from "@/components/PlayerDetails.vue";
import TimerTool from "@/components/TimerTool.vue";
import { useGameStore } from "@/stores/GameStore";
import { TButton, TInput } from "@variantjs/vue";
import { ref } from "vue";
import ScorerAddWord from "@/components/ScorerAddWord.vue";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { LucideUserPlus, LucideUsers, LucideClock } from "@/components/icons";

const { t } = useI18n();

const newPlayerName = ref("");
const game = useGameStore();
const {
  activatePlayer,
  addPlayer,
  addWord,
  deletePlayer,
  deleteWord,
  pauseTimer,
  restartTimer,
} = game;
const { activePlayer, canAddPlayer, players, timer } = storeToRefs(game);

const handleDeleteWord = ({ id, player }) => {
  deleteWord({ wordId: id, player });
};

const handleAddPlayer = () => {
  addPlayer(newPlayerName.value);
  newPlayerName.value = "";
};

const handleAddWord = (word) => {
  addWord(word);
};
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <!-- Page Header -->
      <div class="mb-6 sm:mb-8">
        <h1
          class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2"
        >
          {{ t("nav.scorer") }}
        </h1>
        <p class="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          Aggiungi parole e traccia i punteggi dei giocatori
        </p>
      </div>

      <!-- Timer Card -->
      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-4"
      >
        <div
          v-if="timer"
          class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 mb-6"
        >
          <div class="flex items-center gap-3 mb-4">
            <div class="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <LucideClock class="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2
              class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white"
            >
              Timer
            </h2>
          </div>
          <TimerTool
            :timer="timer"
            @restart="restartTimer()"
            @pause="pauseTimer()"
          />
        </div>
      </Transition>

      <!-- Add Word Card -->
      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-4"
      >
        <div
          v-if="activePlayer"
          class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 mb-6"
        >
          <ScorerAddWord :enabled="activePlayer != null" @add="handleAddWord" />
        </div>
      </Transition>

      <!-- Add Player Card -->
      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-4"
      >
        <div
          v-if="canAddPlayer"
          class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 mb-6"
        >
          <div class="flex items-center gap-3 mb-4">
            <div class="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
              <LucideUserPlus
                class="w-5 h-5 text-green-600 dark:text-green-400"
              />
            </div>
            <h2
              class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white"
            >
              {{ t("scorerView.addPlayerToStart") }}
            </h2>
          </div>
          <div class="flex flex-col sm:flex-row gap-3">
            <TInput
              v-model="newPlayerName"
              :placeholder="t('scorerView.newPlayer')"
              class="flex-1 h-12 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              type="text"
              @keyup.enter="handleAddPlayer"
            />
            <TButton
              class="h-12 px-6 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 transition-all duration-200"
              :disabled="!canAddPlayer || !newPlayerName.trim()"
              @click="handleAddPlayer"
            >
              {{ t("scorerView.add") }}
            </TButton>
          </div>
        </div>
      </Transition>

      <!-- Players Section -->
      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-4"
      >
        <div v-if="players.length === 0" class="text-center py-12">
          <div
            class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4"
          >
            <LucideUsers class="w-8 h-8 text-gray-400 dark:text-gray-500" />
          </div>
          <div
            class="text-xl sm:text-2xl font-medium text-gray-700 dark:text-gray-300"
          >
            {{ t("scorerView.addPlayerToStart") }}
          </div>
        </div>
      </Transition>

      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-4"
      >
        <div v-if="players.length > 0" class="space-y-6">
          <div class="flex items-center gap-3">
            <div class="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
              <LucideUsers
                class="w-5 h-5 text-purple-600 dark:text-purple-400"
              />
            </div>
            <h2
              class="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white"
            >
              {{ t("scorerView.players") }}
            </h2>
          </div>
          <div
            v-if="activePlayer === null"
            class="text-sm text-gray-500 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3"
          >
            {{ t("scorerView.selectPlayerToAddWord") }}
          </div>
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            <PlayerDetails
              v-for="player in game.players"
              :key="player.id"
              :player="player"
              @delete-word="handleDeleteWord"
              @delete="deletePlayer(player)"
              @activate="activatePlayer(player)"
            />
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.v-enter-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
