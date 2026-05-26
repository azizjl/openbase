import { useState } from "react"
import { AtSign, Mic, Paperclip, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { chatContexts } from "@/data/chatContexts"
import { cn } from "@/lib/utils"

export function ChatInput({
  value,
  onChange,
  onSend,
  context,
  onContextChange,
  placeholder = "Message OpenBase AI...",
}) {
  const [contextOpen, setContextOpen] = useState(false)

  const selectedContext = chatContexts.find((c) => c.id === context)
  const contextLabel =
    selectedContext && selectedContext.id !== "none"
      ? selectedContext.label
      : null

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSend?.()
    }
  }

  const handleSelectContext = (ctxId) => {
    onContextChange?.(ctxId)
    setContextOpen(false)
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-6">
      <div
        className={cn(
          "flex flex-col rounded-2xl border shadow-sm",
          "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30"
        )}
      >
        <div className="flex items-center justify-between gap-2 px-3 pt-2.5">
          <Popover open={contextOpen} onOpenChange={setContextOpen}>
            <PopoverTrigger
              render={
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  className="h-7 gap-1 px-2 text-muted-foreground hover:text-foreground"
                >
                  <AtSign />
                  {contextLabel ? (
                    <span className="max-w-[160px] truncate text-foreground">
                      {contextLabel}
                    </span>
                  ) : (
                    <span>Add context</span>
                  )}
                </Button>
              }
            />
            <PopoverContent align="start" className="w-80 p-0">
              <Command>
                <CommandInput placeholder="Search contexts..." />
                <CommandList>
                  <CommandEmpty>No context found.</CommandEmpty>
                  <CommandGroup>
                    {chatContexts.map((ctx) => (
                      <CommandItem
                        key={ctx.id}
                        value={ctx.label}
                        onSelect={() => handleSelectContext(ctx.id)}
                        data-checked={context === ctx.id}
                      >
                        <span className="truncate">{ctx.label}</span>
                        {ctx.type !== "default" && (
                          <span className="ml-auto text-xs capitalize text-muted-foreground">
                            {ctx.type}
                          </span>
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <div className="flex shrink-0 gap-0.5">
            <Button variant="ghost" size="icon-sm" type="button">
              <Paperclip />
            </Button>
            <Button variant="ghost" size="icon-sm" type="button">
              <Mic />
            </Button>
          </div>
        </div>

        <div className="flex items-end gap-2 px-3 pb-3 pt-1 mt-4">
          <Textarea
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-[44px] max-h-32 flex-1 resize-none border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 dark:bg-transparent"
            rows={1}
          />
          <Button
            size="icon"
            className="shrink-0 rounded-xl"
            type="button"
            onClick={onSend}
            disabled={!value?.trim()}
          >
            <Send />
          </Button>
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        OpenBase AI can make mistakes. Verify important information.
      </p>
    </div>
  )
}
