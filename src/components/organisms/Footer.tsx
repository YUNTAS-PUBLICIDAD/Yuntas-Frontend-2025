import LogoBlock from "@/components/molecules/footer/LogoBlock";
import AddressBlock from "@/components/molecules/footer/AddressBlock";
import LegalLinksBlock from "@/components/molecules/footer/LegalLinksBlock";
import ContactBlock from "@/components/molecules/footer/ContactBlock";
import SocialLinks from "@/components/molecules/footer/SocialLinks";

export default function Footer() {
  return (
    <footer className="bg-[#04041C] text-white pt-16 pb-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-start">

          {/* Logo */}
          <div className="flex flex-col items-start gap-8">
            <LogoBlock />


            <div className="md:hidden">
              <SocialLinks />
            </div>
          </div>

          {/* Dirección y Horario */}
          <div>
            <AddressBlock />
          </div>

          {/* Contacto */}
          <div className="flex flex-col gap-6">
            <ContactBlock />
          </div>

        </div>


        {/* Enlaces legales abajo */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center mt-14 text-base text-white">
          <LegalLinksBlock />
        </div>

      </div>
    </footer>
  );
}