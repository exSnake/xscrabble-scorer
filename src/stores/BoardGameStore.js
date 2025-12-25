import { ref, computed, onMounted, watch } from "vue";
import { defineStore } from "pinia";
import { useTimer } from "vue-timer-hook";
import { useStorage } from "@vueuse/core";
import { toast } from "vue3-toastify";
import i18n from "@/i18n";

export const useBoardGameStore = defineStore("boardGame", () => {
  //#region State - Reusing from GameStore pattern

  const bonus = ref(useStorage("board_bonus", 50));
  const language = ref(useStorage("board_language", "en"));
  const players = ref(
    useStorage("board_players", [], localStorage, { deep: true }),
  );
  const seconds = ref(useStorage("board_seconds", 90));
  const settings = ref(null);
  const timer = ref(null);

  //#endregion State

  //#region Board-specific State

  const selectedBoardConfig = ref(useStorage("board_config", "standard"));
  const boardSize = ref(useStorage("board_size", 15));
  const boardConfigs = ref(null);
  const boardGrid = ref(
    useStorage("board_grid", [], localStorage, { deep: true }),
  );
  const placedWords = ref(
    useStorage("board_placed_words", [], localStorage, { deep: true }),
  );

  // Interactive selection state (not persisted)
  const selectedCell = ref(null); // { row, col }
  const direction = ref("horizontal"); // "horizontal" | "vertical"
  const previewWord = ref(""); // Word being typed for preview

  //#endregion Board-specific State

  onMounted(async () => {
    settings.value = await import("@/settings.json");
    boardConfigs.value = settings.value.boardConfigs;

    // Initialize empty board if needed
    if (boardGrid.value.length === 0) {
      initializeBoard();
    }

    console.log("[BoardGameStore] onMounted - seconds.value:", seconds.value);
    const now = Date.now();
    const targetTime = new Date(now + seconds.value * 1000);
    console.log(
      "[BoardGameStore] onMounted - now:",
      new Date(now),
      "target:",
      targetTime,
      "diff:",
      seconds.value,
      "seconds",
    );
    timer.value = useTimer(targetTime);
    timer.value.pause();
    console.log(
      "[BoardGameStore] Timer initialized, timer.seconds:",
      timer.value.seconds,
      "isRunning:",
      timer.value.isRunning,
    );
  });

  // Watch seconds changes - don't auto-restart, user must click restart button
  watch(seconds, (newSeconds, oldSeconds) => {
    console.log(
      "[BoardGameStore] seconds changed from",
      oldSeconds,
      "to",
      newSeconds,
    );
    console.log(
      "[BoardGameStore] Note: Timer will use new value on next restart",
    );
  });

  //#region Computed properties

  const canAddPlayer = computed(
    () => players.value.length < 4 && isBoardEmpty.value,
  );

  const activePlayer = computed(() => players.value.find((p) => p.active));

  const isFirstWord = computed(() => placedWords.value.length === 0);

  const isBoardEmpty = computed(() => placedWords.value.length === 0);

  const centerPosition = computed(() => Math.floor(boardSize.value / 2));

  const canResetBoard = computed(() => {
    // puo resettare se il board non e' vuoto oppure se i player hanno parole
    if (isBoardEmpty.value) {
      return false;
    }
    for (const player of players.value) {
      if (player.words.length > 0) {
        return true;
      }
    }
    return false;
  });

  const currentBoardConfig = computed(() => {
    return boardConfigs.value?.[selectedBoardConfig.value] || null;
  });

  //#endregion Computed properties

  //#region Actions - Board Management

  function initializeBoard() {
    const size = boardSize.value;
    boardGrid.value = Array(size)
      .fill(null)
      .map(() =>
        Array(size)
          .fill(null)
          .map(() => ({
            letter: null,
            playerId: null,
            wordId: null,
          })),
      );
  }

  function changeBoardSize(newSize) {
    boardSize.value = newSize;
    // Reset board when size changes
    boardGrid.value = [];
    placedWords.value = [];
    initializeBoard();
  }

  function changeBoardConfig(configName) {
    selectedBoardConfig.value = configName;
    // Board config change doesn't reset the board, only affects multipliers
  }

  function resetBoard() {
    boardGrid.value = [];
    placedWords.value = [];
    initializeBoard();
    for (const player of players.value) {
      player.words = [];
    }
  }

  //#endregion Actions - Board Management

  //#region Actions - Player Management (from GameStore pattern)

  function activatePlayer(player) {
    players.value.forEach((p) => {
      p.active = p === player;
    });
  }

  function addPlayer(name) {
    if (!name) {
      toast.error(i18n.global.t("store.insertName"));
      return;
    }

    const id =
      players.value.reduce((max, player) => {
        return player.id > max ? player.id : max;
      }, 0) + 1;

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

  function deletePlayer(player) {
    const index = players.value.indexOf(player);
    if (index > -1) {
      if (players.value.length === 1 || player.id === activePlayer.value?.id) {
        timer.value.pause();
      }
      players.value.splice(index, 1);
    }
  }

  function deleteWord({ wordId, player }) {
    const wordIndex = player.words.findIndex((word) => word.id === wordId);
    if (wordIndex > -1) {
      // Remove word from player
      player.words.splice(wordIndex, 1);

      // Remove letters from board grid
      const placedWordIndex = placedWords.value.findIndex(
        (w) => w.id === wordId && w.playerId === player.id,
      );
      if (placedWordIndex > -1) {
        const placedWord = placedWords.value[placedWordIndex];
        placedWord.positions.forEach(({ row, col }) => {
          boardGrid.value[row][col] = {
            letter: null,
            playerId: null,
            wordId: null,
          };
        });
        placedWords.value.splice(placedWordIndex, 1);
      }
    }
  }

  function updateWordPoints({ wordId, player, newPoints }) {
    const wordIndex = player.words.findIndex((word) => word.id === wordId);
    if (wordIndex > -1) {
      player.words[wordIndex].points = newPoints;
      toast.success(i18n.global.t("store.pointsUpdated"));
    }
  }

  function nextPlayer() {
    const index = players.value.indexOf(activePlayer.value);
    const nextIndex = index === players.value.length - 1 ? 0 : index + 1;
    activatePlayer(players.value[nextIndex]);
  }

  //#endregion Actions - Player Management

  //#region Actions - Word Placement & Validation

  function placeWord(wordData) {
    const { text, startRow, startCol, direction, hasBonus = false } = wordData;

    if (!activePlayer.value) {
      toast.error(i18n.global.t("store.noActivePlayer"));
      return;
    }

    // Validate placement
    const validation = validateWordPlacement(
      text,
      startRow,
      startCol,
      direction,
    );
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    // Calculate score (con bonus manuale)
    const score = calculateWordScore(
      text,
      startRow,
      startCol,
      direction,
      hasBonus,
    );

    // Place letters on board
    const positions = [];
    const letters = [...text.toUpperCase()];
    const wordId = activePlayer.value.words.length + 1;

    for (let i = 0; i < letters.length; i++) {
      const row = direction === "horizontal" ? startRow : startRow + i;
      const col = direction === "horizontal" ? startCol + i : startCol;

      // Only update cell if it's empty or update to add new wordId
      // Don't overwrite existing letters (they're already validated to match)
      if (boardGrid.value[row][col].letter === null) {
        boardGrid.value[row][col] = {
          letter: letters[i],
          playerId: activePlayer.value.id,
          wordId: wordId,
        };
      }
      // If letter already exists, we keep the original playerId/wordId
      // The intersection letter belongs to the first word that placed it

      positions.push({ row, col, letter: letters[i] });
    }

    // Add to placed words tracking
    placedWords.value.push({
      id: wordId,
      text: text,
      playerId: activePlayer.value.id,
      startRow,
      startCol,
      direction,
      positions,
    });

    // Add word to active player
    activePlayer.value.words.push({
      id: wordId,
      text: text,
      points: score,
    });

    toast.success(
      i18n.global.t("store.wordPlaced", {
        text: text.toUpperCase(),
        points: score,
      }),
    );

    nextPlayer();
    restartTimer(true); // Auto-resume se il timer era attivo
  }

  function validateWordPlacement(text, startRow, startCol, direction) {
    if (!text || text.length === 0) {
      return { valid: false, error: i18n.global.t("store.wordCannotBeEmpty") };
    }

    const letters = [...text.toUpperCase()];
    const endRow =
      direction === "horizontal" ? startRow : startRow + letters.length - 1;
    const endCol =
      direction === "horizontal" ? startCol + letters.length - 1 : startCol;

    // Check bounds
    if (
      startRow < 0 ||
      startCol < 0 ||
      endRow >= boardSize.value ||
      endCol >= boardSize.value
    ) {
      return { valid: false, error: i18n.global.t("store.wordOutOfBounds") };
    }

    // Check if first word passes through center
    if (isFirstWord.value) {
      const center = centerPosition.value;
      let passesCenter = false;

      for (let i = 0; i < letters.length; i++) {
        const row = direction === "horizontal" ? startRow : startRow + i;
        const col = direction === "horizontal" ? startCol + i : startCol;
        if (row === center && col === center) {
          passesCenter = true;
          break;
        }
      }

      if (!passesCenter) {
        return {
          valid: false,
          error: i18n.global.t("store.firstWordMustPassCenter"),
        };
      }
    } else {
      // Check if word connects to existing words
      let connects = false;

      for (let i = 0; i < letters.length; i++) {
        const row = direction === "horizontal" ? startRow : startRow + i;
        const col = direction === "horizontal" ? startCol + i : startCol;

        const existingCell = boardGrid.value[row][col];

        // Check if position already occupied
        if (existingCell.letter !== null) {
          // Position is occupied - check if the letter matches
          if (existingCell.letter.toUpperCase() !== letters[i]) {
            // Letter mismatch - cannot place word here
            return {
              valid: false,
              error: i18n.global.t("store.letterMismatch", {
                existing: existingCell.letter,
                new: letters[i],
              }),
            };
          }
          // Letter matches - this counts as a valid connection (intersection)
          connects = true;
          continue; // Skip adjacent check for this cell, it's already connected
        }

        // Check adjacent cells for existing letters
        const adjacentPositions = [
          [row - 1, col], // top
          [row + 1, col], // bottom
          [row, col - 1], // left
          [row, col + 1], // right
        ];

        for (const [adjRow, adjCol] of adjacentPositions) {
          if (
            adjRow >= 0 &&
            adjRow < boardSize.value &&
            adjCol >= 0 &&
            adjCol < boardSize.value
          ) {
            if (boardGrid.value[adjRow][adjCol].letter !== null) {
              connects = true;
              break;
            }
          }
        }
      }

      if (!connects) {
        return { valid: false, error: i18n.global.t("store.wordMustConnect") };
      }
    }

    // Placeholder: Always return true for actual word validity (per user request)
    // Future implementation: check against dictionary API or local word list
    const wordValid = isValidWord(text);
    if (!wordValid) {
      return {
        valid: false,
        error: i18n.global.t("store.wordNotInDictionary"),
      };
    }

    return { valid: true };
  }

  // eslint-disable-next-line no-unused-vars
  function isValidWord(word) {
    // Placeholder function that always returns true
    // Future implementation: check against dictionary API or local word list
    return true;
  }

  //#endregion Actions - Word Placement & Validation

  //#region Actions - Scoring

  function calculateWordScore(
    text,
    startRow,
    startCol,
    direction,
    hasBonus = false,
  ) {
    const letters = [...text.toUpperCase()];
    let score = 0;
    let wordMultiplier = 1;

    const config = currentBoardConfig.value;
    if (!config) return 0;

    for (let i = 0; i < letters.length; i++) {
      const row = direction === "horizontal" ? startRow : startRow + i;
      const col = direction === "horizontal" ? startCol + i : startCol;

      // Get base letter value
      let letterValue = getCharacterPoints(letters[i]);

      // Check if this cell already has a letter (intersection)
      const existingLetter = boardGrid.value[row]?.[col]?.letter;
      const isExistingLetter =
        existingLetter !== null && existingLetter !== undefined;

      // Bonuses only apply to newly placed letters, not to existing ones
      if (!isExistingLetter) {
        // Get multiplier from board position (only for new letters)
        const multiplier = getMultiplierAtPosition(row, col, config);

        if (multiplier.type === "letter") {
          letterValue *= multiplier.value;
        } else if (multiplier.type === "word") {
          wordMultiplier *= multiplier.value;
        }
      }
      // For existing letters: only base value counts, no multipliers

      score += letterValue;
    }

    score *= wordMultiplier;

    // Add bonus if player used all tiles (bingo) - now manually triggered
    if (hasBonus) {
      score += bonus.value;
    }

    return score;
  }

  function getMultiplierAtPosition(row, col, config) {
    if (!config || !config.multipliers) {
      return { type: "none", value: 1 };
    }
    const key = `${row},${col}`;
    if (config.multipliers[key]) {
      return config.multipliers[key];
    }
    return { type: "none", value: 1 };
  }

  function getCharacterPoints(char) {
    // Blank/jolly tile (underscore) is worth 0 points
    if (char === "_") return 0;
    return settings.value?.letters[language.value][char] ?? 0;
  }

  //#endregion Actions - Scoring

  //#region Actions - Timer

  function pauseTimer() {
    if (timer.value.isRunning) {
      timer.value.pause();
    } else {
      timer.value.resume();
    }
  }

  function restartTimer(autoResume = false) {
    console.log(
      "[BoardGameStore] restartTimer called, seconds.value:",
      seconds.value,
      "autoResume:",
      autoResume,
    );
    const wasRunning = timer.value?.isRunning;
    const time = new Date();
    time.setSeconds(time.getSeconds() + seconds.value);
    timer.value.restart(time);

    // Se autoResume è true e il timer era in esecuzione, mantienilo attivo
    // Altrimenti metti in pausa (comportamento default per il pulsante restart)
    if (!(autoResume && wasRunning)) {
      timer.value.pause();
    }
  }

  //#endregion Actions - Timer

  //#region Actions - Interactive Selection

  function selectCell(row, col) {
    // If clicking the same cell, cycle through directions
    if (
      selectedCell.value &&
      selectedCell.value.row === row &&
      selectedCell.value.col === col
    ) {
      if (direction.value === "horizontal") {
        direction.value = "vertical";
      } else {
        // Third click: deselect
        selectedCell.value = null;
        direction.value = "horizontal";
        previewWord.value = "";
      }
    } else {
      // New cell selected
      selectedCell.value = { row, col };
      direction.value = "horizontal";
      previewWord.value = "";
    }
  }

  function updatePreviewWord(word) {
    previewWord.value = word.toUpperCase();
  }

  function clearSelection() {
    selectedCell.value = null;
    direction.value = "horizontal";
    previewWord.value = "";
  }

  function placeWordFromPreview(hasBonus = false) {
    if (!selectedCell.value || !previewWord.value) return;

    placeWord({
      text: previewWord.value,
      startRow: selectedCell.value.row,
      startCol: selectedCell.value.col,
      direction: direction.value,
      hasBonus: hasBonus,
    });

    clearSelection();
  }

  //#endregion Actions - Interactive Selection

  //#region Computed - Preview Cells

  const previewCells = computed(() => {
    if (!selectedCell.value || !previewWord.value) return [];

    const cells = [];
    const letters = [...previewWord.value];

    for (let i = 0; i < letters.length; i++) {
      const row =
        direction.value === "horizontal"
          ? selectedCell.value.row
          : selectedCell.value.row + i;
      const col =
        direction.value === "horizontal"
          ? selectedCell.value.col + i
          : selectedCell.value.col;

      // Check bounds
      if (row < boardSize.value && col < boardSize.value) {
        cells.push({
          row,
          col,
          letter: letters[i],
        });
      }
    }

    return cells;
  });

  //#endregion Computed - Preview Cells

  return {
    // State
    activePlayer,
    bonus,
    canAddPlayer,
    language,
    players,
    seconds,
    settings,
    timer,
    boardSize,
    boardGrid,
    selectedBoardConfig,
    boardConfigs,
    placedWords,
    isFirstWord,
    isBoardEmpty,
    centerPosition,
    currentBoardConfig,
    selectedCell,
    direction,
    previewWord,
    previewCells,

    // Actions
    activatePlayer,
    addPlayer,
    deletePlayer,
    deleteWord,
    updateWordPoints,
    placeWord,
    validateWordPlacement,
    isValidWord,
    calculateWordScore,
    getCharacterPoints,
    getMultiplierAtPosition,
    changeBoardSize,
    changeBoardConfig,
    nextPlayer,
    pauseTimer,
    restartTimer,
    resetBoard,
    canResetBoard,
    selectCell,
    updatePreviewWord,
    clearSelection,
    placeWordFromPreview,
  };
});
