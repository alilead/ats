import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLocale } from "@/lib/locale-context";
import atsLogoContactNew from "@/assets/ats-logo-contact-new.png";

const Contact = () => {
  const { toast } = useToast();
  const t = useLocale();
  
  const [formData, setFormData] = useState({
    name: "",
    entrepriseName: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store contact form submission in localStorage for admin to see
    try {
      const contactData = {
        ...formData,
        type: 'contact',
        createdAt: new Date().toISOString()
      };
      
      const raw = localStorage.getItem('contacts');
      const arr = raw ? JSON.parse(raw) : [];
      arr.unshift(contactData);
      localStorage.setItem('contacts', JSON.stringify(arr));
    } catch (e) {
      console.error('Failed to store contact:', e);
    }
    
    toast({
      title: t.contact.form.successTitle,
      description: t.contact.form.successDescription,
    });
    setFormData({ name: "", entrepriseName: "", email: "", phone: "", service: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: t.contact.info.phone.title,
      content: t.contact.info.phone.content,
      action: "tel:+41772883838",
      description: t.contact.info.phone.description
    },
    {
      icon: MessageCircle,
      title: t.contact.info.whatsapp.title,
      content: t.contact.info.whatsapp.content,
      action: "https://wa.me/41772883838",
      description: t.contact.info.whatsapp.description
    },
    {
      icon: Mail,
      title: t.contact.info.email.title,
      content: t.contact.info.email.content,
      action: "mailto:info@atsgenerale.ch",
      description: t.contact.info.email.description
    },
    {
      icon: MapPin,
      title: t.contact.info.address.title,
      content: t.contact.info.address.content,
      action: "https://maps.google.com/?q=Genève+Suisse",
      description: t.contact.info.address.description
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <img 
              src={atsLogoContactNew} 
              alt="ATS Générale Logo"
              className="h-16 w-auto"
            />
          </div>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent font-medium mb-4">
            {t.contact.headerSmall}
          </div>
          <h2 className="text-foreground mb-6">
            {t.contact.headerTitle}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.contact.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information Cards */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6">{t.contact.headerSmall}</h3>
            <div className="grid gap-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card key={index} className="border-border/50 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                            <Icon className="w-6 h-6 text-accent" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground mb-1">{info.title}</h4>
                          <a 
                            href={info.action}
                            className="text-accent hover:text-accent/80 font-medium block mb-2 transition-colors"
                            data-testid={`link-${info.title.toLowerCase()}`}
                          >
                            {info.content}
                          </a>
                          <p className="text-sm text-muted-foreground">{info.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-1">
            <Card className="border-border/50">
                <CardHeader>
                <CardTitle>{t.contact.headerTitle}</CardTitle>
                <p className="text-muted-foreground">
                  {t.contact.form.formDescription}
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">{t.contact.form.name}</label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder={t.contact.form.namePlaceholder}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">{t.contact.form.email}</label>
                      <Input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder={t.contact.form.emailPlaceholder}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Optional Enterprise Name */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Nom d'entreprise (optionnel)
                    </label>
                    <Input
                      value={formData.entrepriseName}
                      onChange={(e) => setFormData({...formData, entrepriseName: e.target.value})}
                      placeholder="Nom de votre entreprise"
                      className="w-full"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">{t.contact.form.phone}</label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder={t.contact.form.phonePlaceholder}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">{t.contact.form.serviceLabel}</label>
                      <select 
                        aria-label={t.contact.form.serviceLabel}
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                        value={formData.service}
                        onChange={(e) => setFormData({...formData, service: e.target.value})}
                      >
                          <option value="">{t.contact.form.service}</option>
                          <option value="construction">{t.contact.services.construction}</option>
                          <option value="jardin">{t.contact.services.garden}</option>
                          <option value="entretien">{t.contact.services.maintenance}</option>
                          <option value="urgence">{t.contact.services.emergency}</option>
                          <option value="autre">{t.contact.services.other}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">{t.contact.form.message}</label>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder={t.contact.form.messagePlaceholder}
                      rows={5}
                      className="w-full resize-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      type="submit" 
                      size="lg" 
                      variant="accent"
                      className="flex-1"
                    >
                      {t.contact.form.submit}
                    </Button>
                    
                    <Button 
                      type="button" 
                      size="lg" 
                      variant="outline"
                      onClick={() => window.open('tel:+41772883838')}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      {t.contact.form.call}
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