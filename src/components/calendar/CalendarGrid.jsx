import { CalendarDayCell } from "@/components/calendar/CalendarDayCell"
import { getEventsForDate, formatDateKey } from "@/data/calendar"

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function buildMonthGrid(year, month) {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startPad = firstDay.getDay()
  const daysInMonth = lastDay.getDate()

  const cells = []
  for (let i = 0; i < startPad; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d))
  }
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

export function CalendarGrid({
  currentDate,
  selectedDate,
  onSelectDay,
  onSelectEvent,
  events,
}) {
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const cells = buildMonthGrid(year, month)
  const todayKey = formatDateKey(new Date())
  const selectedKey = selectedDate ? formatDateKey(selectedDate) : null

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="grid grid-cols-7 border-b bg-muted/30">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="border-r px-2 py-2 text-center text-xs font-medium text-muted-foreground last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((day, i) => {
          const dayEvents = day ? getEventsForDate(day, events) : []
          const dayKey = day ? formatDateKey(day) : null
          return (
            <CalendarDayCell
              key={day ? dayKey : `empty-${i}`}
              day={day}
              isCurrentMonth={!!day}
              isToday={dayKey === todayKey}
              isSelected={dayKey === selectedKey}
              events={dayEvents}
              onSelectDay={onSelectDay}
              onSelectEvent={onSelectEvent}
            />
          )
        })}
      </div>
    </div>
  )
}
