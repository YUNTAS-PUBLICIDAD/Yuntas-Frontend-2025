import React from "react";
import Text from "@/components/atoms/Text";
import { LuTelescope } from "react-icons/lu";
import { TbTargetArrow } from "react-icons/tb";

const VisionMision: React.FC = () => {
  return (
    <section className="w-full">
      {/* CONTENIDO PRINCIPAL */}
      <div className="w-full bg-white py-12 md:py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* ===== TARJETA MISIÓN ===== */}
          <div className="w-full bg-[#F3FBFD] border-2 border-[#203565] rounded-3xl shadow-[8px_8px_4px_#203565] p-8 flex flex-col items-center justify-center min-h-[380px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[12px_12px_6px_#203565]">
            {/* Ícono */}
            <div className="bg-[#203565] rounded-full p-5 mb-6 shadow-lg">
            <TbTargetArrow className="text-white size-12 transition-transform duration-300 group-hover:scale-110" />
          </div>

          <h3 className="text-3xl font-extrabold text-[#203565] mb-6">
            MISIÓN
          </h3>

          <Text
            variant="caption"
            color="black"
            className="text-base md:text-lg leading-8 text-gray-700 max-w-[380px]"
          >
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
          <div className="w-full bg-[#F3FBFD] border-2 border-[#203565] rounded-3xl shadow-[8px_8px_4px_#203565] p-8 flex flex-col items-center justify-center min-h-[380px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[12px_12px_6px_#203565]">
            {/* Ícono */}
           <div className="bg-[#203565] rounded-full p-5 mb-6 shadow-lg">
            <LuTelescope className="text-white size-12 transition-transform duration-300 group-hover:scale-110" />
          </div>

          <h3 className="text-3xl font-extrabold text-[#203565] mb-6">
            VISIÓN
          </h3>

          <Text
            variant="caption"
            color="black"
            className="text-base md:text-lg leading-8 text-gray-700 max-w-[380px]"
          >
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
