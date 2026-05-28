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
  "/presentations": { title: "Presentations", parent: "Platform" },
}

function getPageInfo(pathname) {
  if (pageTitles[pathname]) return pageTitles[pathname]

  if (pathname.match(/^\/presentations\/[^/]+\/present$/)) {
    return { title: "Present", parent: "Presentations" }
  }

  if (pathname.match(/^\/presentations\/[^/]+$/)) {
    return { title: "Editor", parent: "Presentations" }
  }

  return { title: "Dashboard" }
}

export function DashboardLayout() {
  const location = useLocation()
  const pageInfo = getPageInfo(location.pathname)
  const isAiChat = location.pathname === "/ai-chat"
  const isMessages = location.pathname === "/messages"
  const isOrgChart = location.pathname === "/org-chart"
  const isPresentationEditor = /^\/presentations\/[^/]+$/.test(location.pathname)
  const isPresentationPresent = /^\/presentations\/[^/]+\/present$/.test(location.pathname)
  const isFullHeightPage =
    isAiChat || isMessages || isOrgChart || isPresentationEditor || isPresentationPresent
  const hideChromePadding = isFullHeightPage
  const [activeAgent, setActiveAgent] = useState("agent-1")

  return (
    <TooltipProvider>
      <SidebarProvider className="max-h-svh overflow-hidden">
        <AppSidebar />
        <SidebarInset className="min-h-0 overflow-hidden">
          {!isPresentationPresent && (
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
          )}
          <div
            className={cn(
              "flex min-h-0 flex-1 flex-col",
              hideChromePadding && "overflow-hidden",
              !hideChromePadding && "overflow-y-auto px-4 pb-6 pt-6"
            )}
          >
            <Outlet context={isAiChat ? { activeAgent } : undefined} />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
