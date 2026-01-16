import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Calendar, ArrowLeft, User } from "lucide-react";
import { BlogCard } from "@/components/BlogCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { format } from "date-fns";
import type { BlogPost } from "@shared/schema";

export default function News() {
  const [, params] = useRoute("/news/:slug");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
  });

  // If we're viewing a specific post
  if (params?.slug) {
    const { data: post, isLoading: postLoading } = useQuery<BlogPost>({
      queryKey: ['/api/blog', params.slug],
    });

    if (postLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading article...</p>
          </div>
        </div>
      );
    }

    if (!post) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Article not found</h1>
            <Link href="/news">
              <Button>Back to News</Button>
            </Link>
          </div>
        </div>
      );
    }

    const formattedDate = format(new Date(post.publishedDate), "MMMM dd, yyyy");

    return (
      <div className="flex flex-col min-h-screen">
        {/* Article Hero */}
        <section className="py-12 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/news">
              <Button variant="ghost" size="sm" className="mb-6" data-testid="button-back-to-news">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to News
              </Button>
            </Link>

            <div className="mb-6">
              <Badge className="mb-4" data-testid="badge-category">{post.category}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-title">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span data-testid="text-author">{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span data-testid="text-date">{formattedDate}</span>
                </div>
              </div>
            </div>

            {post.featuredImage && (
              <div className="aspect-video rounded-lg overflow-hidden bg-muted mb-8">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="prose prose-lg max-w-none" data-testid="article-content">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t">
                <div className="text-sm font-medium text-muted-foreground mb-3">Tags</div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  // Blog listing page
  const categories = ["all", "Conservation", "Community", "Training", "Partnerships", "Events"];

  const filteredPosts = blogPosts?.filter((post) => {
    const categoryMatch = selectedCategory === "all" || post.category === selectedCategory;
    const searchMatch = searchTerm === "" ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const featuredPost = filteredPosts?.[0];
  const otherPosts = filteredPosts?.slice(1);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center bg-gradient-to-br from-primary via-chart-4 to-primary overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/60"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12 md:py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            News & Updates
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Stay informed about our latest conservation projects, events, and community initiatives
          </p>
        </div>
      </section>

      {/* Filter and Search */}
      <section className="py-8 bg-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  data-testid={`button-category-${cat}`}
                >
                  {cat === "all" ? "All" : cat}
                </Button>
              ))}
            </div>

            <Input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64"
              data-testid="input-search"
            />
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 bg-background flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-muted animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : filteredPosts && filteredPosts.length > 0 ? (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6">Featured Article</h2>
                  <BlogCard
                    post={featuredPost}
                    featured
                    onClick={() => window.location.href = `/news/${featuredPost.slug}`}
                  />
                </div>
              )}

              {/* Other Posts */}
              {otherPosts && otherPosts.length > 0 && (
                <>
                  <h2 className="text-2xl font-bold mb-6">Recent Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherPosts.map((post) => (
                      <BlogCard
                        key={post.id}
                        post={post}
                        onClick={() => window.location.href = `/news/${post.slug}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
