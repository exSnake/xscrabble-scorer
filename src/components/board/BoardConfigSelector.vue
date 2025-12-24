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
  <div class="flex flex-wrap gap-2 rounded-lg bg-gray-200 p-3 dark:bg-gray-600">
    <div class="flex-1 min-w-[200px]">
      <label
        class="text-xs uppercase block mb-1 text-gray-700 dark:text-gray-300"
        >{{ t("boardConfigSelector.boardConfiguration") }}</label
      >
      <TSelect
        class="h-10 w-full bg-white dark:bg-gray-700 dark:text-white"
        :model-value="selectedBoardConfig"
        @update:model-value="handleConfigChange"
        :options="configOptions"
      />
    </div>

    <div class="flex-1 min-w-[200px]">
      <label
        class="text-xs uppercase block mb-1 text-gray-700 dark:text-gray-300"
        >{{ t("boardConfigSelector.boardSize") }}</label
      >
      <TSelect
        class="h-10 w-full bg-white dark:bg-gray-700 dark:text-white"
        :model-value="boardSize"
        @update:model-value="handleSizeChange"
        :options="sizeOptions"
      />
    </div>
  </div>
</template>
