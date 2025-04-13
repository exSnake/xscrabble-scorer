import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { useStorage } from "@vueuse/core";
import { useRouter, useRoute } from "vue-router";
import locales from "@/locales";

export const useLocaleStore = defineStore("locale", () => {
  // State
  const language = ref(useStorage("uiLanguage", "it"));
  const router = useRouter();
  const route = useRoute();

  // Osserva i cambiamenti alla lingua e aggiorna l'URL
  watch(language, (newLang) => {
    // Evita cicli infiniti e cambiamenti di rotta non necessari
    const currentLangInPath = route.path.split("/")[1];
    if (currentLangInPath !== newLang) {
      // Ottiene il percorso attuale e lo sostituisce con la nuova lingua
      const pathParts = route.path.split("/");
      if (pathParts.length > 1) {
        pathParts[1] = newLang;
        const newPath = pathParts.join("/");
        router.push(newPath);
      }
    }
  });

  // Getters
  const locale = computed(() => locales[language.value] || locales.it);

  // Funzione di traduzione
  function t(key) {
    const keys = key.split(".");
    let text = locale.value;

    for (const k of keys) {
      if (text && text[k]) {
        text = text[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    return text;
  }

  // Actions
  function setLanguage(lang) {
    if (locales[lang]) {
      language.value = lang;
    } else {
      console.warn(`Language ${lang} not supported. Falling back to Italian.`);
      language.value = "it";
    }
  }

  function getSupportedLanguages() {
    const languageNames = {
      it: "Italiano",
      en: "English",
      nl: "Nederlands",
      fr: "Français",
      es: "Español",
      de: "Deutsch",
      et: "Eesti",
      pt: "Português",
      sahibba: "Sahibba",
    };

    return Object.keys(locales).map((code) => ({
      code,
      name: languageNames[code] || code,
    }));
  }

  // Aggiungiamo una funzione per ottenere i nomi delle lingue in lingua corrente
  function getLocalizedLanguageNames() {
    try {
      // Verifichiamo prima che tutte le lingue abbiano le traduzioni necessarie
      const allLanguagesHaveTranslations = Object.keys(locales).every(
        (code) =>
          locale.value &&
          locale.value.languages &&
          locale.value.languages[code],
      );

      if (allLanguagesHaveTranslations) {
        return Object.keys(locales).map((code) => ({
          code,
          name: locale.value.languages[code],
        }));
      } else {
        // Fallback ai nomi predefiniti se mancano traduzioni
        return getSupportedLanguages();
      }
    } catch (error) {
      console.error("Error getting localized language names:", error);
      return getSupportedLanguages();
    }
  }

  return {
    // State
    language,

    // Getters
    locale,

    // Functions
    t,

    // Actions
    setLanguage,
    getSupportedLanguages,
    getLocalizedLanguageNames,
  };
});
