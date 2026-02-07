import React from "react";
import InfoCard from "@/components/molecules/InfoCard";
import SectionImage from "@/components/atoms/SectionImage";
import { imagenes } from "@/data/imagenes";

const InnovacionSection: React.FC = () => {
  return (
    <section className="w-full py-12 px-4 md:px-0 bg-white">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Bloque 1: InfoCard arriba, Imagen abajo */}
        <div className="flex flex-col items-center gap-8 md:w-1/2">
          <InfoCard text="Descubre cómo integrar esta innovadora tecnología en tus proyectos arquitectónicos" className="max-w-2xl w-full py-12 px-10 text-2xl font-bold" />
          <div className="w-full flex justify-start">
              <SectionImage src={imagenes.inicio.detalle2.src} alt={imagenes.inicio.detalle2.alt} className="max-w-[56rem] w-full rounded-tr-3xl rounded-br-3xl" />
          </div>
        </div>
        {/* Bloque 2: Imagen arriba, InfoCard abajo */}
        <div className="flex flex-col items-center gap-8 md:w-1/2">
          <div className="w-full flex justify-end">
              <SectionImage src={imagenes.inicio.detalle1.src} alt={imagenes.inicio.detalle1.alt} className="max-w-[56rem] w-full rounded-tl-3xl rounded-bl-3xl" />
          </div>
          <InfoCard text="Aprende cómo esta tecnología transforma el ambiente y optimiza el consumo energético" className="max-w-2xl w-full py-12 px-10 text-2xl font-bold" />
        </div>
      </div>
    </section>
  );
};

export default InnovacionSection;
