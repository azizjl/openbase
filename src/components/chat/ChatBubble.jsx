import { Bot, User } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { currentUser } from "@/data/user"

export function ChatBubble({ role, content, agent, timestamp }) {
  const isUser = role === "user"

  return (
    <div
      className={cn(
        "flex gap-3 px-4 py-6",
        isUser ? "bg-transparent" : "bg-muted/30"
      )}
    >
      <Avatar className="size-8 shrink-0">
        <AvatarFallback className={cn(!isUser && "bg-primary/10 text-primary")}>
          {isUser ? (
            currentUser.initials
          ) : (
            <Bot />
          )}
        </AvatarFallback>
      </Avatar>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {isUser ? currentUser.name : agent || "Nova"}
          </span>
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        </div>
        <div className="prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed whitespace-pre-wrap">
          {content}
        </div>
      </div>
    </div>
  )
}
