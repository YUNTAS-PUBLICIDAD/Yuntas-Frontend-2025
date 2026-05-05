"use client";

type Props = { name: string; active: boolean; onChange: (patch: any) => void };

export function TemplateHeader({ name, active, onChange }: Props) {
  return (
    <div className="flex flex-col gap-5">

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest">
          Nombre
        </label>
        <input
          value={name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="Ej: Bienvenida, Producto"
          className="
            h-9 px-3 text-sm rounded-lg w-full
            border border-gray-200 dark:border-white/10
            bg-white dark:bg-transparent
            text-gray-900 dark:text-white
            placeholder:text-gray-400 dark:placeholder:text-gray-600
            focus:outline-none focus:border-gray-400 dark:focus:border-white/30
            transition-colors
          "
        />
      </div>

      {/*<div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest">
          Descripción interna
        </label>
        <input
          placeholder="Uso, contexto, audiencia…"
          className="
            h-9 px-3 text-sm rounded-lg w-full
            border border-gray-200 dark:border-white/10
            bg-white dark:bg-transparent
            text-gray-900 dark:text-white
            placeholder:text-gray-400 dark:placeholder:text-gray-600
            focus:outline-none focus:border-gray-400 dark:focus:border-white/30
            transition-colors
          "
        />
        <span className="text-[11px] text-gray-400 dark:text-gray-500">Solo visible para tu equipo</span>
      </div>*/}

      <div className="
        flex items-center justify-between
        px-3.5 py-3 rounded-lg
        border border-gray-200 dark:border-white/10
        bg-gray-50 dark:bg-white/5
      ">
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">Activo</p>
          <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">Disponible para envío</p>
        </div>
        <button
          onClick={() => onChange({ active: !active })}
          className={`
            relative w-10 h-[22px] rounded-full transition-colors flex-shrink-0
            ${active ? "bg-green-500" : "bg-gray-300 dark:bg-white/20"}
          `}
        >
          <span className={`
            absolute top-[3px] w-4 h-4 rounded-full bg-white transition-all
            ${active ? "left-[20px]" : "left-[3px]"}
          `} />
        </button>
      </div>

    </div>
  );
}
