import {
  Calendar,
  CheckSquare,
  ChevronsUpDown,
  Eye,
  FileText,
  FolderKanban,
  HelpCircle,
  LayoutDashboard,
  MessageSquare,
  MessagesSquare,
  Network,
  PieChart,
  ScrollText,
  Send,
} from "lucide-react"
import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { currentUser, workspaces } from "@/data/user"
import { totalUnreadMessages } from "@/data/messages"
import { chatHistory } from "@/data/chats"
import { projects } from "@/data/projects"

const navMain = [
  {
    title: "Overview",
    url: "/",
    icon: <LayoutDashboard />,
  },
  {
    title: "AI Chat",
    url: "/ai-chat",
    icon: <MessageSquare />,
    items: chatHistory.slice(0, 4).map((chat) => ({
      title: chat.title,
      url: "/ai-chat",
    })),
  },
  {
    title: "Messages",
    url: "/messages",
    icon: <MessagesSquare />,
    badge: totalUnreadMessages,
  },
  {
    title: "People",
    url: "/org-chart",
    icon: <Network />,
  },
  {
    title: "Tasks",
    url: "/tasks",
    icon: <CheckSquare />,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: <Calendar />,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: <FolderKanban />,
  },
  {
    title: "Documents",
    url: "/documents",
    icon: <FileText />,
  },
  {
    title: "Logs",
    url: "/logs",
    icon: <ScrollText />,
  },
]

const navProjects = projects.slice(0, 3).map((project) => ({
  name: project.name,
  url: "/projects",
  icon: <PieChart />,
}))

const navSecondary = [
  {
    title: "Help",
    url: "#",
    icon: <HelpCircle />,
  },
  {
    title: "Feedback",
    url: "#",
    icon: <Send />,
  },
]

export function AppSidebar({ ...props }) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton size="lg" className="data-open:bg-sidebar-accent">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      <Eye />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">OpenBase</span>
                      <span className="truncate text-xs">{workspaces[0].name}</span>
                    </div>
                    <ChevronsUpDown className="ml-auto" />
                  </SidebarMenuButton>
                }
              />
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
                  {workspaces.map((ws) => (
                    <DropdownMenuItem key={ws.id}>
                      <span>{ws.name}</span>
                      <span className="ml-auto text-xs text-muted-foreground">
                        {ws.plan}
                      </span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavProjects projects={navProjects} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={currentUser} />
      </SidebarFooter>
    </Sidebar>
  )
}
