import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Package, Heart, User, MapPin, ShoppingCart, X, Award, Star, Gift } from "lucide-react";
import { Share2 } from "lucide-react";
import { mockOrders } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import LoyaltyCard from "@/components/LoyaltyCard";
import ReferralCard from "@/components/ReferralCard";

const Dashboard = () => {
  const { user } = useAuth();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "orders";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <h1 className="mb-8 font-serif text-4xl font-bold">My Dashboard</h1>

        {/* Loyalty Card */}
        <div className="mb-8">
          <LoyaltyCard />
        </div>

        <Tabs defaultValue={defaultTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto">
            <TabsTrigger value="orders">
              <Package className="mr-2 h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="wishlist">
              <Heart className="mr-2 h-4 w-4" />
              Wishlist
            </TabsTrigger>
            <TabsTrigger value="rewards">
              <Award className="mr-2 h-4 w-4" />
              Rewards
            </TabsTrigger>
            <TabsTrigger value="profile">
              <User className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="addresses">
              <MapPin className="mr-2 h-4 w-4" />
              Addresses
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            {mockOrders.map(order => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Order {order.id}</CardTitle>
                    <Badge variant={order.status === "delivered" ? "default" : order.status === "shipped" ? "secondary" : "outline"}>
                      {order.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span>{item.name} x{item.quantity}</span>
                      <span>${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between border-t border-border pt-4 font-semibold">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                  {order.trackingNumber && (
                    <div className="flex items-center justify-between rounded-md bg-muted p-3">
                      <span className="text-sm">Tracking: {order.trackingNumber}</span>
                      <Button variant="link" size="sm" asChild>
                        <a href={`/track-order/${order.id}`}>Track Order</a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist">
            {wishlist.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Heart className="mx-auto mb-4 h-16 w-16 text-muted" />
                  <h3 className="mb-2 font-serif text-2xl font-bold">Your Wishlist is Empty</h3>
                  <p className="mb-4 text-muted-foreground">Start adding items you love!</p>
                  <Button asChild>
                    <Link to="/shop">Browse Products</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {wishlist.map((item) => (
                  <Card key={item.id} className="group overflow-hidden">
                    <Link to={`/product/${item.id}`}>
                      <CardHeader className="p-0">
                        <div className="aspect-square overflow-hidden bg-muted">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="h-full w-full object-cover transition-smooth group-hover:scale-105"
                          />
                        </div>
                      </CardHeader>
                      
                      <CardContent className="p-4">
                        <h3 className="mb-2 font-serif text-lg font-semibold">
                          {item.name}
                        </h3>
                        <p className="mb-2 text-sm text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>
                        <p className="font-serif text-xl font-bold text-accent">
                          ${item.price.toFixed(2)}
                        </p>
                      </CardContent>
                    </Link>
                    
                    <CardFooter className="gap-2 p-4 pt-0">
                      <Button 
                        className="flex-1"
                        onClick={() => {
                          addToCart(item);
                          toast({
                            title: "Added to cart",
                            description: `${item.name} has been added to your cart.`,
                          });
                        }}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => {
                          removeFromWishlist(item.id);
                          toast({
                            title: "Removed from wishlist",
                            description: `${item.name} has been removed from your wishlist.`,
                          });
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <LoyaltyCard />
              <ReferralCard />
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Ways to Earn Points</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                    <ShoppingCart className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold">Make a Purchase</div>
                      <div className="text-sm text-muted-foreground">1 point per $1 spent</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                    <Star className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold">Write a Review</div>
                      <div className="text-sm text-muted-foreground">50 points per review</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                    <Share2 className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold">Share on Social</div>
                      <div className="text-sm text-muted-foreground">25 points per share</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                    <Gift className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold">Refer a Friend</div>
                      <div className="text-sm text-muted-foreground">100 bonus points</div>
                    </div>
                  </div>
                </div>
                
                <Button asChild>
                  <Link to="/shop">Start Shopping & Earning</Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={user?.name} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user?.email} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" defaultValue={user?.phone} />
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Saved Addresses</CardTitle>
                  <Button>Add New Address</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-semibold">Home</span>
                    <Badge>Default</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    123 Love Street<br />
                    Romance City, RC 12345<br />
                    United States
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
