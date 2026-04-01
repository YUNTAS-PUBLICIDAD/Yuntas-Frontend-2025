'use client';
import Button from "@/components/atoms/Button";
import Heading from "@/components/atoms/Heading";
import Text from "@/components/atoms/Text";
import { imagenes } from "@/data/imagenes";
import { motion } from "framer-motion";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section
      className="relative w-full h-screen flex items-center justify-start overflow-hidden pt-24 border-b-8 border-[#6DE1E3] md:h-screen h-[80vh] md:pt-24 pt-8"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      >
        <Image
          quality={70}
          src={imagenes.inicio.hero.src}
          alt={imagenes.inicio.hero.alt || "Hero Yuntas Publicidad"}
          title={imagenes.inicio.hero.title}
          fill
          priority
          className="object-cover"
          /* optimización para vista móvil*/
          sizes="(max-width: 768px) 100vw, 100vw"
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/50 md:bg-black/40 z-10" />

      <div className="relative z-20 w-full flex items-center md:items-end h-full pb-16 md:pb-24 px-6 md:px-12 lg:px-20">
        <div className="flex w-full max-w-[1440px] mx-auto flex-col justify-end">
          <div className="flex flex-col justify-center w-full md:w-9/12 items-center md:items-start text-center md:text-left">

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Heading
                level="h1"
                className="mb-4 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
              >
                ESPECIALISTAS EN <br />
                DISEÑAR TU <br />
                ESPACIO
              </Heading>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <Text
                variant="caption"
                color="white"
                className="mb-8 text-lg sm:text-xl md:text-2xl"
              >
                ¡Somos <span className="text-[#6DE1E3] font-bold">YUNTAS</span> Publicidad!
              </Text>
            </motion.div>

            <motion.div
              className="flex justify-center md:justify-start w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
            >
              <Button
                variant="primary"
                size="lg"
                href="/contacto"
                className="relative z-20 px-12 py-4 text-xl font-bold shadow-lg hover:scale-105 transition-transform"
              >
                CONTÁCTANOS
              </Button>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;