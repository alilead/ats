import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import atsLogo from "@/assets/ats-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Accueil", href: "#accueil" },
    { label: "À Propos", href: "#apropos" },
    { label: "Services", href: "#services" },
    { label: "Réalisations", href: "#realisations" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
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
              <a
                key={item.label}
                href={item.href}
                className="text-foreground hover:text-accent transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <a href="tel:+41223456789" className="flex items-center text-primary hover:text-accent transition-colors">
              <Phone className="w-4 h-4 mr-2" />
              +41 22 345 67 89
            </a>
            <Button variant="default" className="bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent text-accent-foreground">
              Devis Gratuit
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-accent transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-foreground hover:text-accent transition-colors py-2"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-border mt-4">
                <a href="tel:+41223456789" className="flex items-center text-primary hover:text-accent transition-colors mb-4">
                  <Phone className="w-4 h-4 mr-2" />
                  +41 22 345 67 89
                </a>
                <Button variant="default" className="w-full bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent text-accent-foreground">
                  Devis Gratuit
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;