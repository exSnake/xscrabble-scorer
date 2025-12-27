<script setup>
import { TInput, TSelect } from "@variantjs/vue";
import { useGameStore } from "@/stores/GameStore";
import { useBoardGameStore } from "@/stores/BoardGameStore";
import BoardConfigSelector from "@/components/board/BoardConfigSelector.vue";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import {
  LucideClock,
  LucideGlobe,
  LucideStar,
  LucideMaximize2,
  LucideGrid,
} from "@/components/icons";

const { t } = useI18n();

const game = useGameStore();
const { bonus, language, maxWordLength, settings, seconds } = storeToRefs(game);

const boardGame = useBoardGameStore();
const { seconds: boardSeconds, bonus: boardBonus } = storeToRefs(boardGame);

const bonusComputed = computed({
  get: () => bonus.value,
  set: (value) => {
    setNumberValue(bonus, value);
    setNumberValue(boardBonus, value);
  },
});

const secondsComputed = computed({
  get: () => seconds.value,
  set: (value) => {
    console.log("[SettingsView] Setting seconds to:", value);
    setNumberValue(seconds, value);
    setNumberValue(boardSeconds, value);
    console.log(
      "[SettingsView] After set - seconds:",
      seconds.value,
      "boardSeconds:",
      boardSeconds.value,
    );
  },
});

const maxWordLengthComputed = computed({
  get: () => maxWordLength.value,
  set: (value) => setNumberValue(maxWordLength, value),
});

const setNumberValue = (ref, value) => {
  ref.value = Number.isNaN(Number.parseInt(value)) ? 0 : value;
};

const handleNumberInputKeyPress = (event) => {
  if (event.key && !/\d/.test(event.key)) {
    event.preventDefault();
  }
};
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <!-- Page Header -->
      <div class="mb-8 sm:mb-12">
        <h1
          class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2"
        >
          {{ t("settings.title") }}
        </h1>
        <p class="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          Personalizza le impostazioni del gioco e della scacchiera
        </p>
      </div>

      <!-- General Settings Card -->
      <div
        class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 mb-6 sm:mb-8"
      >
        <div class="flex items-center gap-3 mb-6">
          <div class="p-2 rounded-lg bg-rose-100 dark:bg-rose-900/30">
            <LucideSettings class="w-5 h-5 text-rose-600 dark:text-rose-400" />
          </div>
          <h2
            class="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white"
          >
            Impostazioni Generali
          </h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <!-- Timer Setting -->
          <div class="space-y-2">
            <label
              class="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <LucideClock class="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span>{{ t("settings.timer") }}</span>
            </label>
            <div class="relative">
              <TInput
                v-model.number="secondsComputed"
                class="w-full h-12 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                placeholder="90"
                @keypress="handleNumberInputKeyPress"
              />
              <span
                class="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500 dark:text-gray-400"
              >
                {{ t("settings.seconds") }}
              </span>
            </div>
          </div>

          <!-- Scoring Dictionary Setting -->
          <div class="space-y-2">
            <label
              class="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <LucideGlobe class="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span>{{ t("settings.scoringDictionary") }}</span>
            </label>
            <TSelect
              v-if="settings"
              v-model="language"
              :options="settings.languages"
              class="w-full h-12 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
            />
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ t("settings.scoringDictionaryHint") }}
            </p>
          </div>

          <!-- Bonus Setting -->
          <div class="space-y-2">
            <label
              class="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <LucideStar class="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span>{{ t("settings.bonus") }}</span>
            </label>
            <div class="relative">
              <input
                v-model="bonusComputed"
                type="text"
                class="w-full h-12 px-4 pr-16 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                placeholder="50"
                @keypress="handleNumberInputKeyPress"
              />
              <span
                class="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500 dark:text-gray-400"
              >
                {{ t("settings.points") }}
              </span>
            </div>
          </div>

          <!-- Max Word Length Setting -->
          <div class="space-y-2">
            <label
              class="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <LucideMaximize2
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
              />
              <span>{{ t("settings.maxWordLength") }}</span>
            </label>
            <div class="relative">
              <TInput
                v-model.number="maxWordLengthComputed"
                class="w-full h-12 px-4 pr-16 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                placeholder="10"
                @keypress="handleNumberInputKeyPress"
              />
              <span
                class="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500 dark:text-gray-400"
              >
                {{ t("settings.number") }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Board Game Settings Card -->
      <div
        class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8"
      >
        <div class="flex items-center gap-3 mb-6">
          <div class="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
            <LucideGrid class="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h2
            class="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white"
          >
            {{ t("settings.boardGameSettings") }}
          </h2>
        </div>

        <div class="w-full">
          <BoardConfigSelector />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom styles for TInput and TSelect to match modern design */
:deep(.t-input),
:deep(.t-select) {
  @apply transition-all duration-200;
}

:deep(.t-input:focus),
:deep(.t-select:focus) {
  @apply ring-2 ring-rose-500 border-transparent;
}
</style>
