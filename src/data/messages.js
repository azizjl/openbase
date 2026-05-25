export const channels = [
  { id: "ch-1", name: "general", type: "public", unread: 0 },
  { id: "ch-2", name: "product", type: "public", unread: 3 },
  { id: "ch-3", name: "engineering", type: "public", unread: 0 },
  { id: "ch-4", name: "ai-research", type: "public", unread: 1 },
  { id: "ch-5", name: "customer-success", type: "public", unread: 0 },
]

export const directMessages = [
  { id: "dm-1", name: "Alex Rivera", status: "online", unread: 2, initials: "AR" },
  { id: "dm-2", name: "Jordan Kim", status: "away", unread: 0, initials: "JK" },
  { id: "dm-3", name: "Morgan Lee", status: "online", unread: 0, initials: "ML" },
]

export const channelMessages = [
  {
    id: "cm-1",
    user: "Alex Rivera",
    initials: "AR",
    content: "The new agent orchestration API is ready for review. PR #342 is up.",
    timestamp: "9:15 AM",
  },
  {
    id: "cm-2",
    user: "Jordan Kim",
    initials: "JK",
    content: "Nice! I'll take a look this morning. Are we still on track for Thursday deploy?",
    timestamp: "9:18 AM",
  },
  {
    id: "cm-3",
    user: "Sarah Chen",
    initials: "SC",
    content: "Yes — staging looks good. Let's sync in standup about the RAG pipeline blockers.",
    timestamp: "9:22 AM",
    isOwn: true,
  },
  {
    id: "cm-4",
    user: "Morgan Lee",
    initials: "ML",
    content: "Customer demo at 2pm — I'll need the latest agent cards UI ready 🙏",
    timestamp: "9:45 AM",
  },
]

export const onlineUsers = [
  { name: "Alex Rivera", initials: "AR", status: "online" },
  { name: "Jordan Kim", initials: "JK", status: "away" },
  { name: "Morgan Lee", initials: "ML", status: "online" },
  { name: "Sarah Chen", initials: "SC", status: "online" },
]
