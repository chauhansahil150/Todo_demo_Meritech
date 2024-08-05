import { createIntl, RawIntlProvider, createIntlCache } from "react-intl";
import languageMessage from "../languages/language.json";
import { ReactNode, createContext, useContext, useState } from "react";
const cache = createIntlCache();

export const LangContext = createContext(null);

export const IntlProvider = ({
  children,
  locale,
}: {
  children: ReactNode;
  locale: string;
}) => {
  const [local, setLocale] = useState(locale);
  let messages;

  switch (local) {
    case "en":
      messages = languageMessage["en"];
      break;
    case "ja":
      messages = languageMessage["ja"];
      break;
    case "fr":
      messages = languageMessage["fr"];
      break;
    case "es":
      messages = languageMessage["es"];
      break;
    case "zh":
      messages = languageMessage["zh"];
      break;
    case "de":
      messages = languageMessage["de"];
      break;
    default:
      messages = languageMessage["en"];
      break;
  }
  const intl = createIntl({ locale: local, messages }, cache);

  return (
    <LangContext.Provider value={{ setLocale }}>
      <RawIntlProvider value={intl}>{children}</RawIntlProvider>
    </LangContext.Provider>
  );
};
