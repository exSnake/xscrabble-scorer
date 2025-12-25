import { ref, onMounted, onBeforeUnmount } from "vue";
import { useStorage } from "@vueuse/core";

// Stato globale condiviso tra tutti i componenti
const soundEnabled = useStorage("sound_enabled", true);
let audioContext = null;
let isInitialized = false;

// Funzioni standalone per uso fuori dai componenti Vue (es. Pinia stores)
const getAudioContext = () => {
  if (!isInitialized || !audioContext) {
    try {
      globalThis.AudioContext =
        globalThis.AudioContext || globalThis.webkitAudioContext;
      audioContext = new AudioContext();
      isInitialized = true;
    } catch (error) {
      console.error("Web Audio API non supportata:", error);
      return null;
    }
  }
  return audioContext;
};

const ensureContext = async () => {
  const ctx = getAudioContext();
  if (ctx?.state === "suspended") {
    await ctx.resume();
  }
  return ctx;
};

/**
 * Funzioni standalone per suoni - utilizzabili ovunque (anche fuori componenti Vue)
 */
export const playSoundError = async () => {
  if (!soundEnabled.value) return;

  const ctx = await ensureContext();
  if (!ctx) return;

  try {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.frequency.setValueAtTime(300, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.2);
    oscillator.type = "sawtooth";

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.25);
  } catch (error) {
    console.error("Errore playSoundError:", error);
  }
};

export const playSoundUndo = async () => {
  if (!soundEnabled.value) return;

  const ctx = await ensureContext();
  if (!ctx) return;

  try {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.frequency.setValueAtTime(600, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15);
    oscillator.type = "triangle";

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.18);
  } catch (error) {
    console.error("Errore playSoundUndo:", error);
  }
};

/**
 * Composable per gestire gli effetti sonori del gioco
 * Usa Web Audio API per suoni sintetici leggeri
 */
export function useSoundEffects() {
  const localAudioContext = ref(null);

  // Inizializza AudioContext (deve essere fatto dopo interazione utente)
  const initAudioContext = () => {
    if (isInitialized && audioContext) {
      localAudioContext.value = audioContext;
      return;
    }

    try {
      globalThis.AudioContext =
        globalThis.AudioContext || globalThis.webkitAudioContext;
      audioContext = new AudioContext();
      localAudioContext.value = audioContext;
      isInitialized = true;
    } catch (error) {
      console.error("Web Audio API non supportata:", error);
    }
  };

  // Resume AudioContext se sospeso (necessario per autoplay policy)
  const ensureAudioContext = async () => {
    if (!localAudioContext.value) {
      initAudioContext();
    }
    if (localAudioContext.value?.state === "suspended") {
      await localAudioContext.value.resume();
    }
    return localAudioContext.value;
  };

  // Toggle suoni on/off
  const toggleSound = () => {
    soundEnabled.value = !soundEnabled.value;
  };

  /**
   * Suono posizionamento tessera - click leggero
   * @param {number} letterIndex - Indice della lettera nella parola (per variare il pitch)
   */
  const playTilePlace = async (letterIndex = 0) => {
    if (!soundEnabled.value) return;

    const ctx = await ensureAudioContext();
    if (!ctx) return;

    try {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      // Frequenza crescente per ogni lettera (effetto "costruzione")
      const baseFrequency = 800;
      const frequencyStep = 50;
      oscillator.frequency.value = baseFrequency + letterIndex * frequencyStep;
      oscillator.type = "sine";

      // Envelope veloce per un click
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.08);
    } catch (error) {
      console.error("Errore playTilePlace:", error);
    }
  };

  /**
   * Suono conferma parola - accordo maggiore (successo)
   */
  const playWordConfirm = async () => {
    if (!soundEnabled.value) return;

    const ctx = await ensureAudioContext();
    if (!ctx) return;

    try {
      // Accordo maggiore: C4, E4, G4
      const frequencies = [523.25, 659.25, 783.99];
      const duration = 0.25;

      frequencies.forEach((freq, i) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.frequency.value = freq;
        oscillator.type = "sine";

        // Arpeggio leggero con delay
        const startTime = ctx.currentTime + i * 0.03;
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.12, startTime + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
      });
    } catch (error) {
      console.error("Errore playWordConfirm:", error);
    }
  };

  /**
   * Suono errore - tono basso discendente
   */
  const playWordError = async () => {
    if (!soundEnabled.value) return;

    const ctx = await ensureAudioContext();
    if (!ctx) return;

    try {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.frequency.setValueAtTime(300, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.2);
      oscillator.type = "sawtooth";

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.25);
    } catch (error) {
      console.error("Errore playWordError:", error);
    }
  };

  /**
   * Suono selezione cella - click breve e delicato
   */
  const playCellSelect = async () => {
    if (!soundEnabled.value) return;

    const ctx = await ensureAudioContext();
    if (!ctx) return;

    try {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.frequency.value = 1200;
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.005);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.05);
    } catch (error) {
      console.error("Errore playCellSelect:", error);
    }
  };

  /**
   * Suono undo - effetto "rewind" discendente
   */
  const playUndo = async () => {
    if (!soundEnabled.value) return;

    const ctx = await ensureAudioContext();
    if (!ctx) return;

    try {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      // Sweep discendente veloce
      oscillator.frequency.setValueAtTime(600, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15);
      oscillator.type = "triangle";

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.18);
    } catch (error) {
      console.error("Errore playUndo:", error);
    }
  };

  /**
   * Suono cancellazione/clear - suono breve di "dismiss"
   */
  const playClear = async () => {
    if (!soundEnabled.value) return;

    const ctx = await ensureAudioContext();
    if (!ctx) return;

    try {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.frequency.setValueAtTime(400, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(250, ctx.currentTime + 0.1);
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.12);
    } catch (error) {
      console.error("Errore playClear:", error);
    }
  };

  onMounted(() => {
    initAudioContext();
  });

  onBeforeUnmount(() => {
    // Non chiudiamo l'AudioContext globale per permettere
    // il suo riuso in altri componenti
  });

  return {
    soundEnabled,
    toggleSound,
    playTilePlace,
    playWordConfirm,
    playWordError,
    playCellSelect,
    playUndo,
    playClear,
  };
}

