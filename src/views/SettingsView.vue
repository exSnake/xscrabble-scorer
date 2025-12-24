<script setup>
import { TInput, TSelect } from "@variantjs/vue";
import { useGameStore } from "@/stores/GameStore";
import { useBoardGameStore } from "@/stores/BoardGameStore";
import BoardConfigSelector from "@/components/board/BoardConfigSelector.vue";
import { storeToRefs } from "pinia";
import { computed, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const game = useGameStore();
const { bonus, language, maxWordLength, settings, seconds } = storeToRefs(game);

const boardGame = useBoardGameStore();
const { seconds: boardSeconds, bonus: boardBonus, language: boardLanguage } = storeToRefs(boardGame);

// Sync language changes to board game store
watch(language, (newLanguage, oldLanguage) => {
  console.log("[SettingsView] Language changed from", oldLanguage, "to", newLanguage);
  boardLanguage.value = newLanguage;
  console.log("[SettingsView] boardLanguage set to:", boardLanguage.value);
});

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
    console.log("[SettingsView] After set - seconds:", seconds.value, "boardSeconds:", boardSeconds.value);
  },
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
</script>
<template>
  <div
    class="container mx-auto my-4 rounded-lg bg-white dark:bg-gray-700 min-h-screen"
  >
    <h1 class="text-4xl ml-4 uppercase">{{ t("settings.title") }}</h1>
    <div class="border-gray-200 dark:border-gray-600 border-t-2 mx-4" />
    <div class="w-fit p-4">
      <div class="grid grid-cols-2 gap-2">
        <div class="flex flex-col">
          <div class="uppercase">{{ t("settings.timer") }}</div>
          <div class="text-xs">{{ t("settings.seconds") }}</div>
        </div>
        <TInput
          class="h-12 max-w-sm"
          v-model.number="secondsComputed"
          @keypress="handleNumberInputKeyPress"
        />
        <div class="flex flex-col">
          <div class="uppercase">{{ t("settings.language") }}</div>
          <div class="text-xs">{{ t("settings.points") }}</div>
        </div>
        <TSelect
          v-if="settings"
          class="h-12 max-w-sm"
          v-model="language"
          :options="settings.languages"
        />
        <div class="flex flex-col">
          <div class="uppercase">{{ t("settings.bonus") }}</div>
          <div class="text-xs">{{ t("settings.points") }}</div>
        </div>
        <input
          type="text"
          class="h-12 max-w-sm text-gray-900 rounded"
          v-model="bonusComputed"
          @keypress="handleNumberInputKeyPress"
        />
        <div class="flex flex-col">
          <div class="uppercase">{{ t("settings.maxWordLength") }}</div>
          <div class="text-xs">{{ t("settings.number") }}</div>
        </div>
        <TInput
          class="h-12 max-w-sm"
          v-model.number="maxWordLengthComputed"
          @keypress="handleNumberInputKeyPress"
        />
      </div>
    </div>

    <!-- Board Game Settings Section -->
    <h2 class="text-3xl ml-4 mt-8 uppercase">{{ t("settings.boardGameSettings") }}</h2>
    <div class="border-gray-200 dark:border-gray-600 border-t-2 mx-4" />
    <div class="w-full p-4">
      <BoardConfigSelector />
    </div>
  </div>
</template>
<style scoped></style>
