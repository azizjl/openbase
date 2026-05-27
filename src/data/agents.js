import { Headphones, ListChecks, Mail, Map } from "lucide-react"

export const aiAgents = [
  {
    id: "agent-1",
    name: "Nova",
    description: "General-purpose enterprise assistant",
    model: "GPT-4o",
    color: "from-violet-500/20 to-indigo-500/20",
    icon: "sparkles",
    active: true,
  },
  {
    id: "agent-2",
    name: "Atlas",
    description: "Data analysis & insights",
    model: "Claude 3.5",
    color: "from-blue-500/20 to-cyan-500/20",
    icon: "bar-chart",
    active: false,
  },
  {
    id: "agent-3",
    name: "Cipher",
    description: "Code review & engineering",
    model: "GPT-4o",
    color: "from-emerald-500/20 to-teal-500/20",
    icon: "code",
    active: false,
  },
  {
    id: "agent-4",
    name: "Scribe",
    description: "Documents & RAG queries",
    model: "Gemini Pro",
    color: "from-amber-500/20 to-orange-500/20",
    icon: "file-text",
    active: false,
  },
]

export const suggestedPrompts = [
  {
    text: "Summarize our Q1 product roadmap",
    icon: Map,
  },
  {
    text: "Draft a client onboarding email",
    icon: Mail,
  },
  {
    text: "Analyze last week's support tickets",
    icon: Headphones,
  },
  {
    text: "Create a sprint planning checklist",
    icon: ListChecks,
  },
]
