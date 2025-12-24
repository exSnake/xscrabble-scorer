import { createI18n } from "vue-i18n";
import { useStorage } from "@vueuse/core";
import it from "./locales/it.js";
import en from "./locales/en.js";

const locale = useStorage("locale", "it");

const i18n = createI18n({
  legacy: false,
  locale: locale.value,
  fallbackLocale: "en",
  messages: {
    it,
    en,
  },
});

export default i18n;

