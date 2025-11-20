import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Gift, Copy, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useGiftRegistry } from "@/contexts/GiftRegistryContext";
import { toast } from "@/hooks/use-toast";

const GiftRegistry = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { createRegistry, getUserRegistries } = useGiftRegistry();
  const [name, setName] = useState("");
  const [occasion, setOccasion] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState("");

  const userRegistries = isAuthenticated && user 
    ? getUserRegistries(user.email || "") 
    : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please log in to create a gift registry",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (!name || !occasion || !date) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const shareCode = createRegistry({
      name,
      occasion,
      date,
      createdBy: user?.email || "",
      message,
    });

    toast({
      title: "Registry created! 🎉",
      description: `Share code: ${shareCode}`,
    });

    setName("");
    setOccasion("");
    setDate("");
    setMessage("");
  };

  const copyShareCode = (code: string) => {
    const shareUrl = `${window.location.origin}/registry/${code}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(code);
    toast({
      title: "Link copied!",
      description: "Share this link with friends and family",
    });
    setTimeout(() => setCopied(""), 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-12">
          <Card>
            <CardContent className="p-12 text-center">
              <Gift className="mx-auto mb-4 h-16 w-16 text-muted" />
              <h2 className="mb-2 font-serif text-2xl font-bold">Login Required</h2>
              <p className="mb-6 text-muted-foreground">
                Please log in to create and manage gift registries
              </p>
              <Button onClick={() => navigate("/auth")}>Log In</Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="mb-4 font-serif text-5xl font-bold">Gift Registry</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Create a registry for your special occasion and share it with loved ones
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Create Registry Form */}
          <Card>
            <CardHeader>
              <CardTitle>Create New Registry</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Registry Name *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Sarah & John's Wedding"
                  />
                </div>

                <div>
                  <Label htmlFor="occasion">Occasion *</Label>
                  <Select value={occasion} onValueChange={setOccasion}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select occasion" />
                    </SelectTrigger>
                    <SelectContent className="bg-background">
                      <SelectItem value="wedding">Wedding</SelectItem>
                      <SelectItem value="anniversary">Anniversary</SelectItem>
                      <SelectItem value="birthday">Birthday</SelectItem>
                      <SelectItem value="housewarming">Housewarming</SelectItem>
                      <SelectItem value="baby-shower">Baby Shower</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="date">Event Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="message">Personal Message (Optional)</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share a special message with your guests..."
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Gift className="mr-2 h-4 w-4" />
                  Create Registry
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Your Registries */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold">Your Registries</h2>
            {userRegistries.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Gift className="mx-auto mb-4 h-12 w-12 text-muted" />
                  <p className="text-muted-foreground">No registries yet</p>
                </CardContent>
              </Card>
            ) : (
              userRegistries.map((registry) => (
                <Card key={registry.id}>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="mb-1 font-serif text-xl font-bold">{registry.name}</h3>
                      <p className="text-sm text-muted-foreground capitalize">
                        {registry.occasion} • {new Date(registry.date).toLocaleDateString()}
                      </p>
                    </div>

                    {registry.message && (
                      <p className="mb-4 text-sm italic text-muted-foreground">
                        "{registry.message}"
                      </p>
                    )}

                    <div className="mb-4 rounded-lg bg-muted p-3">
                      <div className="mb-1 text-xs font-semibold uppercase text-muted-foreground">
                        Share Code
                      </div>
                      <div className="flex items-center justify-between">
                        <code className="font-mono text-lg font-bold">{registry.shareCode}</code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyShareCode(registry.shareCode)}
                        >
                          {copied === registry.shareCode ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => navigate(`/registry/${registry.shareCode}`)}
                      >
                        View Registry
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => navigate(`/registry/${registry.shareCode}/manage`)}
                      >
                        Manage
                      </Button>
                    </div>

                    <div className="mt-4 text-sm text-muted-foreground">
                      {registry.items.length} items • {registry.items.reduce((sum, item) => sum + item.purchased, 0)} purchased
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GiftRegistry;