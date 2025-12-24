export default {
  // Navigation
  nav: {
    home: "Home",
    scorer: "Scorer",
    boardGame: "Board Game",
    settings: "Impostazioni",
  },

  // Common
  common: {
    oneWord: "parola",
    words: "parole",
  },

  // Board Word Placement
  boardWordPlacement: {
    title: "Posiziona Parola",
    howToPlay: "❓ Come giocare",
    wordLabel: "Parola (usa _ per tessere jolly)",
    placeholder: "Clicca sulla scacchiera per selezionare...",
    blankTilesWarning: "⚠️ Le tessere jolly (_) valgono 0 punti",
    placeWord: "Posiziona Parola",
    clear: "Cancella",
    clickToBegin: "👆 Clicca una cella sulla scacchiera per iniziare",
    cellSelected: "✓ Cella selezionata - inizia a digitare!",
    firstWordWarning: "⚠️ La prima parola deve passare per il centro (★)",
    mustConnect: "ℹ️ La parola deve connettersi alle parole esistenti",
    instructionsTitle: "Come Giocare",
    instruction1:
      "<strong>1.</strong> Clicca una cella sulla scacchiera per selezionare la posizione iniziale",
    instruction2:
      "<strong>2.</strong> Clicca di nuovo per cambiare direzione (→ Orizzontale / ↓ Verticale)",
    instruction3:
      "<strong>3.</strong> Inizia a digitare la tua parola (l'input si focalizza automaticamente)",
    instruction4:
      "<strong>4.</strong> Usa underscore (_) per tessere jolly/vuote (0 punti)",
    instruction5:
      '<strong>5.</strong> Vedi l\'anteprima sulla scacchiera, poi premi Invio o clicca "Posiziona Parola"',
    firstWordRule: "Prima parola: Deve passare per il centro (★)",
    nextWordsRule: "Prossime parole: Devono connettersi alle parole esistenti",
    gotIt: "Capito!",
  },

  // Board View
  boardView: {
    loading: "Caricamento scacchiera...",
    legend: "Legenda",
    tw: "TP",
    dw: "DP",
    tl: "TL",
    dl: "DL",
    center: "★ Centro",
    placed: "Posizionata",
    selected: "Selezionata",
    preview: "Anteprima",
    addPlayer: "Aggiungi Giocatore",
    playerNamePlaceholder: "Nome giocatore...",
    add: "Aggiungi",
    resetBoard: "Reset Scacchiera",
    players: "Giocatori",
    addPlayerToStart: "Aggiungi un giocatore per iniziare",
    resetBoardTitle: "Reset Scacchiera",
    resetBoardMessage:
      "Sei sicuro di voler resettare la scacchiera? Tutte le parole verranno cancellate e la scacchiera verrà resettata.",
    clearBoard: "Pulisci Scacchiera",
    cancel: "Annulla",
    ranking: "Classifica",
    noPlayers: "Nessun giocatore. Aggiungi un giocatore per iniziare!",
    confirmReset:
      "Sei sicuro di voler resettare la scacchiera? Tutte le parole verranno cancellate.",
    playerTurn: "E' il turno di {name}",
  },

  // Scorer View
  scorerView: {
    newPlayer: "Nuovo giocatore...",
    add: "Aggiungi",
    addPlayerToStart: "Aggiungi un giocatore per iniziare la partita",
    players: "Giocatori",
    selectPlayerToAddWord: "Seleziona un giocatore per aggiungere una parola",
  },

  // Scorer Add Word
  scorerAddWord: {
    word: "Parola:",
    wordPlaceholder: "parola...",
    pointsPlaceholder: "punti...",
  },

  // Player Details
  playerDetails: {
    points: "punti",
    words: "Parole",
    noWords: "Nessuna parola ancora posizionata",
    delete: "Elimina",
    deletePlayer: "Elimina Giocatore",
    close: "Chiudi",
    confirmDelete: "Sei sicuro di voler eliminare questo giocatore?",
  },

  // Settings View
  settings: {
    title: "Impostazioni",
    timer: "Timer",
    seconds: "(secondi)",
    language: "Lingua",
    points: "(punti)",
    bonus: "Bonus",
    maxWordLength: "Lunghezza Massima Parola",
    number: "(numero)",
    boardGameSettings: "Impostazioni Board Game",
  },

  // Board Config Selector
  boardConfigSelector: {
    boardConfiguration: "Configurazione Scacchiera",
    boardSize: "Dimensione Scacchiera",
    changeSizeConfirm:
      "Cambiare la dimensione della scacchiera resetterà la partita corrente. Continuare?",
  },

  // App
  app: {
    logoAlt: "Logo Flowbite",
    toggleDarkMode: "Attiva/disattiva modalità scura/chiara",
    openMainMenu: "Apri menu principale",
  },

  // Store Messages
  store: {
    insertName: "Inserisci un nome",
    noActivePlayer: "Nessun giocatore attivo",
    wordCannotBeEmpty: "La parola non può essere vuota",
    wordOutOfBounds: "La parola esce dai bordi",
    firstWordMustPassCenter: "La prima parola deve passare per il centro (★)",
    positionOccupied: "Posizione già occupata",
    wordMustConnect: "La parola deve connettersi alle parole esistenti",
    wordNotInDictionary: "Parola non nel dizionario",
    insertNonEmptyWord: "Inserisci una parola non vuota",
    wordPlaced: 'Parola "{text}" posizionata! +{points} punti',
  },
};
