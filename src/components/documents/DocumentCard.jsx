import { File, FileCode, FileSpreadsheet, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

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

export function DocumentCard({ document, onClick }) {
  const Icon = fileIcons[document.type] || File

  return (
    <Card
      size="sm"
      className={cn(
        "cursor-pointer transition-all hover:ring-foreground/20 hover:-translate-y-0.5"
      )}
      onClick={onClick}
    >
      <CardContent className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
          <Icon />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="truncate text-sm font-medium">{document.name}</span>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{document.size}</span>
            <span>·</span>
            <span>{document.uploadedAt}</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {document.category}
            </Badge>
            <Badge variant={statusVariants[document.status]} className="text-xs capitalize">
              {document.status}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
