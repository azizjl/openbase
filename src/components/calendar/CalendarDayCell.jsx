import { cn } from "@/lib/utils"
import { eventTypes } from "@/data/calendar"

const MAX_VISIBLE = 2

export function CalendarDayCell({
  day,
  isCurrentMonth,
  isToday,
  isSelected,
  events,
  onSelectDay,
  onSelectEvent,
}) {
  if (day === null) {
    return <div className="min-h-24 border-b border-r bg-muted/20" />
  }

  const visible = events.slice(0, MAX_VISIBLE)
  const more = events.length - MAX_VISIBLE

  return (
    <button
      type="button"
      onClick={() => onSelectDay?.(day)}
      className={cn(
        "flex min-h-24 flex-col gap-1 border-b border-r p-1.5 text-left transition-colors hover:bg-muted/40",
        !isCurrentMonth && "bg-muted/10 text-muted-foreground",
        isToday && "bg-primary/5",
        isSelected && "ring-2 ring-inset ring-primary/40"
      )}
    >
      <span
        className={cn(
          "flex size-7 items-center justify-center rounded-full text-xs font-medium",
          isToday && "bg-primary text-primary-foreground"
        )}
      >
        {day.getDate()}
      </span>
      <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
        {visible.map((event) => {
          const typeInfo = eventTypes[event.type]
          return (
            <span
              key={event.id}
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation()
                onSelectEvent?.(event)
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.stopPropagation()
                  onSelectEvent?.(event)
                }
              }}
              className={cn(
                "truncate rounded border px-1.5 py-0.5 text-[10px] font-medium leading-tight",
                typeInfo.color
              )}
            >
              {event.title}
            </span>
          )
        })}
        {more > 0 && (
          <span className="px-1 text-[10px] text-muted-foreground">+{more} more</span>
        )}
      </div>
    </button>
  )
}
