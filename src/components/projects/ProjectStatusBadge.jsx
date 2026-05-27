import { Badge } from "@/components/ui/badge"
import { projectStatuses } from "@/data/projects"
import { cn } from "@/lib/utils"

export function ProjectStatusBadge({ status, className }) {
  const info =
    projectStatuses[status] ?? {
      label: status,
      color: "bg-muted text-muted-foreground border-border",
    }

  return (
    <Badge
      variant="outline"
      className={cn("border font-normal capitalize", info.color, className)}
    >
      {info.label}
    </Badge>
  )
}
