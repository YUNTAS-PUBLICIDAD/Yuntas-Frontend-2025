import React from "react";
import Link from "next/link";
import SectionImage from "@/components/atoms/SectionImage";
import { imagenes } from "@/data/imagenes";
import { ROUTES } from "@/config/routes";

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

const CustomInfoCard = ({ text, icon: Icon, href, }: { text: string; icon: React.ComponentType; href?: string; }) => {
  const content = (
    <div className="group relative flex w-full max-w-3xl flex-row items-center gap-0">
      <div className="absolute -inset-1 rounded-3xl sm:rounded-full bg-gradient-to-r from-[#6DE1E3]/20 via-transparent to-[#0ea5b7]/20 blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Círculo del icono */}
      <div className="flex-shrink-0 relative z-10 w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center bg-gradient-to-br from-[#D8F8FB] via-[#BDEEF5] to-[#8DDBE6] border border-white/80 shadow-[0_12px_30px_rgba(13,110,119,0.18)] transition-transform duration-300 group-hover:-translate-y-0.5">
        <Icon />
      </div>

      {/* Texto */}
      <div className="relative w-full overflow-hidden -ml-4 sm:-ml-6 lg:-ml-8 pl-4 sm:pl-10 lg:pl-12 pr-3 sm:pr-6 lg:pr-8 py-2 sm:py-3 md:py-4 rounded-full flex-grow min-h-14 sm:min-h-16 md:min-h-[5rem] flex items-center border border-[#8EDCE5]/70 bg-gradient-to-r from-[#F2FCFD] via-[#E8FAFC] to-[#DFF6FA] shadow-[0_10px_24px_rgba(14,82,95,0.10)] transition-all duration-300 group-hover:shadow-[0_14px_30px_rgba(14,82,95,0.16)]">
        <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-[#24A8B8] to-[#0E7B8A]" />
        <p className="text-[#12424A] font-semibold text-xs sm:text-sm md:text-base lg:text-lg leading-snug pr-1">
          {text}
        </p>
      </div>
    </div>
  );  

  return href ? <Link href={href}>{content}</Link> : content;
};

const InnovacionSection: React.FC = () => {
  return (
    <section className="w-full py-16 px-4 md:px-8 lg:px-12 bg-white">
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">

        {/* ── COLUMNA IZQUIERDA ── */}
        <div className="flex flex-col items-center gap-6 w-full lg:w-1/2">
          <Link
            href={ROUTES.PRODUCTOS.BARRA_PIXEL_LED}
            className="relative w-full rounded-3xl overflow-hidden shadow-lg group block"
          >
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
          </Link>

          <CustomInfoCard
            icon={EyeIcon}
            text="Descubre cómo integrar esta innovadora tecnología en tus proyectos arquitectónicos"
            href={ROUTES.PRODUCTOS.LETRERO_NEON_LED}
          />
        </div>

        {/* ── COLUMNA DERECHA ── */}
        <div className="flex flex-col items-center gap-6 w-full lg:w-1/2">
          <Link
            href={ROUTES.PRODUCTOS.LETRERO_NEON_LED}
            className="relative w-full rounded-3xl overflow-hidden shadow-lg group block"
          >
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
          </Link>

          <CustomInfoCard
            icon={SearchIcon}
            text="Aprende cómo esta tecnología transforma el ambiente y optimiza el consumo energético"
            href={ROUTES.PRODUCTOS.LETRERO_NEON_LED}
          />
        </div>

      </div>
    </section>
  );
};

export default InnovacionSection;