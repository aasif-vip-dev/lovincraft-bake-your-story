import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Star, Package, Truck, Shield, BookOpen } from "lucide-react";
import { products, reviews, recipes } from "@/data/mockData";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "@/hooks/use-toast";
import SocialShare from "@/components/SocialShare";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="mb-4 font-serif text-4xl">Product Not Found</h1>
          <Link to="/shop">
            <Button>Return to Shop</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const productReviews = reviews.filter(r => r.productId === product.id);
  const productRecipe = recipes.find(r => r.productId === product.id);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-foreground">Shop</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Product Image */}
          <div className="overflow-hidden rounded-lg bg-muted shadow-card">
            <img 
              src={product.image} 
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div>
            <Badge className="mb-4">{product.category}</Badge>
            <h1 className="mb-4 font-serif text-4xl font-bold text-foreground">
              {product.name}
            </h1>
            
            <div className="mb-4 flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'text-muted'}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            <p className="mb-6 text-lg text-muted-foreground">
              {product.longDescription}
            </p>

            <div className="mb-8">
              <p className="mb-4 font-serif text-4xl font-bold text-accent">
                ${product.price}
              </p>
              
              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  className="flex-1"
                  onClick={() => addToCart({ ...product, image: product.image })}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className={
                    isInWishlist(product.id) 
                      ? 'bg-primary/10 text-primary hover:bg-primary/20' 
                      : ''
                  }
                  onClick={() => {
                    toggleWishlist({ 
                      id: product.id, 
                      name: product.name, 
                      price: product.price, 
                      image: product.image,
                      description: product.description 
                    });
                    toast({
                      title: isInWishlist(product.id) ? "Removed from wishlist" : "Added to wishlist",
                      description: isInWishlist(product.id) 
                        ? `${product.name} has been removed from your wishlist.`
                        : `${product.name} has been added to your wishlist.`,
                    });
                  }}
                >
                  <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>

            {/* Social Share */}
            <div className="border-t border-border pt-6">
              <SocialShare
                url={`/product/${product.id}`}
                title={`Check out ${product.name} from LovinCraft!`}
                description={product.description}
                image={product.image}
              />
            </div>

            {/* Features */}
            <div className="grid gap-4 border-t border-border pt-8">
              {productRecipe && (
                <Link to={`/recipe/${productRecipe.id}`}>
                  <div className="flex items-center gap-3 rounded-lg border border-primary/30 bg-primary/5 p-4 transition-colors hover:bg-primary/10">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <span className="font-semibold">View Recipe Instructions</span>
                      <p className="text-xs text-muted-foreground">Step-by-step guide with video tutorial</p>
                    </div>
                  </div>
                </Link>
              )}
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-primary" />
                <span className="text-sm">Complete baking kit with instructions</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-sm">Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm">100% satisfaction guarantee</span>
              </div>
            </div>

            {/* Ingredients */}
            {product.ingredients && (
              <div className="mt-8 border-t border-border pt-8">
                <h3 className="mb-4 font-serif text-2xl font-semibold">What's Included</h3>
                <ul className="grid gap-2">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Reviews */}
        <section className="mt-20">
          <h2 className="mb-8 font-serif text-3xl font-bold">Customer Reviews</h2>
          <div className="grid gap-6">
            {productReviews.map(review => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{review.userName}</p>
                      <p className="text-sm text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-primary text-primary' : 'text-muted'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                  {review.verified && (
                    <Badge variant="secondary" className="mt-4">Verified Purchase</Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
