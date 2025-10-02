import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowRight } from "lucide-react";
import before1 from "@/assets/stock_images/villa_before_new.png";
import after1 from "@/assets/stock_images/luxury_villa_after_new.png";
import before2 from "@/assets/stock_images/interior_before_new.png";
import after2 from "@/assets/stock_images/modern_kitchen_after_new.png";
import before3 from "@/assets/stock_images/construction_before_new.png";
import after3 from "@/assets/stock_images/construction_before_2_new.png";
import before4 from "@/assets/stock_images/exterior_before_new.png";
import after4 from "@/assets/stock_images/exterior_renovation_after_new.png";

import { useLocale } from "@/lib/locale-context";

const Portfolio = () => {
  const t = useLocale();
  
  const beforeImages = [before1, before2, before3, before4];
  const afterImages = [after1, after2, after3, after4];
  
  const projects = t.portfolio.projects.map((project, index) => ({
    ...project,
    beforeImage: beforeImages[index],
    afterImage: afterImages[index]
  }));

  return (
  <section id="realisations" className="py-12 md:py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent font-medium mb-4">
            {t.portfolio.header}
          </div>
          <h2 className="text-foreground mb-6">{t.portfolio.header}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.portfolio.description}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project) => (
            <Card key={project.id} className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-border/50 hover:border-accent/50">
              {/* Before/After Images */}
              <div className="relative h-56 md:h-80 overflow-hidden bg-muted">
                <div className="grid grid-cols-2 h-full">
                  {/* Before */}
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.beforeImage} 
                      alt={t.portfolio.before}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {t.portfolio.before}
                    </div>
                  </div>
                  {/* After */}
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.afterImage} 
                      alt={t.portfolio.after}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-2 right-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded">
                      {t.portfolio.after}
                    </div>
                  </div>
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <Button size="sm" variant="secondary" className="w-full">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          {t.portfolio.cta}
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
                
                <h3 className="text-xl font-semibold text-foreground mb-3">
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

                <Button variant="outline" className="w-full group/btn">
                  {t.portfolio.projectCta}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              {t.portfolio.interestTitle}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t.portfolio.interestDescription}
            </p>
            <Button size="lg" variant="accent" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              {t.services.consultation}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;