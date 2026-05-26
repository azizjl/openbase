import { useState } from "react"
import { Hash, Plus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { AvatarGroup } from "@/components/ui/avatar"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Send } from "lucide-react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { MessageBubble } from "@/components/messages/MessageBubble"
import { UserAvatar } from "@/components/shared/UserAvatar"
import {
  channels,
  directMessages,
  groupChats,
  channelMessages,
  onlineUsers,
} from "@/data/messages"
import { cn } from "@/lib/utils"

export function MessagesPage() {
  const [activeChannel, setActiveChannel] = useState("product")
  const [activeType, setActiveType] = useState("channel")
  const [message, setMessage] = useState("")

  const activeLabel =
    activeType === "group"
      ? groupChats.find((g) => g.id === activeChannel)?.name
      : activeType === "dm"
        ? directMessages.find((d) => d.id === activeChannel)?.name
        : activeChannel

  return (
    <div className="flex h-[calc(100svh-8rem)] flex-col gap-4">
      <PageHeader
        title="Messages"
        description="Team communication across channels, groups, and direct messages"
      >
        <Button size="sm">
          <Plus data-icon="inline-start" />
          New channel
        </Button>
      </PageHeader>

      <div className="flex flex-1 overflow-hidden rounded-xl border">
        <div className="flex w-60 shrink-0 flex-col border-r bg-sidebar">
          <ScrollArea className="flex-1">
            <div className="flex flex-col gap-1 p-3">
              <span className="px-2 text-xs font-medium text-muted-foreground">Channels</span>
              {channels.map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => {
                    setActiveChannel(ch.name)
                    setActiveType("channel")
                  }}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-sidebar-accent",
                    activeType === "channel" && activeChannel === ch.name && "bg-sidebar-accent"
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

            <Separator className="my-2" />

            <div className="flex flex-col gap-1 px-3 pb-2">
              <span className="px-2 text-xs font-medium text-muted-foreground">Group chats</span>
              {groupChats.map((group) => (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => {
                    setActiveChannel(group.id)
                    setActiveType("group")
                  }}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-2 py-2 text-sm transition-colors hover:bg-sidebar-accent",
                    activeType === "group" && activeChannel === group.id && "bg-sidebar-accent"
                  )}
                >
                  <AvatarGroup className="shrink-0">
                    {group.members.slice(0, 3).map((initials) => (
                      <UserAvatar
                        key={initials}
                        initials={initials}
                        className="size-6 border-2 border-sidebar"
                      />
                    ))}
                  </AvatarGroup>
                  <div className="flex min-w-0 flex-1 flex-col items-start">
                    <span className="truncate font-medium">{group.name}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {group.lastMessage}
                    </span>
                  </div>
                  {group.unread > 0 && (
                    <Badge variant="default" className="size-5 shrink-0 justify-center p-0 text-[10px]">
                      {group.unread}
                    </Badge>
                  )}
                </button>
              ))}
            </div>

            <Separator className="my-2" />

            <div className="flex flex-col gap-1 px-3 pb-3">
              <span className="px-2 text-xs font-medium text-muted-foreground">Direct messages</span>
              {directMessages.map((dm) => (
                <button
                  key={dm.id}
                  type="button"
                  onClick={() => {
                    setActiveChannel(dm.id)
                    setActiveType("dm")
                  }}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-sidebar-accent",
                    activeType === "dm" && activeChannel === dm.id && "bg-sidebar-accent"
                  )}
                >
                  <UserAvatar initials={dm.initials} src={dm.avatar} className="size-7 shrink-0" />
                  <span className="flex-1 truncate text-left">{dm.name}</span>
                  {dm.unread > 0 && (
                    <Badge variant="default" className="size-5 justify-center p-0 text-[10px]">
                      {dm.unread}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex h-12 items-center gap-2 border-b px-4">
            {activeType === "channel" ? (
              <Hash className="text-muted-foreground" />
            ) : activeType === "group" ? (
              <AvatarGroup>
                {groupChats
                  .find((g) => g.id === activeChannel)
                  ?.members.slice(0, 3)
                  .map((initials) => (
                    <UserAvatar key={initials} initials={initials} className="size-6" />
                  ))}
              </AvatarGroup>
            ) : (
              <UserAvatar
                initials={
                  directMessages.find((d) => d.id === activeChannel)?.initials || "?"
                }
                src={directMessages.find((d) => d.id === activeChannel)?.avatar}
                className="size-7"
              />
            )}
            <span className="font-medium">{activeLabel}</span>
            <span className="text-sm text-muted-foreground">
              · {activeType === "dm" ? "Direct message" : activeType === "group" ? "Group" : "12 members"}
            </span>
          </div>
          <ScrollArea className="flex-1 py-4">
            {channelMessages.map((msg) => (
              <MessageBubble key={msg.id} {...msg} />
            ))}
          </ScrollArea>
          <div className="border-t p-4">
            <InputGroup>
              <InputGroupInput
                placeholder={`Message ${activeLabel}`}
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

        <div className="hidden w-52 shrink-0 flex-col border-l bg-sidebar xl:flex">
          <div className="flex items-center gap-2 p-3">
            <Users className="text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">
              Online — {onlineUsers.length}
            </span>
          </div>
          <ScrollArea className="flex-1 px-3">
            <div className="flex flex-col gap-1 pb-3">
              {onlineUsers.map((user) => (
                <div
                  key={user.name}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-sidebar-accent"
                >
                  <UserAvatar initials={user.initials} src={user.avatar} className="size-7" />
                  <span className="truncate text-sm">{user.name}</span>
                  <span
                    className={cn(
                      "ml-auto size-2 shrink-0 rounded-full",
                      user.status === "online" ? "bg-emerald-500" : "bg-amber-500"
                    )}
                  />
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
