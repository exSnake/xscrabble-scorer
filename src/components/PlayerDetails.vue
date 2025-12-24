<script setup>
import { computed, toRefs, ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const showWords = ref(true);
const props = defineProps({
  player: Object,
});

const emit = defineEmits(["delete", "activate", "deleteWord"]);

const { player } = toRefs(props);

const handleDeleteWord = (id) => {
  emit("deleteWord", { id: id, player: player.value });
};

const handleDeleteSelf = () => {
  emit("delete", player.value);
};

const points = computed(() => {
  return player.value.words.reduce(
    (prev, next) => prev + parseInt(next.points),
    0
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
    :class="{
      'dark:bg-gray-600 bg-gray-200 rounded-lg': true,
      'ring ring-emerald-300': player.active,
    }"
    @click="handlePlayerClick"
  >
    <!-- Header -->
    <div
      :class="{
        'flex justify-between items-center px-4 py-2 overflow-hidden bg-gray-400 text-white font-bold text-lg': true,
        'rounded-t-lg': player.words.length > 0,
        'rounded-lg': player.words.length === 0 || !showWords,
      }"
    >
      <div>{{ player.name }}</div>
      <div class="flex items-center gap-4 cursor-pointer">
        <div>{{ t("playerDetails.points") }} {{ points }}</div>
        <div
          @click="handleDeleteSelf"
          class="text-white bg-red-800 px-2 py-1 rounded-lg font-bold"
        >
          X
        </div>
      </div>
    </div>
    <!-- Words Rows -->
    <Transition>
      <div class="text-sm" v-if="showWords">
        <div
          v-for="(word, index) in player.words"
          :key="word.id"
          class="flex justify-between items-center space-y-2"
        >
          <div
            :class="{
              'flex justify-between w-full py-2 items-center px-4': true,
              'border-b border-white dark:border-gray-400':
                player.words.length - 1 !== index,
            }"
          >
            <div>
              <div class="uppercase">{{ word.text }}</div>
            </div>
            <div class="flex space-x-2">
              <div class="flex items-center">
                <input
                  class="text-right p-1 rounded-lg w-12 dark:bg-gray-500 dark:text-white"
                  v-model="word.points"
                />
              </div>
              <div
                @click.stop="() => handleDeleteWord(word.id)"
                class="text-white bg-red-800 px-2 py-1 rounded-lg font-bold"
              >
                X
              </div>
            </div>
          </div>
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
