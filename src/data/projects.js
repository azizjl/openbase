import { avatarImages } from "@/lib/avatars"

export const projects = [
  {
    id: "proj-1",
    name: "AI Agent Platform v2",
    description: "Multi-agent orchestration with enterprise features including SSO, audit logs, and team-level permissions.",
    progress: 72,
    status: "active",
    team: [
      { initials: "AR", avatar: avatarImages.AR },
      { initials: "JK", avatar: avatarImages.JK },
      { initials: "SC", avatar: avatarImages.SC },
      { initials: "ML", avatar: null },
    ],
    lastUpdated: "2 hours ago",
    tasksCount: 24,
    completedTasks: 17,
    lead: "Alex Rivera",
    dueDate: "June 30, 2026",
  },
  {
    id: "proj-2",
    name: "RAG Document Pipeline",
    description: "Document indexing, semantic search, and citation-backed answers for enterprise knowledge bases.",
    progress: 45,
    status: "active",
    team: [
      { initials: "JK", avatar: avatarImages.JK },
      { initials: "SC", avatar: avatarImages.SC },
    ],
    lastUpdated: "Yesterday",
    tasksCount: 18,
    completedTasks: 8,
    lead: "Jordan Kim",
    dueDate: "July 15, 2026",
  },
  {
    id: "proj-3",
    name: "Enterprise Analytics",
    description: "Usage metrics, cost tracking, and team-level insights dashboard for AI operations.",
    progress: 30,
    status: "active",
    team: [
      { initials: "AR", avatar: avatarImages.AR },
      { initials: "ML", avatar: avatarImages.ML },
    ],
    lastUpdated: "3 days ago",
    tasksCount: 12,
    completedTasks: 4,
    lead: "Morgan Lee",
    dueDate: "August 1, 2026",
  },
  {
    id: "proj-4",
    name: "Customer Portal Redesign",
    description: "Modern self-service portal for enterprise clients with billing, support, and agent management.",
    progress: 100,
    status: "completed",
    team: [
      { initials: "ML", avatar: avatarImages.ML },
      { initials: "SC", avatar: avatarImages.SC },
    ],
    lastUpdated: "Last week",
    tasksCount: 32,
    completedTasks: 32,
    lead: "Sarah Chen",
    dueDate: "Completed",
  },
]

export const recentUpdates = [
  { project: "AI Agent Platform v2", update: "SSO integration merged", time: "2h ago" },
  { project: "RAG Document Pipeline", update: "Upload API spec approved", time: "1d ago" },
  { project: "Enterprise Analytics", update: "Chart components added", time: "3d ago" },
]
