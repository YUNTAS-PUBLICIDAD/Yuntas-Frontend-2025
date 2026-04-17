"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import CarouselDot from "@/components/atoms/CarouselDot";
import { useCarousel } from "@/hooks/ui/useCarousel";
import { projectsCarouselSlides as slides } from "@/data/inicio/projectsCarouselData";
import Link from "next/link";

const ProjectsCarousel: React.FC = () => {
  const { activeIndex, goTo } = useCarousel({
    total: slides.length,
    autoplay: true,
    interval: 5000,
  });

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
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full overflow-hidden shadow-2xl rounded-sm bg-white">
          <div className="relative w-full h-[350px] sm:h-[450px] md:h-[500px] lg:h-[550px]">
            <AnimatePresence initial={false}>
              {slides.map((slide, idx) =>
                idx === activeIndex ? (
                  <motion.div
                    key={idx}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <div className="flex flex-col md:flex-row w-full h-full">
                      {/* ANTES */}
                      <div className="relative w-full h-1/2 md:h-full md:w-1/2 overflow-hidden border-b md:border-b-0 md:border-r border-white">
                        <img
                          src={slide.before.src}
                          alt={slide.before.alt}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-white text-[#20838f] font-black text-xs md:text-base lg:text-lg px-6 md:px-8 py-1 md:py-2 rounded-full shadow-lg uppercase tracking-widest z-10">
                          ANTES
                        </div>
                      </div>

                      {/* AHORA */}
                      <div className="relative w-full h-1/2 md:h-full md:w-1/2 overflow-hidden">
                        <img
                          src={slide.after.src}
                          alt={slide.after.alt}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-white text-[#20838f] font-black text-xs md:text-base lg:text-lg px-6 md:px-8 py-1 md:py-2 rounded-full shadow-lg uppercase tracking-widest z-10">
                          AHORA
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Dots - Padding reducido */}
        <div className="flex justify-center items-center py-4 gap-1">
          {slides.map((_, idx) => (
            <CarouselDot
              key={idx}
              active={idx === activeIndex}
              onClick={() => goTo(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsCarousel;
