"use client";

import Heading from "@/components/atoms/Heading";
import { imagenes } from "@/data/imagenes";
import { motion } from "framer-motion";

const NosotrosSection = () => {
  return (
    <section
      className="
        relative w-full h-[80vh] md:h-screen 
        flex items-center justify-start 
        pt-24 md:pt-24 overflow-hidden 
        border-b-8 border-[#98D8DF]
      "
      aria-label="Sección Nosotros"
    >

      <motion.div
        className="absolute inset-0 bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: `url(${imagenes.nosotros.hero.src})` }}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      />

      {imagenes.nosotros.hero.alt && (
        <img
          src={imagenes.nosotros.hero.src}
          alt={imagenes.nosotros.hero.alt}
          title={imagenes.nosotros.hero.title}
          className="sr-only"
          aria-hidden="false"
        />
      )}

      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,3,30,0.2), rgba(0,3,30,0.5))",
        }}
      />

      <div className="relative z-20 w-full h-full flex items-center pb-16 md:pb-20">
        <div
          className="
          flex w-full max-w-[1600px] mx-auto 
          flex-col md:flex-row 
          items-center md:items-center
          gap-6 md:gap-12
        "
        >
          <motion.div
            className="
            flex flex-col w-full 
            justify-center 
            items-center
            text-center
          "
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Heading
              level="h1"
              size="2xl"
              className="
                mb-4 leading-tight 
                drop-shadow-[0_2px_2px_#28BEDA] 
                text-5xl sm:text-6xl md:text-7xl
              "
            >
              NOSOTROS
            </Heading>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NosotrosSection;