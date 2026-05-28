import { chatHistory } from "@/data/chats"
import { channels, groupChats, directMessages } from "@/data/messages"
import { projects } from "@/data/projects"
import { tasks } from "@/data/tasks"
import { documents } from "@/data/documents"
import { calendarEvents, eventTypes } from "@/data/calendar"
import { employees, getDepartmentById } from "@/data/employees"
import { logs } from "@/data/logs"
import { getAllPresentations } from "@/lib/presentationStore"
import { onlineUsers } from "@/data/messages"

export const searchGroupLabels = {
  "ai-chat": "AI Chats",
  channel: "Channels",
  group: "Group chats",
  dm: "Direct messages",
  project: "Projects",
  task: "Tasks",
  document: "Documents",
  calendar: "Calendar",
  user: "People",
  employee: "Org chart",
  log: "Logs",
  presentation: "Presentations",
}

const searchIndex = [
  ...chatHistory.map((chat) => ({
    id: chat.id,
    type: "ai-chat",
    title: chat.title,
    subtitle: chat.preview || chat.updatedAt,
    href: "/ai-chat",
    keywords: [chat.title, chat.preview, chat.updatedAt, "ai", "chat"],
  })),
  ...channels.map((ch) => ({
    id: ch.id,
    type: "channel",
    title: `#${ch.name}`,
    subtitle: "Channel",
    href: "/messages",
    keywords: [ch.name, "channel", "messages", "slack"],
  })),
  ...groupChats.map((group) => ({
    id: group.id,
    type: "group",
    title: group.name,
    subtitle: group.lastMessage,
    href: "/messages",
    keywords: [group.name, group.lastMessage, "group", "messages"],
  })),
  ...directMessages.map((dm) => ({
    id: dm.id,
    type: "dm",
    title: dm.name,
    subtitle: "Direct message",
    href: "/messages",
    keywords: [dm.name, dm.initials, "dm", "direct", "messages"],
  })),
  ...projects.map((project) => ({
    id: project.id,
    type: "project",
    title: project.name,
    subtitle: project.description,
    href: "/projects",
    keywords: [
      project.name,
      project.description,
      project.lead,
      project.status,
      "project",
    ],
  })),
  ...tasks.map((task) => ({
    id: task.id,
    type: "task",
    title: task.title,
    subtitle: task.description,
    href: "/tasks",
    keywords: [
      task.title,
      task.description,
      task.status,
      task.priority,
      ...task.tags,
      ...task.assignees,
      "task",
    ],
  })),
  ...documents.map((doc) => ({
    id: doc.id,
    type: "document",
    title: doc.name,
    subtitle: `${doc.category} · ${doc.type.toUpperCase()}`,
    href: "/documents",
    keywords: [doc.name, doc.category, doc.type, doc.status, "document", "file"],
  })),
  ...calendarEvents.map((event) => ({
    id: event.id,
    type: "calendar",
    title: event.title,
    subtitle: `${event.date} · ${eventTypes[event.type]?.label || event.type}`,
    href: "/calendar",
    keywords: [
      event.title,
      event.description,
      event.date,
      event.location,
      event.type,
      "calendar",
      "event",
    ],
  })),
  ...collectPeople().map((person) => ({
    id: person.id,
    type: "user",
    title: person.name,
    subtitle: person.subtitle,
    href: "/messages",
    keywords: [person.name, person.initials, person.subtitle, "user", "people", "team"],
  })),
  ...employees.map((employee) => ({
    id: employee.id,
    type: "employee",
    title: employee.name,
    subtitle: `${employee.title}${employee.departmentId ? ` · ${getDepartmentById(employee.departmentId)?.name || ""}` : ""}`,
    href: "/org-chart",
    keywords: [
      employee.name,
      employee.title,
      employee.email,
      employee.initials,
      employee.location,
      employee.departmentId,
      "employee",
      "org chart",
      "people",
    ],
  })),
  ...logs.map((log) => ({
    id: log.id,
    type: "log",
    title: log.summary,
    subtitle: `${log.actor.name} · ${log.category}`,
    href: "/logs",
    keywords: [
      log.summary,
      log.description,
      log.actor.name,
      log.resource,
      log.action,
      log.category,
      log.status,
      "log",
      "audit",
    ],
  })),
  ...getAllPresentations().map((deck) => ({
    id: deck.id,
    type: "presentation",
    title: deck.title,
    subtitle: `${deck.slideCount} slides · ${deck.author}`,
    href: `/presentations/${deck.id}`,
    keywords: [deck.title, deck.prompt, deck.author, "presentation", "slides", "deck"],
  })),
]

function collectPeople() {
  const seen = new Set()
  const people = []

  const add = (person) => {
    if (seen.has(person.name)) return
    seen.add(person.name)
    people.push(person)
  }

  directMessages.forEach((dm) =>
    add({
      id: dm.id,
      name: dm.name,
      initials: dm.initials,
      subtitle: "Team member",
    })
  )

  onlineUsers.forEach((user) =>
    add({
      id: user.initials,
      name: user.name,
      initials: user.initials,
      subtitle: user.status === "online" ? "Online" : "Away",
    })
  )

  projects.forEach((project) => {
    if (project.lead) {
      add({
        id: `lead-${project.id}`,
        name: project.lead,
        subtitle: `Lead · ${project.name}`,
      })
    }
  })

  return people
}

function matchesQuery(item, query) {
  const haystack = [item.title, item.subtitle, ...item.keywords]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
  return haystack.includes(query)
}

export function searchGlobal(query, limit = 24) {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return []

  return searchIndex.filter((item) => matchesQuery(item, normalized)).slice(0, limit)
}

export function groupSearchResults(results) {
  const groups = new Map()

  for (const result of results) {
    const label = searchGroupLabels[result.type] || "Other"
    if (!groups.has(label)) groups.set(label, [])
    groups.get(label).push(result)
  }

  return Array.from(groups.entries())
}
