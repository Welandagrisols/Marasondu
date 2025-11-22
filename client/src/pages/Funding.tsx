import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Calendar, DollarSign, Target, Filter, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "wouter";
import type { FundingOpportunity } from "@shared/schema";

export default function Funding() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedFocus, setSelectedFocus] = useState<string>("all");

  const { data: opportunities, isLoading } = useQuery<FundingOpportunity[]>({
    queryKey: ['/api/funding'],
  });

  const filteredOpportunities = opportunities?.filter((opp) => {
    const statusMatch = selectedStatus === "all" || opp.status === selectedStatus;
    const focusMatch = selectedFocus === "all" || opp.focusAreas?.includes(selectedFocus);
    return statusMatch && focusMatch;
  });

  const focusAreas = ["all", "Water Conservation", "Climate Adaptation", "Community Development", "Infrastructure"];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center justify-center bg-gradient-to-br from-primary via-chart-4 to-primary overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/60"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Funding Opportunities
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Discover available funding for water conservation and sustainable development projects
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Filter Opportunities</span>
            </div>
            
            <div className="flex flex-wrap gap-3 w-full sm:w-auto">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[180px]" data-testid="select-status">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="closing soon">Closing Soon</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedFocus} onValueChange={setSelectedFocus}>
                <SelectTrigger className="w-[200px]" data-testid="select-focus">
                  <SelectValue placeholder="Focus Area" />
                </SelectTrigger>
                <SelectContent>
                  {focusAreas.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area === "all" ? "All Focus Areas" : area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {(selectedStatus !== "all" || selectedFocus !== "all") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedStatus("all");
                    setSelectedFocus("all");
                  }}
                  data-testid="button-clear-filters"
                >
                  Clear Filters
                  <X className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities Grid */}
      <section className="py-12 bg-background flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-muted-foreground" data-testid="text-opportunity-count">
              Showing {filteredOpportunities?.length || 0} opportunities
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-muted animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : filteredOpportunities && filteredOpportunities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOpportunities.map((opportunity) => (
                <Card
                  key={opportunity.id}
                  className="hover-elevate active-elevate-2 cursor-pointer"
                  data-testid={`card-funding-${opportunity.id}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Badge
                        variant={opportunity.status === "open" ? "default" : "secondary"}
                        data-testid={`badge-status-${opportunity.id}`}
                      >
                        {opportunity.status}
                      </Badge>
                      {opportunity.deadline && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{opportunity.deadline}</span>
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-lg" data-testid={`text-name-${opportunity.id}`}>
                      {opportunity.name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Source */}
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Funding Source</div>
                      <div className="font-medium text-sm">{opportunity.source}</div>
                    </div>

                    {/* Amount */}
                    {opportunity.amount && (
                      <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg">
                        <DollarSign className="h-5 w-5 text-primary" />
                        <div>
                          <div className="text-xs text-muted-foreground">Funding Amount</div>
                          <div className="font-bold text-primary">{opportunity.amount}</div>
                        </div>
                      </div>
                    )}

                    {/* Focus Areas */}
                    {opportunity.focusAreas && opportunity.focusAreas.length > 0 && (
                      <div>
                        <div className="text-xs text-muted-foreground mb-2">Focus Areas</div>
                        <div className="flex flex-wrap gap-2">
                          {opportunity.focusAreas.slice(0, 3).map((area, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Alignment Score */}
                    {opportunity.alignmentScore && (
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-chart-2" />
                        <span className="text-sm text-muted-foreground">
                          Alignment: {opportunity.alignmentScore}
                        </span>
                      </div>
                    )}

                    {/* Notes */}
                    {opportunity.notes && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {opportunity.notes}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No funding opportunities found matching your filters.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedStatus("all");
                  setSelectedFocus("all");
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

      {/* How to Apply */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card data-testid="card-how-to-apply">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Interested in Applying?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                For more information about these funding opportunities and how to apply,
                please contact our team. We can provide guidance on eligibility,
                application requirements, and support throughout the process.
              </p>
              <Link href="/contact">
                <Button size="lg" data-testid="button-contact-us">
                  Contact Us
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
