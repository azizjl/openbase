import { useMemo, useState } from "react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarGrid } from "@/components/calendar/CalendarGrid"
import { UpcomingAgenda } from "@/components/calendar/UpcomingAgenda"
import { EventDetailDialog } from "@/components/calendar/EventDetailDialog"
import { calendarEvents, eventTypes, getEventsForDate } from "@/data/calendar"
import { cn } from "@/lib/utils"

export function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 1))
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 4, 26))
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const monthLabel = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  const agendaEvents = useMemo(() => {
    if (!selectedDate) return calendarEvents
    return getEventsForDate(selectedDate)
  }, [selectedDate])

  const handleSelectEvent = (event) => {
    setSelectedEvent(event)
    setDialogOpen(true)
  }

  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const goToToday = () => {
    const today = new Date(2026, 4, 26)
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1))
    setSelectedDate(today)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
        <div className="flex items-center gap-1 justify-self-start">
          <Button variant="outline" size="icon" onClick={goToPrevMonth}>
            <ChevronLeft />
          </Button>
          <Button variant="outline" size="icon" onClick={goToNextMonth}>
            <ChevronRight />
          </Button>
          <h2 className="ml-2 font-heading text-lg font-semibold">{monthLabel}</h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 justify-self-center">
          {Object.entries(eventTypes).map(([key, info]) => (
            <Badge key={key} variant="outline" className={cn("border font-normal", info.color)}>
              {info.label}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-2 justify-self-end">
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
          <Button size="sm">
            <Plus data-icon="inline-start" />
            New event
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CalendarGrid
            currentDate={currentDate}
            selectedDate={selectedDate}
            onSelectDay={setSelectedDate}
            onSelectEvent={handleSelectEvent}
            events={calendarEvents}
          />
        </div>
        <UpcomingAgenda
          events={agendaEvents}
          selectedDate={selectedDate}
          onSelectEvent={handleSelectEvent}
        />
      </div>

      <EventDetailDialog
        event={selectedEvent}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  )
}
