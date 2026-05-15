import { formatDelay } from "@/utils/formatDelay";

type Props = {
  steps: any[];
  activeStep: number;

  onSelect: (step: number) => void;

  onAdd: () => void;

  onRemove: (step: number) => void;
};

export function StepsSidebar({
  steps,
  activeStep,
  onSelect,
  onAdd,
  onRemove,
}: Props) {


  return (
    <div className="
      w-full lg:w-[260px]
      border-r border-gray-200 dark:border-white/10
      flex flex-col
    ">

      <div className="p-4 border-b border-gray-100 dark:border-white/10">
        {/*<div className="mb-4">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            Secuencia de mensajes
          </p>
          <p className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
            Define el orden y tiempo de envío de cada mensaje automático
          </p>
        </div>*/}
        <button
          onClick={onAdd}
          className="
            w-full h-10 rounded-lg
            bg-gray-900 text-white
            dark:bg-white dark:text-gray-900
            text-sm font-medium hover:opacity-90 transition-opacity
          "
        >
          Agregar mensaje
        </button>
      </div>

      <div className="flex flex-col p-2 gap-2">

        {steps.map((step, index) => {

          const active =
            step.step === activeStep;

          return (
            <button
                          key={step.step}
                          onClick={() =>
                            onSelect(step.step)
                          }
                          className={`
                            group

                            text-left

                            rounded-2xl
                            border
                            p-4

                            transition-all

                            ${active
                              ? `
                                border-blue-500
                                bg-blue-50

                                dark:bg-blue-500/10
                                dark:border-blue-400
                              `
                              : `
                                border-gray-200
                                dark:border-white/10

                                hover:bg-gray-50
                                dark:hover:bg-white/5
                              `
                            }
                          `}
                        >

                          <div
                            className="
                              flex items-start
                              justify-between
                              gap-3
                            "
                          >

                            <div className="min-w-0">

                              <p
                                className="
                                  text-sm font-semibold
                                  text-gray-900 dark:text-white
                                "
                              >
                                Mensaje {index + 1}
                              </p>

                              <p
                                className="
                                  mt-1

                                  text-xs leading-relaxed

                                  text-gray-500
                                  dark:text-gray-400
                                "
                              >
                                {step.delayValue === 0
                                  ? "Se enviará inmediatamente"
                                  : `Se enviará después de ${formatDelay(
                                      step.delayValue,
                                      step.delayUnit
                                    )}`
                                }
                              </p>

                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onRemove(step.step);
                              }}
                              className="
                                opacity-0
                                group-hover:opacity-100

                                text-xs font-medium
                                text-red-500

                                transition-opacity
                              "
                            >
                              Eliminar
                            </button>

                          </div>

                        </button>
          );
        })}
      </div>
    </div>
  );
}
