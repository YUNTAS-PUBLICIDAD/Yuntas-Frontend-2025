import React from 'react';
import Heading from '@/components/atoms/Heading';
import heroBackground from "@/assets/Reclamaciones/heroBackground.png";


const HeroSection = () => {
  return (
    <section
        className='relative w-full h-screen flex items-center justify-center
      overflow-hidden pt-24 bg-cover bg-center bg-no-repeat  px-8 md:px-0 text-center
       md:h-screen md:pt-24 '
        style={{ backgroundImage: `url('${heroBackground.src}')` }}
      >
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
