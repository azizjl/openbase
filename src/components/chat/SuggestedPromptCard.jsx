import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function SuggestedPromptCard({ prompt, onClick, className }) {
  return (
    <Card
      size="sm"
      className={cn(
        "cursor-pointer transition-all hover:ring-foreground/20 hover:-translate-y-0.5",
        className
      )}
      onClick={onClick}
    >
      <CardContent>
        <p className="text-sm text-muted-foreground">{prompt}</p>
      </CardContent>
    </Card>
  )
}
