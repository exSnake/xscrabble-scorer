<script setup>
import { useLocaleStore } from "@/stores/LocaleStore";

const localeStore = useLocaleStore();
const { t } = localeStore;

defineProps({
  player: Object,
});

defineEmits(["delete", "deleteWord", "activate"]);

const getTotalPoints = (player) => {
  return player.words.reduce((acc, word) => acc + word.points, 0);
};

const getBonusClass = (bonus) => {
  switch (bonus) {
    case 0:
      return "bg-amber-200 text-gray-500 border-gray-400"; // Jolly
    case 2:
      return "bg-blue-400 text-gray-700 border-blue-500"; // Doppio
    case 3:
      return "bg-blue-700 text-white border-blue-800"; // Triplo
    default:
      return "bg-amber-200 text-gray-700 border-amber-400"; // Normale
  }
};

const getWordBonusClass = (word) => {
  if (word.hasExtraBonus) {
    return word.wordBonus === 2
      ? "border-l-4 border-l-green-500 border-t-4 border-t-yellow-400 border-b-4 border-b-yellow-400 border-r-4 border-r-yellow-400"
      : word.wordBonus === 3
      ? "border-l-4 border-l-green-500 border-t-4 border-t-red-600 border-b-4 border-b-red-600 border-r-4 border-r-red-600"
      : "border-l-4 border-l-green-500";
  } else {
    return word.wordBonus === 2
      ? "border-2 border-yellow-400"
      : word.wordBonus === 3
      ? "border-2 border-red-600"
      : "";
  }
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
          <span class="opacity-70 text-[8px]">{{ t("general.points") }}</span>
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
        class="rounded-md p-2 transition-all duration-200"
        :class="[getWordBonusClass(word), 'bg-gray-50 dark:bg-gray-700']"
      >
        <div class="grid grid-cols-12 py-1 items-center">
          <div class="col-span-10 flex flex-wrap gap-[2px]">
            <template v-if="word.letters">
              <div
                v-for="(letter, index) in word.letters"
                :key="index"
                class="w-6 h-6 flex flex-col items-center justify-center border-[1.5px] rounded text-xs select-none relative"
                :class="getBonusClass(letter.bonus)"
              >
                <span class="font-bold">{{ letter.char }}</span>
                <span
                  v-if="letter.bonus !== 0"
                  class="absolute bottom-0 right-0 text-[7px] font-semibold"
                >
                  {{ letter.points }}
                </span>
              </div>
            </template>
            <span v-else class="text-gray-600 dark:text-gray-300">{{
              word.text
            }}</span>
          </div>
          <span
            class="text-blue-600 dark:text-blue-300 font-semibold bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded-md text-center"
          >
            {{ word.points }}
          </span>

          <button
            class="ml-1 rounded p-1 text-gray-400 hover:text-red-600 transition-colors dark:text-gray-500 dark:hover:text-red-400 flex items-center justify-center"
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
        {{ t("scorer.noWordsYet") }}
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
