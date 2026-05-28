import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Hand, MousePointer2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DepartmentRegion } from "@/components/org-chart/DepartmentRegion"
import { EmployeeDetailDialog } from "@/components/org-chart/EmployeeDetailDialog"
import { EmployeeNode } from "@/components/org-chart/EmployeeNode"
import { OrgChartEdges } from "@/components/org-chart/OrgChartEdges"
import { OrgChartToolbar } from "@/components/org-chart/OrgChartToolbar"
import { computeOrgChartLayout } from "@/lib/orgChartLayout"
import { departments, employees } from "@/data/employees"
import { cn } from "@/lib/utils"

const MIN_SCALE = 0.25
const MAX_SCALE = 2
const ZOOM_STEP = 0.12

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export function OrgChartCanvas() {
  const containerRef = useRef(null)
  const layout = useMemo(() => computeOrgChartLayout(employees, departments), [])

  const employeesById = useMemo(
    () => Object.fromEntries(layout.employees.map((e) => [e.id, e])),
    [layout.employees]
  )

  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 0.85 })
  const [isPanning, setIsPanning] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const panStart = useRef({ x: 0, y: 0, tx: 0, ty: 0 })

  const fitToView = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const { width, height } = container.getBoundingClientRect()
    const padding = 48
    const scaleX = (width - padding * 2) / layout.canvasWidth
    const scaleY = (height - padding * 2) / layout.canvasHeight
    const scale = clamp(Math.min(scaleX, scaleY), MIN_SCALE, MAX_SCALE)
    const x = (width - layout.canvasWidth * scale) / 2
    const y = (height - layout.canvasHeight * scale) / 2

    setTransform({ x, y, scale })
  }, [layout.canvasWidth, layout.canvasHeight])

  useEffect(() => {
    fitToView()
    const container = containerRef.current
    if (!container) return

    const observer = new ResizeObserver(() => fitToView())
    observer.observe(container)
    return () => observer.disconnect()
  }, [fitToView])

  const handlePointerDown = (event) => {
    const isNode = event.target.closest("[data-org-node]")
    if (isNode || event.button !== 0) return

    setIsPanning(true)
    panStart.current = {
      x: event.clientX,
      y: event.clientY,
      tx: transform.x,
      ty: transform.y,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event) => {
    if (!isPanning) return
    const dx = event.clientX - panStart.current.x
    const dy = event.clientY - panStart.current.y
    setTransform((prev) => ({
      ...prev,
      x: panStart.current.tx + dx,
      y: panStart.current.ty + dy,
    }))
  }

  const handlePointerUp = (event) => {
    setIsPanning(false)
    event.currentTarget.releasePointerCapture?.(event.pointerId)
  }

  const handleWheel = (event) => {
    event.preventDefault()
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const pointerX = event.clientX - rect.left
    const pointerY = event.clientY - rect.top

    setTransform((prev) => {
      const direction = event.deltaY > 0 ? -1 : 1
      const nextScale = clamp(prev.scale + direction * ZOOM_STEP, MIN_SCALE, MAX_SCALE)
      const scaleRatio = nextScale / prev.scale
      const x = pointerX - (pointerX - prev.x) * scaleRatio
      const y = pointerY - (pointerY - prev.y) * scaleRatio
      return { x, y, scale: nextScale }
    })
  }

  const zoomBy = (delta) => {
    const container = containerRef.current
    if (!container) return

    const { width, height } = container.getBoundingClientRect()
    const centerX = width / 2
    const centerY = height / 2

    setTransform((prev) => {
      const nextScale = clamp(prev.scale + delta, MIN_SCALE, MAX_SCALE)
      const scaleRatio = nextScale / prev.scale
      return {
        scale: nextScale,
        x: centerX - (centerX - prev.x) * scaleRatio,
        y: centerY - (centerY - prev.y) * scaleRatio,
      }
    })
  }

  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee)
    setDialogOpen(true)
  }

  const handleReset = () => {
    setTransform({ x: 0, y: 0, scale: 0.85 })
  }

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div className="flex shrink-0 items-center justify-between border-b bg-background/80 px-4 py-2 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="font-normal">
            {employees.length} people
          </Badge>
          <Badge variant="outline" className="font-normal">
            {departments.length} departments
          </Badge>
        </div>
        <div className="hidden items-center gap-4 text-xs text-muted-foreground sm:flex">
          <span className="flex items-center gap-1.5">
            <Hand className="size-3.5" />
            Drag to pan
          </span>
          <span className="flex items-center gap-1.5">
            <MousePointer2 className="size-3.5" />
            Scroll to zoom
          </span>
        </div>
      </div>

      <div
        ref={containerRef}
        className={cn(
          "relative min-h-0 flex-1 overflow-hidden",
          "bg-[radial-gradient(circle,_oklch(0.55_0_0/0.12)_1px,_transparent_1px)] bg-size-[20px_20px]",
          "dark:bg-[radial-gradient(circle,_oklch(0.85_0_0/0.08)_1px,_transparent_1px)]",
          isPanning ? "cursor-grabbing" : "cursor-grab"
        )}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onWheel={handleWheel}
      >
        <div
          className="absolute origin-top-left will-change-transform"
          style={{
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          }}
        >
          <div
            className="relative"
            style={{
              width: layout.canvasWidth,
              height: layout.canvasHeight,
            }}
          >
            <OrgChartEdges edges={layout.edges} employeesById={employeesById} />

            {layout.departments.map((department) => (
              <DepartmentRegion key={department.id} department={department} />
            ))}

            {layout.employees.map((employee) => (
              <EmployeeNode
                key={employee.id}
                employee={employee}
                selected={selectedEmployee?.id === employee.id}
                onSelect={handleSelectEmployee}
              />
            ))}
          </div>
        </div>

        <OrgChartToolbar
          scale={transform.scale}
          onZoomIn={() => zoomBy(ZOOM_STEP)}
          onZoomOut={() => zoomBy(-ZOOM_STEP)}
          onReset={handleReset}
          onFit={fitToView}
        />
      </div>

      <EmployeeDetailDialog
        employee={selectedEmployee}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onViewInChart={() => setDialogOpen(false)}
      />
    </div>
  )
}
