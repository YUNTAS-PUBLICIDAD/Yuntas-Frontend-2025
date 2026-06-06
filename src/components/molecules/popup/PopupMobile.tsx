// PopupMobile.tsx
import React from "react";
import { PopupBaseProps } from "./types";
import { FiImage } from 'react-icons/fi';

const hasImageSrc = (src?: string) => Boolean(src && src.trim().length > 0);

const Placeholder = ({ title }: { title?: string }) => (
  <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 text-slate-400">
    <div className="rounded-full bg-white/80 p-4 shadow-sm">
      <FiImage className="text-4xl" aria-hidden="true" />
    </div>
    <div className="text-center px-4">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Imagen no disponible</p>
      {title && <p className="mt-1 text-xs text-slate-400 truncate">{title}</p>}
    </div>
  </div>
);

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

      {hasImageSrc(img) ? (
        <img src={img} alt={imgAlt} className="absolute w-full h-full object-cover" />
      ) : (
        <div className="absolute w-full h-full"><Placeholder title={title} /></div>
      )}
      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute bottom-0 p-4 text-white">
        <h3 className="font-bold">{title}</h3>
        {children}
      </div>
    </div>
  );
};
