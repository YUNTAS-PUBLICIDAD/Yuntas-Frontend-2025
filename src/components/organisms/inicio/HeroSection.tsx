import Button from "@/components/atoms/Button";
// import Heading from "@/components/atoms/Heading";
// import Text from "@/components/atoms/Text";
import { imagenes } from "@/data/imagenes";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section
      className="relative w-full h-[85vh] flex items-center justify-start overflow-hidden border-b-8 border-[#6DE1E3] md:h-screen"
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
          // sizes="(max-width: 768px) 100vw, 100vw"
        />
      </div>

      {/* Overlay con profundidad (gradiente) */}
      {/*<div className="absolute inset-0 bg-gradient-to-r  from-black/70 via-black/50  to-black/20 z-10" />*/}

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
                  {/*Diseño, iluminación y señalética que{" "}*/}
                  {/*Haz que tu negocio{" "}*/}
                  Convierte tu espacio en una
                  <br />
                  <span className="text-[#6DE1E3]">
                    {/*marcan diferencia*/}
                    {/*destaque de verdad*/}
                    experiencia visual
                  </span>
                </h1>

            {/*</div>*/}

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
                 {/*Diseñamos e instalamos letreros LED, neón y soluciones visuales que transforman tu espacio y refuerzan tu identidad.*/}
                 Integramos diseño, iluminación y tecnología para crear espacios que proyectan valor y atraen clientes
              </p>
            {/*</div>*/}

            {/* CTA */}
            <div className=" reveal delay-3 mt-8 flex items-center gap-4">
              <Button
                variant="primary"
                size="lg"
                href="/contacto"
                className="relative z-20 px-12 py-4 text-xl font-bold shadow-lg hover:scale-105 transition-transform"
              >
                {/*CONTÁCTANOS*/}
                Cotizar ahora
              </Button>
            </div>

          </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 bg-grandient-to-t from-white/20 to-transparent pointer-events-none"></div>
        {/*</div>
      </div>*/}
    </section>
  );
};

export default HeroSection;
