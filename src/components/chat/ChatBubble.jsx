import { Bot } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChatMessageContent } from "@/components/chat/ChatMessageContent"
import { UserAvatar } from "@/components/shared/UserAvatar"
import { cn } from "@/lib/utils"
import { currentUser } from "@/data/user"

export function ChatBubble({ role, content, agent, timestamp }) {
  const isUser = role === "user"

  return (
    <div
      className={cn(
        "flex gap-3 px-4 py-4",
        isUser && "flex-row-reverse"
      )}
    >
      {isUser ? (
        <UserAvatar
          initials={currentUser.initials}
          src={currentUser.avatar}
          className="size-8 shrink-0"
        />
      ) : (
        <Avatar className="size-8 shrink-0">
          <AvatarFallback className="bg-primary/10 text-primary">
            <Bot />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "flex min-w-0 flex-col gap-1",
          isUser ? "items-end max-w-[80%]" : "flex-1"
        )}
      >
        <div className={cn("flex items-center gap-2", isUser && "flex-row-reverse")}>
          <span className="text-sm font-medium">
            {isUser ? currentUser.name : agent || "OpenBase AI"}
          </span>
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        </div>
        <div
          className={cn(
            "text-sm leading-relaxed whitespace-pre-wrap",
            isUser
              ? "rounded-xl bg-sidebar-accent px-4 py-2.5 text-sidebar-accent-foreground"
              : "rounded-2xl bg-muted px-4 py-2.5 text-foreground"
          )}
        >
          {isUser ? content : <ChatMessageContent content={content} />}
        </div>
      </div>
    </div>
  )
}
