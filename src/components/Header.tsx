import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import atsLogo from "@/assets/ats-logo.png";
import useLocale from "@/lib/useLocale";
import LanguageSelector from "./LanguageSelector";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useLocale();

  const navItems = [
    { label: t.navigation.home, href: "#accueil", id: "accueil" },
    { label: t.navigation.about, href: "#apropos", id: "apropos" },
    { label: t.navigation.services, href: "#services", id: "services" },
    { label: t.navigation.portfolio, href: "#realisations", id: "realisations" },
    { label: t.navigation.contact, href: "#contact", id: "contact" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-transparent">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={atsLogo} 
              alt="ATS Générale Logo"
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-white hover:text-accent transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <a href="tel:+41223456789" className="flex items-center text-white/90 hover:text-accent transition-colors">
              <Phone className="w-4 h-4 mr-2" />
              +41 22 345 67 89
            </a>
            <Button variant="accent" className="" onClick={() => scrollToSection('contact')}>{t.navigation.freeQuote}</Button>
              <LanguageSelector />
              <a href="/admin" className="text-white hover:text-accent transition-colors">{t.navigation.admin}</a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-accent transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-white hover:text-accent transition-colors py-2 text-left"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-border mt-4">
                <a href="tel:+41223456789" className="flex items-center text-white/90 hover:text-accent transition-colors mb-4">
                  <Phone className="w-4 h-4 mr-2" />
                  +41 22 345 67 89
                </a>
                <Button variant="accent" className="w-full" onClick={() => scrollToSection('contact')}>{t.navigation.freeQuote}</Button>
                <div className="flex gap-2 mt-3">
                  <button aria-label="Français" onClick={() => t.setLocale('fr')} className={`px-2 py-1 rounded ${t.lang === 'fr' ? 'bg-accent text-white' : 'text-white/80'}`}>🇫🇷</button>
                  <button aria-label="English" onClick={() => t.setLocale('en')} className={`px-2 py-1 rounded ${t.lang === 'en' ? 'bg-accent text-white' : 'text-white/80'}`}>🇬🇧</button>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;