'use client'

import { useState, useMemo } from 'react'
import { applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react'
import type { Node, Edge, NodeChange, EdgeChange, Connection } from '@xyflow/react'
import { v4 as uuid } from 'uuid'

// =====================
// TYPES
// =====================

export interface FlowNodeData {
  // "datatype" es el tipo de contenido del node: message | menu | action
  // Se llama dataType para NO confundirse con node.type ('custom'),
  // que es el tipo de componente React que ReactFlow usar para renderizar.
  dataType: 'message' | 'menu' | 'action'
  message: string
  metadata: Record<string, unknown>
  options: FlowOption[]
  [key: string]: unknown
}

export interface FlowOption {
  id: string
  label: string
  type: 'node' | 'url'| 'link' | 'whatsapp'
  value?: string
}

// =====================
// HOOK
// =====================

export function useFlowBuilder() {
  const [nodes, setNodes] = useState<Node<FlowNodeData>[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)

  // =====================
  // FLOW LOAD
  // =====================
  const setFlow = (nodesData: Node<FlowNodeData>[], edgesData: Edge[]) => {
    // Normalizar los nodos al cargar
    // el backend guarda el tipo de contenido en data.type (legacy).
    // Lo migramos a data.datatype para evitar la confusion con node.type.
    const normalized = (nodesData ?? []).map(n => ({
      ...n,
      type: 'custom',
      data:  {
        ...n.data,
        dataType: (n.data as any).dataType ?? (n.data as any).type ?? 'message'
      },
    }))
    // setNodes(nodesData ?? [])
    setNodes(normalized as Node<FlowNodeData>[])
    setEdges(edgesData ?? [])
    setSelectedNodeId(null)
  }

  // =====================
  // SELECTED NODE
  // =====================
  const selectedNode = useMemo(
    () => nodes.find(n => n.id === selectedNodeId) ?? null,
    [nodes, selectedNodeId]
  )

  // =====================
  // UPDATE NODE (PATCH ONLY)
  // =====================
  const updateNodeData = (id: string, patch: Partial<FlowNodeData>) => {
    setNodes(nds =>
      nds.map(n => {
        if (n.id !== id) return n
        return {
          ...n,
          data: {
            ...n.data,
            ...patch,
            // medatada: merge profundo (no reemplazar todo el objeto)
            metadata: patch.metadata !== undefined ? {...(n.data.metadata ?? {}), ...patch.metadata} : n.data.metadata ?? {},
            // options: reemplazar completo si viene, si no mantener
            options: patch.options !== undefined ? patch.options : n.data.options ?? [],
            // metadata: {
            //   ...(n.data.metadata ?? {}),
            //   ...(patch.metadata ?? {}),
            // },
            // options: patch.options ?? n.data.options ?? [],
          },
        }
      })
    )
  }

  // =====================
  // NODES CHANGE (ReactFlow)
  // =====================
  const onNodesChange = (changes: NodeChange[]) => {
    setNodes(nds => applyNodeChanges(changes, nds) as Node<FlowNodeData>[])
  }

  // =====================
  // EDGES CHANGE (ReactFlow)
  // =====================
  const onEdgesChange = (changes: EdgeChange[]) => {
    setEdges(eds => applyEdgeChanges(changes, eds))
  }

  const onConnect = (params: Connection) => {
    const newEdge: Edge = {
      id: uuid(),
      source: params.source ?? '',
      target: params.target ?? '',
      sourceHandle: params.sourceHandle ?? undefined,
      targetHandle: params.targetHandle ?? undefined,
      label: '',
    }
    setEdges(eds => addEdge(newEdge, eds))
  }

  // =====================
  // NODE CRUD
  // =====================
  const addNode = () => {
    const id = uuid()
    const newNode: Node<FlowNodeData> = {
      id,
      type: 'custom',
      position: { x: 200 + Math.random() * 100, y: 200 + Math.random() * 100 },
      data: {
        dataType: 'message',
        message: 'Nuevo nodo',
        metadata: { waitForUser: false },
        options: [],
      },
    }
    setNodes(nds => [...nds, newNode])
    setSelectedNodeId(id)
  }

  const deleteNode = (id: string) => {
    setNodes(nds => nds.filter(n => n.id !== id))
    setEdges(eds => eds.filter(e => e.source !== id && e.target !== id))
    if (selectedNodeId === id) setSelectedNodeId(null)
  }

  // =====================
  // SELECTION
  // =====================
  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    if (!node?.id) return
    setSelectedNodeId(node.id)
  }

  const onPaneClick = () => {
    setSelectedNodeId(null)
  }

  // =====================
  // OPTIONS
  // =====================
  const addOptionToNode = (nodeId: string) => {
    const option: FlowOption = {
      id: uuid(),
      label: 'Nueva opción',
      type: 'node',
      value: ''
    }
    setNodes(nds =>
      nds.map(n =>
        n.id === nodeId
          ? {
              ...n,
              data: {
                ...n.data,
                options: [...(n.data.options ?? []), option],
              },
            }
          : n
      )
    )
  }

  const updateOption = (nodeId: string, optionId: string, patch: Partial<FlowOption>) => {
    setNodes(nds =>
      nds.map(n => {
        if (n.id !== nodeId) return n
        return {
          ...n,
          data: {
            ...n.data,
            options: n.data.options.map(o =>
              o.id === optionId ? { ...o, ...patch } : o
            ),
          },
        }
      })
    )
  }

  const deleteOption = (nodeId: string, optionId: string) => {
    setNodes(nds =>
      nds.map(n => {
        if (n.id !== nodeId) return n
        return {
          ...n,
          data: {
            ...n.data,
            options: n.data.options.filter(o => o.id !== optionId),
          },
        }
      })
    )
  }

  // =====================
  // RETURN
  // =====================
  return {
    nodes,
    edges,
    selectedNode,
    setFlow,
    onNodesChange,
    onEdgesChange,
    onConnect,
    updateNodeData,
    addNode,
    deleteNode,
    onNodeClick,
    onPaneClick,
    addOptionToNode,
    updateOption,
    deleteOption,
  }
}
