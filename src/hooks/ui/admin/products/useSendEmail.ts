import { useState, useEffect } from "react";
import { api } from "@/config";

export interface EmailSectionData {
    mainImage: File | null;
    secondaryImage1: File | null;
    secondaryImage2: File | null;

    mainImagePreview: string;
    secondaryImage1Preview: string;
    secondaryImage2Preview: string;

    title: string;
    paragraph: string;
}

export const useSendEmail = (onClose: () => void, products: any[]) => {
    const [isSending, setIsSending] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState("");
    
    const [clientData, setClientData] = useState({ nombre: "", correo: "", telefono: "" });

    const [sections, setSections] = useState<EmailSectionData[]>([
        { mainImage: null, secondaryImage1: null, secondaryImage2: null, mainImagePreview: "", secondaryImage1Preview: "", secondaryImage2Preview: "", title: "", paragraph: "" },
        { mainImage: null, secondaryImage1: null, secondaryImage2: null, mainImagePreview: "", secondaryImage1Preview: "", secondaryImage2Preview: "", title: "", paragraph: "" },
        { mainImage: null, secondaryImage1: null, secondaryImage2: null, mainImagePreview: "", secondaryImage1Preview: "", secondaryImage2Preview: "", title: "", paragraph: "" },
    ]);

    const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    
    const fixUrl = (url: string) => {
        if (!url) return "";
        if (url.startsWith("http")) return url; 
        if (url.startsWith("blob")) return url; 
        return `${BACKEND_URL}${url}`; 
    };

    
    useEffect(() => {
        if (!selectedProductId) return;

        const product = products.find(p => p.id.toString() === selectedProductId.toString());
        
        if (product) {
            const getImgBySlot = (slotName: string) => {
                const img = product.images?.find((i: any) => 
                    i.slot_name === slotName || i.slot?.name === slotName
                );
                return img ? fixUrl(img.url) : "";
            };

            const heroImg = getImgBySlot('Hero');
            const specsImg = getImgBySlot('Specs');
            const benefitsImg = getImgBySlot('Benefits');
            const listImg = getImgBySlot('List') || getImgBySlot('Main');
            const popupImg = getImgBySlot('Popups');

            const newSections: EmailSectionData[] = [
                {
                    title: product.name || "Nombre del Producto",
                    paragraph: product.short_description || "Descripción corta del producto...",
                    mainImage: null,
                    mainImagePreview: heroImg || listImg, 
                    secondaryImage1: null, secondaryImage1Preview: "",
                    secondaryImage2: null, secondaryImage2Preview: ""
                },
                {
                    title: "Características y Especificaciones",
                    paragraph: product.description || "Detalles técnicos del producto...",
                    mainImage: null,
                    mainImagePreview: specsImg, 
                    secondaryImage1: null, secondaryImage1Preview: listImg, 
                    secondaryImage2: null, secondaryImage2Preview: ""
                },
                {
                    title: "Beneficios Clave",
                    paragraph: "Descubre cómo este producto mejora tu negocio o vida diaria.",
                    mainImage: null,
                    mainImagePreview: benefitsImg, 
                    secondaryImage1: null, secondaryImage1Preview: popupImg, 
                    secondaryImage2: null, secondaryImage2Preview: ""
                }
            ];

            setSections(newSections);
        }
    }, [selectedProductId, products]);


    const handleClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClientData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleTextChange = (index: number, field: 'title' | 'paragraph', value: string) => {
        const newSections = [...sections];
        newSections[index][field] = value;
        setSections(newSections);
    };

    const handleFileChange = (index: number, field: 'mainImage' | 'secondaryImage1' | 'secondaryImage2', file: File | null) => {
        const newSections = [...sections];
        newSections[index][field] = file;
        
        const previewField = `${field}Preview` as keyof EmailSectionData;
        if (file) {
            // @ts-ignore
            newSections[index][previewField] = URL.createObjectURL(file);
        } else {
            // @ts-ignore
            newSections[index][previewField] = ""; 
        }
        
        setSections(newSections);
    };

    const handleSubmit = async () => {
        if (!selectedProductId) return alert("Selecciona un producto.");
        if (!clientData.correo) return alert("Ingresa el correo del cliente.");

        setIsSending(true);
        try {
            const formData = new FormData();
            
            formData.append('producto_id', selectedProductId);
            formData.append('nombre', clientData.nombre);
            formData.append('correo', clientData.correo);
            formData.append('telefono', clientData.telefono);

            sections.forEach((section, index) => {
                formData.append(`sections[${index}][title]`, section.title);
                formData.append(`sections[${index}][paragraph]`, section.paragraph);
                
                if (section.mainImage) {
                    formData.append(`sections[${index}][main_image]`, section.mainImage);
                } 
                else if (section.mainImagePreview && section.mainImagePreview.startsWith('http')) {
                    formData.append(`sections[${index}][existing_main_image]`, section.mainImagePreview);
                }

                if (section.secondaryImage1) formData.append(`sections[${index}][secondary_image_1]`, section.secondaryImage1);
                else if (section.secondaryImage1Preview.startsWith('http')) formData.append(`sections[${index}][existing_secondary_image_1]`, section.secondaryImage1Preview);

                if (section.secondaryImage2) formData.append(`sections[${index}][secondary_image_2]`, section.secondaryImage2);
                else if (section.secondaryImage2Preview.startsWith('http')) formData.append(`sections[${index}][existing_secondary_image_2]`, section.secondaryImage2Preview);
            });

            await api.post('/email/send', formData, { 
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            alert("Campaña de email guardada y enviada.");
            onClose();
        } catch (error) {
            console.error(error);
            alert("Error al procesar el envío.");
        } finally {
            setIsSending(false);
        }
    };

    return { 
        selectedProductId, 
        setSelectedProductId, 
        clientData, 
        handleClientChange, 
        sections, 
        handleTextChange, 
        handleFileChange, 
        handleSubmit, 
        isSending 
    };
};