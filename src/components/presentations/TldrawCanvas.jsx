import { Tldraw } from "tldraw"
import "tldraw/tldraw.css"
import { setupSlideEditor } from "@/lib/slideCanvas"
import "./presentation-editor.css"

export function TldrawCanvas({
  persistenceKey,
  slide,
  readOnly = false,
  colorScheme = "light",
}) {
  return (
    <div
      className="openbase-slide-tldraw absolute inset-0 h-full w-full"
      data-color-scheme={colorScheme}
    >
      <Tldraw
        persistenceKey={persistenceKey}
        hideUi={readOnly}
        onMount={(editor) => {
          setupSlideEditor(editor, slide, { readOnly, colorScheme })
        }}
      />
    </div>
  )
}
