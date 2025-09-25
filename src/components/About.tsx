import { Card, CardContent } from "@/components/ui/card";
import { Shield, Zap, Award, Users, Clock, Star } from "lucide-react";
import { useLocale } from "@/lib/locale-context";

const About = () => {
  const t = useLocale();

  const guaranteeIcons = [Shield, Users, Zap, Award, Clock, Star];
  const guarantees = t.about.guarantees.map((guarantee, index) => ({
    ...guarantee,
    icon: guaranteeIcons[index]
  }));

  const stats = [
    { number: "25+", label: t.about.stats.experience },
    { number: "500+", label: t.about.stats.projects },
    { number: "100%", label: t.about.stats.satisfaction },
    { number: "24/7", label: t.about.stats.emergency }
  ];

  return (
    <section id="apropos" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent font-medium mb-4">
            {t.about.headerSmall}
          </div>
          <h2 className="text-foreground mb-6">
            {t.about.headerTitle}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.about.description}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-foreground mb-2">{stat.number}</div>
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
                      <h3 className="text-lg font-semibold text-foreground mb-3">
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
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              {t.about.mission.title}
            </h3>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              {t.about.mission.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;