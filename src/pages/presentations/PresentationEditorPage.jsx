import { useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import {
  ChevronLeft,
  ChevronRight,
  Download,
  FileDown,
  Play,
  Presentation,
} from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TldrawSlideEditor } from "@/components/presentations/TldrawSlideEditor"
import { SlideContent } from "@/components/presentations/SlideContent"
import { exportPresentationToPptx, openPresentationPrintView } from "@/lib/presentationExport"
import { getPresentationById } from "@/lib/presentationStore"
import { cn } from "@/lib/utils"

export function PresentationEditorPage() {
  const { id } = useParams()
  const deck = useMemo(() => getPresentationById(id), [id])
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)

  if (!deck) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <Presentation className="size-12 text-muted-foreground" />
        <p className="text-muted-foreground">Presentation not found.</p>
        <Button render={<Link to="/presentations" />}>Back to presentations</Button>
      </div>
    )
  }

  const activeSlide = deck.slides[activeSlideIndex]

  const handleExportPptx = async () => {
    try {
      await exportPresentationToPptx(deck)
      toast.success("PowerPoint exported")
    } catch {
      toast.error("Failed to export PowerPoint")
    }
  }

  const handleExportPdf = () => {
    openPresentationPrintView(deck.id)
    toast.info("Opening print view — choose Save as PDF")
  }

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      <div className="flex shrink-0 items-center justify-between gap-3 border-b px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <Button variant="ghost" size="icon-sm" render={<Link to="/presentations" />}>
            <ChevronLeft />
          </Button>
          <div className="min-w-0">
            <h1 className="truncate font-heading text-lg font-semibold">{deck.title}</h1>
            <p className="truncate text-xs text-muted-foreground">
              Slide {activeSlideIndex + 1} of {deck.slides.length}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="hidden sm:inline-flex">
            tldraw editor
          </Badge>
          <Button variant="outline" size="sm" onClick={handleExportPdf}>
            <FileDown data-icon="inline-start" />
            PDF
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportPptx}>
            <Download data-icon="inline-start" />
            PPTX
          </Button>
          <Button size="sm" render={<Link to={`/presentations/${deck.id}/present`} />}>
            <Play data-icon="inline-start" />
            Present
          </Button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <div className="flex w-56 shrink-0 flex-col border-r bg-background">
          <div className="border-b px-3 py-2">
            <span className="text-xs font-medium text-muted-foreground">Slides</span>
          </div>
          <ScrollArea className="flex-1">
            <div className="flex flex-col gap-2 p-2">
              {deck.slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveSlideIndex(index)}
                  className={cn(
                    "flex flex-col gap-1 rounded-lg border p-2 text-left transition-colors",
                    index === activeSlideIndex
                      ? "border-primary/50 bg-primary/5 ring-1 ring-primary/20"
                      : "hover:bg-muted/50"
                  )}
                >
                  <span className="text-[10px] font-medium text-muted-foreground">
                    {index + 1}
                  </span>
                  <div className="aspect-video overflow-hidden rounded border bg-muted/30">
                    <SlideContent
                      slide={slide}
                      className="pointer-events-none scale-[0.18] origin-top-left p-2"
                    />
                  </div>
                  <span className="line-clamp-1 text-xs font-medium">{slide.title}</span>
                </button>
              ))}
            </div>
          </ScrollArea>

          <div className="flex items-center justify-between border-t p-2">
            <Button
              variant="ghost"
              size="icon-sm"
              disabled={activeSlideIndex === 0}
              onClick={() => setActiveSlideIndex((i) => i - 1)}
            >
              <ChevronLeft />
            </Button>
            <span className="text-xs tabular-nums text-muted-foreground">
              {activeSlideIndex + 1} / {deck.slides.length}
            </span>
            <Button
              variant="ghost"
              size="icon-sm"
              disabled={activeSlideIndex === deck.slides.length - 1}
              onClick={() => setActiveSlideIndex((i) => i + 1)}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <TldrawSlideEditor
            key={activeSlide.id}
            deckId={deck.id}
            slide={activeSlide}
          />
        </div>
      </div>
    </div>
  )
}
