import { MapPin, Mail, Phone, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Wrua } from "@shared/schema";

interface WRUACardProps {
  wrua: Wrua;
  onClick?: () => void;
}

export function WRUACard({ wrua, onClick }: WRUACardProps) {
  return (
    <Card
      className="hover-elevate active-elevate-2 cursor-pointer"
      onClick={onClick}
      data-testid={`card-wrua-${wrua.id}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-lg mb-1" data-testid={`text-name-${wrua.id}`}>
              {wrua.name}
            </CardTitle>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span data-testid={`text-location-${wrua.id}`}>{wrua.location}</span>
            </div>
          </div>
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Users className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Focus areas */}
        {wrua.focusAreas && wrua.focusAreas.length > 0 && (
          <div>
            <div className="text-xs font-medium text-muted-foreground mb-2">Focus Areas</div>
            <div className="flex flex-wrap gap-2">
              {wrua.focusAreas.map((area, idx) => (
                <Badge key={idx} variant="outline" className="text-xs" data-testid={`badge-focus-${idx}`}>
                  {area}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        {wrua.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {wrua.description}
          </p>
        )}

        {/* Contact info */}
        <div className="space-y-2 text-sm">
          {wrua.contactPerson && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span className="text-xs">{wrua.contactPerson}</span>
            </div>
          )}
          {wrua.email && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span className="text-xs">{wrua.email}</span>
            </div>
          )}
          {wrua.phone && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span className="text-xs">{wrua.phone}</span>
            </div>
          )}
        </div>

        {/* Member since */}
        {wrua.memberSince && (
          <div className="pt-2 border-t">
            <div className="text-xs text-muted-foreground">
              Member since {wrua.memberSince}
            </div>
          </div>
        )}

        <Button
          variant="outline"
          size="sm"
          className="w-full"
          data-testid={`button-view-details-${wrua.id}`}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
