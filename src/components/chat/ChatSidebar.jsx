import { MessageSquarePlus, PanelLeft, PanelLeftClose } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { chatHistory } from "@/data/chats"

export function ChatSidebar({
  activeChat,
  onSelectChat,
  onNewChat,
  collapsed = false,
  onToggleCollapsed,
}) {
  if (collapsed) {
    return (
      <div className="flex h-full w-12 shrink-0 flex-col items-center gap-2 border-r bg-background py-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapsed}
          aria-label="Expand recent chats"
        >
          <PanelLeft />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onNewChat}
          aria-label="New chat"
        >
          <MessageSquarePlus />
        </Button>
      </div>
    )
  }

  return (
    <div className="flex h-full w-64 shrink-0 flex-col border-r bg-background">
      <div className="flex items-center gap-2 p-3 pb-2">
        <Button
          size="sm"
          className="h-10 min-w-0 flex-1 justify-center gap-2 border-transparent bg-[#49a052] text-white hover:bg-[#49a052]/90"
          onClick={onNewChat}
        >
          <MessageSquarePlus className="size-4" />
          New chat
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-10 shrink-0 rounded-xl"
          onClick={onToggleCollapsed}
          aria-label="Collapse recent chats"
        >
          <PanelLeftClose />
        </Button>
      </div>
      <div className="flex flex-1 flex-col gap-1 overflow-hidden px-3 pb-3">
        <span className="px-2 text-xs font-medium text-muted-foreground">Recent</span>
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-0.5 pr-2">
            {chatHistory.map((chat) => (
              <button
                key={chat.id}
                type="button"
                onClick={() => onSelectChat?.(chat.id)}
                className={cn(
                  "flex flex-col gap-0.5 rounded-lg px-2 py-2 text-left text-sm transition-colors hover:bg-muted",
                  activeChat === chat.id && "bg-muted"
                )}
              >
                <span className="truncate font-medium">{chat.title}</span>
                <span className="truncate text-xs text-muted-foreground">{chat.updatedAt}</span>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
