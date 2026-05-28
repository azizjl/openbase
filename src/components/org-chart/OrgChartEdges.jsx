import { buildEdgePath } from "@/lib/orgChartLayout"

export function OrgChartEdges({ edges, employeesById }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 overflow-visible"
      style={{ width: "100%", height: "100%" }}
    >
      <defs>
        <marker
          id="org-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-border" />
        </marker>
      </defs>
      {edges.map(({ from, to }) => {
        const fromEmp = employeesById[from]
        const toEmp = employeesById[to]
        if (!fromEmp || !toEmp) return null

        return (
          <path
            key={`${from}-${to}`}
            d={buildEdgePath(fromEmp, toEmp)}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-border"
            markerEnd="url(#org-arrow)"
          />
        )
      })}
    </svg>
  )
}
