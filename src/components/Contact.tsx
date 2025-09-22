import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message envoyé !",
      description: "Nous vous contacterons dans les plus brefs délais.",
    });
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Téléphone",
      content: "+41 22 345 67 89",
      action: "tel:+41223456789",
      description: "Lun-Ven 8h-18h, Sam 9h-16h"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      content: "+41 78 901 23 45",
      action: "https://wa.me/41789012345",
      description: "Réponse rapide 7j/7"
    },
    {
      icon: Mail,
      title: "Email",
      content: "contact@atsgenerale.ch",
      action: "mailto:contact@atsgenerale.ch",
      description: "Réponse sous 24h"
    },
    {
      icon: MapPin,
      title: "Adresse",
      content: "Avenue de la Paix 15, 1202 Genève",
      action: "https://maps.google.com/?q=Avenue+de+la+Paix+15+1202+Genève",
      description: "Zone de service : Genève et région"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent font-medium mb-4">
            📞 Contactez-nous
          </div>
          <h2 className="text-primary mb-6">
            Prêt à transformer votre propriété ?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Obtenez votre devis gratuit et personnalisé. Notre équipe d'experts 
            vous accompagne de la conception à la réalisation de votre projet.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-2xl font-semibold text-primary mb-6">
              Nos Coordonnées
            </h3>
            
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="hover:shadow-md transition-shadow border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-primary mb-1">
                          {info.title}
                        </h4>
                        <a 
                          href={info.action}
                          className="text-accent hover:text-accent/80 transition-colors font-medium block mb-1"
                        >
                          {info.content}
                        </a>
                        <p className="text-sm text-muted-foreground">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* Business Hours */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 text-accent mr-2" />
                  Horaires d'ouverture
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Lundi - Vendredi</span>
                    <span className="text-accent font-medium">8h00 - 18h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samedi</span>
                    <span className="text-accent font-medium">9h00 - 16h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dimanche</span>
                    <span className="text-muted-foreground">Fermé</span>
                  </div>
                  <div className="pt-2 mt-2 border-t border-border">
                    <span className="text-muted-foreground">🚨 Service d'urgence 24/7 disponible</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Demandez votre devis gratuit</CardTitle>
                <p className="text-muted-foreground">
                  Remplissez ce formulaire et recevez une réponse personnalisée sous 24h.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Nom complet *</label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Votre nom et prénom"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email *</label>
                      <Input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="votre.email@exemple.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Téléphone</label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+41 xx xxx xx xx"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Type de service</label>
                      <select 
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                        value={formData.service}
                        onChange={(e) => setFormData({...formData, service: e.target.value})}
                      >
                        <option value="">Sélectionnez un service</option>
                        <option value="construction">Construction & Rénovation</option>
                        <option value="jardin">Jardin & Aménagement</option>
                        <option value="entretien">Entretien & Maintenance</option>
                        <option value="urgence">Service d'urgence</option>
                        <option value="autre">Autre / Plusieurs services</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Description du projet *</label>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Décrivez votre projet, vos besoins, échéances souhaitées..."
                      rows={5}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="bg-accent hover:bg-accent/90 text-accent-foreground flex-1"
                    >
                      Envoyer ma demande
                    </Button>
                    
                    <Button 
                      type="button" 
                      size="lg" 
                      variant="outline"
                      onClick={() => window.open('tel:+41223456789')}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Appeler maintenant
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;