import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Heart } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <Heart className="mx-auto mb-6 h-12 w-12 fill-primary text-primary" />
            <h1 className="mb-4 font-serif text-5xl font-bold text-foreground">
              Get in Touch
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              We'd love to hear from you. Whether you have a question about our products, 
              need help with a recipe, or just want to share your baking story – reach out!
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="rounded-2xl bg-card p-8 shadow-card">
              <h2 className="mb-6 font-serif text-2xl font-bold text-foreground">
                Send Us a Message
              </h2>
              
              <form className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Your Name
                  </label>
                  <Input 
                    id="name" 
                    placeholder="Mila Smith"
                    className="border-border bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email Address
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
                    Subject
                  </label>
                  <Input 
                    id="subject" 
                    placeholder="I have a question about..."
                    className="border-border bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Your Message
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us what's on your mind..."
                    rows={6}
                    className="border-border bg-background"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground shadow-soft transition-smooth hover:shadow-lg"
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="rounded-2xl bg-gradient-warm p-8 shadow-card">
                <h2 className="mb-6 font-serif text-2xl font-bold text-foreground">
                  Other Ways to Connect
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-foreground">Email Us</h3>
                      <p className="text-sm text-muted-foreground">
                        hello@lovrebo.com
                      </p>
                      <p className="text-sm text-muted-foreground">
                        We typically respond within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-foreground">Visit Us</h3>
                      <p className="text-sm text-muted-foreground">
                        Where love meets ingredients
                      </p>
                      <p className="text-sm text-muted-foreground">
                        (Our kitchen is where the magic happens!)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-card p-8 shadow-card">
                <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">
                  Newsletter
                </h2>
                <p className="mb-6 text-sm text-muted-foreground">
                  Subscribe to receive recipes, baking tips, and stories of love straight to your inbox.
                </p>
                
                <div className="space-y-3">
                  <Input 
                    type="email" 
                    placeholder="Your email address"
                    className="border-border bg-background"
                  />
                  <Button className="w-full bg-primary text-primary-foreground">
                    Subscribe
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
