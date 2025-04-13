<script setup>
import { TInput, TSelect } from "@variantjs/vue";
import { useGameStore } from "@/stores/GameStore";
import { useLocaleStore } from "@/stores/LocaleStore";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";

const game = useGameStore();
const localeStore = useLocaleStore();
const { t } = localeStore;
const {
  language: scoreLanguage,
  maxWordLength,
  settings,
  seconds,
  bonus,
} = storeToRefs(game);
const { language: uiLanguage } = storeToRefs(localeStore);

const bonusComputed = computed({
  get: () => bonus.value,
  set: (value) => setNumberValue(bonus, value),
});

const secondsComputed = computed({
  get: () => seconds.value,
  set: (value) => setNumberValue(seconds, value),
});

const maxWordLengthComputed = computed({
  get: () => maxWordLength.value,
  set: (value) => setNumberValue(maxWordLength, value),
});

const setNumberValue = (ref, value) => {
  ref.value = isNaN(parseInt(value)) ? 0 : value;
};

const handleNumberInputKeyPress = (event) => {
  if (event.key && !/\d/.test(event.key)) {
    event.preventDefault();
  }
};

// Definiamo direttamente le opzioni della lingua
const languageOptions = ref([
  { code: "it", name: "Italiano" },
  { code: "en", name: "English" },
  { code: "nl", name: "Nederlands" },
  { code: "fr", name: "Français" },
  { code: "es", name: "Español" },
  { code: "de", name: "Deutsch" },
  { code: "et", name: "Eesti" },
  { code: "pt", name: "Português" },
  { code: "sahibba", name: "Sahibba" },
]);
</script>
<template>
  <div
    class="container mx-auto bg-gradient-to-b from-white to-gray-50 px-3 sm:px-4 md:px-6 py-4 sm:py-6 dark:from-gray-800 dark:to-gray-900 min-h-screen w-full overflow-x-hidden max-w-7xl"
  >
    <div
      class="rounded-xl bg-white p-6 dark:bg-gray-800 shadow-md border dark:border-gray-700 transition-all duration-200"
    >
      <h1
        class="text-3xl sm:text-4xl font-semibold mb-4 text-gray-800 dark:text-white"
      >
        {{ t("settings.title") }}
      </h1>
      <div
        class="w-full border-t border-gray-200 dark:border-gray-600 mb-6"
      ></div>

      <div class="max-w-3xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- UI Language Setting -->
          <div
            class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <div class="flex flex-col mb-2">
              <div
                class="text-lg font-medium text-gray-800 dark:text-white uppercase"
              >
                {{ t("settings.language") }}
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                {{ t("settings.interfaceLanguage") }}
              </div>
            </div>
            <select
              v-model="uiLanguage"
              class="h-12 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg"
            >
              <option
                v-for="lang in languageOptions"
                :key="lang.code"
                :value="lang.code"
              >
                {{ lang.name }}
              </option>
            </select>
          </div>

          <!-- Score Language Setting -->
          <div
            class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <div class="flex flex-col mb-2">
              <div
                class="text-lg font-medium text-gray-800 dark:text-white uppercase"
              >
                {{ t("settings.letterScores") }}
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                {{ t("settings.scoreLanguage") }}
              </div>
            </div>
            <TSelect
              v-if="settings"
              class="h-12 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-900 dark:text-white"
              v-model="scoreLanguage"
              :options="settings.languages"
            />
          </div>

          <!-- Timer Setting -->
          <div
            class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <div class="flex flex-col mb-2">
              <div
                class="text-lg font-medium text-gray-800 dark:text-white uppercase"
              >
                {{ t("settings.timer") }}
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                ({{ t("settings.seconds") }})
              </div>
            </div>
            <TInput
              class="h-12 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 text-gray-900 dark:text-white"
              v-model.number="secondsComputed"
              @keypress="handleNumberInputKeyPress"
            />
          </div>

          <!-- Bonus Setting -->
          <div
            class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <div class="flex flex-col mb-2">
              <div
                class="text-lg font-medium text-gray-800 dark:text-white uppercase"
              >
                {{ t("settings.bonusPoints") }}
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                ({{ t("general.points") }})
              </div>
            </div>
            <TInput
              class="h-12 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 text-gray-900 dark:text-white"
              v-model.number="bonusComputed"
              @keypress="handleNumberInputKeyPress"
            />
          </div>

          <!-- Max Word Length Setting -->
          <div
            class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <div class="flex flex-col mb-2">
              <div
                class="text-lg font-medium text-gray-800 dark:text-white uppercase"
              >
                {{ t("settings.maxWordLength") }}
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                ({{ t("settings.characterCount") }})
              </div>
            </div>
            <TInput
              class="h-12 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 text-gray-900 dark:text-white"
              v-model.number="maxWordLengthComputed"
              @keypress="handleNumberInputKeyPress"
            />
          </div>
        </div>

        <div class="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          {{ t("settings.autoSave") }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Aggiunge un overlay al TSelect per correggere il testo scuro in dark mode */
:deep(.dark .vs__dropdown-toggle) {
  color: white;
}

:deep(.dark .vs__selected) {
  color: white;
}

:deep(.dark .vs__search) {
  color: white;
}
</style>
