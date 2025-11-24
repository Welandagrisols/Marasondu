import { Users, Target, Heart, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Collaborative Management",
      description: "Working together across 30 WRUAs to protect our shared water resources through coordinated action and collective decision-making.",
    },
    {
      icon: Heart,
      title: "Community-Led",
      description: "Empowering local communities to take ownership of water conservation efforts and sustainable resource management.",
    },
    {
      icon: Award,
      title: "Evidence-Based",
      description: "Using data and scientific research to guide our conservation strategies and measure our impact.",
    },
    {
      icon: Users,
      title: "Inclusive Partnership",
      description: "Bringing together diverse stakeholders including farmers, fishers, pastoralists, and local authorities.",
    },
  ];

  const milestones = [
    {
      year: "2015",
      title: "Forum Established",
      description: "MaraSondu Stakeholders Forum was founded with 15 founding member associations.",
    },
    {
      year: "2017",
      title: "First Major Project",
      description: "Launched the Mara River Restoration Initiative, our largest conservation project to date.",
    },
    {
      year: "2019",
      title: "Network Expansion",
      description: "Grew to 30 member WRUAs covering the entire Lake Victoria Basin region.",
    },
    {
      year: "2021",
      title: "National Recognition",
      description: "Received the National Water Conservation Award from the Ministry of Water and Sanitation.",
    },
    {
      year: "2023",
      title: "12,500+ Hectares Restored",
      description: "Achieved major milestone in land restoration and riparian zone protection.",
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
            About Our Forum
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            A collaborative network protecting water resources in Kenya's Lake Victoria Basin
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Card data-testid="card-mission">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To collaboratively manage, conserve, and protect water resources in the
                  Lake Victoria Basin through community-led initiatives, sustainable practices,
                  and strategic partnerships with the Water Resources Authority and other stakeholders.
                </p>
              </CardContent>
            </Card>

            <Card data-testid="card-vision">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  A thriving Lake Victoria Basin where water resources are sustainably managed,
                  communities prosper, ecosystems flourish, and future generations have access
                  to clean, abundant water for all their needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our work and unite our 30 member associations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <Card key={idx} className="hover-elevate" data-testid={`card-value-${idx}`}>
                <CardContent className="p-6 text-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-muted-foreground">
              Key milestones in our mission to protect water resources
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block"></div>

            <div className="space-y-8">
              {milestones.map((milestone, idx) => (
                <div key={idx} className="relative flex gap-6" data-testid={`milestone-${idx}`}>
                  {/* Year badge */}
                  <div className="flex-shrink-0">
                    <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {milestone.year}
                    </div>
                  </div>

                  {/* Content */}
                  <Card className="flex-1 hover-elevate">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partnership */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Working with Water Resources Authority</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our forum works closely with the Water Resources Authority (WRA) to ensure
              compliance with national water management policies while implementing
              community-led conservation initiatives.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card data-testid="card-partnership-1">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">30</div>
                <div className="text-sm text-muted-foreground">
                  Registered WRUAs in our network
                </div>
              </CardContent>
            </Card>
            <Card data-testid="card-partnership-2">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">
                  Compliance with WRA regulations
                </div>
              </CardContent>
            </Card>
            <Card data-testid="card-partnership-3">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">15+</div>
                <div className="text-sm text-muted-foreground">
                  Joint conservation projects
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
