import Button from "@/components/atoms/Button";
// import Heading from "@/components/atoms/Heading";
// import Text from "@/components/atoms/Text";
import { imagenes } from "@/data/imagenes";
import Image from "next/image";

const HeroSection = () => {
  const whatsappMsg = encodeURIComponent(
    "Hola, me gustaría cotizar con Yuntas Publicidad. ¿Me podrían brindar más información?"
  );
  return (
    <section
      className="relative w-full h-[85vh] flex items-center justify-start overflow-hidden md:h-screen"
    >
      {/* Fondo */}
      <div className="absolute inset-0 animate-zoom-out-bg">
        <Image
          quality={70}
          src={imagenes.inicio.hero.src}
          alt={imagenes.inicio.hero.alt || "Hero Yuntas Publicidad"}
          title={imagenes.inicio.hero.title}
          fill
          priority
          className="object-cover scale-105"
        />
      </div>

      <div className="absolute inset-0 z-10">
        {/*Capa base oscura*/}
        <div className="absolute inset-0 bg-black/30"></div>
        {/*Capa azul */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a3a]/90 via-[#0a1a3a]/70 to-transparent"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-20 w-full max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col justify-center h-full">

        {/* Bloque texto */}
        <div className="max-w-2xl flex flex-col gap-6 md:gap-8">

          {/* Eyebrow */}
          <span className="text-[#6DE1E3] text-sm md:text-base font-semibold tracking-[0.08em] uppercase opacity-80 reveal delay-1">
            Publicidad visual para negocios
          </span>

          {/* Headline */}
            {/*<div className="animate-fade-up-1">*/}
                {/*<Heading
                  level="h1"
                  className="text-white font-extrabold leading-[1.1] text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                >*/}
                  {/*ESPECIALISTAS EN <br />
                  DISEÑAR TU <br />
                  ESPACIO*/}
                  {/*Diseñamos espacios que{" "}
                  <span className="text-[#6DE1E3]">impactan</span>
                </Heading>*/}
          <h1 className="text-white font-extrabold leading-[1.02] tracking-[-0.02em] text-[clamp(2.5rem,5vw,5.5rem)] reveal delay-2">
            Convierte tu espacio en una
            <br />
            <span className="text-[#6DE1E3]">
              experiencia visual
            </span>
          </h1>

          {/* Subheadline */}
          {/*<div className="animate-fade-up-2">*/}
              {/*<Text
                variant="caption"
                color="white"
                className="mb-8 text-lg sm:text-xl md:text-2xl"
              >*/}
                {/*¡Somos <span className="text-[#6DE1E3] font-bold">YUNTAS</span> Publicidad!*/}

              {/*</Text>*/}
          <p className="text-gray-200 text-base md:text-lg leading-relaxed max-w-xl font-light tracking-[0.01em] reveal delay-3">
            Integramos diseño, iluminación y tecnología para crear espacios que proyectan valor y atraen clientes
          </p>

          {/* CTA */}
          <div className=" reveal delay-3 mt-8 flex flex-wrap items-center gap-x-4 gap-y-6">
            <Button
              variant="primary"
              size="lg"
              href="/contacto"
              className="relative z-20 px-12 py-4 text-xl font-semibold uppercase tracking-[0.06em] text-white rounded-xl bg-gradient-to-r from-[#6DE1E3] via-[#3ECAD0] to-[#0ea5b7] shadow-[0_10px_30px_rgba(109,225,227,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_40px_rgba(109,225,227,0.5)] active:scale-95"
            >
              {/*CONTÁCTANOS*/}
                {/*Cotizar ahora*/}
              Contáctanos
            </Button>

            
            <a
              href={`https://wa.me/51912849782?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative z-20 inline-flex rounded-xl p-[1.5px] overflow-hidden"
            >
              {/* Borde degradado */}
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#6DE1E3] via-[#22c55e] to-[#0ea5b7] opacity-80 group-hover:opacity-100 transition" />
              {/* Contenido */}
              <span className="relative px-10 py-4 rounded-[10px] bg-[#0a1a3a]/80 backdrop-blur-md text-white font-semibold text-lg uppercase tracking-[0.06em] flex items-center gap-2 transition-all duration-300 group-hover:bg-[#0a1a3a]">
                Cotizar ahora
              </span>
            </a>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default HeroSection;
