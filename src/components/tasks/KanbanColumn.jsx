import { useDroppable } from "@dnd-kit/core"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function KanbanColumn({ column, taskCount, children }) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id })

  return (
    <div className="flex w-72 shrink-0 flex-col gap-3">
      <div className="flex items-center gap-2 px-1">
        <span className={`size-2 rounded-full ${column.color}`} />
        <span className="text-sm font-medium">{column.title}</span>
        <Badge variant="secondary" className="ml-auto">
          {taskCount}
        </Badge>
      </div>
      <div
        ref={setNodeRef}
        className={cn(
          "flex min-h-[200px] flex-col gap-3 rounded-xl p-2 transition-colors",
          isOver && "bg-muted/50 ring-2 ring-primary/20"
        )}
      >
        {children}
      </div>
    </div>
  )
}
