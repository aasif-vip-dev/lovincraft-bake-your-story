import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Users, Download, Printer, ChefHat, Lightbulb, Video } from "lucide-react";
import { recipes, products } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";

const Recipe = () => {
  const { id } = useParams();
  const recipe = recipes.find(r => r.id === Number(id));
  const product = recipe ? products.find(p => p.id === recipe.productId) : null;

  if (!recipe || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="mb-4 font-serif text-4xl">Recipe Not Found</h1>
          <Link to="/shop">
            <Button>Browse Products</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleDownloadPDF = () => {
    toast({
      title: "PDF Download",
      description: "Recipe PDF would be generated and downloaded here.",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-foreground">Shop</Link>
          <span>/</span>
          <Link to={`/product/${product.id}`} className="hover:text-foreground">{product.name}</Link>
          <span>/</span>
          <span className="text-foreground">Recipe</span>
        </div>

        {/* Recipe Header */}
        <div className="mb-12 text-center">
          <Badge className="mb-4" variant="secondary">{recipe.difficulty}</Badge>
          <h1 className="mb-4 font-serif text-5xl font-bold text-foreground">
            {recipe.name}
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            {recipe.description}
          </p>

          {/* Quick Stats */}
          <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <div className="font-semibold">Prep Time</div>
                <div className="text-muted-foreground">{recipe.prepTime}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-primary" />
              <div>
                <div className="font-semibold">Bake Time</div>
                <div className="text-muted-foreground">{recipe.bakeTime}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <div className="font-semibold">Servings</div>
                <div className="text-muted-foreground">{recipe.servings}</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button onClick={handleDownloadPDF} size="lg">
              <Download className="mr-2 h-5 w-5" />
              Download PDF
            </Button>
            <Button onClick={handlePrint} variant="outline" size="lg">
              <Printer className="mr-2 h-5 w-5" />
              Print Recipe
            </Button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Ingredients */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChefHat className="h-5 w-5" />
                  Ingredients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      <span className="text-sm">{ingredient}</span>
                    </li>
                  ))}
                </ul>

                <Separator className="my-6" />

                <div className="rounded-lg bg-primary/5 p-4">
                  <p className="text-sm font-semibold text-primary">
                    ✨ All kit ingredients included in {product.name}
                  </p>
                  <Link to={`/product/${product.id}`}>
                    <Button variant="link" className="mt-2 h-auto p-0">
                      View Product Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Instructions */}
          <div className="space-y-8 lg:col-span-2">
            {/* Video Tutorial */}
            {recipe.videoUrl && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    Video Tutorial
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                    <iframe
                      width="100%"
                      height="100%"
                      src={recipe.videoUrl}
                      title="Recipe Video Tutorial"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="border-0"
                    />
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Watch along as we guide you through each step of creating this special cake.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Step-by-Step Instructions */}
            <Card>
              <CardHeader>
                <CardTitle>Step-by-Step Instructions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {recipe.steps.map((step) => (
                  <div key={step.number} className="relative pl-12">
                    <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary font-serif font-bold text-primary-foreground">
                      {step.number}
                    </div>
                    
                    <div>
                      <h3 className="mb-2 font-serif text-xl font-semibold">
                        {step.title}
                      </h3>
                      <p className="mb-3 text-muted-foreground">
                        {step.description}
                      </p>
                      
                      {step.tip && (
                        <div className="flex items-start gap-2 rounded-lg bg-accent/10 p-3">
                          <Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                          <p className="text-sm">
                            <span className="font-semibold">Pro Tip:</span> {step.tip}
                          </p>
                        </div>
                      )}
                    </div>

                    {step.number < recipe.steps.length && (
                      <Separator className="mt-6" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Baker's Notes */}
            {recipe.notes && recipe.notes.length > 0 && (
              <Card className="border-primary/20 bg-gradient-warm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Baker's Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {recipe.notes.map((note, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Share Your Creation */}
            <Card className="text-center">
              <CardContent className="p-8">
                <h3 className="mb-2 font-serif text-2xl font-bold">
                  Made this recipe?
                </h3>
                <p className="mb-6 text-muted-foreground">
                  We'd love to see your creation! Share your photos and stories with the LovinCraft community.
                </p>
                <Button size="lg" variant="outline">
                  Share Your Story
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

export default Recipe;
