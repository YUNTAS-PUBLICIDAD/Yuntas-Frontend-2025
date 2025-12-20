import { useState } from "react";
import { api } from "@/config"; 

export interface EmailSectionData {
    mainImage: File | null;
    secondaryImage1: File | null;
    secondaryImage2: File | null;
    title: string;
    paragraph: string;
}

export const useSendEmail = (onClose: () => void) => {
    const [isSending, setIsSending] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState("");

    // Inicializamos 3 secciones vacías
    const [sections, setSections] = useState<EmailSectionData[]>([
        { mainImage: null, secondaryImage1: null, secondaryImage2: null, title: "", paragraph: "" },
        { mainImage: null, secondaryImage1: null, secondaryImage2: null, title: "", paragraph: "" },
        { mainImage: null, secondaryImage1: null, secondaryImage2: null, title: "", paragraph: "" },
    ]);

    // Manejar cambios de texto (Título y Párrafo)
    const handleTextChange = (index: number, field: 'title' | 'paragraph', value: string) => {
        const newSections = [...sections];
        newSections[index][field] = value;
        setSections(newSections);
    };

    // Manejar subida de imágenes
    const handleFileChange = (index: number, field: 'mainImage' | 'secondaryImage1' | 'secondaryImage2', file: File | null) => {
        const newSections = [...sections];
        newSections[index][field] = file;
        setSections(newSections);
    };

    const handleSubmit = async () => {
        if (!selectedProductId) return alert("Por favor selecciona un producto.");
        
        setIsSending(true);
        try {
            const formData = new FormData();
            formData.append('product_id', selectedProductId);

            // Recorremos las secciones y las adjuntamos al FormData
            sections.forEach((section, index) => {
                // Laravel/PHP espera arrays así: sections[0][title]
                formData.append(`sections[${index}][title]`, section.title);
                formData.append(`sections[${index}][paragraph]`, section.paragraph);
                
                if (section.mainImage) formData.append(`sections[${index}][main_image]`, section.mainImage);
                if (section.secondaryImage1) formData.append(`sections[${index}][secondary_image_1]`, section.secondaryImage1);
                if (section.secondaryImage2) formData.append(`sections[${index}][secondary_image_2]`, section.secondaryImage2);
            });

            // AQUÍ VA TU ENDPOINT DE BACKEND
            await api.post('/api/email/send', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            alert("Emails enviados correctamente a la cola de espera.");
            onClose();

        } catch (error) {
            console.error("Error enviando emails:", error);
            alert("Hubo un error al enviar los emails.");
        } finally {
            setIsSending(false);
        }
    };

    return {
        selectedProductId,
        setSelectedProductId,
        sections,
        handleTextChange,
        handleFileChange,
        handleSubmit,
        isSending
    };
};