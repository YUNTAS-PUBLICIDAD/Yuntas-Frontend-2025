import LogoBlock from "@/components/molecules/footer/LogoBlock";
import AddressBlock from "@/components/molecules/footer/AddressBlock";
import ContactBlock from "@/components/molecules/footer/ContactBlock";

export default function Footer() {
  return (
    <footer className="bg-[#0B0B1F] text-white py-8 px-8 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="flex md:w-auto items-center justify-center min-h-[220px] min-w-[80]">
          <LogoBlock />
        </div>
        <AddressBlock />
        <ContactBlock />
      </div>
    </footer>
  );
}
