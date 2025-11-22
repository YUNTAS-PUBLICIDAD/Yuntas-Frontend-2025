import React from 'react'
import Heading from '../atoms/Heading'
import DividerLine from '../atoms/DividerLine';
const posicionesText = {
  medio: "justify-center",
  izquierda: "justify-start",
  derecha: "justify-end",
};

type HeroPageProps = {
  url: any;
  text: string;
  position: keyof typeof posicionesText;
};

const HeroPage = ({ url, text, position="medio" }: HeroPageProps) => {
    
  const bg = typeof url === "string" ? url : url.src;

  return (
    <section
      className={`relative w-full h-screen flex items-center ${posicionesText[position]} 
      overflow-hidden pt-24 bg-cover bg-center bg-no-repeat 
       md:h-screen h-[80vh] md:pt-24 `}
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Heading
        level="h1"
        size="2xl"
        className="leading-tight md:text-7xl text-5xl sm:text-6xl"
      >
        {text}
      </Heading>
      <DividerLine/>
    </section>
  );
};

export default HeroPage;
