import { useConfirm } from "@/hooks/useConfirm";
import { formatDelay } from "@/utils/formatDelay";
import { Clock3, MessageSquareText, Plus, Trash2 } from "lucide-react";

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

const {confirm, ConfirmDialog} = useConfirm() 

  return (
    <div className="
      w-full lg:w-[300px]
      border-r border-gray-200 dark:border-white/10
      flex flex-col
    ">

      <div className="p-4 border-b border-gray-100 dark:border-white/10">
        <button
          onClick={onAdd}
          className="
            w-full h-10 rounded-2xl
            bg-gray-900 text-white
            dark:bg-white dark:text-gray-900
            text-sm font-semibold inline-flex items-center justify-center gap-2 hover:scale-[0.99] transition-transform
          "
        >
          <Plus size={16}/>
          Agregar mensaje
        </button>
      </div>

      <div className="flex flex-col p-2 gap-2">

        {steps.map((step, index) => {

          const active =
            step.step === activeStep;

          const isImmediate = step.delayValue === 0;

          return (
            <button
                         key={step.step}
                         onClick={() =>
                           onSelect(step.step)
                         }
                         className={`
                           group
                           relative

                           text-left

                           rounded-3xl
                           border

                           p-4

                           transition-all

                           ${active
                             ? `
                               border-blue-500
                               bg-blue-50

                               dark:bg-blue-500/10
                               dark:border-blue-400

                               shadow-sm
                             `
                             : `
                               border-gray-200
                               dark:border-white/10

                               bg-white
                               dark:bg-white/[0.02]

                               hover:bg-gray-50
                               dark:hover:bg-white/[0.04]
                             `
                           }
                         `}
                       >

                         {/* TOP */}

                         <div className="
                           flex items-start
                           justify-between
                           gap-3
                         ">

                           <div className="min-w-0">

                             <div className="
                               flex items-center gap-2
                             ">

                               <div className="
                                 w-9 h-9

                                 rounded-2xl

                                 bg-white
                                 dark:bg-white/10

                                 border border-gray-200
                                 dark:border-white/10

                                 flex items-center
                                 justify-center
                               ">

                                 <MessageSquareText
                                   size={16}
                                   className="
                                     text-gray-700
                                     dark:text-gray-200
                                   "
                                 />

                               </div>

                               <div>

                                 <p className="
                                   text-sm font-semibold

                                   text-gray-900
                                   dark:text-white
                                 ">
                                   Mensaje {index + 1}
                                 </p>

                                 <p className="
                                   text-xs

                                   text-gray-400
                                   dark:text-gray-500
                                 ">
                                   Automatización
                                 </p>

                               </div>

                             </div>

                             {/* DELAY */}

                             <div className="
                               mt-4

                               inline-flex items-center
                               gap-2

                               px-3 py-2

                               rounded-2xl

                               bg-gray-100
                               dark:bg-white/5
                             ">

                               <Clock3
                                 size={14}
                                 className="
                                   text-gray-500
                                   dark:text-gray-400
                                 "
                               />

                               <span className="
                                 text-xs font-medium

                                 text-gray-700
                                 dark:text-gray-300
                               ">

                                 {isImmediate
                                   ? "Envío inmediato"
                                   : `Después de ${formatDelay(
                                       step.delayValue,
                                       step.delayUnit
                                     )}`
                                 }

                               </span>

                             </div>

                           </div>

                           {/* DELETE */}

                           <button
                             onClick={async (e) => {
                              e.stopPropagation();
                              const confirmado = await confirm({
                                title: "Eliminar mensaje",
                                message: "¿Estás seguro de que quieres eliminar este mensaje?",
                              });
                              if (confirmado) {
                                onRemove(step.step);
                              }
                            }}
                             className="
                               opacity-100 lg:opacity-0 lg:group-hover:opacity-100

                               w-9 h-9

                               rounded-xl

                               border border-red-100
                               dark:border-red-500/20

                               bg-red-50
                               dark:bg-red-500/10

                               flex items-center
                               justify-center

                               text-red-500

                               transition-all
                             "
                           >

                             <Trash2 size={14} />

                           </button>

                         </div>

                       </button>
          );
        })}
      </div>
      <ConfirmDialog />
    </div>
  );
}
