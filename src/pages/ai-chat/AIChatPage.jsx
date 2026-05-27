import { useEffect, useState } from "react"
import { useLocation, useNavigate, useOutletContext } from "react-router-dom"
import { Eye } from "lucide-react"
import { ChatSidebar } from "@/components/chat/ChatSidebar"
import { ChatBubble } from "@/components/chat/ChatBubble"
import { ChatInput } from "@/components/chat/ChatInput"
import { SuggestedPromptCard } from "@/components/chat/SuggestedPromptCard"
import { ScrollArea } from "@/components/ui/scroll-area"
import { chatMessages } from "@/data/chats"
import { suggestedPrompts, aiAgents } from "@/data/agents"

export function AIChatPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { activeAgent = "agent-1" } = useOutletContext() ?? {}
  const [activeChat, setActiveChat] = useState("chat-1")
  const [input, setInput] = useState("")
  const [context, setContext] = useState("none")
  const [messages, setMessages] = useState(chatMessages)
  const [showChat, setShowChat] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    const initialQuery = location.state?.initialQuery
    if (!initialQuery) return
    setInput(initialQuery)
    setShowChat(true)
    navigate(location.pathname, { replace: true, state: null })
  }, [location.state?.initialQuery, location.pathname, navigate])

  const handleSend = () => {
    if (!input.trim()) return
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        role: "user",
        content: input,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ])
    setInput("")
    setShowChat(true)
  }

  const handlePrompt = (prompt) => {
    setInput(prompt)
    setShowChat(true)
  }

  const agent = aiAgents.find((a) => a.id === activeAgent)

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      <div className="flex flex-1 overflow-hidden">
        <ChatSidebar
          activeChat={activeChat}
          collapsed={sidebarCollapsed}
          onToggleCollapsed={() => setSidebarCollapsed((prev) => !prev)}
          onSelectChat={(id) => {
            setActiveChat(id)
            setShowChat(true)
          }}
          onNewChat={() => {
            setActiveChat("")
            setMessages([])
            setInput("")
            setShowChat(false)
          }}
        />

        <div className="flex flex-1 flex-col overflow-hidden">
          {showChat && messages.length > 0 ? (
            <ScrollArea className="flex-1">
              <div className="mx-auto max-w-3xl">
                {messages.map((msg) => (
                  <ChatBubble key={msg.id} {...msg} />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-8 p-8">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
                  <Eye className="size-8 text-primary" />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="font-heading text-2xl font-semibold">
                    How can OpenBase AI help you today?
                  </h2>
                  <p className="max-w-md text-sm text-muted-foreground">
                    {agent?.description}. Ask anything about your workspace, documents, or projects.
                  </p>
                </div>
              </div>
              <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-2">
                {suggestedPrompts.map((item) => (
                  <SuggestedPromptCard
                    key={item.text}
                    prompt={item.text}
                    icon={item.icon}
                    onClick={() => handlePrompt(item.text)}
                  />
                ))}
              </div>
            </div>
          )}

          <ChatInput
            value={input}
            onChange={setInput}
            onSend={handleSend}
            context={context}
            onContextChange={setContext}
            placeholder="Message OpenBase AI..."
          />
        </div>
      </div>
    </div>
  )
}
