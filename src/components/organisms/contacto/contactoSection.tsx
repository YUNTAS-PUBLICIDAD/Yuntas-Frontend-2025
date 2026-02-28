"use client";

import Heading from "@/components/atoms/Heading";
import { imagenes } from "@/data/imagenes";
import { motion } from "framer-motion";

const ContactoSection = () => {
  return (
    <section
      className="
        relative w-full h-[35vh] sm:h-[40vh] md:h-screen 
        flex items-center justify-start 
        overflow-hidden 
        border-b-8 border-[#98D8DF]
      "
      aria-label="Sección Contacto"
    >

      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      >
        <img
          src={imagenes.contacto.hero.src}
          alt={imagenes.contacto.hero.alt || "Contacto"}
          title={imagenes.contacto.hero.title}
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,3,30,0.2), rgba(0,3,30,0.5))",
        }}
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
              level="h1"
              size="2xl"
              className="
                mb-4 leading-tight 
                drop-shadow-[0_2px_2px_#28BEDA] 
                text-5xl sm:text-6xl md:text-7xl
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