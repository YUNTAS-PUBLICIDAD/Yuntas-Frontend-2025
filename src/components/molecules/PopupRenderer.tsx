import React, { useState, useEffect } from "react";
import CloseButton from "@/components/atoms/CloseButton";
import PopupForm from "@/components/molecules/producto/PopUp/PopupForm";
import { LeadInput } from "@/types/admin/lead";

interface PopupLayoutProps {
  desktopImgSrc: string;
  textImgSrc?: string;
  mobileImgSrc?: string;
  imgAlt: string;
  title: string;
  formData: LeadInput;
  errors: Record<string, string>;
  handleChange: (field: string, value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  buttonText: string;
  buttonTextColor?: string;
  buttonColor?: string;
  isSubmitting: boolean;
  forceVisible?: boolean;

}

import { FiImage } from 'react-icons/fi';

const hasImageSrc = (src?: string) => Boolean(src && src.trim().length > 0);

const ImageFallback = ({ className, title }: { className?: string; title?: string }) => (
  <div className={`${className || ''} flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 text-slate-400`}> 
    <div className="rounded-full bg-white/80 p-4 shadow-sm">
      <FiImage className="text-4xl" aria-hidden="true" />
    </div>
    <div className="text-center px-4">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Imagen no disponible</p>
      {title && <p className="mt-1 text-xs text-slate-400 truncate">{title}</p>}
    </div>
  </div>
);

interface PopupRendererProps extends Omit<PopupLayoutProps, "forceVisible"> {
  isOpen: boolean;
  closing?: boolean;
  onClose?: () => void;
  withBackdrop?: boolean;
  showCloseButton?: boolean;
  previewDevice?: "auto" | "desktop" | "mobile";
  muted?: boolean;
  wrapperClassName?: string;
  popupClassName?: string;
  popupStyle?: React.CSSProperties;
}

const DesktopPopupComposition = ({
  desktopImgSrc,
  textImgSrc,
  imgAlt,
  title,
  formData,
  errors,
  handleChange,
  handleSubmit,
  buttonText,
  buttonColor,
  buttonTextColor,
  isSubmitting,
  forceVisible = false,
}: PopupLayoutProps) => {
  return (
    <div className={`${forceVisible ? "grid" : "hidden md:grid"} relative grid-cols-2 w-[672px] aspect-[672/535] rounded-2xl overflow-hidden`}>
      {/* LEFT IMAGE */}
      <div className="w-full h-full">
        {hasImageSrc(desktopImgSrc) ? (
          <img
            src={desktopImgSrc}
            alt={imgAlt || "Imagen de muestra"}
            className="w-full h-full object-cover"
          />
        ) : (
          <ImageFallback className="w-full h-full" title={title} />
        )}
        {/*overlay sutil marca*/}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a3a]/40 to-transparent"></div> */}
      </div>

      {/* RIGHT CONTENT*/}
      <div className="relative w-full h-full">
        {/*Imagen de fondo*/}
        {hasImageSrc(textImgSrc) ? (
          <img
            src={textImgSrc}
            alt="Banner promocional"
            className="w-full h-full object-cover"
          />
        ) : (
            <ImageFallback className="h-full w-full" title={title} />
        )}

        {/* <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0a1a3a]/40 to-transparent"></div> */}
        {/*Capa profesional*/}
        <div className="absolute bottom-0 h-[239px] w-full px-[31px] pb-16">
          <PopupForm
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            buttonText={buttonText}
            isSubmitting={isSubmitting}
            buttonColor={buttonColor}
            buttonTextColor={buttonTextColor}
              />
        </div>
      </div>
    </div>
  );
};

const MobilePopupComposition = ({
  desktopImgSrc,
  mobileImgSrc,
  imgAlt,
  title,
  formData,
  errors,
  handleChange,
  handleSubmit,
  buttonText,
  buttonColor,
  buttonTextColor,
  isSubmitting,
  forceVisible = false,
}: PopupLayoutProps) => {

  const finalMobileImg = mobileImgSrc || desktopImgSrc;
  const isPlaceholder = !hasImageSrc(mobileImgSrc) && !hasImageSrc(desktopImgSrc);

  return (
    <div className={`${forceVisible ? "" : "md:hidden"} w-[320px] aspect-[320/603]  relative overflow-hidden rounded-[2rem]`}>

      {hasImageSrc(finalMobileImg) ? (
        <img
          src={finalMobileImg}
          alt={imgAlt || "Imagen móvil"}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <ImageFallback className="absolute inset-0 w-full h-full" title={title} />
      )}

      {isPlaceholder && (
        <div className="absolute top-6 left-4 right-4 h-[65%] flex items-start justify-center text-center z-10">
          <h4 className="text-xl font-bold text-gray-700 leading-tight">{title}</h4>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 px-[25px] md:px-8 pb-[23px] md:pb-4 md:pt-3 z-20 bg-transparent">
        <PopupForm
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          buttonText={buttonText}
          isSubmitting={isSubmitting}
          buttonColor={buttonColor}
          buttonTextColor={buttonTextColor}
        />
      </div>
    </div>
  );
};

const PopupRenderer: React.FC<PopupRendererProps> = ({
  isOpen,
  closing = false,
  onClose,
  withBackdrop = true,
  showCloseButton = true,
  previewDevice = "auto",
  muted = false,
  wrapperClassName = "",
  popupClassName = "",
  popupStyle,
  desktopImgSrc,
  textImgSrc,
  mobileImgSrc,
  imgAlt,
  title,
  formData,
  errors,
  handleChange,
  handleSubmit,
  buttonText,
  buttonColor,
  buttonTextColor,
  isSubmitting,
}) => {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const id = requestAnimationFrame(() => setEntered(true));
    return () => {
      cancelAnimationFrame(id);
      setEntered(false);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={withBackdrop
        ? `fixed inset-0  flex items-center justify-center z-50 backdrop-blur-sm transition-opacity duration-300 ease-out ${closing ? "opacity-0" : "opacity-100"} bg-black/50`
        : `w-full h-full flex items-center justify-center p-4 ${wrapperClassName}`
      }
    >
      <div
        style={popupStyle}
        // className={`relative bg-transparent shadow-lg overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.92,1,0.36,1)] transform ${closing ? "opacity-0 translate-y-6 scale-[0.96]" : "opacity-100 translate-y-0 scale-100"} ${muted ? "opacity-40 grayscale-[50%]" : "opacity-100"} rounded-xl ${popupClassName}`}
        className={`
          relative bg-transparent overflow-hidden will-change-transform
          transform transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]

          ${closing
            ? "opacity-0 translate-y-6 scale-95 blur-[1px]"
            : entered
              ? "opacity-100 translate-y-0 scale-100 blur-0"
              : "opacity-0 translate-y-6 scale-95 blur-[1px]"}
          ${muted ? "opacity-40 grayscale-[50%]" : ""}
          ${popupClassName}
        `}
      >
        {showCloseButton && (
          <CloseButton onClick={onClose} className="absolute top-[10px] right-[15px] md:top-3 md:right-3 z-50" />
        )}

        {previewDevice !== "mobile" && (
          <DesktopPopupComposition
            desktopImgSrc={desktopImgSrc}
            textImgSrc={textImgSrc}
            mobileImgSrc={mobileImgSrc}
            imgAlt={imgAlt}
            title={title}
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            buttonText={buttonText}
            buttonColor={buttonColor}
            isSubmitting={isSubmitting}
            forceVisible={previewDevice === "desktop"}
            buttonTextColor={buttonTextColor}
          />
        )}

        {previewDevice !== "desktop" && (
          <MobilePopupComposition
            desktopImgSrc={desktopImgSrc}
            textImgSrc={textImgSrc}
            mobileImgSrc={mobileImgSrc}
            imgAlt={imgAlt}
            title={title}
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            buttonText={buttonText}
            buttonColor={buttonColor}
            isSubmitting={isSubmitting}
            forceVisible={previewDevice === "mobile"}
            buttonTextColor={buttonTextColor}
          />
        )}
      </div>
    </div>
  );
};

export default PopupRenderer;
