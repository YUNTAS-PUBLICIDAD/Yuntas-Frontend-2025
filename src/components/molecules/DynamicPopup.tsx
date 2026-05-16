'use client'

import { useState, useEffect, useRef } from "react";
import { useWhatsapp } from "@/hooks/useWhatsapp";
import { useEmail } from "@/hooks/useEmail";
import PopupRenderer from "@/components/molecules/PopupRenderer";
import { LeadInput } from "@/types/admin/lead";
import { showToast } from "@/utils/showToast";
import { usePathname } from "next/navigation";
import { useLeadCapture } from "@/hooks/useLeadCapture";

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
    // const { sendWhatsapp, isActivating: isWhatsappSending } = useWhatsapp();
    // const { sendEmail, isActivating: isEmailSending } = useEmail();

    const {captureLead, isSubmitting} = useLeadCapture();
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

        // Se limpia los errores
        setErrors({});

        // Se valida usando Toast en lugar de textos debajo de los inputs
        if (!formData.name || !formData.phone?.trim() || !formData.email.trim()) {
            showToast.warning("Por favor, completa todos los campos obligatorios.");
            return;
        }

        if (formData.phone?.trim().length !== 9) {
            showToast.warning("El teléfono debe tener exactamente 9 dígitos.");
            return;
        }

        const leadData: LeadInput = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            source_id: sourceId,
            ...(productId && { product_id: productId }),
        };

        const result = await captureLead(
          leadData
        );

        if(!result.success){
         showToast.error(
           result.message || "Error enviando formulario"
         );
         return;
        }

        // const whatsappResult = await sendWhatsapp(leadData);
        // if (!whatsappResult.success) {
        //     showToast.error(whatsappResult.message || "Error al enviar el WhatsApp");
        //     return;
        // }

        // const emailResult = await sendEmail(leadData);
        // if (!emailResult.success) {
        //     showToast.error(emailResult.message || "Error al enviar el email");
        //     return;
        // }

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
            // isSubmitting={isWhatsappSending || isEmailSending}
            isSubmitting={isSubmitting}
        />
    );
};

export default DynamicPopup;
