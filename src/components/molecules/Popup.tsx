'use client'

import { useState, useEffect, useRef } from "react";
import { useWhatsapp } from "@/hooks/useWhatsapp";
import { useEmail } from "@/hooks/useEmail";
import PopupContainer from "@/components/atoms/PopContainer";
// import PopupImage from "@/components/molecules/producto/PopUp/PopUpImage";
// import PopupHeader from "@/components/molecules/producto/PopUp/PopUpHeader";
// import PopupForm from "@/components/molecules/producto/PopUp/PopupForm";
import CloseButton from "@/components/atoms/CloseButton";
import { LeadInput } from "@/types/admin/lead";
import { showToast } from "@/utils/showToast";
import { usePathname } from "next/navigation";
import { PopupView } from "./producto/PopUp/PopupView";
import { PopupImageData } from "@/types/admin/popup";
import { useLeadCapture } from "@/hooks/useLeadCapture";
// import { PopupImage } from "@/types/admin/popup";

// interface PopupImageData {
//   url: string;
//   title?: string | null;
//   alt?: string | null;
// }

interface PopupProps {
    delay?: number;
    isMobile?: boolean;
    leftImage?: PopupImageData;
    rightImage?: PopupImageData;
    mobileImage?: PopupImageData;
    // imgSrc: string;
    // imgTitle?: string;
    // imgAlt: string;
    title: string;
    buttonText: string;
    buttonColor?: string;
    productId?: number;
    sourceId?: number;
}

const Popup = ({
    delay = 5000,
    // imgSrc,
    // imgTitle,
    // imgAlt,
    leftImage,
    rightImage,
    mobileImage,
    title,
    buttonText,
    buttonColor = "#30029c",
    productId,
    sourceId = 1,
    isMobile
}: PopupProps) => {
    // const { sendWhatsapp, isActivating: isWhatsappSending } = useWhatsapp();
    // const { sendEmail, isActivating: isEmailSending } = useEmail();
    const {captureLead, isSubmitting} = useLeadCapture();
    const [show, setShow] = useState(false);
    const [closing, setClosing] = useState(false);
    const [entered, setEntered] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);
    const popupTriggered = useRef(false);
    const pathname = usePathname()

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
      // sessionStorage.setItem('popup_seen', "true");
      //   setClosing(true);
      //   setTimeout(() => {
      //       setShow(false);
      //       setClosing(false);
      //   }, 100);

      setTimeout(() => {
       setShow(false);
       setClosing(false);
      }, 100);
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

        // const whatsappResult = await sendWhatsapp(leadData);
        // if (!whatsappResult.success) {
        //     setErrors({ general: whatsappResult.message || "Error al enviar el WhatsApp" });
        //     showToast.error(whatsappResult.message || "Error al enviar el WhatsApp");
        //     return;
        // }

        // const emailResult = await sendEmail(leadData);
        // if (!emailResult.success) {
        //     setErrors({ general: emailResult.message || "Error al enviar el email" });
        //     showToast.error(emailResult.message || "Error al enviar el email");
        //     return;
        // }

        const result = await captureLead(
          leadData
        );

        if(!result.success){
          setErrors({
            general: result.message || 'Error enviando formulario'
          });
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

    useEffect(() => {
        if (!show) return;
        let inner: number;
        const outer = requestAnimationFrame(() => {
            inner = requestAnimationFrame(() => setEntered(true));
        });
        return () => {
            cancelAnimationFrame(outer);
            cancelAnimationFrame(inner);
            setEntered(false);
        };
    }, [show]);

    if (!show) return null;

    // const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-out ${entered ? "opacity-100" : "opacity-0"}`}>
            <PopupContainer closing={closing} ref={modalRef}>
                <CloseButton
                    onClick={closeModal}
                    className="absolute top-[10px] right-[15px] md:top-3 md:right-3 z-50"
                />

                <PopupView
                isMobile={isMobile}
                leftImage={leftImage}
                rightImage={rightImage} 
                mobileImage={mobileImage}
                formData={formData}
                errors={errors}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                buttonText={buttonText}
                buttonColor={buttonColor}
                isSubmitting={isSubmitting}/>

            </PopupContainer>
                {/*isSubmitting={isWhatsappSending || isEmailSending}/>*/}
        </div>
    );
};

export default Popup;
