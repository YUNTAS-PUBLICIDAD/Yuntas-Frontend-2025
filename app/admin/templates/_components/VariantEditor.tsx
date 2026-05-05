"use client";

import "react-quill/dist/quill.snow.css";
import { useProductos } from "@/hooks/useProductos";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getImageUrl } from "@/utils/getImageUrl";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const QUILL_MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-medium tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-1.5">
      {children}
    </p>
  );
}

function UploadZone({ label, hint, onChange }: { label: string; hint?: string; onChange: (e: any) => void }) {
  return (
    <label className="
      flex flex-col items-center gap-2 py-5 px-4
      border border-dashed border-gray-200 dark:border-white/10
      rounded-lg bg-gray-50 dark:bg-white/5
      cursor-pointer text-center
      hover:bg-gray-100 dark:hover:bg-white/10 transition-colors
    ">
      <div className="w-8 h-8 rounded-lg bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 flex items-center justify-center">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M8 2v8M5 5l3-3 3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
      </div>
      <span className="text-sm font-medium text-gray-700 dark:text-white">{label}</span>
      {hint && <span className="text-xs text-gray-400 dark:text-gray-500">{hint}</span>}
      <input type="file" accept="image/*" onChange={onChange} className="hidden" />
    </label>
  );
}

function ImagePreview({ src, onReplace, onRemove }: { src: string; onReplace: (e: any) => void; onRemove: () => void }) {
  return (
    <div className="relative group rounded-lg overflow-hidden border border-gray-200 dark:border-white/10">
      <img src={src} alt="preview" className="w-full h-[180px] object-cover" />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
        <label className="px-3 py-1.5 text-xs font-medium rounded-md bg-white text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors">
          Reemplazar
          <input type="file" accept="image/*" onChange={onReplace} className="hidden" />
        </label>
        <button
          onClick={onRemove}
          className="px-3 py-1.5 text-xs font-medium rounded-md bg-red-600 text-white hover:bg-red-500 transition-colors"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export function VariantEditor({
  variant, onChange, onDelete, onUpload,
  onRemoveAsset, onUploadProduct, onRemoveProductAsset, onSelectProduct, variables, loading, preview
}: any) {
  const { productos, getProductos } = useProductos();
  const isProductContext = variant.context === "PRODUCTO";
  const image = variant.assets?.find((a: any) => a.key === "image");
  const [productId, setProductId] = useState<number | null>(null);

  const insertVariable = (v:string) => {
    const tag = `{{${v}}}`;
    onChange({
      content: (variant.content || "") + tag
    });
  };

  const suggested = variant.context === "PRODUCTO" ? ["producto_nombre", "descripcion"] : ["nombre", "email"];

  const restVariables = variables.filter(v => !suggested.includes(v));

  useEffect(() => {
    if (isProductContext) getProductos(50);
  }, [isProductContext]);

  const productImage = variant.productAssets?.find(
    (a: any) => a.key === "image" && a.product_id === productId
  );

  const handleFile = async (e: any) => {
    const file = e.target.files?.[0];
    if (file) await onUpload(file);
  };

  const handleProductFile = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!productId) { alert("Selecciona un producto primero"); return; }
    await onUploadProduct(productId, file);
  };

  const charCount = (variant.content ?? "").replace(/<[^>]*>/g, "").length;
  const maxChars = variant.channel === "email" ? 5000 : 1024;

  return (
    <div className="flex flex-col gap-5">

      {/* Context + Subject row */}
      <div className={variant.channel === "email" ? "grid grid-cols-1 sm:grid-cols-2 gap-3" : ""}>
        <div>
          <FieldLabel>Contexto</FieldLabel>
          <select
            value={variant.context}
            onChange={(e) => onChange({ context: e.target.value })}
            className="
              w-full h-9 px-3 text-sm rounded-lg
              border border-gray-200 dark:border-white/10
              bg-white dark:bg-transparent
              text-gray-900 dark:text-white
              focus:outline-none focus:border-gray-400 dark:focus:border-white/30
              transition-colors cursor-pointer
            "
          >
            <option value="INICIO">Inicio</option>
            <option value="PRODUCTO">Producto</option>
          </select>
        </div>
        {variant.channel === "email" && (
          <div>
            <FieldLabel>Asunto</FieldLabel>
            <input
              value={variant.subject ?? ""}
              onChange={(e) => onChange({ subject: e.target.value })}
              placeholder="Asunto del correo…"
              className="
                w-full h-9 px-3 text-sm rounded-lg
                border border-gray-200 dark:border-white/10
                bg-white dark:bg-transparent
                text-gray-900 dark:text-white
                placeholder:text-gray-400
                focus:outline-none focus:border-gray-400 dark:focus:border-white/30
                transition-colors
              "
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <FieldLabel>Contenido</FieldLabel>
          <span className="text-[11px] text-gray-400 dark:text-gray-500">
            {charCount} / {maxChars}
          </span>
        </div>
        {variant.channel === "email" ? (
          <ReactQuill
            value={variant.content || ""}
            onChange={(value) => onChange({ content: value })}
            modules={QUILL_MODULES}
            className="
              bg-white dark:bg-transparent rounded-lg
              [&_.ql-container]:min-h-[160px]
              [&_.ql-editor]:min-h-[160px]
              [&_.ql-toolbar]:rounded-t-lg
              [&_.ql-container]:rounded-b-lg
              [&_.ql-toolbar]:border-gray-200
              [&_.ql-container]:border-gray-200
              dark:[&_.ql-toolbar]:border-white/10
              dark:[&_.ql-container]:border-white/10
              dark:[&_.ql-editor]:text-white
            "
          />
        ) : (
          <textarea
            value={variant.content ?? ""}
            onChange={(e) => onChange({ content: e.target.value })}
            placeholder="Hola {{nombre}}, bienvenido…"
            className="
              w-full px-3 py-2.5 text-sm rounded-lg resize-none min-h-[200px]
              border border-gray-200 dark:border-white/10
              bg-white dark:bg-transparent
              text-gray-900 dark:text-white
              placeholder:text-gray-400
              focus:outline-none focus:border-gray-400 dark:focus:border-white/30
              transition-colors leading-relaxed
            "
          />
        )}

        {/* 🔥 AQUÍ VA TU BLOQUE DE VARIABLES */}
         <div className="mt-3">
           <FieldLabel>Variables</FieldLabel>

           {loading ? (
             <p className="text-xs text-gray-400">Cargando variables…</p>
           ) : (
             <>
               <div className="mb-2">
                 <p className="text-[10px] text-gray-400 mb-1">Sugeridas</p>
                 <div className="flex flex-wrap gap-2">
                   {suggested.map(v => (
                     <button
                       key={v}
                       onClick={() => insertVariable(v)}
                       className="text-xs px-2 py-1 rounded-md border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/20 transition"
                     >
                       {`{{${v}}}`}
                     </button>
                   ))}
                 </div>
               </div>

               <div>
                 <p className="text-[10px] text-gray-400 mb-1">Todas</p>
                 <div className="flex flex-wrap gap-2">
                   {restVariables.map(v => (
                     <button
                       key={v}
                       onClick={() => insertVariable(v)}
                       className="text-xs px-2 py-1 rounded-md border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/20 transition"
                     >
                       {`{{${v}}}`}
                     </button>
                   ))}
                 </div>
               </div>

               <div className="mt-2 text-[10px] text-gray-400">
                 {variables.slice(0, 3).map(v => (
                   <span key={v} className="mr-2">
                     {`{{${v}}}`} = {preview[v]}
                   </span>
                 ))}
               </div>
             </>
           )}
         </div>
      </div>

      {/* CTA row */}
      {
        variant.channel === "email" && (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <FieldLabel>Botón CTA</FieldLabel>
          <input
          value={variant.ctaText ?? ""}
          onChange={(e) => onChange({ctaText: e.target.value})}
            placeholder="Ej: Ver producto"
            className="
              w-full h-9 px-3 text-sm rounded-lg
              border border-gray-200 dark:border-white/10
              bg-white dark:bg-transparent text-gray-900 dark:text-white
              placeholder:text-gray-400
              focus:outline-none focus:border-gray-400 dark:focus:border-white/30 transition-colors
            "
          />
        </div>
        <div>
          <FieldLabel>URL</FieldLabel>
          <input
          value={variant.ctaUrl ?? ""}
          onChange={(e) => onChange({ctaUrl: e.target.value})}
            placeholder="https://…"
            className="
              w-full h-9 px-3 text-sm rounded-lg
              border border-gray-200 dark:border-white/10
              bg-white dark:bg-transparent text-gray-900 dark:text-white
              placeholder:text-gray-400
              focus:outline-none focus:border-gray-400 dark:focus:border-white/30 transition-colors
            "
          />
        </div>
      </div>
        )
      }

      {
        !isProductContext && (

      <div>
        <FieldLabel>Imagen de cabecera</FieldLabel>
        {!image ? (
          <UploadZone
            label="Subir imagen"
            hint="PNG, JPG, WebP · máx. 2MB"
            onChange={handleFile}
          />
        ) : (
          <ImagePreview
            src={getImageUrl(image.meta?.url || image.path)}
            onReplace={handleFile}
            onRemove={() => onRemoveAsset("image")}
          />
        )}
      </div>
        )
      }

      {/* Product section */}
      {isProductContext && (
        <div className="pt-4 border-t border-gray-100 dark:border-white/10 flex flex-col gap-4">
          <div>
            <FieldLabel>Producto</FieldLabel>
            <select
              value={productId ?? ""}
              onChange={(e) => {
                const id = e.target.value ? Number(e.target.value) : null;
                // setProductId(e.target.value ? Number(e.target.value) : null)
                setProductId(id);
                onSelectProduct?.(id);
              }
              }
              className="
                w-full h-9 px-3 text-sm rounded-lg cursor-pointer
                border border-gray-200 dark:border-white/10
                bg-white dark:bg-transparent text-gray-900 dark:text-white
                focus:outline-none focus:border-gray-400 transition-colors
              "
            >
              <option value="">Seleccionar producto…</option>
              {productos.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          {productId && (
            <div>
              <FieldLabel>Imagen por producto</FieldLabel>
              {!productImage ? (
                <UploadZone
                  label="Subir imagen del producto"
                  hint="Sobreescribe la imagen general"
                  onChange={handleProductFile}
                />
              ) : (
                <ImagePreview
                  src={getImageUrl(productImage.path)}
                  onReplace={handleProductFile}
                  onRemove={() => onRemoveProductAsset(productId, "image")}
                />
              )}
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-white/10">
        <button
          onClick={onDelete}
          className="
            inline-flex items-center gap-1.5 px-3 h-8 text-xs font-medium rounded-lg
            border border-gray-200 dark:border-white/10
            text-gray-500 dark:text-gray-400
            hover:text-red-600 dark:hover:text-red-400
            hover:bg-red-50 dark:hover:bg-red-500/10
            hover:border-red-200 dark:hover:border-red-500/20
            transition-all
          "
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M3 5h10M6 5V3h4v2M5.5 5l.5 8h4l.5-8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Eliminar variante
        </button>
        <span className="text-[11px] text-gray-400 dark:text-gray-500">
          Última edición hace 2h
        </span>
      </div>
    </div>
  );
}
