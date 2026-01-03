import React from "react";
import Text from "@/components/atoms/Text";
import { LuTelescope } from "react-icons/lu";
import { TbTargetArrow } from "react-icons/tb";

const VisionMision: React.FC = () => {
  return (
    <section className="w-full">
      {/* CONTENIDO PRINCIPAL */}
      <div className="w-full bg-white py-12 md:py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* ===== TARJETA MISIÓN ===== */}
          <div className="w-full bg-[#E6F7F9] p-6 flex flex-col items-center justify-center rounded-3xl min-h-96">
            {/* Ícono */}
            <div className="bg-[#203565] rounded-full p-6 mb-3">
              <TbTargetArrow className="text-white size-14" />
            </div>

            <Text
              variant="caption"
              color="black"
              className="text-lg md:text-xl leading-snug text-gray-900 max-w-[380px] text-center"
            >
              <span className="font-extrabold">MISIÓN</span>
              <br />
              <br />
              <br />
              Transformar espacios y generar{" "}
              <span className="font-extrabold">
                experiencias inolvidables
              </span>{" "}
              mediante productos de servicios de iluminación y{" "}
              <span className="font-extrabold">diseños innovadores,</span>{" "}
              superando expectativas y satisfacción a los clientes.
            </Text>
          </div>

          {/* ===== TARJETA VISIÓN ===== */}
          <div className="w-full bg-[#E6F7F9] p-6 flex flex-col items-center justify-center rounded-3xl min-h-96">
            {/* Ícono */}
            <div className="bg-[#203565] rounded-full p-6 mb-3">
              <LuTelescope className="text-white size-14" />
            </div>

            <Text
              variant="caption"
              color="black"
              className="text-lg md:text-xl leading-snug text-gray-900 max-w-[380px] text-center"
            >
              <span className="font-extrabold">VISIÓN</span>
              <br />
              <br />
              Ser reconocidos como líderes en{" "}
              <span className="font-extrabold">
                soluciones tecnológicas
              </span>{" "}
              para iluminación y diseño en el mercado nacional peruano,
              impulsando la{" "}
              <span className="font-extrabold">innovación constante</span> y
              creando un impacto positivo en la comunidad local.
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMision;
