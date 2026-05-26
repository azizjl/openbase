import { MessageSquarePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { chatHistory } from "@/data/chats"

export function ChatSidebar({ activeChat, onSelectChat, onNewChat }) {
  return (
    <div className="flex h-full w-64 shrink-0 flex-col border-r bg-background">
      <div className="p-3 pb-2">
        <Button
          variant="outline"
          size="default"
          className={cn(
            "h-10 w-full justify-start gap-2 rounded-xl border-dashed font-medium shadow-none",
            "border-border/80 bg-muted/30 hover:border-primary/40 hover:bg-muted/60 hover:text-foreground"
          )}
          onClick={onNewChat}
        >
          <MessageSquarePlus data-icon="inline-start" />
          New chat
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
