import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CreditCard, Wallet, Banknote } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useLoyalty } from "@/contexts/LoyaltyContext";
import { useReferral } from "@/contexts/ReferralContext";
import { toast } from "@/hooks/use-toast";

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const { addPoints, getDiscountPercentage } = useLoyalty();
  const { completeReferral, getReferralCode } = useReferral();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [giftWrap, setGiftWrap] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const loyaltyDiscount = getDiscountPercentage();
  const discountAmount = (total * loyaltyDiscount) / 100;
  const finalTotal = total - discountAmount + (giftWrap ? 5.99 : 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Award loyalty points (1 point per dollar spent)
    const pointsEarned = Math.floor(finalTotal);
    addPoints(pointsEarned, "purchase", `Purchase of $${finalTotal.toFixed(2)}`);
    
    // Check and complete referral if this is a first purchase
    const referralCode = getReferralCode();
    if (referralCode && email) {
      completeReferral(email);
      // Award bonus points to referrer
      toast({
        title: "Referral Bonus Applied! 🎉",
        description: "Your friend earned 100 bonus points for referring you!",
      });
    }
    
    clearCart();
    toast({
      title: "Order Placed Successfully! 🎉",
      description: `You earned ${pointsEarned} loyalty points!`,
    });
    
    navigate("/dashboard?tab=orders");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <h1 className="mb-8 font-serif text-4xl font-bold">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Checkout Form */}
            <div className="space-y-6 lg:col-span-2">
              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" required />
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" required />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input id="state" required />
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" required />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" required />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <Button
                      type="button"
                      variant={paymentMethod === "card" ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => setPaymentMethod("card")}
                    >
                      <CreditCard className="mr-2 h-5 w-5" />
                      Credit / Debit Card
                    </Button>
                    
                    <Button
                      type="button"
                      variant={paymentMethod === "paypal" ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => setPaymentMethod("paypal")}
                    >
                      <Wallet className="mr-2 h-5 w-5" />
                      PayPal
                    </Button>
                    
                    <Button
                      type="button"
                      variant={paymentMethod === "cod" ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => setPaymentMethod("cod")}
                    >
                      <Banknote className="mr-2 h-5 w-5" />
                      Cash on Delivery
                    </Button>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-4 border-t border-border pt-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" required />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" required />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Gift Options */}
              <Card>
                <CardHeader>
                  <CardTitle>Gift Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="giftWrap" 
                      checked={giftWrap}
                      onCheckedChange={(checked) => setGiftWrap(checked as boolean)}
                    />
                    <label htmlFor="giftWrap" className="text-sm">
                      Add gift wrapping (+$4.99)
                    </label>
                  </div>
                  
                  {giftWrap && (
                    <div>
                      <Label htmlFor="giftMessage">Gift Message</Label>
                      <Textarea 
                        id="giftMessage" 
                        placeholder="Write a heartfelt message..."
                        rows={3}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} x{item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  
                  <div className="space-y-2 border-t border-border pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    {loyaltyDiscount > 0 && (
                      <div className="flex justify-between text-sm text-primary">
                        <span>Loyalty Discount ({loyaltyDiscount}%)</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{total > 50 ? 'FREE' : '$5.99'}</span>
                    </div>
                    {giftWrap && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Gift Wrap</span>
                        <span>$5.99</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between border-t border-border pt-4">
                    <span className="font-serif text-xl font-bold">Total</span>
                    <span className="font-serif text-2xl font-bold text-accent">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? "Processing..." : "Place Order"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
