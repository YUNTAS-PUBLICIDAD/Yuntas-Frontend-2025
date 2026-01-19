import { useState, useEffect, useRef } from "react";
import { useWhatsapp } from "@/hooks/useWhatsapp";
import { useEmail } from "@/hooks/useEmail";  //agregando envio de email
import PopupContainer from "@/components/atoms/PopContainer";
import PopupImage from "@/components/molecules/producto/PopUp/PopUpImage";
import PopupHeader from "@/components/molecules/producto/PopUp/PopUpHeader";
import PopupForm from "@/components/molecules/producto/PopUp/PopupForm";
import CloseButton from "@/components/atoms/CloseButton";
import { LeadInput } from "@/types/admin/lead";

interface PopupProps {
    delay?: number;
    imgSrc: string;
    title: string;
    buttonText: string;
    productId?: number;
    sourceId?: number;
}

const Popup = ({
    delay = 5000,
    imgSrc,
    title,
    buttonText,
    productId,
    sourceId = 1,
}: PopupProps) => {
    const { sendWhatsapp, isActivating } = useWhatsapp();
    const { sendEmail } = useEmail(); //agregando envio de email
    const [show, setShow] = useState(false);
    const [closing, setClosing] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);

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
        setClosing(true);
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

        const result = await sendWhatsapp(leadData);
        if (!result.success) {
            setErrors({ general: result.message || "Error al enviar el WhatsApp" });
            return;
        }
        //email secuencial
        try{
            await sendEmail(leadData);
        } catch (error) {
            console.error("Error al enviar el email:", error);
        }

        alert("¡Gracias! Nos pondremos en contacto contigo pronto.");

        setFormData({ name: "", phone: "", email: "", source_id: sourceId });
        closeModal();
    };

    useEffect(() => {
        const timer = setTimeout(() => setShow(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <PopupContainer closing={closing} ref={modalRef}>
                <CloseButton
                    onClick={closeModal}
                    className="absolute top-4 right-4 z-50"
                />

                <PopupImage src={imgSrc} />

                <div className="w-full sm:w-[40%] p-4 flex flex-col justify-center">
                    <PopupHeader title={title} />
                    <PopupForm
                        formData={formData}
                        errors={errors}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        buttonText={buttonText}
                        isSubmitting={isActivating}
                    />
                </div>
            </PopupContainer>
        </div>
    );
};

export default Popup;