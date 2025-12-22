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
    keywords: string[];
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
    const [currentKeyword, setCurrentKeyword] = useState("");
    const [formData, setFormData] = useState<ProductFormData>({
        name: "", category: "", price: "", slug: "",
        metaTitle: "", metaDescription: "", 
        keywords: [""],
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
    const handleAddKeyword = () => {
        if (!currentKeyword.trim()) return;
        setFormData(prev => ({
            ...prev,
            keywords: [...prev.keywords, currentKeyword.trim()]
        }));
        setCurrentKeyword("");
    };

  
    const handleListChange = (type: 'specifications' | 'benefits' | 'keywords', index: number, value: string) => {
        const newList = [...formData[type]];
        newList[index] = value;
        setFormData(prev => ({ ...prev, [type]: newList }));
    };
    const addListItem = (type: 'specifications' | 'benefits' | 'keywords') => {
        const currentList = formData[type];
        
        if (currentList.length > 0) {
            const lastItem = currentList[currentList.length - 1];
            if (lastItem.trim() === "") {
                return; 
            }
        }

        setFormData(prev => ({ ...prev, [type]: [...prev[type], ""] }));
    };
 const removeListItem = (type: 'specifications' | 'benefits' | 'keywords', index: number) => {
        const newList = [...formData[type]];
        newList.splice(index, 1);
        setFormData(prev => ({ ...prev, [type]: newList }));
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

            data.append('name', formData.name);      
            
            const cleanPrice = formData.price.toString().replace(/[^0-9.]/g, '');
            data.append('price', cleanPrice);         
            
            data.append('slug', formData.slug);       
            
            if (formData.category) {
                data.append('categories[]', formData.category);
            }

            data.append('short_description', formData.heroTitle); 
            data.append('description', formData.description); 
            
            data.append('meta_title', formData.metaTitle);
            data.append('meta_description', formData.metaDescription);
            
            if (formData.keywords.length > 0) {
                data.append('keywords', formData.keywords.join(','));
            }
            
            if (formData.images.list) {
                data.append('main_image', formData.images.list); 
                if (formData.alts.list) data.append('main_image_alt', formData.alts.list);
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
                    data.append(`gallery_images[${index}]`, file); 
                    data.append(`gallery_alts[${index}]`, galleryAlts[index]);
                }
            });

            formData.specifications.forEach((spec, index) => {
                if(spec.trim() !== "") data.append(`specifications[${index}]`, spec); 
            });
            
            formData.benefits.forEach((ben, index) => {
                if(ben.trim() !== "") data.append(`benefits[${index}]`, ben); 
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
                let msg = "Faltan datos obligatorios (Backend):\n";
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
        removeListItem,   
        handleFileChange,
        handleAltChange,
        handleSubmit,
        isSaving
    };
};