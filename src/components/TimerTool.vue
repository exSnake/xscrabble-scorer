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
  timer: Object,
  canAddPlayer: Boolean,
  initialTime: {
    type: Number,
    default: 180, // 3 minuti in secondi di default
  },
});

const emit = defineEmits(["restart", "pause", "openAddPlayerModal"]);

// Riferimenti audio
const tenSecondsSound = ref(null);
const endSound = ref(null);
const soundsPlayed = ref({
  tenSeconds: false,
  end: false,
});

// Stato visuale
const timerAnimation = ref("");
const timerClass = ref("");

// Memorizza il tempo iniziale effettivo
const actualInitialTime = ref(props.initialTime || 180); // Initialize with props

// Riferimento per la viewport width
const isSmallScreen = ref(false);

// Dimensioni responsive SVG
const svgSize = computed(() => (isSmallScreen.value ? 180 : 240));
const circleRadius = computed(() => (isSmallScreen.value ? 80 : 108));
const circleCenterPoint = computed(() => svgSize.value / 2);

// Inizializza il tempo iniziale effettivo quando il timer viene caricato
onBeforeMount(() => {
  if (props.timer) {
    console.log("props.timer", props.timer.minutes, props.timer.seconds);
    actualInitialTime.value = props.timer.minutes * 60 + props.timer.seconds;
  } else if (props.initialTime) {
    actualInitialTime.value = props.initialTime;
  }
});

// Expose a method for parent components to explicitly update when resetting
const updateTimerReference = () => {
  if (props.timer) {
    console.log(
      "Updating timer reference to:",
      props.timer.minutes * 60 + props.timer.seconds
    );
    actualInitialTime.value = props.timer.minutes * 60 + props.timer.seconds;
  }
};
defineExpose({ updateTimerReference });

// Calcolo progresso per barra circolare
const totalSeconds = computed(() => {
  if (!props.timer) return 0;
  return props.timer.minutes * 60 + props.timer.seconds;
});

const timerColor = computed(() => {
  if (!props.timer) return "text-blue-600";

  if (totalSeconds.value <= 10) return "text-red-600";
  if (totalSeconds.value <= 30) return "text-orange-500";
  if (props.timer.isRunning) return "text-blue-600";
  return "text-blue-600";
});

const progressColor = computed(() => {
  if (!props.timer) return "stroke-blue-600";

  if (totalSeconds.value <= 10) return "stroke-red-600";
  if (totalSeconds.value <= 30) return "stroke-orange-500";
  if (props.timer.isRunning) return "stroke-blue-600";
  return "stroke-blue-600";
});

// Calculate circumference based on this radius
const circumference = computed(() => 2 * Math.PI * circleRadius.value);

// Calculate the dash offset based on the progress
const dashOffset = computed(() => {
  if (!props.timer) return 0; // No offset (full circle) when timer is null
  return circumference.value * (1 - progress.value / 100);
});

// Make sure progress is correctly calculated based on actualInitialTime
const progress = computed(() => {
  console.log("progress", totalSeconds.value, actualInitialTime.value);
  if (!props.timer) return 100; // Full progress when timer is null
  return (totalSeconds.value / actualInitialTime.value) * 100;
});

// Inizializza i suoni e controlla la dimensione dello schermo
onMounted(() => {
  tenSecondsSound.value = new Audio("/sounds/countdown.mp3");
  endSound.value = new Audio("/sounds/timer-end.mp3");

  // Controlla la dimensione dello schermo
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);

  // If the timer already exists when component mounts (e.g. after navigation),
  // update the actualInitialTime to match what we expect the full value to be
  if (props.timer) {
    // Check if the timer is not at full value
    const currentTotal = props.timer.minutes * 60 + props.timer.seconds;
    console.log("Timer on mount:", currentTotal, "seconds");

    // If totalSeconds is less than initialTime, it means the timer was running
    // or partially depleted before remounting
    if (currentTotal < props.initialTime) {
      console.log(
        "Timer was partially depleted, using initialTime for progress reference"
      );
      actualInitialTime.value = props.initialTime;
    } else {
      // Timer is at full or greater than initialTime, use the current value
      console.log(
        "Timer at full value, using current time for progress reference"
      );
      actualInitialTime.value = currentTotal;
    }

    console.log("Set actualInitialTime to:", actualInitialTime.value);
  }

  console.log("Initial state:", {
    timer: props.timer,
    actualInitialTime: actualInitialTime.value,
    totalSeconds: totalSeconds.value,
    progress: progress.value,
    circumference: circumference.value,
    dashOffset: dashOffset.value,
  });
});

// Rimuovi eventListener al dismount del componente
onBeforeUnmount(() => {
  window.removeEventListener("resize", checkScreenSize);
});

// Controlla la dimensione dello schermo
function checkScreenSize() {
  isSmallScreen.value = window.innerWidth < 640;
}

// Osserva il timer per riprodurre i suoni e cambiare effetti visivi
watch(
  () => props.timer,
  (newTimer, oldTimer) => {
    if (!newTimer) return;

    if (!newTimer.isRunning) {
      soundsPlayed.value = { tenSeconds: false, end: false };
      timerAnimation.value = "";
      timerClass.value = "";
      console.log("Timer stopped");
      return;
    }

    if (newTimer && newTimer.isRunning === false) {
      // When timer is initialized but not running,
      // make sure it shows the full time
      console.log("Timer initialized");
    }

    const seconds = newTimer.minutes * 60 + newTimer.seconds;

    // Imposta animazioni in base al tempo restante
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

    // Riproduci suono quando mancano 10 secondi
    if (seconds === 10 && !soundsPlayed.value.tenSeconds) {
      tenSecondsSound.value?.play();
      soundsPlayed.value.tenSeconds = true;
    }

    // Riproduci suono quando termina
    if (seconds === 0 && !soundsPlayed.value.end) {
      endSound.value?.play();
      soundsPlayed.value.end = true;
      timerAnimation.value = "end-animation";
    }

    // Ripristina soundsPlayed quando si riavvia il timer
    if (
      newTimer.minutes === oldTimer?.minutes &&
      newTimer.seconds > oldTimer?.seconds
    ) {
      soundsPlayed.value = { tenSeconds: false, end: false };
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
        'flex flex-col items-center justify-center p-6 bg-white/[0.08] rounded-3xl backdrop-blur-lg transition-all duration-400 w-full max-w-[360px]',
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
            @click="emit('openAddPlayerModal')"
            class="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/90 text-white cursor-pointer transition-all duration-300 shadow-lg hover:-translate-y-1 hover:bg-blue-600 active:translate-y-0.5"
            :title="t('scorer.addPlayer')"
          >
            <LucideUserPlus class="w-7 h-7" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animazioni che non possono essere facilmente sostituite con Tailwind */
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
