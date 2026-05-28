import { lazy, Suspense } from "react"
import { Loader2 } from "lucide-react"
import { useTheme } from "@/hooks/use-theme"
import { getSlidePersistenceKey } from "@/lib/slideCanvasKeys"
import { cn } from "@/lib/utils"

const TldrawCanvas = lazy(() =>
  import("@/components/presentations/TldrawCanvas").then((m) => ({ default: m.TldrawCanvas }))
)

export function TldrawSlideEditor({ deckId, slide }) {
  const { theme } = useTheme()

  if (!slide) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Select a slide to edit
      </div>
    )
  }

  const persistenceKey = getSlidePersistenceKey(deckId, slide.id)

  return (
    <div className="flex h-full min-h-0 flex-col bg-muted/10">
      <div className="flex shrink-0 items-center gap-2 border-b bg-background/80 px-4 py-2 text-xs text-muted-foreground">
        <span>
          Double-click text to edit · Draw and annotate on the slide · Changes appear in Present
        </span>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center p-4 md:p-6">
        <div
          className={cn(
            "relative aspect-video w-full max-w-5xl overflow-hidden rounded-xl border shadow-lg",
            theme === "dark" ? "bg-[#141414]" : "bg-white"
          )}
        >
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center gap-2 text-muted-foreground">
                <Loader2 className="size-5 animate-spin" />
                Loading editor...
              </div>
            }
          >
            <TldrawCanvas persistenceKey={persistenceKey} slide={slide} colorScheme={theme} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
