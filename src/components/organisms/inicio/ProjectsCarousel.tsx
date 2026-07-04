"use client";
import React, { useState } from "react";
import { imagenes } from "@/data/imagenes";
import { AnimatePresence, motion } from "framer-motion";
import CarouselDot from "@/components/atoms/CarouselDot";
import { useCarousel } from "@/hooks/ui/useCarousel";
import { projectsCarouselSlides as slides } from "@/data/inicio/projectsCarouselData";
import Link from "next/link";

const ProjectsCarousel: React.FC = () => {
  const { activeIndex, goTo } = useCarousel({
    total: slides.length,
    autoplay: false,
  });

  const [line, lineState] = useState(50)

  return (
    <section className="w-full bg-[#f0f0f0] pb-2">
      {/* Header Bar - Más compacto */}
      {/* HEADER */}
      <div className="relative w-full overflow-hidden">

        {/* Fondo SOLO del header */}
        <div className="absolute inset-0 bg-[#0a1a3a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a3a] via-[#0f2c5c] to-[#20838f]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#6DE1E3]/10 via-transparent to-[#22c55e]/10" />

        {/* Contenido */}
        <div className="relative flex flex-col sm:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-3 md:py-4 border-b border-white/10">

          <div className="text-left mb-2 sm:mb-0">
            <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-black tracking-tight uppercase">
              NUESTROS PROYECTOS
            </h2>
            <p className="text-white text-xs md:text-sm lg:text-base font-bold italic uppercase tracking-wider">
              CONVERTIMOS IDEAS EN EXPERIENCIAS REALES
            </p>
          </div>
          <Link
            href="/contacto"
            className=" text-white font-bold text-sm md:text-base lg:text-lg px-6 py-2 rounded-full bg-gradient-to-r from-[#6DE1E3] via-[#3ECAD0] to-[#0ea5b7] shadow-[0_8px_25px_rgba(109,225,227,0.3)] transition-all duration-300 hover:scale-105 uppercase tracking-wide whitespace-nowrap"
          >
            CONTÁCTANOS
          </Link>
        </div>
      </div>

      {/* Light Teal Separator Bar - Más delgada */}
      <div className="w-full h-px bg-gradient-to-r from-transparent  via-[#6DE1E3]/60 to-transparent my-6"></div>

      {/* Carousel Area - Altura ajustada */}
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-center items-center gap-4">
          <button 
            type="button"
            onClick={() => goTo(activeIndex === 0 ? slides.length - 1 : activeIndex - 1)}
            className="bg-white/80 hover:bg-white text-[#20838f] w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 backdrop-blur-sm"
            aria-label="Proyecto anterior"
          >
            <span className="text-2xl md:text-3xl font-black leading-none pb-1">‹</span>
          </button>

        {/* PROPUESTA CORREGIDA */}
        <div className="w-full relative rounded-sm shadow-2xl h-[350px] sm:h-[450px] md:h-[500px] lg:h-[550px]">
          <AnimatePresence initial={false}>
            {slides.map((slide, index) =>
              index === activeIndex ? (
                <motion.div
                key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={slide.after.src}
                    alt={slide.after.alt}
                    className="absolute w-full h-full object-cover"
                  />

                  <img
                    src={slide.before.src}
                    alt={slide.before.alt}
                    className="absolute w-full h-full object-cover"
                    style={{ clipPath: `polygon(0 0, ${line}% 0, ${line}% 100%, 0 100%)` }}
                  />
                </motion.div>
              ) : null
            )}
          </AnimatePresence>

          <div
            className="absolute top-0 bottom-0 w-1 bg-white z-10 pointer-events-none shadow-[0_0_10px_rgba(0,0,0,0.3)] flex items-center justify-center"
            style={{ left: `${line}%`, transform: 'translateX(-50%)' }}
          >
            <div className="w-8 h-8 bg-white flex shrink-0 items-center justify-center gap-1 rounded-full">
              <span className="text-[#20838f] text-xl font-black select-none flex items-center justify-center h-full lead-none">‹</span>
              <span className="text-[#20838f] text-xl font-black select-none flex items-center justify-center h-full lead-none">›</span>
            </div>
          </div>


          <input
            type="range"
            min={0}
            max={100}
            value={line}
            onChange={(e) => lineState(Number(e.target.value))}
            aria-label="Comparar antes y después del proyecto"
            className="absolute inset-0 z-20 w-full h-full opacity-0 cursor-ew-resize"
            />

          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-white text-[#20838f] font-black text-xs md:text-base lg:text-lg px-6 md:px-8 py-1 md:py-2 rounded-full shadow-lg uppercase tracking-widest z-10 pointer-events-none"
            style={{
              opacity: line < 25 ? line / 25 : 1
            }}>
            ANTES
          </div>
          <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-white text-[#20838f] font-black text-xs md:text-base lg:text-lg px-6 md:px-8 py-1 md:py-2 rounded-full shadow-lg uppercase tracking-widest z-10 pointer-events-none"
            style={{
              opacity: line > 75 ? (100 - line) / 25 : 1
            }}>
            AHORA
            </div>
          </div>
          <button 
            type="button"
            onClick={() => goTo(activeIndex === slides.length - 1 ? 0 : activeIndex + 1)}
            className="bg-white/80 hover:bg-white text-[#20838f] w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 backdrop-blur-sm"
            aria-label="Siguiente proyecto"
          >
            <span className="text-2xl md:text-3xl font-black leading-none pb-1">›</span>
          </button>
        </div>
        
        <div className="flex justify-center items-center pt-4 gap-2">
          {slides.map((_, idx) => (
            <CarouselDot
            key={idx}
            active={idx === activeIndex}
            onClick={() => goTo(idx)}
            index={idx}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectsCarousel;
