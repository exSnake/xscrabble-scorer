export default {
  // Navigation
  nav: {
    home: "Inicio",
    scorer: "Calculadora",
    boardGame: "Tablero",
    settings: "Configuración",
    darkMode: "Modo oscuro",
    lightMode: "Modo claro",
  },

  // General
  general: {
    addButton: "Añadir",
    cancelButton: "Cancelar",
    points: "puntos",
    maxLetters: "Máx 10 letras",
    typeHere: "Escribe la palabra aquí...",
    currentScore: "Puntuación actual",
  },

  // Timer
  timer: {
    pause: "Pausa",
    resume: "Reanudar",
    restart: "Reiniciar",
  },

  // Home
  home: {
    title: "XSCRABBLER",
    subtitle: "CALCULADOR DE PUNTUACIÓN",
    quickStart: "INICIA RÁPIDO",
    features: "Características",
    multipleLanguages: "Idiomas múltiples",
    multipleLanguagesDesc:
      "Soporta inglés, italiano, francés, español y muchas otras lenguas",
    wordBonus: "Bonus de palabra",
    wordBonusDesc: "Cálculo fácil de bonos de palabra y letra",
    timer: "Temporizador",
    timerDesc: "Temporizador integrado para partidas competitivas",
    playerTracking: "Seguimiento de jugadores",
    playerTrackingDesc:
      "Mantener un seguimiento de las puntuaciones de todos los jugadores",
    customizable: "Personalizable",
    customizableDesc: "Personaliza bonos, temporizador y otras configuraciones",
    openSource: "Código abierto",
    openSourceDesc: "Contribuye al proyecto en GitHub",
    getStarted: "Comienza ahora",
    aboutTitle: "¿Qué es xScrabbler?",
    aboutDesc:
      "xScrabbler es un calculador de puntuación moderno para Scrabble, Scarabeo y juegos de palabras similares. Te permite mantener un seguimiento de las puntuaciones, calcular bonos y seguir el progreso del juego.",
    footer: "Desarrollado con ❤️ para los amantes de los juegos de palabras",
    madeBy: "Desarrollado por",
    twoWaysTitle: "Dos formas de jugar",
    twoWaysSubtitle: "Elige el método que prefieras",
    boardModeTitle: "Tablero",
    boardModeDesc:
      "Usa el tablero interactivo para una visualización completa del juego. Perfecto para partidas competitivas donde quieres ver todas las palabras colocadas, verificar las conexiones entre palabras y tener un control visual completo del juego. El tablero calcula automáticamente los bonos y valida las posiciones de las palabras.",
    scorerModeTitle: "Calculadora",
    scorerModeDesc:
      "Usa la calculadora rápida para introducir rápidamente palabras y puntuaciones. Ideal para partidas rápidas o cuando prefieres calcular las puntuaciones manualmente. Más simple y directo, perfecto para quienes quieren concentrarse en el juego sin distracciones.",
    tryBoard: "Prueba el Tablero",
    tryScorer: "Prueba la Calculadora",
    faqTitle: "Preguntas Frecuentes",
    faq1Question: "¿Qué es un contador de puntos Scrabble?",
    faq1Answer:
      "Un contador de puntos (o marcador) es una herramienta que te ayuda a seguir las puntuaciones durante una partida de Scrabble. xScrabbler es un contador Scrabble digital gratuito que calcula automáticamente los puntos, bonos y gestiona el temporizador para cada turno.",
    faq2Question: "¿Cómo funciona la calculadora de puntuación Scrabble?",
    faq2Answer:
      "La calculadora Scrabble de xScrabbler te permite introducir las palabras jugadas y calcula automáticamente la puntuación considerando los bonos de letra (DL, TL) y palabra (DP, TP). También puedes usar el tablero interactivo para colocar palabras visualmente.",
    faq3Question: "¿Hay un temporizador Scrabble integrado?",
    faq3Answer:
      "¡Sí! xScrabbler incluye un temporizador Scrabble integrado que puedes personalizar en la configuración. Perfecto para partidas competitivas donde cada jugador tiene tiempo limitado para su turno.",
    faq4Question: "¿Puedo usar xScrabbler para otros juegos de palabras?",
    faq4Answer:
      "¡Por supuesto! xScrabbler funciona perfectamente como contador de puntos para Scrabble, Scarabeo y juegos similares. Soporta múltiples idiomas y sistemas de puntuación.",
  },

  // Common
  common: {
    oneWord: "palabra",
    words: "palabras",
    points: "puntos",
  },

  // Board Word Placement
  boardWordPlacement: {
    title: "Colocar Palabra",
    howToPlay: "❓ Cómo jugar",
    wordLabel: "Palabra (usa _ para fichas en blanco)",
    placeholder: "Haz clic en el tablero para seleccionar...",
    blankTilesWarning: "⚠️ Las fichas en blanco (_) valen 0 puntos",
    placeWord: "Colocar Palabra",
    clear: "Limpiar",
    clickToBegin: "👆 Haz clic en una celda del tablero para comenzar",
    cellSelected: "✓ Celda seleccionada - ¡empieza a escribir!",
    firstWordWarning: "⚠️ La primera palabra debe pasar por el centro (★)",
    mustConnect: "ℹ️ La palabra debe conectarse a las palabras existentes",
    instructionsTitle: "Cómo Jugar",
    instruction1:
      "<strong>1.</strong> Haz clic en una celda del tablero para seleccionar la posición inicial",
    instruction2:
      "<strong>2.</strong> Haz clic de nuevo para cambiar la dirección (→ Horizontal / ↓ Vertical)",
    instruction3:
      "<strong>3.</strong> Empieza a escribir tu palabra (el input se enfoca automáticamente)",
    instruction4:
      "<strong>4.</strong> Usa guion bajo (_) para fichas en blanco/comodín (0 puntos)",
    instruction5:
      '<strong>5.</strong> Ve la vista previa en el tablero, luego presiona Enter o haz clic en "Colocar Palabra"',
    firstWordRule: "Primera palabra: Debe pasar por el centro (★)",
    nextWordsRule:
      "Próximas palabras: Deben conectarse a las palabras existentes",
    gotIt: "¡Entendido!",
    bonusTooltip: "Bonus Bingo (B) - Añade cuando uses las 7 fichas",
    bonusActive: "✓ Bonus Bingo activo (+{bonus} puntos)",
  },

  // Board View
  boardView: {
    loading: "Cargando tablero...",
    legend: "Leyenda",
    tw: "TP",
    dw: "DP",
    tl: "TL",
    dl: "DL",
    center: "★ Centro",
    placed: "Colocada",
    selected: "Seleccionada",
    preview: "Vista previa",
    addPlayer: "Añadir Jugador",
    playerNamePlaceholder: "Nombre del jugador...",
    add: "Añadir",
    resetBoard: "Reiniciar Tablero",
    players: "Jugadores",
    addPlayerToStart: "Añade un jugador para comenzar",
    resetBoardTitle: "Reiniciar Tablero",
    resetBoardMessage:
      "¿Estás seguro de que quieres reiniciar el tablero? Todas las palabras serán eliminadas y el tablero se reiniciará.",
    clearBoard: "Limpiar Tablero",
    cancel: "Cancelar",
    ranking: "Clasificación",
    noPlayers: "No hay jugadores. ¡Añade un jugador para comenzar!",
    confirmReset:
      "¿Estás seguro de que quieres reiniciar el tablero? Todas las palabras serán eliminadas.",
    playerTurn: "Es el turno de {name}",
  },

  // Scorer
  scorer: {
    addPlayer: "Añadir jugador",
  },

  // Scorer View
  scorerView: {
    newPlayer: "Nuevo jugador...",
    add: "Añadir",
    addPlayerToStart: "Añade un jugador para comenzar la partida",
    players: "Jugadores",
    selectPlayerToAddWord: "Selecciona un jugador para añadir una palabra",
  },

  // Scorer Add Word
  scorerAddWord: {
    word: "Palabra:",
    wordPlaceholder: "palabra...",
    pointsPlaceholder: "puntos...",
  },

  // Player Details
  playerDetails: {
    points: "puntos",
    words: "Palabras",
    noWords: "Aún no se han colocado palabras",
    edit: "Editar",
    delete: "Eliminar",
    deletePlayer: "Eliminar Jugador",
    close: "Cerrar",
    confirmDelete: "¿Estás seguro de que quieres eliminar este jugador?",
  },

  // Settings View
  settings: {
    title: "Configuración",
    timer: "Temporizador",
    seconds: "(segundos)",
    language: "Idioma",
    points: "(puntos)",
    bonus: "Bonus",
    maxWordLength: "Longitud Máxima de Palabra",
    number: "(número)",
    boardGameSettings: "Configuración del Juego de Mesa",
  },

  // Board Config Selector
  boardConfigSelector: {
    boardConfiguration: "Configuración del Tablero",
    boardSize: "Tamaño del Tablero",
    changeSizeConfirm:
      "Cambiar el tamaño del tablero reiniciará la partida actual. ¿Continuar?",
  },

  // App
  app: {
    logoAlt: "Flowbite Logo",
    toggleDarkMode: "Alternar modo oscuro/claro",
    openMainMenu: "Abrir menú principal",
  },

  // Store Messages
  store: {
    insertName: "Introduce un nombre",
    noActivePlayer: "No hay jugador activo",
    wordCannotBeEmpty: "La palabra no puede estar vacía",
    wordOutOfBounds: "La palabra se sale de los límites",
    firstWordMustPassCenter: "La primera palabra debe pasar por el centro (★)",
    positionOccupied: "Posición ya ocupada",
    letterMismatch:
      'Desajuste de letras: no se puede colocar "{new}" donde ya existe "{existing}"',
    wordMustConnect: "La palabra debe conectarse a las palabras existentes",
    wordNotInDictionary: "Palabra no en el diccionario",
    insertNonEmptyWord: "Introduce una palabra no vacía",
    wordPlaced: 'Palabra "{text}" colocada! +{points} puntos',
    pointsUpdated: "Puntos actualizados con éxito",
    noMovesToUndo: "No hay movimientos para deshacer",
    moveUndone: 'Movimiento deshecho: "{word}" de {player}',
    importError: "Error al importar la partida",
  },

  // Game Stats
  gameStats: {
    title: "Estadísticas",
    noStats: "No hay estadísticas disponibles. ¡Empieza a jugar!",
    global: "Globales",
    totalWords: "Palabras totales",
    totalScore: "Puntuación total",
    averageScore: "Puntuación media",
    letters: "letras",
    longestWord: "Palabra más larga",
    highestScoringWord: "Palabra con mayor puntuación",
    by: "de",
    byPlayer: "Por Jugador",
    words: "Palabras",
    total: "Total",
    average: "Media",
    longest: "Más larga",
    bestWord: "Mejor palabra",
    bestWords: "Mejores Palabras",
    topPlayers: "Top Jugadores",
  },

  // Move History
  moveHistory: {
    title: "Historial de Movimientos",
    noMoves: "Aún no hay movimientos. ¡Empieza a jugar!",
    undo: "Deshacer",
    position: "Posición",
  },

  // Game Export/Import
  gameExportImport: {
    export: "Exportar",
    import: "Importar",
    share: "Compartir",
    exportSuccess: "Partida exportada con éxito",
    exportError: "Error al exportar la partida",
    importTitle: "Importar Partida",
    importFile: "Importar desde archivo",
    importLink: "Importar desde enlace",
    linkPlaceholder: "Pega el enlace de la partida...",
    importSuccess: "Partida importada con éxito",
    importError:
      "Error al importar. Verifica que el archivo o enlace sean válidos.",
    linkCopied: "¡Enlace copiado al portapapeles!",
    linkError: "Error al generar el enlace",
    emptyLink: "Por favor, introduce un enlace válido",
  },
};
