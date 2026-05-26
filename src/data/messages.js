import { avatarImages } from "@/lib/avatars"

export const channels = [
  { id: "ch-1", name: "general", type: "public", unread: 0 },
  { id: "ch-2", name: "product", type: "public", unread: 3 },
  { id: "ch-3", name: "engineering", type: "public", unread: 0 },
  { id: "ch-4", name: "ai-research", type: "public", unread: 1 },
  { id: "ch-5", name: "customer-success", type: "public", unread: 0 },
]

export const groupChats = [
  {
    id: "gc-1",
    name: "Product Squad",
    members: ["AR", "JK", "SC"],
    unread: 5,
    lastMessage: "Let's sync before the demo",
  },
  {
    id: "gc-2",
    name: "AI Research",
    members: ["JK", "ML", "AR"],
    unread: 0,
    lastMessage: "Model benchmarks look good",
  },
  {
    id: "gc-3",
    name: "Leadership",
    members: ["SC", "ML"],
    unread: 1,
    lastMessage: "Q2 planning doc shared",
  },
]

export const directMessages = [
  { id: "dm-1", name: "Alex Rivera", status: "online", unread: 2, initials: "AR", avatar: avatarImages.AR },
  { id: "dm-2", name: "Jordan Kim", status: "away", unread: 0, initials: "JK", avatar: avatarImages.JK },
  { id: "dm-3", name: "Morgan Lee", status: "online", unread: 0, initials: "ML", avatar: avatarImages.ML },
]

export const totalUnreadMessages =
  channels.reduce((sum, c) => sum + c.unread, 0) +
  groupChats.reduce((sum, g) => sum + g.unread, 0) +
  directMessages.reduce((sum, d) => sum + d.unread, 0)

export const channelMessages = [
  {
    id: "cm-1",
    user: "Alex Rivera",
    initials: "AR",
    avatar: avatarImages.AR,
    content: "The new agent orchestration API is ready for review. PR #342 is up.",
    timestamp: "9:15 AM",
  },
  {
    id: "cm-2",
    user: "Jordan Kim",
    initials: "JK",
    avatar: avatarImages.JK,
    content: "Nice! I'll take a look this morning. Are we still on track for Thursday deploy?",
    timestamp: "9:18 AM",
  },
  {
    id: "cm-3",
    user: "Sarah Chen",
    initials: "SC",
    avatar: avatarImages.SC,
    content: "Yes — staging looks good. Let's sync in standup about the RAG pipeline blockers.",
    timestamp: "9:22 AM",
    isOwn: true,
  },
  {
    id: "cm-4",
    user: "Morgan Lee",
    initials: "ML",
    avatar: avatarImages.ML,
    content: "Customer demo at 2pm — I'll need the latest agent cards UI ready",
    timestamp: "9:45 AM",
  },
]

export const onlineUsers = [
  { name: "Alex Rivera", initials: "AR", avatar: avatarImages.AR, status: "online" },
  { name: "Jordan Kim", initials: "JK", avatar: avatarImages.JK, status: "away" },
  { name: "Morgan Lee", initials: "ML", avatar: avatarImages.ML, status: "online" },
  { name: "Sarah Chen", initials: "SC", avatar: avatarImages.SC, status: "online" },
]
