import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-home.jpg";
import { useLocale } from "@/lib/locale-context";

const Hero = () => {
  const { hero } = useLocale();

  return (
    <section id="accueil" className="relative min-h-[60vh] md:min-h-screen flex items-center pt-16 md:pt-20">
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
              {hero.partner}
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
              {hero.titleLine1} <span className="block text-accent">{hero.titleLine2}</span>
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-white/90 mb-8 leading-relaxed">
              {hero.description}
            </p>
            {/* Highlights */}
            <div className="flex flex-wrap gap-4 mb-10">
              {hero.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center text-white/90">
                  <CheckCircle className="w-5 h-5 text-accent mr-2" />
                  <span className="font-medium">{highlight}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" variant="premium" className="font-semibold px-6 md:px-8" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                {hero.ctaPrimary}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="hero" className="px-6 md:px-8" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
                {hero.ctaSecondary}
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