import React from "react";
import { PopupBaseProps } from "./types";

export const PopupDesktop = ({
  desktopImgSrc,
  textImgSrc,
  imgAlt,
  title,
  children,
}: PopupBaseProps & { children?: React.ReactNode }) => {
  return (
    <div className="hidden md:grid grid-cols-[317px_355px] w-[672px] h-[520px] rounded-2xl overflow-hidden">

      {/* LEFT */}
      <div className="relative">
        <img src={desktopImgSrc} alt={imgAlt} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* RIGHT */}
      <div className="relative">
        <img src={textImgSrc || "/placeholder.png"} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative h-full flex flex-col justify-end p-6">
          <h3 className="text-white font-bold">{title}</h3>
          {children}
        </div>
      </div>
    </div>
  );
};
