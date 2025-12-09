import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, total } = useCart();
  const { t } = useLanguage();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <Card className="mx-auto max-w-md text-center">
            <CardContent className="p-12">
              <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-muted" />
              <h2 className="mb-2 font-serif text-2xl font-bold">{t.cart.empty}</h2>
              <p className="mb-6 text-muted-foreground">{t.cart.emptyMessage}</p>
              <Button asChild>
                <Link to="/shop">{t.cart.startShopping}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <h1 className="mb-8 font-serif text-4xl font-bold">{t.cart.title}</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map(item => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="h-24 w-24 rounded-lg object-cover"
                      />
                      
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="font-serif text-xl font-semibold">{item.name}</h3>
                          <p className="text-muted-foreground">${item.price.toFixed(2)}</p>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 rounded-md border border-border">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-serif text-xl font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="mb-6 font-serif text-2xl font-bold">{t.cart.orderSummary}</h2>
                
                <div className="space-y-4 border-b border-border pb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.cart.subtotal}</span>
                    <span className="font-semibold">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.cart.shipping}</span>
                    <span className="font-semibold">{total > 50 ? t.common.free : '$5.99'}</span>
                  </div>
                </div>

                <div className="my-4">
                  <label className="mb-2 block text-sm font-medium">{t.cart.promoCode}</label>
                  <div className="flex gap-2">
                    <Input placeholder={t.cart.enterCode} />
                    <Button variant="outline">{t.common.apply}</Button>
                  </div>
                </div>

                <div className="mb-6 flex justify-between border-t border-border pt-4">
                  <span className="font-serif text-xl font-bold">{t.common.total}</span>
                  <span className="font-serif text-2xl font-bold text-accent">
                    ${(total + (total > 50 ? 0 : 5.99)).toFixed(2)}
                  </span>
                </div>

                <Button asChild className="w-full" size="lg">
                  <Link to="/checkout">{t.cart.checkout}</Link>
                </Button>

                <Button asChild variant="outline" className="mt-2 w-full">
                  <Link to="/shop">{t.cart.continueShopping}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;