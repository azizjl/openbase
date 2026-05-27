import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Calendar,
  CheckSquare,
  Eye,
  FileText,
  FolderKanban,
  Hash,
  MessageCircle,
  MessageSquare,
  Sparkles,
  User,
  Users,
} from "lucide-react"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { groupSearchResults, searchGlobal } from "@/lib/globalSearch"
import { cn } from "@/lib/utils"

const typeIcons = {
  "ai-chat": MessageSquare,
  channel: Hash,
  group: Users,
  dm: MessageCircle,
  project: FolderKanban,
  task: CheckSquare,
  document: FileText,
  calendar: Calendar,
  user: User,
}

const typeIconStyles = {
  "ai-chat": {
    bg: "bg-indigo-500/12",
    icon: "text-indigo-700 dark:text-indigo-300",
  },
  channel: {
    bg: "bg-sidebar-accent",
    icon: "text-[#49a052] dark:text-[#7bc47f]",
  },
  group: {
    bg: "bg-blue-500/12",
    icon: "text-blue-700 dark:text-blue-300",
  },
  dm: {
    bg: "bg-sky-500/12",
    icon: "text-sky-700 dark:text-sky-300",
  },
  project: {
    bg: "bg-amber-500/12",
    icon: "text-amber-800 dark:text-amber-200",
  },
  task: {
    bg: "bg-violet-500/12",
    icon: "text-violet-700 dark:text-violet-300",
  },
  document: {
    bg: "bg-slate-500/12",
    icon: "text-slate-700 dark:text-slate-300",
  },
  calendar: {
    bg: "bg-purple-500/12",
    icon: "text-purple-700 dark:text-purple-300",
  },
  user: {
    bg: "bg-teal-500/12",
    icon: "text-teal-700 dark:text-teal-300",
  },
}

export function GlobalSearchDialog({ open, onOpenChange }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")

  useEffect(() => {
    if (!open) setQuery("")
  }, [open])

  const results = useMemo(() => searchGlobal(query), [query])
  const groupedResults = useMemo(() => groupSearchResults(results), [results])
  const trimmedQuery = query.trim()
  const showAiAction = trimmedQuery.length > 0

  const handleSelect = (href, state) => {
    onOpenChange(false)
    navigate(href, state ? { state } : undefined)
  }

  const handleAskAi = () => {
    handleSelect("/ai-chat", { initialQuery: trimmedQuery })
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search OpenBase"
      description="Search across chats, projects, tasks, documents, calendar, and people"
      className="sm:max-w-xl"
    >
      <Command shouldFilter={false} className="rounded-xl">
        <CommandInput
          placeholder="Search everything..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList className="max-h-[min(24rem,50vh)]">
          {!trimmedQuery && (
            <div className="px-3 py-6 text-center text-sm text-muted-foreground">
              Search AI chats, messages, projects, tasks, documents, calendar events, and
              people
            </div>
          )}

          {trimmedQuery && results.length === 0 && !showAiAction && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}

          {showAiAction && (
            <>
              <CommandGroup heading="OpenBase AI">
                <CommandItem value={`ask-ai-${trimmedQuery}`} onSelect={handleAskAi}>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Eye className="size-4 text-primary" />
                  </span>
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className="truncate font-medium">
                      Ask OpenBase AI about &ldquo;{trimmedQuery}&rdquo;
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      Open in AI Chat with your question prefilled
                    </span>
                  </div>
                  <Sparkles className="ml-auto size-4 text-muted-foreground" />
                </CommandItem>
              </CommandGroup>
              {(groupedResults.length > 0 || results.length > 0) && <CommandSeparator />}
            </>
          )}

          {trimmedQuery &&
            groupedResults.map(([heading, items]) => (
              <CommandGroup key={heading} heading={heading}>
                {items.map((item) => {
                  const Icon = typeIcons[item.type] || FileText
                  const iconStyle = typeIconStyles[item.type]
                  return (
                    <CommandItem
                      key={`${item.type}-${item.id}`}
                      value={`${item.type}-${item.id}-${item.title}`}
                      onSelect={() => handleSelect(item.href)}
                    >
                      <span
                        className={cn(
                          "flex size-8 shrink-0 items-center justify-center rounded-lg",
                          iconStyle?.bg ?? "bg-muted"
                        )}
                      >
                        <Icon
                          className={cn(
                            "size-4",
                            iconStyle?.icon ?? "text-muted-foreground"
                          )}
                        />
                      </span>
                      <div className="flex min-w-0 flex-col gap-0.5">
                        <span className="truncate font-medium">{item.title}</span>
                        {item.subtitle && (
                          <span className="truncate text-xs text-muted-foreground">
                            {item.subtitle}
                          </span>
                        )}
                      </div>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            ))}

          {trimmedQuery && results.length === 0 && (
            <CommandEmpty>Try a different keyword or ask OpenBase AI above.</CommandEmpty>
          )}
        </CommandList>
      </Command>
    </CommandDialog>
  )
}
