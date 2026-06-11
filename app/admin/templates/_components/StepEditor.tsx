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

               {/* FIRST MESSAGE */}

                {step.step === 1 ? (

                  <div
                    className="
                      md:col-span-2

                      rounded-2xl

                      border border-green-200
                      dark:border-green-500/20

                      bg-green-50
                      dark:bg-green-500/10

                      px-4 py-4
                    "
                  >

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          w-10 h-10 rounded-xl

                          bg-green-100
                          dark:bg-green-500/20

                          flex items-center justify-center
                        "
                      >
                        ⚡
                      </div>

                      <div>

                        <p
                          className="
                            text-sm font-semibold

                            text-green-800
                            dark:text-green-300
                          "
                        >
                          Envío inmediato
                        </p>

                        <p
                          className="
                            mt-1 text-xs

                            text-green-700/80
                            dark:text-green-400
                          "
                        >
                          Este primer mensaje se enviará automáticamente
                          apenas el cliente se registre en el popup.
                        </p>

                      </div>

                    </div>

                  </div>

                ) : (

                  <>
                    {/* TIME */}

                    <div>

                      <label
                        className="
                          block mb-2

                          text-xs font-medium

                          text-gray-700
                          dark:text-gray-300
                        "
                      >
                        Tiempo de espera
                      </label>

                      <div
                        className="
                          h-12 rounded-2xl

                          border border-gray-200
                          dark:border-white/10

                          bg-white
                          dark:bg-white/[0.03]

                          flex items-center
                          overflow-hidden
                        "
                      >

                        <button
                          type="button"
                          onClick={() =>
                            onUpdateStep(step.step, {
                              delayValue: Math.max(
                                1,
                                step.delayValue - 1
                              ),
                            })
                          }
                          className="
                            w-12 h-full

                            text-lg font-medium

                            border-r border-gray-200
                            dark:border-white/10

                            hover:bg-gray-50
                            dark:hover:bg-white/5
                            dark:text-white/80

                            transition-colors
                          "
                        >
                          −
                        </button>

                        <input
                          type="number"
                          value={step.delayValue}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 1;
                            onUpdateStep(step.step, {
                              delayValue: Math.max(1, value),
                            });
                          }}
                          min="1"
                          className="
                            w-12 h-full
                            flex-1

                            text-center

                            text-base md:text-lg
                            font-semibold

                            bg-transparent
                            text-gray-900
                            dark:text-white

                            border-0 outline-none

                            [&::-webkit-inner-spin-button]:appearance-none
                          "
                        />

                        <button
                          type="button"
                          onClick={() =>
                            onUpdateStep(step.step, {
                              delayValue:
                                step.delayValue + 1,
                            })
                          }
                          className="
                            w-12 h-full

                            text-lg font-medium

                            border-l border-gray-200
                            dark:border-white/10

                            hover:bg-gray-50
                            dark:hover:bg-white/5
                            dark:text-white/80

                            transition-colors
                          "
                        >
                          +
                        </button>

                      </div>

                    </div>

                    {/* UNIT */}

                    <div>

                      <label
                        className="
                          block mb-2

                          text-xs font-medium

                          text-gray-700
                          dark:text-gray-300
                        "
                      >
                        Periodo
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
                          w-full h-12

                          rounded-2xl

                          border border-gray-200
                          bg-white
                          
                          dark:border-gray-600
                          dark:bg-[#2E3455]
                          dark:text-white

                          px-4

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

                    {/* SUMMARY */}

                    <div
                      className="
                        md:col-span-2

                        rounded-xl

                        bg-gray-50
                        dark:bg-white/[0.03]

                        border border-gray-100
                        dark:border-white/10

                        px-4 py-3
                      "
                    >

                      <p
                        className="
                          text-xs leading-relaxed

                          text-gray-500
                          dark:text-gray-400
                        "
                      >
                        El cliente recibirá este mensaje{" "}

                        <span
                          className="
                            font-semibold

                            text-gray-800
                            dark:text-white
                          "
                        >
                          {step.delayValue}{" "}

                          {step.delayUnit === "minutes"
                            ? step.delayValue === 1
                              ? "minuto"
                              : "minutos"
                            : step.delayUnit === "hours"
                            ? step.delayValue === 1
                              ? "hora"
                              : "horas"
                            : step.delayValue === 1
                            ? "día"
                            : "días"}
                        </span>

                        {" "}después del mensaje anterior.
                      </p>

                    </div>
                  </>
                )}

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
