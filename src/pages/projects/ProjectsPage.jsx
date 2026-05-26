import { useState } from "react"
import { Grid, List, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { SearchInput } from "@/components/dashboard/SearchInput"
import { ProjectCard } from "@/components/projects/ProjectCard"
import { ProjectDetailDialog } from "@/components/projects/ProjectDetailDialog"
import { DashboardCard } from "@/components/dashboard/DashboardCard"
import { projects, recentUpdates } from "@/data/projects"

export function ProjectsPage() {
  const [view, setView] = useState("grid")
  const [selectedProject, setSelectedProject] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleProjectClick = (project) => {
    setSelectedProject(project)
    setDialogOpen(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Projects"
        description="Manage workspaces and track progress across initiatives"
      >
        <div className="flex items-center gap-2">
          <SearchInput placeholder="Search projects..." className="w-48" />
          <Tabs value={view} onValueChange={setView}>
            <TabsList>
              <TabsTrigger value="grid">
                <Grid />
              </TabsTrigger>
              <TabsTrigger value="list">
                <List />
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button size="sm">
            <Plus data-icon="inline-start" />
            New project
          </Button>
        </div>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </div>
        </div>

        <DashboardCard title="Recent Updates" description="Latest activity across projects">
          <div className="flex flex-col gap-4">
            {recentUpdates.map((update, i) => (
              <div key={i} className="flex flex-col gap-0.5 border-b pb-4 last:border-0 last:pb-0">
                <span className="text-sm font-medium">{update.project}</span>
                <span className="text-sm text-muted-foreground">{update.update}</span>
                <span className="text-xs text-muted-foreground">{update.time}</span>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      <ProjectDetailDialog
        project={selectedProject}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  )
}
