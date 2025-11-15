import Button from "@/components/atoms/Button";
import Heading from "@/components/atoms/Heading";
import Text from "@/components/atoms/Text";
import heroBackground from "@/assets/inicio/heroBackground.webp";

const HeroSection = () => {
  return (
    <section
      className="relative w-full h-screen flex items-center justify-start overflow-hidden pt-24 bg-cover bg-center bg-no-repeat border-b-8 border-[#6DE1E3] md:h-screen h-[80vh] md:pt-24 pt-8"
      style={{ backgroundImage: `url(${heroBackground.src})` }}
    >
      <div className="absolute inset-0 bg-black/30 md:bg-black/40" />
      <div className="relative z-20 w-full flex items-end h-full pb-20 md:pb-20 pb-16">
        <div className="flex w-full max-w-[1600px] mx-auto gap-12 flex-row md:flex-row flex-col md:gap-12 gap-6 items-center">
          <div className="flex flex-col justify-center md:w-1/2 w-full md:items-start items-center text-center md:text-left">
            <Heading level="h1" size="2xl" className="mb-4 leading-tight drop-shadow-[0_2px_2px_#28BEDA] md:text-7xl text-5xl sm:text-6xl">
              ESPECIALISTAS EN<br />
              DISEÑAR TU ESPACIO
            </Heading>
            <Text variant="caption" color="white" className="mb-0 md:text-2xl text-xl sm:text-2xl">
              ¡Somos <span className="text-[#6DE1E3] font-bold">YUNTAS</span> Publicidad!
            </Text>
          </div>
          <div className="flex md:w-1/2 w-full md:justify-end justify-center items-center md:h-full h-auto">
              <Button variant="primary" size="lg" href="#contacto" className="relative z-20 md:mb-0 px-10 py-5 text-2xl">
                CONTÁCTANOS
              </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
