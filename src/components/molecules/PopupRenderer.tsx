import React from "react";
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
  buttonColor: string;
  isSubmitting: boolean;
  forceVisible?: boolean;
}

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
  isSubmitting,
  forceVisible = false,
}: PopupLayoutProps) => {
  return (
    <div className={`${forceVisible ? "grid" : "hidden md:grid"} grid-cols-[317px_355px] w-[672px] h-[520px] rounded-2xl overflow-hidden`}>
      {/* LEFT IMAGE */}
      <div className="relative w-full h-full">
        <img
          src={desktopImgSrc || '/images/placeholder.png'}
          alt={imgAlt || "Imagen de muestra"}
          className="w-full h-full object-cover"
          // className={`w-full h-full ${desktopImgSrc ? 'object-cover' : 'object-contain p-4 opacity-40'}`}
        />
        {/*overlay sutil marca*/}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a3a]/40 to-transparent"></div>
      </div>

      {/* RIGHT CONTENT*/}
      <div className="relative w-full h-full">
        {/*Imagen de fondo*/}
        <img
          src={textImgSrc || '/images/placeholder.png'}
          alt="Banner promocional"
          // className={`absolute inset-0 w-full h-full ${textImgSrc ? 'object-cover' : 'object-contain p-6 opacity-20'}`}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a3a]/40 to-transparent"></div>
        {/*Capa profesional*/}
        <div className="relative w-full h-full flex flex-col justify-end p-6">

        {/*{!textImgSrc && (
          <div className="absolute inset-0 flex items-start justify-center pt-10 px-6 z-10">
            <h4 className="text-[26px] font-extrabold text-gray-700 uppercase leading-none tracking-tight text-center">
              {title}
            </h4>
          </div>
        )}*/}
        {/*TITLE*/}
        {/*<div>
          <h4 className="text-xl md:text-2xl font-black text-gray-800 uppercase leading-tight">
            {title}
          </h4>
           <div className="w-12 h-[3px] bg-[#6DE1E3] mt-2 rounded-full" />
        </div>*/}

        {/*<div className="absolute bottom-0 left-0 right-0 h-[40%] px-5 pb-5 pt-3 backdrop-blur-[1px] z-20">*/}
          <PopupForm
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            buttonText={buttonText}
            isSubmitting={isSubmitting}
            buttonColor={buttonColor}
          />
        {/*</div>*/}
        </div>
        {/*Titulo opcional*/}
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
  isSubmitting,
  forceVisible = false,
}: PopupLayoutProps) => {

  const finalMobileImg = mobileImgSrc || desktopImgSrc || '/images/placeholder.png';
  const isPlaceholder = !mobileImgSrc && !desktopImgSrc;

  return (
    <div className={forceVisible ? "w-[90vw] max-w-[340px] h-[600px] relative overflow-hidden rounded-[2rem]" : "md:hidden w-[90vw] max-w-[340px] h-[600px] relative overflow-hidden rounded-[2rem]"}>

      <img
        src={finalMobileImg}
        alt={imgAlt || "Imagen móvil"}
        className={`absolute inset-0 w-full h-full object-cover`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

      {isPlaceholder && (
        <div className="absolute top-6 left-4 right-4 h-[65%] flex items-start justify-center text-center z-10">
          <h4 className="text-xl font-bold text-gray-700 leading-tight">{title}</h4>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-3  z-20">
        <div className="bg-black/40 backdrop-blur-md rounded-xl p-3">
        <PopupForm
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          buttonText={buttonText}
          isSubmitting={isSubmitting}
          buttonColor={buttonColor}
        />
        </div>
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
  isSubmitting,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={withBackdrop
        ? `fixed inset-0  flex items-center justify-center z-50 p-4  backdrop-blur-sm transition-opacity duration-300 ease-out ${closing ? "opacity-0" : "opacity-100"} bg-black/50`
        : `w-full h-full flex items-center justify-center p-4 ${wrapperClassName}`
      }
    >
      <div
        style={popupStyle}
        // className={`relative bg-transparent shadow-lg overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.92,1,0.36,1)] transform ${closing ? "opacity-0 translate-y-6 scale-[0.96]" : "opacity-100 translate-y-0 scale-100"} ${muted ? "opacity-40 grayscale-[50%]" : "opacity-100"} rounded-xl ${popupClassName}`}
        className={`
          relative bg-transparent shadow-xl overflow-hidden rounded-xl will-change-transform
          transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]

          ${closing
            ? "opacity-0 translate-y-8 scale-95"
            : "opacity-100 translate-y-0 scale-100"}

          ${muted ? "opacity-40 grayscale-[50%]" : ""}
          ${popupClassName}
        `}
      >
        {showCloseButton && (
          <CloseButton onClick={onClose} className="absolute top-2 right-2 md:top-3 md:right-3 z-50" />
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
          />
        )}
      </div>
    </div>
  );
};

export default PopupRenderer;
