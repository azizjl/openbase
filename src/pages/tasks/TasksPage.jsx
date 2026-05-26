import { Plus, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { SearchInput } from "@/components/dashboard/SearchInput"
import { KanbanBoard } from "@/components/tasks/KanbanBoard"
import { tasks } from "@/data/tasks"

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

      <KanbanBoard initialTasks={tasks} />
    </div>
  )
}
