import React from 'react';
import Heading from '@/components/atoms/Heading';
import { imagenes } from "@/data/imagenes";

const HeroSection = () => {
  return (
    <section
        className='relative w-full h-screen flex items-center justify-center
      overflow-hidden pt-24 bg-cover bg-center bg-no-repeat  px-8 md:px-0 text-center
       md:h-screen md:pt-24 '
        style={{ backgroundImage: `url('${imagenes.reclamaciones.hero.src}')` }}
      >
      {imagenes.reclamaciones.hero.alt && <img src={imagenes.reclamaciones.hero.src} alt={imagenes.reclamaciones.hero.alt} title={imagenes.reclamaciones.hero.title} className="sr-only" aria-hidden="false" />}
      <div className="absolute inset-0 bg-black/30 md:bg-black/40" />
      <Heading
        level="h1"
        size="2xl"
        className="leading-tight md:text-7xl text-5xl sm:text-6xl drop-shadow-[0_2px_2px_#28BEDA]"
      >
        Reclamaciones
      </Heading>
    </section>
  );
};

export default HeroSection;
