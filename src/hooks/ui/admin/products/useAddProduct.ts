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
    alts: {
        list: string;
        hero: string;
        specs: string;
        benefits: string;
        popups: string;
    };
}

export const useAddProduct = (onClose: () => void) => {
    const [formData, setFormData] = useState<ProductFormData>({
        name: "", category: "", price: "", slug: "",
        metaTitle: "", metaDescription: "", keywords: "",
        heroTitle: "", description: "",
        specifications: [""],
        benefits: [""],
        images: { list: null, hero: null, specs: null, benefits: null, popups: null },
        alts: { list: "", hero: "", specs: "", benefits: "", popups: "" }
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
        if (file && file.size > 10 * 1024 * 1024) { 
            alert(`La imagen "${file.name}" es muy pesada. Máximo 10MB.`);
            return;
        }
        setFormData(prev => ({
            ...prev,
            images: { ...prev.images, [type]: file }
        }));
    };

    const handleAltChange = (type: keyof typeof formData.alts, value: string) => {
        setFormData(prev => ({
            ...prev,
            alts: { ...prev.alts, [type]: value }
        }));
    };

    const handleSubmit = async () => {
        setIsSaving(true);

        try {
            const data = new FormData();

            data.append('nombre', formData.name); 
            data.append('precio', formData.price);
            data.append('link', formData.slug);
            data.append('categoria', formData.category); 

            data.append('titulo', formData.heroTitle); // Maps to short_description
            data.append('descripcion', formData.description);

            data.append('etiqueta[meta_titulo]', formData.metaTitle);
            data.append('etiqueta[meta_description]', formData.metaDescription);
            
            if (formData.keywords) {
                const keywordArray = formData.keywords.split(',').map(k => k.trim());
                keywordArray.forEach((kw, index) => {
                    data.append(`etiqueta[keywords][${index}]`, kw);
                });
            }

            if (formData.images.list) {
                data.append('imagen_principal', formData.images.list);
                data.append('alt_imagen_principal', formData.alts.list);
            }

            const galleryFiles = [
                formData.images.hero,
                formData.images.specs,
                formData.images.benefits,
                formData.images.popups
            ];
            
            const galleryAlts = [
                formData.alts.hero,
                formData.alts.specs,
                formData.alts.benefits,
                formData.alts.popups
            ];

            galleryFiles.forEach((file, index) => {
                if (file) {
                    data.append('imagenes[]', file);
                    data.append('alts[]', galleryAlts[index]); 
                }
            });

            formData.specifications.forEach((spec, index) => {
                if(spec.trim() !== "") data.append(`especificaciones[${index}]`, spec);
            });

            formData.benefits.forEach((ben, index) => {
                if(ben.trim() !== "") data.append(`beneficios[${index}]`, ben);
            });

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
        handleAltChange,
        handleSubmit,
        isSaving
    };
};