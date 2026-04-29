'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { api, API_ENDPOINTS } from '@/config'
import Builder from './_components/Builder'
import { Plus, Bot, Pencil, Trash2, MessageSquare, AlertCircle } from 'lucide-react'
import '@xyflow/react/dist/style.css'

interface Flow {
  id: number
  name: string
  created_at?: string
  updated_at?: string
}

// ─────────────────────────────────────────
// MODAL DE CONFIRMACIÓN
// ─────────────────────────────────────────
function DeleteModal({
  flow,
  onConfirm,
  onCancel,
}: {
  flow: Flow
  onConfirm: () => void
  onCancel: () => void
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="bg-white dark:bg-[#1e2548] border border-slate-200 dark:border-[#2f3760]
          rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4 space-y-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-red-50 dark:bg-red-950/40">
            <AlertCircle size={20} className="text-red-500" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white">Eliminar flow</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              ¿Eliminar <span className="font-medium text-gray-700 dark:text-gray-200">"{flow.name}"</span>?
              Esta acción no se puede deshacer.
            </p>
          </div>
        </div>
        <div className="flex gap-2 pt-1">
          <button
            onClick={onCancel}
            className="flex-1 py-2 text-sm rounded-lg border border-slate-200 dark:border-[#3a4270]
              text-gray-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-[#272E50] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 text-sm rounded-lg bg-red-500 hover:bg-red-600
              text-white font-medium transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────
// FLOW CARD
// ─────────────────────────────────────────
function FlowCard({
  flow,
  onEdit,
  onDelete,
}: {
  flow: Flow
  onEdit: () => void
  onDelete: () => void
}) {
  const date = flow.updated_at
    ? new Date(flow.updated_at).toLocaleDateString('es-PE', {
        day: 'numeric', month: 'short', year: 'numeric',
      })
    : null

  return (
    <div className="group relative bg-white dark:bg-[#1e2548]
      border border-slate-200 dark:border-[#2f3760]
      rounded-2xl p-5 flex flex-col gap-4
      hover:border-blue-300 dark:hover:border-blue-600/50
      hover:shadow-lg hover:shadow-blue-500/5
      transition-all duration-200"
    >
      {/* Ícono + nombre */}
      <div className="flex items-start gap-3">
        <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 shrink-0">
          <MessageSquare size={18} className="text-blue-500 dark:text-blue-400" />
        </div>
        <div className="min-w-0">
          <h2 className="font-semibold text-gray-800 dark:text-white truncate leading-snug">
            {flow.name}
          </h2>
          {date && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              Actualizado {date}
            </p>
          )}
        </div>
      </div>

      {/* ID badge */}
      <p className="text-xs font-mono text-gray-400 dark:text-gray-500 bg-slate-50 dark:bg-[#272E50]
        px-2 py-1 rounded-lg w-fit">
        ID {flow.id}
      </p>

      {/* Acciones */}
      <div className="flex gap-2 mt-auto">
        <button
          onClick={onEdit}
          className="flex-1 flex items-center justify-center gap-1.5
            py-2 rounded-lg text-sm font-medium
            bg-slate-900 dark:bg-white
            text-white dark:text-slate-900
            hover:bg-slate-700 dark:hover:bg-slate-100
            transition-colors"
        >
          <Pencil size={13} />
          Editar
        </button>
        <button
          onClick={onDelete}
          className="p-2 rounded-lg border border-red-200 dark:border-red-800/50
            text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30
            hover:text-red-600 dark:hover:text-red-400
            transition-colors"
          title="Eliminar flow"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────
// EMPTY STATE
// ─────────────────────────────────────────
function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center
      py-24 text-center space-y-4"
    >
      <div className="p-5 rounded-2xl bg-slate-100 dark:bg-[#1e2548]">
        <Bot size={36} className="text-slate-400 dark:text-slate-500" />
      </div>
      <div>
        <p className="font-semibold text-gray-700 dark:text-gray-200">Sin flows todavía</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
          Crea tu primer flujo de chatbot
        </p>
      </div>
      <button
        onClick={onCreate}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl
          bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
      >
        <Plus size={15} />
        Crear primer flow
      </button>
    </div>
  )
}

// ─────────────────────────────────────────
// SKELETON CARD
// ─────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-[#1e2548] border border-slate-200 dark:border-[#2f3760]
      rounded-2xl p-5 space-y-4 animate-pulse"
    >
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#272E50]" />
        <div className="flex-1 space-y-2 pt-0.5">
          <div className="h-4 bg-slate-100 dark:bg-[#272E50] rounded w-2/3" />
          <div className="h-3 bg-slate-100 dark:bg-[#272E50] rounded w-1/3" />
        </div>
      </div>
      <div className="h-6 bg-slate-100 dark:bg-[#272E50] rounded-lg w-16" />
      <div className="h-9 bg-slate-100 dark:bg-[#272E50] rounded-lg" />
    </div>
  )
}

// ─────────────────────────────────────────
// PÁGINA PRINCIPAL
// ─────────────────────────────────────────
export default function ChatbotPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const flowId = searchParams.get('flowId')

  const [flows, setFlows] = useState<Flow[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingFlow, setDeletingFlow] = useState<Flow | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (flowId) return
    fetchFlows()
  }, [flowId])

  const fetchFlows = async () => {
    setLoading(true)
    try {
      const res = await api.get(API_ENDPOINTS.ADMIN.CHATBOT.FLOWS.GET_ALL)
      // La API devuelve array directamente
      setFlows(Array.isArray(res.data) ? res.data : [])
    } catch {
      setFlows([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deletingFlow) return
    setDeleting(true)
    try {
      await api.delete(API_ENDPOINTS.ADMIN.CHATBOT.FLOWS.DELETE(deletingFlow.id))
      setFlows(prev => prev.filter(f => f.id !== deletingFlow.id))
      setDeletingFlow(null)
    } catch (err) {
      console.error(err)
    } finally {
      setDeleting(false)
    }
  }

  // ── Vista builder ──
  if (flowId) {
    return (
      <Builder
        flowId={flowId}
        onBack={() => router.push('/admin/chatbot')}
      />
    )
  }

  // ── Vista listado ──
  return (
    <>
      {/* Modal de confirmación */}
      {deletingFlow && (
        <DeleteModal
          flow={deletingFlow}
          onConfirm={handleDelete}
          onCancel={() => !deleting && setDeletingFlow(null)}
        />
      )}

      <div className="min-h-screen bg-slate-50 dark:bg-[#151a38]">
        <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

          {/* ── HEADER ── */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-600">
                <Bot size={22} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Chatbot Flows
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {loading ? '—' : `${flows.length} flow${flows.length !== 1 ? 's' : ''}`}
                </p>
              </div>
            </div>

            <button
              onClick={() => router.push('/admin/chatbot?flowId=new')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                bg-blue-600 hover:bg-blue-700 active:scale-95
                text-white text-sm font-medium transition-all"
            >
              <Plus size={16} />
              Nuevo flow
            </button>
          </div>

          {/* ── GRID ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {loading
              ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
              : flows.length === 0
                ? <EmptyState onCreate={() => router.push('/admin/chatbot?flowId=new')} />
                : flows.map(f => (
                    <FlowCard
                      key={f.id}
                      flow={f}
                      onEdit={() => router.push(`/admin/chatbot?flowId=${f.id}`)}
                      onDelete={() => setDeletingFlow(f)}
                    />
                  ))
            }
          </div>

        </div>
      </div>
    </>
  )
}
