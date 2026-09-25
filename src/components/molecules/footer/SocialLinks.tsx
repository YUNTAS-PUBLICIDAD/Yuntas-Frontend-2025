import React from "react";
import Icon from "@/components/atoms/Icon";
import { FaInstagram, FaFacebook, FaTiktok, FaYoutube } from "react-icons/fa";
import { useSettingsContext } from "@/providers/SettingsProvider";

const SocialLinks: React.FC = () => {
   
    const { settings } = useSettingsContext();
    
    const customSize = 40;

    
    const iconMap: Record<string, React.ReactNode> = {
        instagram: <FaInstagram className="text-2xl text-white" />,
        facebook: <FaFacebook className="text-2xl text-white" />,
        tiktok: <FaTiktok className="text-2xl text-white" />,
        youtube: <FaYoutube className="text-2xl text-white" />,
    };

    const apiLinks: Array<{ platform: string; url: string }> | null | undefined = settings?.contact?.social_links;
    
    const links = (apiLinks && apiLinks.length > 0) ? apiLinks : [
        { platform: "instagram", url: "https://www.instagram.com/yuntaspublicidad/" },
        { platform: "facebook", url: "https://www.facebook.com/YuntasProducciones/" },
        { platform: "tiktok", url: "https://www.tiktok.com/@yuntaspublicidad" },
        { platform: "youtube", url: "https://www.youtube.com/@yuntaspublicidad" },
    ];

    return (
        <div className="flex gap-4 justify-center md:justify-start flex-wrap">
            {links.map((item: { platform: string; url: string }) => {
                const normalizedPlatform = item.platform.toLowerCase();
                const IconComponent = iconMap[normalizedPlatform];

                
                if (!item.url || !IconComponent) return null;

                return (
                    <Icon
                        key={normalizedPlatform}
                        href={item.url}
                        target="_blank"
                        label={item.platform}
                        size={customSize}
                        bgColor="bg-transparent"
                    >
                        {IconComponent}
                    </Icon>
                );
            })}
        </div>
    );
};

export default SocialLinks;
