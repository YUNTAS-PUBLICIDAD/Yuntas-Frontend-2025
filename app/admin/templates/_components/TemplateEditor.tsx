import toast from "react-hot-toast";
import { TemplateHeader } from "./TemplateHeader";
import { VariantsPanel } from "./VariantsPanel";
import { useRouter } from "next/navigation";

export function TemplateEditor({ editor }: any) {
  const {
    template, updateTemplate, upsertVariant, removeVariant,
    uploadAsset, removeAsset, save, loading, saving,
    removeProductAsset, uploadProductAsset,
  } = editor;

  const router = useRouter();

  const handleSave = async () => {
    try {
     await save();
     toast.success("Template guardado correctamente");
     router.push("/admin/templates");
    }catch (e){
      console.error(e);
      toast.error("Error al guardar template")
    }
  }
  if (loading) {
    return (
      <div className="flex items-center gap-2 py-12 justify-center text-sm text-gray-400">
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        Cargando template…
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">

      {/* ================= GENERAL ================= */}
      <section className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5">
        <div className="px-5 py-3 border-b border-gray-100 dark:border-white/10">
          <span className="text-xs uppercase tracking-wider text-gray-400">
            Configuración general
          </span>
        </div>

        <div className="p-5">
          <TemplateHeader
            name={template.name}
            active={template.active}
            onChange={updateTemplate}
          />
        </div>
      </section>

      {/* ================= VARIANTS ================= */}
      <section className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 flex flex-col">

        <div className="px-2 sm:px-5 py-3 border-b border-gray-100 dark:border-white/10 flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-gray-400">
            Variantes
          </span>

          <span className="text-xs text-gray-400">
            {template.variants?.length ?? 0} canales
          </span>
        </div>

        <div className="px-2 py-5 sm:p-5">
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

        {/* FOOTER */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between px-5 py-4 border-t border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5">

          <div className="text-xs text-gray-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
            Cambios sin guardar
          </div>

          <button
            // onClick={save}
            onClick={handleSave}
            disabled={saving}
            className="
              w-full sm:w-auto
              inline-flex items-center justify-center gap-2
              px-4 h-10 rounded-lg text-sm font-medium
              bg-gray-900 text-white hover:bg-gray-700
              dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100
              disabled:opacity-40
            "
          >
            {saving ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Guardando…
              </>
            ) : (
              "Guardar template"
            )}
          </button>

        </div>

      </section>

    </div>
  );
}
