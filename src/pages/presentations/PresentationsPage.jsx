import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Presentation, Sparkles } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { EmptyState } from "@/components/dashboard/EmptyState"
import { GeneratePresentationDialog } from "@/components/presentations/GeneratePresentationDialog"
import { PresentationCard } from "@/components/presentations/PresentationCard"
import { exportPresentationToPptx, openPresentationPrintView } from "@/lib/presentationExport"
import { getAllPresentations } from "@/lib/presentationStore"

export function PresentationsPage() {
  const navigate = useNavigate()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const decks = useMemo(() => getAllPresentations(), [refreshKey])

  const handleGenerated = (deck) => {
    setRefreshKey((k) => k + 1)
    toast.success("Presentation generated", {
      description: `${deck.slideCount} slides ready to edit and present.`,
    })
    navigate(`/presentations/${deck.id}`)
  }

  const handleExportPptx = async (deck) => {
    try {
      await exportPresentationToPptx(deck)
      toast.success("PowerPoint exported")
    } catch {
      toast.error("Failed to export PowerPoint")
    }
  }

  const handleExportPdf = (deck) => {
    openPresentationPrintView(deck.id)
    toast.info("Opening print view for PDF export")
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Presentations"
        description="Create AI-powered slide decks, edit visually, and present live"
      >
        <Button onClick={() => setDialogOpen(true)}>
          <Sparkles data-icon="inline-start" />
          Generate with AI
        </Button>
      </PageHeader>

      {decks.length === 0 ? (
        <EmptyState
          icon={Presentation}
          title="No presentations yet"
          description="Generate your first deck from a prompt — edit slides in tldraw and present with reveal.js."
          actionLabel="Generate presentation"
          onAction={() => setDialogOpen(true)}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {decks.map((deck) => (
            <PresentationCard
              key={deck.id}
              deck={deck}
              onExportPptx={handleExportPptx}
              onExportPdf={handleExportPdf}
            />
          ))}
        </div>
      )}

      <GeneratePresentationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onGenerated={handleGenerated}
      />
    </div>
  )
}
