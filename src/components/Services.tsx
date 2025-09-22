import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import constructionImage from "@/assets/service-construction.jpg";
import gardenImage from "@/assets/service-garden.jpg";
import maintenanceImage from "@/assets/service-maintenance.jpg";

const Services = () => {
  const serviceCategories = [
    {
      title: "Construction & Rénovation",
      image: constructionImage,
      description: "Solutions complètes pour vos projets de construction et rénovation intérieure/extérieure.",
      services: [
        "Maçonnerie et travaux de pierre",
        "Peinture & revêtements spécialisés",
        "Plâtrerie et cloisons sèches",
        "Carrelage de précision",
        "Installation de revêtements de sol",
        "Services de toiture complets",
        "Isolation thermique et acoustique"
      ],
      color: "accent"
    },
    {
      title: "Jardin & Aménagement Paysager",
      image: gardenImage,
      description: "Création et entretien d'espaces verts exceptionnels pour sublimer votre propriété.",
      services: [
        "Conception paysagère sur mesure",
        "Plantation et aménagement",
        "Entretien de jardins premium",
        "Installation d'arrosage automatique",
        "Création de terrasses et allées",
        "Éclairage paysager",
        "Maintenance saisonnière"
      ],
      color: "green-fresh"
    },
    {
      title: "Entretien & Services Complets",
      image: maintenanceImage,
      description: "Services d'entretien professionnels pour maintenir votre propriété en parfait état.",
      services: [
        "Plomberie et électricité",
        "Nettoyage professionnel",
        "Maintenance préventive",
        "Services de déménagement",
        "Réparations d'urgence",
        "Entretien régulier",
        "Gestion complète de propriété"
      ],
      color: "navy-medium"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent font-medium mb-4">
            🔧 Services Premium
          </div>
          <h2 className="text-primary mb-6">
            Nos Services Complets
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            De la conception à la réalisation, nous couvrons tous vos besoins 
            pour la maison et le jardin avec l'expertise suisse que vous méritez.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {serviceCategories.map((category, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-border/50 hover:border-accent/50">
              {/* Image Header */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {category.title}
                  </h3>
                </div>
              </div>

              <CardHeader className="pb-4">
                <p className="text-muted-foreground">
                  {category.description}
                </p>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Services List */}
                <div className="space-y-3 mb-6">
                  {category.services.map((service, serviceIndex) => (
                    <div key={serviceIndex} className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground">{service}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Button 
                  variant="outline" 
                  className="w-full group/btn hover:bg-accent hover:text-accent-foreground hover:border-accent"
                >
                  En savoir plus
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-primary mb-4">
              Besoin d'un service personnalisé ?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Chaque projet est unique. Contactez-nous pour discuter de vos besoins 
              spécifiques et recevoir une consultation gratuite.
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Consultation Gratuite
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;