import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowRight } from "lucide-react";

const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: "Rénovation Villa Luxury - Cologny",
      category: "Rénovation Complète",
      description: "Transformation complète d'une villa de 400m² avec finitions haut de gamme, terrasse panoramique et jardin paysager.",
      beforeImage: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=300&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop",
      highlights: ["Rénovation 6 mois", "Matériaux premium", "Design sur mesure"]
    },
    {
      id: 2,
      title: "Aménagement Jardin Contemporain - Genève",
      category: "Aménagement Paysager",
      description: "Création d'un jardin contemporain avec piscine naturelle, éclairage intégré et système d'arrosage automatique.",
      beforeImage: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1544890225-2f3faec4cd60?w=400&h=300&fit=crop",
      highlights: ["Piscine écologique", "Éclairage LED", "Irrigation smart"]
    },
    {
      id: 3,
      title: "Rénovation Penthouse - Centre Genève",
      category: "Rénovation Intérieure",
      description: "Modernisation complète d'un penthouse avec cuisine ouverte, sols en marbre et système domotique intégré.",
      beforeImage: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=400&h=300&fit=crop",
      highlights: ["Domotique avancée", "Marbre italien", "Design moderne"]
    },
    {
      id: 4,
      title: "Extension Maison Familiale - Nyon",
      category: "Construction",
      description: "Extension de 80m² avec véranda bioclimatique, bureau et suite parentale avec vue sur le lac Léman.",
      beforeImage: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=300&fit=crop",
      highlights: ["Vue lac Léman", "Véranda bioclimatique", "Suite parentale"]
    }
  ];

  return (
    <section id="realisations" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent font-medium mb-4">
            🏆 Réalisations Premium
          </div>
          <h2 className="text-primary mb-6">
            Nos Projets d'Exception
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez quelques-unes de nos réalisations les plus remarquables, 
            témoins de notre expertise et de notre engagement envers l'excellence.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {projects.map((project) => (
            <Card key={project.id} className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-border/50 hover:border-accent/50">
              {/* Before/After Images */}
              <div className="relative h-80 overflow-hidden bg-muted">
                <div className="grid grid-cols-2 h-full">
                  {/* Before */}
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.beforeImage} 
                      alt="Avant transformation"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      Avant
                    </div>
                  </div>
                  {/* After */}
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.afterImage} 
                      alt="Après transformation"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-2 right-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded">
                      Après
                    </div>
                  </div>
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <Button size="sm" variant="secondary" className="w-full">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Voir le projet complet
                    </Button>
                  </div>
                </div>
              </div>

              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-primary mb-3">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.highlights.map((highlight, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <Button variant="outline" className="w-full group/btn hover:bg-accent hover:text-accent-foreground hover:border-accent">
                  Découvrir ce projet
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-primary mb-4">
              Votre projet nous intéresse
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Chaque projet est unique et mérite une attention particulière. 
              Parlons de vos ambitions et créons ensemble quelque chose d'exceptionnel.
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Discutons de votre projet
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;