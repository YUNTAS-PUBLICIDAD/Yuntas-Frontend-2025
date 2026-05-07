import React from 'react'
import Heading from '../atoms/Heading'
import Image from 'next/image';

const posicionesText = {
  medio: "justify-center",
  izquierda: "justify-start",
  derecha: "justify-end ",
};

type HeroSectionProps = {
  url: any;
  text: string;
  position: keyof typeof posicionesText;
  imageTitle?: string;
  imageAlt?: string;
};

const HeroSection = ({ url, text, position = "medio", imageTitle, imageAlt }: HeroSectionProps) => {
  return (
    <section
      className={`relative w-full h-[80vh] md:h-screen flex flex-col ${posicionesText[position]}
      overflow-hidden pt-24 text-center md:pt-24`}
    >
      <Image src={url} alt={imageAlt || text} title={imageTitle} fill priority sizes='100vw' className='object-cover object-center animate-pan-horizontal will-change-transform'/>
      {/*// {imageAlt && <img src={url} alt={imageAlt} title={imageTitle} className="sr-only" aria-hidden="false" />}*/}

      {/*Overlay*/}
      <div className="absolute inset-0 bg-black/30 md:bg-black/40" />

      {/*Contenido*/}
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
    </section>
  );
};

export default HeroSection;
