import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import constructionImage from "@/assets/service-construction.jpg";
import gardenImage from "@/assets/service-garden.jpg";
import maintenanceImage from "@/assets/service-maintenance.jpg";
import { useState, useEffect } from "react";
import BookingForm from "@/components/BookingForm";
import useLocale from "@/lib/useLocale";
const Services = () => {
  const t = useLocale();

  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [audience, setAudience] = useState<'residential' | 'commercial'>('residential');
  const currentAudience = t.services.serviceData[audience];

  return (
  <section id="services" className="py-12 md:py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent font-medium mb-4">
            {t.services.headerSmall}
          </div>
          <h2 className="text-foreground mb-6">
            {t.services.headerTitle}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.services.description}
          </p>
        </div>

        {/* Audience selector */}
        <div className="flex justify-center gap-4 mb-8">
          <button onClick={() => setAudience('residential')} className={`px-4 py-2 rounded-full border ${audience === 'residential' ? 'bg-accent text-white' : 'bg-white/30 text-primary'}`}>
            {t.services.audienceResidential}
          </button>
          <button onClick={() => setAudience('commercial')} className={`px-4 py-2 rounded-full border ${audience === 'commercial' ? 'bg-accent text-white' : 'bg-white/30 text-primary'}`}>
            {t.services.audienceCommercial}
          </button>
        </div>

        {/* Services Grid (per audience) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {currentAudience?.categories.map((category) => (
            <Card key={category.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-border/50 hover:border-accent/50">
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <div className="space-y-2 mb-4">
                  {category.items.map((item) => (
                    <div key={item.id} className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground">{item.title}</span>
                    </div>
                  ))}
                </div>
                <Button variant="accent" className="w-full" onClick={() => setSelectedService(category.title)}>
                  {t.services.book}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              {t.services.customServiceTitle}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t.services.customServiceDescription}
            </p>
            <Button size="lg" variant="accent" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              {t.services.consultation}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Booking Modal */}
        {selectedService && (
          <div className="fixed inset-0 z-50 overflow-auto bg-black/50" role="dialog" aria-modal="true" onClick={() => setSelectedService(null)}>
            <div className="min-h-screen flex items-start md:items-center justify-center py-8 px-4">
              <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
                <BookingForm service={selectedService} audience={audience} onClose={() => setSelectedService(null)} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;