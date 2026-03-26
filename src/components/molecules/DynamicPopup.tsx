'use client'

import { useState, useEffect, useRef } from "react";
import { useWhatsapp } from "@/hooks/useWhatsapp";
import { useEmail } from "@/hooks/useEmail";
import PopupForm from "@/components/molecules/producto/PopUp/PopupForm";
import CloseButton from "@/components/atoms/CloseButton";
import { LeadInput } from "@/types/admin/lead";
import { showToast } from "@/utils/showToast";
import { usePathname } from "next/navigation";

interface DynamicPopupProps {
    delay?: number;
    desktopImgSrc: string;
    textImgSrc?: string;
    mobileImgSrc?: string;
    imgAlt: string;
    title: string;
    buttonText: string;
    buttonColor?: string;
    productId?: number;
    sourceId?: number;
}

interface PopupLayoutProps {
    desktopImgSrc: string;
    textImgSrc?: string;
    mobileImgSrc?: string;
    imgAlt: string;
    title: string;
    formData: LeadInput;
    errors: Record<string, string>;
    handleChange: (field: string, value: string) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    buttonText: string;
    buttonColor: string;
    isSubmitting: boolean;
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
}: PopupLayoutProps) => {
    return (
        <div className="hidden md:grid md:grid-cols-[271px_335px] md:w-[606px] md:h-[479px]">
            <div className="w-[271px] h-[479px] overflow-hidden">
                <img src={desktopImgSrc} alt={imgAlt} className="w-full h-full object-cover" />
            </div>

            <div className="w-[335px] h-[479px] relative overflow-hidden">
                {textImgSrc ? (
                    <img src={textImgSrc} alt="Banner promocional" className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                    <div className="absolute inset-0 flex items-start justify-center pt-10 px-6">
                        <h4 className="text-[26px] font-extrabold text-gray-400 uppercase leading-none tracking-tight text-center">
                            {title}
                        </h4>
                    </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 h-[40%] px-5 pb-5 pt-3 bg-white/95 backdrop-blur-[1px]">
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
}: PopupLayoutProps) => {
    const finalMobileImg = mobileImgSrc || desktopImgSrc;

    return (
        <div className="md:hidden w-[260px] h-[520px] relative overflow-hidden rounded-[2rem] bg-white">
            <img src={finalMobileImg} alt={imgAlt} className="absolute inset-0 w-full h-full object-cover" />

            {!mobileImgSrc && (
                <div className="absolute top-6 left-4 right-4 h-[65%] flex items-start justify-center text-center">
                    <h4 className="text-lg font-bold text-gray-600 leading-tight">{title}</h4>
                </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 h-[35%] px-4 pb-4 pt-2 bg-white/95 backdrop-blur-[1px]">
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

const DynamicPopup = ({
    delay = 5000,
    desktopImgSrc,
    textImgSrc,
    mobileImgSrc,
    imgAlt,
    title,
    buttonText,
    buttonColor = "#6DE1E3",
    productId,
    sourceId = 1,
}: DynamicPopupProps) => {
    const { sendWhatsapp, isActivating: isWhatsappSending } = useWhatsapp();
    const { sendEmail, isActivating: isEmailSending } = useEmail();
    const [show, setShow] = useState(false);
    const [closing, setClosing] = useState(false);
    const popupTriggered = useRef(false);
    const pathname = usePathname();

    const [formData, setFormData] = useState<LeadInput>({
        name: "",
        phone: "",
        email: "",
        source_id: sourceId,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (field: string, value: string) =>
        setFormData((prev) => ({ ...prev, [field]: value }));

    const closeModal = () => {
      popupTriggered.current = true;
      setClosing(true);
      setTimeout(() => {
       setShow(false);
       setClosing(false);
      }, 300);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});

        const newErrors: Record<string, string> = {};
        if (!formData.name) newErrors.name = "El nombre es obligatorio";
        if (!formData.phone?.trim()) newErrors.phone = "El teléfono es obligatorio";
        if (!formData.email.trim()) newErrors.email = "El email es obligatorio";
        if (formData.phone?.trim().length !== 9) newErrors.phone = "El teléfono debe tener 9 dígitos";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const leadData: LeadInput = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            source_id: sourceId,
            ...(productId && { product_id: productId }),
        };

        const whatsappResult = await sendWhatsapp(leadData);
        if (!whatsappResult.success) {
            setErrors({ general: whatsappResult.message || "Error al enviar el WhatsApp" });
            showToast.error(whatsappResult.message || "Error al enviar el WhatsApp");
            return;
        }

        const emailResult = await sendEmail(leadData);
        if (!emailResult.success) {
            setErrors({ general: emailResult.message || "Error al enviar el email" });
            showToast.error(emailResult.message || "Error al enviar el email");
            return;
        }
        
        closeModal();
        showToast.success("¡Gracias! Nos pondremos en contacto contigo pronto.");
    };

    useEffect(() => {
      popupTriggered.current = false;
      setShow(false);
      const timer = setTimeout(() => {
       if (popupTriggered.current) return;
       if(document.visibilityState !== "visible") return;

       popupTriggered.current = true;
       setShow(true);
      }, delay);
 
        return () => clearTimeout(timer);
    }, [delay, pathname]);

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 transition-opacity duration-300 backdrop-blur-sm">
            
            <div className={`relative bg-white shadow-2xl overflow-hidden transition-all duration-300 ease-in-out transform ${closing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} 
                rounded-[2rem] border-[6px] border-white md:rounded-2xl md:border-8`}
            >
                <CloseButton onClick={closeModal} className="absolute top-2 right-2 md:top-3 md:right-3 z-50" />

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
                    isSubmitting={isWhatsappSending || isEmailSending}
                />

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
                    isSubmitting={isWhatsappSending || isEmailSending}
                />

            </div>
        </div>
    );
};

export default DynamicPopup;