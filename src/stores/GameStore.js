import { ref, computed, onMounted } from "vue";
import { defineStore } from "pinia";
import { useTimer } from "vue-timer-hook";
import { useStorage } from "@vueuse/core";
import { toast } from "vue3-toastify";
import { useLocaleStore } from "./LocaleStore";

export const useGameStore = defineStore("game", () => {
  const bonus = useStorage("bonus", 50);
  const maxWordLength = useStorage("maxWordLength", 10);
  const language = useStorage("scoreLanguage", "it");
  const players = useStorage("players", [], localStorage, { deep: true });
  const seconds = useStorage("seconds", 90);
  const settings = ref(null);
  const timer = ref(null);

  onMounted(async () => {
    settings.value = await import("@/settings.json");

    const time = new Date();
    time.setSeconds(time.getSeconds() + seconds.value);
    timer.value = useTimer(time);
    timer.value.pause();
  });

  const canAddPlayer = computed(() => {
    return players.value.length < 4;
  });

  const activePlayer = computed(() => {
    return players.value.find((player) => player.active);
  });

  function activatePlayer(player) {
    players.value.forEach((p) => {
      p.active = p === player;
    });
  }

  function addPlayer(name) {
    const localeStore = useLocaleStore();

    if (!name) {
      toast.error(localeStore.t("error.emptyName"));
      return;
    }

    const id = players.value.reduce((max, player) => {
      return player.id > max ? player.id : max;
    }, 0);

    players.value.push({
      id: id,
      name: name,
      active: false,
      words: [],
    });
    if (players.value.length === 1) {
      activatePlayer(players.value[0]);
    }
  }

  function addWord(word) {
    const localeStore = useLocaleStore();

    if (!word.text) {
      toast.error(localeStore.t("error.emptyWord"));
      return;
    }

    activePlayer.value.words.push({
      id: activePlayer.value.words.length + 1,
      text: word.text,
      points: parseInt(word.points),
      letters: [...word.text.toUpperCase()].map((char, i) => {
        const charPoints = getCharacterPoints(char);
        const letterBonus = word.bonusArray ? word.bonusArray[i] : 1;

        return {
          char: char,
          points: charPoints,
          bonus: letterBonus,
        };
      }),
      wordBonus: word.wordBonus || 1,
      hasExtraBonus: word.superBonus || false,
    });

    nextPlayer();
    restartTimer();
  }

  function deletePlayer(player) {
    const index = players.value.indexOf(player);
    if (index > -1) {
      if (players.value.length === 1 || player.id === activePlayer.value.id) {
        activePlayer.value = null;
        timer.value.pause();
      }
      players.value.splice(index, 1);
    }
  }

  function deleteWord({ wordId, player }) {
    const index = player.words.findIndex((word) => word.id === wordId);
    if (index > -1) {
      player.words.splice(index, 1);
    }
  }

  function getCharacterPoints(char) {
    return settings.value.letters[language.value][char] ?? 0;
  }

  function isRunning() {
    return timer.value.isRunning;
  }

  function nextPlayer() {
    const index = players.value.indexOf(activePlayer.value);
    const nextIndex = index === players.value.length - 1 ? 0 : index + 1;
    activatePlayer(players.value[nextIndex]);
  }

  function pauseTimer() {
    if (timer.value.isRunning) {
      timer.value.pause();
    } else {
      timer.value.resume();
    }
  }
  function restartTimer() {
    const time = new Date();
    time.setSeconds(time.getSeconds() + seconds.value);
    timer.value.restart(time);
    pauseTimer();
  }

  return {
    activePlayer,
    bonus,
    canAddPlayer,
    language,
    maxWordLength,
    players,
    seconds,
    settings,
    timer,

    activatePlayer,
    addPlayer,
    addWord,
    deletePlayer,
    deleteWord,
    getCharacterPoints,
    isRunning,
    nextPlayer,
    pauseTimer,
    restartTimer,
  };
});
