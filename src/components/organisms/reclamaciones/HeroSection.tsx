"use client";

import React from 'react';
import Heading from '@/components/atoms/Heading';
import { imagenes } from "@/data/imagenes";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section
      className="
        relative w-full h-[35vh] sm:h-[40vh] md:h-screen 
        flex items-center justify-start 
        overflow-hidden
      "
      aria-label="Sección Reclamaciones"
    >

      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      >
        <img
          src={imagenes.reclamaciones.hero.src}
          alt={imagenes.reclamaciones.hero.alt || "Reclamaciones"}
          title={imagenes.reclamaciones.hero.title}
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      <div
        className="absolute inset-0 z-10 bg-gradient-to-r from-[#0a1a3a]/90 via-[#04061a]/70 to-transparent"
      />

      <div className="absolute inset-0 z-20 w-full h-full flex items-center justify-center">
        <div
          className="
          flex w-full max-w-[1600px] mx-auto 
          flex-col md:flex-row 
          items-center md:items-center
          gap-6 md:gap-12
        "
        >
          <div
            className="
            flex flex-col w-full 
            justify-center 
            items-center
            text-center
          "
          >
            <Heading
              className="
                mb-4 leading-tight 
                drop-shadow-[0_2px_2px_#28BEDA] 
                text-2xl sm:text-4xl md:text-6xl
              "
            >
              RECLAMACIONES
            </Heading>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
