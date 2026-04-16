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
    <div className={forceVisible ? "grid grid-cols-[271px_335px] w-[606px] h-[479px]" : "hidden md:grid md:grid-cols-[271px_335px] md:w-[606px] md:h-[479px]"}>
      <div className="w-[271px] h-[479px] overflow-hidden bg-gray-100 flex items-center justify-center">
        <img
          src={desktopImgSrc || '/images/placeholder.png'}
          alt={imgAlt || "Imagen de muestra"}
          className={`w-full h-full ${desktopImgSrc ? 'object-cover' : 'object-contain p-4 opacity-40'}`}
        />
      </div>

      <div className="w-[335px] h-[479px] relative overflow-hidden bg-white">
        <img
          src={textImgSrc || '/images/placeholder.png'}
          alt="Banner promocional"
          className={`absolute inset-0 w-full h-full ${textImgSrc ? 'object-cover' : 'object-contain p-6 opacity-20'}`}
        />

        {/* Se muestra el título si no hay flyer subido */}
        {!textImgSrc && (
          <div className="absolute inset-0 flex items-start justify-center pt-10 px-6 z-10">
            <h4 className="text-[26px] font-extrabold text-gray-700 uppercase leading-none tracking-tight text-center">
              {title}
            </h4>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 h-[40%] px-5 pb-5 pt-3 backdrop-blur-[1px] z-20">
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
    <div className={forceVisible ? "w-[260px] h-[520px] relative overflow-hidden rounded-[2rem] bg-white" : "md:hidden w-[260px] h-[520px] relative overflow-hidden rounded-[2rem] bg-white"}>

      <img
        src={finalMobileImg}
        alt={imgAlt || "Imagen móvil"}
        className={`absolute inset-0 w-full h-full ${!isPlaceholder ? 'object-cover' : 'object-contain p-6 opacity-20'}`}
      />

      {isPlaceholder && (
        <div className="absolute top-6 left-4 right-4 h-[65%] flex items-start justify-center text-center z-10">
          <h4 className="text-xl font-bold text-gray-700 leading-tight">{title}</h4>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 h-[35%] px-4 pb-4 pt-2 backdrop-blur-[1px] z-20">
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
        ? "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 transition-opacity duration-300 backdrop-blur-sm"
        : `w-full h-full flex items-center justify-center p-4 ${wrapperClassName}`
      }
    >
      <div
        style={popupStyle}
        className={`relative bg-white/95 backdrop-blur-md shadow-lg overflow-hidden transition-all duration-300 ease-in-out transform ${closing ? "opacity-0 scale-95" : "opacity-100 scale-100"} ${muted ? "opacity-40 grayscale-[50%]" : "opacity-100"} rounded-xl ${popupClassName}`}
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
