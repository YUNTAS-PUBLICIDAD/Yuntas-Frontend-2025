import React from 'react';
import Heading from '@/components/atoms/Heading';
import heroBackground from "@/assets/Reclamaciones/heroBackground.png";

const HeroSection = () => {
  return (
    <section
        className="w-full h-screen  flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url('${heroBackground.src}')` }}
      >
      <Heading
        level="h1"
        size="2xl"
        className="leading-tight  md:text-7xl text-5xl sm:text-6xl"
      >
        Reclamaciones
      </Heading>
    </section>
  );
};

export default HeroSection;
