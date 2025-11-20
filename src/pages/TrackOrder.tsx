import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockOrders } from "@/data/mockData";
import { Package, MapPin, Truck, CheckCircle, Clock, ArrowLeft } from "lucide-react";

const TrackOrder = () => {
  const { orderId } = useParams();
  const order = mockOrders.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-12">
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="mx-auto mb-4 h-16 w-16 text-muted" />
              <h2 className="mb-2 font-serif text-2xl font-bold">Order Not Found</h2>
              <p className="mb-6 text-muted-foreground">We couldn't find an order with that ID.</p>
              <Link to="/dashboard?tab=orders">
                <Button>View All Orders</Button>
              </Link>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in_transit':
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-600" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      default:
        return <Package className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'default';
      case 'shipped':
      case 'in_transit':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <Link to="/dashboard?tab=orders">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Orders
            </Button>
          </Link>
          <h1 className="font-serif text-4xl font-bold">Track Your Order</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <p className="font-semibold">{order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Order Date</p>
                  <p className="font-semibold">{order.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant={getStatusColor(order.status)}>
                    {order.status.toUpperCase()}
                  </Badge>
                </div>
                {order.trackingNumber && (
                  <div>
                    <p className="text-sm text-muted-foreground">Tracking Number</p>
                    <p className="font-mono text-sm font-semibold">{order.trackingNumber}</p>
                  </div>
                )}
                {order.tracking && (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">Carrier</p>
                      <p className="font-semibold">{order.tracking.carrier}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                      <p className="font-semibold">{order.tracking.estimatedDelivery}</p>
                    </div>
                  </>
                )}
                <div className="border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground">Shipping Address</p>
                  <p className="text-sm">{order.shippingAddress}</p>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Items in Order</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span>{item.name} x{item.quantity}</span>
                    <span className="font-semibold">${item.price.toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between border-t border-border pt-3 font-bold">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tracking Timeline */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Delivery Timeline</CardTitle>
                  {order.tracking && (
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.tracking.status)}
                      <span className="text-sm font-semibold">{order.tracking.currentLocation}</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {order.tracking ? (
                  <div className="space-y-6">
                    {order.tracking.timeline.map((event, index) => (
                      <div key={index} className="relative flex gap-4">
                        {/* Timeline Line */}
                        {index < order.tracking.timeline.length - 1 && (
                          <div className="absolute left-3 top-8 h-full w-0.5 bg-border" />
                        )}
                        
                        {/* Status Icon */}
                        <div className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full ${
                          event.completed ? 'bg-primary' : 'bg-muted'
                        }`}>
                          {event.completed ? (
                            <CheckCircle className="h-4 w-4 text-primary-foreground" />
                          ) : (
                            <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                          )}
                        </div>

                        {/* Event Details */}
                        <div className="flex-1 pb-8">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className={`font-semibold ${event.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {event.status}
                              </h3>
                              <p className="text-sm text-muted-foreground">{event.location}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">{event.date}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <MapPin className="mx-auto mb-4 h-12 w-12 text-muted" />
                    <p className="text-muted-foreground">Tracking information will be available once your order ships.</p>
                  </div>
                )}

                {/* Support Section */}
                <div className="mt-8 rounded-lg bg-muted/50 p-6">
                  <h3 className="mb-2 font-semibold">Need Help?</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    If you have any questions about your order or delivery, we're here to help!
                  </p>
                  <div className="flex gap-3">
                    <Link to="/contact">
                      <Button variant="outline" size="sm">Contact Support</Button>
                    </Link>
                    <Button variant="outline" size="sm">Report an Issue</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TrackOrder;