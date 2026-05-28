import { useMemo } from "react"
import { Link, useParams, useSearchParams } from "react-router-dom"
import { ChevronLeft, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RevealPresenter } from "@/components/presentations/RevealPresenter"
import { getPresentationById } from "@/lib/presentationStore"

export function PresentationPresentPage() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const autoPrint = searchParams.get("print") === "1"
  const deck = useMemo(() => getPresentationById(id), [id])

  if (!deck) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 bg-black text-white">
        <p>Presentation not found.</p>
        <Button variant="outline" render={<Link to="/presentations" />}>
          Back
        </Button>
      </div>
    )
  }

  return (
    <div className="relative flex h-full min-h-0 flex-1 flex-col bg-black">
      {!autoPrint && (
        <div className="absolute top-4 left-4 z-50 flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="bg-black/60 text-white backdrop-blur-sm hover:bg-black/80"
            render={<Link to={`/presentations/${deck.id}`} />}
          >
            <ChevronLeft data-icon="inline-start" />
            Editor
          </Button>
          <Button
            variant="secondary"
            size="icon-sm"
            className="bg-black/60 text-white backdrop-blur-sm hover:bg-black/80"
            render={<Link to="/presentations" />}
          >
            <X />
          </Button>
        </div>
      )}

      <RevealPresenter deck={deck} autoPrint={autoPrint} />

      {!autoPrint && (
        <p className="absolute bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-black/60 px-4 py-1.5 text-xs text-white/70 backdrop-blur-sm">
          Use arrow keys to navigate · Press F for fullscreen · ESC to exit
        </p>
      )}
    </div>
  )
}
