"use client";

import { imagenes } from "@/data/imagenes";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

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
          h-[40vh] md:h-[50vh]
          flex items-center justify-center 
          overflow-hidden 
          border-b-4 border-[#98D8DF]
        "
        aria-label="Imagen de portada Blog"
      >
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <img
            src={imagenes.blogs.hero.src}
            alt={imagenes.blogs.hero.alt || "Portada Blog"}
            title={imagenes.blogs.hero.title}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* Overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: "rgba(0,0,0,0.3)",
          }}
        />

        {/* Blog Title & Phrases */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-6xl md:text-8xl font-black tracking-widest drop-shadow-2xl mb-2">
            BLOG
          </h1>

          {/* Carrusel de Frases */}
          <div className="h-[30px] sm:h-[40px] relative w-full flex justify-center items-center overflow-hidden">
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
                    text-base sm:text-xl md:text-2xl 
                    font-light 
                    tracking-wide
                    drop-shadow-lg
                  "
              >
                {frases[index]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Search Bar - Teal Section */}
      <div className="w-full bg-[#0b6e82] py-8 md:py-12 px-6 md:px-20 lg:px-44 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
        {/* Text Area */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-white text-2xl md:text-4xl font-bold leading-tight">
            Descubre más sobre nuestros Productos
          </h2>
        </div>

        {/* Search Input Area */}
        <div className="w-full md:w-1/2 flex items-center bg-white rounded-full p-1 shadow-lg max-w-lg">
          <input
            type="text"
            placeholder="Buscar Artículos..."
            className="flex-grow bg-transparent px-6 py-2 md:py-3 outline-none text-[#203565] text-lg font-medium placeholder:text-gray-400"
          />
          <button
            className="bg-[#203565] text-white p-3 md:p-4 rounded-full hover:bg-[#162E4D] transition-colors"
            aria-label="Buscar"
          >
            <FaSearch className="text-xl md:text-2xl" />
          </button>
        </div>
      </div>
    </>
  );
};

export default HeroSection;