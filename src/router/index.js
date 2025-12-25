import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ScorerView from "../views/ScorerView.vue";
import SettingsView from "../views/SettingsView.vue";

const supportedLanguages = ["en", "it", "fr", "es", "de", "nl", "et", "pt"];

const baseUrl = "https://scrabble.exsnake.com";
const ogImage = `${baseUrl}/xscrabbler-preview.png`;

const metaData = {
  home: {
    title: {
      en: "xScrabbler - Score calculator for Scrabble and word games",
      it: "xScrabbler - Calcolatore di punteggi per Scrabble e Scarabeo",
      fr: "xScrabbler - Calculateur de score pour Scrabble et jeux de mots",
      es: "xScrabbler - Calculadora de puntuación para Scrabble y juegos de palabras",
      de: "xScrabbler - Punkterechner für Scrabble und Wortspiele",
      nl: "xScrabbler - Scorecalculator voor Scrabble en woordspellen",
      pt: "xScrabbler - Calculadora de pontuação para Scrabble e jogos de palavras",
      et: "xScrabbler - Skoori arvuti Scrabble ja sõnamängude jaoks",
    },
    metaTags: {
      en: [
        {
          name: "description",
          content:
            "Modern and intuitive score calculator for Scrabble, Scarabeo and similar word games. Manage scores, bonuses and timer in a single app.",
        },
        {
          property: "og:title",
          content: "xScrabbler - Score calculator for Scrabble and word games",
        },
        {
          property: "og:description",
          content:
            "Modern and intuitive score calculator for Scrabble, Scarabeo and similar word games. Manage scores, bonuses and timer in a single app.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogImage },
        { property: "og:locale", content: "en_US" },
        { property: "og:site_name", content: "xScrabbler" },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "xScrabbler - Score calculator for Scrabble and word games",
        },
        {
          name: "twitter:description",
          content:
            "Modern and intuitive score calculator for Scrabble, Scarabeo and similar word games.",
        },
        { name: "twitter:image", content: ogImage },
      ],
      it: [
        {
          name: "description",
          content:
            "Calcolatore di punteggi moderno e intuitivo per Scrabble, Scarabeo e giochi di parole simili. Gestisci punteggi, bonus e timer in un'unica app.",
        },
        {
          property: "og:title",
          content:
            "xScrabbler - Calcolatore di punteggi per Scrabble e Scarabeo",
        },
        {
          property: "og:description",
          content:
            "Calcolatore di punteggi moderno e intuitivo per Scrabble, Scarabeo e giochi di parole simili. Gestisci punteggi, bonus e timer in un'unica app.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogImage },
        { property: "og:locale", content: "it_IT" },
        { property: "og:site_name", content: "xScrabbler" },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content:
            "xScrabbler - Calcolatore di punteggi per Scrabble e Scarabeo",
        },
        {
          name: "twitter:description",
          content:
            "Calcolatore di punteggi moderno e intuitivo per Scrabble, Scarabeo e giochi di parole simili.",
        },
        { name: "twitter:image", content: ogImage },
      ],
      fr: [
        {
          name: "description",
          content:
            "Calculateur de score moderne et intuitif pour Scrabble, Scarabeo et jeux de mots similaires. Gérez les scores, bonus et minuteur dans une seule application.",
        },
        {
          property: "og:title",
          content:
            "xScrabbler - Calculateur de score pour Scrabble et jeux de mots",
        },
        {
          property: "og:description",
          content:
            "Calculateur de score moderne et intuitif pour Scrabble, Scarabeo et jeux de mots similaires. Gérez les scores, bonus et minuteur dans une seule application.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogImage },
        { property: "og:locale", content: "fr_FR" },
        { property: "og:site_name", content: "xScrabbler" },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content:
            "xScrabbler - Calculateur de score pour Scrabble et jeux de mots",
        },
        {
          name: "twitter:description",
          content:
            "Calculateur de score moderne et intuitif pour Scrabble, Scarabeo et jeux de mots similaires.",
        },
        { name: "twitter:image", content: ogImage },
      ],
      es: [
        {
          name: "description",
          content:
            "Calculadora de puntuación moderna e intuitiva para Scrabble, Scarabeo y juegos de palabras similares. Gestiona puntuaciones, bonos y temporizador en una sola aplicación.",
        },
        {
          property: "og:title",
          content:
            "xScrabbler - Calculadora de puntuación para Scrabble y juegos de palabras",
        },
        {
          property: "og:description",
          content:
            "Calculadora de puntuación moderna e intuitiva para Scrabble, Scarabeo y juegos de palabras similares. Gestiona puntuaciones, bonos y temporizador en una sola aplicación.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogImage },
        { property: "og:locale", content: "es_ES" },
        { property: "og:site_name", content: "xScrabbler" },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content:
            "xScrabbler - Calculadora de puntuación para Scrabble y juegos de palabras",
        },
        {
          name: "twitter:description",
          content:
            "Calculadora de puntuación moderna e intuitiva para Scrabble, Scarabeo y juegos de palabras similares.",
        },
        { name: "twitter:image", content: ogImage },
      ],
      de: [
        {
          name: "description",
          content:
            "Moderner und intuitiver Punkterechner für Scrabble, Scarabeo und ähnliche Wortspiele. Verwalten Sie Punkte, Boni und Timer in einer einzigen App.",
        },
        {
          property: "og:title",
          content: "xScrabbler - Punkterechner für Scrabble und Wortspiele",
        },
        {
          property: "og:description",
          content:
            "Moderner und intuitiver Punkterechner für Scrabble, Scarabeo und ähnliche Wortspiele. Verwalten Sie Punkte, Boni und Timer in einer einzigen App.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogImage },
        { property: "og:locale", content: "de_DE" },
        { property: "og:site_name", content: "xScrabbler" },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "xScrabbler - Punkterechner für Scrabble und Wortspiele",
        },
        {
          name: "twitter:description",
          content:
            "Moderner und intuitiver Punkterechner für Scrabble, Scarabeo und ähnliche Wortspiele.",
        },
        { name: "twitter:image", content: ogImage },
      ],
      nl: [
        {
          name: "description",
          content:
            "Moderne en intuïtieve scorecalculator voor Scrabble, Scarabeo en vergelijkbare woordspellen. Beheer scores, bonussen en timer in één app.",
        },
        {
          property: "og:title",
          content: "xScrabbler - Scorecalculator voor Scrabble en woordspellen",
        },
        {
          property: "og:description",
          content:
            "Moderne en intuïtieve scorecalculator voor Scrabble, Scarabeo en vergelijkbare woordspellen. Beheer scores, bonussen en timer in één app.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogImage },
        { property: "og:locale", content: "nl_NL" },
        { property: "og:site_name", content: "xScrabbler" },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "xScrabbler - Scorecalculator voor Scrabble en woordspellen",
        },
        {
          name: "twitter:description",
          content:
            "Moderne en intuïtieve scorecalculator voor Scrabble, Scarabeo en vergelijkbare woordspellen.",
        },
        { name: "twitter:image", content: ogImage },
      ],
      pt: [
        {
          name: "description",
          content:
            "Calculadora de pontuação moderna e intuitiva para Scrabble, Scarabeo e jogos de palavras similares. Gerencie pontuações, bônus e temporizador em um único aplicativo.",
        },
        {
          property: "og:title",
          content:
            "xScrabbler - Calculadora de pontuação para Scrabble e jogos de palavras",
        },
        {
          property: "og:description",
          content:
            "Calculadora de pontuação moderna e intuitiva para Scrabble, Scarabeo e jogos de palavras similares. Gerencie pontuações, bônus e temporizador em um único aplicativo.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogImage },
        { property: "og:locale", content: "pt_PT" },
        { property: "og:site_name", content: "xScrabbler" },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content:
            "xScrabbler - Calculadora de pontuação para Scrabble e jogos de palavras",
        },
        {
          name: "twitter:description",
          content:
            "Calculadora de pontuação moderna e intuitiva para Scrabble, Scarabeo e jogos de palavras similares.",
        },
        { name: "twitter:image", content: ogImage },
      ],
      et: [
        {
          name: "description",
          content:
            "Kaasaegne ja intuitiivne skoori arvuti Scrabble, Scarabeo ja sarnaste sõnamängude jaoks. Hallake skoore, boonuseid ja taimerit ühes rakenduses.",
        },
        {
          property: "og:title",
          content: "xScrabbler - Skoori arvuti Scrabble ja sõnamängude jaoks",
        },
        {
          property: "og:description",
          content:
            "Kaasaegne ja intuitiivne skoori arvuti Scrabble, Scarabeo ja sarnaste sõnamängude jaoks. Hallake skoore, boonuseid ja taimerit ühes rakenduses.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogImage },
        { property: "og:locale", content: "et_EE" },
        { property: "og:site_name", content: "xScrabbler" },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "xScrabbler - Skoori arvuti Scrabble ja sõnamängude jaoks",
        },
        {
          name: "twitter:description",
          content:
            "Kaasaegne ja intuitiivne skoori arvuti Scrabble, Scarabeo ja sarnaste sõnamängude jaoks.",
        },
        { name: "twitter:image", content: ogImage },
      ],
    },
  },
  scorer: {
    title: {
      en: "Scorer - xScrabbler",
      it: "Calcolatore - xScrabbler",
      fr: "Calculateur - xScrabbler",
      es: "Calculadora - xScrabbler",
      de: "Punktesteller - xScrabbler",
      nl: "Scorecalculator - xScrabbler",
      pt: "Calculadora - xScrabbler",
      et: "Skoorimine - xScrabbler",
    },
    metaTags: {
      en: [
        {
          name: "description",
          content:
            "Easily calculate scores for your Scrabble and word games with integrated timer and support for multiple players.",
        },
        { property: "og:title", content: "Scorer - xScrabbler" },
        {
          property: "og:description",
          content:
            "Easily calculate scores for your Scrabble and word games with integrated timer and support for multiple players.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogImage },
        { property: "og:locale", content: "en_US" },
        { property: "og:site_name", content: "xScrabbler" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Scorer - xScrabbler" },
        {
          name: "twitter:description",
          content:
            "Easily calculate scores for your Scrabble and word games with integrated timer and support for multiple players.",
        },
        { name: "twitter:image", content: ogImage },
      ],
      it: [
        {
          name: "description",
          content:
            "Calcola facilmente i punteggi delle tue partite di Scrabble e Scarabeo con timer integrato e supporto per più giocatori.",
        },
        { property: "og:title", content: "Calcolatore - xScrabbler" },
        {
          property: "og:description",
          content:
            "Calcola facilmente i punteggi delle tue partite di Scrabble e Scarabeo con timer integrato e supporto per più giocatori.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogImage },
        { property: "og:locale", content: "it_IT" },
        { property: "og:site_name", content: "xScrabbler" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Calcolatore - xScrabbler" },
        {
          name: "twitter:description",
          content:
            "Calcola facilmente i punteggi delle tue partite di Scrabble e Scarabeo con timer integrato e supporto per più giocatori.",
        },
        { name: "twitter:image", content: ogImage },
      ],
      fr: [
        {
          name: "description",
          content:
            "Calculez facilement les scores de vos parties de Scrabble et jeux de mots avec minuteur intégré et support pour plusieurs joueurs.",
        },
        { property: "og:title", content: "Calculateur - xScrabbler" },
        {
          property: "og:description",
          content:
            "Calculez facilement les scores de vos parties de Scrabble et jeux de mots avec minuteur intégré et support pour plusieurs joueurs.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogImage },
        { property: "og:locale", content: "fr_FR" },
        { property: "og:site_name", content: "xScrabbler" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Calculateur - xScrabbler" },
        {
          name: "twitter:description",
          content:
            "Calculez facilement les scores de vos parties de Scrabble et jeux de mots avec minuteur intégré et support pour plusieurs joueurs.",
        },
        { name: "twitter:image", content: ogImage },
      ],
      es: [
        {
          name: "description",
          content:
            "Calcula fácilmente las puntuaciones de tus partidas de Scrabble y juegos de palabras con temporizador integrado y soporte para múltiples jugadores.",
        },
        { property: "og:title", content: "Calculadora - xScrabbler" },
        {
          property: "og:description",
          content:
            "Calcula fácilmente las puntuaciones de tus partidas de Scrabble y juegos de palabras con temporizador integrado y soporte para múltiples jugadores.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogImage },
        { property: "og:locale", content: "es_ES" },
        { property: "og:site_name", content: "xScrabbler" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Calculadora - xScrabbler" },
        {
          name: "twitter:description",
          content:
            "Calcula fácilmente las puntuaciones de tus partidas de Scrabble y juegos de palabras con temporizador integrado y soporte para múltiples jugadores.",
        },
        { name: "twitter:image", content: ogImage },
      ],
      de: [
        {
          name: "description",
          content:
            "Berechnen Sie einfach die Punkte für Ihre Scrabble- und Wortspiele mit integriertem Timer und Unterstützung für mehrere Spieler.",
        },
        { property: "og:title", content: "Punktesteller - xScrabbler" },
        {
          property: "og:description",
          content:
            "Berechnen Sie einfach die Punkte für Ihre Scrabble- und Wortspiele mit integriertem Timer und Unterstützung für mehrere Spieler.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogImage },
        { property: "og:locale", content: "de_DE" },
        { property: "og:site_name", content: "xScrabbler" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Punktesteller - xScrabbler" },
        {
          name: "twitter:description",
          content:
            "Berechnen Sie einfach die Punkte für Ihre Scrabble- und Wortspiele mit integriertem Timer und Unterstützung für mehrere Spieler.",
        },
        { name: "twitter:image", content: ogImage },
      ],
      nl: [
        {
          name: "description",
          content:
            "Bereken eenvoudig scores voor uw Scrabble- en woordspellen met geïntegreerde timer en ondersteuning voor meerdere spelers.",
        },
        { property: "og:title", content: "Scorecalculator - xScrabbler" },
        {
          property: "og:description",
          content:
            "Bereken eenvoudig scores voor uw Scrabble- en woordspellen met geïntegreerde timer en ondersteuning voor meerdere spelers.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogImage },
        { property: "og:locale", content: "nl_NL" },
        { property: "og:site_name", content: "xScrabbler" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Scorecalculator - xScrabbler" },
        {
          name: "twitter:description",
          content:
            "Bereken eenvoudig scores voor uw Scrabble- en woordspellen met geïntegreerde timer en ondersteuning voor meerdere spelers.",
        },
        { name: "twitter:image", content: ogImage },
      ],
      pt: [
        {
          name: "description",
          content:
            "Calcule facilmente as pontuações dos seus jogos de Scrabble e jogos de palavras com temporizador integrado e suporte para vários jogadores.",
        },
        { property: "og:title", content: "Calculadora - xScrabbler" },
        {
          property: "og:description",
          content:
            "Calcule facilmente as pontuações dos seus jogos de Scrabble e jogos de palavras com temporizador integrado e suporte para vários jogadores.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogImage },
        { property: "og:locale", content: "pt_PT" },
        { property: "og:site_name", content: "xScrabbler" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Calculadora - xScrabbler" },
        {
          name: "twitter:description",
          content:
            "Calcule facilmente as pontuações dos seus jogos de Scrabble e jogos de palavras com temporizador integrado e suporte para vários jogadores.",
        },
        { name: "twitter:image", content: ogImage },
      ],
      et: [
        {
          name: "description",
          content:
            "Arvutage hõlpsalt oma Scrabble ja sõnamängude tulemusi koos integreeritud taimeriga ja mitme mängija toega.",
        },
        { property: "og:title", content: "Skoorimine - xScrabbler" },
        {
          property: "og:description",
          content:
            "Arvutage hõlpsalt oma Scrabble ja sõnamängude tulemusi koos integreeritud taimeriga ja mitme mängija toega.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogImage },
        { property: "og:locale", content: "et_EE" },
        { property: "og:site_name", content: "xScrabbler" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Skoorimine - xScrabbler" },
        {
          name: "twitter:description",
          content:
            "Arvutage hõlpsalt oma Scrabble ja sõnamängude tulemusi koos integreeritud taimeriga ja mitme mängija toega.",
        },
        { name: "twitter:image", content: ogImage },
      ],
    },
  },
  settings: {
    title: {
      en: "Settings - xScrabbler",
      it: "Impostazioni - xScrabbler",
      fr: "Paramètres - xScrabbler",
      es: "Configuración - xScrabbler",
      de: "Einstellungen - xScrabbler",
      nl: "Instellingen - xScrabbler",
      pt: "Configurações - xScrabbler",
      et: "Seaded - xScrabbler",
    },
    metaTags: {
      en: [
        {
          name: "description",
          content:
            "Customize your Scrabble score calculator with various languages, themes and game options.",
        },
        { property: "og:title", content: "Settings - xScrabbler" },
        {
          property: "og:description",
          content:
            "Customize your Scrabble score calculator with various languages, themes and game options.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogImage },
        { property: "og:locale", content: "en_US" },
        { property: "og:site_name", content: "xScrabbler" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Settings - xScrabbler" },
        {
          name: "twitter:description",
          content:
            "Customize your Scrabble score calculator with various languages, themes and game options.",
        },
        { name: "twitter:image", content: ogImage },
      ],
      it: [
        {
          name: "description",
          content:
            "Personalizza il tuo calcolatore di punteggi per Scrabble e Scarabeo con varie lingue, temi e opzioni di gioco.",
        },
        { property: "og:title", content: "Impostazioni - xScrabbler" },
        {
          property: "og:description",
          content:
            "Personalizza il tuo calcolatore di punteggi per Scrabble e Scarabeo con varie lingue, temi e opzioni di gioco.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogImage },
        { property: "og:locale", content: "it_IT" },
        { property: "og:site_name", content: "xScrabbler" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Impostazioni - xScrabbler" },
        {
          name: "twitter:description",
          content:
            "Personalizza il tuo calcolatore di punteggi per Scrabble e Scarabeo con varie lingue, temi e opzioni di gioco.",
        },
        { name: "twitter:image", content: ogImage },
      ],
      fr: [
        {
          name: "description",
          content:
            "Personnalisez votre calculateur de score Scrabble avec différentes langues, thèmes et options de jeu.",
        },
        { property: "og:title", content: "Paramètres - xScrabbler" },
        {
          property: "og:description",
          content:
            "Personnalisez votre calculateur de score Scrabble avec différentes langues, thèmes et options de jeu.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogImage },
        { property: "og:locale", content: "fr_FR" },
        { property: "og:site_name", content: "xScrabbler" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Paramètres - xScrabbler" },
        {
          name: "twitter:description",
          content:
            "Personnalisez votre calculateur de score Scrabble avec différentes langues, thèmes et options de jeu.",
        },
        { name: "twitter:image", content: ogImage },
      ],
      es: [
        {
          name: "description",
          content:
            "Personaliza tu calculadora de puntuación Scrabble con varios idiomas, temas y opciones de juego.",
        },
        { property: "og:title", content: "Configuración - xScrabbler" },
        {
          property: "og:description",
          content:
            "Personaliza tu calculadora de puntuación Scrabble con varios idiomas, temas y opciones de juego.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogImage },
        { property: "og:locale", content: "es_ES" },
        { property: "og:site_name", content: "xScrabbler" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Configuración - xScrabbler" },
        {
          name: "twitter:description",
          content:
            "Personaliza tu calculadora de puntuación Scrabble con varios idiomas, temas y opciones de juego.",
        },
        { name: "twitter:image", content: ogImage },
      ],
      de: [
        {
          name: "description",
          content:
            "Passen Sie Ihren Scrabble-Punkterechner mit verschiedenen Sprachen, Themen und Spieloptionen an.",
        },
        { property: "og:title", content: "Einstellungen - xScrabbler" },
        {
          property: "og:description",
          content:
            "Passen Sie Ihren Scrabble-Punkterechner mit verschiedenen Sprachen, Themen und Spieloptionen an.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogImage },
        { property: "og:locale", content: "de_DE" },
        { property: "og:site_name", content: "xScrabbler" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Einstellungen - xScrabbler" },
        {
          name: "twitter:description",
          content:
            "Passen Sie Ihren Scrabble-Punkterechner mit verschiedenen Sprachen, Themen und Spieloptionen an.",
        },
        { name: "twitter:image", content: ogImage },
      ],
      nl: [
        {
          name: "description",
          content:
            "Pas uw Scrabble-scorecalculator aan met verschillende talen, thema's en spelopties.",
        },
        { property: "og:title", content: "Instellingen - xScrabbler" },
        {
          property: "og:description",
          content:
            "Pas uw Scrabble-scorecalculator aan met verschillende talen, thema's en spelopties.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogImage },
        { property: "og:locale", content: "nl_NL" },
        { property: "og:site_name", content: "xScrabbler" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Instellingen - xScrabbler" },
        {
          name: "twitter:description",
          content:
            "Pas uw Scrabble-scorecalculator aan met verschillende talen, thema's en spelopties.",
        },
        { name: "twitter:image", content: ogImage },
      ],
      pt: [
        {
          name: "description",
          content:
            "Personalize sua calculadora de pontuação Scrabble com vários idiomas, temas e opções de jogo.",
        },
        { property: "og:title", content: "Configurações - xScrabbler" },
        {
          property: "og:description",
          content:
            "Personalize sua calculadora de pontuação Scrabble com vários idiomas, temas e opções de jogo.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogImage },
        { property: "og:locale", content: "pt_PT" },
        { property: "og:site_name", content: "xScrabbler" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Configurações - xScrabbler" },
        {
          name: "twitter:description",
          content:
            "Personalize sua calculadora de pontuação Scrabble com vários idiomas, temas e opções de jogo.",
        },
        { name: "twitter:image", content: ogImage },
      ],
      et: [
        {
          name: "description",
          content:
            "Kohandage oma Scrabble skoori arvutit erinevate keelte, teemade ja mänguvalikutega.",
        },
        { property: "og:title", content: "Seaded - xScrabbler" },
        {
          property: "og:description",
          content:
            "Kohandage oma Scrabble skoori arvutit erinevate keelte, teemade ja mänguvalikutega.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogImage },
        { property: "og:locale", content: "et_EE" },
        { property: "og:site_name", content: "xScrabbler" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Seaded - xScrabbler" },
        {
          name: "twitter:description",
          content:
            "Kohandage oma Scrabble skoori arvutit erinevate keelte, teemade ja mänguvalikutega.",
        },
        { name: "twitter:image", content: ogImage },
      ],
    },
  },
  board: {
    title: {
      en: "Board Game - xScrabbler",
      it: "Tavolo di Gioco - xScrabbler",
      fr: "Jeu de Plateau - xScrabbler",
      es: "Juego de Mesa - xScrabbler",
      de: "Brettspiel - xScrabbler",
      nl: "Bordspel - xScrabbler",
      pt: "Jogo de Tabuleiro - xScrabbler",
      et: "Lauamäng - xScrabbler",
    },
    metaTags: {
      en: [
        {
          name: "description",
          content:
            "Play Scrabble on an interactive board with multiplayer support, timer and automatic scoring.",
        },
        { property: "og:title", content: "Board Game - xScrabbler" },
        {
          property: "og:description",
          content:
            "Play Scrabble on an interactive board with multiplayer support, timer and automatic scoring.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogImage },
        { property: "og:locale", content: "en_US" },
        { property: "og:site_name", content: "xScrabbler" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Board Game - xScrabbler" },
        {
          name: "twitter:description",
          content:
            "Play Scrabble on an interactive board with multiplayer support, timer and automatic scoring.",
        },
        { name: "twitter:image", content: ogImage },
      ],
      it: [
        {
          name: "description",
          content:
            "Gioca a Scrabble su una tavola interattiva con supporto multigiocatore, timer e punteggio automatico.",
        },
        { property: "og:title", content: "Tavolo di Gioco - xScrabbler" },
        {
          property: "og:description",
          content:
            "Gioca a Scrabble su una tavola interattiva con supporto multigiocatore, timer e punteggio automatico.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogImage },
        { property: "og:locale", content: "it_IT" },
        { property: "og:site_name", content: "xScrabbler" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Tavolo di Gioco - xScrabbler" },
        {
          name: "twitter:description",
          content:
            "Gioca a Scrabble su una tavola interattiva con supporto multigiocatore, timer e punteggio automatico.",
        },
        { name: "twitter:image", content: ogImage },
      ],
      fr: [
        {
          name: "description",
          content:
            "Jouez au Scrabble sur un plateau interactif avec support multijoueur, minuteur et score automatique.",
        },
        { property: "og:title", content: "Jeu de Plateau - xScrabbler" },
        {
          property: "og:description",
          content:
            "Jouez au Scrabble sur un plateau interactif avec support multijoueur, minuteur et score automatique.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogImage },
        { property: "og:locale", content: "fr_FR" },
        { property: "og:site_name", content: "xScrabbler" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Jeu de Plateau - xScrabbler" },
        {
          name: "twitter:description",
          content:
            "Jouez au Scrabble sur un plateau interactif avec support multijoueur, minuteur et score automatique.",
        },
        { name: "twitter:image", content: ogImage },
      ],
      es: [
        {
          name: "description",
          content:
            "Juega Scrabble en un tablero interactivo con soporte multijugador, temporizador y puntuación automática.",
        },
        { property: "og:title", content: "Juego de Mesa - xScrabbler" },
        {
          property: "og:description",
          content:
            "Juega Scrabble en un tablero interactivo con soporte multijugador, temporizador y puntuación automática.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogImage },
        { property: "og:locale", content: "es_ES" },
        { property: "og:site_name", content: "xScrabbler" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Juego de Mesa - xScrabbler" },
        {
          name: "twitter:description",
          content:
            "Juega Scrabble en un tablero interactivo con soporte multijugador, temporizador y puntuación automática.",
        },
        { name: "twitter:image", content: ogImage },
      ],
      de: [
        {
          name: "description",
          content:
            "Spielen Sie Scrabble auf einem interaktiven Brett mit Multiplayer-Unterstützung, Timer und automatischer Punktevergabe.",
        },
        { property: "og:title", content: "Brettspiel - xScrabbler" },
        {
          property: "og:description",
          content:
            "Spielen Sie Scrabble auf einem interaktiven Brett mit Multiplayer-Unterstützung, Timer und automatischer Punktevergabe.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogImage },
        { property: "og:locale", content: "de_DE" },
        { property: "og:site_name", content: "xScrabbler" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Brettspiel - xScrabbler" },
        {
          name: "twitter:description",
          content:
            "Spielen Sie Scrabble auf einem interaktiven Brett mit Multiplayer-Unterstützung, Timer und automatischer Punktevergabe.",
        },
        { name: "twitter:image", content: ogImage },
      ],
      nl: [
        {
          name: "description",
          content:
            "Speel Scrabble op een interactief bord met multiplayer-ondersteuning, timer en automatische scoring.",
        },
        { property: "og:title", content: "Bordspel - xScrabbler" },
        {
          property: "og:description",
          content:
            "Speel Scrabble op een interactief bord met multiplayer-ondersteuning, timer en automatische scoring.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogImage },
        { property: "og:locale", content: "nl_NL" },
        { property: "og:site_name", content: "xScrabbler" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Bordspel - xScrabbler" },
        {
          name: "twitter:description",
          content:
            "Speel Scrabble op een interactief bord met multiplayer-ondersteuning, timer en automatische scoring.",
        },
        { name: "twitter:image", content: ogImage },
      ],
      pt: [
        {
          name: "description",
          content:
            "Jogue Scrabble em um tabuleiro interativo com suporte multijogador, temporizador e pontuação automática.",
        },
        { property: "og:title", content: "Jogo de Tabuleiro - xScrabbler" },
        {
          property: "og:description",
          content:
            "Jogue Scrabble em um tabuleiro interativo com suporte multijogador, temporizador e pontuação automática.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogImage },
        { property: "og:locale", content: "pt_PT" },
        { property: "og:site_name", content: "xScrabbler" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Jogo de Tabuleiro - xScrabbler" },
        {
          name: "twitter:description",
          content:
            "Jogue Scrabble em um tabuleiro interativo com suporte multijogador, temporizador e pontuação automática.",
        },
        { name: "twitter:image", content: ogImage },
      ],
      et: [
        {
          name: "description",
          content:
            "Mängige Scrabble interaktiivsel laual mitme mängija toega, taimeriga ja automaatse punktiarvestusega.",
        },
        { property: "og:title", content: "Lauamäng - xScrabbler" },
        {
          property: "og:description",
          content:
            "Mängige Scrabble interaktiivsel laual mitme mängija toega, taimeriga ja automaatse punktiarvestusega.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogImage },
        { property: "og:locale", content: "et_EE" },
        { property: "og:site_name", content: "xScrabbler" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Lauamäng - xScrabbler" },
        {
          name: "twitter:description",
          content:
            "Mängige Scrabble interaktiivsel laual mitme mängija toega, taimeriga ja automaatse punktiarvestusega.",
        },
        { name: "twitter:image", content: ogImage },
      ],
    },
  },
};

let routes = [];

routes.push({
  path: "/",
  redirect: () => {
    const browserLang = navigator.language.split("-")[0];
    const targetLang = supportedLanguages.includes(browserLang)
      ? browserLang
      : "en";
    return `/${targetLang}`;
  },
});

supportedLanguages.forEach((lang) => {
  routes.push({
    path: `/${lang}`,
    name: lang,
    component: HomeView,
    meta: {
      ...metaData.home,
      lang,
    },
  });

  routes.push({
    path: `/${lang}/scorer`,
    name: `scorer-${lang}`,
    component: ScorerView,
    meta: {
      ...metaData.scorer,
      lang,
    },
  });

  routes.push({
    path: `/${lang}/settings`,
    name: `settings-${lang}`,
    component: SettingsView,
    meta: {
      ...metaData.settings,
      lang,
    },
  });

  routes.push({
    path: `/${lang}/board`,
    name: `board-${lang}`,
    component: () => import("../views/BoardView.vue"),
    meta: {
      ...metaData.board,
      lang,
    },
  });
});

routes.push({
  path: "/:pathMatch(.*)*",
  redirect: "/en",
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: "active",
  routes,
});

router.beforeEach((to, from, next) => {
  // Get current language from route meta or fallback
  const currentLang = to.meta.lang || "en";

  let title = "xScrabbler";
  if (to.meta.title) {
    if (typeof to.meta.title === "object") {
      title = to.meta.title[currentLang] || to.meta.title.en || title;
    } else {
      title = to.meta.title;
    }
  }
  document.title = title;

  // Update HTML lang attribute
  document.documentElement.lang = currentLang;

  // Remove old meta tags
  Array.from(
    document.querySelectorAll("meta[data-vue-router-controlled]"),
  ).forEach((el) => el.remove());

  // Remove old canonical link
  const oldCanonical = document.querySelector(
    'link[rel="canonical"][data-vue-router-controlled]',
  );
  if (oldCanonical) {
    oldCanonical.remove();
  }

  // Add canonical URL
  const canonicalUrl = `${baseUrl}${to.fullPath}`;
  const canonicalLink = document.createElement("link");
  canonicalLink.rel = "canonical";
  canonicalLink.href = canonicalUrl;
  canonicalLink.setAttribute("data-vue-router-controlled", "");
  document.head.appendChild(canonicalLink);

  // Add og:url
  const ogUrlTag = document.createElement("meta");
  ogUrlTag.setAttribute("property", "og:url");
  ogUrlTag.setAttribute("content", canonicalUrl);
  ogUrlTag.setAttribute("data-vue-router-controlled", "");
  document.head.appendChild(ogUrlTag);

  // Add twitter:url
  const twitterUrlTag = document.createElement("meta");
  twitterUrlTag.setAttribute("name", "twitter:url");
  twitterUrlTag.setAttribute("content", canonicalUrl);
  twitterUrlTag.setAttribute("data-vue-router-controlled", "");
  document.head.appendChild(twitterUrlTag);

  if (to.meta.metaTags) {
    let metaTags;

    if (
      typeof to.meta.metaTags === "object" &&
      !Array.isArray(to.meta.metaTags)
    ) {
      metaTags = to.meta.metaTags[currentLang] || to.meta.metaTags.en || [];
    } else {
      metaTags = to.meta.metaTags;
    }

    metaTags.forEach((metaTag) => {
      const tag = document.createElement("meta");

      Object.keys(metaTag).forEach((key) => {
        tag.setAttribute(key, metaTag[key]);
      });

      tag.setAttribute("data-vue-router-controlled", "");

      document.head.appendChild(tag);
    });
  }

  next();
});

// Log quando cambia la route
router.afterEach((to, from) => {
  console.log(
    `[Router] Navigazione da "${from.name || from.path}" a "${
      to.name || to.path
    }"`,
  );
});

export default router;
