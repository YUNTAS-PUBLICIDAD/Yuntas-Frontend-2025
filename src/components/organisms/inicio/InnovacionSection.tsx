import React from "react";
import SectionImage from "@/components/atoms/SectionImage";
import { imagenes } from "@/data/imagenes";

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#006D77" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#006D77" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const ChevronRightCircle = () => (
  <div className="bg-white w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  </div>
);

const ChevronLeftCircle = () => (
  <div className="bg-white w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6"/>
    </svg>
  </div>
);

const CustomInfoCard = ({ text, icon: Icon }: { text: string; icon: any }) => {
  return (
    <div className="flex items-center w-full max-w-3xl">
      {/* Círculo del icono */}
      <div className="flex-shrink-0 relative z-10 bg-[#B2EBF2] w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-md">
        <Icon />
      </div>

      {/* Texto */}
      <div className="bg-[#E0F7FA] -ml-7 md:-ml-8 pl-10 md:pl-12 pr-5 md:pr-8 py-3 md:py-4 rounded-r-full flex-grow min-h-16 md:h-20 flex items-center">
        <p className="text-gray-800 font-semibold text-sm md:text-lg leading-tight">
          {text}
        </p>
      </div>
    </div>
  );
};

const InnovacionSection: React.FC = () => {
  return (
    <section className="w-full py-16 px-4 md:px-8 lg:px-12 bg-white">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row gap-8 lg:gap-16 items-start">

        {/* ── COLUMNA IZQUIERDA ── */}
        <div className="flex flex-col items-center gap-6 w-full md:w-1/2">
          <div className="relative w-full rounded-3xl overflow-hidden shadow-lg group">
            <div className="absolute top-8 left-0 z-10 bg-black text-white py-2 px-5 rounded-r-full flex items-center gap-3 font-bold text-sm tracking-wide shadow-xl">
              <ChevronRightCircle />
              <span className="mt-0.5">BARRAS DE PIXCEL</span>
            </div>
            <div className="relative w-full aspect-[3/2]">
              <SectionImage
                src={imagenes.inicio.detalle1.src}
                alt={imagenes.inicio.detalle1.alt}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <CustomInfoCard
            icon={EyeIcon}
            text="Descubre cómo integrar esta innovadora tecnología en tus proyectos arquitectónicos"
          />
        </div>

        {/* ── COLUMNA DERECHA ── */}
        <div className="flex flex-col items-center gap-6 w-full md:w-1/2">
          <div className="relative w-full rounded-3xl overflow-hidden shadow-lg group">
            <div className="absolute top-8 right-0 z-10 bg-black text-white py-2 px-5 rounded-l-full flex items-center gap-3 font-bold text-sm tracking-wide shadow-xl">
              <span className="mt-0.5">LETREROS NEÓN</span>
              <ChevronLeftCircle />
            </div>
            <div className="relative w-full aspect-[3/2]">
              <SectionImage
                src={imagenes.inicio.detalle2.src}
                alt={imagenes.inicio.detalle2.alt}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <CustomInfoCard
            icon={SearchIcon}
            text="Aprende cómo esta tecnología transforma el ambiente y optimiza el consumo energético"
          />
        </div>

      </div>
    </section>
  );
};

export default InnovacionSection;