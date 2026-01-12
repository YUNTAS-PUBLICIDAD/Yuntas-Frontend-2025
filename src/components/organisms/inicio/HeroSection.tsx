import Button from "@/components/atoms/Button";
import Heading from "@/components/atoms/Heading";
import Text from "@/components/atoms/Text";
import heroBackground from "@/assets/inicio/heroBackground.webp";

const HeroSection = () => {
  return (
    <section
      className="relative w-full h-screen flex items-center justify-start overflow-hidden pt-20 md:pt-24 bg-cover bg-center bg-no-repeat border-b-4 md:border-b-8 border-[#6DE1E3] min-h-[600px] md:h-screen"
      style={{ backgroundImage: `url(${heroBackground.src})` }}
    >
      <div className="absolute inset-0 bg-black/30 md:bg-black/40" />
      <div className="relative z-20 w-full flex items-end h-full pb-12 md:pb-20 px-4 md:px-8">
        <div className="flex w-full max-w-[1600px] mx-auto gap-6 md:gap-12 flex-col md:flex-row items-center">
          <div className="flex flex-col justify-center md:w-1/2 w-full md:items-start items-center text-center md:text-left">
            <Heading level="h1" size="2xl" className="mb-3 md:mb-4 leading-tight drop-shadow-[0_2px_2px_#28BEDA] text-4xl sm:text-5xl md:text-7xl">
              ESPECIALISTAS EN<br />
              DISEÑAR TU ESPACIO
            </Heading>
            <Text variant="caption" color="white" className="mb-0 text-lg sm:text-xl md:text-2xl">
              ¡Somos <span className="text-[#6DE1E3] font-bold">YUNTAS</span> Publicidad!
            </Text>
          </div>
          <div className="flex md:w-1/2 w-full md:justify-end justify-center items-center">
              <Button variant="primary" size="lg" href="/contacto" className="relative z-20 px-8 py-4 md:px-10 md:py-5 text-xl md:text-2xl w-full md:w-auto max-w-sm md:max-w-none">
                CONTÁCTANOS
              </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
