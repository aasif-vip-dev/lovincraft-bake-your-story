import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Gift } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
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
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const validation = emailSchema.safeParse({ email });
    
    if (!validation.success) {
      toast({
        title: t.newsletter.invalidEmail,
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
        title: t.newsletter.successTitle,
        description: (
          <div className="mt-2 space-y-2">
            <p>{t.newsletter.successMessage}</p>
            <div className="rounded-md bg-primary/10 p-3">
              <p className="text-sm font-semibold">{t.newsletter.discountLabel}</p>
              <p className="font-mono text-lg font-bold text-primary">{discountCode}</p>
              <p className="text-xs text-muted-foreground">{t.newsletter.discountInfo}</p>
            </div>
          </div>
        ),
        duration: 8000,
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: t.newsletter.errorTitle,
        description: t.newsletter.errorMessage,
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
            placeholder={t.newsletter.placeholderShort}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            disabled={isLoading}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? t.newsletter.subscribing : t.newsletter.subscribe}
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
          {t.newsletter.title}
        </h2>
        <p className="mb-6 text-muted-foreground">
          {t.newsletter.subtitle.replace("{discount}", t.newsletter.discount)}
        </p>
        
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-md gap-2">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="email"
              placeholder={t.newsletter.placeholder}
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
            {isLoading ? t.newsletter.subscribing : t.newsletter.submit}
          </Button>
        </form>
        
        <p className="mt-4 text-xs text-muted-foreground">
          {t.newsletter.privacy}
        </p>
      </div>
    </div>
  );
};

export default NewsletterSignup;