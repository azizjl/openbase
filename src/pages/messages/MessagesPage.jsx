import { useState } from "react"
import { Hash, Plus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Send } from "lucide-react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { MessageBubble } from "@/components/messages/MessageBubble"
import { channels, directMessages, channelMessages, onlineUsers } from "@/data/messages"
import { cn } from "@/lib/utils"

export function MessagesPage() {
  const [activeChannel, setActiveChannel] = useState("product")
  const [message, setMessage] = useState("")

  return (
    <div className="flex h-[calc(100svh-8rem)] flex-col gap-4">
      <PageHeader
        title="Messages"
        description="Team communication across channels and direct messages"
      >
        <Button size="sm">
          <Plus data-icon="inline-start" />
          New channel
        </Button>
      </PageHeader>

      <div className="flex flex-1 overflow-hidden rounded-xl border">
        <div className="flex w-56 shrink-0 flex-col border-r bg-sidebar">
          <div className="flex flex-col gap-1 p-3">
            <span className="px-2 text-xs font-medium text-muted-foreground">Channels</span>
            {channels.map((ch) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => setActiveChannel(ch.name)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-sidebar-accent",
                  activeChannel === ch.name && "bg-sidebar-accent"
                )}
              >
                <Hash className="text-muted-foreground" />
                <span className="flex-1 truncate text-left">{ch.name}</span>
                {ch.unread > 0 && (
                  <Badge variant="default" className="size-5 justify-center p-0 text-[10px]">
                    {ch.unread}
                  </Badge>
                )}
              </button>
            ))}
          </div>
          <Separator />
          <div className="flex flex-col gap-1 p-3">
            <span className="px-2 text-xs font-medium text-muted-foreground">Direct Messages</span>
            {directMessages.map((dm) => (
              <button
                key={dm.id}
                type="button"
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-sidebar-accent"
              >
                <Avatar className="size-6">
                  <AvatarFallback className="text-[10px]">{dm.initials}</AvatarFallback>
                </Avatar>
                <span className="flex-1 truncate text-left">{dm.name}</span>
                {dm.unread > 0 && (
                  <Badge variant="default" className="size-5 justify-center p-0 text-[10px]">
                    {dm.unread}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex h-12 items-center gap-2 border-b px-4">
            <Hash className="text-muted-foreground" />
            <span className="font-medium">{activeChannel}</span>
            <span className="text-sm text-muted-foreground">· 12 members</span>
          </div>
          <ScrollArea className="flex-1 py-4">
            {channelMessages.map((msg) => (
              <MessageBubble key={msg.id} {...msg} />
            ))}
          </ScrollArea>
          <div className="border-t p-4">
            <InputGroup>
              <InputGroupInput
                placeholder={`Message #${activeChannel}`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton variant="ghost">
                  <Send />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>

        <div className="hidden w-48 shrink-0 flex-col border-l bg-sidebar xl:flex">
          <div className="flex items-center gap-2 p-3">
            <Users className="text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">Online — 4</span>
          </div>
          <div className="flex flex-col gap-1 px-3">
            {onlineUsers.map((user) => (
              <div key={user.name} className="flex items-center gap-2 rounded-lg px-2 py-1.5">
                <Avatar className="size-6">
                  <AvatarFallback className="text-[10px]">{user.initials}</AvatarFallback>
                </Avatar>
                <span className="truncate text-sm">{user.name}</span>
                <span
                  className={cn(
                    "ml-auto size-2 rounded-full",
                    user.status === "online" ? "bg-emerald-500" : "bg-amber-500"
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
