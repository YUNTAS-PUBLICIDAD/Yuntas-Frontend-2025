import LogoBlock from "@/components/molecules/footer/LogoBlock";
import AddressBlock from "@/components/molecules/footer/AddressBlock";
import LegalLinksBlock from "@/components/molecules/footer/LegalLinksBlock"; 
import ContactBlock from "@/components/molecules/footer/ContactBlock";
import SocialLinks from "@/components/molecules/footer/SocialLinks";

export default function Footer() {
  return (
    <footer className="bg-[#04041C] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-start justify-items-center md:justify-items-start">

          <div className="flex flex-col items-center md:items-start w-full gap-8">
            <LogoBlock />
            <div className="w-full h-[2px] bg-[#6DE1E3] md:hidden"></div>
            <div className="md:hidden">
              <SocialLinks />
            </div>
          </div>

          <div className="w-full">
            <LegalLinksBlock />
          </div>

          {/* Dirección y Horario */}
          <div className="w-full">
            <AddressBlock />
          </div>

          {/*  Contacto y Redes (Desktop) */}
          <div className="w-full flex flex-col gap-6">
            <ContactBlock />
         
          </div>

        </div>
      </div>
    </footer>
  );
}