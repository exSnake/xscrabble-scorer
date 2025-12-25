import { createI18n } from "vue-i18n";
import it from "./locales/it.js";
import en from "./locales/en.js";
import de from "./locales/de.js";
import es from "./locales/es.js";
import et from "./locales/et.js";
import fr from "./locales/fr.js";
import nl from "./locales/nl.js";
import pt from "./locales/pt.js";

// Get locale from localStorage directly
// useStorage saves as JSON, but older versions may have stored raw strings
function getStoredLocale() {
  try {
    const stored =
      localStorage.getItem("locale") || localStorage.getItem("uiLanguage");
    if (!stored) return "it";
    // Try to parse as JSON (for useStorage format like "\"it\"")
    try {
      return JSON.parse(stored);
    } catch {
      // If not valid JSON, use as-is (raw string)
      return stored;
    }
  } catch {
    return "it";
  }
}

const i18n = createI18n({
  legacy: false,
  locale: getStoredLocale(),
  fallbackLocale: "en",
  messages: {
    it,
    en,
    de,
    es,
    et,
    fr,
    nl,
    pt,
  },
});

export default i18n;
