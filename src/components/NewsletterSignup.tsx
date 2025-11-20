import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Gift } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

interface NewsletterSignupProps {
  variant?: "default" | "inline";
  className?: string;
}

const emailSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
});

const NewsletterSignup = ({ variant = "default", className = "" }: NewsletterSignupProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const validation = emailSchema.safeParse({ email });
    
    if (!validation.success) {
      toast({
        title: "Invalid Email",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a unique discount code
      const discountCode = `LOVE${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      
      toast({
        title: "Welcome to LovinCraft! 🎉",
        description: (
          <div className="mt-2 space-y-2">
            <p>Thank you for subscribing to our newsletter!</p>
            <div className="rounded-md bg-primary/10 p-3">
              <p className="text-sm font-semibold">Your exclusive discount code:</p>
              <p className="font-mono text-lg font-bold text-primary">{discountCode}</p>
              <p className="text-xs text-muted-foreground">Save 15% on your first order!</p>
            </div>
          </div>
        ),
        duration: 8000,
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            disabled={isLoading}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    );
  }

  return (
    <div className={`rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 p-8 ${className}`}>
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-primary/20 p-3">
            <Gift className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h2 className="mb-2 font-serif text-3xl font-bold">
          Join Our Baking Community
        </h2>
        <p className="mb-6 text-muted-foreground">
          Subscribe to our newsletter and receive exclusive recipes, baking tips, 
          and a <span className="font-semibold text-primary">15% discount code</span> for your first order!
        </p>
        
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-md gap-2">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              disabled={isLoading}
            />
          </div>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isLoading ? "Subscribing..." : "Get My Code"}
          </Button>
        </form>
        
        <p className="mt-4 text-xs text-muted-foreground">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

export default NewsletterSignup;