import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getAvatarUrl } from "@/lib/avatars"
import { cn } from "@/lib/utils"

export function UserAvatar({ initials, src, className, size }) {
  const imageSrc = src ?? getAvatarUrl(initials)

  return (
    <Avatar className={className} size={size}>
      {imageSrc && <AvatarImage src={imageSrc} alt={initials} />}
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  )
}

export function TeamAvatars({ members, className, avatarClassName }) {
  return (
    <div className={cn("flex -space-x-2", className)}>
      {members.map((member) => {
        const initials = typeof member === "string" ? member : member.initials
        const src = typeof member === "string" ? undefined : member.avatar
        return (
          <UserAvatar
            key={initials}
            initials={initials}
            src={src}
            className={cn("border-2 border-card", avatarClassName || "size-7")}
          />
        )
      })}
    </div>
  )
}
