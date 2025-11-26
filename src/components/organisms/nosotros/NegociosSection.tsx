import React from "react";
import Text from "@/components/atoms/Text";
import negocioImagen from "@/assets/nosotros/negocioImagen.webp";

const NegocioSection: React.FC = () => {
  return (
    <section className="w-full border-b-8 border-[#98D8DF]">
      {/* ENCABEZADO CELESTE */}
      <div className="w-full bg-[#23C1DE] py-6 px-6 md:px-16 text-center">
        <Text
          variant="caption"
          className="text-white font-bold text-2xl md:text-4xl"
        >
          <span className="font-semibold">TU SOCIO PARA PERSONALIZAR</span>
          <br />
          TU NEGOCIO
        </Text>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="w-full bg-white py-12 md:py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* IMAGEN */}
          <div className="flex justify-center lg:justify-start">
            <img
              src={negocioImagen.src}
              alt="Equipo de trabajo en Yuntas"
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
