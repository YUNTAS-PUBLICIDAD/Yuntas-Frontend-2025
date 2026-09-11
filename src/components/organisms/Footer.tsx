import LogoBlock from "@/components/molecules/footer/LogoBlock";
import AddressBlock from "@/components/molecules/footer/AddressBlock";
import LegalLinksBlock from "@/components/molecules/footer/LegalLinksBlock";
import ContactBlock from "@/components/molecules/footer/ContactBlock";
import SocialLinks from "@/components/molecules/footer/SocialLinks";
import NavMenuFooter from "../molecules/footer/NavMenuFooter";

interface FooterProps {
  phone?: string | null;
}
// HOLA
export default function Footer({ phone }: FooterProps) {
  return (
    <footer className="bg-[#04041C] text-white pt-12 sm:pt-16 pb-32 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* GRID PRINCIPAL: Pasamos a 12 columnas para un control exacto de los anchos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 items-start">

          {/* 1. Logo (Ocupa 2 columnas) */}
          <div className="flex flex-col items-center lg:items-start lg:col-span-2 w-full min-w-0">
            <div className="max-w-[180px] md:max-w-[220px] lg:max-w-[240px] w-full">
              <LogoBlock />
            </div>

            <div className="md:hidden mt-8">
              <SocialLinks />
            </div>
          </div>

          {/* 2. Enlaces (Ocupa 2 columnas) */}
          <div className="hidden lg:block lg:col-span-2 w-full min-w-0">
            <NavMenuFooter/>
          </div>

          {/* 3. Dirección y Horario (Ocupa 4 columnas) */}
          <div className="lg:col-span-4 w-full min-w-0">
            <AddressBlock />
          </div>

          {/* 4. Contacto (Ocupa 2 columnas) */}
          <div className="flex flex-col gap-6 lg:col-span-3 w-full min-w-0">
            <ContactBlock phone={phone}  />
          </div>

        </div>

        {/* Enlaces legales abajo */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-evenly items-center gap-4 sm:gap-6 md:gap-8 mt-12 sm:mt-14 text-base text-white w-full">
          <LegalLinksBlock />
        </div>

      </div>
    </footer>
  );
}
