import React from "react";
import Icon from "@/components/atoms/Icon";
import { FaInstagram, FaFacebook, FaTiktok, FaYoutube } from "react-icons/fa";
import {ROUTES} from "@/config/routes";

const SocialLinks = () => {
      const customSize = 40;
  return (
    <div className="flex gap-4 justify-center md:justify-start">
      <a
        href={ROUTES.SOCIAL.INSTAGRAM}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white"
      >
        <FaInstagram size={28} />
      </a>

      <a
        href={ROUTES.SOCIAL.FACEBOOK}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white"
      >
        <FaFacebook size={28} />
      </a>

      <a
        href={ROUTES.SOCIAL.TIKTOK}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white"
      >
        <FaTiktok size={28} />
      </a>

      <a
        href={ROUTES.SOCIAL.YOUTUBE}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white"
      >
        <FaYoutube size={28} />
      </a>
    </div>
  );
};
export default SocialLinks;
