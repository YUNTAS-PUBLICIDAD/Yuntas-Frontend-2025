import { VariantsPanel } from "./VariantsPanel";

type Props = {
  step: any;

  templateContext: string;

  selectedProductId?: number | null;

  onUpdateStep: any;

  onVariantChange: any;

  onVariantRemove: any;

  onUploadProductOverride: any;
  onRemoveProductOverrideAsset: any;

  onUpload: any;

  onRemoveAsset: any;
};

export function StepEditor({
  step,
  templateContext,
  selectedProductId,
  onUpdateStep,
  onVariantChange,
  onVariantRemove,
  onUploadProductOverride,
  onRemoveProductOverrideAsset,
  onUpload,
  onRemoveAsset,
}: Props) {

  return (

    <div className="
      flex flex-col gap-5
    ">

      {/* STEP CONFIG */}
      {/* CONFIG */}

           <section
             className="
               rounded-2xl

               border border-gray-200
               dark:border-white/10

               bg-white
               dark:bg-white/[0.03]

               p-5
             "
           >

             {/* HEADER */}

             <div className="mb-5">

               <p
                 className="
                   text-sm font-semibold
                   text-gray-900 dark:text-white
                 "
               >
                 Configuración del envío
               </p>

               <p
                 className="
                   mt-1

                   text-xs leading-relaxed

                   text-gray-500
                   dark:text-gray-400
                 "
               >
                 Define cuánto tiempo esperar
                 antes de enviar este mensaje
               </p>

             </div>

             {/* FORM */}

             <div
               className="
                 grid grid-cols-1
                 md:grid-cols-2
                 gap-4
               "
             >

               {/* TIME */}

               <div>

                 <label
                   className="
                     block

                     text-xs font-medium

                     text-gray-700
                     dark:text-gray-300

                     mb-2
                   "
                 >
                   Tiempo de espera
                 </label>

                 <input
                   type="number"
                   min={0}
                   value={step.delayValue}
                   onChange={(e) =>
                     onUpdateStep(step.step, {
                       delayValue:
                         Number(e.target.value),
                     })
                   }
                   className="
                     w-full h-11

                     rounded-xl

                     border border-gray-200
                     dark:border-white/10

                     bg-white
                     dark:bg-white/5

                     px-3

                     text-sm

                     outline-none

                     focus:border-blue-500
                   "
                 />

               </div>

               {/* UNIT */}

               <div>

                 <label
                   className="
                     block

                     text-xs font-medium

                     text-gray-700
                     dark:text-gray-300

                     mb-2
                   "
                 >
                   Periodo de espera
                 </label>

                 <select
                   value={step.delayUnit}
                   onChange={(e) =>
                     onUpdateStep(step.step, {
                       delayUnit:
                         e.target.value,
                     })
                   }
                   className="
                     w-full h-11

                     rounded-xl

                     border border-gray-200
                     dark:border-white/10

                     bg-white
                     dark:bg-white/5

                     px-3

                     text-sm

                     outline-none

                     focus:border-blue-500
                   "
                 >
                   <option value="minutes">
                     Minutos
                   </option>

                   <option value="hours">
                     Horas
                   </option>

                   <option value="days">
                     Días
                   </option>

                 </select>

               </div>

             </div>

           </section>

      {/* VARIANTS */}

      <VariantsPanel
        variants={step.variants}
        step={step.step}
        templateContext={templateContext}
        onUploadProductOverride={onUploadProductOverride}
        onRemoveProductOverrideAsset={onRemoveProductOverrideAsset}
        selectedProductId={selectedProductId}
        onChange={onVariantChange}
        onRemove={onVariantRemove}
        onUpload={onUpload}
        onRemoveAsset={onRemoveAsset}
      />

    </div>
  );
}
