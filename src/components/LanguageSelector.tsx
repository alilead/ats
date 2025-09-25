import React from "react";
import useLocale from "@/lib/useLocale";

export default function LanguageSelector({ className }: { className?: string }) {
  const { lang, setLocale } = useLocale();

  const handleLanguageChange = (newLang: 'en' | 'fr') => {
    setLocale(newLang);
    // Force a page refresh to ensure all components re-render with new language
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <div className={className}>
      <button 
        aria-label="Français" 
        onClick={() => handleLanguageChange('fr')} 
        className={`px-2 py-1 rounded transition-colors ${lang === 'fr' ? 'bg-accent text-white' : 'text-white/80 hover:text-white'}`}
      >
        🇫🇷
      </button>
      <button 
        aria-label="English" 
        onClick={() => handleLanguageChange('en')} 
        className={`ml-2 px-2 py-1 rounded transition-colors ${lang === 'en' ? 'bg-accent text-white' : 'text-white/80 hover:text-white'}`}
      >
        🇬🇧
      </button>
    </div>
  );
}
