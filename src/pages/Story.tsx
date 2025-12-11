import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Heart } from "lucide-react";
import coupleImage from "@/assets/couple-story.jpg";
import heroImage from "@/assets/hero-baking.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const Story = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4 text-center">
            <Heart className="mx-auto mb-6 h-16 w-16 fill-primary text-primary" />
            <h1 className="mb-6 font-serif text-5xl font-bold text-foreground md:text-6xl">
              {t.storyPage.heroTitle}
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              {t.storyPage.heroSubtitle}
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
                  {t.storyPage.chapter1Title}
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {t.storyPage.chapter1Text}
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
                  {t.storyPage.chapter2Title}
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {t.storyPage.chapter2Text1}
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {t.storyPage.chapter2Text2}
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
                  {t.storyPage.chapter3Title}
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {t.storyPage.chapter3Text1}
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {t.storyPage.chapter3Text2}
                </p>
              </div>

              {/* Quote */}
              <div className="my-12 rounded-2xl bg-gradient-warm p-12 text-center shadow-card">
                <p className="mb-4 font-serif text-2xl italic text-foreground">
                  {t.storyPage.quote}
                </p>
                <p className="text-lg font-medium text-accent">
                  {t.storyPage.quoteAuthor}
                </p>
              </div>

              {/* Closing */}
              <div className="space-y-4 text-center">
                <h2 className="font-serif text-3xl font-bold text-foreground">
                  {t.storyPage.closingTitle}
                </h2>
                <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  {t.storyPage.closingText}
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