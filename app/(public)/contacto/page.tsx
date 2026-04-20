import ContactoMedios from "@/components/organisms/contacto/contactoMedios";
import HeroSection from "@/components/organisms/contacto/HeroSection";
import SolicitudInfo from "@/components/organisms/contacto/solicitudInfo";
import UbicacionContacto from "@/components/organisms/contacto/ubicacionContacto";

export default function ContactoPage() {
  return (
    <main className="">
      <HeroSection />
      <ContactoMedios />
      <SolicitudInfo />
      <UbicacionContacto />
    </main>
  );
}
