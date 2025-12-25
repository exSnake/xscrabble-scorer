export default {
  // Navigation
  nav: {
    home: "Home",
    scorer: "Scorer",
    boardGame: "Board",
    settings: "Settings",
    darkMode: "Dark mode",
    lightMode: "Light mode",
    soundOn: "Sound effects enabled",
    soundOff: "Sound effects disabled",
  },

  // General
  general: {
    addButton: "Add",
    cancelButton: "Cancel",
    points: "points",
    maxLetters: "Max 10 letters",
    typeHere: "Type word here...",
    currentScore: "Current score",
  },

  // Timer
  timer: {
    pause: "Pause",
    resume: "Resume",
    restart: "Restart",
  },

  // Home
  home: {
    title: "XSCRABBLER",
    subtitle: "SCORE TRACKER",
    quickStart: "QUICK START",
    features: "Features",
    multipleLanguages: "Multilingual",
    multipleLanguagesDesc:
      "Supports English, Italian, French, Spanish and many more languages",
    wordBonus: "Word Bonuses",
    wordBonusDesc: "Easily calculate word and letter bonuses",
    timer: "Timer",
    timerDesc: "Built-in timer for competitive games",
    playerTracking: "Player Tracking",
    playerTrackingDesc: "Keep track of all players' scores",
    customizable: "Customizable",
    customizableDesc: "Customize bonuses, timer and other settings",
    openSource: "Open Source",
    openSourceDesc: "Contribute to the project on GitHub",
    getStarted: "Get Started",
    aboutTitle: "What is xScrabbler?",
    aboutDesc:
      "xScrabbler is a modern score calculator for Scrabble, Scarabeo and similar word games. It allows you to track scores, apply bonuses and manage game time.",
    footer: "Made with ❤️ for word game lovers",
    madeBy: "Created by",
    twoWaysTitle: "Two ways to play",
    twoWaysSubtitle: "Choose the method you prefer",
    boardModeTitle: "Board Game",
    boardModeDesc:
      "Use the interactive board for a complete visualization of the game. Perfect for competitive matches where you want to see all placed words, verify word connections, and have full visual control of the game. The board automatically calculates bonuses and validates word positions.",
    scorerModeTitle: "Scorer",
    scorerModeDesc:
      "Use the quick scorer to rapidly enter words and scores. Ideal for fast games or when you prefer to calculate scores manually. Simpler and more direct, perfect for those who want to focus on the game without distractions.",
    tryBoard: "Try the Board",
    tryScorer: "Try the Scorer",
    faqTitle: "Frequently Asked Questions",
    faq1Question: "What is a Scrabble score keeper?",
    faq1Answer:
      "A Scrabble score keeper (or score tracker) is a tool that helps you track scores during a Scrabble game. xScrabbler is a free digital scorecard that automatically calculates points, bonuses, and manages the timer for each turn.",
    faq2Question: "How does the Scrabble score calculator work?",
    faq2Answer:
      "The xScrabbler score calculator lets you enter played words and automatically calculates the score considering letter bonuses (DL, TL) and word bonuses (DW, TW). You can also use the interactive board to place words visually.",
    faq3Question: "Is there a built-in Scrabble timer?",
    faq3Answer:
      "Yes! xScrabbler includes a built-in Scrabble timer that you can customize in settings. Perfect for competitive games where each player has limited time for their turn.",
    faq4Question: "Can I use xScrabbler for other word games?",
    faq4Answer:
      "Absolutely! xScrabbler works perfectly as a word game score keeper for Scrabble, Scarabeo (Italian Scrabble), Words with Friends, and similar games. It supports multiple languages and scoring systems.",
  },

  // Common
  common: {
    oneWord: "word",
    words: "words",
    points: "points",
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
    bonusTooltip: "Bingo bonus (B) - Add when using all 7 tiles",
    bonusActive: "✓ Bingo bonus active (+{bonus} points)",
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
    addPlayersPrompt: "Use the 'Ranking' panel to add 1 to 4 players",
    addMorePlayers: "Add more players",
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

  // Scorer
  scorer: {
    addPlayer: "Add player",
  },

  // Scorer View
  scorerView: {
    newPlayer: "New player...",
    add: "Add",
    addPlayerToStart: "Add a player to start the game",
    players: "Players",
    selectPlayerToAddWord: "Select a player to add a word",

    // Onboarding UX
    pageSubtitle: "Add words and track player scores",
    welcomeTitle: "Welcome to xScrabbler!",
    welcomeSubtitle: "Get started by following these simple steps",
    step1: "Step 1: Add Players",
    step1Desc: "Use the form below to add 1 to 4 players",
    step2: "Step 2: Select a Player",
    step2Desc: "Click on a player to activate them and start playing",
    step3: "Step 3: Add Words",
    step3Desc: "Enter words and scores for the active player",
    addPlayersFirst: "Add players first to begin",
    selectPlayerFirst: "Select a player to add words",
    noPlayersYet: "No players yet",
    clickBelowToAdd: "Use the form below to add the first player",
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
    edit: "Edit",
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
    scoringDictionary: "Scrabble Dictionary",
    scoringDictionaryHint:
      "Determines letter point values for your game version",
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
    letterMismatch:
      'Letter mismatch: cannot place "{new}" where "{existing}" already exists',
    wordMustConnect: "Word must connect to existing words",
    wordNotInDictionary: "Word not in dictionary",
    insertNonEmptyWord: "Insert a non empty word",
    wordPlaced: 'Word "{text}" placed! +{points} points',
    pointsUpdated: "Points updated successfully",
    noMovesToUndo: "No moves to undo",
    moveUndone: 'Move undone: "{word}" by {player}',
    importError: "Error importing game",
  },

  // Game Stats
  gameStats: {
    title: "Statistics",
    noStats: "No statistics available. Start playing!",
    global: "Global",
    totalWords: "Total words",
    totalScore: "Total score",
    averageScore: "Average score",
    letters: "letters",
    longestWord: "Longest word",
    highestScoringWord: "Highest scoring word",
    by: "by",
    byPlayer: "By Player",
    words: "Words",
    total: "Total",
    average: "Average",
    longest: "Longest",
    bestWord: "Best word",
    bestWords: "Best Words",
    topPlayers: "Top Players",
  },

  // Move History
  moveHistory: {
    title: "Move History",
    noMoves: "No moves yet. Start playing!",
    undo: "Undo",
    position: "Position",
  },

  // Game Export/Import
  gameExportImport: {
    export: "Export",
    import: "Import",
    share: "Share",
    exportSuccess: "Game exported successfully",
    exportError: "Error exporting game",
    importTitle: "Import Game",
    importFile: "Import from file",
    importLink: "Import from link",
    linkPlaceholder: "Paste game link...",
    importSuccess: "Game imported successfully",
    importError: "Error importing. Please verify the file or link is valid.",
    linkCopied: "Link copied to clipboard!",
    linkError: "Error generating link",
    emptyLink: "Please enter a valid link",
  },

  // Cookie Consent
  cookies: {
    title: "We use cookies",
    description:
      "We use analytics cookies to improve your experience and analyze site traffic. By accepting, you help us improve xScrabbler.",
    accept: "Accept",
    refuse: "Refuse",
  },

  // Contact Form
  contact: {
    title: "Get in Touch",
    subtitle:
      "Have suggestions, feedback, or found a bug? We'd love to hear from you!",
    nameLabel: "Your Name",
    namePlaceholder: "John Doe",
    emailLabel: "Email Address",
    emailPlaceholder: "john@example.com",
    messageLabel: "Message",
    messagePlaceholder:
      "Share your suggestions, report bugs, or just say hello...",
    messageHint: "Minimum 10 characters",
    submit: "Send Message",
    sending: "Sending...",
    successTitle: "Message sent!",
    successMessage: "Thank you for your feedback. We'll get back to you soon!",
    errorTitle: "Oops! Something went wrong",
    errorGeneric: "Unable to send the message. Please try again later.",
    errorNetwork: "Network error. Please check your connection and try again.",
    privacyNote:
      "Your information will only be used to respond to your message.",
  },
};
