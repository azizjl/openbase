import { TrendingDown, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function StatCard({ label, value, change, trend, description }) {
  return (
    <Card size="sm" className="transition-colors hover:ring-foreground/20">
      <CardHeader className="pb-0">
        <CardTitle className="text-xs font-normal text-muted-foreground">{label}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <span className="font-heading text-2xl font-semibold tracking-tight">{value}</span>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {trend !== "neutral" && (
            <span
              className={cn(
                "flex items-center gap-0.5 font-medium",
                trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"
              )}
            >
              {trend === "up" ? (
                <TrendingUp data-icon="inline-start" />
              ) : (
                <TrendingDown data-icon="inline-start" />
              )}
              {change}
            </span>
          )}
          {trend === "neutral" && <span>{change}</span>}
          <span>{description}</span>
        </div>
      </CardContent>
    </Card>
  )
}
