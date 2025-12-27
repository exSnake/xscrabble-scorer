<script setup>
import { computed, ref, watch, onMounted, onBeforeUnmount } from "vue";

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

const circumference = 2 * Math.PI * CIRCLE_RADIUS;

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
  endSound.value.play().catch(() => {
    // Ignora errori di autoplay - il suono verrà riprodotto dopo un'interazione
  });

  setTimeout(() => {
    if (endSound.value) {
      endSound.value.load();
      endSound.value.play().catch(() => {
        // Ignora errori di autoplay
      });
    }
  }, END_SOUND_DELAY);
};

const playTickSound = async () => {
  // Crea AudioContext solo se non esiste e solo dopo un'interazione
  if (!audioContext.value) {
    try {
      globalThis.AudioContext =
        globalThis.AudioContext || globalThis.webkitAudioContext;
      audioContext.value = new AudioContext();
      // Se è sospeso, prova a riprendere (richiede interazione utente)
      if (audioContext.value.state === "suspended") {
        await audioContext.value.resume();
      }
    } catch (error) {
      console.error("Web Audio API non supportata:", error);
      return;
    }
  }

  // Se l'AudioContext è sospeso, prova a riprendere
  if (audioContext.value.state === "suspended") {
    try {
      await audioContext.value.resume();
    } catch {
      // Se non può essere ripreso, esci silenziosamente
      return;
    }
  }

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

  if (endSound.value) endSound.value.volume = 1;

  // AudioContext verrà creato solo dopo un'interazione dell'utente
  // Non crearlo qui per evitare errori di autoplay policy
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

const handleTimerRunning = async (newTimer, seconds) => {
  if (seconds === 10 && !soundsPlayed.value.tenSeconds) {
    tenSecondsSound.value?.play().catch(() => {
      // Ignora errori di autoplay
    });
    soundsPlayed.value.tenSeconds = true;
  }

  // Tick ogni secondo
  if (seconds !== soundsPlayed.value.lastSecond) {
    await playTickSound();
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
    class="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-2 lg:p-4 flex flex-row items-center justify-center gap-2 lg:gap-3 h-full"
  >
    <!-- Pause/Resume Button (left) -->
    <button
      class="px-3 py-2 rounded-lg font-semibold transition-colors flex-shrink-0"
      :class="
        timer?.isRunning
          ? 'bg-amber-500 hover:bg-amber-600 text-white'
          : 'bg-green-500 hover:bg-green-600 text-white'
      "
      @click="emit('pause')"
    >
      <span>{{ timer?.isRunning ? "⏸" : "▶" }}</span>
    </button>

    <!-- Timer Circle -->
    <div class="relative w-24 h-24 lg:w-28 lg:h-28 flex-shrink-0">
      <!-- Background circle -->
      <svg
        class="transform -rotate-90 w-full h-full"
        viewBox="0 0 128 128"
        preserveAspectRatio="xMidYMid meet"
      >
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
        <span
          class="text-xl lg:text-2xl font-bold text-gray-800 dark:text-white"
        >
          {{ timeDisplay }}
        </span>
      </div>
    </div>

    <!-- Restart Button (right) -->
    <button
      class="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors flex-shrink-0"
      @click="emit('restart')"
    >
      <span>🔄</span>
    </button>
  </div>
</template>
