import { useState } from "react"
import { Eye, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { ChatSidebar } from "@/components/chat/ChatSidebar"
import { ChatBubble } from "@/components/chat/ChatBubble"
import { ChatInput } from "@/components/chat/ChatInput"
import { AIModelSelector } from "@/components/chat/AIModelSelector"
import { SuggestedPromptCard } from "@/components/chat/SuggestedPromptCard"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserDropdown } from "@/components/layout/UserDropdown"
import { chatMessages } from "@/data/chats"
import { suggestedPrompts, aiAgents } from "@/data/agents"
import { chatContexts } from "@/data/chatContexts"

export function AIChatPage() {
  const [activeChat, setActiveChat] = useState("chat-1")
  const [activeAgent, setActiveAgent] = useState("agent-1")
  const [input, setInput] = useState("")
  const [context, setContext] = useState("none")
  const [messages, setMessages] = useState(chatMessages)
  const [showChat, setShowChat] = useState(true)

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
  const selectedContext = chatContexts.find((c) => c.id === context)

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-4" />
        <AIModelSelector selectedAgent={activeAgent} onSelect={setActiveAgent} />
        {selectedContext && selectedContext.id !== "none" && (
          <span className="hidden text-xs text-muted-foreground sm:inline">
            · {selectedContext.label}
          </span>
        )}
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Settings />
          </Button>
          <UserDropdown />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <ChatSidebar
          activeChat={activeChat}
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
                {suggestedPrompts.map((prompt) => (
                  <SuggestedPromptCard
                    key={prompt}
                    prompt={prompt}
                    onClick={() => handlePrompt(prompt)}
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
