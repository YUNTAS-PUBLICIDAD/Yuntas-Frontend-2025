import Heading from "@/components/atoms/Heading";
import contactoBackground from "@/assets/contacto/contactoBackground.webp";

const ContactoSection = () => {
  return (
    <section
      className="
        relative w-full h-[80vh] md:h-screen 
        flex items-center justify-start 
        pt-24 md:pt-24 overflow-hidden 
        bg-cover bg-top bg-no-repeat 
        border-b-8 border-[#98D8DF]
      "
      style={{ backgroundImage: `url(${contactoBackground.src})` }}
      aria-label="Sección Nosotros"
    >
      {/* Degradado Lineal */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,3,30,0.2), rgba(0,3,30,0.5))",
        }}
      />

      <div className="relative z-20 w-full h-full flex items-center pb-16 md:pb-20">
        <div
          className="
          flex w-full max-w-[1600px] mx-auto 
          flex-col md:flex-row 
          items-center md:items-center
          gap-6 md:gap-12
        "
        >
          {/* Texto principal */}
          <div
            className="
            flex flex-col w-full 
            justify-center 
            items-center
            text-center
          "
          >
            {/* Ajuste responsive del título - agregado sm:text-4xl lg:text-7xl para mejor proporción en diferentes pantallas */}
            <Heading
              level="h1"
              size="2xl"
              className="
                mb-4 leading-tight 
                drop-shadow-[0_2px_2px_#28BEDA] 
                text-3xl sm:text-4xl md:text-6xl lg:text-7xl
              "
            >
              CONTACTO
            </Heading>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactoSection;
