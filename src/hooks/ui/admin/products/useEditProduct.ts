'use client';

import { useState, useEffect } from "react";
import { api, API_ENDPOINTS } from "@/config";
import { ProductFormData } from "./useAddProduct"; 

export interface ExistingImages {
    list?: string;
    hero?: string;
    specs?: string;
    benefits?: string;
    popups?: string;
}

export const useEditProduct = (productId: number | null, onClose: () => void) => {
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    
    const [existingImages, setExistingImages] = useState<ExistingImages>({});

    const [formData, setFormData] = useState<ProductFormData>({
        name: "", category: "", price: "", slug: "",
        metaTitle: "", metaDescription: "", keywords: "",
        heroTitle: "", description: "",
        specifications: [""],
        benefits: [""],
        images: { list: null, hero: null, specs: null, benefits: null, popups: null },
        alts: { list: "", hero: "", specs: "", benefits: "", popups: "" }
    });

    useEffect(() => {
        if (!productId) return;

        const fetchProduct = async () => {
            setIsLoadingData(true);
            try {
                const response = await api.get(`${API_ENDPOINTS.PRODUCTS.GET_ALL}/${productId}`);
                const product = response.data.data || response.data;

                setFormData({
                    name: product.name || "",
                    category: product.categories?.[0]?.name || "", 
                    price: product.price || "",
                    slug: product.slug || "",
                    metaTitle: product.meta_title || "",
                    metaDescription: product.meta_description || "",
                    keywords: Array.isArray(product.keywords) ? product.keywords.join(', ') : (product.keywords || ""),
                    heroTitle: product.short_description || "", 
                    description: product.description || "",
                    
                    specifications: product.content_items?.filter((i: any) => i.slot?.name === 'Especificaciones').map((i: any) => i.text) || [""],
                    benefits: product.content_items?.filter((i: any) => i.slot?.name === 'Beneficios').map((i: any) => i.text) || [""],
                    
                    images: { list: null, hero: null, specs: null, benefits: null, popups: null },
                    
                    alts: { list: "", hero: "", specs: "", benefits: "", popups: "" }
                });

                const imgMap: ExistingImages = {};
                if (Array.isArray(product.images)) {
                    product.images.forEach((img: any) => {
                        const slotName = img.slot?.name; 
                        if (slotName === 'List') imgMap.list = img.url;
                        if (slotName === 'Hero') imgMap.hero = img.url;
                        if (slotName === 'Specs') imgMap.specs = img.url;
                        if (slotName === 'Benefits') imgMap.benefits = img.url;
                        if (slotName === 'Popups') imgMap.popups = img.url;
                    });
                }
                setExistingImages(imgMap);

            } catch (error) {
                console.error("Error cargando producto:", error);
                alert("No se pudo cargar la información del producto.");
                onClose();
            } finally {
                setIsLoadingData(false);
            }
        };

        fetchProduct();
    }, [productId, onClose]);

    // 2. HANDLERS (Idénticos a useAddProduct)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleListChange = (type: 'specifications' | 'benefits', index: number, value: string) => {
        const newList = [...formData[type]];
        newList[index] = value;
        setFormData(prev => ({ ...prev, [type]: newList }));
    };
    const removeListItem = (type: 'specifications' | 'benefits', index: number) => {
        const newList = formData[type].filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, [type]: newList }));
    };
    const addListItem = (type: 'specifications' | 'benefits') => {
        setFormData(prev => ({ ...prev, [type]: [...prev[type], ""] }));
    };
    const handleFileChange = (type: keyof typeof formData.images, file: File | null) => {
        if (file && file.size > 40 * 1024 * 1024) { 
            alert(`La imagen es demasiado pesada. Máximo 40MB.`);
            return;
        }
        setFormData(prev => ({ ...prev, images: { ...prev.images, [type]: file } }));
    };
    const handleAltChange = (type: keyof typeof formData.alts, value: string) => {
        setFormData(prev => ({ ...prev, alts: { ...prev.alts, [type]: value } }));
    };

    // 3. ENVIAR FORMULARIO (UPDATE)
    const handleSubmit = async () => {
        if (!productId) return;
        setIsSaving(true);

        try {
            const data = new FormData();
            
            data.append('_method', 'PUT'); 

            data.append('name', formData.name);
            data.append('slug', formData.slug);
            
            const cleanPrice = formData.price.toString().replace(/[^0-9.]/g, '');
            data.append('price', cleanPrice);

            if (formData.category) {
                data.append('categories[]', formData.category); 
            }

            data.append('short_description', formData.heroTitle); 
            data.append('description', formData.description);

            data.append('meta_title', formData.metaTitle);
            data.append('meta_description', formData.metaDescription);
            
            if (formData.keywords) {
                data.append('keywords', formData.keywords);
            }

            
            if (formData.images.list) {
                data.append('main_image', formData.images.list);
                if(formData.alts.list) data.append('main_image_alt', formData.alts.list);
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

            await api.post(API_ENDPOINTS.PRODUCTS.UPDATE(productId), data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            alert("Producto actualizado correctamente");
            onClose();
            window.location.reload();

        } catch (error: any) {
            console.error("❌ Error al actualizar:", error);
            
            if (error.response?.status === 422) {
                const errors = error.response.data.errors;
                let msg = "Errores de validación:\n";
                Object.keys(errors).forEach(key => {
                    msg += `- ${key}: ${errors[key][0]}\n`;
                });
                alert(msg);
            } else if (error.response?.status === 413) {
                alert("⚠️ Archivos demasiado pesados (Error 413).");
            } else if (error.response?.status === 500) {
                alert("Error interno del servidor (500). Revisa que la categoría sea válida.");
            } else {
                alert("Error al actualizar el producto");
            }
        } finally {
            setIsSaving(false);
        }
    };

    return {
        formData,
        existingImages, 
        isLoadingData,
        isSaving,
        handleChange,
        handleListChange,
        addListItem,
        removeListItem, 
        handleFileChange,
        handleAltChange,
        handleSubmit
    };
};