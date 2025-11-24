import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Droplets, Users, TreePine, Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/StatsCard";
import { ProjectCard } from "@/components/ProjectCard";
import { BlogCard } from "@/components/BlogCard";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Project, BlogPost } from "@shared/schema";

export default function Home() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: stats } = useQuery<{ wruas: number; projects: number; hectares: number; communities: number }>({
    queryKey: ['/api/stats'],
  });

  const { data: projects } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  const { data: blogPosts } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
  });

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "You've been subscribed to our newsletter.",
        });
        setEmail("");
      } else {
        throw new Error("Subscription failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center justify-center bg-gradient-to-br from-primary via-chart-4 to-primary overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/80"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Protecting Water Resources for
            <span className="block text-chart-3">Future Generations</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            A collaborative network of 30 Water Resource Users Associations working together
            to conserve and sustainably manage water resources in Kenya's Lake Victoria Basin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/portfolio">
              <Button size="lg" variant="secondary" className="text-base" data-testid="button-hero-projects">
                Explore Our Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-base bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
                data-testid="button-hero-contact"
              >
                Get Involved
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              icon={Users}
              value={stats?.wruas || 30}
              label="Water Resource User Associations"
              testId="stat-wruas"
            />
            <StatsCard
              icon={Droplets}
              value={stats?.projects || 45}
              label="Active Conservation Projects"
              trend="↑ 12% this year"
              testId="stat-projects"
            />
            <StatsCard
              icon={TreePine}
              value={`${stats?.hectares || '12,500'}+`}
              label="Hectares Restored"
              trend="↑ 2,300 this year"
              testId="stat-hectares"
            />
            <StatsCard
              icon={Building2}
              value={`${stats?.communities || '150'}+`}
              label="Communities Served"
              testId="stat-communities"
            />
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Projects</h2>
              <p className="text-muted-foreground">
                Discover our most impactful water conservation initiatives
              </p>
            </div>
            <Link href="/portfolio">
              <Button variant="outline" data-testid="button-view-all-projects">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects?.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                MaraSondu WRUAS Forum brings together 30 Water Resource Users Associations
                to collaboratively manage and protect the precious water resources of the
                Lake Victoria Basin in Kenya.
              </p>
              <p className="text-muted-foreground mb-6">
                Through community-led conservation, sustainable water management practices,
                and partnership with the Water Resources Authority, we're ensuring clean
                water access for current and future generations.
              </p>
              <Link href="/about">
                <Button variant="default" data-testid="button-learn-more">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
              <img
                src="https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800"
                alt="Community working together"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Latest News</h2>
              <p className="text-muted-foreground">
                Stay updated with our recent activities and announcements
              </p>
            </div>
            <Link href="/news">
              <Button variant="outline" data-testid="button-view-all-news">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts?.slice(0, 3).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-br from-primary to-chart-4">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Connected
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Subscribe to our newsletter for updates on conservation projects, events, and opportunities to get involved.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white/10 border-white/30 text-white placeholder:text-white/60 backdrop-blur-sm"
              data-testid="input-newsletter-email"
            />
            <Button
              type="submit"
              variant="secondary"
              disabled={isSubmitting}
              data-testid="button-newsletter-subscribe"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
