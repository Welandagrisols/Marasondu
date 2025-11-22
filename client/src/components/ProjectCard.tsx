import { MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const sdgMap: Record<number, string> = {
    6: "Clean Water",
    13: "Climate Action",
    14: "Life Below Water",
    15: "Life on Land",
  };

  return (
    <Card
      className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer group"
      onClick={onClick}
      data-testid={`card-project-${project.id}`}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-chart-2/20">
            <MapPin className="h-12 w-12 text-primary/40" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <CardContent className="p-6">
        {/* Category badge */}
        <Badge variant="secondary" className="mb-3" data-testid={`badge-category-${project.id}`}>
          {project.category}
        </Badge>

        {/* Title */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-2" data-testid={`text-title-${project.id}`}>
          {project.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          <MapPin className="h-4 w-4" />
          <span data-testid={`text-location-${project.id}`}>{project.location}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* SDGs */}
        {project.sdgs && project.sdgs.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.sdgs.slice(0, 3).map((sdg) => (
              <Badge
                key={sdg}
                variant="outline"
                className="text-xs"
                data-testid={`badge-sdg-${sdg}`}
              >
                SDG {sdg}: {sdgMap[sdg] || "Goal"}
              </Badge>
            ))}
          </div>
        )}

        {/* Impact metrics */}
        {project.impactMetrics && Object.keys(project.impactMetrics).length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-4 p-3 bg-muted rounded-lg">
            {Object.entries(project.impactMetrics).slice(0, 2).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-lg font-bold text-primary">{value}</div>
                <div className="text-xs text-muted-foreground capitalize">{key.replace(/_/g, ' ')}</div>
              </div>
            ))}
          </div>
        )}

        {/* Learn more link */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-between group/btn"
          data-testid={`button-learn-more-${project.id}`}
        >
          <span>Learn More</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  );
}
