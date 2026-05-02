"use client";

type Props = {
  name: string;
  active: boolean;
  onChange: (patch: any) => void;
};

export function TemplateHeader({ name, active, onChange }: Props) {
  return (
    <div className="flex flex-col gap-5">

      {/* TITLE */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Nombre del template
        </label>

        <input
          value={name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="Ej: Bienvenida, Promo Julio..."
          className="
            px-3 py-2 rounded-lg text-sm

            border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-gray-400

            dark:bg-transparent
            dark:border-white/20
            dark:text-white
            dark:focus:ring-white/30
          "
        />
      </div>

      {/* STATUS */}
      <div className="flex items-center justify-between">

        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Estado
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Controla si el template está disponible
          </span>
        </div>

        <button
          onClick={() => onChange({ active: !active })}
          className={`
            relative inline-flex h-6 w-11 items-center rounded-full transition
            ${active ? "bg-green-500" : "bg-gray-300 dark:bg-white/20"}
          `}
        >
          <span
            className={`
              inline-block h-4 w-4 transform rounded-full bg-white transition
              ${active ? "translate-x-6" : "translate-x-1"}
            `}
          />
        </button>

      </div>

    </div>
  );
}
