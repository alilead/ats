import { useMemo, useState, useEffect } from "react";
import { dictionaries } from "./translations";

export default function useLocale(search?: string) {
  const getLangFromUrl = () => {
    if (typeof window === 'undefined') return undefined;
    const params = new URLSearchParams(window.location.search);
    return params.get('lang') as 'en' | 'fr' | null;
  };

  const [lang, setLang] = useState<'en' | 'fr'>(() => {
    try {
      const saved = typeof window !== 'undefined' ? window.localStorage.getItem('locale') : null;
      if (saved === 'en' || saved === 'fr') return saved;
    } catch (e) {}
    const urlLang = getLangFromUrl();
    return urlLang === 'en' ? 'en' : 'fr';
  });

  useEffect(() => {
    try { window.localStorage.setItem('locale', lang); } catch (e) {}
  }, [lang]);

  useEffect(() => {
    const urlLang = getLangFromUrl();
    if (urlLang && (urlLang === 'en' || urlLang === 'fr') && urlLang !== lang) {
      setLang(urlLang);
      try { window.localStorage.setItem('locale', urlLang); } catch (e) {}
    }
  }, []);

  const setLocale = (l: 'en' | 'fr') => {
    setLang(l);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', l);
      window.history.replaceState({}, '', url.toString());
      try { window.localStorage.setItem('locale', l); } catch (e) {}
    }
  };

  return useMemo(() => ({ ...dictionaries[lang as keyof typeof dictionaries], lang, setLocale }), [lang]);
}
