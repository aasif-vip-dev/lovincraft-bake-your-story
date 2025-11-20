import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-baking.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>
      
      <div className="container relative mx-auto flex min-h-[90vh] flex-col items-center justify-center px-4 py-20 text-center">
        <div className="max-w-4xl space-y-8">
          <h1 className="font-serif text-5xl font-bold leading-tight text-foreground md:text-7xl">
            Craft Your Love,
            <br />
            <span className="text-primary-foreground">One Ingredient at a Time</span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
            Every cake tells a story. Every ingredient holds a memory. 
            Discover our handcrafted baking kits, inspired by a love that started in the kitchen.
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button 
              size="lg" 
              className="gap-2 bg-primary text-primary-foreground shadow-soft transition-smooth hover:shadow-lg"
              asChild
            >
              <Link to="/shop">
                Start Baking Your Story
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary/30 transition-smooth hover:bg-primary/10"
              asChild
            >
              <Link to="/story">
                Discover Our Story
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
