import { Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import type { BlogPost } from "@shared/schema";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
  onClick?: () => void;
}

export function BlogCard({ post, featured = false, onClick }: BlogCardProps) {
  const formattedDate = format(new Date(post.publishedDate), "MMM dd, yyyy");

  if (featured) {
    return (
      <Card
        className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer md:col-span-2 lg:col-span-3"
        onClick={onClick}
        data-testid={`card-blog-featured-${post.id}`}
      >
        <div className="grid md:grid-cols-2 gap-6">
          {/* Image */}
          <div className="relative aspect-video md:aspect-auto overflow-hidden bg-muted">
            {post.featuredImage ? (
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-chart-3/20">
                <Calendar className="h-16 w-16 text-primary/40" />
              </div>
            )}
          </div>

          <CardContent className="p-6 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <Badge data-testid={`badge-category-${post.id}`}>{post.category}</Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span data-testid={`text-date-${post.id}`}>{formattedDate}</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-3 line-clamp-2" data-testid={`text-title-${post.id}`}>
              {post.title}
            </h2>

            <p className="text-muted-foreground mb-4 line-clamp-3">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-medium text-primary">
                  {post.author.charAt(0).toUpperCase()}
                </span>
              </div>
              <span data-testid={`text-author-${post.id}`}>{post.author}</span>
            </div>

            <Button variant="default" className="w-full sm:w-auto" data-testid={`button-read-${post.id}`}>
              Read Article
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer group"
      onClick={onClick}
      data-testid={`card-blog-${post.id}`}
    >
      {/* Image */}
      <div className="relative aspect-[3/2] overflow-hidden bg-muted">
        {post.featuredImage ? (
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-chart-3/20">
            <Calendar className="h-12 w-12 text-primary/40" />
          </div>
        )}
      </div>

      <CardContent className="p-6">
        {/* Category and date */}
        <div className="flex items-center gap-3 mb-3">
          <Badge variant="secondary" className="text-xs" data-testid={`badge-category-${post.id}`}>
            {post.category}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span data-testid={`text-date-${post.id}`}>{formattedDate}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-2" data-testid={`text-title-${post.id}`}>
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Author */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-medium text-primary">
                {post.author.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-sm text-muted-foreground" data-testid={`text-author-${post.id}`}>
              {post.author}
            </span>
          </div>
          <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
        </div>
      </CardContent>
    </Card>
  );
}
