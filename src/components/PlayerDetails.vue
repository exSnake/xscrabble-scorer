<script setup>
import { computed, toRefs, ref } from "vue";
import { useI18n } from "vue-i18n";
import { LucideX, LucideTrash2 } from "@/components/icons";

const { t } = useI18n();

const showWords = ref(true);
const props = defineProps({
  player: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["delete", "activate", "deleteWord"]);

const { player } = toRefs(props);

const handleDeleteWord = (id) => {
  emit("deleteWord", { id: id, player: player.value });
};

const handleDeleteSelf = (e) => {
  e.stopPropagation();
  emit("delete", player.value);
};

const points = computed(() => {
  return player.value.words.reduce(
    (prev, next) => prev + Number.parseInt(next.points),
    0,
  );
});

const handlePlayerClick = () => {
  // if already active, toggle words, else emit activate event
  if (player.value.active) {
    showWords.value = !showWords.value;
  } else {
    emit("activate", player.value);
  }
};
</script>

<template>
  <div
    class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-lg border-2 transition-all duration-200 hover:shadow-xl"
    :class="{
      'border-rose-500 dark:border-rose-400 ring-2 ring-rose-200 dark:ring-rose-900/50':
        player.active,
      'border-gray-200 dark:border-gray-700': !player.active,
    }"
    @click="handlePlayerClick"
  >
    <!-- Header -->
    <div
      class="flex justify-between items-center px-4 sm:px-6 py-4 rounded-t-xl transition-colors duration-200"
      :class="{
        'bg-rose-500 dark:bg-rose-600': player.active,
        'bg-gray-100 dark:bg-gray-700': !player.active,
      }"
    >
      <div
        class="font-bold text-lg sm:text-xl"
        :class="{
          'text-white': player.active,
          'text-gray-900 dark:text-white': !player.active,
        }"
      >
        {{ player.name }}
      </div>
      <div class="flex items-center gap-3 sm:gap-4">
        <div
          class="text-sm sm:text-base font-semibold"
          :class="{
            'text-white': player.active,
            'text-gray-700 dark:text-gray-300': !player.active,
          }"
        >
          {{ t("playerDetails.points") }} {{ points }}
        </div>
        <button
          class="p-1.5 sm:p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors duration-200 flex items-center justify-center"
          :title="t('playerDetails.deletePlayer')"
          @click.stop="handleDeleteSelf"
        >
          <LucideTrash2 class="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>

    <!-- Words List -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-screen"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 max-h-screen"
      leave-to-class="opacity-0 max-h-0"
    >
      <div
        v-if="showWords && player.words.length > 0"
        class="divide-y divide-gray-200 dark:divide-gray-700"
      >
        <div
          v-for="word in player.words"
          :key="word.id"
          class="flex justify-between items-center px-4 sm:px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
        >
          <div class="flex-1">
            <div
              class="uppercase font-semibold text-sm sm:text-base"
              :class="{
                'text-gray-900 dark:text-white': player.active,
                'text-gray-700 dark:text-gray-300': !player.active,
              }"
            >
              {{ word.text }}
            </div>
          </div>
          <div class="flex items-center gap-3">
            <input
              v-model="word.points"
              class="w-16 sm:w-20 px-2 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right text-sm sm:text-base font-semibold focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
              type="number"
              @click.stop
            />
            <button
              class="p-1.5 sm:p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors duration-200 flex items-center justify-center"
              :title="t('playerDetails.delete')"
              @click.stop="() => handleDeleteWord(word.id)"
            >
              <LucideX class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Empty State -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showWords && player.words.length === 0"
        class="px-4 sm:px-6 py-6 text-center"
      >
        <div class="text-sm text-gray-500 dark:text-gray-400">
          {{ t("playerDetails.noWords") }}
        </div>
      </div>
    </Transition>
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
