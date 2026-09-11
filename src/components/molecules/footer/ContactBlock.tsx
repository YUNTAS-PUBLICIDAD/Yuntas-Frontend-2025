import { MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import SocialLinks from "./SocialLinks";

interface ContactBlockProps {
  phone?: string | null;
}

const ContactBlock = ({ phone }: ContactBlockProps) => {
  const cleanPhone = phone?.replace(/\D/g, "") || "";

   const whatsappPhone = cleanPhone.startsWith("51")
    ? cleanPhone
    : `51${cleanPhone}`;

  return (
    <div className="flex flex-col gap-4 text-center md:text-left items-center md:items-start">
      <span className="font-bold text-brand-cyan text-xl tracking-wide inline-block">
        Contacto
      </span>

      {phone && (
        <a
          href={`https://wa.me/${whatsappPhone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-[#25D366] transition-colors"
          aria-label="Chatear por WhatsApp"
        >
          <FaWhatsapp className="text-2xl text-white" />
          <span className="text-lg">{phone}</span>
        </a>
      )}


    <a
      href="mailto:yuntasproducciones@gmail.com"
      className="flex items-center gap-2 hover:text-brand-cyan transition-colors max-w-full group"
      aria-label="Enviar correo electrónico"
    >
      <MdEmail className="text-xl sm:text-2xl text-white shrink-0 group-hover:text-brand-cyan transition-colors" />
      <span className="text-base min-[340px]:text-base sm:text-base lg:text-sm xl:text-base break-words">
        yuntasproducciones@gmail.com
      </span>
    </a>

    {/* Desktop Social Links */}
    <div className="hidden md:block mt-2">
      <SocialLinks />
    </div>
  </div>
);
}
export default ContactBlock;
