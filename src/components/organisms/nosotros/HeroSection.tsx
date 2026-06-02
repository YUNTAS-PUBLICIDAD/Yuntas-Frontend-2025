"use client";

import Heading from "@/components/atoms/Heading";
import { imagenes } from "@/data/imagenes";
import Image from "next/image";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const subtitulos = [
    "Diseñamos experiencias visuales memorables",
    "Unimos diseño, iluminación y tecnología",
    "Transformamos espacios con impacto real",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % subtitulos.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [subtitulos.length]);

  return (
    <section
      className="
        relative w-full h-screen
        flex items-center justify-start
        overflow-hidden
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
                text-4xl sm:text-4xl md:text-[56px]
                reveal delay-2
              "
            >
              NOSOTROS
            </Heading>
            <div className="h-[60px] sm:h-[100px] mt-4 relative w-full flex justify-center items-center">
              {subtitulos.map((subtitulo, i) => (
                <p
                  key={subtitulo}
                  className={`absolute text-white/90 text-lg sm:text-2x1 md:text-4xl font-medium tracking-wide max-w-2xl text-center transition-all duration-500 ease-in-out ${
                    i === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  {subtitulo}
                </p>
              ))}
            </div>
          {/*</div>*/}
        {/*</div>*/}
      </div>
    </section>
  );
};

export default HeroSection;
