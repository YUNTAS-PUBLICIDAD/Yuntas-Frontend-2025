"use client";

import Heading from "@/components/atoms/Heading";
import { imagenes } from "@/data/imagenes";
import { motion } from "framer-motion";

const ContactoSection = () => {
  return (
    <section
      className="
        relative w-full h-[60vh] md:h-[80vh] 
        flex items-center justify-start 
        overflow-hidden 
        border-b-[12px] border-[#98D8DF]
      "
      aria-label="Sección Contacto"
    >

      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imagenes.contacto.hero.src})` }}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      />

      {/* Imagen SEO */}
      {imagenes.contacto.hero.alt && (
        <img 
          src={imagenes.contacto.hero.src} 
          alt={imagenes.contacto.hero.alt} 
          title={imagenes.contacto.hero.title} 
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
         {/* Texto principal */}
          <div
            className="
            flex flex-col w-full 
            justify-center 
            items-center
            text-center
          "
          >
            <Heading
              level="h1"
              size="2xl"
              className="
                mb-4 leading-tight 
                drop-shadow-[0_2px_2px_#28BEDA] 
                text-3xl sm:text-4xl md:text-6xl lg:text-7xl
              "
            >
              CONTACTO
            </Heading>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactoSection;