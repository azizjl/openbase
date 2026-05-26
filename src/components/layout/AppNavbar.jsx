import { Bell, Moon, Sun } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SearchInput } from "@/components/dashboard/SearchInput"
import { UserDropdown } from "@/components/layout/UserDropdown"
import { useTheme } from "@/hooks/use-theme"
import { workspaces } from "@/data/user"

export function AppNavbar({ title, parent }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="h-4" />
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">{workspaces[0].name}</BreadcrumbLink>
          </BreadcrumbItem>
          {parent && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">{parent}</BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
          {title && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{title}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="ml-auto flex items-center gap-2">
        <SearchInput placeholder="Search..." className="hidden w-64 lg:flex" />
        <Button variant="ghost" size="icon">
          <Bell />
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === "dark" ? <Sun /> : <Moon />}
        </Button>
        <UserDropdown />
      </div>
    </header>
  )
}
