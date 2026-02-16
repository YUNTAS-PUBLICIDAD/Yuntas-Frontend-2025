import React from "react";
import Icon from "@/components/atoms/Icon";
import { FaInstagram, FaFacebook, FaTiktok, FaYoutube } from "react-icons/fa";

const SocialLinks = () => {
    
    const customSize = 40; 

    return (
        <div className="flex gap-4 justify-center md:justify-start">
            <Icon
                href="https://www.instagram.com/yuntaspublicidad/"
                target="_blank"
                label="Instagram"
                size={customSize} 
                bgColor="bg-transparent"
            >
                <FaInstagram className="text-2xl text-white" />
            </Icon>

            <Icon
                href="https://www.facebook.com/YuntasProducciones/"
                target="_blank"
                label="Facebook"
                size={customSize}
                bgColor="bg-transparent"
            >
                <FaFacebook className="text-2xl text-white" />
            </Icon>

            <Icon
                href="https://www.tiktok.com/@yuntaspublicidad"
                target="_blank"
                label="TikTok"
                size={customSize}
                bgColor="bg-transparent"
            >
                <FaTiktok className="text-2xl text-white" />
            </Icon>

            <Icon
                href="https://www.youtube.com/@yuntaspublicidad"
                target="_blank"
                label="YouTube"
                size={customSize}
                bgColor="bg-transparent"
            >
                <FaYoutube className="text-2xl text-white" />
            </Icon>
        </div>
    );
};

export default SocialLinks;