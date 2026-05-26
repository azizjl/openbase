import { File, FileCode, FileSpreadsheet, FileText } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const fileIcons = {
  pdf: FileText,
  docx: FileText,
  md: FileCode,
  csv: FileSpreadsheet,
}

const statusVariants = {
  indexed: "default",
  processing: "secondary",
  failed: "destructive",
}

export function DocumentDetailDialog({ document, open, onOpenChange }) {
  if (!document) return null

  const Icon = fileIcons[document.type] || File

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-start gap-3 pr-8">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-muted">
              <Icon />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <DialogTitle className="truncate">{document.name}</DialogTitle>
              <DialogDescription>
                {document.category} · {document.type.toUpperCase()}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{document.category}</Badge>
            <Badge variant={statusVariants[document.status]} className="capitalize">
              {document.status}
            </Badge>
          </div>

          <Separator />

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-muted-foreground">File size</span>
              <span className="text-sm font-medium">{document.size}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-muted-foreground">Uploaded</span>
              <span className="text-sm font-medium">{document.uploadedAt}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-muted-foreground">Type</span>
              <span className="text-sm font-medium">{document.type.toUpperCase()}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-muted-foreground">RAG status</span>
              <span className="text-sm font-medium capitalize">{document.status}</span>
            </div>
          </div>

          {document.status === "indexed" && (
            <p className="rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
              This document is indexed and available for AI context in chat. Select it from the context dropdown when chatting.
            </p>
          )}
          {document.status === "processing" && (
            <p className="rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
              Indexing in progress. This document will be available for RAG queries shortly.
            </p>
          )}
          {document.status === "failed" && (
            <p className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              Indexing failed. Try re-uploading the file or check the format.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
