import { useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AppSidebar } from "@/components/app-sidebar"
import { AIModelSelector } from "@/components/chat/AIModelSelector"
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
  "/org-chart": { title: "People", parent: "Platform" },
  "/logs": { title: "Logs", parent: "Platform" },
}

export function DashboardLayout() {
  const location = useLocation()
  const pageInfo = pageTitles[location.pathname] || { title: "Dashboard" }
  const isAiChat = location.pathname === "/ai-chat"
  const isMessages = location.pathname === "/messages"
  const isOrgChart = location.pathname === "/org-chart"
  const isFullHeightPage = isAiChat || isMessages || isOrgChart
  const [activeAgent, setActiveAgent] = useState("agent-1")

  return (
    <TooltipProvider>
      <SidebarProvider className="max-h-svh overflow-hidden">
        <AppSidebar />
        <SidebarInset className="min-h-0 overflow-hidden">
          <AppNavbar
            title={pageInfo.title}
            parent={pageInfo.parent}
            agentSelector={
              isAiChat ? (
                <AIModelSelector
                  selectedAgent={activeAgent}
                  onSelect={setActiveAgent}
                />
              ) : null
            }
          />
          <div
            className={cn(
              "flex min-h-0 flex-1 flex-col",
              isFullHeightPage && "overflow-hidden",
              !isFullHeightPage && "overflow-y-auto px-4 pb-6 pt-6"
            )}
          >
            <Outlet context={isAiChat ? { activeAgent } : undefined} />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
