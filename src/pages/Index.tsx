import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import StoryPreview from "@/components/StoryPreview";
import NewsletterSignup from "@/components/NewsletterSignup";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <FeaturedProducts />
      <StoryPreview />
      <section className="container mx-auto px-4 py-16">
        <NewsletterSignup />
      </section>
      <Footer />
    </div>
  );
};

export default Index;
