import React from "react";
import useLocale from "@/lib/useLocale";

export default function LanguageSelector({ className }: { className?: string }) {
  const t = useLocale();
  const current = (t as any).lang || 'fr';
  const setLocale = (t as any).setLocale as (l: 'en'|'fr') => void;

  return (
    <div className={className}>
      <button aria-label="Français" onClick={() => setLocale('fr')} className={`px-2 py-1 rounded ${current === 'fr' ? 'bg-accent text-white' : 'text-white/80'}`}>
        🇫🇷
      </button>
      <button aria-label="English" onClick={() => setLocale('en')} className={`ml-2 px-2 py-1 rounded ${current === 'en' ? 'bg-accent text-white' : 'text-white/80'}`}>
        🇬🇧
      </button>
    </div>
  );
}
