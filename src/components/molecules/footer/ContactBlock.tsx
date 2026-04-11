import { MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import SocialLinks from "./SocialLinks";

const ContactBlock = () => (
  <div className="flex flex-col gap-4 text-center md:text-left items-center md:items-start">
    <h3 className="font-bold text-[#6DE1E3] text-xl tracking-wide">
      Contacto
    </h3>

    <div className="flex items-center gap-2">
      <FaWhatsapp className="text-2xl text-white" />
      <span className="text-lg">+51 912 849 782</span>
    </div>

    <div className="flex items-center gap-2">
      <MdEmail className="text-2xl text-white" />
      <span className="text-lg break-all">yuntasproducciones@gmail.com</span>
    </div>

    {/* Desktop Social Links */}
    <div className="hidden md:block mt-2">
      <SocialLinks />
    </div>
  </div>
);

export default ContactBlock;
