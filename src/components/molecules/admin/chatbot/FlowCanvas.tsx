"use client"

import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useReactFlow,
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  type EdgeProps,
} from "@xyflow/react"
import { useEffect } from "react"
import NodeCard from "./NodeCard"

// ─────────────────────────────────────────
// CUSTOM EDGE — con label centrado y botón ×
// ─────────────────────────────────────────
function CustomEdge({
  id,
  sourceX, sourceY,
  targetX, targetY,
  sourcePosition, targetPosition,
  data,
  markerEnd,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX, sourceY, sourcePosition,
    targetX, targetY, targetPosition,
  })

  const label = (data as any)?.label ?? ""

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{ stroke: "#6b7280", strokeWidth: 1.5 }}
      />
      <EdgeLabelRenderer>
        {label && (
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: "all",
            }}
            className="
              bg-white dark:bg-[#272E50]
              border border-slate-200 dark:border-[#3a4270]
              text-xs text-gray-600 dark:text-gray-300
              px-2 py-0.5 rounded-full shadow-sm
              nodrag nopan
            "
          >
            {label}
          </div>
        )}
      </EdgeLabelRenderer>
    </>
  )
}

// ─────────────────────────────────────────
// TIPOS REGISTRADOS
// ─────────────────────────────────────────
const nodeTypes = { custom: NodeCard }
const edgeTypes = { custom: CustomEdge }

// ─────────────────────────────────────────
// CANVAS
// ─────────────────────────────────────────
interface FlowCanvasProps {
  nodes: any[]
  edges: any[]
  onNodesChange: (c: any) => void
  onEdgesChange: (c: any) => void
  onConnect: (p: any) => void
  onNodeClick: (e: any, n: any) => void
  onPaneClick: () => void
}

export default function FlowCanvas({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeClick,
  onPaneClick,
}: FlowCanvasProps) {
  const { fitView } = useReactFlow()

  // Ajusta la vista cuando cambia el número de nodos
  useEffect(() => {
    const t = setTimeout(() => fitView({ padding: 0.2, duration: 300 }), 50)
    return () => clearTimeout(t)
  }, [nodes.length])

  // ─────────────────────────────────────────
  // onConnect con label automático
  //
  // Cuando el usuario conecta desde el handle de una OPCIÓN
  // (sourceHandle = opt.id), buscamos el label de esa opción
  // en el nodo fuente y lo ponemos como label del edge.
  // Así el diagrama queda auto-documentado sin trabajo extra.
  // ─────────────────────────────────────────
  const handleConnect = (params: any) => {
    const sourceNode = nodes.find(n => n.id === params.source)
    let label = ""

    if (sourceNode && params.sourceHandle) {
      const opt = (sourceNode.data?.options ?? []).find(
        (o: any) => (o.id ?? "") === params.sourceHandle
      )
      if (opt?.label) label = opt.label
    }

    // Delegamos al hook pero enriquecemos con label y tipo custom
    onConnect({ ...params, label, type: "custom" })
  }

  return (
    <div className="w-full h-[80vh] rounded-xl overflow-hidden border border-slate-200 dark:border-[#2f3760]">
      <ReactFlow
        nodes={nodes}
        edges={edges.map(e => ({ ...e, type: "custom" }))}  // forzamos custom edge siempre
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={handleConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        defaultEdgeOptions={{ type: "custom" }}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.3}
        maxZoom={1.5}
        deleteKeyCode="Delete"
      >
        <MiniMap
          nodeColor={() => "#6b7280"}
          maskColor="rgba(0,0,0,0.06)"
          className="!bg-white dark:!bg-[#1e2548] !border !border-slate-200 dark:!border-[#2f3760] !rounded-lg"
        />
        <Controls className="!bg-white dark:!bg-[#1e2548] !border !border-slate-200 dark:!border-[#2f3760] !rounded-lg [&>button]:!border-0" />
        <Background
          gap={24}
          size={1}
          color="#cbd5e1"
          className="dark:[&>*]:stroke-[#2a3260]"
        />
      </ReactFlow>
    </div>
  )
}
