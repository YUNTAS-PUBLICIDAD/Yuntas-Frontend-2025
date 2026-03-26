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

    const finalMobileImg = mobileImgSrc || desktopImgSrc;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 transition-opacity duration-300 backdrop-blur-sm">
            
            <div className={`relative bg-white shadow-2xl overflow-hidden transition-all duration-300 ease-in-out transform ${closing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} 
                w-[300px] rounded-[2rem] border-[6px] border-white 
                md:w-full md:max-w-2xl md:rounded-2xl md:flex md:flex-row md:border-8`}
            >
                <CloseButton onClick={closeModal} className="absolute top-2 right-2 md:top-3 md:right-3 z-50" />

                {/*IMAGEN MÓVIL */}
                <div className="md:hidden w-full relative overflow-hidden bg-gray-50">
                    {finalMobileImg && (
                        <img src={finalMobileImg} alt={imgAlt} className="w-full h-auto object-contain" />
                    )}
                </div>

                {/* IMAGEN ESCRITORIO */}
                <div className="hidden md:flex w-1/2 items-center justify-center relative overflow-hidden rounded-l-xl">
                    {desktopImgSrc && (
                        <img src={desktopImgSrc} alt={imgAlt} className="w-full h-full object-cover" />
                    )}
                </div>

                {/* SECCIÓN DERECHA: TEXTOS Y FORMULARIO */}
                <div className="p-6 md:w-1/2 md:p-8 flex flex-col justify-center gap-4 bg-white relative text-center">
                    
                    <div className="mb-2">
                        {/* TEXTO/IMAGEN ESCRITORIO */}
                        <div className="hidden md:block">
                            {textImgSrc ? (
                                <img src={textImgSrc} alt="Banner promocional" className="w-full object-contain mx-auto mb-2" />
                            ) : (
                                <h4 className="text-[26px] font-extrabold text-gray-400 uppercase leading-none tracking-tight">
                                    {title}
                                </h4>
                            )}
                        </div>

                        {/* TEXTO MÓVIL */}
                        <div className="md:hidden">
                            {!mobileImgSrc && (
                                <h4 className="text-lg font-bold text-gray-600 leading-tight mb-2">
                                    {title}
                                </h4>
                            )}
                        </div>
                    </div>

                    <div className="w-full md:max-w-[260px] mx-auto flex flex-col gap-2">
                        <PopupForm
                            formData={formData}
                            errors={errors}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            buttonText={buttonText}
                            isSubmitting={isWhatsappSending || isEmailSending}
                            buttonColor={buttonColor}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DynamicPopup;