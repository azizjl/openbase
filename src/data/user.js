import { avatarImages } from "@/lib/avatars"

export const currentUser = {
  id: "user-1",
  name: "Sarah Chen",
  email: "sarah@acme-ai.com",
  role: "Product Lead",
  avatar: avatarImages.SC,
  initials: "SC",
}

export const workspaces = [
  { id: "ws-1", name: "Acme AI", plan: "Enterprise" },
  { id: "ws-2", name: "Research Lab", plan: "Pro" },
]
