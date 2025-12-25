<script setup>
import { computed, ref, watch, onMounted, onBeforeUnmount } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
  timer: {
    type: Object,
    default: null,
  },
  totalSeconds: {
    type: Number,
    default: 90,
  },
});

const emit = defineEmits(["pause", "restart"]);

const tenSecondsSound = ref(null);
const endSound = ref(null);
const audioContext = ref(null);
const soundsPlayed = ref({
  tenSeconds: false,
  end: false,
  lastSecond: null,
});

const GREEN_PERCENTAGE = 50;
const AMBER_PERCENTAGE = 25;
const CIRCLE_RADIUS = 45;
const VOLUME_INCREMENT = 0.02;
const FREQUENCY_BASE = 800;
const FREQUENCY_INCREMENT = 40;
const END_SOUND_DELAY = 700;

const totalRemainingSeconds = computed(() => {
  if (!props.timer) return 0;
  return props.timer.seconds + props.timer.minutes * 60;
});

const percentage = computed(() => {
  if (!props.timer) {
    return 100;
  }
  const total = props.totalSeconds;
  const remaining = totalRemainingSeconds.value;
  return Math.max(0, Math.min(100, (remaining / total) * 100));
});

const strokeColor = computed(() => {
  const pct = percentage.value;
  if (pct > GREEN_PERCENTAGE) return "green";
  if (pct > AMBER_PERCENTAGE) return "orange";
  return "red";
});

const circumference = 2 * Math.PI * CIRCLE_RADIUS;

const strokeDashoffset = computed(() => {
  return circumference - (percentage.value / 100) * circumference;
});

const timeDisplay = computed(() => {
  if (!props.timer) return "0:00";
  const minutes = props.timer.minutes;
  const seconds = props.timer.seconds;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
});

const playEndSound = () => {
  if (!endSound.value) return;

  endSound.value.volume = 1;
  endSound.value.load();
  endSound.value.play().catch((error) => {
    console.error("Errore nella riproduzione MP3:", error);
  });

  setTimeout(() => {
    if (endSound.value) {
      endSound.value.load();
      endSound.value.play().catch((error) => {
        console.error("Errore nella seconda riproduzione MP3:", error);
      });
    }
  }, END_SOUND_DELAY);
};

const playTickSound = () => {
  if (!audioContext.value) return;

  try {
    const oscillator = audioContext.value.createOscillator();
    const gainNode = audioContext.value.createGain();

    let volume = 0.05;
    let frequency = 600;

    if (totalRemainingSeconds.value <= 10) {
      volume = 0.1 + (10 - totalRemainingSeconds.value) * VOLUME_INCREMENT;
      frequency =
        FREQUENCY_BASE +
        (10 - totalRemainingSeconds.value) * FREQUENCY_INCREMENT;
    }

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;

    gainNode.gain.value = 0;
    gainNode.gain.setValueAtTime(0, audioContext.value.currentTime);
    gainNode.gain.linearRampToValueAtTime(
      volume,
      audioContext.value.currentTime + 0.01,
    );
    gainNode.gain.linearRampToValueAtTime(
      0,
      audioContext.value.currentTime + 0.1,
    );

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.value.destination);

    oscillator.start();
    oscillator.stop(audioContext.value.currentTime + 0.1);
  } catch (error) {
    console.error("Errore nella riproduzione audio:", error);
  }
};

onMounted(() => {
  tenSecondsSound.value = new Audio("/sounds/countdown.mp3");
  endSound.value = new Audio("/sounds/timer-end.mp3");

  try {
    globalThis.AudioContext =
      globalThis.AudioContext || globalThis.webkitAudioContext;
    audioContext.value = new AudioContext();
  } catch (error) {
    console.error("Web Audio API non supportata:", error);
  }

  if (endSound.value) endSound.value.volume = 1;
});

onBeforeUnmount(() => {
  if (audioContext.value && audioContext.value.state !== "closed") {
    audioContext.value.close().catch((error) => {
      console.error("Errore nella chiusura del contesto audio:", error);
    });
  }
});

const handleTimerStopped = (newTimer, seconds, isTimerFinished) => {
  if (seconds === 0 && !isTimerFinished) {
    return;
  }

  if (seconds !== 0) {
    soundsPlayed.value = {
      tenSeconds: false,
      end: false,
      lastSecond: null,
    };
  }
};

const handleTimerRunning = (newTimer, seconds) => {
  if (seconds === 10 && !soundsPlayed.value.tenSeconds) {
    tenSecondsSound.value?.play();
    soundsPlayed.value.tenSeconds = true;
  }

  // Tick ogni secondo
  if (seconds !== soundsPlayed.value.lastSecond) {
    if (audioContext.value && audioContext.value.state === "suspended") {
      audioContext.value.resume();
    }

    playTickSound();
    soundsPlayed.value.lastSecond = seconds;
  }
};

const handleTimerReset = (newTimer, oldTimer) => {
  if (
    newTimer.minutes === oldTimer?.minutes &&
    newTimer.seconds > oldTimer?.seconds
  ) {
    soundsPlayed.value = { tenSeconds: false, end: false, lastSecond: null };
  }
};

watch(
  () => props.timer,
  (newTimer, oldTimer) => {
    if (!newTimer) return;

    const seconds = totalRemainingSeconds.value;
    const oldSeconds = oldTimer
      ? oldTimer.seconds + oldTimer.minutes * 60
      : null;

    // Rileva fine timer
    const justReachedZero =
      seconds === 0 && oldSeconds !== null && oldSeconds > 0;
    const isAtZeroAndStopped =
      seconds === 0 && oldTimer?.isRunning && !newTimer.isRunning;
    const isTimerFinished = justReachedZero || isAtZeroAndStopped;

    // Riproduci suoni di fine
    if (seconds === 0 && !soundsPlayed.value.end) {
      playEndSound();
      soundsPlayed.value.end = true;
    }

    if (!newTimer.isRunning) {
      handleTimerStopped(newTimer, seconds, isTimerFinished);
      return;
    }

    handleTimerRunning(newTimer, seconds);
    handleTimerReset(newTimer, oldTimer);
  },
  { deep: true },
);
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
          :r="CIRCLE_RADIUS"
          stroke="currentColor"
          stroke-width="8"
          fill="none"
          class="text-gray-200 dark:text-gray-600"
        />
        <!-- Progress circle -->
        <circle
          cx="64"
          cy="64"
          :r="CIRCLE_RADIUS"
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
        class="px-4 py-2 rounded-lg font-semibold transition-colors"
        :class="
          timer?.isRunning
            ? 'bg-amber-500 hover:bg-amber-600 text-white'
            : 'bg-green-500 hover:bg-green-600 text-white'
        "
        @click="emit('pause')"
      >
        {{
          timer?.isRunning
            ? `⏸ ${t("timer.pause")}`
            : `▶ ${t("timer.resume")}`
        }}
      </button>
      <button
        class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
        @click="emit('restart')"
      >
        🔄 {{ t("timer.restart") }}
      </button>
    </div>
  </div>
</template>
