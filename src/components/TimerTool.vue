<script setup>
import { useLocaleStore } from "@/stores/LocaleStore";
import {
  ref,
  watch,
  onMounted,
  computed,
  onBeforeMount,
  onBeforeUnmount,
} from "vue";

const zeroPad = (num, places) => String(num).padStart(places, "0");

const localeStore = useLocaleStore();
const { t } = localeStore;

const props = defineProps({
  timer: {
    type: Object,
    required: true,
  },
  canAddPlayer: Boolean,
  initialTime: {
    type: Number,
    default: 180, // 3 minuti in secondi
  },
});

const emit = defineEmits(["restart", "pause", "openAddPlayerModal"]);

const tenSecondsSound = ref(null);
const endSound = ref(null);
const audioContext = ref(null);
const soundsPlayed = ref({
  tenSeconds: false,
  end: false,
  lastSecond: null,
});

const timerAnimation = ref("");
const timerClass = ref("");

const actualInitialTime = ref(props.initialTime || 180);

const isSmallScreen = ref(false);

const svgSize = computed(() => (isSmallScreen.value ? 180 : 240));
const circleRadius = computed(() => (isSmallScreen.value ? 80 : 108));
const circleCenterPoint = computed(() => svgSize.value / 2);

onBeforeMount(() => {
  if (props.timer) {
    actualInitialTime.value = props.timer.minutes * 60 + props.timer.seconds;
  } else if (props.initialTime) {
    actualInitialTime.value = props.initialTime;
  }
});

const updateTimerReference = () => {
  if (props.timer) {
    actualInitialTime.value = props.timer.minutes * 60 + props.timer.seconds;
  }
};
defineExpose({ updateTimerReference });

const totalSeconds = computed(() => {
  if (!props.timer) return 0;
  return props.timer.minutes * 60 + props.timer.seconds;
});

const timerColor = computed(() => {
  if (!props.timer) return "text-blue-600";

  if (totalSeconds.value <= 10) return "text-red-600";
  if (totalSeconds.value <= 30) return "text-orange-500";
  return "text-blue-600";
});

const progressColor = computed(() => {
  if (!props.timer) return "stroke-blue-600";

  if (totalSeconds.value <= 10) return "stroke-red-600";
  if (totalSeconds.value <= 30) return "stroke-orange-500";
  return "stroke-blue-600";
});

const circumference = computed(() => 2 * Math.PI * circleRadius.value);

const dashOffset = computed(() => {
  if (!props.timer) return 0;
  return circumference.value * (1 - progress.value / 100);
});

const progress = computed(() => {
  if (!props.timer) return 100;
  return (totalSeconds.value / actualInitialTime.value) * 100;
});

const playTickSound = () => {
  if (!audioContext.value) return;

  try {
    const oscillator = audioContext.value.createOscillator();
    const gainNode = audioContext.value.createGain();

    let volume = 0.05;
    let frequency = 600;

    if (totalSeconds.value <= 10) {
      volume = 0.1 + (10 - totalSeconds.value) * 0.02;
      frequency = 800 + (10 - totalSeconds.value) * 40;
    }

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;

    gainNode.gain.value = 0;
    gainNode.gain.setValueAtTime(0, audioContext.value.currentTime);
    gainNode.gain.linearRampToValueAtTime(
      volume,
      audioContext.value.currentTime + 0.01
    );
    gainNode.gain.linearRampToValueAtTime(
      0,
      audioContext.value.currentTime + 0.1
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
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext.value = new AudioContext();
  } catch (error) {
    console.error("Web Audio API non supportata:", error);
  }

  if (endSound.value) endSound.value.volume = 1.0;

  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);

  if (props.timer) {
    const currentTotal = props.timer.minutes * 60 + props.timer.seconds;

    if (currentTotal < props.initialTime) {
      actualInitialTime.value = props.initialTime;
    } else {
      actualInitialTime.value = currentTotal;
    }
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkScreenSize);

  if (audioContext.value && audioContext.value.state !== "closed") {
    audioContext.value.close().catch((error) => {
      console.error("Errore nella chiusura del contesto audio:", error);
    });
  }
});

function checkScreenSize() {
  isSmallScreen.value = window.innerWidth < 640;
}

watch(
  () => props.timer,
  (newTimer, oldTimer) => {
    if (!newTimer) return;

    const seconds = newTimer.minutes * 60 + newTimer.seconds;
    const oldSeconds = oldTimer
      ? oldTimer.minutes * 60 + oldTimer.seconds
      : null;

    // Rileva fine timer
    const justReachedZero =
      seconds === 0 && oldSeconds !== null && oldSeconds > 0;
    const isAtZeroAndStopped =
      seconds === 0 && oldTimer?.isRunning && !newTimer.isRunning;
    const isTimerFinished = justReachedZero || isAtZeroAndStopped;

    // Riproduci suoni di fine
    if (seconds === 0 && !soundsPlayed.value.end) {
      if (endSound.value) {
        endSound.value.volume = 1.0;
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
        }, 700);
      }

      soundsPlayed.value.end = true;
      timerAnimation.value = "end-animation";
    }

    if (!newTimer.isRunning) {
      if (!isTimerFinished && seconds !== 0) {
        soundsPlayed.value = {
          tenSeconds: false,
          end: false,
          lastSecond: null,
        };
      }
      timerAnimation.value = seconds === 0 ? "end-animation" : "";
      timerClass.value = "";
      return;
    }

    if (seconds <= 10) {
      timerAnimation.value = "pulse-animation";
      timerClass.value = "timer-urgent";
    } else if (seconds <= 30) {
      timerAnimation.value = "gentle-pulse";
      timerClass.value = "timer-warning";
    } else {
      timerAnimation.value = "";
      timerClass.value = "";
    }

    if (seconds === 10 && !soundsPlayed.value.tenSeconds) {
      tenSecondsSound.value?.play();
      soundsPlayed.value.tenSeconds = true;
    }

    // Tick ogni secondo
    if (newTimer.isRunning && seconds !== soundsPlayed.value.lastSecond) {
      if (audioContext.value && audioContext.value.state === "suspended") {
        audioContext.value.resume();
      }

      playTickSound();
      soundsPlayed.value.lastSecond = seconds;
    }

    // Reset suoni al riavvio
    if (
      newTimer.minutes === oldTimer?.minutes &&
      newTimer.seconds > oldTimer?.seconds
    ) {
      soundsPlayed.value = { tenSeconds: false, end: false, lastSecond: null };
    }
  },
  { deep: true }
);
</script>

<template>
  <div class="flex justify-center items-center w-full py-6">
    <div
      v-if="timer"
      :class="[
        'flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-700 rounded-3xl backdrop-blur-lg transition-all duration-400 w-full max-w-[360px]',
        timerClass === 'timer-urgent'
          ? 'shadow-lg shadow-red-500/20'
          : timerClass === 'timer-warning'
          ? 'shadow-orange-500/15'
          : 'shadow-black/15',
      ]"
    >
      <div class="relative flex flex-col items-center justify-center">
        <svg
          class="-rotate-90 mb-2 transition-all duration-300"
          :width="svgSize"
          :height="svgSize"
        >
          <circle
            class="stroke-slate-400/20 transition-stroke duration-300"
            stroke-width="10"
            fill="transparent"
            :r="circleRadius"
            :cx="circleCenterPoint"
            :cy="circleCenterPoint"
          />
          <circle
            :class="[
              'transition-all duration-300',
              progressColor === 'stroke-blue-600'
                ? 'stroke-blue-600'
                : progressColor === 'stroke-orange-500'
                ? 'stroke-orange-500'
                : 'stroke-red-600',
            ]"
            stroke-width="10"
            stroke-linecap="round"
            fill="transparent"
            :r="circleRadius"
            :cx="circleCenterPoint"
            :cy="circleCenterPoint"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="dashOffset"
          />
        </svg>

        <div
          class="absolute left-1/2 -translate-x-1/2 -translate-y-10 transition-all duration-300 mb-2"
          :class="[
            timerAnimation,
            isSmallScreen ? 'text-[2.5rem]' : 'text-[3.2rem]',
            'font-bold font-[\'Roboto_Mono\',_monospace]',
            timerColor === 'text-blue-600'
              ? 'text-blue-600'
              : timerColor === 'text-orange-500'
              ? 'text-orange-500'
              : 'text-red-600',
          ]"
        >
          {{ zeroPad(timer.minutes, 2) }}:{{ zeroPad(timer.seconds, 2) }}
        </div>

        <div class="flex items-center justify-center gap-6 mt-6">
          <button
            class="flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 shadow-lg hover:-translate-y-1 active:translate-y-0.5"
            :class="[
              timer.isRunning
                ? 'w-14 h-14 bg-blue-600/90 text-white hover:bg-blue-500'
                : 'w-14 h-14 bg-green-500/90 text-white hover:bg-green-400',
            ]"
            @click="emit('pause')"
          >
            <LucidePause v-if="timer.isRunning" class="w-7 h-7" />
            <LucidePlay v-if="!timer.isRunning" class="w-7 h-7" />
          </button>

          <button
            class="flex items-center justify-center w-12 h-12 rounded-full bg-lime-500/90 text-white cursor-pointer transition-all duration-300 shadow-lg hover:-translate-y-1 hover:bg-lime-400 active:translate-y-0.5"
            @click="emit('restart')"
          >
            <LucideRefreshCw class="w-7 h-7" />
          </button>

          <button
            v-if="canAddPlayer"
            class="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/90 text-white cursor-pointer transition-all duration-300 shadow-lg hover:-translate-y-1 hover:bg-blue-600 active:translate-y-0.5"
            :title="t('scorer.addPlayer')"
            @click="emit('openAddPlayerModal')"
          >
            <LucideUserPlus class="w-7 h-7" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0% {
    transform: scale(1) translateX(-50%) translateY(-50%);
  }
  50% {
    transform: scale(1.05) translateX(-50%) translateY(-50%);
  }
  100% {
    transform: scale(1) translateX(-50%) translateY(-50%);
  }
}

@keyframes gentle-pulse {
  0% {
    transform: scale(1) translateX(-50%) translateY(-50%);
  }
  50% {
    transform: scale(1.02) translateX(-50%) translateY(-50%);
  }
  100% {
    transform: scale(1) translateX(-50%) translateY(-50%);
  }
}

@keyframes end-flash {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.pulse-animation {
  animation: pulse 0.5s infinite;
}

.gentle-pulse {
  animation: gentle-pulse 1.5s infinite;
}

.end-animation {
  animation: end-flash 0.5s infinite;
}
</style>
