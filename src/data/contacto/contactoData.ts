import { RiMailFill, RiMapPinFill } from "react-icons/ri";
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp, FaYoutube } from "react-icons/fa";

export const contactoInfoData = [
    {
        text: "+51 912 849 782",
        icon: FaWhatsapp,
        ariaLabel: "WhatsApp",
    },
    {
        text: "yuntasproducciones@gmail.com",
        icon: RiMailFill,
        ariaLabel: "Correo electrónico",
    },
    {
        text: "Urb. Alameda La Rivera Mz F Lt 30",
        icon: RiMapPinFill,
        ariaLabel: "Dirección",
    },
];

export const contactoSocialLinks = [
    {
        href: "https://www.instagram.com/yuntaspublicidad/",
        label: "Instagram",
        icon: FaInstagram,
    },
    {
        href: "https://www.facebook.com/YuntasProducciones/",
        label: "Facebook",
        icon: FaFacebook,
    },
    {
        href: "https://www.tiktok.com/@yuntaspublicidad",
        label: "TikTok",
        icon: FaTiktok,
    },
    {
        href: "https://www.youtube.com/@yuntaspublicidad",
        label: "YouTube",
        icon: FaYoutube,
    },
];