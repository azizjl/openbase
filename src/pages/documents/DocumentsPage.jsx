import { useState } from "react"
import { FileUp, Plus, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { SearchInput } from "@/components/dashboard/SearchInput"
import { DocumentCard } from "@/components/documents/DocumentCard"
import { EmptyState } from "@/components/dashboard/EmptyState"
import { documents, documentCategories } from "@/data/documents"

const statusVariants = {
  indexed: "default",
  processing: "secondary",
  failed: "destructive",
}

export function DocumentsPage() {
  const [category, setCategory] = useState("All")
  const [view, setView] = useState("table")

  const filtered =
    category === "All"
      ? documents
      : documents.filter((d) => d.category === category)

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Documents"
        description="Upload and manage documents for RAG indexing"
      >
        <Button size="sm">
          <Plus data-icon="inline-start" />
          Upload
        </Button>
      </PageHeader>

      <div
        className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed p-12 transition-colors hover:bg-muted/30"
      >
        <div className="flex size-12 items-center justify-center rounded-xl bg-muted">
          <Upload />
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="font-medium">Drag and drop files here</p>
          <p className="text-sm text-muted-foreground">
            PDF, DOCX, MD, CSV up to 50MB — ready for RAG indexing
          </p>
        </div>
        <Button variant="outline">
          <FileUp data-icon="inline-start" />
          Browse files
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={category} onValueChange={setCategory}>
          <TabsList>
            {documentCategories.map((cat) => (
              <TabsTrigger key={cat} value={cat}>
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-2">
          <SearchInput placeholder="Search documents..." className="w-64" />
          <Tabs value={view} onValueChange={setView}>
            <TabsList>
              <TabsTrigger value="table">Table</TabsTrigger>
              <TabsTrigger value="grid">Grid</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={FileUp}
          title="No documents found"
          description="Upload documents to start building your RAG knowledge base."
          actionLabel="Upload document"
        />
      ) : view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Uploaded</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{doc.category}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{doc.size}</TableCell>
                  <TableCell className="text-muted-foreground">{doc.uploadedAt}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariants[doc.status]} className="capitalize">
                      {doc.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
