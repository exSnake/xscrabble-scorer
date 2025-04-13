import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ScorerView from "../views/ScorerView.vue";
import SettingsView from "../views/SettingsView.vue";
import { useLocaleStore } from "@/stores/LocaleStore";

// Supporto per le lingue
const supportedLanguages = ["en", "it", "fr", "es", "de", "nl", "et", "pt"];

// Metadati comuni con traduzioni
const metaData = {
  home: {
    title: {
      en: "xScrabbler - Score calculator for Scrabble and word games",
      it: "xScrabbler - Calcolatore di punteggi per Scrabble e Scarabeo",
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
      ],
    },
  },
  scorer: {
    title: {
      en: "Scorer - xScrabbler",
      it: "Calcolatore - xScrabbler",
    },
    metaTags: {
      en: [
        {
          name: "description",
          content:
            "Easily calculate scores for your Scrabble and word games with integrated timer and support for multiple players.",
        },
        {
          property: "og:title",
          content: "Scorer - xScrabbler",
        },
      ],
      it: [
        {
          name: "description",
          content:
            "Calcola facilmente i punteggi delle tue partite di Scrabble e Scarabeo con timer integrato e supporto per più giocatori.",
        },
        {
          property: "og:title",
          content: "Calcolatore - xScrabbler",
        },
      ],
    },
  },
  settings: {
    title: {
      en: "Settings - xScrabbler",
      it: "Impostazioni - xScrabbler",
    },
    metaTags: {
      en: [
        {
          name: "description",
          content:
            "Customize your Scrabble score calculator with various languages, themes and game options.",
        },
        {
          property: "og:title",
          content: "Settings - xScrabbler",
        },
      ],
      it: [
        {
          name: "description",
          content:
            "Personalizza il tuo calcolatore di punteggi per Scrabble e Scarabeo con varie lingue, temi e opzioni di gioco.",
        },
        {
          property: "og:title",
          content: "Impostazioni - xScrabbler",
        },
      ],
    },
  },
};

// Costruzione delle rotte
let routes = [];

// Aggiungi la rotta predefinita (reindirizza alla lingua del browser o all'inglese)
routes.push({
  path: "/",
  redirect: () => {
    // Ottieni la lingua del browser o usa l'inglese come fallback
    const browserLang = navigator.language.split("-")[0];
    const targetLang = supportedLanguages.includes(browserLang)
      ? browserLang
      : "en";
    return `/${targetLang}`;
  },
});

// Crea rotte dirette per ogni lingua e pagina
supportedLanguages.forEach((lang) => {
  // Pagina Home per questa lingua
  routes.push({
    path: `/${lang}`,
    name: lang,
    component: HomeView,
    meta: {
      ...metaData.home,
      lang,
    },
  });

  // Pagina Scorer per questa lingua
  routes.push({
    path: `/${lang}/scorer`,
    name: `scorer-${lang}`,
    component: ScorerView,
    meta: {
      ...metaData.scorer,
      lang,
    },
  });

  // Pagina Settings per questa lingua
  routes.push({
    path: `/${lang}/settings`,
    name: `settings-${lang}`,
    component: SettingsView,
    meta: {
      ...metaData.settings,
      lang,
    },
  });
});

// Aggiungi una rotta catch-all che reindirizza alla pagina home in inglese
routes.push({
  path: "/:pathMatch(.*)*",
  redirect: "/en",
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: "active",
  routes,
});

// Questa callback viene eseguita prima di ogni cambio di rotta, incluso il caricamento iniziale
router.beforeEach((to, from, next) => {
  // Ottieni lo store della localizzazione
  const localeStore = useLocaleStore();

  // Imposta la lingua in base alla rotta se presente
  if (to.meta.lang) {
    localeStore.language = to.meta.lang;
  }

  // Lingua corrente
  const currentLang = localeStore.language || "en";

  // Titolo della pagina
  let title = "xScrabbler";
  if (to.meta.title) {
    // Se il titolo è un oggetto con traduzioni
    if (typeof to.meta.title === "object") {
      title = to.meta.title[currentLang] || to.meta.title.en || title;
    } else {
      title = to.meta.title;
    }
  }
  document.title = title;

  // Rimuovi i meta tag esistenti
  Array.from(
    document.querySelectorAll("meta[data-vue-router-controlled]")
  ).forEach((el) => el.remove());

  // Aggiungi nuovi meta tag
  if (to.meta.metaTags) {
    let metaTags;

    // Se i metaTags sono un oggetto con traduzioni
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

      // Marca come controllato da vue-router
      tag.setAttribute("data-vue-router-controlled", "");

      // Aggiungi all'head
      document.head.appendChild(tag);
    });
  }

  next();
});

export default router;
