import Icon from "@/components/atoms/Icon";
import { FaInstagram, FaFacebook, FaTiktok, FaYoutube } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

const ContactBlock = () => (
  <div className="flex flex-col gap-2 text-left">
    <span className="font-bold">Contacto</span>

    <div className="flex items-center gap-2">
      <MdPhone className="text-xl" />
      <span>+51 912 849 782</span>
    </div>

    <div className="flex items-center gap-2">
      <MdEmail className="text-xl" />
      <span>yuntasproducciones@gmail.com</span>
    </div>

    <div className="flex gap-3 mt-2">

      <Icon href="https://www.instagram.com/yuntaspublicidad/" target="_blank" label="Instagram" size="lg" bgColor="bg-transparent">
        <FaInstagram className="text-2xl" />
      </Icon>

      <Icon href="https://www.facebook.com/kp.yuntas.1/" target="_blank" label="Facebook 1" size="lg" bgColor="bg-transparent">
        <FaFacebook className="text-2xl" />
      </Icon>

      <Icon href="https://www.tiktok.com/@yuntaspublicidad" target="_blank" label="TikTok" size="lg" bgColor="bg-transparent">
        <FaTiktok className="text-2xl" />
      </Icon>

      <Icon href="https://www.youtube.com/@yuntaspublicidad" target="_blank" label="YouTube" size="lg" bgColor="bg-transparent">

        <FaYoutube className="text-2xl" />
      </Icon>
    </div>
  </div>
);

export default ContactBlock;