import { cn } from "@/lib/utils"

export function SectionHeader({ title, description, action, className }) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="flex flex-col gap-0.5">
        <h2 className="font-heading text-sm font-medium">{title}</h2>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      {action}
    </div>
  )
}
