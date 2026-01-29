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
      
     
      <div className="relative z-20 w-full flex items-end h-full pb-16 md:pb-24 px-6 md:px-12 lg:px-20">
       
        <div className="flex w-full max-w-[1440px] mx-auto flex-col md:flex-row items-center md:items-end justify-between gap-8 md:gap-0">
          
          {/* COLUMNA TEXTO */}
          <div className="flex flex-col justify-center w-full md:w-7/12 items-center md:items-start text-center md:text-left">
            <Heading 
              level="h1" 
              size="2xl" 
              className="mb-2 md:mb-4 leading-tight drop-shadow-[0_2px_2px_#28BEDA] text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
            >
              ESPECIALISTAS EN<br />
              DISEÑAR TU ESPACIO
            </Heading>
            <Text 
              variant="caption" 
              color="white" 
              className="mb-0 text-lg sm:text-xl md:text-2xl"
            >
              ¡Somos <span className="text-[#6DE1E3] font-bold">YUNTAS</span> Publicidad!
            </Text>
          </div>

          {/* COLUMNA BOTÓN 
          
          */}
          <div className="flex w-full md:w-5/12 justify-center md:justify-end items-center md:items-end md:pb-2">
              <Button 
                variant="primary" 
                size="lg" 
                href="/contacto" 
                className="relative z-20 px-8 py-4 md:px-10 md:py-5 text-xl md:text-2xl shadow-lg hover:scale-105 transition-transform"
              >
                CONTÁCTANOS
              </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;