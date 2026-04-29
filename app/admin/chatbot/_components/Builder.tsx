'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import { ReactFlowProvider } from '@xyflow/react'
import { api, API_ENDPOINTS } from '@/config'
import { useFlowBuilder } from '@/hooks/useFlowBuilder'
import FlowCanvas from '@/components/molecules/admin/chatbot/FlowCanvas'
import NodeEditor from '@/components/molecules/admin/chatbot/NodeEditor'
import toast from 'react-hot-toast'
import { ArrowLeft, GitBranch, Loader2, Plus, Save } from 'lucide-react'

export default function Builder({ flowId: rawFlowId, onBack }: any) {
  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(false)

  // =========================
  // BUG FIX #2:
  // resolvedFlowId es el "source of truth" del ID del flow.
  // Cuando el flow es nuevo, tras crearlo guardamos el ID aquí
  // con setResolvedFlowId() — así el próximo guardado ya lo usa.
  // rawFlowId del padre NUNCA cambia después del primer render,
  // por eso no podemos depender solo de él para flows nuevos.
  // =========================
  const isNewFlow = rawFlowId === 'new' || !rawFlowId

  const initialFlowId = useMemo(() => {
    if (isNewFlow) return null
    const parsed = Number(rawFlowId)
    return Number.isFinite(parsed) ? parsed : null
  }, [rawFlowId, isNewFlow])

  const [resolvedFlowId, setResolvedFlowId] = useState<number | null>(initialFlowId)

  const {
    nodes,
    edges,
    setFlow,
    onNodesChange,
    onEdgesChange,
    onConnect,
    selectedNode,
    updateNodeData,
    addNode,
    deleteNode,
    onNodeClick,
    onPaneClick,
    addOptionToNode,
  } = useFlowBuilder()

  const initRef = useRef(false)

  // =========================
  // LOAD FLOW
  // =========================
  useEffect(() => {
    if (initRef.current) return
    initRef.current = true
    if (!resolvedFlowId) return
    loadFlow(resolvedFlowId)
  }, [resolvedFlowId])

  const loadFlow = async (id: number) => {
    setLoading(true)
    try {
      const res = await api.get(API_ENDPOINTS.ADMIN.CHATBOT.GRAPH.GET(id))
      const data = res.data
      setName(data.name ?? '')
      setFlow(data.nodes ?? [], data.edges ?? [])
    } catch (err) {
      console.error(err)
      toast.error('Error cargando flow')
    } finally {
      setLoading(false)
    }
  }

  // =========================
  // PAYLOAD SEGURO
  // =========================
  const buildPayload = () => {
    const safeNodes = Array.isArray(nodes) ? nodes : []
    const safeEdges = Array.isArray(edges) ? edges : []

    return {
      name: name.trim() || 'Nuevo flow', // FIX #1: nombre incluido
      nodes: safeNodes
        .filter(n => n?.id)
        .map(n => ({
          id: n.id,
          // type: n.type ?? 'custom',
          type: 'custom',
          position: n.position ?? { x: 0, y: 0 },
          // data: n.data ?? {},
          data: {
            type: n.data.dataType,
            message: n.data.message,
            metadata: n.data.metadata ?? {},
            options: n.data.options ?? []
          }
        })),

      // BUG FIX #1 (frontend side):
      // Normalizamos el id del edge — ReactFlow puede generar strings
      // como "reactflow__edge-abc-xyz" que cambian en cada render.
      // Usamos source+target como clave estable si no hay id propio limpio.
      edges: safeEdges
        .filter(e => e?.source && e?.target)
        .map(e => ({
          id: e.id,
          source: e.source,
          target: e.target,
          label: (e as any).label ?? ''
        })),
    }
  }

  // =========================
  // SAVE FLOW
  // BUG FIX #2: usamos resolvedFlowId como fuente de verdad
  // y llamamos setResolvedFlowId() tras crear un flow nuevo
  // para que los guardados siguientes usen el ID correcto.
  // =========================
  const saveFlow = async () => {
    if (saving) return

    const payload = buildPayload()

    if (payload.nodes.length === 0) {
      toast.error('Agrega al menos un nodo antes de guardar')
      return
    }

    setSaving(true)
    const toastId = toast.loading('Guardando flow...')

    try {
      let currentFlowId = resolvedFlowId

      // Crear flow si es nuevo
      if (!currentFlowId) {
        const res = await api.post(
          API_ENDPOINTS.ADMIN.CHATBOT.FLOWS.CREATE,
          { name: name.trim() || 'Nuevo flow' }
        )

        currentFlowId = res.data.id

        if (!currentFlowId) throw new Error('El backend no devolvió un ID de flow')

        // Persistimos el ID para que los próximos guardados lo usen
        setResolvedFlowId(currentFlowId)
      }

      await api.post(
        API_ENDPOINTS.ADMIN.CHATBOT.GRAPH.SAVE(currentFlowId),
        payload
      )

      toast.success('Flow guardado correctamente', { id: toastId })

    } catch (err: any) {
      console.error(err)
      const msg = err?.response?.data?.message ?? 'Error al guardar flow'
      toast.error(msg, { id: toastId })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-4 flex flex-col h-[100dvh] overflow-hidden bg-slate-50 dark:bg-[#151a38] relative ">

      {/*LOADING OVERLAY*/}
      {
        loading && (
          <div className='absolute inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-[#151a38]/70 backdrop-blur-sm'>
            <div className='flex flex-col items-center gap-3'>
             <Loader2 size={20} className='animate-spin text-blue-500'/>
             <p className='text-sm text-gray-500 dark:text-gray-400'>Cargando flow...</p>
            </div>
          </div>
        )
      }

      {/* HEADER */}
      <header className="shrink-0 flex items-center gap-3 px-4 h-14 bg-white dark:bg-[#1C2347] border-b border-slate-200 dark:border-[#2f3760] shadow-sm z-10">
        {/*Volver*/}
        <button onClick={onBack} className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm shrink-0 text-gray-600 dark:text-gray-300 hover:bg-slate-100 dark:border:bg-[#272E50] border border-slate-200 dark:border-[#3a4270] transition-colors'>
          <ArrowLeft size={14}/>
          <span className='hidden sm:inline'>Volver</span>
        </button>
        {/* Icono + nombre editable */}
        <div className='flex items-center gap-2 flex-1 min-w-0'>
          <div className='p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 shrink-0'>
            <GitBranch size={14} className='text-blue-500 dark:text-blue-400'/>
          </div>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            className="flex-1 min-w-0 bg-transparent text-sm font-semibold text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none border-b border-transparent focus:border-slate-300 dark:focus:border-[#3a4270] transition-colors pb-0.5"
            placeholder="Nombre del flow"
          />

        </div>

        {/* Stats - oculto en móvil */}
        {
          !loading && (

           <div className='hidden md:flex items-center gap-3 shrink-0 text-xs text-gray-400 dark:text-gray-500'>
             <span>{nodes.length} nodos</span>
             <span className='opacity-40'></span>
             <span>{edges.length} conexiones</span>
             {
               resolvedFlowId && (
                 <>
                                <span className="opacity-40">·</span>
                                <span className="font-mono bg-slate-100 dark:bg-[#272E50]
                                  px-2 py-0.5 rounded text-gray-500 dark:text-gray-400">
                                  ID {resolvedFlowId}
                                </span>
                              </>
               )
             }
           </div>
          )
        }

        <div className='w-px h-6 bg-slate-200 dark:bg-[#2f3760] shrink-0'></div>

        {/* Acciones */}
        <div className='flex items-center gap-2 shrink-0'>

        <button
          onClick={addNode}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm bg-slate-100 dark:bg-[#272E50] text-gray-700 dark:text-gray-200 hover:bg-slate-200 dark:hover:bg-[#313d6b] border border-slate-200 dark-border-[#3a4270] transition-colors"
        >
          <Plus size={14}/>
          <span className='hidden sm:inline'>Nodo</span>
        </button>
        <button
          onClick={saveFlow}
          disabled={saving || loading}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700 active:scale-95 text-white transition-all disabled:opacity-50 disabled:pointer-events-none"
        >
          {saving ? <Loader2 size={14} className='animate-spin'/> : <Save size={14}/>}
          <span>{saving ? 'Guardando...' : 'Guardar'}</span>
        </button>

        </div>
      </header>

      {/*
        WORKSPACE
        flex-1 + min-h-0 impide que el área desborde la pantalla en layouts de columna flex.
        */}

      <div className='flex flex-1 min-h-0'>
      {/* CANVAS */}
      <ReactFlowProvider>
        {/*Canvas: crece para llenar espacio*/}
          <div className="flex-1 min-w-0 min-h-0">
            <FlowCanvas
              nodes={nodes ?? []}
              edges={edges ?? []}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              onPaneClick={onPaneClick}
            />
          </div>

          {/* Panel lateral: ancho fijo, scroll interno */}
          <aside className="w-80 shrink-0 flex flex-col overflow-hidden  border-l border-slate-200 dark:border-[#2f2760] bg-white dark:bg-[#1C2347]">
            <NodeEditor
              node={selectedNode}
              updateNode={updateNodeData}
              deleteNode={deleteNode}
              addOptionToNode={addOptionToNode}
            />
          </aside>
      </ReactFlowProvider>
      </div>

    </div>
  )
}
