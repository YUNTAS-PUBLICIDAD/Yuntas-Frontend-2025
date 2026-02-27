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
  imageTitle?: string;
  imageAlt?: string;
};

const HeroPage = ({ url, text, position = "medio", imageTitle, imageAlt }: HeroPageProps) => {
  return (
    <section
      className={`relative w-full h-screen flex flex-col ${posicionesText[position]} 
      overflow-hidden pt-24 bg-cover bg-center bg-no-repeat text-center
      md:h-screen h-[80vh] md:pt-24`}
      style={{ backgroundImage: `url(${url})` }}
    >
      {imageAlt && <img src={url} alt={imageAlt} title={imageTitle} className="sr-only" aria-hidden="false" />}
      
      <div className="absolute inset-0 bg-black/30 md:bg-black/40" />
      
      <div className="relative z-10 container mx-auto px-4 flex-grow flex flex-col justify-center items-center">
        <div className="max-w-5xl">
            <Heading
                level="h1"
                size="2xl"
                className="leading-tight md:text-7xl text-5xl sm:text-6xl drop-shadow-[0_2px_2px_#28BEDA]"
            >
                {text}
            </Heading>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full z-20">
        <DividerLine />
      </div>

    </section>
  );
};

export default HeroPage;