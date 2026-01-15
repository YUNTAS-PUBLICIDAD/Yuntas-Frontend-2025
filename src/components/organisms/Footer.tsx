import LogoBlock from "@/components/molecules/footer/LogoBlock";
import AddressBlock from "@/components/molecules/footer/AddressBlock";
import ContactBlock from "@/components/molecules/footer/ContactBlock";

export default function Footer() {
  return (
    <footer className="bg-[#0B0B1F] text-white py-10 px-6">
      <div
        className="
          max-w-6xl mx-auto
          flex flex-col items-center text-center
          gap-10
          md:flex-row md:items-start md:justify-between md:text-left
        "
      >
        {/* Logo */}
        <div className="flex justify-center md:justify-start w-full md:w-auto">
          <LogoBlock />
        </div>

        {/* Dirección */}
        <div className="w-full md:w-auto flex justify-center">
          <AddressBlock />
        </div>

        {/* Contacto */}
        <div className="w-full md:w-auto flex justify-center">
          <ContactBlock />
        </div>
      </div>
    </footer>
  );
}
