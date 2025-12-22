import { useState } from "react";
import { api } from "@/config"; 

export const useSendWhatsapp = (onClose: () => void) => {
    const [isSending, setIsSending] = useState(false);
    
    // Estados del formulario
    const [selectedProductId, setSelectedProductId] = useState("");
    const [mainImage, setMainImage] = useState<File | null>(null);
    const [paragraph, setParagraph] = useState("");

    const handleSubmit = async () => {
        if (!selectedProductId) return alert("Por favor selecciona un producto.");
        if (!paragraph) return alert("Debes escribir un mensaje o párrafo.");
        
        setIsSending(true);
        try {
            const formData = new FormData();
            formData.append('product_id', selectedProductId);
            formData.append('paragraph', paragraph);
            
            if (mainImage) {
                formData.append('image', mainImage);
            }

            await api.post('/api/whatsapp/send-template', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            alert("Plantilla de WhatsApp guardada/enviada correctamente.");
            onClose();

        } catch (error) {
            console.error("Error WhatsApp:", error);
            alert("Hubo un error al procesar la solicitud.");
        } finally {
            setIsSending(false);
        }
    };

    return {
        selectedProductId,
        setSelectedProductId,
        mainImage,
        setMainImage,
        paragraph,
        setParagraph,
        handleSubmit,
        isSending
    };
};