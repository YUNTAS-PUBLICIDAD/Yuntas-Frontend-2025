import Button from "@/components/atoms/Button";
// import Heading from "@/components/atoms/Heading";
// import Text from "@/components/atoms/Text";
import { imagenes } from "@/data/imagenes";
import { ArrowRight, FileText, Headset, Mail, MapPinned, MessageCircle, Paintbrush, PencilRuler, ShieldCheck, Wrench } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  const whatsappMsg = encodeURIComponent(
    "Hola, me gustaría cotizar con Yuntas Publicidad. ¿Me podrían brindar más información?"
  );
  return (
    <section
      className="relative w-full min-h-[100vh] flex items-center justify-start overflow-hidden md:h-screen"
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
        <div className="absolute inset-0 bg-black/45"></div>
        {/*Capa azul */}
        {/*<div className="absolute inset-0 bg-gradient-to-r from-[#0a1a3a]/90 via-[#0a1a3a]/70 to-transparent"></div>*/}

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
      </div>

      {/* Contenido */}
      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-20 md:pt-32 flex flex-col justify-start h-full">

        {/* Bloque texto */}
        <div className="max-w-2xl flex flex-col gap-4 md:gap-5">

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
          <h1 className="text-white font-bold leading-[1.02] tracking-[-0.04em] text-[2.8rem] md:text-[clamp(3.5rem, 5vw, 5.5rem)] reveal delay-2">
            {/*Convierte tu espacio en una*/}
            Impulsamos tu marca.
            <br />
            Transformamos{" "}
            <span className="text-[#6DE1E3]">
              {/*experiencia visual*/}
              {/*Transformamos espacios.*/}
              espacios.
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
          <p className="text-gray-200 text-base md:text-lg leading-7 max-w-xl font-light tracking-[0.01em] reveal delay-3">
            {/*Integramos diseño, iluminación y tecnología para crear espacios que proyectan valor y atraen clientes*/}
            Soluciones visuales para negocios que buscan destacar, atraer clientes y generar impacto real.
          </p>

          {/* CTA */}
          <div className=" reveal delay-3 mt-4 flex flex-wrap items-center gap-x-3 gap-y-4">

            <Button
              variant="primary"
              size="lg"
              href="/contacto"
              icon={<FileText className="h-4 w-4 opacity-80" />}
              className="
                relative z-20
                inline-flex items-center justify-center gap-2.5

                px-6 md:px-8
                py-3

                rounded-xl

                bg-[#081120]/95
                border border-[#6DE1E3]/20

                text-white
                text-sm md:text-[15px]
                font-medium

                backdrop-blur-xl

                transition-all duration-300

                hover:border-[#6DE1E3]/50
                hover:bg-[#0b1730]
                hover:-translate-y-0.5

                shadow-[0_0_0_rgba(109,225,227,0)]
                hover:shadow-[0_0_30px_rgba(109,225,227,0.12)]
              "
            >
              <span>Contáctanos</span>
            </Button>

            <Link
              href={`https://wa.me/51912849782?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                relative z-20

                inline-flex items-center justify-center gap-2.5

                px-6 md:px-8
                py-3

                rounded-xl

                bg-gradient-to-r
                from-[#6DE1E3]
                via-[#59D7E6]
                to-[#3FB8FF]

                text-[#04111d]
                text-sm md:text-[15px]
                font-semibold

                transition-all duration-300

                hover:brightness-110
                hover:-translate-y-0.5

                shadow-[0_10px_35px_rgba(109,225,227,0.22)]
                hover:shadow-[0_15px_45px_rgba(109,225,227,0.32)]
              "
            >
              <MessageCircle className="h-4 w-4" />

              <span>Cotizar ahora</span>

              <ArrowRight
                className="
                  h-4 w-4
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>
          </div>

          {/* Indicadores */}

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">

            <div className="
              flex items-start gap-3
              rounded-2xl
              border border-white/10
              bg-white/[0.03]
              backdrop-blur-md
              p-3
              transition-all duration-300
              hover:border-[#6DE1E3]/30
              hover:bg-white/[0.05]
            ">
              <div className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-xl
                bg-[#6DE1E3]/10
              ">
                <PencilRuler className="h-5 w-5 text-[#6DE1E3]" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">
                  Diseño a medida
                </h3>

                <p className="mt-1 text-xs leading-relaxed text-white/60">
                  Soluciones creativas adaptadas a la identidad de tu marca.
                </p>
              </div>
            </div>

            <div className="
              flex items-start gap-3
              rounded-2xl
              border border-white/10
              bg-white/[0.03]
              backdrop-blur-md
              p-3
              transition-all duration-300
              hover:border-[#6DE1E3]/30
              hover:bg-white/[0.05]
            ">
              <div className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-xl
                bg-[#6DE1E3]/10
              ">
                <ShieldCheck className="h-5 w-5 text-[#6DE1E3]" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">
                  Materiales premium
                </h3>

                <p className="mt-1 text-xs leading-relaxed text-white/60">
                  Tecnología y acabados de alta calidad para máxima durabilidad.
                </p>
              </div>
            </div>

            <div className="
              flex items-start gap-3
              rounded-2xl
              border border-white/10
              bg-white/[0.03]
              backdrop-blur-md
              p-3
              transition-all duration-300
              hover:border-[#6DE1E3]/30
              hover:bg-white/[0.05]
            ">
              <div className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-xl
                bg-[#6DE1E3]/10
              ">
                <Wrench className="h-5 w-5 text-[#6DE1E3]" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">
                  Instalación profesional
                </h3>

                <p className="mt-1 text-xs leading-relaxed text-white/60">
                  Equipos especializados para resultados impecables.
                </p>
              </div>
            </div>

            <div className="
              flex items-start gap-3
              rounded-2xl
              border border-white/10
              bg-white/[0.03]
              backdrop-blur-md
              p-3
              transition-all duration-300
              hover:border-[#6DE1E3]/30
              hover:bg-white/[0.05]
            ">
              <div className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-xl
                bg-[#6DE1E3]/10
              ">
                <Headset className="h-5 w-5 text-[#6DE1E3]" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">
                  Soporte continuo
                </h3>

                <p className="mt-1 text-xs leading-relaxed text-white/60">
                  Acompañamiento antes, durante y después de cada proyecto.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default HeroSection;
