import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function SuggestedPromptCard({ prompt, icon: Icon, onClick, className }) {
  return (
    <Card
      size="sm"
      className={cn(
        "cursor-pointer transition-all hover:ring-foreground/20 hover:-translate-y-0.5",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#49a052]/12 text-[#49a052] dark:text-[#7bc47f]">
          <Icon className="size-4" />
        </span>
        <p className="text-sm leading-snug text-muted-foreground">{prompt}</p>
      </CardContent>
    </Card>
  )
}
