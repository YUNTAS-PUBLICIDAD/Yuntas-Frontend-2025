import LogoBlock from "@/components/molecules/footer/LogoBlock";
import AddressBlock from "@/components/molecules/footer/AddressBlock";
import ContactBlock from "@/components/molecules/footer/ContactBlock";
import SocialLinks from "@/components/molecules/footer/SocialLinks";

export default function Footer() {
  return (
    <footer className="bg-[#04041C] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-12 md:flex-row md:items-start md:justify-center md:gap-x-24 lg:gap-x-40">

        {/* Logo and Mobile Header */}
        <div className="flex flex-col items-center w-full md:w-auto gap-8">
          <LogoBlock />
          <div className="w-full h-[2px] bg-[#6DE1E3] md:hidden"></div>
          <div className="md:hidden">
            <SocialLinks />
          </div>
        </div>

        {/* Dirección & Horario */}
        <div className="w-full md:w-auto">
          <AddressBlock />
        </div>

        {/* Contacto & Desktop Social Links */}
        <div className="w-full md:w-auto">
          <ContactBlock />
        </div>
      </div>
    </footer>
  );
}
