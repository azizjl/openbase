import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { chatHistory } from "@/data/chats"

export function ChatSidebar({ activeChat, onSelectChat }) {
  return (
    <div className="flex h-full w-64 shrink-0 flex-col border-r bg-sidebar">
      <div className="flex flex-col gap-2 p-3">
        <Button className="w-full justify-start" size="sm">
          <Plus data-icon="inline-start" />
          New chat
        </Button>
      </div>
      <div className="flex flex-1 flex-col gap-1 overflow-hidden p-3">
        <span className="px-2 text-xs font-medium text-muted-foreground">Recent</span>
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-0.5 pr-2">
            {chatHistory.map((chat) => (
              <button
                key={chat.id}
                type="button"
                onClick={() => onSelectChat?.(chat.id)}
                className={cn(
                  "flex flex-col gap-0.5 rounded-lg px-2 py-2 text-left text-sm transition-colors hover:bg-sidebar-accent",
                  activeChat === chat.id && "bg-sidebar-accent"
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
