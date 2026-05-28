import { cn } from "@/lib/utils"

const accentStyles = {
  violet: {
    border: "border-violet-500/25",
    bg: "bg-violet-500/[0.04]",
    label: "text-violet-700 dark:text-violet-300",
    dot: "bg-violet-500",
  },
  blue: {
    border: "border-blue-500/25",
    bg: "bg-blue-500/[0.04]",
    label: "text-blue-700 dark:text-blue-300",
    dot: "bg-blue-500",
  },
  emerald: {
    border: "border-emerald-500/25",
    bg: "bg-emerald-500/[0.04]",
    label: "text-emerald-700 dark:text-emerald-300",
    dot: "bg-emerald-500",
  },
  amber: {
    border: "border-amber-500/25",
    bg: "bg-amber-500/[0.04]",
    label: "text-amber-700 dark:text-amber-300",
    dot: "bg-amber-500",
  },
  rose: {
    border: "border-rose-500/25",
    bg: "bg-rose-500/[0.04]",
    label: "text-rose-700 dark:text-rose-300",
    dot: "bg-rose-500",
  },
}

export function DepartmentRegion({ department }) {
  const accent = accentStyles[department.accent] || accentStyles.blue

  return (
    <div
      className={cn(
        "pointer-events-none absolute rounded-2xl border border-dashed",
        accent.border,
        accent.bg
      )}
      style={{
        left: department.x,
        top: department.y,
        width: department.width,
        height: department.height,
      }}
    >
      <div className="absolute -top-3 left-4 flex items-center gap-2 rounded-md border bg-background/95 px-2.5 py-1 shadow-sm backdrop-blur-sm">
        <span className={cn("size-1.5 rounded-full", accent.dot)} />
        <span className={cn("text-xs font-medium", accent.label)}>{department.name}</span>
      </div>
    </div>
  )
}
