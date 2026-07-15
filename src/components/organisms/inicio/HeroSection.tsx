import Button from "@/components/atoms/Button";
// import Heading from "@/components/atoms/Heading";
// import Text from "@/components/atoms/Text";
import { imagenes } from "@/data/imagenes";
import { ArrowRight, FileText, Headset, Mail, MapPinned, MessageCircle, Paintbrush, PencilRuler, ShieldCheck, Wrench } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: Paintbrush,
    title: "Diseño personalizado",
    description:
      "Creamos soluciones visuales adaptadas a la identidad de tu negocio."
  },
  {
    icon: ShieldCheck,
    title: "Materiales premium",
    description:
      "Tecnología y acabados de alta calidad para máxima durabilidad."
  },
  {
    icon: Wrench,
    title: "Instalación profesional",
    description:
      "Equipos especializados para resultados impecables."
  }
];

const HeroSection = () => {
  const whatsappMsg = encodeURIComponent(
    "Hola, me gustaría cotizar con Yuntas Publicidad. ¿Me podrían brindar más información?"
  );
  return (
    <section
      className="relative h-auto md:min-h-[650px] lg:min-h-screen overflow-hidden"
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
      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-16 md:pb-24 flex flex-col justify-start lg:pb-0">

        {/* Bloque texto */}
        <div className="max-w-3xl flex flex-col gap-4 md:gap-5">

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
          <h1 className="text-white font-bold leading-[1] tracking-[-0.04em] text-[2.8rem] sm:text-[3.2rem] md:text-[3.8rem] lg:text-[4.5rem]  reveal delay-2">
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

                rounded-xl

                bg-[#081120]/95
                border border-[#6DE1E3]/20

                text-white
                text-sm md:text-[15px]
                font-medium
                h-12

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
                h-12

                rounded-xl

                bg-gradient-to-r
                from-[#4ED8E7]
                via-[#38CDE2]
                to-[#2BA9FF]

                text-white

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

          {/* METRICAS CUALITATIVAS */}

          <div className="mt-10 flex flex-wrap gap-3">

            {features.map((feature) => (
              <div
                key={feature.title}
                className="
                  inline-flex
                  items-center
                  gap-3

                  rounded-full

                  border border-white/10
                  bg-black/25
                  backdrop-blur-xl

                  px-5
                  py-3
                "
              >
                <feature.icon
                  className="
                    h-4 w-4
                    text-[#6DE1E3]
                  "
                />

                <span
                  className="
                    text-sm
                    text-white/90
                    font-medium
                  "
                >
                  {feature.title}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default HeroSection;
