import React from "react";
import Text from "@/components/atoms/Text";
import { imagenes } from "@/data/imagenes";

const NegocioSection: React.FC = () => {
  return (
    <section className="w-full">
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-[#0a1a3a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a3a] via-[#0f2c5c] to-[#20838f]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#6DE1E3]/10 via-transparent to-[#22c55e]/10" />

        <div className="relative flex items-center justify-center px-6 md:px-12 lg:px-20 py-3 md:py-4 border-b border-white/10 text-center">
          <Text
            variant="h2"
            className="text-white text-2xl md:text-3xl lg:text-4xl font-black tracking-tight uppercase"
          >
            TU SOCIO PARA PERSONALIZAR
            <br />
            TU NEGOCIO
          </Text>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="w-full bg-white py-12 md:py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* IMAGEN */}
          <div className="flex justify-center lg:justify-start">
            <img
              src={imagenes.nosotros.detalle.src}
              alt={imagenes.nosotros.detalle.alt}
              title={imagenes.nosotros.detalle.title}
              className="w-full max-w-xl rounded-[2.5rem] shadow-lg object-cover h-[420px]"
            />
          </div>

          {/* TEXTO CON <Text> */}
          <div className="flex flex-col justify-center items-center text-center px-4 lg:w-[90%] mx-auto">
            <Text
              variant="caption"
              color="black"
              className="text-lg md:text-xl leading-snug text-gray-900"
            >
              En Yuntas Producciones{" "}
              <span className="font-extrabold">transformamos</span>
              <br />
              <span className="font-extrabold">
                espacios con soluciones tecnológicas
              </span>
              <br />
              <span className="font-extrabold">innovadoras</span> en iluminación y diseño,
              <br />
              ofreciendo calidad y vanguardia{" "}
              <span className="font-extrabold">para</span>
              <br />
              <span className="font-extrabold">crear experiencias inolvidables</span>
            </Text>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NegocioSection;