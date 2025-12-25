<script setup>
import { TSelect } from "@variantjs/vue";
import { useBoardGameStore } from "@/stores/BoardGameStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const boardGame = useBoardGameStore();
const { selectedBoardConfig, boardSize, boardConfigs } = storeToRefs(boardGame);
const { changeBoardConfig, changeBoardSize } = boardGame;

const configOptions = computed(() => {
  if (!boardConfigs.value) return {};

  const options = {};
  for (const [key, config] of Object.entries(boardConfigs.value)) {
    options[key] = config.name;
  }
  return options;
});

const sizeOptions = {
  11: "11x11 (Small)",
  13: "13x13 (Medium)",
  15: "15x15 (Standard)",
  17: "17x17 (Large)",
  19: "19x19 (Extra Large)",
};

function handleConfigChange(value) {
  changeBoardConfig(value);
}

function handleSizeChange(value) {
  if (confirm(t("boardConfigSelector.changeSizeConfirm"))) {
    changeBoardSize(parseInt(value));
  }
  // If user cancels, the select will automatically revert to the previous value
}
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {{ t("boardConfigSelector.boardConfiguration") }}
      </label>
      <TSelect
        :model-value="selectedBoardConfig"
        :options="configOptions"
        class="w-full h-12 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        @update:model-value="handleConfigChange"
      />
    </div>

    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {{ t("boardConfigSelector.boardSize") }}
      </label>
      <TSelect
        :model-value="boardSize"
        :options="sizeOptions"
        class="w-full h-12 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        @update:model-value="handleSizeChange"
      />
    </div>
  </div>
</template>

<style scoped>
:deep(.t-select) {
  @apply transition-all duration-200;
}

:deep(.t-select:focus) {
  @apply ring-2 ring-blue-500 border-transparent;
}
</style>
