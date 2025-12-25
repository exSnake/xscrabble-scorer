<script setup>
import PlayerDetails from "@/components/PlayerDetails.vue";
import TimerTool from "@/components/TimerTool.vue";
import { useGameStore } from "@/stores/GameStore";
import { TButton, TInput } from "@variantjs/vue";
import { ref } from "vue";
import ScorerAddWord from "@/components/ScorerAddWord.vue";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import {
  LucideUserPlus,
  LucideUsers,
  LucideClock,
  LucideInfo,
} from "@/components/icons";

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
          {{ t("scorerView.pageSubtitle") }}
        </p>
      </div>

      <!-- Hero Onboarding Card - Solo quando non ci sono giocatori -->
      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="players.length === 0"
          class="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl shadow-xl border-2 border-blue-200 dark:border-blue-800 p-6 sm:p-8 mb-6"
        >
          <div class="text-center mb-6">
            <h2
              class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2"
            >
              {{ t("scorerView.welcomeTitle") }}
            </h2>
            <p class="text-gray-600 dark:text-gray-400">
              {{ t("scorerView.welcomeSubtitle") }}
            </p>
          </div>

          <!-- Guida passo-passo -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <!-- Passo 1 -->
            <div
              class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-amber-200 dark:border-amber-800"
            >
              <div class="flex items-center gap-3 mb-3">
                <div
                  class="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500 text-white font-bold text-sm"
                >
                  1
                </div>
                <h3
                  class="font-bold text-gray-900 dark:text-white text-sm sm:text-base"
                >
                  {{ t("scorerView.step1") }}
                </h3>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ t("scorerView.step1Desc") }}
              </p>
              <div class="mt-3 flex items-center gap-2">
                <LucideUserPlus class="w-4 h-4 text-amber-500" />
                <span
                  class="text-xs text-amber-600 dark:text-amber-400 font-medium"
                >
                  {{ t("scorerView.addPlayerToStart") }}
                </span>
              </div>
            </div>

            <!-- Passo 2 -->
            <div
              class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-blue-200 dark:border-blue-800 opacity-60"
            >
              <div class="flex items-center gap-3 mb-3">
                <div
                  class="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-bold text-sm"
                >
                  2
                </div>
                <h3
                  class="font-bold text-gray-900 dark:text-white text-sm sm:text-base"
                >
                  {{ t("scorerView.step2") }}
                </h3>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ t("scorerView.step2Desc") }}
              </p>
            </div>

            <!-- Passo 3 -->
            <div
              class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-rose-200 dark:border-rose-800 opacity-60"
            >
              <div class="flex items-center gap-3 mb-3">
                <div
                  class="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500 text-white font-bold text-sm"
                >
                  3
                </div>
                <h3
                  class="font-bold text-gray-900 dark:text-white text-sm sm:text-base"
                >
                  {{ t("scorerView.step3") }}
                </h3>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ t("scorerView.step3Desc") }}
              </p>
            </div>
          </div>
        </div>
      </Transition>

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

      <!-- Add Word Card - Sempre Visibile con Stati Diversi -->
      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-4"
      >
        <div
          v-show="true"
          class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 mb-6 relative"
        >
          <!-- Overlay disabilitato quando non c'è giocatore attivo -->
          <div
            v-if="!activePlayer"
            class="absolute inset-0 bg-gradient-to-br from-gray-50/95 to-gray-100/95 dark:from-gray-800/95 dark:to-gray-900/95 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center gap-4 z-10"
          >
            <div
              class="flex items-center gap-3 bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-lg border-2 border-blue-200 dark:border-blue-800"
            >
              <LucideInfo class="w-6 h-6 text-blue-500 dark:text-blue-400" />
              <div>
                <div
                  class="font-semibold text-gray-900 dark:text-white text-lg"
                >
                  {{
                    players.length === 0
                      ? t("scorerView.addPlayersFirst")
                      : t("scorerView.selectPlayerFirst")
                  }}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {{
                    players.length === 0
                      ? t("scorerView.clickBelowToAdd")
                      : t("scorerView.selectPlayerToAddWord")
                  }}
                </div>
              </div>
            </div>
          </div>

          <!-- Form di inserimento parola (sfumato quando disabilitato) -->
          <div :class="{ 'opacity-30': !activePlayer }">
            <ScorerAddWord
              :enabled="activePlayer != null"
              @add="handleAddWord"
            />
          </div>
        </div>
      </Transition>

      <!-- Add Player Card - Enfatizzato -->
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
          class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-lg p-6 sm:p-8 mb-6 transition-all duration-300"
          :class="{
            'border-2 border-amber-400 dark:border-amber-500 ring-4 ring-amber-200 dark:ring-amber-900/50 animate-pulse-slow':
              players.length === 0,
            'border border-gray-200/50 dark:border-gray-700/50':
              players.length > 0,
          }"
        >
          <div class="flex items-center gap-3 mb-4">
            <div
              class="p-2 rounded-lg transition-colors duration-300"
              :class="{
                'bg-amber-100 dark:bg-amber-900/30': players.length === 0,
                'bg-green-100 dark:bg-green-900/30': players.length > 0,
              }"
            >
              <LucideUserPlus
                class="w-5 h-5 transition-colors duration-300"
                :class="{
                  'text-amber-600 dark:text-amber-400': players.length === 0,
                  'text-green-600 dark:text-green-400': players.length > 0,
                }"
              />
            </div>
            <h2
              class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white"
            >
              {{
                players.length === 0
                  ? t("scorerView.step1")
                  : t("scorerView.addMorePlayers")
              }}
            </h2>
          </div>

          <!-- Descrizione quando non ci sono giocatori -->
          <p
            v-if="players.length === 0"
            class="text-sm text-gray-600 dark:text-gray-400 mb-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3"
          >
            {{ t("scorerView.step1Desc") }}
          </p>

          <div class="flex flex-col sm:flex-row gap-3">
            <TInput
              v-model="newPlayerName"
              :placeholder="t('scorerView.newPlayer')"
              class="flex-1 h-12 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 transition-all duration-200"
              :class="{
                'focus:ring-amber-500 focus:border-amber-500':
                  players.length === 0,
                'focus:ring-green-500 focus:border-green-500':
                  players.length > 0,
              }"
              type="text"
              @keyup.enter="handleAddPlayer"
            />
            <TButton
              class="h-12 px-6 rounded-lg text-white font-medium disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 transition-all duration-200"
              :class="{
                'bg-amber-500 hover:bg-amber-600': players.length === 0,
                'bg-green-500 hover:bg-green-600': players.length > 0,
              }"
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
        <div v-if="players.length === 0" class="text-center py-8">
          <div
            class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-900/30 mb-4"
          >
            <LucideUsers class="w-10 h-10 text-amber-500 dark:text-amber-400" />
          </div>
          <div
            class="text-xl sm:text-2xl font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {{ t("scorerView.noPlayersYet") }}
          </div>
          <div class="text-sm text-gray-500 dark:text-gray-400">
            {{ t("scorerView.clickBelowToAdd") }}
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
          <!-- Messaggio enfatizzato quando giocatori esistono ma nessuno attivo -->
          <div
            v-if="activePlayer === null"
            class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-300 dark:border-blue-700 rounded-xl p-4 mb-4 shadow-md"
          >
            <div class="flex items-center gap-3">
              <div
                class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 flex-shrink-0"
              >
                <LucideInfo class="w-5 h-5 text-white" />
              </div>
              <div>
                <div class="font-semibold text-gray-900 dark:text-white">
                  {{ t("scorerView.step2") }}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  {{ t("scorerView.selectPlayerToAddWord") }}
                </div>
              </div>
            </div>
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
