import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "@/data/mockData";
import { useCart } from "@/contexts/CartContext";

const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const featuredProducts = products.filter(p => p.category === "Secret Ingredient Kits").slice(0, 3);
  
  return (
    <section className="bg-gradient-warm py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-4xl font-bold text-foreground md:text-5xl">
            Our Secret Ingredient Kits
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Each kit is crafted with love, blending premium ingredients with that special something that makes every cake unforgettable.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
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

        <div className="mt-12 text-center">
          <Button 
            size="lg" 
            variant="outline"
            className="border-primary/30 transition-smooth hover:bg-primary/10"
            asChild
          >
            <Link to="/shop">
              View All Products
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
