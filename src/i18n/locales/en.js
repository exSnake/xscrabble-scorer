export default {
  // Navigation
  nav: {
    home: "Home",
    scorer: "Scorer",
    boardGame: "Board Game",
    settings: "Settings",
  },

  // Common
  common: {
    oneWord: "word",
    words: "words",
  },

  // Board Word Placement
  boardWordPlacement: {
    title: "Place Word",
    howToPlay: "❓ How to play",
    wordLabel: "Word (use _ for blank tiles)",
    placeholder: "Click board to select...",
    blankTilesWarning: "⚠️ Blank tiles (_) are worth 0 points",
    placeWord: "Place Word",
    clear: "Clear",
    clickToBegin: "👆 Click a cell on the board to begin",
    cellSelected: "✓ Cell selected - start typing!",
    firstWordWarning: "⚠️ First word must pass through center (★)",
    mustConnect: "ℹ️ Word must connect to existing words",
    instructionsTitle: "How to Play",
    instruction1: "1. Click a cell on the board to select starting position",
    instruction2:
      "2. Click again to toggle direction (→ Horizontal / ↓ Vertical)",
    instruction3: "3. Start typing your word (input auto-focuses)",
    instruction4: "4. Use underscore (_) for blank/jolly tiles (0 points)",
    instruction5:
      '5. See preview on board, then press Enter or click "Place Word"',
    firstWordRule: "First word: Must pass through center (★)",
    nextWordsRule: "Next words: Must connect to existing words",
    gotIt: "Got it!",
  },

  // Board View
  boardView: {
    loading: "Loading board...",
    legend: "Legend",
    tw: "TW",
    dw: "DW",
    tl: "TL",
    dl: "DL",
    center: "★ Center",
    placed: "Placed",
    selected: "Selected",
    preview: "Preview",
    addPlayer: "Add Player",
    playerNamePlaceholder: "Player name...",
    add: "Add",
    resetBoard: "Reset Board",
    players: "Players",
    addPlayerToStart: "Add a player to start",
    resetBoardTitle: "Reset Board",
    resetBoardMessage:
      "Are you sure you want to reset the board? All words will be cleared and the board will be reset to empty.",
    clearBoard: "Clear Board",
    cancel: "Cancel",
    ranking: "Ranking",
    noPlayers: "No players. Add a player to start!",
    confirmReset:
      "Are you sure you want to reset the board? All words will be cleared.",
    playerTurn: "{name}'s turn",
  },

  // Scorer View
  scorerView: {
    newPlayer: "New player...",
    add: "Add",
    addPlayerToStart: "Add a player to start the game",
    players: "Players",
    selectPlayerToAddWord: "Select a player to add a word",
  },

  // Scorer Add Word
  scorerAddWord: {
    word: "Word:",
    wordPlaceholder: "word...",
    pointsPlaceholder: "points...",
  },

  // Player Details
  playerDetails: {
    points: "points",
    words: "Words",
    noWords: "No words placed yet",
    delete: "Delete",
    deletePlayer: "Delete Player",
    close: "Close",
    confirmDelete: "Are you sure you want to delete this player?",
  },

  // Settings View
  settings: {
    title: "Settings",
    timer: "Timer",
    seconds: "(seconds)",
    language: "Language",
    points: "(points)",
    bonus: "Bonus",
    maxWordLength: "Max Word Length",
    number: "(number)",
    boardGameSettings: "Board Game Settings",
  },

  // Board Config Selector
  boardConfigSelector: {
    boardConfiguration: "Board Configuration",
    boardSize: "Board Size",
    changeSizeConfirm:
      "Changing board size will reset the current game. Continue?",
  },

  // App
  app: {
    logoAlt: "Flowbite Logo",
    toggleDarkMode: "Toggle dark/light mode",
    openMainMenu: "Open main menu",
  },

  // Store Messages
  store: {
    insertName: "Insert a name",
    noActivePlayer: "No active player",
    wordCannotBeEmpty: "Word cannot be empty",
    wordOutOfBounds: "Word goes out of bounds",
    firstWordMustPassCenter: "First word must pass through center (★)",
    positionOccupied: "Position already occupied",
    wordMustConnect: "Word must connect to existing words",
    wordNotInDictionary: "Word not in dictionary",
    insertNonEmptyWord: "Insert a non empty word",
    wordPlaced: 'Word "{text}" placed! +{points} points',
  },
};
