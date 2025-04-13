import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ScorerView from "../views/ScorerView.vue";
import SettingsView from "../views/SettingsView.vue";
import { useLocaleStore } from "@/stores/LocaleStore";

const supportedLanguages = ["en", "it", "fr", "es", "de", "nl", "et", "pt"];

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
  const localeStore = useLocaleStore();

  if (to.meta.lang) {
    localeStore.language = to.meta.lang;
  }

  const currentLang = localeStore.language || "en";

  let title = "xScrabbler";
  if (to.meta.title) {
    if (typeof to.meta.title === "object") {
      title = to.meta.title[currentLang] || to.meta.title.en || title;
    } else {
      title = to.meta.title;
    }
  }
  document.title = title;

  Array.from(
    document.querySelectorAll("meta[data-vue-router-controlled]"),
  ).forEach((el) => el.remove());

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

export default router;
