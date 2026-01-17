import { useQuery } from "@tanstack/react-query";
import { Users, FileText, Droplets, DollarSign, Mail, MessageSquare, Loader2 } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BlogPost, ContactMessage } from "@shared/schema";

export default function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useQuery<{ wruas: number; projects: number; hectares: number; communities: number }>({
    queryKey: ['/api/stats'],
  });

  const { data: recentPosts, isLoading: postsLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
  });

  const { data: messages, isLoading: messagesLoading } = useQuery<ContactMessage[]>({
    queryKey: ['/api/admin/messages'],
  });

  if (statsLoading || postsLoading || messagesLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const unreadMessages = messages?.filter(m => !m.read).length || 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your website's content and activity
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon={Users}
          value={stats?.wruas || 30}
          label="Total WRUAs"
          testId="stat-wruas"
        />
        <StatsCard
          icon={Droplets}
          value={stats?.projects || 45}
          label="Active Projects"
          testId="stat-projects"
        />
        <StatsCard
          icon={FileText}
          value={recentPosts?.length || 0}
          label="Published Posts"
          testId="stat-posts"
        />
        <StatsCard
          icon={MessageSquare}
          value={unreadMessages}
          label="Unread Messages"
          trend={unreadMessages > 0 ? "Needs attention" : "All caught up"}
          testId="stat-messages"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Blog Posts */}
        <Card data-testid="card-recent-posts">
          <CardHeader>
            <CardTitle>Recent Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            {recentPosts && recentPosts.length > 0 ? (
              <div className="space-y-4">
                {recentPosts.slice(0, 5).map((post) => (
                  <div key={post.id} className="flex items-start justify-between gap-4 pb-4 border-b last:border-0">
                    <div className="flex-1">
                      <div className="font-medium line-clamp-1">{post.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {post.author} • {post.category}
                      </div>
                    </div>
                    <Badge variant={post.status === "published" ? "default" : "secondary"}>
                      {post.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No blog posts yet</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Messages */}
        <Card data-testid="card-recent-messages">
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
          </CardHeader>
          <CardContent>
            {messages && messages.length > 0 ? (
              <div className="space-y-4">
                {messages.slice(0, 5).map((message) => (
                  <div key={message.id} className="flex items-start justify-between gap-4 pb-4 border-b last:border-0">
                    <div className="flex-1">
                      <div className="font-medium line-clamp-1">{message.subject}</div>
                      <div className="text-sm text-muted-foreground">
                        {message.name} • {message.email}
                      </div>
                    </div>
                    {!message.read && (
                      <Badge variant="secondary">New</Badge>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No messages yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card data-testid="card-impact-stats">
        <CardHeader>
          <CardTitle>Impact Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">
                {stats?.hectares || '12,500'}+
              </div>
              <div className="text-sm text-muted-foreground">Hectares Restored</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">
                {stats?.communities || '150'}+
              </div>
              <div className="text-sm text-muted-foreground">Communities Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">2,500+</div>
              <div className="text-sm text-muted-foreground">People Trained</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">$2.5M+</div>
              <div className="text-sm text-muted-foreground">Project Investment</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
