<script setup>
import { useLocaleStore } from "@/stores/LocaleStore";
import { storeToRefs } from "pinia";

const zeroPad = (num, places) => String(num).padStart(places, "0");

const localeStore = useLocaleStore();
const { t } = localeStore;

defineProps({
  timer: Object,
  canAddPlayer: Boolean,
});

const emit = defineEmits(["restart", "pause", "openAddPlayerModal"]);
</script>

<template>
  <div>
    <div class="flex items-center justify-between w-full" v-if="timer">
      <div>{{ zeroPad(timer.minutes, 2) }}:{{ zeroPad(timer.seconds, 2) }}</div>
      <div class="flex items-center justify-between gap-2">
        <LucidePause
          v-if="timer.isRunning"
          class="w-16 h-16 cursor-pointer text-blue-600 hover:text-blue-400"
          @click="emit('pause')"
        />
        <LucidePlay
          v-if="!timer.isRunning"
          class="w-16 h-16 cursor-pointer text-green-600 hover:text-green-400"
          @click="emit('pause')"
        />
        <LucideRefreshCw
          class="w-14 h-14 text-green-400 cursor-pointer hover:text-green-600"
          @click="emit('restart')"
        />
        <button
          v-if="canAddPlayer"
          @click="emit('openAddPlayerModal')"
          class="flex items-center justify-center rounded-full h-12 w-12 bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200"
          :title="t('scorer.addPlayer')"
        >
          <LucideUserPlus class="w-6 h-6" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
