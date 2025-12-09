import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import coupleImage from "@/assets/couple-story.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const StoryPreview = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
              <Heart className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-medium text-primary-foreground">{t.story.badge}</span>
            </div>
            
            <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
              {t.story.title}
            </h2>
            
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>{t.story.paragraph1}</p>
              <p>{t.story.paragraph2}</p>
            </div>
            
            <Button 
              size="lg"
              className="bg-primary text-primary-foreground shadow-soft transition-smooth hover:shadow-lg"
              asChild
            >
              <Link to="/story">
                {t.story.cta}
              </Link>
            </Button>
          </div>
          
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-2xl shadow-soft">
              <img 
                src={coupleImage} 
                alt="Mila and Aasif baking together"
                className="h-full w-full object-cover"
              />
            </div>
            
            {/* Decorative quote */}
            <div className="absolute -bottom-6 -left-6 rounded-xl bg-card p-6 shadow-card">
              <p className="font-serif text-lg italic text-foreground">
                {t.story.quote}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {t.story.quoteAuthor}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryPreview;