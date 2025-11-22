import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  trend?: string;
  testId?: string;
}

export function StatsCard({ icon: Icon, value, label, trend, testId }: StatsCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate" data-testid={testId}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="text-3xl font-bold mb-1" data-testid={`text-value-${testId}`}>
              {value}
            </div>
            <div className="text-sm text-muted-foreground" data-testid={`text-label-${testId}`}>
              {label}
            </div>
            {trend && (
              <div className="text-xs text-chart-2 mt-2" data-testid={`text-trend-${testId}`}>
                {trend}
              </div>
            )}
          </div>
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
