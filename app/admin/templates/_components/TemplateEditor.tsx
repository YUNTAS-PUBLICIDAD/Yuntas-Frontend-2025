"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { TemplateHeader } from "./TemplateHeader";
import { StepsSidebar } from "./StepsSidebar";
import { StepEditor } from "./StepEditor";
import { useProductos } from "@/hooks/useProductos";

export function TemplateEditor({ editor }: any) {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const {productos, getProductos} = useProductos();


  const router = useRouter();

  const {
    template,

    loading,
    saving,

    // TEMPLATE
    updateTemplate,

    // STEPS
    addStep,
    removeStep,
    updateStep,

    // VARIANTS
    upsertVariant,
    removeVariant,

    // ASSETS
    uploadAsset,
    removeAsset,

    // PRODUCT OVERRIDES ASSETS
    uploadProductOverrideAsset,
    removeProductOverrideAsset,

    // SAVE
    save,
  } = editor;

  useEffect(() => {
    if(template.context === "PRODUCTO"){
      getProductos(100);
    }
  }, [template.context])
  // =====================================================
  // ACTIVE STEP
  // =====================================================

  const [activeStep, setActiveStep] =
    useState(1);

  const currentStep = useMemo(() => {

    return template.steps?.find(
      (s: any) => s.step === activeStep
    );

  }, [template.steps, activeStep]);

  // =====================================================
  // SAVE
  // =====================================================

  const handleSave = async () => {

    try {

      await save();

      toast.success(
        "Plantilla guardada correctamente"
      );

      router.push("/admin/templates");

    } catch (e) {

      console.error(e);

      toast.error(
        "Error al guardar plantilla"
      );
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (
      <div className="
        flex items-center justify-center
        gap-2 py-16
        text-sm text-gray-400
      ">
        <span className="
          w-4 h-4 rounded-full
          border-2 border-current
          border-t-transparent
          animate-spin
        " />

        {/*Cargando template...*/}
        Cargando plantilla...
      </div>
    );
  }

  // =====================================================
  // EMPTY
  // =====================================================

  if (!currentStep) {

    return (
      <div className="
        rounded-xl border border-dashed
        border-gray-200 dark:border-white/10
        py-20 text-center
      ">

        <p className="
          text-sm text-gray-500
        ">
          No hay mensajes disponibles
        </p>

        <button
          onClick={addStep}
          className="
            mt-4 h-10 px-5 rounded-lg
            bg-gray-900 text-white
            dark:bg-white dark:text-gray-900
            text-sm font-medium
          "
        >
          Crear primer mensaje
        </button>
      </div>
    );
  }

  // =====================================================
  // RENDER
  // =====================================================

  return (

    <div className="
      flex flex-col gap-6
    ">

      {/* =====================================================
          GENERAL
      ===================================================== */}

      <section className="
        rounded-xl
        border border-gray-200
        dark:border-white/10
        bg-white dark:bg-white/5
      ">

        <div className="
          px-5 py-3
          border-b border-gray-100
          dark:border-white/10
        ">

          <span className="
            text-xs uppercase tracking-wider
            text-gray-400
          ">
            Configuración general
          </span>
        </div>

        <div className="p-5">

          <TemplateHeader
            name={template.name}
            context={template.context}
            active={template.active}
            productos={productos}
            selectedProductId={selectedProductId}
            onSelectProduct={setSelectedProductId}
            onChange={updateTemplate}
          />

        </div>
      </section>

      {/* =====================================================
          AUTOMATION FLOW
      ===================================================== */}

      <section className="
        rounded-xl overflow-hidden
        border border-gray-200
        dark:border-white/10
        bg-white dark:bg-white/5
      ">

        {/* HEADER */}

        <div className="
          px-5 py-3
          border-b border-gray-100
          dark:border-white/10
          flex items-center justify-between
        ">

          <div>

            <p className="
              text-sm font-semibold text-gray-900 dark:text-white
            ">
              Secuencia automática
            </p>

            <p className="
              mt-1 text-xs leading-relaxed text-gray-500 dark:text-gray-400

            ">
              Configura el orden y tiempo de envío de cada mensaje
            </p>
          </div>

          {/*<div className="
            text-xs text-gray-400
          ">
            {template.steps?.length ?? 0} pasos
          </div>*/}

         <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/5">
          <div className="w-2 h-2 rounded-full bg-blue-500"/>
          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
           {
             (template.steps?.length ?? 0) === 1 ? "1 mensaje programado" : `${template.steps?.length ?? 0} mensajes programados`
           }
          </span>

         </div>
        </div>

        {/* BODY */}

        <div className="
          flex flex-col lg:flex-row flex-wrap
          min-h-[780px]
        ">

          {/* SIDEBAR */}

          <StepsSidebar

            steps={template.steps}

            activeStep={activeStep}

            onSelect={setActiveStep}

            onAdd={() => {

              addStep();

              setTimeout(() => {

                const next =
                  template.steps.length + 1;

                setActiveStep(next);

              }, 0);
            }}

            onRemove={(step: number) => {

              removeStep(step);

              if (activeStep === step) {
                setActiveStep(1);
              }
            }}
          />

          {/* EDITOR */}

          <div className="
            flex-1 p-5
            overflow-hidden
          ">

            <StepEditor

              onUploadProductOverride={
                uploadProductOverrideAsset
              }
              onRemoveProductOverrideAsset={
                removeProductOverrideAsset
              }

              step={currentStep}

              templateContext={
                template.context
              }

              // STEP

              onUpdateStep={updateStep}

              // VARIANTS

              onVariantChange={
                upsertVariant
              }

              onVariantRemove={
                removeVariant
              }

              // ASSETS

              onUpload={uploadAsset}

              onRemoveAsset={
                removeAsset
              }

              selectedProductId={
                selectedProductId
              }
            />

          </div>
        </div>

        {/* FOOTER */}

        <div className="
          flex justify-end
          px-5 py-4
          border-t border-gray-100
          dark:border-white/10
          bg-gray-50 dark:bg-white/5
        ">

          <button
            onClick={handleSave}
            disabled={saving}
            className="
              inline-flex items-center
              justify-center gap-2

              h-10 px-5 rounded-lg

              bg-gray-900 text-white
              hover:bg-gray-700

              dark:bg-white
              dark:text-gray-900
              dark:hover:bg-gray-100

              text-sm font-medium

              disabled:opacity-40
            "
          >

            {saving ? (
              <>
                <span className="
                  w-3.5 h-3.5 rounded-full
                  border-2 border-current
                  border-t-transparent
                  animate-spin
                " />

                Guardando...
              </>
            ) : (
              "Guardar cambios"
            )}

          </button>
        </div>
      </section>
    </div>
  );
}
