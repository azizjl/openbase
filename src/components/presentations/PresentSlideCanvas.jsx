import { lazy, Suspense } from "react"
import { Loader2 } from "lucide-react"
import { getSlidePersistenceKey } from "@/lib/slideCanvasKeys"

const TldrawCanvas = lazy(() =>
  import("@/components/presentations/TldrawCanvas").then((m) => ({ default: m.TldrawCanvas }))
)

export function PresentSlideCanvas({ deckId, slide }) {
  const persistenceKey = getSlidePersistenceKey(deckId, slide.id)

  return (
    <div className="present-slide-canvas relative mx-auto h-[720px] w-[1280px] max-w-full max-h-[80vh] overflow-hidden rounded-lg bg-[#141414]">
      <Suspense
        fallback={
          <div className="flex h-full items-center justify-center">
            <Loader2 className="size-6 animate-spin text-white/50" />
          </div>
        }
      >
        <TldrawCanvas
          persistenceKey={persistenceKey}
          slide={slide}
          readOnly
          colorScheme="dark"
        />
      </Suspense>
    </div>
  )
}
