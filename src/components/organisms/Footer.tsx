import LogoBlock from "@/components/molecules/footer/LogoBlock";
import AddressBlock from "@/components/molecules/footer/AddressBlock";
import LegalLinksBlock from "@/components/molecules/footer/LegalLinksBlock";
import ContactBlock from "@/components/molecules/footer/ContactBlock";
import SocialLinks from "@/components/molecules/footer/SocialLinks";
import NavMenu from "@/components/molecules/header/NavMenu";
import MenuItem from "../atoms/MenuItem";
import NavMenuFooter from "../molecules/footer/NavMenuFooter";

export default function Footer() {
  return (
    <footer className="bg-[#04041C] text-white pt-16 pb-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* GRID PRINCIPAL: Pasamos a 12 columnas para un control exacto de los anchos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 items-start">

          {/* 1. Logo (Ocupa 2 columnas) */}
          <div className="flex flex-col items-center lg:items-start lg:col-span-2 w-full min-w-0">
            <div className="max-w-[180px] md:max-w-[220px] lg:max-w-[240px] w-full">
            <LogoBlock />
            </div>
            <div className="md:hidden mt-8">
              <SocialLinks />
            </div>
          </div>

          {/* 2. Enlaces (Ocupa 3 columnas. Ya no está agrupado con el logo, por eso se mueve a la izquierda) */}
          <div className="hidden lg:block lg:col-span-3 w-full">
            {/*<NavMenu size="sm" variant="footer" />*/}
            <NavMenuFooter/>
          </div>

          {/* 3. Dirección y Horario (Ocupa 4 columnas para que el texto largo no asfixie a Contacto) */}
          <div className="lg:col-span-4 w-full">
            <AddressBlock />
          </div>

          {/* 4. Contacto (Ocupa 2 columnas) */}
          <div className="flex flex-col gap-6 lg:col-span-3 w-full min-w-0">
            <ContactBlock />
          </div>

        </div>

        {/* Enlaces legales abajo */}
        <div className="flex flex-col md:flex-row justify-evenly items-center mt-14 text-base text-white w-full">
          <LegalLinksBlock />
        </div>

      </div>
    </footer>
  );
}
