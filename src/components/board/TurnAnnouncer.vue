<script setup>
import { ref, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  playerName: {
    type: String,
    default: "",
  },
  show: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["animation-complete"]);

const { t } = useI18n();
const isVisible = ref(false);
const isAnimatingOut = ref(false);

// Suono per il cambio turno
const playTurnSound = async () => {
  try {
    globalThis.AudioContext =
      globalThis.AudioContext || globalThis.webkitAudioContext;
    const ctx = new AudioContext();

    if (ctx.state === "suspended") {
      await ctx.resume();
    }

    // Suono epico tipo "whoosh" + nota ascendente
    // Prima parte: whoosh con rumore filtrato
    const duration = 0.6;

    // Oscillatore principale - sweep ascendente
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(200, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.3);
    osc1.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.5);
    gain1.gain.setValueAtTime(0, ctx.currentTime);
    gain1.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.1);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + duration);

    // Seconda nota - armonica
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(400, ctx.currentTime + 0.1);
    osc2.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.35);
    gain2.gain.setValueAtTime(0, ctx.currentTime + 0.1);
    gain2.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.2);
    gain2.gain.exponentialRampToValueAtTime(
      0.001,
      ctx.currentTime + duration + 0.1,
    );
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(ctx.currentTime + 0.1);
    osc2.stop(ctx.currentTime + duration + 0.1);

    // Terza nota - finale brillante
    const osc3 = ctx.createOscillator();
    const gain3 = ctx.createGain();
    osc3.type = "sine";
    osc3.frequency.value = 1047; // C6
    gain3.gain.setValueAtTime(0, ctx.currentTime + 0.25);
    gain3.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.3);
    gain3.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    osc3.connect(gain3);
    gain3.connect(ctx.destination);
    osc3.start(ctx.currentTime + 0.25);
    osc3.stop(ctx.currentTime + 0.8);
  } catch (error) {
    console.error("Errore audio cambio turno:", error);
  }
};

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      isVisible.value = true;
      isAnimatingOut.value = false;
      playTurnSound();

      // Dopo 1.5 secondi inizia il fade out
      setTimeout(() => {
        isAnimatingOut.value = true;
      }, 1500);

      // Dopo 2.5 secondi (1.5s visibile + 1s fade out) nascondi e emetti evento
      setTimeout(() => {
        isVisible.value = false;
        isAnimatingOut.value = false;
        emit("animation-complete");
      }, 2500);
    }
  },
);

onMounted(() => {
  if (props.show) {
    isVisible.value = true;
  }
});
</script>

<template>
  <Teleport to="body">
    <Transition name="turn-announce">
      <div
        v-if="isVisible"
        class="turn-announcer"
        :class="{ 'fade-out': isAnimatingOut }"
      >
        <!-- Background overlay con gradiente -->
        <div class="turn-announcer__backdrop"></div>

        <!-- Contenuto centrale -->
        <div class="turn-announcer__content">
          <!-- Linea decorativa superiore -->
          <div class="turn-announcer__line turn-announcer__line--top"></div>

          <!-- Testo principale -->
          <div class="turn-announcer__text">
            <span class="turn-announcer__label">{{
              t("boardView.turnAnnouncerLabel")
            }}</span>
            <span class="turn-announcer__name">{{ playerName }}</span>
          </div>

          <!-- Linea decorativa inferiore -->
          <div class="turn-announcer__line turn-announcer__line--bottom"></div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.turn-announcer {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.turn-announcer__backdrop {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    rgba(0, 0, 0, 0.85) 0%,
    rgba(0, 0, 0, 0.7) 40%,
    rgba(0, 0, 0, 0.4) 70%,
    transparent 100%
  );
  animation: backdrop-pulse 2s ease-in-out;
}

.turn-announcer__content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 4rem;
  animation: content-enter 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.turn-announcer__line {
  width: 0;
  height: 3px;
  background: linear-gradient(
    90deg,
    transparent,
    #f59e0b,
    #fbbf24,
    #f59e0b,
    transparent
  );
  border-radius: 2px;
  animation: line-expand 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.turn-announcer__line--top {
  animation-delay: 0.2s;
}

.turn-announcer__line--bottom {
  animation-delay: 0.4s;
}

.turn-announcer__text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
}

.turn-announcer__label {
  font-size: 1.5rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.3em;
  animation: text-glow 2s ease-in-out;
}

.turn-announcer__name {
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 800;
  color: #fbbf24;
  text-shadow:
    0 0 20px rgba(251, 191, 36, 0.8),
    0 0 40px rgba(251, 191, 36, 0.6),
    0 0 60px rgba(251, 191, 36, 0.4),
    0 4px 8px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.05em;
  animation:
    name-enter 0.8s cubic-bezier(0.34, 1.56, 0.64, 1),
    name-glow 1.5s ease-in-out 0.5s infinite alternate;
}

/* Fade out animation */
.fade-out .turn-announcer__backdrop {
  animation: backdrop-fade-out 1s ease-out forwards;
}

.fade-out .turn-announcer__content {
  animation: content-exit 1s ease-out forwards;
}

.fade-out .turn-announcer__name {
  animation: name-exit 1s ease-out forwards;
}

/* Keyframes */
@keyframes backdrop-pulse {
  0% {
    opacity: 0;
    transform: scale(1.2);
  }
  20% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 1;
  }
}

@keyframes backdrop-fade-out {
  to {
    opacity: 0;
  }
}

@keyframes content-enter {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes content-exit {
  to {
    opacity: 0;
    transform: scale(1.1) translateY(-20px);
  }
}

@keyframes line-expand {
  0% {
    width: 0;
    opacity: 0;
  }
  100% {
    width: min(400px, 80vw);
    opacity: 1;
  }
}

@keyframes text-glow {
  0%,
  100% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
}

@keyframes name-enter {
  0% {
    opacity: 0;
    transform: scale(0.5) translateY(30px);
    filter: blur(10px);
  }
  60% {
    filter: blur(0);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
    filter: blur(0);
  }
}

@keyframes name-glow {
  0% {
    text-shadow:
      0 0 20px rgba(251, 191, 36, 0.8),
      0 0 40px rgba(251, 191, 36, 0.6),
      0 0 60px rgba(251, 191, 36, 0.4),
      0 4px 8px rgba(0, 0, 0, 0.5);
  }
  100% {
    text-shadow:
      0 0 30px rgba(251, 191, 36, 1),
      0 0 60px rgba(251, 191, 36, 0.8),
      0 0 90px rgba(251, 191, 36, 0.5),
      0 4px 8px rgba(0, 0, 0, 0.5);
  }
}

@keyframes name-exit {
  to {
    opacity: 0;
    transform: scale(1.2);
    filter: blur(5px);
  }
}

/* Transition classes */
.turn-announce-enter-active {
  transition: opacity 0.3s ease;
}

.turn-announce-leave-active {
  transition: opacity 0.5s ease;
}

.turn-announce-enter-from,
.turn-announce-leave-to {
  opacity: 0;
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  .turn-announcer__name {
    color: #fcd34d;
  }
}
</style>
