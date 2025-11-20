import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/mockData";

const Blog = () => {
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 font-serif text-5xl font-bold text-foreground">
            The LovinCraft Blog
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Baking tips, gift ideas, love stories, and everything in between. 
            Join us on our journey of creating sweet memories.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          <Badge variant="secondary" className="cursor-pointer px-4 py-2">
            All Posts
          </Badge>
          {categories.map(category => (
            <Badge 
              key={category} 
              variant="outline" 
              className="cursor-pointer px-4 py-2 transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Featured Post */}
        {blogPosts.length > 0 && (
          <Link to={`/blog/${blogPosts[0].slug}`} className="mb-16 block">
            <Card className="group overflow-hidden shadow-card transition-smooth hover:shadow-soft lg:flex">
              <div className="lg:w-1/2">
                <div className="aspect-video overflow-hidden bg-muted lg:h-full lg:aspect-auto">
                  <img 
                    src={blogPosts[0].image} 
                    alt={blogPosts[0].title}
                    className="h-full w-full object-cover transition-smooth group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center lg:w-1/2">
                <CardHeader>
                  <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <Badge>{blogPosts[0].category}</Badge>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {blogPosts[0].date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {blogPosts[0].readTime}
                    </div>
                  </div>
                  <h2 className="mb-4 font-serif text-3xl font-bold transition-colors group-hover:text-primary lg:text-4xl">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-muted-foreground">
                    {blogPosts[0].excerpt}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 font-medium text-primary">
                    Read Full Story
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </div>
            </Card>
          </Link>
        )}

        {/* Blog Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(1).map(post => (
            <Link key={post.id} to={`/blog/${post.slug}`}>
              <Card className="group h-full overflow-hidden shadow-card transition-smooth hover:shadow-soft">
                <CardHeader className="p-0">
                  <div className="aspect-video overflow-hidden bg-muted">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="h-full w-full object-cover transition-smooth group-hover:scale-105"
                    />
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <h3 className="mb-3 font-serif text-xl font-bold transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                  
                  <p className="mb-4 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4" />
                    <span className="text-muted-foreground">By {post.author}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Newsletter CTA */}
        <Card className="mt-16 border-primary/20 bg-gradient-warm text-center">
          <CardContent className="p-12">
            <h2 className="mb-4 font-serif text-3xl font-bold">
              Never Miss a Post
            </h2>
            <p className="mb-6 text-muted-foreground">
              Subscribe to our newsletter for baking tips, recipes, and heartfelt stories delivered to your inbox.
            </p>
            <div className="mx-auto flex max-w-md gap-2">
              <input 
                type="email" 
                placeholder="your@email.com"
                className="flex-1 rounded-md border border-border bg-background px-4 py-2"
              />
              <button className="rounded-md bg-primary px-6 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                Subscribe
              </button>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
