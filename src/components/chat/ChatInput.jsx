import { Mic, Paperclip, Send } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Button } from "@/components/ui/button"

export function ChatInput({ value, onChange, onSend, placeholder = "Message Nova..." }) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-6">
      <InputGroup className="h-auto min-h-12 rounded-xl shadow-sm">
        <InputGroupAddon align="block-start" className="px-3 pt-3">
          <InputGroupButton variant="ghost" size="icon-sm">
            <Paperclip />
          </InputGroupButton>
        </InputGroupAddon>
        <InputGroupTextarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="min-h-[52px] py-3"
          rows={1}
        />
        <InputGroupAddon align="block-end" className="gap-1 px-3 pb-3">
          <InputGroupButton variant="ghost" size="icon-sm">
            <Mic />
          </InputGroupButton>
          <Button size="sm" onClick={onSend}>
            <Send data-icon="inline-start" />
            Send
          </Button>
        </InputGroupAddon>
      </InputGroup>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        OpenBase AI can make mistakes. Verify important information.
      </p>
    </div>
  )
}
