import { Outlet, useLocation } from "react-router-dom"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AppSidebar } from "@/components/app-sidebar"
import { AppNavbar } from "@/components/layout/AppNavbar"
import { cn } from "@/lib/utils"

const pageTitles = {
  "/": { title: "Overview" },
  "/ai-chat": { title: "AI Chat", parent: "Platform" },
  "/messages": { title: "Messages", parent: "Platform" },
  "/tasks": { title: "Tasks", parent: "Platform" },
  "/calendar": { title: "Calendar", parent: "Platform" },
  "/projects": { title: "Projects", parent: "Platform" },
  "/documents": { title: "Documents", parent: "Platform" },
}

export function DashboardLayout() {
  const location = useLocation()
  const pageInfo = pageTitles[location.pathname] || { title: "Dashboard" }
  const isAiChat = location.pathname === "/ai-chat"
  const isMessages = location.pathname === "/messages"

  return (
    <TooltipProvider>
      <SidebarProvider className="max-h-svh overflow-hidden">
        <AppSidebar />
        <SidebarInset className="min-h-0 overflow-hidden">
          {!isAiChat && (
            <AppNavbar title={pageInfo.title} parent={pageInfo.parent} />
          )}
          <div
            className={cn(
              "flex min-h-0 flex-1 flex-col",
              isAiChat && "overflow-hidden",
              isMessages && "overflow-hidden px-4 pb-4 pt-6",
              !isAiChat && !isMessages && "overflow-y-auto px-4 pb-6 pt-6"
            )}
          >
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
