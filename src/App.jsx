import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import { AuthLayout } from "@/layouts/AuthLayout"
import { DashboardLayout } from "@/layouts/DashboardLayout"
import { LoginPage } from "@/pages/auth/LoginPage"
import { OverviewPage } from "@/pages/dashboard/OverviewPage"
import { AIChatPage } from "@/pages/ai-chat/AIChatPage"
import { MessagesPage } from "@/pages/messages/MessagesPage"
import { TasksPage } from "@/pages/tasks/TasksPage"
import { ProjectsPage } from "@/pages/projects/ProjectsPage"
import { DocumentsPage } from "@/pages/documents/DocumentsPage"
import { CalendarPage } from "@/pages/calendar/CalendarPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/ai-chat" element={<AIChatPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
