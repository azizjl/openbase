import { Calendar, User } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { ProjectStatusBadge } from "@/components/projects/ProjectStatusBadge"
import { Separator } from "@/components/ui/separator"
import { TeamAvatars } from "@/components/shared/UserAvatar"

export function ProjectDetailDialog({ project, open, onOpenChange }) {
  if (!project) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-start justify-between gap-2 pr-8">
            <DialogTitle>{project.name}</DialogTitle>
            <ProjectStatusBadge status={project.status} />
          </div>
          <DialogDescription>{project.description}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{project.progress}%</span>
            </div>
            <Progress
              value={project.progress}
              className="[&_[data-slot=progress-indicator]]:bg-emerald-500 dark:[&_[data-slot=progress-indicator]]:bg-emerald-400"
            />
            <p className="text-xs text-muted-foreground">
              {project.completedTasks} of {project.tasksCount} tasks completed
            </p>
          </div>

          <Separator />

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-2 text-sm">
              <User className="text-muted-foreground" />
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Lead</span>
                <span>{project.lead}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="text-muted-foreground" />
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Due date</span>
                <span>{project.dueDate}</span>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Team</span>
            <TeamAvatars members={project.team} avatarClassName="size-9" />
          </div>

          <p className="text-xs text-muted-foreground">Last updated {project.lastUpdated}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
