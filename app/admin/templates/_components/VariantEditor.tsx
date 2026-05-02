"use client";

import "react-quill/dist/quill.snow.css";

import { useProductos } from "@/hooks/useProductos";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getImageUrl } from "@/utils/getImageUrl";
const ReactQuill = dynamic(() => import("react-quill"), {ssr:false});

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }], // títulos
       ["bold", "italic", "underline"], // formato básico
       [{ list: "ordered" }, { list: "bullet" }], // listas
       ["link"], // enlaces
       ["clean"], // limpiar formato
  ]
}

export function VariantEditor({ variant, onChange, onDelete, onUpload, onRemoveAsset, onUploadProduct, onRemoveProductAsset }: any) {

  const {productos, getProductos, isLoading} = useProductos();

  const isProductContext = variant.context === "PRODUCTO";

  const image = variant.assets?.find((a: any) => a.key === "image");
  useEffect(() => {
    if(isProductContext){
      getProductos(50);
    }
  }, [isProductContext]);

  const [productId, setProductId] = useState<number|null>(null);

  const handleFile = async (e:any) => {
    const file = e.target.files?.[0];
    if(!file) return;
    await onUpload(file);
  }

  const handleProductFile = async (e: any) => {
    const file = e.target.files?.[0];
    if(!file) return;

    if(!productId){
      alert("Selecciona un producto primero");
      return;
    }
    await onUploadProduct(productId, file);
  }

  const productImage = variant.productAssets?.find(
    (a:any) => a.key === "image" && a.product_id === productId
  );

  return (
    <div className="border p-4 flex flex-col gap-5">

      {/* Header */}
      <div className="flex justify-between items-center">
        <strong className="capitalize">{variant.channel}</strong>
        <button className="text-sm text-red-600 hover:underline" onClick={onDelete}>Eliminar</button>
      </div>

      {/*CONTEXT*/}
      <select
        value={variant.context}
        onChange={(e) => onChange({ context: e.target.value })}
        className="px-3 py-2 rounded-md text-sm border border-gray-300 dark:border-white/20 bg-white dark:bg-transparent"
      >
        <option value="INICIO">INICIO</option>
        <option value="PRODUCTO">PRODUCTO</option>
      </select>

      {/* SUBJECT */}
      {variant.channel === "email" && (
        <input
          value={variant.subject ?? ""}
          onChange={(e) => onChange({ subject: e.target.value })}
          placeholder="Asunto"
          className="border px-2 py-2 rounded-md text-sm border-gray-300 dark:border-white/20 bg-white dark:bg-transparent"
        />
      )}

      {
        variant.channel === "email" ? (
        <ReactQuill value={variant.content || ""} onChange={(value) => onChange({content:value})} modules={modules} className="bg-white dark:bg-transparent [&_.ql-container]:min-h-[180px] [&_.ql-editor]:min-h-[180px]"/>
        ) : (
      <textarea
        value={variant.content ?? ""}
        onChange={(e) => onChange({ content: e.target.value })}
        placeholder="Contenido"
        className="px-3 py-2 rounded-md text-sm min-h-[120px] border border-gray-300 dark:border-white/20 bg-white dark:bg-transparent resize-none"
      />
        )
      }


      {/* =========================
                IMAGE ASSET
            ========================= */}
            <div className="flex flex-col gap-3">

              <p className="text-sm font-medium">Imagen</p>

                {!image ? (
                  <label className="
                    flex flex-col items-center justify-center
                    border border-dashed border-gray-300 dark:border-white/20
                    rounded-xl p-6 text-sm cursor-pointer
                    hover:bg-gray-50 dark:hover:bg-white/10
                    transition
                  ">
                    <span className="text-gray-500">Subir imagen</span>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFile}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="relative group rounded-xl overflow-hidden border border-gray-200 dark:border-white/10">

                    {/* IMAGE */}
                    <img
                      src={getImageUrl(image.meta?.url || image.path)}
                      alt="preview"
                      className="w-full h-[200px] object-cover"
                    />

                    {/* OVERLAY */}
                    <div className="
                      absolute inset-0 bg-black/40 opacity-0
                      group-hover:opacity-100
                      flex items-center justify-center gap-3
                      transition
                    ">

                      {/* REPLACE */}
                      <label className="
                        px-3 py-1.5 text-xs rounded-md
                        bg-white text-gray-900 cursor-pointer
                        hover:bg-gray-200
                      ">
                        Reemplazar
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFile}
                          className="hidden"
                        />
                      </label>

                      {/* DELETE */}
                      <button
                        onClick={() => onRemoveAsset("image")}
                        className="
                          px-3 py-1.5 text-xs rounded-md
                          bg-red-600 text-white
                          hover:bg-red-500
                        "
                      >
                        Eliminar
                      </button>

                    </div>

                  </div>
                )}

            </div>

            {/* =========================
                PRODUCT IMAGE OVERRIDE
            ========================= */}
            {isProductContext && (
              <div className="flex flex-col gap-3 border-t pt-4">

                {/* SELECT PRODUCT */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">
                    Producto
                  </label>

                  <select
                    value={productId ?? ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      setProductId(val ? Number(val) : null);
                    }}
                    className="px-3 py-2 rounded-md text-sm border border-gray-300 dark:border-white/20 bg-white dark:bg-transparent"
                  >
                    <option value="">Seleccionar producto</option>

                    {productos.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* IMAGE POR PRODUCTO */}
                {productId && (
                  <>
                    <p className="text-sm font-medium">
                      Imagen por producto
                    </p>

                    {!productImage ? (
                      <label className="border border-dashed p-4 rounded cursor-pointer text-sm">
                        Subir imagen producto
                        <input
                          type="file"
                          onChange={handleProductFile}
                          className="hidden"
                        />
                      </label>
                    ) : (
                      <div className="relative group rounded-xl overflow-hidden border">

                        <img
                          src={getImageUrl(productImage.path)}
                          className="w-full h-[200px] object-cover"
                        />

                        <div className="
                          absolute inset-0 bg-black/40 opacity-0
                          group-hover:opacity-100
                          flex items-center justify-center gap-3
                          transition
                        ">
                          <button
                            onClick={() => onRemoveProductAsset(productId, "image")}
                            className="px-3 py-1.5 text-xs bg-red-600 text-white rounded"
                          >
                            Eliminar
                          </button>
                        </div>

                      </div>
                    )}
                  </>
                )}

              </div>
            )}

    </div>
  );
}
