import { Calendar, GripVertical } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const priorityVariants = {
  high: "destructive",
  medium: "secondary",
  low: "outline",
}

export function TaskCard({ task }) {
  return (
    <Card
      size="sm"
      className="cursor-grab transition-all hover:ring-foreground/20 hover:-translate-y-0.5 active:cursor-grabbing"
    >
      <CardHeader className="flex flex-row items-start gap-2 pb-0">
        <GripVertical className="mt-0.5 shrink-0 text-muted-foreground/50" />
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <span className="text-sm font-medium leading-snug">{task.title}</span>
            <Badge variant={priorityVariants[task.priority]} className="shrink-0 capitalize">
              {task.priority}
            </Badge>
          </div>
          {task.description && (
            <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-1">
          {task.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        {task.progress > 0 && (
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>{task.progress}%</span>
            </div>
            <Progress value={task.progress} />
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {task.assignees.map((initials) => (
              <Avatar key={initials} className="size-6 border-2 border-card">
                <AvatarFallback className="text-[10px]">{initials}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar />
            {task.dueDate}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
