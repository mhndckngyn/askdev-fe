import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import vi from './locales/vi.json';

i18n
  .use(LanguageDetector) // Detects user's preferred language
  .use(initReactI18next) // Initializes i18next with React
  .init({
    resources: {
      en: { translation: en },
      vi: { translation: vi },
    },
    fallbackLng: 'vi', // Default language
    interpolation: { escapeValue: false }, // React already protects from XSS
  });

export const languages = {
  en: 'language-english',
  vi: 'language-vietnamese',
};

export default i18n;
