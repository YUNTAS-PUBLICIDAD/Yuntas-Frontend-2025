import ContactoSplitForm from "@/components/organisms/contacto/ContactoSplitForm";
import HeroSection from "@/components/organisms/contacto/HeroSection";
import TextTitulo from "@/components/atoms/TextTitulo";
import UbicacionContacto from "@/components/organisms/contacto/ubicacionContacto";

export default function ContactoPage() {
  return (
    <main>
      <HeroSection />

      <div className="w-full bg-gradient-to-r from-[#0a1a3a] via-[#0f2c5c] to-[#20838f] py-4 md:py-5 px-6 md:px-12 text-center shadow-2xl">
        <TextTitulo
          variant="caption"
          className="text-white font-black text-2xl sm:text-3xl md:text-4xl tracking-tight uppercase"
        >
          <span className="font-black">CONOCE NUESTROS MEDIOS DE</span>
          <br />
          CONTACTO
        </TextTitulo>
      </div>

      <ContactoSplitForm />
      <UbicacionContacto />
    </main>
  );
}
