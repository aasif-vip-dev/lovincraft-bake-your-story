import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <Heart className="mx-auto mb-6 h-12 w-12 fill-primary text-primary" />
            <h1 className="mb-4 font-serif text-5xl font-bold text-foreground">
              {t.contactPage.title}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {t.contactPage.subtitle}
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="rounded-2xl bg-card p-8 shadow-card">
              <h2 className="mb-6 font-serif text-2xl font-bold text-foreground">
                {t.contactPage.sendMessage}
              </h2>
              
              <form className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    {t.contactPage.yourName}
                  </label>
                  <Input 
                    id="name" 
                    placeholder="Mila Smith"
                    className="border-border bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    {t.contactPage.email}
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="hello@example.com"
                    className="border-border bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-foreground">
                    {t.contactPage.subject}
                  </label>
                  <Input 
                    id="subject" 
                    placeholder={t.contactPage.subjectPlaceholder}
                    className="border-border bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    {t.contactPage.message}
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder={t.contactPage.messagePlaceholder}
                    rows={6}
                    className="border-border bg-background"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground shadow-soft transition-smooth hover:shadow-lg"
                >
                  {t.contactPage.sendBtn}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="rounded-2xl bg-gradient-warm p-8 shadow-card">
                <h2 className="mb-6 font-serif text-2xl font-bold text-foreground">
                  {t.contactPage.otherWays}
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-foreground">{t.contactPage.emailUs}</h3>
                      <p className="text-sm text-muted-foreground">
                        {t.contactPage.emailAddress}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t.contactPage.responseTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-foreground">{t.contactPage.visitUs}</h3>
                      <p className="text-sm text-muted-foreground">
                        {t.contactPage.location}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t.contactPage.locationNote}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-card p-8 shadow-card">
                <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">
                  {t.contactPage.newsletterTitle}
                </h2>
                <p className="mb-6 text-sm text-muted-foreground">
                  {t.contactPage.newsletterDesc}
                </p>
                
                <div className="space-y-3">
                  <Input 
                    type="email" 
                    placeholder={t.newsletter.placeholderShort}
                    className="border-border bg-background"
                  />
                  <Button className="w-full bg-primary text-primary-foreground">
                    {t.newsletter.subscribe}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;