import { Link } from "react-router-dom"
import {
  Calendar,
  Mail,
  MapPin,
  MessageSquare,
  Network,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { UserAvatar } from "@/components/shared/UserAvatar"
import {
  getDepartmentById,
  getDirectReports,
  getManager,
} from "@/data/employees"
import { cn } from "@/lib/utils"

const statusLabels = {
  online: { label: "Online", variant: "default" },
  away: { label: "Away", variant: "secondary" },
  offline: { label: "Offline", variant: "outline" },
}

export function EmployeeDetailDialog({ employee, open, onOpenChange, onViewInChart }) {
  if (!employee) return null

  const department = employee.departmentId
    ? getDepartmentById(employee.departmentId)
    : null
  const manager = getManager(employee.id)
  const reports = getDirectReports(employee.id)
  const status = statusLabels[employee.status] || statusLabels.offline

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <UserAvatar
              initials={employee.initials}
              src={employee.avatar}
              className="size-14 border border-border/60"
            />
            <div className="flex min-w-0 flex-1 flex-col gap-1 pr-6">
              <DialogTitle>{employee.name}</DialogTitle>
              <DialogDescription>{employee.title}</DialogDescription>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <Badge variant={status.variant}>{status.label}</Badge>
                {department && <Badge variant="outline">{department.name}</Badge>}
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-2 text-sm">
              <Mail className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="text-xs text-muted-foreground">Email</span>
                <span className="truncate">{employee.email}</span>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-muted-foreground">Location</span>
                <span>{employee.location}</span>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1 text-sm">
              <span className="text-xs text-muted-foreground">Reports to</span>
              <span>{manager ? manager.name : "—"}</span>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <span className="text-xs text-muted-foreground">Direct reports</span>
              <span>{reports.length > 0 ? reports.length : "None"}</span>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <span className="text-xs text-muted-foreground">Joined</span>
              <span>{employee.joined}</span>
            </div>
            {department && (
              <div className="flex flex-col gap-1 text-sm">
                <span className="text-xs text-muted-foreground">Department</span>
                <span>{department.name}</span>
              </div>
            )}
          </div>

          {reports.length > 0 && (
            <>
              <Separator />
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Users className="size-4 text-muted-foreground" />
                  Direct reports
                </div>
                <div className="flex flex-wrap gap-2">
                  {reports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center gap-2 rounded-lg border bg-muted/30 px-2.5 py-1.5"
                    >
                      <UserAvatar
                        initials={report.initials}
                        src={report.avatar}
                        className="size-6"
                      />
                      <span className="text-xs font-medium">{report.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <DialogFooter className={cn("gap-2 sm:gap-2")}>
          <Button variant="outline" onClick={() => onViewInChart?.(employee)}>
            <Network data-icon="inline-start" />
            View in chart
          </Button>
          <Button variant="outline" render={<Link to="/calendar" />}>
            <Calendar data-icon="inline-start" />
            Schedule
          </Button>
          <Button render={<Link to="/messages" />}>
            <MessageSquare data-icon="inline-start" />
            Chat with {employee.name.split(" ")[0]}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
