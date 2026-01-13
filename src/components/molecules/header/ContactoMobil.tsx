import Icon from "@/components/atoms/Icon";
import {
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaYoutube,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import Text from "@/components/atoms/Text";

type ContactoMobilProps = {
  compact?: boolean;
};

const ContactoMobil = ({ compact = false }: ContactoMobilProps) => {
  if (compact) {
    return (
      <div className="flex items-center gap-0 justify-start">
        <Icon
          href="https://www.instagram.com/yuntaspublicidad/"
          label="Instagram"
          size="lg"
          bgColor="bg-transparent"
          className="p-0 w-auto h-auto min-w-0"
        >
          <FaInstagram className="text-xl" />
        </Icon>

        <Icon
          href="https://www.facebook.com/kp.yuntas.1/"
          label="Facebook"
          size="lg"
          bgColor="bg-transparent"
          className="p-0 w-auto h-auto min-w-0"
        >
          <FaFacebook className="text-xl" />
        </Icon>

        <Icon
          href="https://www.tiktok.com/@yuntaspublicidad"
          label="TikTok"
          size="lg"
          bgColor="bg-transparent"
          className="p-0 w-auto h-auto min-w-0"
        >
          <FaTiktok className="text-xl" />
        </Icon>

        <Icon
          href="https://www.youtube.com/@yuntaspublicidad"
          label="YouTube"
          size="lg"
          bgColor="bg-transparent"
          className="p-0 w-auto h-auto min-w-0"
        >
          <FaYoutube className="text-xl" />
        </Icon>

        <Icon
          href="https://wa.me/51912849782"
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
          href=""
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
          href=""
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
          href=""
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
          href=""
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
          href=""
          label="YouTube"
          size="lg"
          bgColor="bg-transparent"
          className="p-0 w-auto h-auto min-w-0"
        >
          <FaYoutube className="text-2xl" />
        </Icon>
        <Text variant="body" color="white">Yuntas Producciones</Text>
      </div>

      <div className="flex items-center">
        <Icon
          href=""
          label="LinkedIn"
          size="lg"
          bgColor="bg-transparent"
          className="p-0 w-auto h-auto min-w-0"
        >
          <FaLinkedin className="text-2xl" />
        </Icon>
        <Text variant="body" color="white">Yuntas Producciones</Text>
      </div>
    </div>
  );
};

export default ContactoMobil;