import { useState, useEffect } from "react";
import { api, API_ENDPOINTS, ASSETS_URL } from "@/config";

export const useEditProduct = (productId: number | null, onClose: () => void) => {
    const [isSaving, setIsSaving] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [currentKeyword, setCurrentKeyword] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        slug: "",
        metaTitle: "",
        metaDescription: "",
        keywords: [] as string[],
        
        heroTitle: "", 
        description: "",
        
        specifications: [] as string[],
        benefits: [] as string[],
        
        images: {
            list: null as File | null,
            hero: null as File | null,
            specs: null as File | null,
            benefits: null as File | null,
            popups: null as File | null
        },
        
        alts: {
            list: "",
            hero: "",
            specs: "",
            benefits: "",
            popups: ""
        }
    });

    const [existingImages, setExistingImages] = useState({
        list: "",
        hero: "",
        specs: "",
        benefits: "",
        popups: ""
    });

    useEffect(() => {
        if (!productId) return;
        
        const fetchProductData = async () => {
            
            setIsLoadingData(true);
            try {
                const response = await api.get(`${API_ENDPOINTS.PRODUCTS.GET_ONE(productId.toString())}`);
                const product = response.data.data || response.data;

                if (!product) return;

               
                const fixUrl = (url: string) => {
                    if (!url) return "";
                    if (url.startsWith("http")) return url; 
                    return `${ASSETS_URL}${url}`; 
                };

                const imgs = { list: "", hero: "", specs: "", benefits: "", popups: "" };
                const loadedAlts = { list: "", hero: "", specs: "", benefits: "", popups: "" };

                if (product.images && Array.isArray(product.images)) {
                    product.images.forEach((img: any) => {
                        const slotName = img.slot?.name || img.slot_name;
                        
                        const fullUrl = fixUrl(img.url);
                        const altText = img.alt_text || img.alt || ""; 

                        if (slotName === 'List' || slotName === 'Main') {
                            imgs.list = fullUrl;
                            loadedAlts.list = altText;
                        }
                        else if (slotName === 'Hero') {
                            imgs.hero = fullUrl;
                            loadedAlts.hero = altText;
                        }
                        else if (slotName === 'Specs') {
                            imgs.specs = fullUrl;
                            loadedAlts.specs = altText;
                        }
                        else if (slotName === 'Benefits') {
                            imgs.benefits = fullUrl;
                            loadedAlts.benefits = altText;
                        }
                        else if (slotName === 'Popups') {
                            imgs.popups = fullUrl;
                            loadedAlts.popups = altText;
                        }
                    });
                }
                
                setExistingImages(imgs);

               let kwArray: string[] = [];
                if (Array.isArray(product.keywords)) {
                    kwArray = product.keywords;
                } else if (typeof product.keywords === 'string' && product.keywords.trim() !== "") {
                    kwArray = product.keywords.split(',').map((k: string) => k.trim()).filter((k: string) => k !== "");
                }
                if (kwArray.length === 0) kwArray = [""];

                setFormData(prev => ({
                    ...prev,
                    name: product.nombre || product.name || "",
                    slug: product.slug || "",
                    price: product.precio || product.price || "",
                    category: product.categories?.[0]?.name || product.categoria || "", 
                    
                    metaTitle: product.meta_title || "",
                    metaDescription: product.meta_description || "",
                    
                    keywords: kwArray,

                    heroTitle: product.short_description || "", 
                    description: product.description || "",

                    
                    specifications: Array.isArray(product.specifications) ? product.specifications : [],
                    benefits: Array.isArray(product.benefits) ? product.benefits : [],

                    images: { list: null, hero: null, specs: null, benefits: null, popups: null },
                    
                    alts: loadedAlts 
                }));

            } catch (error) {
                console.error("Error cargando producto:", error);
            } finally {
                setIsLoadingData(false);
            }
        };

        fetchProductData();
    }, [productId]);

    
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

    const handleRemoveKeyword = (index: number) => {
        const newKeywords = [...formData.keywords];
        newKeywords.splice(index, 1);
        setFormData(prev => ({ ...prev, keywords: newKeywords }));
    };

    const handleKeywordKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddKeyword();
        }
    };
    const handleListChange = (type: 'specifications' | 'benefits' | 'keywords', index: number, value: string) => {
        const newList = [...formData[type]];
        newList[index] = value;
        setFormData(prev => ({ ...prev, [type]: newList }));
    };

    const addListItem = (type: 'specifications' | 'benefits' | 'keywords') => {
        const currentList = formData[type];
        if (currentList.length > 0 && currentList[currentList.length - 1].trim() === "") {
            return; 
        }
        setFormData(prev => ({ ...prev, [type]: [...prev[type], ""] }));
    };

  const removeListItem = (type: 'specifications' | 'benefits' | 'keywords', index: number) => {
        const newList = [...formData[type]];
        newList.splice(index, 1);
        setFormData(prev => ({ ...prev, [type]: newList }));
    };

    const handleFileChange = (key: keyof typeof formData.images, file: File | null) => {
        setFormData(prev => ({ ...prev, images: { ...prev.images, [key]: file } }));
    };

    const handleAltChange = (key: keyof typeof formData.alts, value: string) => {
        setFormData(prev => ({ ...prev, alts: { ...prev.alts, [key]: value } }));
    };

    
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
            data.append('keywords', formData.keywords.join(','));

            
            if (formData.images.list) {
                data.append('main_image', formData.images.list);
            }

            const galleryFiles = [formData.images.hero, formData.images.specs, formData.images.benefits, formData.images.popups];
            const galleryAlts = [formData.alts.hero, formData.alts.specs, formData.alts.benefits, formData.alts.popups];

            
            galleryFiles.forEach((file, index) => {
                if (file) {
                    data.append(`gallery_images[${index}]`, file);
                }
            });
            galleryAlts.forEach((alt, index) => {
                if (alt) data.append(`gallery_alts[${index}]`, alt);
            });

            if (formData.alts.list) data.append('main_image_alt', formData.alts.list);

            formData.specifications.forEach((spec, index) => {
                if (spec.trim() !== "") data.append(`specifications[${index}]`, spec);
            });
            formData.benefits.forEach((ben, index) => {
                if (ben.trim() !== "") data.append(`benefits[${index}]`, ben);
            });

            await api.post(API_ENDPOINTS.PRODUCTS.UPDATE(productId), data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            alert("Producto actualizado correctamente");
            onClose();
            window.location.reload();

        } catch (error: any) {
            console.error("Error actualizando:", error);
            alert("Error al actualizar. Revisa la consola.");
        } finally {
            setIsSaving(false);
        }
    };

    return {
       formData,
        existingImages,
        handleChange,
        handleListChange, 
        addListItem,      
        removeListItem,   
        handleFileChange,
        handleAltChange,
        handleSubmit,
        isSaving,
        isLoadingData
    };
};