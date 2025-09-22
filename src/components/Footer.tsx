import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import atsLogo from "@/assets/ats-logo.png";

const Footer = () => {
  const services = [
    "Construction & Rénovation",
    "Maçonnerie & Pierre",
    "Peinture & Revêtements",
    "Carrelage & Sols",
    "Toiture & Isolation",
    "Plomberie & Électricité"
  ];

  const jardin = [
    "Aménagement Paysager",
    "Entretien de Jardins",
    "Plantation & Semis",
    "Arrosage Automatique",
    "Éclairage Extérieur",
    "Maintenance Saisonnière"
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <img 
                src={atsLogo} 
                alt="ATS Générale Logo"
                className="h-16 w-auto filter brightness-0 invert"
              />
            </div>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Votre partenaire de confiance depuis plus de 25 ans pour tous vos 
              projets de second œuvre en Suisse romande.
            </p>
            
            {/* Contact Quick */}
            <div className="space-y-3">
              <a href="tel:+41223456789" className="flex items-center hover:text-accent transition-colors">
                <Phone className="w-4 h-4 mr-3" />
                +41 22 345 67 89
              </a>
              <a href="mailto:contact@atsgenerale.ch" className="flex items-center hover:text-accent transition-colors">
                <Mail className="w-4 h-4 mr-3" />
                contact@atsgenerale.ch
              </a>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-3 mt-1" />
                <span>Avenue de la Paix 15<br />1202 Genève, Suisse</span>
              </div>
            </div>
          </div>

          {/* Services Construction */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Construction & Rénovation</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <a href="#services" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Jardin */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Jardin & Paysage</h4>
            <ul className="space-y-2">
              {jardin.map((service, index) => (
                <li key={index}>
                  <a href="#services" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Navigation</h4>
            <ul className="space-y-2 mb-8">
              <li><a href="#accueil" className="text-primary-foreground/80 hover:text-accent transition-colors">Accueil</a></li>
              <li><a href="#apropos" className="text-primary-foreground/80 hover:text-accent transition-colors">À Propos</a></li>
              <li><a href="#services" className="text-primary-foreground/80 hover:text-accent transition-colors">Services</a></li>
              <li><a href="#realisations" className="text-primary-foreground/80 hover:text-accent transition-colors">Réalisations</a></li>
              <li><a href="#contact" className="text-primary-foreground/80 hover:text-accent transition-colors">Contact</a></li>
            </ul>

            {/* Social Links */}
            <div>
              <h5 className="font-medium mb-4">Suivez-nous</h5>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/60">
            <div className="mb-4 md:mb-0">
              © 2024 ATS Générale. Tous droits réservés.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-accent transition-colors">Mentions légales</a>
              <a href="#" className="hover:text-accent transition-colors">Politique de confidentialité</a>
              <a href="#" className="hover:text-accent transition-colors">CGV</a>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact Sticky */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="flex flex-col space-y-2">
          <a 
            href="https://wa.me/41789012345"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group"
            title="WhatsApp - Contact rapide"
          >
            <svg className="w-7 h-7 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516z"/>
            </svg>
          </a>
          
          <a 
            href="tel:+41223456789"
            className="w-14 h-14 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group"
            title="Appel urgent"
          >
            <Phone className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;