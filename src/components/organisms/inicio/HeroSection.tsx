import Button from "@/components/atoms/Button";
import Heading from "@/components/atoms/Heading";
import Text from "@/components/atoms/Text";
import { imagenes } from "@/data/imagenes";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section
      className="relative w-full h-screen flex items-center justify-start overflow-hidden pt-24 border-b-8 border-[#6DE1E3] md:h-screen h-[80vh] md:pt-24 pt-8"
    >
      {/* 1. Fondo con animación CSS */}
      <div className="absolute inset-0 animate-zoom-out-bg">
        <Image
          quality={70}
          src={imagenes.inicio.hero.src}
          alt={imagenes.inicio.hero.alt || "Hero Yuntas Publicidad"}
          title={imagenes.inicio.hero.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 100vw"
        />
      </div>

      <div className="absolute inset-0 bg-black/50 md:bg-black/40 z-10" />

      <div className="relative z-20 w-full flex items-center md:items-end h-full pb-16 md:pb-24 px-6 md:px-12 lg:px-20">
        <div className="flex w-full max-w-[1440px] mx-auto flex-col justify-end">
          <div className="flex flex-col justify-center w-full md:w-9/12 items-center md:items-start text-center md:text-left">

            {/* 2. Título (Aparece primero) */}
            <div className="animate-fade-up-1">
              <Heading
                level="h1"
                className="mb-4 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
              >
                ESPECIALISTAS EN <br />
                DISEÑAR TU <br />
                ESPACIO
              </Heading>
            </div>

            {/* 3. Subtítulo (Aparece después de 400ms) */}
            <div className="animate-fade-up-2">
              <Text
                variant="caption"
                color="white"
                className="mb-8 text-lg sm:text-xl md:text-2xl"
              >
                ¡Somos <span className="text-[#6DE1E3] font-bold">YUNTAS</span> Publicidad!
              </Text>
            </div>

            {/* 4. Botón (Aparece con efecto resorte) */}
            <div className="flex justify-center md:justify-start w-full animate-fade-up-3">
              <Button
                variant="primary"
                size="lg"
                href="/contacto"
                className="relative z-20 px-12 py-4 text-xl font-bold shadow-lg hover:scale-105 transition-transform"
              >
                CONTÁCTANOS
              </Button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;