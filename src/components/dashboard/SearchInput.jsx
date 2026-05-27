import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

export function SearchInput({
  placeholder = "Search...",
  className,
  onOpen,
  ...props
}) {
  const openSearch = (event) => {
    event.preventDefault()
    onOpen?.()
  }

  return (
    <button
      type="button"
      onClick={openSearch}
      className={cn(
        "flex h-8 w-full min-w-0 items-center gap-2 rounded-lg border border-input bg-transparent px-2 text-sm shadow-none transition-colors outline-none hover:bg-muted/50 dark:bg-input/30",
        className
      )}
      {...props}
    >
      <Search className="size-4 shrink-0 text-muted-foreground" />
      <span className="flex-1 truncate text-left text-muted-foreground">{placeholder}</span>
    </button>
  )
}
