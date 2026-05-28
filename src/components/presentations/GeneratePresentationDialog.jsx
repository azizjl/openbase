import { useState } from "react"
import { Loader2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { generatePresentationFromPrompt } from "@/data/presentations"
import { savePresentation } from "@/lib/presentationStore"

const suggestedPrompts = [
  "Create a product roadmap presentation for our AI agent platform",
  "Sales deck for enterprise customers",
  "Q2 all-hands update for the engineering team",
]

export function GeneratePresentationDialog({ open, onOpenChange, onGenerated }) {
  const [prompt, setPrompt] = useState("")
  const [generating, setGenerating] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim() || generating) return

    setGenerating(true)
    await new Promise((resolve) => window.setTimeout(resolve, 1800))

    const deck = savePresentation(generatePresentationFromPrompt(prompt.trim()))
    setGenerating(false)
    setPrompt("")
    onOpenChange(false)
    onGenerated?.(deck)
  }

  const handlePromptClick = (text) => {
    setPrompt(text)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="size-5 text-primary" />
            Generate presentation
          </DialogTitle>
          <DialogDescription>
            Describe the presentation you want. AI will create slides you can edit and present.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Textarea
            placeholder="e.g. Create a 6-slide pitch for our AI agent platform targeting enterprise buyers..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            disabled={generating}
          />

          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-muted-foreground">Try a suggestion</span>
            <div className="flex flex-col gap-2">
              {suggestedPrompts.map((text) => (
                <button
                  key={text}
                  type="button"
                  onClick={() => handlePromptClick(text)}
                  disabled={generating}
                  className="rounded-lg border bg-muted/30 px-3 py-2 text-left text-sm transition-colors hover:bg-muted/60 disabled:opacity-50"
                >
                  {text}
                </button>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={generating}>
            Cancel
          </Button>
          <Button onClick={handleGenerate} disabled={!prompt.trim() || generating}>
            {generating ? (
              <>
                <Loader2 className="animate-spin" data-icon="inline-start" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles data-icon="inline-start" />
                Generate
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
