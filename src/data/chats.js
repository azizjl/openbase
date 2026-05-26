export const chatHistory = [
  {
    id: "chat-1",
    title: "Q1 Roadmap Summary",
    agentId: "agent-1",
    updatedAt: "2 hours ago",
    preview: "Here's a summary of your Q1 roadmap...",
  },
  {
    id: "chat-2",
    title: "Client Onboarding Flow",
    agentId: "agent-1",
    updatedAt: "Yesterday",
    preview: "I've drafted an onboarding sequence...",
  },
  {
    id: "chat-3",
    title: "Support Ticket Analysis",
    agentId: "agent-2",
    updatedAt: "3 days ago",
    preview: "Top issues: API latency, billing...",
  },
  {
    id: "chat-4",
    title: "API Refactor Plan",
    agentId: "agent-3",
    updatedAt: "Last week",
    preview: "Recommended approach for the auth module...",
  },
]

export const chatMessages = [
  {
    id: "msg-1",
    role: "user",
    content: "Can you summarize our Q1 product roadmap and highlight the top 3 priorities?",
    timestamp: "10:32 AM",
  },
  {
    id: "msg-2",
    role: "assistant",
    content:
      "Based on your Q1 roadmap, here are the top 3 priorities:\n\n1. **AI Agent Platform v2** — Launch multi-agent orchestration with enterprise SSO and audit logs.\n\n2. **RAG Document Pipeline** — Ship document indexing, semantic search, and citation-backed answers.\n\n3. **Enterprise Analytics Dashboard** — Usage metrics, cost tracking, and team-level insights.\n\nWould you like me to break down timelines or dependencies for any of these?",
    timestamp: "10:32 AM",
    agent: "OpenBase AI",
  },
]
