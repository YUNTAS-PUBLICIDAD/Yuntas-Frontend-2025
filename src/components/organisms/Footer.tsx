import LogoBlock from "@/components/molecules/footer/LogoBlock";
import AddressBlock from "@/components/molecules/footer/AddressBlock";
import LegalLinksBlock from "@/components/molecules/footer/LegalLinksBlock";
import ContactBlock from "@/components/molecules/footer/ContactBlock";
import SocialLinks from "@/components/molecules/footer/SocialLinks";
import NavMenu from "@/components/molecules/header/NavMenu";

export default function Footer() {
  return (
    <footer className="bg-[#04041C] text-white pt-16 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
{/* GRID PRINCIPAL */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-start">

{/* Logo + Menú vertical */}
<div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16">

  {/* Logo */}
  <LogoBlock />
{/* Menú vertical solo desktop */}
<div className="hidden lg:block lg:ml-12 lg:pl-10 lg:border-l lg:border-l-2">
  <NavMenu size="sm" variant="footer" />
</div>

    {/* Redes solo en mobile */}
    <div className="md:hidden">
      <SocialLinks />
    </div>

  </div>

  {/* Dirección y Horario */}
 <div className="lg:ml-6">
    <AddressBlock />
  </div>

  {/* Contacto */}
  <div className="flex flex-col gap-6 lg:ml-6">
    <ContactBlock />
  </div>

</div>


        {/* Enlaces legales abajo */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 md:gap-y-0 items-center mt-14 text-base text-white">
          <LegalLinksBlock />
        </div>

      </div>
    </footer>
  );
}