import { Link } from "react-router-dom"
import { LogOut, Settings, User } from "lucide-react"
import { UserAvatar } from "@/components/shared/UserAvatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { currentUser } from "@/data/user"

export function UserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" className="rounded-full">
            <UserAvatar
              initials={currentUser.initials}
              src={currentUser.avatar}
              className="size-8"
            />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <div className="flex flex-col gap-0.5">
              <span>{currentUser.name}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {currentUser.email}
              </span>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User data-icon="inline-start" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings data-icon="inline-start" />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem render={<Link to="/login" />}>
            <LogOut data-icon="inline-start" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
