import { Link } from "react-router-dom"
import {
  ArrowRight,
  Bot,
  FileText,
  FolderKanban,
  MessageSquare,
  Plus,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TeamAvatars } from "@/components/shared/UserAvatar"
import { Progress } from "@/components/ui/progress"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { StatCard } from "@/components/dashboard/StatCard"
import { DashboardCard } from "@/components/dashboard/DashboardCard"
import { SectionHeader } from "@/components/dashboard/SectionHeader"
import { currentUser } from "@/data/user"
import { stats, recentActivity } from "@/data/dashboard"
import { aiAgents } from "@/data/agents"
import { projects } from "@/data/projects"
import { tasks } from "@/data/tasks"

export function OverviewPage() {
  const activeProjects = projects.filter((p) => p.status === "active").slice(0, 3)
  const recentTasks = tasks.filter((t) => t.status !== "done").slice(0, 4)

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title={`Welcome back, ${currentUser.name.split(" ")[0]}`}
        description="Here's what's happening across your AI workspace today."
      >
        <Button render={<Link to="/ai-chat" />}>
          <Plus data-icon="inline-start" />
          New chat
        </Button>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <DashboardCard
          title="AI Agents"
          description="Your deployed enterprise agents"
          className="lg:col-span-2"
          action={
            <Button variant="ghost" size="sm" render={<Link to="/ai-chat" />}>
              View all
              <ArrowRight data-icon="inline-end" />
            </Button>
          }
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {aiAgents.map((agent) => (
              <div
                key={agent.id}
                className="flex items-start gap-3 rounded-xl border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Bot className="text-primary" />
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{agent.name}</span>
                    {agent.active && <Badge variant="secondary">Active</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground">{agent.description}</p>
                  <span className="text-xs text-muted-foreground">{agent.model}</span>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Recent Activity">
          <div className="flex flex-col gap-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex flex-col gap-0.5">
                <p className="text-sm">
                  <span className="font-medium">{activity.user}</span>{" "}
                  <span className="text-muted-foreground">{activity.action}</span>
                </p>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <SectionHeader
            title="Recent Projects"
            action={
              <Button variant="ghost" size="sm" render={<Link to="/projects" />}>
                View all
                <ArrowRight data-icon="inline-end" />
              </Button>
            }
          />
          <div className="flex flex-col gap-3">
            {activeProjects.map((project) => (
              <div
                key={project.id}
                className="flex flex-col gap-3 rounded-xl border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium">{project.name}</span>
                    <span className="text-xs text-muted-foreground">{project.lastUpdated}</span>
                  </div>
                  <FolderKanban className="text-muted-foreground" />
                </div>
                <Progress value={project.progress} />
                <TeamAvatars members={project.team} avatarClassName="size-6" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <SectionHeader
            title="Active Tasks"
            action={
              <Button variant="ghost" size="sm" render={<Link to="/tasks" />}>
                View all
                <ArrowRight data-icon="inline-end" />
              </Button>
            }
          />
          <div className="flex flex-col gap-2">
            {recentTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between rounded-lg border px-4 py-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium">{task.title}</span>
                  <span className="text-xs text-muted-foreground capitalize">{task.status.replace("-", " ")}</span>
                </div>
                <Badge variant={task.priority === "high" ? "destructive" : "secondary"}>
                  {task.priority}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DashboardCard title="Quick Actions">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Start AI Chat", icon: MessageSquare, href: "/ai-chat" },
            { label: "Upload Document", icon: FileText, href: "/documents" },
            { label: "New Project", icon: FolderKanban, href: "/projects" },
            { label: "Browse Agents", icon: Eye, href: "/ai-chat" },
          ].map((action) => (
            <Button
              key={action.label}
              variant="outline"
              className="h-auto flex-col gap-2 py-4"
              render={<Link to={action.href} />}
            >
              <action.icon />
              {action.label}
            </Button>
          ))}
        </div>
      </DashboardCard>
    </div>
  )
}
