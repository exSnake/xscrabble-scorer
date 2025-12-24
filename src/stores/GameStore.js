import { ref, computed, onMounted } from "vue";
import { defineStore } from "pinia";
import { useTimer } from "vue-timer-hook";
import { useStorage } from "@vueuse/core";
import { toast } from "vue3-toastify";
import i18n from "@/i18n";
export const useGameStore = defineStore("game", () => {
  //#region State

  const bonus = ref(useStorage("bonus", 50));
  const maxWordLength = ref(useStorage("maxWordLength", 10));
  const language = ref(useStorage("language", "it"));
  const players = ref(useStorage("players", [], localStorage, { deep: true }));
  const seconds = ref(useStorage("seconds", 90));
  const settings = ref(null);
  const timer = ref(null);

  onMounted(async () => {
    settings.value = await import("@/settings.json");

    const time = new Date();
    time.setSeconds(time.getSeconds() + seconds.value);
    timer.value = useTimer(time);
    timer.value.pause();
  });

  //#endregion State

  //#region Computed properties

  const canAddPlayer = computed(() => {
    return players.value.length < 4;
  });

  const activePlayer = computed(() => {
    return players.value.find((player) => player.active);
  });

  //#endregion Computed properties

  //#region Actions

  function activatePlayer(player) {
    players.value.forEach((p) => {
      p.active = p === player;
    });
  }

  function addPlayer(name) {
    // if it's empty, don't add it and show toast message
    if (!name) {
      toast.error(i18n.global.t("store.insertName"));
      return;
    }

    // get id of the player to add, for each player get the max id and add 1
    const id = players.value.reduce((max, player) => {
      return player.id > max ? player.id : max;
    }, 0);

    players.value.push({
      id: id,
      name: name,
      active: false,
      words: [],
    });
    // if it was the first player, activate it
    if (players.value.length === 1) {
      activatePlayer(players.value[0]);
    }
  }

  function addWord(word) {
    if (!word.text) {
      toast.error(i18n.global.t("store.insertNonEmptyWord"));
      return;
    }

    activePlayer.value.words.push({
      id: activePlayer.value.words.length + 1,
      text: word.text,
      points: parseInt(word.points),
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

  //#endregion Actions

  return {
    // State
    activePlayer,
    bonus,
    canAddPlayer,
    language,
    maxWordLength,
    players,
    seconds,
    settings,
    timer,

    // Actions
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
