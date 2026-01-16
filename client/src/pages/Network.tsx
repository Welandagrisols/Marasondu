import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { WRUACard } from "@/components/WRUACard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Wrua } from "@shared/schema";
import "leaflet/dist/leaflet.css";

// Fix for Leaflet default marker icons
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function Network() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWrua, setSelectedWrua] = useState<Wrua | null>(null);

  const { data: wruas, isLoading } = useQuery<Wrua[]>({
    queryKey: ['/api/wruas'],
  });

  const filteredWruas = wruas?.filter((wrua) =>
    wrua.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wrua.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wrua.focusAreas?.some(area => area.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Default center: Lake Victoria Basin, Kenya
  const mapCenter: [number, number] = [-0.5, 34.5];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center bg-gradient-to-br from-primary via-chart-4 to-primary overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/60"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            WRUA Network
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            30 Water Resource Users Associations across the Lake Victoria Basin
          </p>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="h-[500px] bg-muted">
        <MapContainer
          center={mapCenter}
          zoom={9}
          scrollWheelZoom={false}
          className="h-full w-full"
          data-testid="map-wruas"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {wruas?.map((wrua) => {
            if (wrua.lat && wrua.lng) {
              const position: [number, number] = [parseFloat(wrua.lat), parseFloat(wrua.lng)];
              return (
                <Marker key={wrua.id} position={position}>
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-semibold mb-1">{wrua.name}</h3>
                      <p className="text-sm text-muted-foreground">{wrua.location}</p>
                    </div>
                  </Popup>
                </Marker>
              );
            }
            return null;
          })}
        </MapContainer>
      </section>

      {/* Directory */}
      <section className="py-12 bg-background flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">WRUA Directory</h2>
            
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name, location, or focus area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-search-wruas"
              />
            </div>
          </div>

          <div className="mb-6">
            <p className="text-muted-foreground" data-testid="text-wrua-count">
              Showing {filteredWruas?.length || 0} WRUAs
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-muted animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : filteredWruas && filteredWruas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWruas.map((wrua) => (
                <WRUACard
                  key={wrua.id}
                  wrua={wrua}
                  onClick={() => setSelectedWrua(wrua)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No WRUAs found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* WRUA Detail Modal */}
      <Dialog open={!!selectedWrua} onOpenChange={() => setSelectedWrua(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" data-testid="dialog-wrua-detail">
          {selectedWrua && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedWrua.name}</DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Location</div>
                    <div className="font-medium">{selectedWrua.location}</div>
                  </div>
                  {selectedWrua.memberSince && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Member Since</div>
                      <div className="font-medium">{selectedWrua.memberSince}</div>
                    </div>
                  )}
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Status</div>
                    <Badge>{selectedWrua.status}</Badge>
                  </div>
                </div>

                {/* Description */}
                {selectedWrua.description && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">About</h3>
                    <p className="text-muted-foreground">{selectedWrua.description}</p>
                  </div>
                )}

                {/* Focus Areas */}
                {selectedWrua.focusAreas && selectedWrua.focusAreas.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Focus Areas</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedWrua.focusAreas.map((area, idx) => (
                        <Badge key={idx} variant="outline">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Information */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Contact Information</h3>
                  <div className="space-y-2">
                    {selectedWrua.contactPerson && (
                      <div>
                        <span className="text-sm text-muted-foreground">Contact Person: </span>
                        <span className="font-medium">{selectedWrua.contactPerson}</span>
                      </div>
                    )}
                    {selectedWrua.email && (
                      <div>
                        <span className="text-sm text-muted-foreground">Email: </span>
                        <a
                          href={`mailto:${selectedWrua.email}`}
                          className="font-medium text-primary hover:underline"
                        >
                          {selectedWrua.email}
                        </a>
                      </div>
                    )}
                    {selectedWrua.phone && (
                      <div>
                        <span className="text-sm text-muted-foreground">Phone: </span>
                        <a
                          href={`tel:${selectedWrua.phone}`}
                          className="font-medium text-primary hover:underline"
                        >
                          {selectedWrua.phone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
