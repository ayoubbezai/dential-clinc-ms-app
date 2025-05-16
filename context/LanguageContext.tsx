import React, { createContext, useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import * as SecureStore from "expo-secure-store";

// Define allowed labels
type LanguageLabel = "English" | "Français" | "العربية";

// Languages considered RTL
const RTL_LANGUAGES = ["ar", "he", "fa", "ur"];

// Maps label to language code
const langMap: Record<LanguageLabel, string> = {
  English: "en",
  Français: "fr",
  العربية: "ar",
};

// Storage key for SecureStore
const LANGUAGE_STORAGE_KEY = "app_language_label";

// Context type
interface LanguageContextType {
  selectedLanguage: LanguageLabel;
  setSelectedLanguage: (lang: LanguageLabel) => void;
  isRTL: boolean;
}

// Context initialization
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedLanguage, setSelectedLanguageState] =
    useState<LanguageLabel>("العربية");
  const [isRTL, setIsRTL] = useState(false);
  const { i18n } = useTranslation();

  // Load language from SecureStore on mount
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const storedLang = await SecureStore.getItemAsync(LANGUAGE_STORAGE_KEY);
        if (storedLang && Object.keys(langMap).includes(storedLang)) {
          setSelectedLanguageState(storedLang as LanguageLabel);
        }
      } catch (error) {
        console.warn("Failed to load language from SecureStore:", error);
      }
    };

    loadLanguage();
  }, []);

  // Update i18n, RTL flag, and persist language when selectedLanguage changes
  useEffect(() => {
    const langCode = langMap[selectedLanguage];
    const rtl = RTL_LANGUAGES.includes(langCode);
    setIsRTL(rtl);
    i18n.changeLanguage(langCode);

    // Save language to SecureStore
    SecureStore.setItemAsync(LANGUAGE_STORAGE_KEY, selectedLanguage).catch(
      (error) => {
        console.warn("Failed to save language to SecureStore:", error);
      }
    );
  }, [selectedLanguage, i18n]);

  // Expose setter that updates state
  const setSelectedLanguage = (lang: LanguageLabel) => {
    setSelectedLanguageState(lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        selectedLanguage,
        setSelectedLanguage,
        isRTL,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// Hook to use language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
