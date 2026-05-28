import { Link } from "react-router-dom"
import { MoreHorizontal, Presentation, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export function PresentationCard({ deck, onExportPptx, onExportPdf, className }) {
  return (
    <div
      className={cn(
        "group flex flex-col gap-4 rounded-xl border bg-card/50 p-5 transition-colors hover:bg-muted/30",
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
          <Presentation className="size-5 text-primary" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon-sm" className="opacity-0 group-hover:opacity-100" />
            }
          >
            <MoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onExportPptx?.(deck)}>Export PowerPoint</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onExportPdf?.(deck)}>Export PDF</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <h3 className="font-heading font-semibold leading-snug">{deck.title}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{deck.prompt}</p>
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          <Badge variant="secondary">{deck.slideCount} slides</Badge>
          {deck.generated && (
            <Badge variant="outline" className="gap-1">
              <Sparkles className="size-3" />
              AI generated
            </Badge>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 border-t pt-4">
        <Button size="sm" className="flex-1" render={<Link to={`/presentations/${deck.id}/present`} />}>
          Present
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="flex-1"
          render={<Link to={`/presentations/${deck.id}`} />}
        >
          Edit
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        {deck.author} · Updated {new Date(deck.updatedAt).toLocaleDateString()}
      </p>
    </div>
  )
}
