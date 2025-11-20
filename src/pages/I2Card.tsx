import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { availableIngredients, secretIngredients } from "@/data/mockData";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import productImage from "@/assets/product-kit.jpg";

const I2Card = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([]);
  const [selectedSecret, setSelectedSecret] = useState<number | null>(null);

  const toggleIngredient = (id: number) => {
    setSelectedIngredients(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectedItems = availableIngredients.filter(i => selectedIngredients.includes(i.id));
  const secretItem = secretIngredients.find(s => s.id === selectedSecret);
  
  const basePrice = selectedItems.reduce((sum, item) => sum + item.price, 0);
  const secretPrice = secretItem ? secretItem.price : 0;
  const total = basePrice + secretPrice;

  const handleAddToCart = () => {
    if (selectedIngredients.length === 0) {
      toast({ title: "Please select ingredients", variant: "destructive" });
      return;
    }

    addToCart({
      id: Date.now(),
      name: "Custom Ingredient Kit",
      price: total,
      image: productImage,
      customization: {
        ingredients: selectedItems.map(i => i.name),
        secretIngredient: secretItem?.name
      }
    });

    navigate("/cart");
  };

  const categories = Array.from(new Set(availableIngredients.map(i => i.category)));

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="mb-4 font-serif text-5xl font-bold">Create Your Custom Kit</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Select your favorite ingredients and add a secret touch to craft your perfect baking kit
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Ingredient Selection */}
          <div className="space-y-6 lg:col-span-2">
            {/* Basic Ingredients */}
            {categories.map(category => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle>{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {availableIngredients
                      .filter(i => i.category === category)
                      .map(ingredient => (
                        <div
                          key={ingredient.id}
                          className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                        >
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              id={`ingredient-${ingredient.id}`}
                              checked={selectedIngredients.includes(ingredient.id)}
                              onCheckedChange={() => toggleIngredient(ingredient.id)}
                            />
                            <label
                              htmlFor={`ingredient-${ingredient.id}`}
                              className="cursor-pointer font-medium"
                            >
                              {ingredient.name}
                            </label>
                          </div>
                          <span className="font-semibold text-accent">
                            ${ingredient.price.toFixed(2)}
                          </span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Secret Ingredient */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Secret Ingredient</CardTitle>
                  <Badge variant="secondary">Special</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {secretIngredients.map(secret => (
                    <button
                      key={secret.id}
                      onClick={() => setSelectedSecret(selectedSecret === secret.id ? null : secret.id)}
                      className={`rounded-lg border-2 p-4 text-left transition-all ${
                        selectedSecret === secret.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="mb-1 font-semibold">{secret.name}</h4>
                          <p className="text-sm text-muted-foreground">{secret.description}</p>
                        </div>
                        <span className="font-semibold text-accent">
                          ${secret.price.toFixed(2)}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview & Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Your Custom Kit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedItems.length === 0 && !secretItem && (
                  <p className="text-center text-muted-foreground">
                    Start selecting ingredients
                  </p>
                )}

                {selectedItems.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold">Selected Ingredients:</h4>
                    {selectedItems.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.name}</span>
                        <span>${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}

                {secretItem && (
                  <div className="rounded-lg bg-primary/5 p-3">
                    <h4 className="mb-2 font-semibold">Secret Ingredient:</h4>
                    <div className="flex justify-between text-sm">
                      <span>{secretItem.name}</span>
                      <span>${secretItem.price.toFixed(2)}</span>
                    </div>
                  </div>
                )}

                {(selectedItems.length > 0 || secretItem) && (
                  <>
                    <div className="flex justify-between border-t border-border pt-4 font-serif text-xl font-bold">
                      <span>Total</span>
                      <span className="text-accent">${total.toFixed(2)}</span>
                    </div>

                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default I2Card;
