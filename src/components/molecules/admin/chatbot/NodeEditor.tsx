"use client"

import { MessageSquare, Settings, Trash2, Plus, GripVertical, Link, MessageCircle, ArrowRight } from "lucide-react"
import { v4 as uuid } from "uuid"

// ─────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────
interface Option {
  id: string
  label: string
  type: "node" | "url" | "link" | "whatsapp"
  value?: string   // target node id ó URL
}

interface NodeEditorProps {
  node: any
  nodes: any[]
  updateNode: (id: string, patch: any) => void
  deleteNode: (id: string) => void
  addOptionToNode: (nodeId: string) => void
}

// ─────────────────────────────────────────
// HELPERS UI
// ─────────────────────────────────────────
const inputCls = `
  w-full px-3 py-2 text-sm rounded-lg
  bg-white dark:bg-[#272E50]
  text-gray-800 dark:text-gray-100
  border border-slate-200 dark:border-[#3a4270]
  focus:outline-none focus:ring-2 focus:ring-blue-500/40
  placeholder:text-gray-400 dark:placeholder:text-gray-500
`

const sectionCls = `
  rounded-xl border border-slate-200 dark:border-[#2f3760]
  bg-slate-50 dark:bg-[#1e2548]
  p-4 space-y-3
`

function SectionTitle({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
      <Icon size={13} />
      {label}
    </div>
  )
}

// ─────────────────────────────────────────
// OPTION TYPE CONFIG
// ─────────────────────────────────────────
const OPTION_TYPES = [
  { value: "node",      label: "Ir a nodo",    Icon: ArrowRight   },
  { value: "url",       label: "Abrir link",   Icon: Link         },
  { value: "whatsapp",  label: "WhatsApp",     Icon: MessageCircle },
]

// ─────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────
export default function NodeEditor({ node,nodes, updateNode, deleteNode, addOptionToNode }: NodeEditorProps) {
  if (!node) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-2 text-gray-400 dark:text-gray-500 p-6">
        <MessageSquare size={28} className="opacity-30" />
        <p className="text-sm text-center">Selecciona un nodo para editarlo</p>
      </div>
    )
  }

  const data = node.data || {}
  // FIX: leer dataType (no type) - misma key que useFlowBuilder y NodeCard
  const dataType = data.dataType ?? data.type ?? "message"
  const options: Option[] = data.options || []

  // ── Helpers para no repetir el spread ──
  const patch = (changes: any) => updateNode(node.id, changes)

  const updateOption = (optId: string, changes: Partial<Option>) => {
    patch({
      options: options.map(o => o.id === optId ? { ...o, ...changes } : o),
    })
  }

  const deleteOption = (optId: string) => {
    patch({ options: options.filter(o => o.id !== optId) })
  }

  const addOption = () => {
    const newOpt: Option = {
      id: uuid(),
      label: "Nueva opción",
      type: "node",
      value: "",
    }
    patch({ options: [...options, newOpt] })
  }

  // ─────────────────────────────────────────
  return (
    <div className="h-full overflow-y-auto bg-white dark:bg-[#1C2347] flex flex-col">

      {/* ── HEADER ── */}
      <div className="px-5 py-4 border-b border-slate-100 dark:border-[#2f3760]">
        <h2 className="text-sm font-semibold text-gray-800 dark:text-white">Editor de nodo</h2>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 font-mono truncate">{node.id}</p>
      </div>

      <div className="flex-1 p-4 space-y-4">

        {/* ── TIPO ── */}
        <div className={sectionCls}>
          <SectionTitle icon={Settings} label="Tipo" />
          <select
            value={dataType}
            onChange={e => patch({dataType: e.target.value})}
            // value={data.type || "message"}
            // onChange={e => patch({ type: e.target.value })}
            className={inputCls}
          >
            <option value="message">Mensaje</option>
            <option value="menu">Menú</option>
            <option value="action">Acción</option>
          </select>
        </div>

        {/* ── MENSAJE ── */}
        <div className={sectionCls}>
          <SectionTitle icon={MessageSquare} label="Mensaje" />
          <textarea
            value={data.message || ""}
            onChange={e => patch({ message: e.target.value })}
            rows={4}
            placeholder="Escribe el mensaje del bot aquí..."
            className={`${inputCls} resize-none leading-relaxed`}
          />
          {/* Contador de caracteres */}
          <p className="text-right text-xs text-gray-400">
            {(data.message || "").length} caracteres
          </p>
        </div>

        {/* ── OPCIONES ── */}
        <div className={sectionCls}>
          <div className="flex items-center justify-between">
            <SectionTitle icon={GripVertical} label={`Opciones (${options.length})`} />
          </div>

          {options.length === 0 && (
            <p className="text-xs text-gray-400 dark:text-gray-500 italic text-center py-2">
              Sin opciones. Agrega una para crear un menú.
            </p>
          )}

          <div className="space-y-3">
            {options.map((opt, i) => (
              <div
                key={opt.id}
                className="
                  rounded-lg border border-slate-200 dark:border-[#3a4270]
                  bg-white dark:bg-[#272E50]
                  p-3 space-y-2
                "
              >
                {/* Cabecera opción: número + delete */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">
                    Opción {i + 1}
                  </span>
                  <button
                    onClick={() => deleteOption(opt.id)}
                    className="text-red-400 hover:text-red-600 transition-colors p-0.5 rounded"
                    title="Eliminar opción"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>

                {/* Label */}
                <input
                  value={opt.label}
                  onChange={e => updateOption(opt.id, { label: e.target.value })}
                  placeholder="Texto del botón"
                  className={inputCls}
                />

                {/* Tipo */}
                <div className="grid grid-cols-3 gap-1">
                  {OPTION_TYPES.map(({ value, label, Icon }) => (
                    <button
                      key={value}
                      onClick={() => updateOption(opt.id, { type: value as Option["type"], value: "" })}
                      className={`
                        flex flex-col items-center gap-1 py-1.5 px-1 rounded-lg text-xs border transition-all
                        ${opt.type === value
                          ? "bg-blue-50 dark:bg-blue-900/30 border-blue-400 text-blue-600 dark:text-blue-300"
                          : "border-slate-200 dark:border-[#3a4270] text-gray-500 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-[#1e2548]"
                        }
                      `}
                    >
                      <Icon size={12} />
                      {label}
                    </button>
                  ))}
                </div>

                {/* Valor según tipo */}
                {opt.type === "node" && (
                  // <input
                  //   value={opt.value || ""}
                  //   onChange={e => updateOption(opt.id, { value: e.target.value })}
                  //   placeholder="ID del nodo destino"
                  //   className={inputCls}
                  // />
                  <select value={opt.value || ""} onChange={e => updateOption(opt.id, {value: e.target.value})} className={inputCls}>
                   <option value="">Seleccionar nodo</option>
                   {
                     nodes.filter(n => n.id !== node.id)
                       .map(n => (
                         <option key={n.id} value={n.id}>
                           {/*{n.data?.message?.slice(0, 30) || `Node ${n.id}`}*/}
                           {n.data?.message
                               ? n.data.message.slice(0, 30)
                               : `${n.data?.dataType ?? "node"} • ${n.id.slice(0, 6)}`
                             }
                         </option>
                       ))
                   }
                  </select>
                )}
                {(opt.type === "url" || opt.type === "link") && (
                  <input
                    value={opt.value || ""}
                    onChange={e => updateOption(opt.id, { value: e.target.value })}
                    placeholder="https://yuntas.com/producto"
                    className={inputCls}
                  />
                )}
                {opt.type === "whatsapp" && (
                  <input
                    value={opt.value || ""}
                    onChange={e => updateOption(opt.id, { value: e.target.value })}
                    placeholder="https://wa.me/51999999999?text=Hola"
                    className={inputCls}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Botón agregar opción */}
          <button
            onClick={addOption}
            className="
              w-full flex items-center justify-center gap-2
              py-2 rounded-lg border border-dashed
              border-slate-300 dark:border-[#3a4270]
              text-sm text-gray-500 dark:text-gray-400
              hover:bg-slate-50 dark:hover:bg-[#272E50]
              hover:text-blue-600 dark:hover:text-blue-400
              hover:border-blue-400
              transition-all
            "
          >
            <Plus size={14} />
            Agregar opción
          </button>
        </div>

        {/* ── METADATA ── */}
        <div className={sectionCls}>
          <SectionTitle icon={Settings} label="Comportamiento" />
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={data.metadata?.waitForUser || false}
                onChange={e => patch({ metadata: { ...data.metadata, waitForUser: e.target.checked } })}
                className="sr-only"
              />
              <div className={`
                w-9 h-5 rounded-full transition-colors
                ${data.metadata?.waitForUser ? "bg-blue-500" : "bg-slate-300 dark:bg-slate-600"}
              `}>
                <div className={`
                  absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform
                  ${data.metadata?.waitForUser ? "translate-x-4" : "translate-x-0"}
                `} />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">Esperar respuesta</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">El bot pausa hasta recibir input</p>
            </div>
          </label>
        </div>

      </div>

      {/* ── FOOTER: DELETE ── */}
      <div className="px-4 py-4 border-t border-slate-100 dark:border-[#2f3760]">
        <button
          onClick={() => {
            if (confirm("¿Eliminar este nodo? También se eliminarán sus conexiones.")) {
              deleteNode(node.id)
            }
          }}
          className="
            w-full flex items-center justify-center gap-2
            py-2 rounded-lg
            bg-red-50 dark:bg-red-950/30
            text-red-600 dark:text-red-400
            border border-red-200 dark:border-red-800/50
            text-sm font-medium
            hover:bg-red-100 dark:hover:bg-red-900/40
            transition-colors
          "
        >
          <Trash2 size={14} />
          Eliminar nodo
        </button>
      </div>

    </div>
  )
}
