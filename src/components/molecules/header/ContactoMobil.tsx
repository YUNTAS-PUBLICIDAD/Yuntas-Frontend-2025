import Icon from "@/components/atoms/Icon";
import {
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import Text from "@/components/atoms/Text";

type ContactoMobilProps = {
  compact?: boolean;
};

const ContactoMobil = ({ compact = false }: ContactoMobilProps) => {
  // URLs centralizadas
  const links = {
    instagram: "https://www.instagram.com/yuntaspublicidad/",
    facebook: "https://www.facebook.com/YuntasProducciones/",
    tiktok: "https://www.tiktok.com/@yuntaspublicidad",
    youtube: "https://www.youtube.com/@yuntaspublicidad",
    whatsapp: "https://wa.me/51912849782",
  };

  if (compact) {
    return (
      <div className="flex items-center gap-0 justify-start">
        <Icon
          href={links.instagram}
          target="_blank"
          label="Instagram"
          size="lg"
          bgColor="bg-transparent"
          className="p-0 w-auto h-auto min-w-0"
        >
          <FaInstagram className="text-xl" />
        </Icon>

        <Icon
          href={links.facebook}
          target="_blank"
          label="Facebook"
          size="lg"
          bgColor="bg-transparent"
          className="p-0 w-auto h-auto min-w-0"
        >
          <FaFacebook className="text-xl" />
        </Icon>

        <Icon
          href={links.tiktok}
          target="_blank"
          label="TikTok"
          size="lg"
          bgColor="bg-transparent"
          className="p-0 w-auto h-auto min-w-0"
        >
          <FaTiktok className="text-xl" />
        </Icon>

        <Icon
          href={links.youtube}
          target="_blank"
          label="YouTube"
          size="lg"
          bgColor="bg-transparent"
          className="p-0 w-auto h-auto min-w-0"
        >
          <FaYoutube className="text-xl" />
        </Icon>

        <Icon
          href={links.whatsapp}
          target="_blank"
          label="WhatsApp"
          size="lg"
          bgColor="bg-transparent"
          className="p-0 w-auto h-auto min-w-0"
        >
          <FaWhatsapp className="text-xl" />
        </Icon>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-x-5">
      <div className="flex items-center">
        <Icon
          href={links.instagram}
          target="_blank"
          label="Instagram"
          size="lg"
          bgColor="bg-transparent"
          className="p-0 w-auto h-auto min-w-0"
        >
          <FaInstagram className="text-2xl" />
        </Icon>
        <Text variant="body" color="white">Yuntas Producciones</Text>
      </div>

      <div className="flex items-center">
        <Icon
          href={links.whatsapp}
          target="_blank"
          label="WhatsApp"
          size="lg"
          bgColor="bg-transparent"
          className="p-0 w-auto h-auto min-w-0"
        >
          <FaWhatsapp className="text-2xl" />
        </Icon>
        <Text variant="body" color="white">+51 912 849 782</Text>
      </div>

      <div className="flex items-center">
        <Icon
          href={links.facebook}
          target="_blank"
          label="Facebook"
          size="lg"
          bgColor="bg-transparent"
          className="p-0 w-auto h-auto min-w-0"
        >
          <FaFacebook className="text-2xl" />
        </Icon>
        <Text variant="body" color="white">Yuntas Producciones</Text>
      </div>

      <div className="flex items-center">
        <Icon
          href={links.tiktok}
          target="_blank"
          label="TikTok"
          size="lg"
          bgColor="bg-transparent"
          className="p-0 w-auto h-auto min-w-0"
        >
          <FaTiktok className="text-2xl" />
        </Icon>
        <Text variant="body" color="white">Yuntas Producciones</Text>
      </div>

      <div className="flex items-center">
        <Icon
          href={links.youtube}
          target="_blank"
          label="YouTube"
          size="lg"
          bgColor="bg-transparent"
          className="p-0 w-auto h-auto min-w-0"
        >
          <FaYoutube className="text-2xl" />
        </Icon>
        <Text variant="body" color="white">Yuntas Producciones</Text>
      </div>
    </div>
  );
};

export default ContactoMobil;