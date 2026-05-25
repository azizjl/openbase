import { Plus, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { SearchInput } from "@/components/dashboard/SearchInput"
import { TaskCard } from "@/components/tasks/TaskCard"
import { taskColumns, tasks } from "@/data/tasks"

export function TasksPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Tasks"
        description="Kanban board for tracking work across your team"
      >
        <div className="flex items-center gap-2">
          <SearchInput placeholder="Search tasks..." className="w-48" />
          <Button variant="outline" size="sm">
            <SlidersHorizontal data-icon="inline-start" />
            Filter
          </Button>
          <Button size="sm">
            <Plus data-icon="inline-start" />
            New task
          </Button>
        </div>
      </PageHeader>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {taskColumns.map((column) => {
          const columnTasks = tasks.filter((t) => t.status === column.id)
          return (
            <div key={column.id} className="flex w-72 shrink-0 flex-col gap-3">
              <div className="flex items-center gap-2 px-1">
                <span className={`size-2 rounded-full ${column.color}`} />
                <span className="text-sm font-medium">{column.title}</span>
                <Badge variant="secondary" className="ml-auto">
                  {columnTasks.length}
                </Badge>
              </div>
              <div className="flex flex-col gap-3">
                {columnTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
