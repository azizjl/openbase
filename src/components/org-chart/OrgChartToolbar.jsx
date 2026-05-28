import { Maximize2, Minus, Plus, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function OrgChartToolbar({ scale, onZoomIn, onZoomOut, onReset, onFit }) {
  const scalePercent = Math.round(scale * 100)

  return (
    <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1 rounded-xl border bg-background/95 p-1 shadow-lg backdrop-blur-sm">
      <Tooltip>
        <TooltipTrigger
          render={
            <Button variant="ghost" size="icon-sm" onClick={onZoomOut} aria-label="Zoom out" />
          }
        >
          <Minus />
        </TooltipTrigger>
        <TooltipContent>Zoom out</TooltipContent>
      </Tooltip>

      <span className="min-w-12 px-1 text-center text-xs tabular-nums text-muted-foreground">
        {scalePercent}%
      </span>

      <Tooltip>
        <TooltipTrigger
          render={
            <Button variant="ghost" size="icon-sm" onClick={onZoomIn} aria-label="Zoom in" />
          }
        >
          <Plus />
        </TooltipTrigger>
        <TooltipContent>Zoom in</TooltipContent>
      </Tooltip>

      <div className="mx-0.5 h-4 w-px bg-border" />

      <Tooltip>
        <TooltipTrigger
          render={
            <Button variant="ghost" size="icon-sm" onClick={onFit} aria-label="Fit to view" />
          }
        >
          <Maximize2 />
        </TooltipTrigger>
        <TooltipContent>Fit to view</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger
          render={
            <Button variant="ghost" size="icon-sm" onClick={onReset} aria-label="Reset view" />
          }
        >
          <RotateCcw />
        </TooltipTrigger>
        <TooltipContent>Reset view</TooltipContent>
      </Tooltip>
    </div>
  )
}
