import React from "react";
import Text from "@/components/atoms/Text";
import { imagenes } from "@/data/imagenes";

const NegocioSection: React.FC = () => {
  return (
    <section className="w-full">
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-[#0a1a3a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a3a] via-[#0f2c5c] to-[#20838f]" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/10 via-transparent to-[#22c55e]/10" />
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="w-full bg-white py-12 md:py-20 px-6 md:px-16">
  <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* IMAGEN */}
           <div className="relative flex justify-center">

            <img
              src={imagenes.nosotros.detalle.src}
              alt={imagenes.nosotros.detalle.alt}
              title={imagenes.nosotros.detalle.title}
              className="relative w-full max-w-xl h-[320px] object-cover rounded-3xl "
            />
          </div>

          {/* TEXTO CON <Text> */}
           <div className="bg-white border-2 border-brand-blue rounded-3xl p-10 text-center shadow-[8px_8px_4px_#203565] relative ">

              <Text variant="caption" color="black" className="text-base md:text-lg leading-8 text-brand-blue"
      >            En Yuntas Producciones{" "}
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

            <div className="absolute -bottom-10 -right-10 w-28 h-28 rounded-full bg-brand-cyan opacity-30">
      </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default NegocioSection;