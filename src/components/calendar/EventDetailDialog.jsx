import { Calendar, Clock, Link2, MapPin, Users } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { TeamAvatars } from "@/components/shared/UserAvatar"
import { eventTypes, formatTimeRange } from "@/data/calendar"
import { cn } from "@/lib/utils"

export function EventDetailDialog({ event, open, onOpenChange }) {
  if (!event) return null

  const typeInfo = eventTypes[event.type]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex flex-wrap items-start gap-2 pr-8">
            <DialogTitle>{event.title}</DialogTitle>
            <Badge variant="outline" className={cn("border", typeInfo.color)}>
              {typeInfo.label}
            </Badge>
          </div>
          <DialogDescription>{event.description}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="text-muted-foreground" />
              <span>
                {new Date(event.date + "T12:00:00").toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="text-muted-foreground" />
              <span>{formatTimeRange(event.startTime, event.endTime)}</span>
            </div>
          </div>

          {event.location && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="text-muted-foreground" />
              <span>{event.location}</span>
            </div>
          )}

          {event.taskId && (
            <div className="flex items-center gap-2 text-sm">
              <Link2 className="text-muted-foreground" />
              <span className="text-muted-foreground">
                Linked to task{" "}
                <span className="font-medium text-foreground">{event.taskId}</span>
              </span>
            </div>
          )}

          {event.assignees?.length > 0 && (
            <>
              <Separator />
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Users className="text-muted-foreground" />
                  {event.type === "personal" ? "Owner" : "Attendees"}
                </div>
                <TeamAvatars members={event.assignees} avatarClassName="size-8" />
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
