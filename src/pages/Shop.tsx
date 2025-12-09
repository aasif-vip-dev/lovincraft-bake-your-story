import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Heart, ShoppingCart, Search, SlidersHorizontal, X } from "lucide-react";
import { products } from "@/data/mockData";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Shop = () => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { t } = useLanguage();
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState("featured");

  // Get unique categories
  const categories = Array.from(new Set(products.map(p => p.category)));

  // Get price bounds
  const maxPrice = Math.max(...products.map(p => p.price));
  const minPrice = Math.min(...products.map(p => p.price));

  // Handle category toggle
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setPriceRange([minPrice, maxPrice]);
    setSortBy("featured");
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.ingredients?.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.category)
      );
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "rating":
        filtered = [...filtered].sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        // featured - keep original order
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategories, priceRange, sortBy]);

  // Active filters count
  const activeFiltersCount = 
    (searchQuery ? 1 : 0) + 
    selectedCategories.length + 
    (priceRange[0] !== minPrice || priceRange[1] !== maxPrice ? 1 : 0);

  // Filters component
  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="mb-3 font-semibold">{t.shop.categories}</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <label
                htmlFor={category}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold">{t.shop.priceRange}</h3>
          <span className="text-sm text-muted-foreground">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
        <Slider
          min={minPrice}
          max={maxPrice}
          step={1}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>${minPrice}</span>
          <span>${maxPrice}</span>
        </div>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button
          variant="outline"
          className="w-full"
          onClick={clearFilters}
        >
          <X className="mr-2 h-4 w-4" />
          {t.shop.clearAllFilters}
        </Button>
      )}
    </div>
  );
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="mb-4 font-serif text-5xl font-bold text-foreground">
            {t.shop.title}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t.shop.subtitle}
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
          <div className="relative flex-1 lg:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t.shop.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Sort and Mobile Filters */}
          <div className="flex gap-2">
            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t.shop.sortBy} />
              </SelectTrigger>
              <SelectContent className="z-50 bg-background">
                <SelectItem value="featured">{t.shop.sortOptions.featured}</SelectItem>
                <SelectItem value="price-low">{t.shop.sortOptions.priceLowHigh}</SelectItem>
                <SelectItem value="price-high">{t.shop.sortOptions.priceHighLow}</SelectItem>
                <SelectItem value="name">{t.shop.sortOptions.name}</SelectItem>
                <SelectItem value="rating">{t.shop.sortOptions.rating}</SelectItem>
              </SelectContent>
            </Select>

            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  {t.shop.filters}
                  {activeFiltersCount > 0 && (
                    <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>{t.shop.filters}</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FiltersContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <Card className="sticky top-20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-xl font-bold">{t.shop.filters}</h2>
                  {activeFiltersCount > 0 && (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                      {activeFiltersCount}
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <FiltersContent />
              </CardContent>
            </Card>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Count */}
            <p className="mb-4 text-sm text-muted-foreground">
              {t.shop.showing
                .replace("{count}", filteredProducts.length.toString())
                .replace("{products}", filteredProducts.length === 1 ? t.shop.product : t.shop.products)}
            </p>

            {filteredProducts.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <ShoppingCart className="mx-auto mb-4 h-16 w-16 text-muted" />
                  <h3 className="mb-2 font-serif text-2xl font-bold">{t.shop.noProducts}</h3>
                  <p className="mb-4 text-muted-foreground">
                    {t.shop.noProductsMessage}
                  </p>
                  <Button onClick={clearFilters}>{t.shop.clearFilters}</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
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
                        <div className="mb-2 flex items-center justify-between">
                          <h3 className="font-serif text-xl font-semibold text-foreground">
                            {product.name}
                          </h3>
                          {product.rating && (
                            <div className="flex items-center gap-1 text-sm">
                              <span className="text-yellow-500">★</span>
                              <span className="font-medium">{product.rating}</span>
                            </div>
                          )}
                        </div>
                        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
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
                        {t.featured.addToCart}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className={`border-primary/30 transition-smooth ${
                          isInWishlist(product.id) 
                            ? 'bg-primary/10 text-primary hover:bg-primary/20' 
                            : 'hover:bg-primary/10'
                        }`}
                        onClick={() => {
                          toggleWishlist({ 
                            id: product.id, 
                            name: product.name, 
                            price: product.price, 
                            image: product.image,
                            description: product.description 
                          });
                          toast({
                            title: isInWishlist(product.id) ? t.shop.removedFromWishlist : t.shop.addedToWishlist,
                            description: isInWishlist(product.id) 
                              ? t.shop.removedFromWishlistDesc.replace("{name}", product.name)
                              : t.shop.addedToWishlistDesc.replace("{name}", product.name),
                          });
                        }}
                      >
                        <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;
