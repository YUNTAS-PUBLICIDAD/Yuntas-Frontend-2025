"use client";

import Heading from "@/components/atoms/Heading";
import { imagenes } from "@/data/imagenes";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const frases = [
  "Tendencias sobre tecnología LED",
  "Consejos para tu iluminación",
  "Guías de instalación y uso",
  "Novedades en letreros LED"
];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % frases.length);
    }, 3000); 
    return () => clearInterval(timer);
  }, [frases.length]);

  return (
    <section
      className="
        relative w-full 
        h-[50vh] sm:h-[60vh] md:h-screen 
        flex items-center justify-start 
        overflow-hidden 
        border-b-8 border-[#98D8DF]
      "
      aria-label="Sección Blogs"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      >
        <img
          src={imagenes.blogs.hero.src}
          alt={imagenes.blogs.hero.alt || "Portada Blogs"}
          title={imagenes.blogs.hero.title}
          className="w-full h-full object-cover object-center"
        />
      </motion.div>


      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,3,30,0.3), rgba(0,3,30,0.7))",
        }}
      />

      {/* Contenedor de Textos */}
      <div className="absolute inset-0 z-20 w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center px-4 w-full">

          <Heading
            level="h1"
            size="2xl"
            className="
              mb-4 leading-tight 
              drop-shadow-[0_2px_2px_#28BEDA] 
              text-5xl sm:text-6xl md:text-7xl
              text-white
            "
          >
            BLOGS
          </Heading>

          {/* Carrusel de Frases*/}
          <div className="h-[40px] sm:h-[50px] relative w-full flex justify-center items-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={frases[index]}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="
                  absolute
                  text-white 
                  text-lg sm:text-2xl md:text-3xl 
                  font-light 
                  tracking-wide
                  drop-shadow-md
                "
              >
                {frases[index]}
              </motion.p>
            </AnimatePresence>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;