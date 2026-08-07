'use client'

import { useState, useEffect, useRef } from "react";
import { useWhatsapp } from "@/hooks/useWhatsapp";
import { useEmail } from "@/hooks/useEmail";
import PopupRenderer from "@/components/molecules/PopupRenderer";
import { LeadInput } from "@/types/admin/lead";
import { showToast } from "@/utils/showToast";
import { usePathname } from "next/navigation";
import { useLeadCapture } from "@/hooks/useLeadCapture";
import { getPublicPopupService } from "@/services/popupService";
import { Popup as PopupType } from "@/types/admin/popup";

const BACKEND_URL = (process.env.NEXT_PUBLIC_URL || "http://localhost:8000").replace(/\/$/, "");

interface PopupFallback {
    desktopImgSrc: string;
    textImgSrc?: string;
    mobileImgSrc?: string;
    imgAlt: string;
    title: string;
    buttonText: string;
    buttonColor?: string;
    delay?: number;
}

interface DynamicPopupProps {
    page: string;              // ej: "inicio" -> se manda a getPublicPopupService
    fallback: PopupFallback;   // valores por defecto si no hay popup activo o falla el fetch
    productId?: number;
    sourceId?: number;
}

// Estructura interna que realmente consume PopupRenderer
interface ResolvedPopupData {
    delay: number;
    desktopImgSrc: string;
    textImgSrc?: string;
    mobileImgSrc?: string;
    imgAlt: string;
    title: string;
    buttonText: string;
    buttonColor: string;
}

const getImgUrl = (imgObj: any) => {
    return imgObj?.image
        ? `${BACKEND_URL}${imgObj.image.startsWith('/') ? '' : '/'}${imgObj.image}`
        : "";
};

const DynamicPopup = ({
    page,
    fallback,
    productId,
    sourceId = 1,
}: DynamicPopupProps) => {
    const { captureLead, isSubmitting } = useLeadCapture();

    const [show, setShow] = useState(false);
    const [closing, setClosing] = useState(false);
    const [popupData, setPopupData] = useState<ResolvedPopupData | null>(null);
    const [loaded, setLoaded] = useState(false); // evita mostrar el popup antes de resolver el fetch

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

        const result = await captureLead(leadData);

        if (!result.success) {
            showToast.error(result.message || "Error enviando formulario");
            return;
        }

        closeModal();
        showToast.success("¡Gracias! Nos pondremos en contacto contigo pronto.");
    };

    // 1) Trae los datos del popup SIEMPRE desde el navegador del cliente final.
    //    Esto corre en runtime real, nunca durante `next build`.
    useEffect(() => {
        let isMounted = true;

        const fetchPopup = async () => {
            try {
                const result = await getPublicPopupService(page);

                console.log('🔍 [DynamicPopup] page prop:', page);
                console.log('🔍 [DynamicPopup] result completo:', JSON.stringify(result, null, 2));
                console.log('🔍 [DynamicPopup] result.success:', result.success);
                console.log('🔍 [DynamicPopup] result.data existe:', !!result.data);
                console.log('🔍 [DynamicPopup] result.data.active:', result.data?.active);
                if (!isMounted) return;

                if (result.success && result.data && result.data.active === true) {
                    const dynamicPopup: PopupType = result.data;

                    const desktopLeftImg = dynamicPopup.images?.find(
                        (img) => img.device === 'desktop' && img.slot === 'left'
                    );
                    const desktopRightImg = dynamicPopup.images?.find(
                        (img) => img.device === 'desktop' && img.slot === 'right'
                    );
                    const mobileCenterImg = dynamicPopup.images?.find(
                        (img) => img.device === 'mobile' && img.slot === 'center'
                    );

                    setPopupData({
                        desktopImgSrc: getImgUrl(desktopLeftImg),
                        textImgSrc: getImgUrl(desktopRightImg),
                        mobileImgSrc: getImgUrl(mobileCenterImg),
                        imgAlt: desktopLeftImg?.alt || "Popup Yuntas",
                        title: dynamicPopup.title,
                        buttonText: dynamicPopup.button_text,
                        buttonColor: dynamicPopup.button_color || "#7C29E3",
                        delay: (dynamicPopup.delay_seconds || 5) * 1000,
                    });
                } else {
                    // No hay popup activo -> usamos el fallback estático
                    setPopupData({
                        desktopImgSrc: fallback.desktopImgSrc,
                        textImgSrc: fallback.textImgSrc || "",
                        mobileImgSrc: fallback.mobileImgSrc || fallback.desktopImgSrc,
                        imgAlt: fallback.imgAlt,
                        title: fallback.title,
                        buttonText: fallback.buttonText,
                        buttonColor: fallback.buttonColor || "#7C29E3",
                        delay: fallback.delay || 5000,
                    });
                }
            } catch (error) {
                console.log('🔍 [DynamicPopup] CAYÓ EN CATCH:', error);
                console.error("Error al obtener el popup dinámico:", error);
                if (!isMounted) return;

                // Si falla la API, no rompemos la UI: usamos el fallback
                setPopupData({
                    desktopImgSrc: fallback.desktopImgSrc,
                    textImgSrc: fallback.textImgSrc || "",
                    mobileImgSrc: fallback.mobileImgSrc || fallback.desktopImgSrc,
                    imgAlt: fallback.imgAlt,
                    title: fallback.title,
                    buttonText: fallback.buttonText,
                    buttonColor: fallback.buttonColor || "#7C29E3",
                    delay: fallback.delay || 5000,
                });
            } finally {
                if (isMounted) setLoaded(true);
            }
        };

        fetchPopup();

        return () => {
            isMounted = false;
        };
    }, [page]); // Se re-ejecuta si cambia la página, no en cada render

    // 2) Timer de aparición, ahora depende de popupData.delay (ya resuelto)
    useEffect(() => {
        if (!loaded || !popupData) return;

        popupTriggered.current = false;
        setShow(false);

        const timer = setTimeout(() => {
            if (popupTriggered.current) return;
            if (document.visibilityState !== "visible") return;

            popupTriggered.current = true;
            setShow(true);
        }, popupData.delay);

        return () => clearTimeout(timer);
    }, [loaded, popupData, pathname]);

    if (!show || !popupData) return null;

    return (
        <PopupRenderer
            isOpen={show}
            closing={closing}
            onClose={closeModal}
            desktopImgSrc={popupData.desktopImgSrc}
            textImgSrc={popupData.textImgSrc}
            mobileImgSrc={popupData.mobileImgSrc}
            imgAlt={popupData.imgAlt}
            title={popupData.title}
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            buttonText={popupData.buttonText}
            buttonColor={popupData.buttonColor}
            isSubmitting={isSubmitting}
        />
    );
};

export default DynamicPopup;