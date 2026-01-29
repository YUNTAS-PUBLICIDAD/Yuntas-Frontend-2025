import React from "react";
import Icon from "@/components/atoms/Icon";
import { FaInstagram, FaFacebook, FaTiktok, FaYoutube } from "react-icons/fa";

const SocialLinks = () => {
    return (
        <div className="flex gap-4 justify-center md:justify-start">
            <Icon
                href="https://www.instagram.com/yuntaspublicidad/"
                target="_blank"
                label="Instagram"
                size="md"
                bgColor="bg-transparent"
            >
                <FaInstagram className="text-3xl text-white" />
            </Icon>

            <Icon
                href="https://www.facebook.com/kp.yuntas.1/"
                target="_blank"
                label="Facebook"
                size="md"
                bgColor="bg-transparent"
            >
                <FaFacebook className="text-3xl text-white" />
            </Icon>

            <Icon
                href="https://www.tiktok.com/@yuntaspublicidad"
                target="_blank"
                label="TikTok"
                size="md"
                bgColor="bg-transparent"
            >
                <FaTiktok className="text-3xl text-white" />
            </Icon>

            <Icon
                href="https://www.youtube.com/@yuntaspublicidad"
                target="_blank"
                label="YouTube"
                size="md"
                bgColor="bg-transparent"
            >
                <FaYoutube className="text-3xl text-white" />
            </Icon>
        </div>
    );
};

export default SocialLinks;
