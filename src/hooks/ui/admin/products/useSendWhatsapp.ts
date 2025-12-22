import { useState, useEffect } from "react";
import { api } from "@/config";

export const useSendWhatsapp = (onClose: () => void, products: any[]) => {
    const [isSending, setIsSending] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState("");
    
  
    const [mainImage, setMainImage] = useState<File | null>(null); 
    const [previewUrl, setPreviewUrl] = useState<string | null>(null); 
    const [paragraph, setParagraph] = useState(""); 

    useEffect(() => {
        if (!selectedProductId) return;

        const product = products.find(p => p.id.toString() === selectedProductId.toString());
        if (product) {
            const url = product.imagen_principal || (product.images && product.images[0]?.url) || null;
            const text = product.short_description || product.descripcion || product.nombre || "";

            setMainImage(null); 
            setPreviewUrl(url); 
            setParagraph(text); 
        }
    }, [selectedProductId, products]);

    const handleSubmit = async () => {
        if (!selectedProductId) return alert("Selecciona un producto.");
        if (!paragraph) return alert("El mensaje no puede estar vacío.");
        
        setIsSending(true);
        try {
            const formData = new FormData();
            formData.append('product_id', selectedProductId);
            
            formData.append('paragraph', paragraph);
            
            if (mainImage) {
                formData.append('image', mainImage); 
            } else if (previewUrl) {
                formData.append('existing_image_url', previewUrl); 
            }

            await api.post('/api/whatsapp/send-template', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            alert("Plantilla WhatsApp guardada correctamente.");
            onClose();
        } catch (error) {
            console.error(error);
            alert("Error al guardar plantilla.");
        } finally {
            setIsSending(false);
        }
    };

    return {
        selectedProductId, setSelectedProductId,
        mainImage, setMainImage,
        previewUrl, setPreviewUrl,
        paragraph, setParagraph,
        handleSubmit, isSending
    };
};