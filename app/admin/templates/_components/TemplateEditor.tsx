"use client";

import { TemplateHeader } from "./TemplateHeader";
import { VariantsPanel } from "./VariantsPanel";

export function TemplateEditor({ editor }: any) {
  const {
    template,
    updateTemplate,
    upsertVariant,
    removeVariant,
    uploadAsset,
    removeAsset,
    save,
    loading,
    saving,
    removeProductAsset,
    uploadProductAsset
  } = editor;

  if (loading) {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Cargando template...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">

      {/* HEADER CARD */}
      <div className="
        rounded-xl border
        border-gray-200 dark:border-white/10
        bg-white dark:bg-white/5
        p-6
      ">
        <TemplateHeader
          name={template.name}
          active={template.active}
          onChange={updateTemplate}
        />
      </div>

      {/* VARIANTS */}
      <div className="
        rounded-xl border
        border-gray-200 dark:border-white/10
        bg-white dark:bg-white/5
        p-6
      ">
        <VariantsPanel
          variants={template.variants}
          onChange={upsertVariant}
          onRemove={removeVariant}
          onUpload={uploadAsset}
          onRemoveAsset={removeAsset}
          onUploadProduct={uploadProductAsset}
          onRemoveProductAsset={removeProductAsset}
        />
      </div>

      {/* ACTION */}
      <div className="flex justify-end">
        <button
          onClick={save}
          disabled={saving}
          className="
            px-5 py-2.5 rounded-lg text-sm font-medium

            bg-gray-900 text-white hover:bg-gray-700
            dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200

            disabled:opacity-50 disabled:cursor-not-allowed
            transition
          "
        >
          {saving ? "Guardando..." : "Guardar Template"}
        </button>
      </div>

    </div>
  );
}
