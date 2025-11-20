import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";
import { products } from "@/data/mockData";
import { useCart } from "@/contexts/CartContext";

const Shop = () => {
  const { addToCart } = useCart();
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-serif text-5xl font-bold text-foreground">
            Our Ingredients & Kits
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Each product is carefully selected and crafted to bring love into your kitchen.
          </p>
        </div>

        {/* Secret Ingredient Kits */}
        <section className="mb-16">
          <h2 className="mb-8 font-serif text-3xl font-bold text-foreground">
            Secret Ingredient Kits
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.filter(p => p.category === "Secret Ingredient Kits").map((product) => (
              <Card key={product.id} className="group overflow-hidden shadow-card transition-smooth hover:shadow-soft">
                <Link to={`/product/${product.id}`}>
                  <CardHeader className="p-0">
                    <div className="aspect-square overflow-hidden bg-muted">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="h-full w-full object-cover transition-smooth group-hover:scale-105"
                      />
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <h3 className="mb-2 font-serif text-2xl font-semibold text-foreground">
                      {product.name}
                    </h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      {product.description}
                    </p>
                    <p className="font-serif text-2xl font-bold text-accent">
                      ${product.price.toFixed(2)}
                    </p>
                  </CardContent>
                </Link>
                
                <CardFooter className="gap-2 p-6 pt-0">
                  <Button 
                    className="flex-1 bg-primary text-primary-foreground transition-smooth hover:shadow-soft"
                    onClick={() => addToCart({ ...product, image: product.image })}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="icon" className="border-primary/30 transition-smooth hover:bg-primary/10">
                    <Heart className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Basic Ingredients */}
        <section className="mb-16">
          <h2 className="mb-8 font-serif text-3xl font-bold text-foreground">
            Premium Basic Ingredients
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.filter(p => p.category === "Basic Ingredients").map((product) => (
              <Card key={product.id} className="group overflow-hidden shadow-card transition-smooth hover:shadow-soft">
                <Link to={`/product/${product.id}`}>
                  <CardHeader className="p-0">
                    <div className="aspect-square overflow-hidden bg-muted">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="h-full w-full object-cover transition-smooth group-hover:scale-105"
                      />
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <h3 className="mb-2 font-serif text-2xl font-semibold text-foreground">
                      {product.name}
                    </h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      {product.description}
                    </p>
                    <p className="font-serif text-2xl font-bold text-accent">
                      ${product.price.toFixed(2)}
                    </p>
                  </CardContent>
                </Link>
                
                <CardFooter className="gap-2 p-6 pt-0">
                  <Button 
                    className="flex-1 bg-primary text-primary-foreground transition-smooth hover:shadow-soft"
                    onClick={() => addToCart({ ...product, image: product.image })}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="icon" className="border-primary/30 transition-smooth hover:bg-primary/10">
                    <Heart className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;
