import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-home.jpg";

const Hero = () => {
  const highlights = [
    "25+ années d'expérience",
    "500+ projets réalisés",
    "Garantie de qualité"
  ];

  return (
    <section id="accueil" className="relative min-h-screen flex items-center pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="ATS Générale - Services premium de second œuvre"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/20 text-accent font-medium mb-6">
              Votre partenaire de confiance depuis 25 ans
            </div>
            
            <h1 className="text-white mb-6 font-bold">
              Experts en 
              <span className="block text-accent">Second œuvre</span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
              Votre partenaire de confiance pour tous vos projets de second œuvre 
              à Genève et ses alentours. Une équipe, tous les services, 
              un résultat exceptionnel.
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap gap-4 mb-10">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-center text-white/90">
                  <CheckCircle className="w-5 h-5 text-accent mr-2" />
                  <span className="font-medium">{highlight}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8"
              >
                Demandez votre devis gratuit
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                Découvrir nos services
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;