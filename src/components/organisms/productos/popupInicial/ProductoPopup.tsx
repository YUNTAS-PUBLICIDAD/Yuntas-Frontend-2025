import { useState, useEffect, useRef } from "react";
import { useWhatsapp } from "@/hooks/useWhatsapp";
import PopupContainer from "@/components/atoms/PopContainer";
import PopupImage from "@/components/molecules/producto/PopUp/PopUpImage";
import PopupHeader from "@/components/molecules/producto/PopUp/PopUpHeader";
import PopupForm from "@/components/molecules/producto/PopUp/PopupForm";
import imagenPopup from "@/assets/productos/popup/Productos.webp";
import CloseButton from "@/components/atoms/CloseButton";
import { LeadInput } from "@/types/admin/lead";

interface ProductoPopupProps {
    delay?: number;
    imgSrc?: string;
    productId?: number;
}

const ProductoPopup = ({ delay = 5000, imgSrc = imagenPopup.src, productId }: ProductoPopupProps) => {
    const { sendWhatsapp, isActivating: isSendingWhatsapp } = useWhatsapp();
    const [show, setShow] = useState(false);
    const [closing, setClosing] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);

    const [formData, setFormData] = useState<LeadInput>({
        name: "",
        phone: "",
        email: "",
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
            ...(productId && { product_id: productId }),
        };

        const result = await sendWhatsapp(leadData);
        if (!result.success) {
            setErrors({ general: result.message || "Error al enviar el WhatsApp" });
            return;
        }

        alert("¡Gracias! Nos pondremos en contacto contigo pronto.");

        setFormData({ name: "", phone: "", email: "" });
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
                    <PopupHeader title="¡Tu marca brillando como se merece!" />
                    <PopupForm
                        formData={formData}
                        errors={errors}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        buttonText="Explorar opciones"
                        isSubmitting={isSendingWhatsapp}
                    />
                </div>
            </PopupContainer>
        </div>
    );
};

export default ProductoPopup;
