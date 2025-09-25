import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { dictionaries } from "./translations";

type Locale = 'en' | 'fr';

interface LocaleContextType {
  lang: Locale;
  setLocale: (lang: Locale) => void;
  translations: any;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Locale>(() => {
    try {
      const saved = typeof window !== 'undefined' ? window.localStorage.getItem('locale') : null;
      if (saved === 'en' || saved === 'fr') return saved;
    } catch (e) {}
    return 'fr'; // Default to French
  });

  useEffect(() => {
    try { 
      window.localStorage.setItem('locale', lang);
      // Update HTML lang attribute
      document.documentElement.lang = lang;
    } catch (e) {}
  }, [lang]);

  const setLocale = (newLang: Locale) => {
    setLang(newLang);
  };

  const value = {
    lang,
    setLocale,
    translations: dictionaries[lang]
  };

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  
  return {
    ...context.translations,
    lang: context.lang,
    setLocale: context.setLocale
  };
}