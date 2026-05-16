"use client";

type Props = { name: string; context: string; active: boolean; productos: any[]; selectedProductId?: number | null; onSelectProduct: (productId: number | null) => void; onChange: (patch: any) => void };

export function TemplateHeader({ name, active, productos, context, selectedProductId, onSelectProduct,onChange }: Props) {

  const isProductContext = context === "PRODUCTO";

  return (
    <div className="flex flex-col gap-5">

      {/* =====================================================
                NAME
            ===================================================== */}
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

      {/* =====================================================
               CONTEXT
           ===================================================== */}
      <div className="
             flex flex-col gap-1.5
           ">

             <label className="
               text-xs font-medium
               text-gray-500 dark:text-gray-400
               uppercase tracking-widest
             ">
               Página
             </label>

             <select
               value={context}
               onChange={(e) =>
                 onChange({
                   context: e.target.value,
                 })
               }
               className="
                 h-10 px-3 text-sm rounded-lg w-full

                 border border-gray-200
                 dark:border-white/10

                 bg-white dark:bg-transparent

                 text-gray-900 dark:text-white

                 focus:outline-none
                 focus:border-gray-400
                 dark:focus:border-white/30

                 transition-colors
                 cursor-pointer
               "
             >

               <option
                 value="INICIO"
                 className="
                   bg-white dark:bg-[#071024]
                 "
               >
                 Inicio
               </option>

               <option
                 value="PRODUCTO"
                 className="
                   bg-white dark:bg-[#071024]
                 "
               >
                 Producto
               </option>

             </select>

             <span className="
               text-[11px]
               text-gray-400 dark:text-gray-500
             ">
               Esta plantilla se mostrará según la página donde aparesca el popup
             </span>
           </div>

           {/* =====================================================
                  PRODUCT SELECTOR
            ===================================================== */}

            {isProductContext && (

              <div className="
                flex flex-col gap-1.5
              ">

                <label className="
                  text-xs font-medium
                  text-gray-500 dark:text-gray-400
                  uppercase tracking-widest
                ">
                  Producto
                </label>

                <select
                  value={selectedProductId ?? ""}
                  onChange={(e) =>
                    onSelectProduct(
                      e.target.value
                        ? Number(e.target.value)
                        : null
                    )
                  }
                  className="
                    h-10 px-3 text-sm rounded-lg w-full

                    border border-gray-200
                    dark:border-white/10

                    bg-white
                    dark:bg-transparent

                    text-gray-900
                    dark:text-white

                    focus:outline-none
                    focus:border-gray-400
                    dark:focus:border-white/30

                    transition-colors
                    cursor-pointer
                  "
                >

                  <option value="">
                    Seleccionar producto
                  </option>

                  {productos.map((product) => (

                    <option
                      key={product.id}
                      value={product.id}
                      className="
                        bg-white dark:bg-[#071024]
                      "
                    >
                      {product.name}
                    </option>
                  ))}

                </select>

                <span className="
                  text-[11px]
                  text-gray-400 dark:text-gray-500
                ">
                  Personaliza mensajes e imágenes para este producto
                </span>
              </div>
            )}


           {/* =====================================================
                     ACTIVE
                 ===================================================== */}
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
