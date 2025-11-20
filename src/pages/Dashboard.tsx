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
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Package, Heart, User, MapPin, ShoppingCart, X, Award, Star, Gift, Ticket as TicketIcon, Plus, Edit, Trash2, Calendar, DollarSign, Activity } from "lucide-react";
import { Share2 } from "lucide-react";
import { mockOrders } from "@/data/mockData";
import RatingComponent from "@/components/RatingComponent";
import { useAuth } from "@/contexts/AuthContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { useSupport } from "@/contexts/SupportContext";
import { useLoyalty } from "@/contexts/LoyaltyContext";
import { toast } from "@/hooks/use-toast";
import LoyaltyCard from "@/components/LoyaltyCard";
import ReferralCard from "@/components/ReferralCard";

const Dashboard = () => {
  const { user } = useAuth();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { tickets, rateTicket } = useSupport();
  const { points, withdrawPoints } = useLoyalty();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "profile";
  
  // Local state for addresses, orders, tickets
  const [addresses, setAddresses] = useState([
    { id: 1, label: "Home", address: "123 Love Street", city: "Romance City", state: "RC", zip: "12345", country: "United States", isDefault: true }
  ]);
  const [orders, setOrders] = useState(mockOrders);
  const [localTickets, setLocalTickets] = useState(tickets);
  
  // Dialog states
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [isEditTicketOpen, setIsEditTicketOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<any>(null);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  
  // New address form
  const [newAddress, setNewAddress] = useState({
    label: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States"
  });
  
  // Profile customization
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: "",
    dateOfBirth: "",
    anniversary: "",
    preferences: {
      newsletter: true,
      promotions: true,
      orderUpdates: true
    }
  });
  
  const handleAddAddress = () => {
    if (!newAddress.label || !newAddress.address || !newAddress.city) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    
    const newAddr = {
      id: addresses.length + 1,
      ...newAddress,
      isDefault: addresses.length === 0
    };
    
    setAddresses([...addresses, newAddr]);
    setNewAddress({ label: "", address: "", city: "", state: "", zip: "", country: "United States" });
    setIsAddAddressOpen(false);
    toast({ title: "Success", description: "Address added successfully!" });
  };
  
  const handleDeleteAddress = (id: number) => {
    setAddresses(addresses.filter(a => a.id !== id));
    toast({ title: "Success", description: "Address deleted successfully!" });
  };
  
  const handleSetDefaultAddress = (id: number) => {
    setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })));
    toast({ title: "Success", description: "Default address updated!" });
  };
  
  const handleCancelOrder = (orderId: string) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: "cancelled" } : o));
    toast({ title: "Order Cancelled", description: `Order ${orderId} has been cancelled.` });
  };
  
  const handleCancelTicket = (ticketId: string) => {
    setLocalTickets(localTickets.map(t => t.id === ticketId ? { ...t, status: "cancelled" } : t));
    toast({ title: "Ticket Cancelled", description: `Support ticket ${ticketId} has been cancelled.` });
  };
  
  const handleEditTicket = (ticket: any) => {
    setEditingTicket(ticket);
    setIsEditTicketOpen(true);
  };
  
  const handleUpdateTicket = () => {
    if (editingTicket) {
      setLocalTickets(localTickets.map(t => t.id === editingTicket.id ? editingTicket : t));
      setIsEditTicketOpen(false);
      toast({ title: "Success", description: "Ticket updated successfully!" });
    }
  };
  
  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({ title: "Error", description: "Please enter a valid amount", variant: "destructive" });
      return;
    }
    
    const pointsNeeded = amount * 100; // $1 = 100 points
    if (pointsNeeded > points) {
      toast({ title: "Error", description: "Insufficient points", variant: "destructive" });
      return;
    }
    
    withdrawPoints(pointsNeeded);
    setWithdrawAmount("");
    setIsWithdrawOpen(false);
    toast({ 
      title: "Withdrawal Successful!", 
      description: `$${amount.toFixed(2)} will be credited to your account within 3-5 business days.` 
    });
  };
  
  const handleSaveProfile = () => {
    toast({ title: "Profile Updated", description: "Your profile has been saved successfully!" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue={defaultTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 gap-2 h-auto bg-muted/50 p-2 rounded-lg">
            <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <User className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Package className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Heart className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Wishlist</span>
            </TabsTrigger>
            <TabsTrigger value="rewards" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Award className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Rewards</span>
            </TabsTrigger>
            <TabsTrigger value="tickets" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <TicketIcon className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Tickets</span>
            </TabsTrigger>
            <TabsTrigger value="addresses" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <MapPin className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Addresses</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab - Now First */}
          <TabsContent value="profile" className="space-y-6">
            {/* Profile Header Card */}
            <Card className="gradient-warm border-primary/20">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-3xl font-serif shadow-soft">
                      {user?.name?.charAt(0) || "U"}
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                      <Activity className="h-4 w-4 text-accent-foreground" />
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="font-serif text-3xl font-bold text-foreground mb-1">{profileData.name}</h2>
                    <p className="text-muted-foreground mb-3">{profileData.email}</p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      <Badge variant="secondary" className="gap-1">
                        <Award className="h-3 w-3" /> {points} Points
                      </Badge>
                      <Badge variant="outline" className="gap-1">
                        <Package className="h-3 w-3" /> {orders.length} Orders
                      </Badge>
                      <Badge variant="outline" className="gap-1">
                        <Heart className="h-3 w-3" /> {wishlist.length} Saved
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input 
                      id="dob" 
                      type="date" 
                      value={profileData.dateOfBirth}
                      onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="anniversary">Anniversary Date</Label>
                    <Input 
                      id="anniversary" 
                      type="date" 
                      value={profileData.anniversary}
                      onChange={(e) => setProfileData({ ...profileData, anniversary: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio" 
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      placeholder="Tell us about yourself..."
                      rows={3}
                    />
                  </div>
                </div>
                <Button onClick={handleSaveProfile} className="w-full md:w-auto">
                  <User className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Newsletter</p>
                    <p className="text-sm text-muted-foreground">Receive our weekly baking tips</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={profileData.preferences.newsletter}
                    onChange={(e) => setProfileData({
                      ...profileData, 
                      preferences: { ...profileData.preferences, newsletter: e.target.checked }
                    })}
                    className="h-4 w-4"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Promotions</p>
                    <p className="text-sm text-muted-foreground">Special offers and discounts</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={profileData.preferences.promotions}
                    onChange={(e) => setProfileData({
                      ...profileData, 
                      preferences: { ...profileData.preferences, promotions: e.target.checked }
                    })}
                    className="h-4 w-4"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Order Updates</p>
                    <p className="text-sm text-muted-foreground">Track your order status</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={profileData.preferences.orderUpdates}
                    onChange={(e) => setProfileData({
                      ...profileData, 
                      preferences: { ...profileData.preferences, orderUpdates: e.target.checked }
                    })}
                    className="h-4 w-4"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            {orders.map(order => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Order {order.id}</CardTitle>
                    <div className="flex gap-2">
                      <Badge variant={
                        order.status === "delivered" ? "default" : 
                        order.status === "cancelled" ? "destructive" :
                        order.status === "shipped" ? "secondary" : "outline"
                      }>
                        {order.status.toUpperCase()}
                      </Badge>
                    </div>
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
                  {order.status === "processing" && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm" className="w-full">
                          <X className="mr-2 h-4 w-4" />
                          Cancel Order
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Cancel Order?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to cancel order {order.id}? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Keep Order</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleCancelOrder(order.id)}>
                            Yes, Cancel
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
            {/* Withdraw Points Section */}
            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Withdraw Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Convert your loyalty points to cash! 100 points = $1.00
                </p>
                <div className="flex items-center gap-2 p-4 bg-muted rounded-lg mb-4">
                  <Award className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">{points} Points Available</p>
                    <p className="text-sm text-muted-foreground">≈ ${(points / 100).toFixed(2)} USD</p>
                  </div>
                </div>
                <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full" disabled={points < 100}>
                      <DollarSign className="mr-2 h-4 w-4" />
                      Withdraw to Bank Account
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Withdraw Points</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="amount">Withdrawal Amount (USD)</Label>
                        <Input
                          id="amount"
                          type="number"
                          step="0.01"
                          min="1"
                          max={(points / 100).toString()}
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                          placeholder="0.00"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Required points: {parseFloat(withdrawAmount || "0") * 100}
                        </p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsWithdrawOpen(false)}>Cancel</Button>
                      <Button onClick={handleWithdraw}>Confirm Withdrawal</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
            
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

          {/* Support Tickets Tab */}
          <TabsContent value="tickets" className="space-y-4">
            {localTickets.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <TicketIcon className="mx-auto mb-4 h-12 w-12 text-muted" />
                  <h3 className="mb-2 font-serif text-xl font-bold">No support tickets</h3>
                  <p className="text-muted-foreground">
                    Use the chat widget to create a support ticket when you need help!
                  </p>
                </CardContent>
              </Card>
            ) : (
              localTickets.map(ticket => (
                <Card key={ticket.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{ticket.subject}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Ticket {ticket.id} • {new Date(ticket.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge 
                        variant={
                          ticket.status === "resolved" ? "default" : 
                          ticket.status === "cancelled" ? "destructive" :
                          ticket.status === "in-progress" ? "secondary" : "outline"
                        }
                      >
                        {ticket.status.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm text-muted-foreground">{ticket.description}</p>
                    <div className="space-y-3">
                      <div className="rounded-lg bg-muted/30 p-3">
                        <p className="text-sm">
                          <strong>Contact:</strong> {ticket.email}
                        </p>
                        <p className="text-sm">
                          <strong>Last Updated:</strong> {new Date(ticket.updatedAt).toLocaleString()}
                        </p>
                      </div>
                      
                      {/* Ticket Actions */}
                      {ticket.status === "open" && (
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditTicket(ticket)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm">
                                <X className="mr-2 h-4 w-4" />
                                Cancel
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Cancel Ticket?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to cancel this support ticket? You can create a new one if needed.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Keep Ticket</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleCancelTicket(ticket.id)}>
                                  Yes, Cancel
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      )}
                      
                      {/* Ticket Rating */}
                      {ticket.status === "resolved" && (
                        <div>
                          <p className="mb-2 text-sm font-medium">Rate your support experience:</p>
                          <RatingComponent
                            onRate={(rating, feedback) => {
                              rateTicket(ticket.id, rating, feedback);
                              toast({
                                title: "Thank you for your feedback! 💝",
                                description: "Your rating helps us improve our support.",
                              });
                            }}
                            currentRating={ticket.rating}
                            currentFeedback={ticket.ratingFeedback}
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
            
            {/* Edit Ticket Dialog */}
            <Dialog open={isEditTicketOpen} onOpenChange={setIsEditTicketOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Support Ticket</DialogTitle>
                </DialogHeader>
                {editingTicket && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="edit-subject">Subject</Label>
                      <Input
                        id="edit-subject"
                        value={editingTicket.subject}
                        onChange={(e) => setEditingTicket({ ...editingTicket, subject: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-description">Description</Label>
                      <Textarea
                        id="edit-description"
                        value={editingTicket.description}
                        onChange={(e) => setEditingTicket({ ...editingTicket, description: e.target.value })}
                        rows={4}
                      />
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsEditTicketOpen(false)}>Cancel</Button>
                  <Button onClick={handleUpdateTicket}>Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>


          {/* Addresses Tab */}
          <TabsContent value="addresses">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Saved Addresses</CardTitle>
                  <Dialog open={isAddAddressOpen} onOpenChange={setIsAddAddressOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Address
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Address</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="label">Label *</Label>
                          <Input
                            id="label"
                            value={newAddress.label}
                            onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                            placeholder="e.g., Home, Office"
                          />
                        </div>
                        <div>
                          <Label htmlFor="address">Street Address *</Label>
                          <Input
                            id="address"
                            value={newAddress.address}
                            onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                            placeholder="123 Love Street"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="city">City *</Label>
                            <Input
                              id="city"
                              value={newAddress.city}
                              onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                              placeholder="Romance City"
                            />
                          </div>
                          <div>
                            <Label htmlFor="state">State</Label>
                            <Input
                              id="state"
                              value={newAddress.state}
                              onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                              placeholder="RC"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="zip">ZIP Code</Label>
                            <Input
                              id="zip"
                              value={newAddress.zip}
                              onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })}
                              placeholder="12345"
                            />
                          </div>
                          <div>
                            <Label htmlFor="country">Country</Label>
                            <Input
                              id="country"
                              value={newAddress.country}
                              onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddAddressOpen(false)}>Cancel</Button>
                        <Button onClick={handleAddAddress}>Add Address</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {addresses.map((address) => (
                  <div key={address.id} className="rounded-lg border border-border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{address.label}</span>
                        {address.isDefault && <Badge>Default</Badge>}
                      </div>
                      <div className="flex gap-2">
                        {!address.isDefault && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleSetDefaultAddress(address.id)}
                          >
                            Set Default
                          </Button>
                        )}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Address?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this address? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteAddress(address.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {address.address}<br />
                      {address.city}, {address.state} {address.zip}<br />
                      {address.country}
                    </p>
                  </div>
                ))}
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
