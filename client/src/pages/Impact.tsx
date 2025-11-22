import { useQuery } from "@tanstack/react-query";
import { Droplets, TreePine, Users, TrendingUp, Award, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/StatsCard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

export default function Impact() {
  const { data: stats } = useQuery<{ wruas: number; projects: number; hectares: number; communities: number }>({
    queryKey: ['/api/stats'],
  });

  const waterSavedData = [
    { month: "Jan", liters: 45000 },
    { month: "Feb", liters: 52000 },
    { month: "Mar", liters: 48000 },
    { month: "Apr", liters: 61000 },
    { month: "May", liters: 55000 },
    { month: "Jun", liters: 67000 },
  ];

  const sdgData = [
    { name: "SDG 6: Clean Water", value: 35, color: "hsl(var(--chart-1))" },
    { name: "SDG 13: Climate Action", value: 25, color: "hsl(var(--chart-2))" },
    { name: "SDG 14: Life Below Water", value: 20, color: "hsl(var(--chart-3))" },
    { name: "SDG 15: Life on Land", value: 20, color: "hsl(var(--chart-4))" },
  ];

  const successStories = [
    {
      title: "Mara River Restoration",
      location: "Mara Region",
      impact: "3,500 hectares of riparian land restored, benefiting 25 communities",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600",
    },
    {
      title: "Community Water Harvesting",
      location: "Sondu Region",
      impact: "45 rainwater harvesting systems installed, serving 8,000 residents",
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600",
    },
    {
      title: "Youth Training Program",
      location: "Nyando Region",
      impact: "500+ youth trained in sustainable water management practices",
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center justify-center bg-gradient-to-br from-primary via-chart-4 to-primary overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/60"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Impact
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Measuring the difference we're making in water conservation and community development
          </p>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              icon={Users}
              value={stats?.wruas || 30}
              label="Active WRUAs"
              trend="Network growing"
              testId="stat-wruas"
            />
            <StatsCard
              icon={Droplets}
              value={`${stats?.projects || 45}+`}
              label="Conservation Projects"
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
              icon={Target}
              value={`${stats?.communities || '150'}+`}
              label="Communities Impacted"
              testId="stat-communities"
            />
          </div>
        </div>
      </section>

      {/* Water Conservation Chart */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card data-testid="card-water-saved-chart">
            <CardHeader>
              <CardTitle>Water Conservation Trend</CardTitle>
              <p className="text-sm text-muted-foreground">
                Liters of water saved through conservation projects (2024)
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={waterSavedData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Bar dataKey="liters" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SDG Alignment */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">UN Sustainable Development Goals Alignment</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our projects contribute to multiple UN SDGs, with a primary focus on water and climate
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card data-testid="card-sdg-chart">
              <CardHeader>
                <CardTitle>Project Distribution by SDG</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={sdgData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {sdgData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--popover))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0.5rem",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {sdgData.map((sdg, idx) => (
                <Card key={idx} className="hover-elevate" data-testid={`card-sdg-${idx}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{sdg.name}</h3>
                        <div className="text-sm text-muted-foreground">
                          {sdg.value}% of our projects align with this goal
                        </div>
                      </div>
                      <div
                        className="h-12 w-12 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: sdg.color }}
                      >
                        <Award className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real impact from our conservation projects across the Lake Victoria Basin
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {successStories.map((story, idx) => (
              <Card key={idx} className="overflow-hidden hover-elevate" data-testid={`card-story-${idx}`}>
                <div className="aspect-video overflow-hidden bg-muted">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{story.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{story.location}</p>
                  <div className="flex items-start gap-2">
                    <TrendingUp className="h-5 w-5 text-chart-2 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{story.impact}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Metrics */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <Card data-testid="card-metric-training">
              <CardContent className="p-6 text-center">
                <div className="h-16 w-16 rounded-full bg-chart-2/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-chart-2" />
                </div>
                <div className="text-3xl font-bold mb-2">2,500+</div>
                <div className="text-sm text-muted-foreground">Community Members Trained</div>
              </CardContent>
            </Card>

            <Card data-testid="card-metric-partnerships">
              <CardContent className="p-6 text-center">
                <div className="h-16 w-16 rounded-full bg-chart-3/10 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-chart-3" />
                </div>
                <div className="text-3xl font-bold mb-2">15+</div>
                <div className="text-sm text-muted-foreground">Strategic Partnerships</div>
              </CardContent>
            </Card>

            <Card data-testid="card-metric-investment">
              <CardContent className="p-6 text-center">
                <div className="h-16 w-16 rounded-full bg-chart-4/10 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-chart-4" />
                </div>
                <div className="text-3xl font-bold mb-2">$2.5M+</div>
                <div className="text-sm text-muted-foreground">Total Investment in Projects</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
