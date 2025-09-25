import React from "react";
import { useLocale } from "@/lib/locale-context";

export default function LanguageSelector({ className }: { className?: string }) {
  const { lang, setLocale } = useLocale();

  return (
    <div className={className}>
      <button 
        aria-label="Français" 
        onClick={() => setLocale('fr')} 
        className={`px-2 py-1 rounded transition-colors ${lang === 'fr' ? 'bg-accent text-white' : 'text-black/80 hover:text-black'}`}
      >
        🇫🇷
      </button>
      <button 
        aria-label="English" 
        onClick={() => setLocale('en')} 
        className={`ml-2 px-2 py-1 rounded transition-colors ${lang === 'en' ? 'bg-accent text-white' : 'text-black/80 hover:text-black'}`}
      >
        🇬🇧
      </button>
    </div>
  );
}
