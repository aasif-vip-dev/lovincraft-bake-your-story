import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, User, ArrowLeft, Heart } from "lucide-react";
import { blogPosts } from "@/data/mockData";
import SocialShare from "@/components/SocialShare";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="mb-4 font-serif text-4xl">Post Not Found</h1>
          <Link to="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <article className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Link to="/blog" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <Badge className="mb-4">{post.category}</Badge>
          <h1 className="mb-6 font-serif text-4xl font-bold text-foreground md:text-5xl">
            {post.title}
          </h1>
          
          <div className="mb-8 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Social Share */}
          <div className="mb-8 flex justify-center">
            <SocialShare
              url={`/blog/${post.slug}`}
              title={post.title}
              description={post.excerpt}
              image={post.image}
              hashtags={["LovinCraftLove", "BakeWithLove", "BakingTips"]}
            />
          </div>
        </div>

        {/* Featured Image */}
        <div className="mx-auto mb-12 max-w-4xl overflow-hidden rounded-lg shadow-card">
          <img 
            src={post.image} 
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="mx-auto max-w-3xl">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{
              color: 'hsl(var(--foreground))',
            }}
          />

          <Separator className="my-12" />

          {/* Tags */}
          <div className="mb-12">
            <h3 className="mb-4 font-semibold">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Author Card */}
          <Card className="mb-12 border-primary/20 bg-gradient-warm">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-serif font-bold text-primary-foreground">
                  {post.author.charAt(0)}
                </div>
                <div className="flex-1">
                  <h4 className="mb-2 font-serif text-xl font-bold">
                    About {post.author}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {post.author === "Mila & Aasif" 
                      ? "The founders of LovinCraft, sharing their journey of love, baking, and creating meaningful memories together."
                      : post.author === "Mila"
                      ? "Passionate baker and co-founder of LovinCraft. Believes every cake tells a story."
                      : "Master of flavors and co-founder of LovinCraft. Dedicated to making every baking experience special."
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Like & Comment Placeholder */}
          <div className="mb-12 flex items-center justify-between rounded-lg border border-border p-6">
            <div className="flex items-center gap-6">
              <Button variant="ghost" className="gap-2">
                <Heart className="h-5 w-5" />
                <span>Like this post</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mx-auto mt-20 max-w-6xl">
            <h2 className="mb-8 text-center font-serif text-3xl font-bold">
              Related Articles
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {relatedPosts.map(relatedPost => (
                <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`}>
                  <Card className="group h-full overflow-hidden shadow-card transition-smooth hover:shadow-soft">
                    <div className="aspect-video overflow-hidden bg-muted">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title}
                        className="h-full w-full object-cover transition-smooth group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-6">
                      <Badge variant="secondary" className="mb-3 text-xs">
                        {relatedPost.category}
                      </Badge>
                      <h3 className="mb-2 font-serif text-lg font-bold transition-colors group-hover:text-primary">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {relatedPost.excerpt.substring(0, 100)}...
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
