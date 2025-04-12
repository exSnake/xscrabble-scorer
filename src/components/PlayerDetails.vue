<script setup>
import { useLocaleStore } from "@/stores/LocaleStore";
import { computed } from "vue";

const localeStore = useLocaleStore();
const { t } = localeStore;

defineProps({
  player: Object,
});

const emit = defineEmits(["delete", "deleteWord", "activate"]);

const getTotalPoints = (player) => {
  return player.words.reduce((acc, word) => acc + word.points, 0);
};
</script>

<template>
  <div
    class="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800 cursor-pointer"
    :class="{
      'border-2 border-blue-500 dark:border-blue-400': player.active,
      'border-2 border-gray-200 dark:border-gray-700': !player.active,
    }"
    @click="$emit('activate')"
  >
    <div class="flex justify-between items-center mb-2">
      <div class="flex items-center">
        <div
          class="mr-2 h-2 w-2 rounded-full"
          :class="{
            'bg-green-500': player.active,
            'bg-gray-400': !player.active,
          }"
        ></div>
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ player.name }}
        </h2>
      </div>
      <div class="flex items-center gap-2">
        <div
          class="rounded-full bg-blue-100 py-1 px-2 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200"
        >
          {{ getTotalPoints(player) }}
          <span class="opacity-70 text-[8px]">{{ t('general.points') }}</span>
        </div>
        <button
          class="rounded p-1 text-gray-600 hover:bg-gray-200 hover:text-red-700 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-red-400"
          @click.stop="$emit('delete')"
        >
          <LucideTrash2 class="h-4 w-4" />
        </button>
      </div>
    </div>

    <div class="mt-4 space-y-2">
      <div
        v-for="word in player.words"
        :key="word.id"
        class="flex items-center justify-between rounded-md bg-gray-50 p-2 dark:bg-gray-700"
      >
        <span class="text-gray-600 dark:text-gray-300">{{ word.text }}</span>
        <div class="flex items-center gap-1">
          <span class="text-blue-600 dark:text-blue-300">{{ word.points }}</span>
          <button
            class="ml-2 rounded p-1 text-gray-400 hover:text-red-600 transition-colors dark:text-gray-500 dark:hover:text-red-400"
            @click.stop="$emit('deleteWord', { id: word.id, player })"
          >
            <LucideCircleX class="h-4 w-4" />
          </button>
        </div>
      </div>
      <div
        v-if="player.words.length === 0"
        class="flex justify-center py-3 text-sm italic text-gray-400 dark:text-gray-500"
      >
        {{ t('scorer.noWordsYet') }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.v-leave-active,
.v-enter-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
