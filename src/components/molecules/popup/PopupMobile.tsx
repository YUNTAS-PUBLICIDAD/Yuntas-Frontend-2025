// PopupMobile.tsx
import React from "react";
import { PopupBaseProps } from "./types";

export const PopupMobile = ({
  desktopImgSrc,
  mobileImgSrc,
  imgAlt,
  title,
  children,
}: PopupBaseProps & { children?: React.ReactNode }) => {
  const img = mobileImgSrc || desktopImgSrc;

  return (
    <div className="md:hidden w-[90vw] max-w-[340px] h-[600px] relative rounded-[2rem] overflow-hidden">

      <img src={img} alt={imgAlt} className="absolute w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute bottom-0 p-4 text-white">
        <h3 className="font-bold">{title}</h3>
        {children}
      </div>
    </div>
  );
};
