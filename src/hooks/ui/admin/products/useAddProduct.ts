'use client';

import { useState } from "react";
import { api, API_ENDPOINTS } from "@/config"; 

export interface ProductFormData {
    name: string;
    category: string;
    price: string;
    slug: string;
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    heroTitle: string;
    description: string;
    specifications: string[];
    benefits: string[];
    images: {
        list: File | null;
        hero: File | null;
        specs: File | null;
        benefits: File | null;
        popups: File | null;
    };
}

export const useAddProduct = (onClose: () => void) => {
    const [formData, setFormData] = useState<ProductFormData>({
        name: "", category: "", price: "", slug: "",
        metaTitle: "", metaDescription: "", keywords: "",
        heroTitle: "", description: "",
        specifications: [""], 
        benefits: [""],       
        images: { list: null, hero: null, specs: null, benefits: null, popups: null }
    });

    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleListChange = (type: 'specifications' | 'benefits', index: number, value: string) => {
        const newList = [...formData[type]];
        newList[index] = value;
        setFormData(prev => ({ ...prev, [type]: newList }));
    };

    const addListItem = (type: 'specifications' | 'benefits') => {
        setFormData(prev => ({ ...prev, [type]: [...prev[type], ""] }));
    };

    const handleFileChange = (type: keyof typeof formData.images, file: File | null) => {
        if (file && file.size > 2 * 1024 * 1024) {
            alert(`La imagen "${file.name}" es muy pesada. Máximo 2MB.`);
            return;
        }
        setFormData(prev => ({
            ...prev,
            images: { ...prev.images, [type]: file }
        }));
    };

    const handleSubmit = async () => {
        setIsSaving(true);

        try {
            const data = new FormData();

            data.append('nombre', formData.name); 
            
            data.append('precio', formData.price); 
            
            
            data.append('categoria', formData.category); 
            
            data.append('slug', formData.slug); 

           
            data.append('meta_titulo', formData.metaTitle);        
            data.append('meta_descripcion', formData.metaDescription); 
            data.append('keywords', formData.keywords);
            data.append('titulo_hero', formData.heroTitle);        
            data.append('descripcion', formData.description);      

            formData.specifications.forEach((spec, index) => {
                if(spec.trim() !== "") data.append(`especificaciones[${index}]`, spec);
            });
            
            formData.benefits.forEach((ben, index) => {
                if(ben.trim() !== "") data.append(`beneficios[${index}]`, ben);
            });

            if (formData.images.list) {
                data.append('imagen_principal', formData.images.list); 
            }

            if (formData.images.hero) data.append('imagen_hero', formData.images.hero);
            if (formData.images.specs) data.append('imagen_especificaciones', formData.images.specs);
            if (formData.images.benefits) data.append('imagen_beneficios', formData.images.benefits);
            if (formData.images.popups) data.append('imagen_popup', formData.images.popups);


            const response = await api.post(API_ENDPOINTS.PRODUCTS.CREATE, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            console.log("✅ Producto creado:", response.data);
            alert("Producto guardado con éxito");
            onClose(); 
            window.location.reload(); 
            
        } catch (error: any) {
            console.error("❌ Error al guardar:", error);

            if (error.response?.status === 422) {
                const errors = error.response.data.errors;
                let msg = "Faltan datos obligatorios:\n";
                // Listamos los errores para saber qué nombre exacto pide el backend
                Object.keys(errors).forEach(key => {
                    msg += `- ${key}: ${errors[key][0]}\n`;
                });
                alert(msg);
            } else if (error.response?.status === 413) {
                alert("⚠️ Archivos demasiado pesados (Error 413).");
            } else {
                alert("Ocurrió un error al guardar.");
            }
        } finally {
            setIsSaving(false);
        }
    };

    return {
        formData,
        handleChange,
        handleListChange,
        addListItem,
        handleFileChange,
        handleSubmit,
        isSaving
    };
};