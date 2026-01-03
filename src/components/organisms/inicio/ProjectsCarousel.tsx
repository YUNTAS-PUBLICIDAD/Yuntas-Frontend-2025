"use client";
import React from "react";
import SectionImage from "@/components/atoms/SectionImage";
import { AnimatePresence, motion } from "framer-motion";
import CarouselDot from "@/components/atoms/CarouselDot";
import ProjectsTitleBox from "@/components/molecules/ProjectsTitleBox";
import { useCarousel } from "@/hooks/ui/useCarousel";
import { projectsCarouselSlides as slides } from "@/data/inicio/projectsCarouselData";

const ProjectsCarousel: React.FC = () => {
  const { activeIndex, goTo } = useCarousel({ total: slides.length, autoplay: true, interval: 4000 });

  return (
    <section className="relative w-full h-[500px] md:h-[650px] bg-gray-100 flex items-center justify-center overflow-hidden">
      <div className="absolute top-0 right-0 z-30">
        <ProjectsTitleBox />
      </div>
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence mode="sync">
          {slides.map((slide, idx) =>
            idx === activeIndex ? (
              <motion.div
                key={idx}
                initial={{ x: "100vw" }}
                animate={{ x: 0 }}
                exit={{ x: "-100vw" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-full h-full"
                style={{ zIndex: 20 }}
              >
                <SectionImage
                  src={slide.src}
                  alt={slide.alt}
                  className="object-cover shadow-xl w-full h-full"
                />
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>
      {/* Puntos de navegación */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center z-20">
        {slides.map((_, idx) => (
          <CarouselDot key={idx} active={idx === activeIndex} onClick={() => goTo(idx)} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsCarousel;
