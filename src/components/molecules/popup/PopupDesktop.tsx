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
        {hasImageSrc(desktopImgSrc) ? (
          <img src={desktopImgSrc} alt={imgAlt} className="w-full h-full object-cover" />
        ) : (
          <Placeholder title={title} />
        )}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* RIGHT */}
      <div className="relative">
        {hasImageSrc(textImgSrc) ? (
          <img src={textImgSrc} className="absolute inset-0 w-full h-full object-cover" alt="" />
        ) : (
          <div className="absolute inset-0 w-full h-full"><Placeholder title={title} /></div>
        )}
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative h-full flex flex-col justify-end p-6">
          <h3 className="text-white font-bold">{title}</h3>
          {children}
        </div>
      </div>
    </div>
  );
};
