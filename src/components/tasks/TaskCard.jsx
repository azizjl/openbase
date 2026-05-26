import { useDraggable, useDndContext } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TeamAvatars } from "@/components/shared/UserAvatar"
import { cn } from "@/lib/utils"

const priorityVariants = {
  high: "destructive",
  medium: "secondary",
  low: "outline",
}

function TaskCardContent({ task }) {
  return (
    <>
      <CardHeader className="pb-0">
        <div className="flex flex-col gap-2">
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
            <Progress
              value={task.progress}
              className="[&_[data-slot=progress-indicator]]:bg-emerald-500 dark:[&_[data-slot=progress-indicator]]:bg-emerald-400"
            />
          </div>
        )}
        <div className="flex items-center justify-between">
          <TeamAvatars members={task.assignees} avatarClassName="size-6" />
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar />
            {task.dueDate}
          </div>
        </div>
      </CardContent>
    </>
  )
}

export function TaskCardOverlay({ task }) {
  return (
    <Card
      size="sm"
      className="w-72 cursor-grabbing select-none shadow-lg ring-2 ring-primary/20"
    >
      <TaskCardContent task={task} />
    </Card>
  )
}

export function TaskCard({ task }) {
  const { active } = useDndContext()
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: { task },
  })

  const isActive = active?.id === task.id

  const style =
    isActive || !transform
      ? undefined
      : { transform: CSS.Translate.toString(transform) }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      size="sm"
      className={cn(
        "cursor-grab touch-none select-none transition-shadow hover:ring-foreground/20 hover:-translate-y-0.5 active:cursor-grabbing",
        isActive && "opacity-0"
      )}
      {...listeners}
      {...attributes}
    >
      <TaskCardContent task={task} />
    </Card>
  )
}
