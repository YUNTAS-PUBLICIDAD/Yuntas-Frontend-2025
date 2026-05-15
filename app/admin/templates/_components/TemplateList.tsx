"use client";

import { useState } from "react";

const CHANNEL_LABELS: Record<string, string> = {
  email: "Email",
  // sms: "SMS",
  whatsapp: "WhatsApp",
};

export function TemplatesList({ templates, onEdit, onCreate, onDelete }: any) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "active" | "draft">("all");

  const list = (templates ?? []).filter((t: any) => {
    const matchSearch = t.name?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status === "all" ? true : status === "active" ? t.active : !t.active;

    return matchSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6">

      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row  sm:justify-between sm:items-start">
        <div>
          {/*<p className="text-xs font-medium tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-1">
            Comunicaciones
          </p>*/}
          {/*<h1 className="text-xl font-medium text-gray-900 dark:text-white leading-tight">
            Templates
          </h1>*/}
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Configura mensajes automáticos para popups, WhatsApp y correos según cada página
          </p>
        </div>
        <button
          onClick={onCreate}
          className="
            inline-flex items-center justify-center sm:w-auto gap-1.5
            px-4 h-9 rounded-lg text-sm font-medium
            bg-gray-900 text-white hover:bg-gray-700
            dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100
            transition-colors shadow-sm
          "
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Nueva plantilla
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          // { label: "Total", value: list.length },
          // { label: "Activos", value: list.filter((t: any) => t.active).length },
          // { label: "Canales", value: list.reduce((acc: number, t: any) => acc + (t.variants?.length ?? 0), 0) },

          {
             label: "Plantillas",
             value: list.length
           },

           {
             label: "Automatizaciones activas",
             value: list.filter(
               (t:any) => t.active
             ).length
           },

           {
             label: "Mensajes programados",
             value: list.reduce(
               (acc:number, t:any) =>
                 acc + (t.steps?.length ?? 0),
               0
             )
           }
        ].map(({ label, value }) => (
          <div key={label} className="bg-gray-50 dark:bg-white/5 rounded-lg px-4 py-3">
            <p className="text-xs font-medium tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-1.5">
              {label}
            </p>
            <p className="text-2xl font-medium text-gray-900 dark:text-white">{value}</p>
          </div>
        ))}
      </div>

      {/* SEARCH ROW */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M10.5 10.5L13 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre…"
            className="
              w-full h-[34px] pl-[34px] pr-3 text-sm
              border border-gray-200 dark:border-white/10
              rounded-lg bg-white dark:bg-white/5
              text-gray-900 dark:text-white
              placeholder:text-gray-400 dark:placeholder:text-gray-600
              focus:outline-none focus:border-gray-400 dark:focus:border-white/30
              transition-colors
            "
          />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value as any)} className="
          h-[34px] px-3 text-sm
          border border-gray-200 dark:border-white/20
          rounded-lg bg-white dark:bg-transparent
          text-gray-500 dark:text-white
          focus:outline-none cursor-pointer dark:placeholder:text-gray-400
        ">
          <option value="all" className="bg-white dark:bg-[#071024] text-gray-900 dark:text-white">Todos</option>
          <option value="active" className="bg-white dark:bg-[#071024] text-gray-900 dark:text-white">Activo</option>
          <option value="draft" className="bg-white dark:bg-[#071024] text-gray-900 dark:text-white">Borrador</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 ">

        <div className="hidden md:block">

        {/* TABLE HEAD */}
        <div className="
          grid grid-cols-[1fr_90px_100px_110px]
          px-5 h-[38px] items-center
          bg-gray-50 dark:bg-white/5
          border-b border-gray-200 dark:border-white/10
        ">
          {["Nombre", "Estado", "Canales", ""].map((h) => (
            <span key={h} className="text-[11px] font-medium tracking-widest uppercase text-gray-400 dark:text-gray-500">
              {h}
            </span>
          ))}
        </div>

        {/* EMPTY STATE */}
        {list.length === 0 && (
          <div className="py-14 text-center">
            <div className="
              w-10 h-10 mx-auto mb-3 rounded-lg
              bg-gray-100 dark:bg-white/10
              flex items-center justify-center
            ">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="5" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M7 9h6M7 12h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                <path d="M7 3l-2 2M13 3l2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">No hay plantillas configuradas</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">Crea una plantilla para automatizar mensajes en tus campañas y popups.</p>
          </div>
        )}

        {/* ROWS */}
        {list.map((t: any) => {


         const channels = [
           ...new Set(
             t.steps?.flatMap(
               (step:any) => step.variants?.map(
                 (v:any) => CHANNEL_LABELS[v.channel]
               ) ?? []
             ) ?? []
           )
         ]

         return (

          <div
            key={t.id}
            className="
              grid grid-cols-[1fr_90px_100px_110px]
              px-5 h-[58px] items-center
              border-b border-gray-100 dark:border-white/5
              last:border-none
              hover:bg-gray-50 dark:hover:bg-white/5
              transition-colors
            "
          >
            {/* NAME */}
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{t.name}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                {CHANNEL_LABELS[t.channel] ?? t.channel ?? "—"} · Modificado {t.updatedAt ?? "recientemente"}
              </p>
            </div>

            {/* STATUS */}
            <div>
              <span className={`
                inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium
                ${t.active
                  ? 'bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400'
                  : 'bg-gray-100 text-gray-500 dark:bg-white/10 dark:text-gray-400 border border-gray-200 dark:border-white/10'
                }
              `}>
                {/*{t.status === 'active' ? 'Activo' : 'Borrador'}*/}
                {
                  t.active ? 'Activo' : 'Borrador'
                }
              </span>
            </div>

            {/* VARIANTS */}
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {/*{t.variants?.length ?? 0} {(t.variants?.length ?? 0) === 1 ? 'variante' : 'variantes'}*/}
              {/*{(t.variants?.length ?? 0) === 0
                  ? "Sin canales"
                  : `${t.variants?.length} canal${
                      (t.variants?.length ?? 0) > 1
                        ? "es"
                        : ""
                    }`
                }*/}

              {
                channels.length === 0 ? "Sin canales" : channels.join(" . ")
              }
            </p>

            {/* ACTIONS */}
            <div className="flex items-center gap-1 justify-end">
              {/* Duplicate */}
              <button
                title="Duplicar"
                className="
                  w-[30px] h-[30px] flex items-center justify-center rounded-md
                  border border-gray-200 dark:border-white/10
                  text-gray-400 hover:text-gray-700 dark:hover:text-white
                  hover:bg-gray-100 dark:hover:bg-white/10
                  transition
                "
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <rect x="5" y="5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M3 11V3h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {/* Edit */}
              <button
                onClick={() => onEdit(t.id)}
                title="Editar"
                className="
                  w-[30px] h-[30px] flex items-center justify-center rounded-md
                  border border-gray-200 dark:border-white/10
                  text-gray-400 hover:text-gray-700 dark:hover:text-white
                  hover:bg-gray-100 dark:hover:bg-white/10
                  transition
                "
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M10.5 2.5l3 3L5 14H2v-3L10.5 2.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                </svg>
              </button>
              {/* Delete */}
              <button
                onClick={() => onDelete(t.id)}
                title="Eliminar"
                className="
                  w-[30px] h-[30px] flex items-center justify-center rounded-md
                  border border-gray-200 dark:border-white/10
                  text-gray-400
                  hover:text-red-600 dark:hover:text-red-400
                  hover:bg-red-50 dark:hover:bg-red-500/10
                  hover:border-red-200 dark:hover:border-red-500/20
                  transition
                "
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 5h10M6 5V3h4v2M5.5 5l.5 8h4l.5-8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
         )
        }
        )}

        {/* FOOTER */}
        {list.length > 0 && (
          <div className="
            flex justify-between items-center
            px-5 py-2.5
            border-t border-gray-100 dark:border-white/5
            bg-gray-50 dark:bg-white/[0.02]
          ">
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {list.length} {list.length === 1 ? 'plantilla' : 'plantillas'}
            </span>
            <div className="flex gap-1">
              {[
                <path key="l" d="M8 3L4 7.5 8 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>,
                <path key="r" d="M5 3l4 4.5-4 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>,
              ].map((icon, i) => (
                <button key={i} className="
                  w-7 h-7 flex items-center justify-center rounded-md
                  border border-gray-200 dark:border-white/10
                  text-gray-400 hover:text-gray-700 dark:hover:text-white
                  hover:bg-gray-100 dark:hover:bg-white/10 transition
                ">
                  <svg width="12" height="12" viewBox="0 0 13 13" fill="none">{icon}</svg>
                </button>
              ))}
            </div>
          </div>
        )}

        </div>
        {/* MOBILE */}
        <div className="md:hidden divide-y divide-gray-100 dark:divide-white/5">
          {list.map((t: any) => {

            const channels = [
              ...new Set(
                t.steps?.flatMap(
                  (step:any) => step.variants?.map(
                    (v:any) => CHANNEL_LABELS[v.channel]
                  ) ?? []
                ) ?? []
              )
            ]

            return (
            <div
              key={t.id}
              className="p-4 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {t.name}
                  </p>

                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {/*{CHANNEL_LABELS[t.channel] ?? t.channel ?? "—"}*/}

                    {
                      channels.join(". ") || "Sin canales"
                    }
                  </p>
                </div>

                <span
                  className={`
                    shrink-0 inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium
                    ${
                      t.active
                        ? "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                        : "bg-gray-100 text-gray-500 dark:bg-white/10 dark:text-gray-400 border border-gray-200 dark:border-white/10"
                    }
                  `}
                >
                  {t.active ? "Activo" : "Desactivado"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t.variants?.length ?? 0}{" "}
                  {(t.variants?.length ?? 0) === 1 ? "canal" : "canales"}
                </p>

                <div className="flex items-center gap-1">
                  <button
                    title="Editar"
                    onClick={() => onEdit(t.id)}
                    className="
                      w-8 h-8 flex items-center justify-center rounded-md
                      border border-gray-200 dark:border-white/10
                      text-gray-400 hover:text-gray-700 dark:hover:text-white
                      hover:bg-gray-100 dark:hover:bg-white/10
                      transition
                    "
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M10.5 2.5l3 3L5 14H2v-3L10.5 2.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  <button
                    onClick={() => onDelete(t.id)}
                    title="Eliminar"
                    className="
                      w-8 h-8 flex items-center justify-center rounded-md
                      border border-gray-200 dark:border-white/10
                      text-gray-400
                      hover:text-red-600 dark:hover:text-red-400
                      hover:bg-red-50 dark:hover:bg-red-500/10
                      transition
                    "
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 5h10M6 5V3h4v2M5.5 5l.5 8h4l.5-8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            )
          }
          )}
        </div>

      </div>
    </div>
  );
}
