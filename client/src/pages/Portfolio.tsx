import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Project } from "@shared/schema";

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedSDG, setSelectedSDG] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects', selectedCategory, selectedLocation, selectedSDG],
  });

  const categories = ["all", "Water Conservation", "Riparian Restoration", "Community Training", "Infrastructure"];
  const locations = ["all", "Mara Region", "Sondu Region", "Nyando Region", "Awach Region"];
  const sdgs = ["all", "6", "13", "14", "15"];

  const filteredProjects = projects?.filter((project) => {
    const categoryMatch = selectedCategory === "all" || project.category === selectedCategory;
    const locationMatch = selectedLocation === "all" || project.location.includes(selectedLocation.replace(" Region", ""));
    const sdgMatch = selectedSDG === "all" || project.sdgs?.includes(parseInt(selectedSDG));
    return categoryMatch && locationMatch && sdgMatch;
  });

  const sdgNames: Record<string, string> = {
    "6": "Clean Water & Sanitation",
    "13": "Climate Action",
    "14": "Life Below Water",
    "15": "Life on Land",
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center justify-center bg-gradient-to-br from-primary via-chart-4 to-primary overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/60"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Portfolio
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Explore our conservation projects across the Lake Victoria Basin
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Filter Projects</span>
            </div>
            
            <div className="flex flex-wrap gap-3 w-full sm:w-auto">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]" data-testid="select-category">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-[180px]" data-testid="select-location">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc === "all" ? "All Locations" : loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSDG} onValueChange={setSelectedSDG}>
                <SelectTrigger className="w-[180px]" data-testid="select-sdg">
                  <SelectValue placeholder="SDG" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All SDGs</SelectItem>
                  {sdgs.filter(s => s !== "all").map((sdg) => (
                    <SelectItem key={sdg} value={sdg}>
                      SDG {sdg}: {sdgNames[sdg]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {(selectedCategory !== "all" || selectedLocation !== "all" || selectedSDG !== "all") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedLocation("all");
                    setSelectedSDG("all");
                  }}
                  data-testid="button-clear-filters"
                >
                  Clear Filters
                  <X className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Active filters */}
          <div className="flex flex-wrap gap-2 mt-3">
            {selectedCategory !== "all" && (
              <Badge variant="secondary" data-testid="badge-filter-category">
                Category: {selectedCategory}
              </Badge>
            )}
            {selectedLocation !== "all" && (
              <Badge variant="secondary" data-testid="badge-filter-location">
                Location: {selectedLocation}
              </Badge>
            )}
            {selectedSDG !== "all" && (
              <Badge variant="secondary" data-testid="badge-filter-sdg">
                SDG {selectedSDG}
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 bg-background flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-muted-foreground" data-testid="text-project-count">
              Showing {filteredProjects?.length || 0} projects
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-muted animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : filteredProjects && filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects found matching your filters.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedLocation("all");
                  setSelectedSDG("all");
                }}
                className="mt-4"
                data-testid="button-reset-filters"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-testid="dialog-project-detail">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Image */}
                {selectedProject.imageUrl && (
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                    <img
                      src={selectedProject.imageUrl}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Quick facts */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Category</div>
                    <div className="font-medium">{selectedProject.category}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Location</div>
                    <div className="font-medium">{selectedProject.location}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Status</div>
                    <Badge>{selectedProject.status}</Badge>
                  </div>
                  {selectedProject.timeline && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Timeline</div>
                      <div className="font-medium">{selectedProject.timeline}</div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold text-lg mb-2">Project Description</h3>
                  <p className="text-muted-foreground">{selectedProject.description}</p>
                </div>

                {/* Impact Metrics */}
                {selectedProject.impactMetrics && Object.keys(selectedProject.impactMetrics).length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Impact Metrics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.entries(selectedProject.impactMetrics).map(([key, value]) => (
                        <div key={key} className="p-4 bg-muted rounded-lg text-center">
                          <div className="text-2xl font-bold text-primary mb-1">{value}</div>
                          <div className="text-sm text-muted-foreground capitalize">
                            {key.replace(/_/g, ' ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SDGs */}
                {selectedProject.sdgs && selectedProject.sdgs.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3">UN Sustainable Development Goals</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.sdgs.map((sdg) => (
                        <Badge key={sdg} variant="outline" className="text-sm">
                          SDG {sdg}: {sdgNames[sdg.toString()] || "Goal"}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
