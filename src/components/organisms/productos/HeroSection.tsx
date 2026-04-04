import Heading from "@/components/atoms/Heading";
import { imagenes } from "@/data/imagenes";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section
      className="
        relative w-full h-[40vh] md:h-[50vh]
        flex items-center justify-start 
        overflow-hidden 
        border-b-4 border-[#98D8DF]
      "
      aria-label="Sección Productos"
    >
      <div className="absolute inset-0 animate-zoom-out-bg">
        <Image
          src={imagenes.productos.hero.src}
          alt={imagenes.productos.hero.alt || "Productos"}
          title={imagenes.productos.hero.title}
          fill
          priority
          quality={80}
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,3,30,0.2), rgba(0,3,30,0.5))",
        }}
      />

      <div className="absolute inset-0 z-20 w-full h-full flex items-center justify-center">
        <div
          className="
          flex w-full max-w-[1600px] mx-auto 
          flex-col md:flex-row 
          items-center md:items-center
          gap-6 md:gap-12
        "
        >
          <div
            className="
            flex flex-col w-full 
            justify-center 
            items-center
            text-center
          "
          >
            <Heading
              level="h1"
              size="2xl"
              className="
                mb-4 leading-tight 
                drop-shadow-[0_2px_2px_#28BEDA] 
                text-5xl sm:text-6xl md:text-7xl
              "
            >
              PRODUCTOS
            </Heading>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;