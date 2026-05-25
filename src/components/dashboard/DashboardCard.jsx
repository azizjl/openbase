import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function DashboardCard({ title, description, children, action, className }) {
  return (
    <Card className={cn("transition-colors hover:ring-foreground/20", className)}>
      {(title || description || action) && (
        <CardHeader className="flex flex-row items-start justify-between">
          <div className="flex flex-col gap-1">
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {action}
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  )
}
