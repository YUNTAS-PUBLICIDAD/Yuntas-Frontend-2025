import ContactoMedios from "@/components/organisms/contacto/contactoMedios";
import ContactoSection from "@/components/organisms/contacto/contactoSection";
import SolicitudInfo from "@/components/organisms/contacto/solicitudInfo";
import UbicacionContacto from "@/components/organisms/contacto/ubicacionContacto";

export default function ContactoPage() {
  return (
    <main className="">
      <ContactoSection />
      <ContactoMedios />
      <SolicitudInfo />
      <UbicacionContacto />
    </main>
  );
}
