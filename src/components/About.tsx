import { Card, CardContent } from "@/components/ui/card";
import { Shield, Zap, Award, Users, Clock, Star } from "lucide-react";

const About = () => {
  const guarantees = [
    {
      icon: Shield,
      title: "Transparence et Intégrité",
      description: "Des évaluations honnêtes et des solutions pratiques adaptées à vos besoins et votre budget."
    },
    {
      icon: Users,
      title: "Service Polyvalent et Adaptable",
      description: "Notre équipe expérimentée excelle dans la résolution de problèmes avec une approche flexible."
    },
    {
      icon: Zap,
      title: "Réponse Rapide",
      description: "Évaluations rapides et planification efficace pour les réparations urgentes et l'entretien."
    },
    {
      icon: Award,
      title: "Qualité Inébranlable",
      description: "Tous les travaux réalisés selon les normes les plus élevées avec des matériaux premium."
    },
    {
      icon: Clock,
      title: "Tarification Transparente",
      description: "Devis clairs sans surprises cachées, vous savez toujours à quoi vous attendre."
    },
    {
      icon: Star,
      title: "Excellence Suisse",
      description: "Plus de 25 ans d'expérience dans l'excellence du service à la clientèle premium."
    }
  ];

  const stats = [
    { number: "25+", label: "Années d'expérience", icon: "🏆" },
    { number: "500+", label: "Projets réalisés", icon: "🏠" },
    { number: "100%", label: "Satisfaction client", icon: "⭐" },
    { number: "24/7", label: "Service d'urgence", icon: "🚨" }
  ];

  return (
    <section id="apropos" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent font-medium mb-4">
            💎 Excellence Suisse
          </div>
          <h2 className="text-primary mb-6">
            Pourquoi choisir ATS Générale ?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Entretenir votre maison et votre jardin ne devrait pas être compliqué. 
            Chez ATS Générale, nous simplifions tout cela grâce à une équipe polyvalente 
            de professionnels qualifiés.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Guarantees Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guarantees.map((guarantee, index) => {
            const Icon = guarantee.icon;
            return (
              <Card key={index} className="border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg group">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-primary mb-3">
                        {guarantee.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {guarantee.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Mission Statement */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 rounded-2xl p-12">
            <h3 className="text-2xl font-semibold text-primary mb-4">
              Notre Mission
            </h3>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              Fini de jongler avec plusieurs entrepreneurs ou de subir des retards frustrants. 
              Nous offrons un service fluide et coordonné qui vous fait gagner du temps, 
              réduit le stress et fournit des résultats exceptionnels, à chaque fois.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;