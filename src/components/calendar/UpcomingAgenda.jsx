import { Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DashboardCard } from "@/components/dashboard/DashboardCard"
import { TeamAvatars } from "@/components/shared/UserAvatar"
import { eventTypes, formatTimeRange } from "@/data/calendar"
import { cn } from "@/lib/utils"

export function UpcomingAgenda({ events, selectedDate, onSelectEvent }) {
  const sorted = [...events].sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date)
    return a.startTime.localeCompare(b.startTime)
  })

  const title = selectedDate
    ? selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })
    : "Upcoming"

  return (
    <DashboardCard title={title} description="Events, meetings & deadlines">
      <ScrollArea className="h-[420px] pr-2">
        {sorted.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No events scheduled
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {sorted.map((event) => {
              const typeInfo = eventTypes[event.type]
              return (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => onSelectEvent?.(event)}
                  className="flex flex-col gap-2 rounded-lg border p-3 text-left transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-medium leading-snug">{event.title}</span>
                    <Badge variant="outline" className={cn("shrink-0 text-[10px]", typeInfo.color)}>
                      {typeInfo.label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock />
                    {formatTimeRange(event.startTime, event.endTime)}
                  </div>
                  {event.assignees?.length > 0 && (
                    <TeamAvatars members={event.assignees} avatarClassName="size-6" />
                  )}
                </button>
              )
            })}
          </div>
        )}
      </ScrollArea>
    </DashboardCard>
  )
}
