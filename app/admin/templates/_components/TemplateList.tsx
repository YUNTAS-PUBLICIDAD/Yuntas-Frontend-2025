"use client";

export function TemplatesList({ templates, onEdit, onCreate, onDelete }: any) {
  return (
    <div className="flex flex-col gap-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="
          text-xl font-semibold tracking-tight
          text-gray-900 dark:text-white
        ">
          Templates
        </h2>

        <button
          onClick={onCreate}
          className="
            px-4 py-2 rounded-lg text-sm font-medium
            bg-gray-900 text-white hover:bg-gray-700
            dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200
            transition shadow-sm
          "
        >
          + Nuevo
        </button>
      </div>

      {/* CONTAINER */}
      <div className="
        rounded-xl overflow-hidden
        border
        border-gray-200 dark:border-white/10

        bg-white
        dark:bg-white/5 dark:backdrop-blur-sm
      ">

        {(templates ?? []).length === 0 && (
          <p className="
            p-6 text-sm text-center
            text-gray-500 dark:text-gray-400
          ">
            No hay templates aún
          </p>
        )}

        {(templates ?? []).map((t: any) => (
          <div
            key={t.id}
            className="
              flex justify-between items-center
              px-5 py-4

              border-b
              border-gray-200 dark:border-white/10

              hover:bg-gray-50
              dark:hover:bg-white/10

              transition
            "
          >
            {/* INFO */}
            <div className="flex flex-col">
              <p className="font-medium text-gray-900 dark:text-white">
                {t.name}
              </p>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t.variants?.length ?? 0} variantes
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-2">

              <button
                onClick={() => onEdit(t.id)}
                className="
                  text-sm px-3 py-1.5 rounded-md

                  border border-gray-300
                  hover:bg-gray-100

                  dark:border-white/20
                  dark:text-white
                  dark:hover:bg-white/10

                  transition
                "
              >
                Editar
              </button>

              <button
                onClick={() => onDelete(t.id)}
                className="
                  text-sm px-3 py-1.5 rounded-md

                  text-red-600 hover:bg-red-50
                  dark:text-red-400 dark:hover:bg-red-500/10

                  transition
                "
              >
                Eliminar
              </button>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
