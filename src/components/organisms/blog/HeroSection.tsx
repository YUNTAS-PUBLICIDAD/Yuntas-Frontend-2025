"use client";

import { imagenes } from "@/data/imagenes";
// import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
// import { FaSearch } from "react-icons/fa";

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
    <>
      {/* Top Image Section - Height reduced */}
      <section
        className="
          relative w-full
          h-screen
          flex items-center justify-center
          overflow-hidden
        "
        aria-label="Imagen de portada Blog"
      >
        <div className="absolute inset-0 scale-110 animate-slowZoom">
        {/*<motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >*/}
          {/*<img
            src={imagenes.blogs.hero.src}
            alt={imagenes.blogs.hero.alt || "Portada Blog"}
            title={imagenes.blogs.hero.title}
            className="w-full h-full object-cover object-center"
          />*/}
          <Image src={imagenes.blogs.hero.src}
          alt={imagenes.blogs.hero.alt || "Portada Blog"}
          fill
          priority
          quality={75}
          sizes="100vw"
          className="object-cover object-center"
          />
        {/*</motion.div>*/}
      </div>

        {/* Overlay */}
        <div className="absolute inset-0 z-10">
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a3a]/90 via-[#04061a]/70 to-transparent" />
        </div>

        {/* Blog Title & Phrases */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-4">
          <h1 className="drop-shadow-[0_2px_2px_#28BEDA] text-white text-4xl sm:text-4xl md:text-[56px] font-bold tracking-widest drop-shadow-2xl mb-2">
            BLOG
          </h1>

          {/* Carrusel de Frases */}
          <div className="h-[60px] sm:h-[100px] mt-6 relative w-full flex justify-center items-center">
            {/*<AnimatePresence mode="wait">
              <motion.p
                key={frases[index]}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="
                    absolute
                    text-white
                    text-base sm:text-xl md:text-2xl
                    font-light
                    tracking-wide
                    drop-shadow-lg
                  "
              >
                {frases[index]}
              </motion.p>
            </AnimatePresence>*/}
            {
              frases.map((frase, i) => (
               <p key={i} className={`absolute whitespace-nowrap text-center text-white text-lg sm:text-2x1 md:text-4xl font-medium tracking-wide drop-shadow-lg transition-all duration-500 ease-in-out ${
               i === index ? "opacity-100 translate-y-0": "opacity-0 translate-y-4" }`}>{frase}</p>
              ))
            }
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
