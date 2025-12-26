export default {
  // Navigation
  nav: {
    home: "Accueil",
    scorer: "Calculateur",
    boardGame: "Tablier",
    settings: "Paramètres",
    darkMode: "Mode sombre",
    lightMode: "Mode clair",
    soundOn: "Effets sonores activés",
    soundOff: "Effets sonores désactivés",
  },

  // General
  general: {
    addButton: "Ajouter",
    cancelButton: "Annuler",
    points: "points",
    maxLetters: "Max 10 lettres",
    typeHere: "Tapez le mot ici...",
    currentScore: "Score actuel",
  },

  // Timer
  timer: {
    pause: "Pause",
    resume: "Reprendre",
    restart: "Redémarrer",
  },

  // Home
  home: {
    title: "XSCRABBLER",
    subtitle: "CALCULATEUR DE SCORE",
    quickStart: "JOUER GRATUITEMENT",
    features: "Caractéristiques",
    multipleLanguages: "Langues multiples",
    multipleLanguagesDesc:
      "Supporte l'anglais, l'italien, le français, l'espagnol et bien d'autres langues",
    wordBonus: "Bonus de mot",
    wordBonusDesc: "Calcul facile des bonus de mot et de lettre",
    timer: "Minuteur",
    timerDesc: "Minuteur intégré pour les parties compétitives",
    playerTracking: "Suivi des joueurs",
    playerTrackingDesc: "Suivez les scores de tous les joueurs",
    customizable: "Personnalisable",
    customizableDesc:
      "Personnalisez les bonus, le minuteur et d'autres paramètres",
    openSource: "Code source ouvert",
    openSourceDesc: "Contribuez au projet sur GitHub",
    getStarted: "Jouer Maintenant",
    aboutTitle: "Prêt à jouer?",
    aboutDesc:
      "Rejoignez des milliers de joueurs qui utilisent xScrabbler pour leurs parties. Commencez à suivre vos scores de manière simple et amusante!",
    footer: "Développé avec ❤️ pour les amateurs de jeux de mots",
    madeBy: "Développé par",
    twoWaysTitle: "Deux façons de jouer",
    twoWaysSubtitle: "Choisissez la méthode que vous préférez",
    boardModeTitle: "Tablier",
    boardModeDesc:
      "Utilisez le tablier interactif pour une visualisation complète du jeu. Parfait pour les matchs compétitifs où vous voulez voir tous les mots placés, vérifier les connexions entre les mots et avoir un contrôle visuel complet du jeu. Le tablier calcule automatiquement les bonus et valide les positions des mots.",
    scorerModeTitle: "Calculateur",
    scorerModeDesc:
      "Utilisez le calculateur rapide pour entrer rapidement les mots et les scores. Idéal pour les parties rapides ou lorsque vous préférez calculer les scores manuellement. Plus simple et plus direct, parfait pour ceux qui veulent se concentrer sur le jeu sans distractions.",
    tryBoard: "Essayer le Tablier",
    tryScorer: "Essayer le Calculateur",
    faqTitle: "Questions Fréquentes",
    faq1Question: "Qu'est-ce qu'un compteur de points Scrabble?",
    faq1Answer:
      "Un compteur de points (ou compte-points) est un outil qui vous aide à suivre les scores pendant une partie de Scrabble. xScrabbler est un compteur Scrabble numérique gratuit qui calcule automatiquement les points, les bonus et gère le minuteur pour chaque tour.",
    faq2Question: "Comment fonctionne le calculateur de score Scrabble?",
    faq2Answer:
      "Le calculateur Scrabble de xScrabbler vous permet d'entrer les mots joués et calcule automatiquement le score en tenant compte des bonus de lettre (DL, TL) et de mot (DM, TM). Vous pouvez également utiliser le tablier interactif pour placer les mots visuellement.",
    faq3Question: "Y a-t-il un minuteur Scrabble intégré?",
    faq3Answer:
      "Oui! xScrabbler inclut un minuteur Scrabble intégré que vous pouvez personnaliser dans les paramètres. Parfait pour les parties compétitives où chaque joueur a un temps limité pour son tour.",
    faq4Question: "Puis-je utiliser xScrabbler pour d'autres jeux de mots?",
    faq4Answer:
      "Absolument! xScrabbler fonctionne parfaitement comme compteur de points pour Scrabble, Scarabeo et jeux similaires. Il supporte plusieurs langues et systèmes de score.",
  },

  // Common
  common: {
    oneWord: "mot",
    words: "mots",
    points: "points",
  },

  // Board Word Placement
  boardWordPlacement: {
    title: "Placer Mot",
    howToPlay: "❓ Comment jouer",
    wordLabel: "Mot (utilisez _ pour les tuiles vides)",
    placeholder: "Cliquez sur le plateau pour sélectionner...",
    blankTilesWarning: "⚠️ Les tuiles vides (_) valent 0 points",
    placeWord: "Placer Mot",
    clear: "Effacer",
    clickToBegin: "👆 Cliquez sur une cellule du plateau pour commencer",
    cellSelected: "✓ Cellule sélectionnée - commencez à taper!",
    firstWordWarning: "⚠️ Le premier mot doit passer par le centre (★)",
    mustConnect: "ℹ️ Le mot doit se connecter aux mots existants",
    instructionsTitle: "Comment Jouer",
    instruction1:
      "<strong>1.</strong> Cliquez sur une cellule du plateau pour sélectionner la position de départ",
    instruction2:
      "<strong>2.</strong> Cliquez à nouveau pour changer la direction (→ Horizontal / ↓ Vertical)",
    instruction3:
      "<strong>3.</strong> Commencez à taper votre mot (l'input se focalise automatiquement)",
    instruction4:
      "<strong>4.</strong> Utilisez underscore (_) pour les tuiles vides/joker (0 points)",
    instruction5:
      '<strong>5.</strong> Voyez l\'aperçu sur le plateau, puis appuyez sur Entrée ou cliquez sur "Placer Mot"',
    firstWordRule: "Premier mot: Doit passer par le centre (★)",
    nextWordsRule: "Mots suivants: Doivent se connecter aux mots existants",
    gotIt: "Compris!",
    bonusTooltip:
      "Bonus Bingo (B) - Ajoutez lorsque vous utilisez les 7 tuiles",
    bonusActive: "✓ Bonus Bingo actif (+{bonus} points)",
  },

  // Board View
  boardView: {
    loading: "Chargement du plateau...",
    legend: "Légende",
    tw: "TM",
    dw: "DM",
    tl: "TL",
    dl: "DL",
    center: "★ Centre",
    placed: "Placé",
    selected: "Sélectionné",
    preview: "Aperçu",
    addPlayer: "Ajouter Joueur",
    playerNamePlaceholder: "Nom du joueur...",
    add: "Ajouter",
    resetBoard: "Réinitialiser Plateau",
    players: "Joueurs",
    addPlayerToStart: "Ajoutez un joueur pour commencer",
    addPlayersPrompt:
      "Utilisez le panneau 'Classement' pour ajouter 1 à 4 joueurs",
    addMorePlayers: "Ajouter plus de joueurs",
    resetBoardTitle: "Réinitialiser Plateau",
    resetBoardMessage:
      "Êtes-vous sûr de vouloir réinitialiser le plateau? Tous les mots seront effacés et le plateau sera réinitialisé.",
    clearBoard: "Effacer Plateau",
    cancel: "Annuler",
    ranking: "Classement",
    noPlayers: "Aucun joueur. Ajoutez un joueur pour commencer!",
    confirmReset:
      "Êtes-vous sûr de vouloir réinitialiser le plateau? Tous les mots seront effacés.",
    playerTurn: "C'est au tour de {name}",
  },

  // Scorer
  scorer: {
    addPlayer: "Ajouter joueur",
  },

  // Scorer View
  scorerView: {
    newPlayer: "Nouveau joueur...",
    add: "Ajouter",
    addPlayerToStart: "Ajoutez un joueur pour commencer la partie",
    players: "Joueurs",
    selectPlayerToAddWord: "Sélectionnez un joueur pour ajouter un mot",

    // Onboarding UX
    pageSubtitle: "Ajoutez des mots et suivez les scores",
    welcomeTitle: "Bienvenue sur xScrabbler !",
    welcomeSubtitle: "Commencez en suivant ces étapes simples",
    step1: "Étape 1 : Ajouter des Joueurs",
    step1Desc: "Utilisez le formulaire pour ajouter 1 à 4 joueurs",
    step2: "Étape 2 : Sélectionner un Joueur",
    step2Desc: "Cliquez sur un joueur pour l'activer et commencer à jouer",
    step3: "Étape 3 : Ajouter des Mots",
    step3Desc: "Saisissez les mots et les scores pour le joueur actif",
    addPlayersFirst: "Ajoutez d'abord des joueurs pour commencer",
    selectPlayerFirst: "Sélectionnez un joueur pour ajouter des mots",
    noPlayersYet: "Aucun joueur pour le moment",
    clickBelowToAdd: "Utilisez le formulaire pour ajouter le premier joueur",
  },

  // Scorer Add Word
  scorerAddWord: {
    word: "Mot:",
    wordPlaceholder: "mot...",
    pointsPlaceholder: "points...",
  },

  // Player Details
  playerDetails: {
    points: "points",
    words: "Mots",
    noWords: "Aucun mot placé pour le moment",
    edit: "Modifier",
    delete: "Supprimer",
    deletePlayer: "Supprimer Joueur",
    close: "Fermer",
    confirmDelete: "Êtes-vous sûr de vouloir supprimer ce joueur?",
  },

  // Settings View
  settings: {
    title: "Paramètres",
    timer: "Minuteur",
    seconds: "(secondes)",
    scoringDictionary: "Dictionnaire Scrabble",
    scoringDictionaryHint:
      "Détermine la valeur des lettres selon la version du jeu",
    points: "(points)",
    bonus: "Bonus",
    maxWordLength: "Longueur Maximale du Mot",
    number: "(nombre)",
    boardGameSettings: "Paramètres du Jeu de Plateau",
  },

  // Board Config Selector
  boardConfigSelector: {
    boardConfiguration: "Configuration du Plateau",
    boardSize: "Taille du Plateau",
    changeSizeConfirm:
      "Changer la taille du plateau réinitialisera la partie en cours. Continuer?",
  },

  // App
  app: {
    logoAlt: "Flowbite Logo",
    toggleDarkMode: "Basculer mode sombre/clair",
    openMainMenu: "Ouvrir le menu principal",
  },

  // Store Messages
  store: {
    insertName: "Entrez un nom",
    noActivePlayer: "Aucun joueur actif",
    wordCannotBeEmpty: "Le mot ne peut pas être vide",
    wordOutOfBounds: "Le mot sort des limites",
    firstWordMustPassCenter: "Le premier mot doit passer par le centre (★)",
    positionOccupied: "Position déjà occupée",
    letterMismatch:
      'Incompatibilité de lettres: ne peut pas placer "{new}" où "{existing}" existe déjà',
    wordMustConnect: "Le mot doit se connecter aux mots existants",
    wordNotInDictionary: "Mot non dans le dictionnaire",
    insertNonEmptyWord: "Entrez un mot non vide",
    wordPlaced: 'Mot "{text}" placé! +{points} points',
    pointsUpdated: "Points mis à jour avec succès",
    noMovesToUndo: "Aucun mouvement à annuler",
    moveUndone: 'Mouvement annulé: "{word}" de {player}',
    importError: "Erreur lors de l'importation de la partie",
  },

  // Game Stats
  gameStats: {
    title: "Statistiques",
    noStats: "Aucune statistique disponible. Commencez à jouer!",
    global: "Globales",
    totalWords: "Mots totaux",
    totalScore: "Score total",
    averageScore: "Score moyen",
    letters: "lettres",
    longestWord: "Mot le plus long",
    highestScoringWord: "Mot avec le score le plus élevé",
    by: "de",
    byPlayer: "Par Joueur",
    words: "Mots",
    total: "Total",
    average: "Moyenne",
    longest: "Plus long",
    bestWord: "Meilleur mot",
    bestWords: "Meilleurs Mots",
    topPlayers: "Top Joueurs",
  },

  // Move History
  moveHistory: {
    title: "Historique des Mouvements",
    noMoves: "Aucun mouvement pour le moment. Commencez à jouer!",
    undo: "Annuler",
    position: "Position",
  },

  // Game Export/Import
  gameExportImport: {
    export: "Exporter",
    import: "Importer",
    share: "Partager",
    exportSuccess: "Partie exportée avec succès",
    exportError: "Erreur lors de l'exportation de la partie",
    importTitle: "Importer une Partie",
    importFile: "Importer depuis un fichier",
    importLink: "Importer depuis un lien",
    linkPlaceholder: "Collez le lien de la partie...",
    importSuccess: "Partie importée avec succès",
    importError:
      "Erreur lors de l'importation. Veuillez vérifier que le fichier ou le lien est valide.",
    linkCopied: "Lien copié dans le presse-papiers!",
    linkError: "Erreur lors de la génération du lien",
    emptyLink: "Veuillez entrer un lien valide",
  },

  // Cookie Consent
  cookies: {
    title: "Nous utilisons des cookies",
    description:
      "Nous utilisons des cookies analytiques pour améliorer votre expérience et analyser le trafic du site. En acceptant, vous nous aidez à améliorer xScrabbler.",
    accept: "Accepter",
    refuse: "Refuser",
  },
};
