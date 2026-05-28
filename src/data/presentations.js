const agentPlatformSlides = [
  {
    id: "slide-1",
    layout: "title",
    title: "AI Agent Platform v2",
    subtitle: "Enterprise roadmap · Q2 2026",
    notes: "Open with the vision — 30 seconds max.",
  },
  {
    id: "slide-2",
    layout: "bullets",
    title: "The challenge",
    bullets: [
      "Teams use 6+ tools for AI, docs, and project work",
      "Generic chat lacks company context and governance",
      "RAG pipelines are fragmented and hard to monitor",
    ],
    notes: "Emphasize pain before showing the product.",
  },
  {
    id: "slide-3",
    layout: "bullets",
    title: "OpenBase solution",
    bullets: [
      "Unified AI workspace with specialized agents",
      "Document indexing built for enterprise RAG",
      "Org-wide visibility with audit logs and SSO",
    ],
    notes: "This is the 'aha' slide.",
  },
  {
    id: "slide-4",
    layout: "section",
    title: "Product pillars",
    sectionTitle: "Chat · Documents · People · Tasks",
    body: "One dashboard that combines ChatGPT, Notion, and Slack patterns for AI-native teams.",
    notes: "Walk through each pillar briefly.",
  },
  {
    id: "slide-5",
    layout: "bullets",
    title: "Q2 milestones",
    bullets: [
      "Agent orchestration API — staging complete",
      "RAG pipeline v3 — 1,284 docs indexed",
      "Enterprise SSO via Okta — rolled out",
    ],
    notes: "Use metrics from the dashboard mock data.",
  },
  {
    id: "slide-6",
    layout: "title",
    title: "Thank you",
    subtitle: "Questions? Let's build the future of work.",
    notes: "Leave contact info and next steps.",
  },
]

const salesDeckSlides = [
  {
    id: "slide-1",
    layout: "title",
    title: "Acme AI for Enterprise",
    subtitle: "Transform how your team works with AI",
    notes: "Sales opener.",
  },
  {
    id: "slide-2",
    layout: "bullets",
    title: "Why Acme AI",
    bullets: [
      "Deploy custom agents in days, not months",
      "SOC 2 Type II · SAML SSO · audit logs",
      "24/7 customer success with dedicated CSM",
    ],
    notes: "",
  },
  {
    id: "slide-3",
    layout: "quote",
    title: "Customer proof",
    quote: "OpenBase cut our onboarding time by 40% and gave every team member an AI assistant with full company context.",
    attribution: "— VP Product, Fortune 500 customer",
    notes: "",
  },
  {
    id: "slide-4",
    layout: "bullets",
    title: "Pricing tiers",
    bullets: [
      "Pro — up to 10 seats, core agents",
      "Enterprise — unlimited seats, SSO, RAG",
      "Custom — dedicated infra & SLAs",
    ],
    notes: "",
  },
  {
    id: "slide-5",
    layout: "title",
    title: "Next steps",
    subtitle: "Schedule a demo · acme-ai.com",
    notes: "Close with CTA.",
  },
]

export const defaultPresentations = [
  {
    id: "deck-agent-platform",
    title: "AI Agent Platform v2",
    prompt: "Create a product roadmap presentation for our AI agent platform",
    slideCount: agentPlatformSlides.length,
    slides: agentPlatformSlides,
    createdAt: "2026-05-20T10:00:00",
    updatedAt: "2026-05-26T14:30:00",
    author: "Sarah Chen",
  },
  {
    id: "deck-sales",
    title: "Acme AI Enterprise Pitch",
    prompt: "Sales deck for enterprise customers",
    slideCount: salesDeckSlides.length,
    slides: salesDeckSlides,
    createdAt: "2026-05-15T09:00:00",
    updatedAt: "2026-05-22T11:00:00",
    author: "Rachel Green",
  },
]

function buildSlidesFromPrompt(prompt) {
  const lower = prompt.toLowerCase()
  const base =
    lower.includes("sales") || lower.includes("enterprise") || lower.includes("pitch")
      ? salesDeckSlides
      : agentPlatformSlides

  const titleMatch = prompt.match(/(?:about|for|on)\s+(.+)/i)
  const customTitle = titleMatch?.[1]?.trim().slice(0, 60)

  return base.map((slide, index) => {
    if (index === 0 && customTitle) {
      return { ...slide, title: customTitle.charAt(0).toUpperCase() + customTitle.slice(1) }
    }
    return { ...slide, id: `slide-${index + 1}-${Date.now()}` }
  })
}

export function generatePresentationFromPrompt(prompt) {
  const slides = buildSlidesFromPrompt(prompt)
  const now = new Date().toISOString()

  return {
    id: `deck-${Date.now()}`,
    title: slides[0]?.title || "AI Generated Presentation",
    prompt,
    slideCount: slides.length,
    slides,
    createdAt: now,
    updatedAt: now,
    author: "Sarah Chen",
    generated: true,
  }
}
