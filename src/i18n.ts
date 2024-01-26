import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    lng: "en",
    resources: {
      en: {
        translation: require("./src/i18n/languages/en/general.json"),
      },
      fi: {
        translation: require("./src/i18n/languages/fi/general.json"),
      },
      ru: {
        translation: require("./src/i18n/languages/ru/general.json"),
      },
      sv: {
        translation: require("./src/i18n/languages/sv/general.json"),
      },
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
