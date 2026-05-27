export const eventTypes = {
  meeting: { label: "Meeting", color: "bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-500/30" },
  personal: { label: "Personal", color: "bg-amber-500/15 text-amber-800 dark:text-amber-200 border-amber-500/30" },
  task: { label: "Task deadline", color: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 border-emerald-500/30" },
}

export const calendarEvents = [
  {
    id: "evt-1",
    title: "Product standup",
    description: "Daily sync with the product squad on sprint goals and blockers.",
    type: "meeting",
    date: "2026-05-26",
    startTime: "09:00",
    endTime: "09:30",
    assignees: ["AR", "JK", "SC"],
    location: "Zoom",
  },
  {
    id: "evt-2",
    title: "Customer demo",
    description: "Enterprise demo for Acme Corp — AI agent platform walkthrough.",
    type: "meeting",
    date: "2026-05-26",
    startTime: "14:00",
    endTime: "15:00",
    assignees: ["ML", "SC"],
    location: "Conference Room A",
  },
  {
    id: "evt-3",
    title: "Focus time",
    description: "Blocked time for deep work on roadmap planning.",
    type: "personal",
    date: "2026-05-26",
    startTime: "10:00",
    endTime: "12:00",
    assignees: ["SC"],
    location: null,
  },
  {
    id: "evt-4",
    title: "Review enterprise SSO spec",
    description: "Task deadline — Security review for SAML/OIDC integration.",
    type: "task",
    date: "2026-05-27",
    startTime: "17:00",
    endTime: "17:00",
    assignees: ["ML", "JK"],
    taskId: "task-3",
    location: null,
  },
  {
    id: "evt-5",
    title: "AI Research sync",
    description: "Weekly model benchmarks and RAG pipeline updates.",
    type: "meeting",
    date: "2026-05-27",
    startTime: "11:00",
    endTime: "12:00",
    assignees: ["JK", "ML", "AR"],
    location: "Google Meet",
  },
  {
    id: "evt-6",
    title: "Design agent selector UI",
    description: "Task deadline — Create model selector and agent cards for AI chat.",
    type: "task",
    date: "2026-05-28",
    startTime: "17:00",
    endTime: "17:00",
    assignees: ["AR", "SC"],
    taskId: "task-1",
    location: null,
  },
  {
    id: "evt-7",
    title: "Leadership Q2 planning",
    description: "Quarterly planning session with leadership team.",
    type: "meeting",
    date: "2026-05-28",
    startTime: "15:00",
    endTime: "16:30",
    assignees: ["SC", "ML"],
    location: "Board room",
  },
  {
    id: "evt-8",
    title: "Gym",
    description: "Personal wellness block.",
    type: "personal",
    date: "2026-05-28",
    startTime: "07:00",
    endTime: "08:00",
    assignees: ["SC"],
    location: null,
  },
  {
    id: "evt-9",
    title: "Customer demo prep",
    description: "Task deadline — Prepare demo environment and talking points.",
    type: "task",
    date: "2026-05-26",
    startTime: "17:00",
    endTime: "17:00",
    assignees: ["ML", "SC"],
    taskId: "task-6",
    location: null,
  },
  {
    id: "evt-10",
    title: "Engineering all-hands",
    description: "Monthly engineering updates and roadmap preview.",
    type: "meeting",
    date: "2026-05-30",
    startTime: "16:00",
    endTime: "17:00",
    assignees: ["AR", "JK", "ML", "SC"],
    location: "Main auditorium",
  },
  {
    id: "evt-11",
    title: "Implement RAG document upload",
    description: "Task deadline — Drag-and-drop upload with status indicators.",
    type: "task",
    date: "2026-06-02",
    startTime: "17:00",
    endTime: "17:00",
    assignees: ["JK"],
    taskId: "task-2",
    location: null,
  },
  {
    id: "evt-12",
    title: "Ship analytics dashboard v1",
    description: "Task deadline — Usage stats, cost tracking, team insights.",
    type: "task",
    date: "2026-06-05",
    startTime: "17:00",
    endTime: "17:00",
    assignees: ["AR"],
    taskId: "task-4",
    location: null,
  },
  {
    id: "evt-13",
    title: "1:1 with Alex",
    description: "Bi-weekly check-in on agent platform progress.",
    type: "meeting",
    date: "2026-06-03",
    startTime: "10:00",
    endTime: "10:30",
    assignees: ["AR", "SC"],
    location: "Zoom",
  },
]

export function getEventsForDate(date, events = calendarEvents) {
  const key = formatDateKey(date)
  return events.filter((e) => e.date === key)
}

export function formatDateKey(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

export function formatTimeRange(start, end) {
  if (start === end) return "All day"
  return `${start} – ${end}`
}
