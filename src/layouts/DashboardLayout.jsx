import { Outlet, useLocation } from "react-router-dom"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AppSidebar } from "@/components/app-sidebar"
import { AppNavbar } from "@/components/layout/AppNavbar"

const pageTitles = {
  "/": { title: "Overview" },
  "/ai-chat": { title: "AI Chat", parent: "Platform" },
  "/messages": { title: "Messages", parent: "Platform" },
  "/tasks": { title: "Tasks", parent: "Platform" },
  "/projects": { title: "Projects", parent: "Platform" },
  "/documents": { title: "Documents", parent: "Platform" },
}

export function DashboardLayout() {
  const location = useLocation()
  const pageInfo = pageTitles[location.pathname] || { title: "Dashboard" }
  const isFullBleed = location.pathname === "/ai-chat"

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {!isFullBleed && (
            <AppNavbar title={pageInfo.title} parent={pageInfo.parent} />
          )}
          <div
            className={
              isFullBleed
                ? "flex flex-1 flex-col overflow-hidden"
                : "flex flex-1 flex-col gap-4 overflow-auto p-4 pt-0"
            }
          >
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
