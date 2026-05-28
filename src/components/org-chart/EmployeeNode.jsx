import { UserAvatar } from "@/components/shared/UserAvatar"
import { cn } from "@/lib/utils"

const statusStyles = {
  online: "bg-emerald-500",
  away: "bg-amber-500",
  offline: "bg-muted-foreground/40",
}

export function EmployeeNode({ employee, selected, onSelect }) {
  const isCeo = !employee.managerId

  return (
    <button
      type="button"
      data-org-node
      onClick={() => onSelect(employee)}
      className={cn(
        "group absolute flex w-[196px] cursor-pointer flex-col gap-2 rounded-xl border bg-card/95 p-3 text-left shadow-sm backdrop-blur-sm transition-all",
        "hover:border-primary/40 hover:shadow-md hover:ring-2 hover:ring-primary/10",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        selected && "border-primary/50 ring-2 ring-primary/20 shadow-md",
        isCeo && "border-amber-500/30 bg-gradient-to-b from-amber-500/5 to-card/95 shadow-md"
      )}
      style={{ left: employee.x, top: employee.y, width: employee.width, height: employee.height }}
    >
      <div className="pointer-events-none absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full border-2 border-background bg-muted-foreground/30" />
      <div className="pointer-events-none absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rounded-full border-2 border-background bg-muted-foreground/30" />

      <div className="flex min-w-0 items-center gap-2.5">
        <div className="relative shrink-0">
          <UserAvatar
            initials={employee.initials}
            src={employee.avatar}
            className="size-10 border border-border/60"
          />
          <span
            className={cn(
              "absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border-2 border-card",
              statusStyles[employee.status] || statusStyles.offline
            )}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium leading-tight">{employee.name}</p>
          <p className="truncate text-[11px] text-muted-foreground">{employee.title}</p>
        </div>
      </div>
    </button>
  )
}
