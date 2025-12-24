<script setup>
import { computed } from "vue";

const props = defineProps({
  timer: Object,
  totalSeconds: {
    type: Number,
    default: 90,
  },
});

const emit = defineEmits(["pause", "restart"]);

const GREEN_PERCENTAGE = 50;
const AMBER_PERCENTAGE = 25;

const percentage = computed(() => {
  if (!props.timer) {
    return 100;
  }
  const total = props.totalSeconds;
  const remaining = props.timer.seconds + props.timer.minutes * 60;
  return Math.max(0, Math.min(100, (remaining / total) * 100));
});

const strokeColor = computed(() => {
  const pct = percentage.value;
  if (pct > GREEN_PERCENTAGE) return "green";
  if (pct > AMBER_PERCENTAGE) return "amber";
  return "red";
});

const circumference = 2 * Math.PI * 45; // radius = 45

const strokeDashoffset = computed(() => {
  return circumference - (percentage.value / 100) * circumference;
});

const timeDisplay = computed(() => {
  if (!props.timer) return "0:00";
  const minutes = props.timer.minutes;
  const seconds = props.timer.seconds;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
});
</script>

<template>
  <div
    class="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center h-full"
  >
    <div class="relative w-32 h-32 mb-4">
      <!-- Background circle -->
      <svg class="transform -rotate-90 w-full h-full">
        <circle
          cx="64"
          cy="64"
          r="45"
          stroke="currentColor"
          stroke-width="8"
          fill="none"
          class="text-gray-200 dark:text-gray-600"
        />
        <!-- Progress circle -->
        <circle
          cx="64"
          cy="64"
          r="45"
          :stroke="strokeColor"
          stroke-width="8"
          fill="none"
          stroke-linecap="round"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="strokeDashoffset"
          class="transition-all duration-1000 ease-linear"
        />
      </svg>
      <!-- Time display -->
      <div class="absolute inset-0 flex items-center justify-center">
        <span class="text-3xl font-bold text-gray-800 dark:text-white">
          {{ timeDisplay }}
        </span>
      </div>
    </div>

    <!-- Controls -->
    <div class="flex gap-2">
      <button
        @click="emit('pause')"
        class="px-4 py-2 rounded-lg font-semibold transition-colors"
        :class="
          timer?.isRunning
            ? 'bg-amber-500 hover:bg-amber-600 text-white'
            : 'bg-green-500 hover:bg-green-600 text-white'
        "
      >
        {{ timer?.isRunning ? "⏸ Pause" : "▶ Resume" }}
      </button>
      <button
        @click="emit('restart')"
        class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
      >
        🔄 Restart
      </button>
    </div>
  </div>
</template>
