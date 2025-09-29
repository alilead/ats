import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import atsLogoNew from "@/assets/ats-logo-new.png";
import { useLocale } from "@/lib/locale-context";
import LanguageSelector from "./LanguageSelector";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setLocale, ...t } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: t.navigation.home, href: "#accueil", id: "accueil" },
    { label: t.navigation.about, href: "#apropos", id: "apropos" },
    { label: t.navigation.services, href: "#services", id: "services" },
    { label: t.navigation.portfolio, href: "#realisations", id: "realisations" },
    { label: t.navigation.contact, href: "#contact", id: "contact" },
  ];

  const handleNavigation = (id: string) => {
    // If we're not on the home page, navigate to home first, then scroll
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      // Small delay to ensure the page loads before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If we're on home page, just scroll to section
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => {
                if (location.pathname !== '/') {
                  navigate('/');
                }
              }}
              className="cursor-pointer"
            >
              <img 
                src={atsLogoNew} 
                alt="ATS Générale Logo"
                className="h-8 md:h-12 w-auto"
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className="text-black hover:text-accent transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <a href="tel:+41772883838" className="flex items-center text-black/90 hover:text-accent transition-colors">
              <Phone className="w-4 h-4 mr-2" />
              +41 77 288 38 38
            </a>
            <Button variant="accent" className="mx-2" onClick={() => handleNavigation('contact')}>{t.navigation.freeQuote}</Button>
            <LanguageSelector />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-black hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            data-testid="mobile-menu-toggle"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-6 border-t border-border">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className="text-black hover:text-accent transition-colors py-2 text-left text-base w-full"
                  data-testid={`mobile-nav-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-border mt-4">
                <a 
                  href="tel:+41772883838" 
                  className="flex items-center text-black/90 hover:text-accent transition-colors mb-4 text-base"
                  data-testid="mobile-phone-link"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  +41 77 288 38 38
                </a>
                <Button 
                  variant="accent" 
                  className="w-full mb-4" 
                  onClick={() => handleNavigation('contact')}
                  data-testid="mobile-cta-button"
                >
                  {t.navigation.freeQuote}
                </Button>
                <div className="flex gap-2 mt-3">
                  <button 
                    aria-label="Français" 
                    onClick={() => {
                      setLocale('fr');
                      setIsMenuOpen(false);
                    }} 
                    className={`px-3 py-2 rounded transition-colors ${t.lang === 'fr' ? 'bg-accent text-white' : 'text-black/80 hover:text-black'}`}
                    data-testid="mobile-lang-fr"
                  >
                    🇫🇷
                  </button>
                  <button 
                    aria-label="English" 
                    onClick={() => {
                      setLocale('en');
                      setIsMenuOpen(false);
                    }} 
                    className={`px-3 py-2 rounded transition-colors ${t.lang === 'en' ? 'bg-accent text-white' : 'text-black/80 hover:text-black'}`}
                    data-testid="mobile-lang-en"
                  >
                    🇬🇧
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;