import { UserAvatar } from "@/components/shared/UserAvatar"
import { cn } from "@/lib/utils"

export function MessageBubble({ user, initials, avatar, content, timestamp, isOwn }) {
  return (
    <div className={cn("flex gap-3 px-4 py-2", isOwn && "flex-row-reverse")}>
      <UserAvatar initials={initials} src={avatar} className="size-8 shrink-0" />
      <div className={cn("flex max-w-[75%] flex-col gap-1", isOwn && "items-end")}>
        <div className={cn("flex items-center gap-2", isOwn && "flex-row-reverse")}>
          <span className="text-xs font-medium">{user}</span>
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        </div>
        <div
          className={cn(
            "rounded-xl px-3 py-2 text-sm",
            isOwn
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "bg-muted"
          )}
        >
          {content}
        </div>
      </div>
    </div>
  )
}
