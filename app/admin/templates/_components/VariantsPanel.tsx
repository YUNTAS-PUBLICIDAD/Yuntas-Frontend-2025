"use client";

import { useState, useMemo } from "react";
import { VariantEditor } from "./VariantEditor";

type Props = {
  variants: any[];
  onChange: (channel: string, patch: any) => void;
  onRemove: (channel: string) => void;
  onUpload: (channel: string, file: File) => Promise<any>;
  onRemoveAsset: (channel: string, key: string) => void;
  onUploadProduct: (productId: number, file: File) => Promise<any>;
  onRemoveProductAsset: (productId: number, key:string) => any;
};

export function VariantsPanel({ variants, onChange, onRemove, onUpload, onRemoveAsset, onUploadProduct, onRemoveProductAsset }: Props) {
  const [active, setActive] = useState<"whatsapp" | "email">("whatsapp");

  const current = useMemo(() => {
    return variants.find(v => v.channel === active);
  }, [variants, active]);

  return (
    <div className="flex flex-col gap-5">

      {/* TABS */}
      <div className="
        flex gap-2
        border-b border-gray-200 dark:border-white/10
      ">
        {["whatsapp", "email"].map(ch => {
          const isActive = active === ch;

          return (
            <button
              key={ch}
              onClick={() => setActive(ch as any)}
              className={`
                px-3 py-2 text-sm capitalize
                border-b-2 transition

                ${isActive
                  ? "border-gray-900 text-gray-900 dark:border-white dark:text-white"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
                }
              `}
            >
              {ch}
            </button>
          );
        })}
      </div>

      {/* CONTENT */}
      {!current ? (
        <div className="
          p-6 rounded-lg
          border border-dashed border-gray-300 dark:border-white/20
          flex flex-col gap-3 items-start
        ">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No hay variante para <strong>{active}</strong>
          </p>

          <button
            onClick={() => onChange(active, {})}
            className="
              px-3 py-1.5 text-sm rounded-md

              bg-gray-900 text-white hover:bg-gray-700
              dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200

              transition
            "
          >
            Crear variante
          </button>
        </div>
      ) : (
        <VariantEditor
          variant={current}
          onChange={(patch) => onChange(active, patch)}
          onDelete={() => onRemove(active)}
          onUpload={(file) => onUpload(active, file)}
          onRemoveAsset={(key) => onRemoveAsset(active, key)}
          onUploadProduct={(productId, file) => onUploadProduct(active, productId, file)}
          onRemoveProductAsset={onRemoveProductAsset}
        />
      )}

    </div>
  );
}
