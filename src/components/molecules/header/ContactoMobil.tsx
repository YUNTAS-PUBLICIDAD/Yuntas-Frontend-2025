import Icon from "@/components/atoms/Icon";
import {
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaYoutube,
  FaLinkedin,
  FaWhatsapp
} from "react-icons/fa";
import Text from "@/components/atoms/Text";

const ContactoMobil = () => {
  return (
    <div className="flex flex-wrap gap-x-5">

      <div className="flex items-center ">
        <Icon href="#" label="Instagram" size="lg" bgColor="bg-transparent">
          <FaInstagram className="text-2xl" />
         </Icon>
        <Text variant="body" color="white">Yuntas Producciones</Text>
      </div>

      <div className="flex items-center ">
        <Icon href="" label="WhatsApp" size="lg" bgColor="bg-transparent">
          <FaWhatsapp className="text-2xl" />
        </Icon>
        <Text variant="body" color="white">+51 912 849 782</Text>
      </div>

      <div className="flex items-center ">
        <Icon href="#" label="Facebook" size="lg" bgColor="bg-transparent">
          <FaFacebook className="text-2xl" />
        </Icon>
        <Text variant="body" color="white">Yuntas Producciones</Text>
      </div>

      <div className="flex items-center ">
        <Icon href="#" label="TikTok" size="lg" bgColor="bg-transparent">
          <FaTiktok className="text-2xl" />
        </Icon>
        <Text variant="body" color="white">Yuntas Producciones</Text>
      </div>

      <div className="flex items-center ">
        <Icon href="#" label="YouTube" size="lg" bgColor="bg-transparent">
          <FaYoutube className="text-2xl" />
        </Icon>
        <Text variant="body" color="white">Yuntas Producciones</Text>
      </div>

      <div className="flex items-center ">
        <Icon href="#" label="LinkedIn" size="lg" bgColor="bg-transparent">
          <FaLinkedin className="text-2xl" />
        </Icon>
        <Text variant="body" color="white">Yuntas Producciones</Text>
      </div>

    </div>
  );
};

export default ContactoMobil;
