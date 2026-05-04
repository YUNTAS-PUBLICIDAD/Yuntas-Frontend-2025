"use client"

import { Handle, Position } from "@xyflow/react"
import { MessageSquare, List, Zap, ExternalLink, MessageCircle } from "lucide-react"

// ─────────────────────────────────────────
// CONFIG POR TIPO DE NODO
// ─────────────────────────────────────────
const TYPE_CONFIG: Record<string, {
  label: string
  Icon: any
  headerBg: string
  headerText: string
  border: string
}> = {
  message: {
    label: "Mensaje",
    Icon: MessageSquare,
    headerBg: "bg-slate-100 dark:bg-[#2a3260]",
    headerText: "text-slate-600 dark:text-slate-300",
    border: "border-slate-200 dark:border-[#2f3760]",
  },
  menu: {
    label: "Menú",
    Icon: List,
    headerBg: "bg-blue-50 dark:bg-blue-900/30",
    headerText: "text-blue-600 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-700/50",
  },
  action: {
    label: "Acción",
    Icon: Zap,
    headerBg: "bg-purple-50 dark:bg-purple-900/30",
    headerText: "text-purple-600 dark:text-purple-300",
    border: "border-purple-200 dark:border-purple-700/50",
  },
}

// ─────────────────────────────────────────
// ICONO POR TIPO DE OPCIÓN
// ─────────────────────────────────────────
function OptionTypeIcon({ type }: { type: string }) {
  if (type === "url" || type === "link")
    return <ExternalLink size={10} className="text-blue-400 shrink-0" />
  if (type === "whatsapp")
    return <MessageCircle size={10} className="text-green-400 shrink-0" />
  return (
    // Flecha → para "ir a nodo"
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="shrink-0">
      <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" className="text-slate-400" />
    </svg>
  )
}

// ─────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────
export default function NodeCard({ data, selected }: any) {
  // FIX: leer datatype (no type)
  // node.type = 'custom' (tipo de componente ReactFlow)
  // data.dataType = 'message' | 'menu'| 'action' (contenido)
  // Fallback a data.type por compatibilidad con datos legacy en DB
  const dataType = data?.dataType ?? data?.type ?? "message"
  // const cfg = TYPE_CONFIG[type] || TYPE_CONFIG.message
  const cfg = TYPE_CONFIG[dataType] || TYPE_CONFIG.message
  const Icon = cfg.Icon
  const options: any[] = data?.options || []
  const hasOptions = options.length > 0

  const isStart = data?.isStart

  return (
    <div
      className={`
        relative w-64 rounded-xl border shadow-sm transition-all duration-150 select-none
        bg-white dark:bg-[#1e2548]
        ${cfg.border}
        ${selected
          ? "ring-2 ring-blue-500 ring-offset-1 dark:ring-offset-[#1C2347] shadow-blue-500/20 shadow-lg"
          : "hover:shadow-md"}
      `}
    >

      {isStart && (
        <div className="
          absolute -top-2 -right-2
          text-[10px] font-semibold
          px-2 py-0.5 rounded-full
          bg-green-500 text-white
          shadow-md
          z-10
        ">
          START
        </div>
      )}
      {/* ── HANDLE DE ENTRADA (arriba) ── */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-slate-400 dark:!bg-slate-500 !border-2 !border-white dark:!border-[#1e2548]"
      />

      {/* ── HEADER ── */}
      <div className={`flex items-center gap-2 px-3 py-2 rounded-t-xl ${cfg.headerBg}`}>
        <Icon size={13} className={cfg.headerText} />
        <span className={`text-xs font-semibold tracking-wide ${cfg.headerText}`}>
          {cfg.label}
        </span>
      </div>

      {/* ── MENSAJE ── */}
      <div className="px-3 pt-3 pb-2">
        <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-100 whitespace-pre-wrap line-clamp-4">
          {data?.message || (
            <span className="italic text-gray-400 dark:text-gray-500">Sin mensaje</span>
          )}
        </p>
      </div>

      {/* ── OPCIONES (si las tiene) ── */}
      {hasOptions && (
        <div className="px-3 pb-3 space-y-1.5 border-t dark:border-[#2f3760] pt-2 mt-1">
          {options.map((opt: any, i: number) => (
            // Cada opción tiene su propio handle de salida
            <div
              key={opt.id ?? i}
              className="relative flex items-center gap-1.5 text-xs
                bg-slate-50 dark:bg-[#272E50]
                border border-slate-200 dark:border-[#3a4270]
                rounded-lg px-2 py-1.5 pr-5"
            >
              <OptionTypeIcon type={opt.type} />
              <span className="truncate text-gray-700 dark:text-gray-300">
                {opt.label || "Opción sin nombre"}
              </span>

              {/* Handle de salida por opción */}
              <Handle
                type="source"
                position={Position.Right}
                id={opt.id ?? `opt-${i}`}
                style={{
                  top: "50%",
                  right: -8,
                  transform: "translateY(-50%)",
                  width: 10,
                  height: 10,
                  background: "#6b7280",
                  border: "2px solid white",
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* ── HANDLE DE SALIDA GENERAL (abajo, solo si no hay opciones) ── */}
      {!hasOptions && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="!w-3 !h-3 !bg-slate-400 dark:!bg-slate-500 !border-2 !border-white dark:!border-[#1e2548]"
          style={{ bottom: -6 }}
        />
      )}
    </div>
  )
}
