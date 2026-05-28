const NODE_WIDTH = 196
const NODE_HEIGHT = 76
const H_GAP = 28
const V_GAP = 72
const DEPT_PAD = 32
const DEPT_HEADER = 40
const DEPT_GAP = 56
const CEO_TOP = 48
const CEO_TO_DEPT_GAP = 100

function buildChildrenMap(employeeIds, employeesById) {
  const map = new Map()
  for (const id of employeeIds) {
    const emp = employeesById[id]
    if (!emp?.managerId) continue
    const managerInDept = employeeIds.includes(emp.managerId)
    if (!managerInDept) continue
    if (!map.has(emp.managerId)) map.set(emp.managerId, [])
    map.get(emp.managerId).push(id)
  }
  for (const [, children] of map) {
    children.sort((a, b) => a.localeCompare(b))
  }
  return map
}

function layoutSubtree(rootId, childrenMap) {
  const children = childrenMap.get(rootId) || []

  if (children.length === 0) {
    return {
      width: NODE_WIDTH,
      positions: [{ id: rootId, x: 0, y: 0 }],
    }
  }

  const childLayouts = children.map((childId) => layoutSubtree(childId, childrenMap))
  const totalChildrenWidth =
    childLayouts.reduce((sum, layout) => sum + layout.width, 0) +
    H_GAP * (children.length - 1)

  const subtreeWidth = Math.max(NODE_WIDTH, totalChildrenWidth)
  let cursor = (subtreeWidth - totalChildrenWidth) / 2
  const positions = [{ id: rootId, x: subtreeWidth / 2 - NODE_WIDTH / 2, y: 0 }]

  children.forEach((childId, index) => {
    const childLayout = childLayouts[index]
    for (const pos of childLayout.positions) {
      positions.push({
        id: pos.id,
        x: cursor + pos.x,
        y: NODE_HEIGHT + V_GAP + pos.y,
      })
    }
    cursor += childLayout.width + H_GAP
  })

  return { width: subtreeWidth, positions }
}

function layoutDepartment(deptEmployees, employeesById) {
  const ids = deptEmployees.map((e) => e.id)
  const roots = deptEmployees
    .filter((e) => !e.managerId || !ids.includes(e.managerId))
    .map((e) => e.id)

  const childrenMap = buildChildrenMap(ids, employeesById)

  if (roots.length === 0) {
    return { width: NODE_WIDTH + DEPT_PAD * 2, height: NODE_HEIGHT + DEPT_HEADER + DEPT_PAD * 2, positions: [] }
  }

  const rootLayouts = roots.map((rootId) => layoutSubtree(rootId, childrenMap))
  const totalRootsWidth =
    rootLayouts.reduce((sum, layout) => sum + layout.width, 0) +
    H_GAP * (roots.length - 1)

  let cursor = DEPT_PAD
  const positions = []

  rootLayouts.forEach((layout) => {
    for (const pos of layout.positions) {
      positions.push({
        id: pos.id,
        x: cursor + pos.x,
        y: DEPT_HEADER + DEPT_PAD + pos.y,
      })
    }
    cursor += layout.width + H_GAP
  })

  const maxY = positions.reduce((max, pos) => Math.max(max, pos.y), 0)
  const width = Math.max(totalRootsWidth + DEPT_PAD * 2, 280)
  const height = maxY + NODE_HEIGHT + DEPT_PAD

  return { width, height, positions }
}

export function computeOrgChartLayout(employees, departments) {
  const employeesById = Object.fromEntries(employees.map((e) => [e.id, e]))
  const ceo = employees.find((e) => !e.managerId)
  const deptEmployees = departments.map((dept) => ({
    dept,
    members: employees.filter((e) => e.departmentId === dept.id),
  }))

  const deptLayouts = deptEmployees.map(({ dept, members }) => {
    const layout = layoutDepartment(members, employeesById)
    return { dept, ...layout }
  })

  let cursorX = 0
  const positionedDepts = deptLayouts.map((layout) => {
    const positioned = {
      ...layout,
      x: cursorX,
      y: CEO_TOP + NODE_HEIGHT + CEO_TO_DEPT_GAP,
    }
    cursorX += layout.width + DEPT_GAP
    return positioned
  })

  const totalWidth = cursorX - DEPT_GAP
  const ceoX = totalWidth / 2 - NODE_WIDTH / 2
  const ceoY = CEO_TOP

  const positionedEmployees = [{ ...ceo, x: ceoX, y: ceoY, width: NODE_WIDTH, height: NODE_HEIGHT }]

  for (const deptLayout of positionedDepts) {
    for (const pos of deptLayout.positions) {
      const emp = employeesById[pos.id]
      positionedEmployees.push({
        ...emp,
        x: deptLayout.x + pos.x,
        y: deptLayout.y + pos.y,
        width: NODE_WIDTH,
        height: NODE_HEIGHT,
      })
    }
  }

  const positionedDepartments = positionedDepts.map((layout) => ({
    ...layout.dept,
    x: layout.x,
    y: layout.y,
    width: layout.width,
    height: layout.height,
  }))

  const edges = employees
    .filter((e) => e.managerId)
    .map((e) => ({ from: e.managerId, to: e.id }))

  const canvasWidth = totalWidth
  const canvasHeight = Math.max(
    ...positionedDepartments.map((d) => d.y + d.height),
    ceoY + NODE_HEIGHT + 80
  )

  return {
    employees: positionedEmployees,
    departments: positionedDepartments,
    edges,
    canvasWidth,
    canvasHeight,
    nodeWidth: NODE_WIDTH,
    nodeHeight: NODE_HEIGHT,
  }
}

export function getNodeCenterBottom(employee) {
  return {
    x: employee.x + employee.width / 2,
    y: employee.y + employee.height,
  }
}

export function getNodeCenterTop(employee) {
  return {
    x: employee.x + employee.width / 2,
    y: employee.y,
  }
}

export function buildEdgePath(fromEmp, toEmp) {
  const start = getNodeCenterBottom(fromEmp)
  const end = getNodeCenterTop(toEmp)
  const midY = start.y + (end.y - start.y) / 2

  return `M ${start.x} ${start.y} C ${start.x} ${midY}, ${end.x} ${midY}, ${end.x} ${end.y}`
}
