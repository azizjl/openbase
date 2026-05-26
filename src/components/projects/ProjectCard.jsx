import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TeamAvatars } from "@/components/shared/UserAvatar"
import { cn } from "@/lib/utils"

export function ProjectCard({ project, onClick }) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:ring-foreground/20 hover:-translate-y-0.5"
      )}
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle>{project.name}</CardTitle>
          <Badge variant={project.status === "completed" ? "secondary" : "default"}>
            {project.status}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>
              {project.completedTasks}/{project.tasksCount} tasks
            </span>
            <span>{project.progress}%</span>
          </div>
          <Progress value={project.progress} />
        </div>
        <div className="flex items-center justify-between">
          <TeamAvatars members={project.team} />
          <span className="text-xs text-muted-foreground">{project.lastUpdated}</span>
        </div>
      </CardContent>
    </Card>
  )
}
