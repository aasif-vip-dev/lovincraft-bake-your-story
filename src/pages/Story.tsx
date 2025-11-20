import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Heart } from "lucide-react";
import coupleImage from "@/assets/couple-story.jpg";
import heroImage from "@/assets/hero-baking.jpg";

const Story = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4 text-center">
            <Heart className="mx-auto mb-6 h-16 w-16 fill-primary text-primary" />
            <h1 className="mb-6 font-serif text-5xl font-bold text-foreground md:text-6xl">
              A Love Story Baked to Perfection
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              How two hearts, one kitchen, and a secret ingredient created something magical
            </p>
          </div>
        </section>

        {/* Story Content */}
        <section className="py-20">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="space-y-12">
              {/* Chapter 1 */}
              <div className="space-y-4">
                <h2 className="font-serif text-3xl font-bold text-foreground">
                  The First Meeting
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  It was a rainy Tuesday afternoon when Mila first met Aasif in the local farmer's market. 
                  She was searching for the perfect vanilla beans, and he was the vendor with a smile that 
                  could warm the coldest day. What started as a conversation about Madagascar vanilla turned 
                  into hours of talking about baking, dreams, and the magic that happens when you mix the 
                  right ingredients.
                </p>
              </div>

              {/* Image placeholder */}
              <div className="my-12 overflow-hidden rounded-2xl shadow-soft">
                <img 
                  src={heroImage} 
                  alt="First meeting"
                  className="h-96 w-full object-cover"
                />
              </div>

              {/* Chapter 2 */}
              <div className="space-y-4">
                <h2 className="font-serif text-3xl font-bold text-foreground">
                  The First Cake
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  A week later, Mila invited Aasif to her small apartment to bake together. She had a recipe 
                  she'd been perfecting for years – a vanilla cake that was almost perfect. Almost. Aasif 
                  brought his secret ingredient, something he'd never shared with anyone before. When they 
                  mixed it into the batter, something magical happened.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  The cake that came out of the oven wasn't just delicious – it was transformative. It tasted 
                  like comfort, like home, like love itself. Friends and family who tried it couldn't stop 
                  talking about it. They begged for the recipe, but Mila and Aasif knew they had created 
                  something special that deserved to be shared in its own unique way.
                </p>
              </div>

              {/* Image placeholder */}
              <div className="my-12 overflow-hidden rounded-2xl shadow-soft">
                <img 
                  src={coupleImage} 
                  alt="Baking together"
                  className="h-96 w-full object-cover"
                />
              </div>

              {/* Chapter 3 */}
              <div className="space-y-4">
                <h2 className="font-serif text-3xl font-bold text-foreground">
                  The Birth of LovinCraft
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Two years later, on their anniversary, Mila and Aasif decided to share their secret with 
                  the world. Not the ingredient itself – that would remain their special touch – but the 
                  experience of baking with love. They created their first kit: premium ingredients, 
                  carefully measured and packaged, with a small vial of their secret ingredient and detailed 
                  instructions.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  LovinCraft was born from the belief that every cake should tell a story, every ingredient 
                  should carry meaning, and every person deserves to experience the magic of baking something 
                  truly special. Today, we continue that tradition, crafting each kit with the same love and 
                  care that brought us together.
                </p>
              </div>

              {/* Quote */}
              <div className="my-12 rounded-2xl bg-gradient-warm p-12 text-center shadow-card">
                <p className="mb-4 font-serif text-2xl italic text-foreground">
                  "We don't just sell ingredients. We share the magic that happens when love meets flour, 
                  sugar, and that one special something that makes everything come together."
                </p>
                <p className="text-lg font-medium text-accent">
                  - Mila & Aasif
                </p>
              </div>

              {/* Closing */}
              <div className="space-y-4 text-center">
                <h2 className="font-serif text-3xl font-bold text-foreground">
                  Your Story Starts Here
                </h2>
                <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  Every kit we create is an invitation to start your own story. Whether you're baking for 
                  someone special, celebrating a milestone, or simply treating yourself to something 
                  wonderful – we're honored to be part of your journey.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Story;
