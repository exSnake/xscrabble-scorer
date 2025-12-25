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

  // Move history (not persisted, only in memory)
  const moveHistory = ref([]);

  //#endregion Board-specific State

  onMounted(async () => {
    settings.value = await import("@/settings.json");
    boardConfigs.value = settings.value.boardConfigs;

    // Try to import from URL first (before initializing board)
    const imported = importFromUrl();

    // Initialize empty board if needed and not imported from URL
    if (!imported && boardGrid.value.length === 0) {
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

  // Statistics computed properties
  const totalWordsPlaced = computed(() => {
    return placedWords.value.length;
  });

  const totalScore = computed(() => {
    return players.value.reduce((total, player) => {
      return total + player.words.reduce((sum, word) => sum + word.points, 0);
    }, 0);
  });

  const averageScorePerWord = computed(() => {
    if (totalWordsPlaced.value === 0) return 0;
    return Math.round((totalScore.value / totalWordsPlaced.value) * 10) / 10;
  });

  const longestWord = computed(() => {
    let longest = null;
    let maxLength = 0;

    for (const placedWord of placedWords.value) {
      if (placedWord.text.length > maxLength) {
        maxLength = placedWord.text.length;
        longest = placedWord;
      }
    }

    return longest
      ? {
          word: longest.text,
          length: maxLength,
          playerId: longest.playerId,
          points:
            players.value
              .find((p) => p.id === longest.playerId)
              ?.words.find((w) => w.text === longest.text)?.points || 0,
        }
      : null;
  });

  const highestScoringWord = computed(() => {
    let highest = null;
    let maxPoints = 0;

    for (const player of players.value) {
      for (const word of player.words) {
        if (word.points > maxPoints) {
          maxPoints = word.points;
          highest = {
            word: word.text,
            points: word.points,
            playerId: player.id,
            playerName: player.name,
          };
        }
      }
    }

    return highest;
  });

  const playerStats = computed(() => {
    return players.value.map((player) => {
      const playerWords = player.words;
      const totalPoints = playerWords.reduce(
        (sum, word) => sum + word.points,
        0,
      );
      const averagePoints =
        playerWords.length > 0
          ? Math.round((totalPoints / playerWords.length) * 10) / 10
          : 0;

      let longestWord = null;
      let maxLength = 0;
      let highestScoring = null;
      let maxPoints = 0;

      for (const word of playerWords) {
        if (word.text.length > maxLength) {
          maxLength = word.text.length;
          longestWord = { word: word.text, length: maxLength };
        }
        if (word.points > maxPoints) {
          maxPoints = word.points;
          highestScoring = { word: word.text, points: word.points };
        }
      }

      return {
        playerId: player.id,
        playerName: player.name,
        totalWords: playerWords.length,
        totalPoints,
        averagePoints,
        longestWord,
        highestScoringWord: highestScoring,
      };
    });
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
    moveHistory.value = [];
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

  function createSnapshot() {
    // Deep clone of current state for undo functionality
    return {
      boardGrid: JSON.parse(JSON.stringify(boardGrid.value)),
      players: JSON.parse(JSON.stringify(players.value)),
      placedWords: JSON.parse(JSON.stringify(placedWords.value)),
      activePlayerId: activePlayer.value?.id || null,
    };
  }

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

    // Save snapshot before placing word (for undo)
    const snapshot = createSnapshot();

    // Calculate score (con bonus manuale) - now returns detailed breakdown
    const scoreResult = calculateWordScore(
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

    // Add word to active player with breakdown
    activePlayer.value.words.push({
      id: wordId,
      text: text,
      points: scoreResult.total,
      breakdown: {
        mainWord: scoreResult.mainWord,
        secondaryWords: scoreResult.secondaryWords,
        hasBonus: hasBonus,
        bonusValue: hasBonus ? bonus.value : 0,
      },
    });

    // Show toast with breakdown if there are secondary words
    if (scoreResult.secondaryWords.length > 0) {
      toast.success(scoreResult.breakdown, { autoClose: 5000 });
    } else {
      toast.success(
        i18n.global.t("store.wordPlaced", {
          text: text.toUpperCase(),
          points: scoreResult.total,
        }),
      );
    }

    // Save move to history
    const moveId = moveHistory.value.length + 1;
    moveHistory.value.push({
      id: moveId,
      timestamp: new Date(),
      playerId: activePlayer.value.id,
      playerName: activePlayer.value.name,
      word: text.toUpperCase(),
      points: scoreResult.total,
      breakdown: scoreResult.breakdown,
      startRow,
      startCol,
      direction,
      snapshot,
    });

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

  function undoLastMove() {
    if (moveHistory.value.length === 0) {
      toast.error(i18n.global.t("store.noMovesToUndo"));
      return;
    }

    const lastMove = moveHistory.value[moveHistory.value.length - 1];
    const snapshot = lastMove.snapshot;

    // Restore state from snapshot
    boardGrid.value = snapshot.boardGrid;
    players.value = snapshot.players;
    placedWords.value = snapshot.placedWords;

    // Restore active player
    if (snapshot.activePlayerId) {
      const playerToActivate = players.value.find(
        (p) => p.id === snapshot.activePlayerId,
      );
      if (playerToActivate) {
        activatePlayer(playerToActivate);
      }
    }

    // Remove last move from history
    moveHistory.value.pop();

    toast.success(
      i18n.global.t("store.moveUndone", {
        word: lastMove.word,
        player: lastMove.playerName,
      }),
    );
  }

  //#endregion Actions - Word Placement & Validation

  //#region Actions - Perpendicular Words Detection

  /**
   * Find all perpendicular words formed when placing a word
   * @param {string} text - The word being placed
   * @param {number} startRow - Starting row
   * @param {number} startCol - Starting column
   * @param {string} wordDirection - Direction of the main word ("horizontal" | "vertical")
   * @returns {Array} Array of perpendicular words with their positions and which letters are new
   */
  function findPerpendicularWords(text, startRow, startCol, wordDirection) {
    const letters = [...text.toUpperCase()];
    const perpendicularWords = [];
    const perpendicularDirection =
      wordDirection === "horizontal" ? "vertical" : "horizontal";

    for (let i = 0; i < letters.length; i++) {
      const row = wordDirection === "horizontal" ? startRow : startRow + i;
      const col = wordDirection === "horizontal" ? startCol + i : startCol;

      // Check if this is a NEW letter (not already on board)
      const existingCell = boardGrid.value[row]?.[col];
      const isNewLetter = !existingCell?.letter;

      if (!isNewLetter) {
        // Skip letters that are already on the board - they don't form new perpendicular words
        continue;
      }

      // Check for perpendicular word at this position
      const perpWord = getWordAtPosition(
        row,
        col,
        perpendicularDirection,
        letters[i],
      );

      if (perpWord && perpWord.text.length > 1) {
        // Only count if it forms a word longer than 1 letter
        perpendicularWords.push({
          ...perpWord,
          newLetterPosition: { row, col },
          newLetter: letters[i],
        });
      }
    }

    return perpendicularWords;
  }

  /**
   * Get the complete word at a position in a given direction
   * Includes the letter being placed and all adjacent letters
   * @param {number} row - Row position
   * @param {number} col - Column position
   * @param {string} direction - Direction to scan ("horizontal" | "vertical")
   * @param {string} newLetter - The new letter being placed at this position
   * @returns {Object|null} Word object with text, positions, and start coordinates
   */
  function getWordAtPosition(row, col, direction, newLetter) {
    const positions = [];
    let wordText = "";

    // Determine scan direction
    const rowDelta = direction === "vertical" ? 1 : 0;
    const colDelta = direction === "horizontal" ? 1 : 0;

    // Find the start of the word (scan backwards)
    let startRow = row;
    let startCol = col;

    while (true) {
      const prevRow = startRow - rowDelta;
      const prevCol = startCol - colDelta;

      if (
        prevRow < 0 ||
        prevCol < 0 ||
        prevRow >= boardSize.value ||
        prevCol >= boardSize.value
      ) {
        break;
      }

      const cell = boardGrid.value[prevRow]?.[prevCol];
      if (!cell?.letter) {
        break;
      }

      startRow = prevRow;
      startCol = prevCol;
    }

    // Now scan forward to build the word
    let currentRow = startRow;
    let currentCol = startCol;

    while (currentRow < boardSize.value && currentCol < boardSize.value) {
      const cell = boardGrid.value[currentRow]?.[currentCol];
      let letter;

      if (currentRow === row && currentCol === col) {
        // This is where the new letter will be placed
        letter = newLetter;
      } else if (cell?.letter) {
        letter = cell.letter;
      } else {
        break; // No letter here, end of word
      }

      wordText += letter;
      positions.push({
        row: currentRow,
        col: currentCol,
        letter: letter,
        isNew: currentRow === row && currentCol === col,
      });

      currentRow += rowDelta;
      currentCol += colDelta;
    }

    if (wordText.length <= 1) {
      return null;
    }

    return {
      text: wordText,
      positions,
      startRow,
      startCol,
      direction,
    };
  }

  //#endregion Actions - Perpendicular Words Detection

  //#region Actions - Scoring

  /**
   * Calculate the score for a single word
   * @param {Array} positions - Array of {row, col, letter, isNew} for each letter in the word
   * @param {Object} config - Board configuration with multipliers
   * @param {boolean} applyMultipliers - Whether to apply multipliers (true for new letters)
   * @returns {Object} { score, wordMultiplier }
   */
  function calculateSingleWordScore(positions, config) {
    let score = 0;
    let wordMultiplier = 1;

    for (const pos of positions) {
      let letterValue = getCharacterPoints(pos.letter);

      // Check if this is a new letter (multipliers only apply to new letters)
      if (pos.isNew) {
        const multiplier = getMultiplierAtPosition(pos.row, pos.col, config);

        if (multiplier.type === "letter") {
          letterValue *= multiplier.value;
        } else if (multiplier.type === "word") {
          wordMultiplier *= multiplier.value;
        }
      }

      score += letterValue;
    }

    return { score: score * wordMultiplier, wordMultiplier };
  }

  /**
   * Calculate total score including main word and all perpendicular words
   * @returns {Object} { total, mainWord: {text, points}, secondaryWords: [{text, points}], breakdown: string }
   */
  function calculateWordScore(
    text,
    startRow,
    startCol,
    direction,
    hasBonus = false,
  ) {
    const letters = [...text.toUpperCase()];
    const config = currentBoardConfig.value;

    if (!config) {
      return {
        total: 0,
        mainWord: { text: text.toUpperCase(), points: 0 },
        secondaryWords: [],
        breakdown: text.toUpperCase() + ": 0",
      };
    }

    // Build positions array for main word, marking which letters are new
    const mainWordPositions = [];
    for (let i = 0; i < letters.length; i++) {
      const row = direction === "horizontal" ? startRow : startRow + i;
      const col = direction === "horizontal" ? startCol + i : startCol;

      const existingLetter = boardGrid.value[row]?.[col]?.letter;
      const isNew = !existingLetter;

      mainWordPositions.push({
        row,
        col,
        letter: letters[i],
        isNew,
      });
    }

    // Calculate main word score
    const mainWordResult = calculateSingleWordScore(mainWordPositions, config);
    const mainWordPoints = mainWordResult.score;

    // Find and calculate perpendicular words
    const perpendicularWords = findPerpendicularWords(
      text,
      startRow,
      startCol,
      direction,
    );
    const secondaryWords = [];
    let secondaryTotal = 0;

    for (const perpWord of perpendicularWords) {
      // Mark which positions are new (only the intersection letter is new)
      const positions = perpWord.positions.map((pos) => ({
        ...pos,
        isNew:
          pos.row === perpWord.newLetterPosition.row &&
          pos.col === perpWord.newLetterPosition.col,
      }));

      const perpResult = calculateSingleWordScore(positions, config);
      secondaryWords.push({
        text: perpWord.text,
        points: perpResult.score,
      });
      secondaryTotal += perpResult.score;
    }

    // Calculate total
    let total = mainWordPoints + secondaryTotal;

    // Add bonus if player used all tiles (bingo)
    if (hasBonus) {
      total += bonus.value;
    }

    // Build breakdown string
    let breakdown = `${text.toUpperCase()}: ${mainWordPoints}`;
    for (const sw of secondaryWords) {
      breakdown += ` + ${sw.text}: ${sw.points}`;
    }
    if (hasBonus) {
      breakdown += ` + Bonus: ${bonus.value}`;
    }
    breakdown += ` = ${total}`;

    return {
      total,
      mainWord: { text: text.toUpperCase(), points: mainWordPoints },
      secondaryWords,
      breakdown,
    };
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

  //#region Actions - Export/Import

  function exportGameState() {
    const gameState = {
      version: "1.0",
      timestamp: new Date().toISOString(),
      players: JSON.parse(JSON.stringify(players.value)),
      boardGrid: JSON.parse(JSON.stringify(boardGrid.value)),
      placedWords: JSON.parse(JSON.stringify(placedWords.value)),
      boardSize: boardSize.value,
      selectedBoardConfig: selectedBoardConfig.value,
      bonus: bonus.value,
      language: language.value,
      seconds: seconds.value,
    };

    return JSON.stringify(gameState, null, 2);
  }

  function importGameState(gameStateJson) {
    try {
      const gameState =
        typeof gameStateJson === "string"
          ? JSON.parse(gameStateJson)
          : gameStateJson;

      // Supporta sia formato vecchio (nomi lunghi) che nuovo (nomi corti)
      const playersData = gameState.players || gameState.p;
      const placedWordsData = gameState.placedWords || gameState.pw || [];

      // Validate game state structure
      if (!playersData || !Array.isArray(playersData)) {
        throw new Error("Invalid game state: missing players");
      }

      // Import state (supporta entrambi i formati)
      players.value = playersData;
      placedWords.value = placedWordsData;

      const boardSizeData =
        gameState.boardSize || gameState.bs || boardSize.value;
      const configData =
        gameState.selectedBoardConfig ||
        gameState.cfg ||
        selectedBoardConfig.value;
      const bonusData =
        gameState.bonus !== undefined ? gameState.bonus : gameState.b;
      const languageData = gameState.language || gameState.l || language.value;
      const secondsData =
        gameState.seconds !== undefined ? gameState.seconds : gameState.s;

      if (boardSizeData) {
        boardSize.value = boardSizeData;
      }
      if (configData) {
        selectedBoardConfig.value = configData;
      }
      if (bonusData !== undefined) {
        bonus.value = bonusData;
      }
      if (languageData) {
        language.value = languageData;
      }
      if (secondsData !== undefined) {
        seconds.value = secondsData;
      }

      // Ricostruisci boardGrid da placedWords o usa quello importato se presente
      if (gameState.boardGrid && gameState.boardGrid.length > 0) {
        // Se boardGrid è presente (da file JSON), usalo
        boardGrid.value = gameState.boardGrid;
      } else {
        // Se boardGrid non è presente (da link condivisibile), ricostruiscilo
        rebuildBoardGridFromPlacedWords();
      }

      // Activate first player if exists
      if (players.value.length > 0 && !activePlayer.value) {
        activatePlayer(players.value[0]);
      }

      // Clear move history on import
      moveHistory.value = [];

      return true;
    } catch (error) {
      console.error("Error importing game state:", error);
      throw error;
    }
  }

  // Funzione helper per convertire Base64 standard a Base64URL (URL-safe)
  function base64ToBase64URL(base64) {
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  }

  // Funzione helper per convertire Base64URL a Base64 standard
  function base64URLToBase64(base64url) {
    let base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
    // Aggiungi padding se necessario
    while (base64.length % 4) {
      base64 += "=";
    }
    return base64;
  }

  function exportGameStateForLink() {
    // Export ottimizzato con nomi di proprietà corti per ridurre la dimensione
    // boardGrid escluso - sarà ricostruito da placedWords
    const gameState = {
      v: "1.0", // version
      p: JSON.parse(JSON.stringify(players.value)), // players
      pw: JSON.parse(JSON.stringify(placedWords.value)), // placedWords
      bs: boardSize.value, // boardSize
      cfg: selectedBoardConfig.value, // selectedBoardConfig
      b: bonus.value, // bonus
      l: language.value, // language
      s: seconds.value, // seconds
    };

    // JSON compatto senza spazi
    return JSON.stringify(gameState);
  }

  function rebuildBoardGridFromPlacedWords() {
    // Ricostruisce la boardGrid da placedWords
    initializeBoard();

    for (const placedWord of placedWords.value) {
      const letters = [...placedWord.text.toUpperCase()];
      const player = players.value.find((p) => p.id === placedWord.playerId);

      if (!player) continue;

      for (let i = 0; i < letters.length; i++) {
        const row =
          placedWord.direction === "horizontal"
            ? placedWord.startRow
            : placedWord.startRow + i;
        const col =
          placedWord.direction === "horizontal"
            ? placedWord.startCol + i
            : placedWord.startCol;

        // Solo se la cella è vuota (per evitare sovrascrivere lettere condivise)
        if (
          row < boardSize.value &&
          col < boardSize.value &&
          boardGrid.value[row][col].letter === null
        ) {
          boardGrid.value[row][col] = {
            letter: letters[i],
            playerId: placedWord.playerId,
            wordId: placedWord.id,
          };
        }
      }
    }
  }

  function generateShareableLink() {
    const gameState = exportGameStateForLink();
    // Codifica in Base64 e converti a Base64URL (URL-safe, più compatto)
    const base64 = btoa(gameState);
    const base64url = base64ToBase64URL(base64);
    const currentUrl = window.location.origin + window.location.pathname;
    return `${currentUrl}?game=${base64url}`;
  }

  function importFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameParam = urlParams.get("game");

    if (gameParam) {
      try {
        // Supporta sia Base64 standard che Base64URL
        let decoded;
        try {
          // Prova prima Base64URL (formato nuovo)
          const base64 = base64URLToBase64(gameParam);
          decoded = atob(base64);
        } catch {
          // Se fallisce, prova Base64 standard (formato vecchio)
          decoded = decodeURIComponent(atob(gameParam));
        }
        importGameState(decoded);
        // Remove game parameter from URL after import
        const newUrl = window.location.pathname;
        window.history.replaceState({}, "", newUrl);
        return true;
      } catch (error) {
        console.error("Error importing from URL:", error);
        toast.error(i18n.global.t("store.importError"));
        return false;
      }
    }

    return false;
  }

  //#endregion Actions - Export/Import

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
    moveHistory,
    totalWordsPlaced,
    totalScore,
    averageScorePerWord,
    longestWord,
    highestScoringWord,
    playerStats,

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
    undoLastMove,
    exportGameState,
    importGameState,
    generateShareableLink,
    importFromUrl,
  };
});
