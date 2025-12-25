export default {
  // Navigation
  nav: {
    home: "Início",
    scorer: "Calculadora",
    boardGame: "Tabuleiro",
    settings: "Configurações",
    darkMode: "Modo escuro",
    lightMode: "Modo claro",
    soundOn: "Efeitos sonoros ativados",
    soundOff: "Efeitos sonoros desativados",
  },

  // General
  general: {
    addButton: "Adicionar",
    cancelButton: "Cancelar",
    points: "pontos",
    maxLetters: "Máx 10 letras",
    typeHere: "Digite a palavra aqui...",
    currentScore: "Pontuação atual",
  },

  // Timer
  timer: {
    pause: "Pausar",
    resume: "Retomar",
    restart: "Reiniciar",
  },

  // Home
  home: {
    title: "XSCRABBLER",
    subtitle: "CALCULADORA DE PONTUAÇÃO",
    quickStart: "INÍCIO RÁPIDO",
    features: "Características",
    multipleLanguages: "Múltiplos idiomas",
    multipleLanguagesDesc:
      "Suporta italiano, inglês, francês, espanhol e muitos outros idiomas",
    wordBonus: "Bônus de palavra",
    wordBonusDesc: "Calcula facilmente bônus de palavra e letra",
    timer: "Temporizador",
    timerDesc: "Temporizador integrado para jogos competitivos",
    playerTracking: "Gestão de jogadores",
    playerTrackingDesc: "Acompanhe as pontuações de todos os jogadores",
    customizable: "Personalizável",
    customizableDesc: "Personalize bônus, temporizador e outras configurações",
    openSource: "Código Aberto",
    openSourceDesc: "Contribua para o projeto no GitHub",
    getStarted: "Comece agora",
    aboutTitle: "O que é xScrabbler?",
    aboutDesc:
      "xScrabbler é uma calculadora de pontuação moderna para Scrabble, Scarabeo e jogos de palavras similares. Permite-lhe acompanhar pontuações, aplicar bônus e gerenciar o tempo de jogo.",
    footer: "Desenvolvido com ❤️ para os amantes de jogos de palavras",
    madeBy: "Criado por",
    twoWaysTitle: "Duas formas de jogar",
    twoWaysSubtitle: "Escolha o método que preferir",
    boardModeTitle: "Tabuleiro",
    boardModeDesc:
      "Use o tabuleiro interativo para uma visualização completa do jogo. Perfeito para partidas competitivas onde você quer ver todas as palavras colocadas, verificar as conexões entre palavras e ter controle visual completo do jogo. O tabuleiro calcula automaticamente os bônus e valida as posições das palavras.",
    scorerModeTitle: "Calculadora",
    scorerModeDesc:
      "Use a calculadora rápida para inserir rapidamente palavras e pontuações. Ideal para jogos rápidos ou quando você prefere calcular pontuações manualmente. Mais simples e direto, perfeito para quem quer se concentrar no jogo sem distrações.",
    tryBoard: "Experimente o Tabuleiro",
    tryScorer: "Experimente a Calculadora",
    faqTitle: "Perguntas Frequentes",
    faq1Question: "O que é um contador de pontos Scrabble?",
    faq1Answer:
      "Um contador de pontos (ou placar) é uma ferramenta que te ajuda a acompanhar as pontuações durante uma partida de Scrabble. xScrabbler é um contador Scrabble digital gratuito que calcula automaticamente pontos, bônus e gerencia o cronômetro para cada turno.",
    faq2Question: "Como funciona a calculadora de pontuação Scrabble?",
    faq2Answer:
      "A calculadora Scrabble do xScrabbler permite inserir as palavras jogadas e calcula automaticamente a pontuação considerando os bônus de letra (DL, TL) e palavra (DP, TP). Você também pode usar o tabuleiro interativo para colocar palavras visualmente.",
    faq3Question: "Existe um cronômetro Scrabble integrado?",
    faq3Answer:
      "Sim! xScrabbler inclui um cronômetro Scrabble integrado que você pode personalizar nas configurações. Perfeito para jogos competitivos onde cada jogador tem tempo limitado para seu turno.",
    faq4Question: "Posso usar o xScrabbler para outros jogos de palavras?",
    faq4Answer:
      "Com certeza! xScrabbler funciona perfeitamente como contador de pontos para Scrabble, Scarabeo e jogos similares. Suporta múltiplos idiomas e sistemas de pontuação.",
  },

  // Common
  common: {
    oneWord: "palavra",
    words: "palavras",
    points: "pontos",
  },

  // Board Word Placement
  boardWordPlacement: {
    title: "Colocar Palavra",
    howToPlay: "❓ Como jogar",
    wordLabel: "Palavra (use _ para peças em branco)",
    placeholder: "Clique no tabuleiro para selecionar...",
    blankTilesWarning: "⚠️ Peças em branco (_) valem 0 pontos",
    placeWord: "Colocar Palavra",
    clear: "Limpar",
    clickToBegin: "👆 Clique em uma célula no tabuleiro para começar",
    cellSelected: "✓ Célula selecionada - comece a digitar!",
    firstWordWarning: "⚠️ A primeira palavra deve passar pelo centro (★)",
    mustConnect: "ℹ️ A palavra deve conectar-se às palavras existentes",
    instructionsTitle: "Como Jogar",
    instruction1:
      "<strong>1.</strong> Clique em uma célula no tabuleiro para selecionar a posição inicial",
    instruction2:
      "<strong>2.</strong> Clique novamente para alternar a direção (→ Horizontal / ↓ Vertical)",
    instruction3:
      "<strong>3.</strong> Comece a digitar sua palavra (o input foca automaticamente)",
    instruction4:
      "<strong>4.</strong> Use underscore (_) para peças em branco/curinga (0 pontos)",
    instruction5:
      '<strong>5.</strong> Veja a pré-visualização no tabuleiro, depois pressione Enter ou clique em "Colocar Palavra"',
    firstWordRule: "Primeira palavra: Deve passar pelo centro (★)",
    nextWordsRule:
      "Próximas palavras: Devem conectar-se às palavras existentes",
    gotIt: "Entendi!",
    bonusTooltip: "Bônus Bingo (B) - Adicione quando usar todas as 7 peças",
    bonusActive: "✓ Bônus Bingo ativo (+{bonus} pontos)",
  },

  // Board View
  boardView: {
    loading: "Carregando tabuleiro...",
    legend: "Legenda",
    tw: "TP",
    dw: "DP",
    tl: "TL",
    dl: "DL",
    center: "★ Centro",
    placed: "Colocada",
    selected: "Selecionada",
    preview: "Pré-visualização",
    addPlayer: "Adicionar Jogador",
    playerNamePlaceholder: "Nome do jogador...",
    add: "Adicionar",
    resetBoard: "Reiniciar Tabuleiro",
    players: "Jogadores",
    addPlayerToStart: "Adicione um jogador para começar",
    resetBoardTitle: "Reiniciar Tabuleiro",
    resetBoardMessage:
      "Tem certeza de que deseja reiniciar o tabuleiro? Todas as palavras serão apagadas e o tabuleiro será reiniciado.",
    clearBoard: "Limpar Tabuleiro",
    cancel: "Cancelar",
    ranking: "Classificação",
    noPlayers: "Sem jogadores. Adicione um jogador para começar!",
    confirmReset:
      "Tem certeza de que deseja reiniciar o tabuleiro? Todas as palavras serão apagadas.",
    playerTurn: "É a vez de {name}",
  },

  // Scorer
  scorer: {
    addPlayer: "Adicionar jogador",
  },

  // Scorer View
  scorerView: {
    newPlayer: "Novo jogador...",
    add: "Adicionar",
    addPlayerToStart: "Adicione um jogador para iniciar o jogo",
    players: "Jogadores",
    selectPlayerToAddWord: "Selecione um jogador para adicionar uma palavra",

    // Onboarding UX
    pageSubtitle: "Adicione palavras e acompanhe as pontuações",
    welcomeTitle: "Bem-vindo ao xScrabbler!",
    welcomeSubtitle: "Comece seguindo estes passos simples",
    step1: "Passo 1: Adicionar Jogadores",
    step1Desc: "Use o formulário para adicionar de 1 a 4 jogadores",
    step2: "Passo 2: Selecionar um Jogador",
    step2Desc: "Clique num jogador para o ativar e começar a jogar",
    step3: "Passo 3: Adicionar Palavras",
    step3Desc: "Introduza palavras e pontuações para o jogador ativo",
    addPlayersFirst: "Adicione jogadores primeiro para começar",
    selectPlayerFirst: "Selecione um jogador para adicionar palavras",
    noPlayersYet: "Ainda sem jogadores",
    clickBelowToAdd: "Use o formulário para adicionar o primeiro jogador",
  },

  // Scorer Add Word
  scorerAddWord: {
    word: "Palavra:",
    wordPlaceholder: "palavra...",
    pointsPlaceholder: "pontos...",
  },

  // Player Details
  playerDetails: {
    points: "pontos",
    words: "Palavras",
    noWords: "Nenhuma palavra colocada ainda",
    edit: "Editar",
    delete: "Eliminar",
    deletePlayer: "Eliminar Jogador",
    close: "Fechar",
    confirmDelete: "Tem certeza de que deseja eliminar este jogador?",
  },

  // Settings View
  settings: {
    title: "Configurações",
    timer: "Temporizador",
    seconds: "(segundos)",
    scoringDictionary: "Dicionário Scrabble",
    scoringDictionaryHint: "Determina os pontos das letras para a versão do jogo",
    points: "(pontos)",
    bonus: "Bônus",
    maxWordLength: "Comprimento Máximo da Palavra",
    number: "(número)",
    boardGameSettings: "Configurações do Jogo de Tabuleiro",
  },

  // Board Config Selector
  boardConfigSelector: {
    boardConfiguration: "Configuração do Tabuleiro",
    boardSize: "Tamanho do Tabuleiro",
    changeSizeConfirm:
      "Alterar o tamanho do tabuleiro reiniciará o jogo atual. Continuar?",
  },

  // App
  app: {
    logoAlt: "Flowbite Logo",
    toggleDarkMode: "Alternar modo escuro/claro",
    openMainMenu: "Abrir menu principal",
  },

  // Store Messages
  store: {
    insertName: "Insira um nome",
    noActivePlayer: "Nenhum jogador ativo",
    wordCannotBeEmpty: "A palavra não pode estar vazia",
    wordOutOfBounds: "A palavra sai dos limites",
    firstWordMustPassCenter: "A primeira palavra deve passar pelo centro (★)",
    positionOccupied: "Posição já ocupada",
    letterMismatch:
      'Incompatibilidade de letras: não é possível colocar "{new}" onde "{existing}" já existe',
    wordMustConnect: "A palavra deve conectar-se às palavras existentes",
    wordNotInDictionary: "Palavra não está no dicionário",
    insertNonEmptyWord: "Insira uma palavra não vazia",
    wordPlaced: 'Palavra "{text}" colocada! +{points} pontos',
    pointsUpdated: "Pontos atualizados com sucesso",
    noMovesToUndo: "Nenhum movimento para desfazer",
    moveUndone: 'Movimento desfeito: "{word}" de {player}',
    importError: "Erro ao importar o jogo",
  },

  // Game Stats
  gameStats: {
    title: "Estatísticas",
    noStats: "Nenhuma estatística disponível. Comece a jogar!",
    global: "Global",
    totalWords: "Total de palavras",
    totalScore: "Pontuação total",
    averageScore: "Pontuação média",
    letters: "letras",
    longestWord: "Palavra mais longa",
    highestScoringWord: "Palavra com maior pontuação",
    by: "de",
    byPlayer: "Por Jogador",
    words: "Palavras",
    total: "Total",
    average: "Média",
    longest: "Mais longa",
    bestWord: "Melhor palavra",
    bestWords: "Melhores Palavras",
    topPlayers: "Top Jogadores",
  },

  // Move History
  moveHistory: {
    title: "Histórico de Movimentos",
    noMoves: "Ainda não há movimentos. Comece a jogar!",
    undo: "Desfazer",
    position: "Posição",
  },

  // Game Export/Import
  gameExportImport: {
    export: "Exportar",
    import: "Importar",
    share: "Compartilhar",
    exportSuccess: "Jogo exportado com sucesso",
    exportError: "Erro ao exportar o jogo",
    importTitle: "Importar Jogo",
    importFile: "Importar de arquivo",
    importLink: "Importar de link",
    linkPlaceholder: "Cole o link do jogo...",
    importSuccess: "Jogo importado com sucesso",
    importError: "Erro ao importar. Verifique se o arquivo ou link é válido.",
    linkCopied: "Link copiado para a área de transferência!",
    linkError: "Erro ao gerar o link",
    emptyLink: "Por favor, insira um link válido",
  },

  // Cookie Consent
  cookies: {
    title: "Usamos cookies",
    description:
      "Usamos cookies analíticos para melhorar sua experiência e analisar o tráfego do site. Ao aceitar, você nos ajuda a melhorar o xScrabbler.",
    accept: "Aceitar",
    refuse: "Recusar",
  },
};
