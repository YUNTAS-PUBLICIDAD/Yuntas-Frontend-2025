"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

type SocialItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
  bgClass: string;
};

export const FloatingSocialBar = () => {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const message = "Hola Yuntas, quisiera mas informacion sobre sus servicios.";

  const socialItems: SocialItem[] = [
    {
      href: "https://www.instagram.com/yuntaspublicidad/",
      label: "Instagram",
      icon: <FaInstagram className="h-5 w-5" />,
      bgClass: "bg-[#E4405F]",
    },
    {
      href: "https://www.facebook.com/YuntasProducciones/",
      label: "Facebook",
      icon: <FaFacebook className="h-5 w-5" />,
      bgClass: "bg-[#1877F2]",
    },
    {
      href: "https://www.tiktok.com/@yuntaspublicidad",
      label: "TikTok",
      icon: <FaTiktok className="h-5 w-5" />,
      bgClass: "bg-black",
    },
    {
      href: "https://www.youtube.com/@yuntaspublicidad",
      label: "YouTube",
      icon: <FaYoutube className="h-5 w-5" />,
      bgClass: "bg-[#FF0000]",
    },
  ];

  if (phoneNumber) {
    socialItems.unshift({
      href: `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      label: "WhatsApp",
      icon: <FaWhatsapp className="h-5 w-5" />,
      bgClass: "bg-[#25D366]",
    });
  }

  return (
    <aside className="fixed top-1/2 -translate-y-1/2 z-50">
      <div className="flex flex-col gap-2 rounded-r-2xl bg-black/40 p-2 backdrop-blur-sm">
        {socialItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ir a ${item.label}`}
            className={`flex h-10 w-10 items-center justify-center rounded-full text-white shadow-lg transition-transform duration-200 hover:scale-110 ${item.bgClass}`}
          >
            {item.icon}
          </Link>
        ))}
      </div>
    </aside>
  );
};
