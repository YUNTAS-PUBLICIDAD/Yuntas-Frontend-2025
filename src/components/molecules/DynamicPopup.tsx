'use client'

import { useState, useEffect, useRef } from "react";
import { useWhatsapp } from "@/hooks/useWhatsapp";
import { useEmail } from "@/hooks/useEmail";
import PopupRenderer from "@/components/molecules/PopupRenderer";
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

    return (
        <PopupRenderer
            isOpen={show}
            closing={closing}
            onClose={closeModal}
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
    );
};

export default DynamicPopup;