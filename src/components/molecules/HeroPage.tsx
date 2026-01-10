
import React from 'react'
import Heading from '../atoms/Heading'
import DividerLine from '../atoms/DividerLine';

const posicionesText = {
  medio: "justify-center",
  izquierda: "justify-start",
  derecha: "justify-end ",
};

type HeroPageProps = {
  url: any;
  text: string;
  position: keyof typeof posicionesText;
};

const HeroPage = ({ url, text, position = "medio" }: HeroPageProps) => {

  return (
    <section

      className={`relative w-full h-screen flex items-center ${posicionesText[position]} 
      overflow-hidden pt-24 bg-cover bg-center bg-no-repeat  px-8 md:px-0 text-center
       md:h-screen h-[80vh] md:pt-24 `}
      style={{ backgroundImage: `url(${url})` }}

    >
      <div className="absolute inset-0 bg-black/30 md:bg-black/40" />
      <Heading
        level="h1"
        size="2xl"
        className="leading-tight md:text-7xl text-5xl sm:text-6xl drop-shadow-[0_2px_2px_#28BEDA]"
      >
        {text}
      </Heading>
      <DividerLine />
    </section>
  );
};

export default HeroPage;
