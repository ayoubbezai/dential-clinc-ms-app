// i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { I18nManager, Platform, Alert } from "react-native";
import * as Updates from "expo-updates";

import en from "./locales/en/translation.json";
import fr from "./locales/fr/translation.json";
import ar from "./locales/ar/translation.json";

export const resources = {
  en: { translation: en },
  fr: { translation: fr },
  ar: { translation: ar },
} as const;

const RTL_LANGUAGES = ["ar", "he", "fa", "ur"];

const getDeviceLanguage = (): string => {
  try {
    const localization = require("expo-localization");
    const locales = localization.getLocales?.() || [localization.locale];
    const deviceLang = locales[0]?.languageCode?.toLowerCase();
    return Object.keys(resources).includes(deviceLang) ? deviceLang : "en";
  } catch {
    return "en";
  }
};

const language = getDeviceLanguage();
console.log("Device language:", language);
const isRTL = RTL_LANGUAGES.includes(language);

if (I18nManager.isRTL !== isRTL) {
  console.warn(`Switching direction to ${isRTL ? "RTL" : "LTR"}`);
  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);

  setTimeout(() => {
    Updates.reloadAsync(); // Wait so logs show first
  }, 1000);
}

i18n.use(initReactI18next).init({
  lng: language,
  compatibilityJSON: "v4",
  fallbackLng: "en",
  resources,
  interpolation: { escapeValue: false },
  react: { useSuspense: Platform.OS === "web" },
});

export default i18n;
