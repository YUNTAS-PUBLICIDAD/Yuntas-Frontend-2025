"use client";

import Heading from "@/components/atoms/Heading";
import { imagenes } from "@/data/imagenes";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section
      className="
        relative w-full h-[50vh] md:h-[60vh]
        flex items-center justify-start
        overflow-hidden
        border-b-4 border-[#98D8DF]
      "
      aria-label="Sección Nosotros"
    >
      <div className="absolute inset-0 scale-110 animate-slowZoom">
        <Image
          src={imagenes.nosotros.hero.src}
          alt={imagenes.nosotros.hero.alt || "Nosotros"}
          fill
          priority
          quality={70}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/*Overlay*/}
      <div className="absolute inset-0 z-10">
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a3a]/90 via-[#04061a]/70 to-transparent" />
        </div>

      {/*<div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,3,30,0.2), rgba(0,3,30,0.5))",
        }}
      />*/}

      {/*<div className="absolute inset-0 z-20 w-full h-full flex items-center justify-center">
        <div
          className="
            flex w-full max-w-[1600px] mx-auto
            flex-col md:flex-row
            items-center
            gap-6 md:gap-12
          "
        >*/}
      {/*Content*/}
          <div
            className="
             relative z-20 flex flex-col w-full h-full px-6
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
              NOSOTROS
            </Heading>
          {/*</div>*/}
        {/*</div>*/}
      </div>
    </section>
  );
};

export default HeroSection;
