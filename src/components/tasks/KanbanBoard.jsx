import { useState } from "react"
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { TaskCard } from "@/components/tasks/TaskCard"
import { KanbanColumn } from "@/components/tasks/KanbanColumn"
import { taskColumns } from "@/data/tasks"

export function KanbanBoard({ initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks)
  const [activeTask, setActiveTask] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  )

  const handleDragStart = (event) => {
    const task = tasks.find((t) => t.id === event.active.id)
    setActiveTask(task ?? null)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    setActiveTask(null)

    if (!over) return

    const taskId = active.id
    const overId = over.id

    const targetColumn = taskColumns.find((col) => col.id === overId)
    const overTask = tasks.find((t) => t.id === overId)

    let newStatus = null
    if (targetColumn) {
      newStatus = targetColumn.id
    } else if (overTask) {
      newStatus = overTask.status
    }

    if (!newStatus) return

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    )
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {taskColumns.map((column) => {
          const columnTasks = tasks.filter((t) => t.status === column.id)
          return (
            <KanbanColumn key={column.id} column={column} taskCount={columnTasks.length}>
              {columnTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </KanbanColumn>
          )
        })}
      </div>
      <DragOverlay>
        {activeTask ? (
          <div className="w-72 rotate-2 opacity-90">
            <TaskCard task={activeTask} isDragging />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
