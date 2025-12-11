import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Lock, User, Phone } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";

const Auth = () => {
  const { login, signup } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const from = (location.state as any)?.from?.pathname || "/dashboard";

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await login(email, password);
      toast({ title: t.common.success, description: t.auth.loginTitle });
      navigate(from, { replace: true });
    } catch (error) {
      toast({ title: t.common.error, description: t.errors.generic, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await signup(name, email, password);
      toast({ title: t.common.success, description: t.auth.signupTitle });
      navigate(from, { replace: true });
    } catch (error) {
      toast({ title: t.common.error, description: t.errors.generic, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle className="text-center font-serif text-3xl">{t.auth.welcome}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">{t.auth.loginTitle}</TabsTrigger>
                <TabsTrigger value="signup">{t.auth.signupTitle}</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email">{t.auth.email}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="login-email" 
                        name="email"
                        type="email" 
                        placeholder="your@email.com"
                        className="pl-9"
                        required 
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="login-password">{t.auth.password}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="login-password" 
                        name="password"
                        type="password" 
                        placeholder="••••••••"
                        className="pl-9"
                        required 
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? t.common.loading : t.auth.loginBtn}
                  </Button>

                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">{t.auth.orContinueWith}</span>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Button type="button" variant="outline" disabled>Google</Button>
                    <Button type="button" variant="outline" disabled>Facebook</Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <Label htmlFor="signup-name">{t.auth.name}</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="signup-name" 
                        name="name"
                        placeholder="Your Name"
                        className="pl-9"
                        required 
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signup-email">{t.auth.email}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="signup-email" 
                        name="email"
                        type="email" 
                        placeholder="your@email.com"
                        className="pl-9"
                        required 
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signup-password">{t.auth.password}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="signup-password" 
                        name="password"
                        type="password" 
                        placeholder="••••••••"
                        className="pl-9"
                        required 
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? t.common.loading : t.auth.signupBtn}
                  </Button>

                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">{t.auth.orContinueWith}</span>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Button type="button" variant="outline" disabled>Google</Button>
                    <Button type="button" variant="outline" disabled>Facebook</Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Auth;