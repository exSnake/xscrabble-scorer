import { ref, onMounted, onBeforeUnmount } from "vue";
import { useStorage } from "@vueuse/core";

// Stato globale condiviso tra tutti i componenti
const soundEnabled = useStorage("sound_enabled", true);
let audioContext = null;

const ensureContext = async () => {
  // Crea AudioContext solo se non esiste (dopo un'interazione dell'utente)
  if (!audioContext) {
    try {
      globalThis.AudioContext =
        globalThis.AudioContext || globalThis.webkitAudioContext;
      audioContext = new AudioContext();
      // Se è sospeso, prova a riprendere (richiede interazione utente)
      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }
    } catch (error) {
      console.error("Web Audio API non supportata:", error);
      return null;
    }
  }

  // Se è sospeso, prova a riprendere
  if (audioContext.state === "suspended") {
    try {
      await audioContext.resume();
    } catch {
      // Se non può essere ripreso, ritorna null
      return null;
    }
  }

  return audioContext;
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
    oscillator.frequency.exponentialRampToValueAtTime(
      150,
      ctx.currentTime + 0.2,
    );
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
    oscillator.frequency.exponentialRampToValueAtTime(
      200,
      ctx.currentTime + 0.15,
    );
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
 * Suono bonus per parole con punteggio > 30
 * Fanfara ascendente con accordo maggiore esteso
 */
export const playSoundBonus30 = async () => {
  if (!soundEnabled.value) return;

  const ctx = await ensureContext();
  if (!ctx) return;

  try {
    // Accordo maggiore con settima: C4, E4, G4, B4
    const frequencies = [523.25, 659.25, 783.99, 987.77];
    const duration = 0.4;

    frequencies.forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.frequency.value = freq;
      oscillator.type = "sine";

      // Arpeggio ascendente con delay più marcato
      const startTime = ctx.currentTime + i * 0.06;
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.02);
      gainNode.gain.setValueAtTime(0.15, startTime + duration * 0.6);
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    });

    // Aggiungi un tocco brillante finale
    setTimeout(() => {
      const sparkle = ctx.createOscillator();
      const sparkleGain = ctx.createGain();
      sparkle.frequency.value = 1318.51; // E5
      sparkle.type = "sine";
      sparkleGain.gain.setValueAtTime(0.1, ctx.currentTime);
      sparkleGain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + 0.2,
      );
      sparkle.connect(sparkleGain);
      sparkleGain.connect(ctx.destination);
      sparkle.start(ctx.currentTime);
      sparkle.stop(ctx.currentTime + 0.2);
    }, 250);
  } catch (error) {
    console.error("Errore playSoundBonus30:", error);
  }
};

/**
 * Suono epico per parole con punteggio > 40
 * Fanfara trionfante con sweep e armoniche
 */
export const playSoundBonus40 = async () => {
  if (!soundEnabled.value) return;

  const ctx = await ensureContext();
  if (!ctx) return;

  try {
    // Sweep iniziale epico
    const sweepOsc = ctx.createOscillator();
    const sweepGain = ctx.createGain();
    sweepOsc.frequency.setValueAtTime(200, ctx.currentTime);
    sweepOsc.frequency.exponentialRampToValueAtTime(
      800,
      ctx.currentTime + 0.15,
    );
    sweepOsc.type = "sawtooth";
    sweepGain.gain.setValueAtTime(0.08, ctx.currentTime);
    sweepGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    sweepOsc.connect(sweepGain);
    sweepGain.connect(ctx.destination);
    sweepOsc.start(ctx.currentTime);
    sweepOsc.stop(ctx.currentTime + 0.2);

    // Accordo di nona maggiore trionfante: C4, E4, G4, B4, D5
    const chordFreqs = [523.25, 659.25, 783.99, 987.77, 1174.66];
    const chordStart = ctx.currentTime + 0.12;

    chordFreqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.frequency.value = freq;
      osc.type = i < 3 ? "sine" : "triangle"; // Armoniche più brillanti in alto

      const noteStart = chordStart + i * 0.04;
      gain.gain.setValueAtTime(0, noteStart);
      gain.gain.linearRampToValueAtTime(0.12, noteStart + 0.02);
      gain.gain.setValueAtTime(0.12, noteStart + 0.35);
      gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(noteStart);
      osc.stop(noteStart + 0.6);
    });

    // Sparkle finale doppio
    setTimeout(() => {
      [1567.98, 2093.0].forEach((freq, i) => {
        // G5, C6
        const sparkle = ctx.createOscillator();
        const sparkleGain = ctx.createGain();
        sparkle.frequency.value = freq;
        sparkle.type = "sine";
        const t = ctx.currentTime + i * 0.08;
        sparkleGain.gain.setValueAtTime(0.08, t);
        sparkleGain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
        sparkle.connect(sparkleGain);
        sparkleGain.connect(ctx.destination);
        sparkle.start(t);
        sparkle.stop(t + 0.25);
      });
    }, 350);

    // Sub bass finale per impatto
    const bass = ctx.createOscillator();
    const bassGain = ctx.createGain();
    bass.frequency.value = 130.81; // C3
    bass.type = "sine";
    bassGain.gain.setValueAtTime(0.15, chordStart);
    bassGain.gain.exponentialRampToValueAtTime(0.001, chordStart + 0.5);
    bass.connect(bassGain);
    bassGain.connect(ctx.destination);
    bass.start(chordStart);
    bass.stop(chordStart + 0.5);
  } catch (error) {
    console.error("Errore playSoundBonus40:", error);
  }
};

/**
 * Composable per gestire gli effetti sonori del gioco
 * Usa Web Audio API per suoni sintetici leggeri
 */
export function useSoundEffects() {
  const localAudioContext = ref(null);

  // Resume AudioContext se sospeso (necessario per autoplay policy)
  // L'AudioContext verrà creato solo quando necessario e dopo un'interazione
  const ensureAudioContext = async () => {
    // Usa il contesto globale se esiste
    if (audioContext) {
      localAudioContext.value = audioContext;
      if (audioContext.state === "suspended") {
        try {
          await audioContext.resume();
        } catch {
          // Se non può essere ripreso, ritorna null
          return null;
        }
      }
      return audioContext;
    }

    // Crea nuovo AudioContext solo dopo un'interazione dell'utente
    try {
      globalThis.AudioContext =
        globalThis.AudioContext || globalThis.webkitAudioContext;
      audioContext = new AudioContext();
      localAudioContext.value = audioContext;

      // Se è sospeso, prova a riprendere
      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }

      return audioContext;
    } catch (error) {
      console.error("Web Audio API non supportata:", error);
      return null;
    }
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
      oscillator.frequency.exponentialRampToValueAtTime(
        150,
        ctx.currentTime + 0.2,
      );
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
      oscillator.frequency.exponentialRampToValueAtTime(
        200,
        ctx.currentTime + 0.15,
      );
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
      oscillator.frequency.exponentialRampToValueAtTime(
        250,
        ctx.currentTime + 0.1,
      );
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
    // Non inizializzare AudioContext qui - verrà creato solo dopo un'interazione
    // Questo evita errori di autoplay policy del browser
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
