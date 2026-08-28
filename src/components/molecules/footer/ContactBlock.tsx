import { MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import SocialLinks from "./SocialLinks";

const ContactBlock = () => (
  <div className="flex flex-col gap-4 text-center md:text-left items-center md:items-start">
    <span className="font-bold text-brand-cyan text-xl tracking-wide inline-block">
      Contacto
    </span>

    <a
      href="https://wa.me/51912849782"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 hover:text-[#25D366] transition-colors"
      aria-label="Chatear por WhatsApp"
    >
      <FaWhatsapp className="text-2xl text-white" />
      <span className="text-lg">+51 912 849 782</span>
    </a>

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
