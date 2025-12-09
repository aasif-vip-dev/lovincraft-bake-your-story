import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, ShoppingCart, Star, Package, Truck, Shield, BookOpen } from "lucide-react";
import { products, reviews as mockReviews, recipes } from "@/data/mockData";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";
import SocialShare from "@/components/SocialShare";
import ReviewForm from "@/components/ReviewForm";
import ReviewList from "@/components/ReviewList";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { t } = useLanguage();
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="mb-4 font-serif text-4xl">{t.product.notFound}</h1>
          <Link to="/shop">
            <Button>{t.product.returnToShop}</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const productReviews = mockReviews.filter(r => r.productId === product.id);
  const productRecipe = recipes.find(r => r.productId === product.id);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">{t.product.home}</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-foreground">{t.product.shop}</Link>
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
                {product.rating} ({product.reviewCount} {t.product.reviews.toLowerCase()})
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
                  {t.product.addToCart}
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
                      title: isInWishlist(product.id) ? t.product.removeFromWishlist : t.product.addToWishlist,
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
                title={`Check out ${product.name} from ${t.common.brandName}!`}
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
                      <span className="font-semibold">{t.product.viewRecipe}</span>
                      <p className="text-xs text-muted-foreground">{t.product.recipeSubtitle}</p>
                    </div>
                  </div>
                </Link>
              )}
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-primary" />
                <span className="text-sm">{t.product.completeBakingKit}</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-sm">{t.product.freeShipping}</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm">{t.product.satisfactionGuarantee}</span>
              </div>
            </div>

            {/* Ingredients */}
            {product.ingredients && (
              <div className="mt-8 border-t border-border pt-8">
                <h3 className="mb-4 font-serif text-2xl font-semibold">{t.product.whatsIncluded}</h3>
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

        {/* Reviews & Details Tabs */}
        <section className="mt-20">
          <Tabs defaultValue="reviews" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="reviews">{t.product.customerReviews}</TabsTrigger>
              <TabsTrigger value="write">{t.product.writeReview}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="reviews" className="mt-6">
              <ReviewList productId={product.id} />
            </TabsContent>
            
            <TabsContent value="write" className="mt-6">
              <ReviewForm 
                productId={product.id} 
                productName={product.name}
              />
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;