'use client';

import { useState, useEffect } from "react";
import Button from "@/components/atoms/Button";
import Loader from "@/components/atoms/Loader";
import InputAdmin from "@/components/atoms/InputAdmin";
import TextareaAdmin from "@/components/atoms/TextAreaAdmin";
import FormSection from "@/components/molecules/admin/FormSection";
import InputListDinamica from "@/components/molecules/admin/InputListDinamica";
import ImageUpload from "@/components/molecules/admin/ImageUpload";
import { Producto, ProductoInput } from "@/types/admin/producto";
import { showToast } from '@/utils/showToast'

interface ProductFormProps {
    onSubmit: (data: ProductoInput) => void;
    onCancel: () => void;
    isLoading?: boolean;
    initialData?: Producto | null;
}

const defaultFormData: ProductoInput = {
    name: "",
    slug: "",
    price: "",
    hero_title: "",
    description: "",
    status: "active",

    meta_title: "",
    meta_description: "",
    keywords: [],

    main_image: null,
    main_image_alt: "",
    gallery: [],

    categories: [],
    specifications: [],
    benefits: [],
};

const GALLERY_SLOTS = [
    { 
        value: 'Hero', 
        label: 'Hero (Imagen principal grande)', 
        size: '1920 x 800 px', 
        desc: 'Formato horizontal panorámico.' 
    },
    { 
        value: 'Specs', 
        label: 'Especificaciones', 
        size: '1000 x 1000 px', 
        desc: 'Formato cuadrado o vertical (4:5).' 
    },
    { 
        value: 'Benefits', 
        label: 'Beneficios', 
        size: '1000 x 1000 px', 
        desc: 'Formato cuadrado o vertical (4:5).' 
    },
    { 
        value: 'Popups', 
        label: 'Popup', 
        size: '800 x 800 px', 
        desc: 'Formato cuadrado.' 
    },
] as const;

export default function ProductForm({ onSubmit, onCancel, isLoading = false, initialData = null }: ProductFormProps) {
    const [formData, setFormData] = useState<ProductoInput>(defaultFormData);

    const [galleryPreviews, setGalleryPreviews] = useState<Map<string, string>>(new Map());


    // Cargar datos iniciales para editar
    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                slug: initialData.slug,
                price: initialData.price,
                hero_title: initialData.hero_title,
                description: initialData.description,
                status: initialData.status,

                meta_title: initialData.meta_title || "",
                meta_description: initialData.meta_description || "",
                keywords: initialData.keywords || [],

                main_image: initialData.main_image?.url || null,
                main_image_alt: initialData.main_image?.alt || "",

                gallery: initialData.gallery?.map(img => ({
                    slot: img.slot,
                    image: img.url,
                    alt: img.alt || "",
                })) || [],

                categories: initialData.category_name ? [initialData.category_name] : [],
                specifications: initialData.specifications?.length > 0 ? initialData.specifications : [""],
                benefits: initialData.benefits?.length > 0 ? initialData.benefits : [""],
            });
        }
    }, [initialData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "price" && (Number(value) < 0 || Number(value) > 100000)) return;
        
        setFormData(prev => ({ ...prev, [name]: name === "price" ? Number(value) : value }));
    };

    const handleAddGalleryImage = (file: File, slot: string) => {
        // se elimna imagen existente de ese slot si hay
        const filteredGallery = formData.gallery.filter(item => item.slot !== slot);

        setFormData(prev => ({
            ...prev,
            gallery: [...filteredGallery, { slot: slot as any, image: file, alt: "", }]
        }));

        if (file instanceof File) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setGalleryPreviews(prev => {
                    const newMap = new Map(prev);
                    newMap.set(slot, reader.result as string);
                    return newMap;
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveGalleryImage = (slot: string) => { // se busca por slot para elimnar
        setFormData(prev => ({
            ...prev,
            gallery: prev.gallery.filter(item => item.slot !== slot)
        }));

        setGalleryPreviews(prev => { // se elimina el preview tambien
            const newMap = new Map(prev);
            newMap.delete(slot);
            return newMap;
        });
    };

    const handleUpdateGalleryAlt = (slot: string, newAlt: string) => { // busca por slot para actualizar alt
        setFormData(prev => ({
            ...prev,
            gallery: prev.gallery.map(item =>
                item.slot === slot ? { ...item, alt: newAlt } : item
            )
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // imagen principal obligatoria
        if (!formData.main_image) {
            showToast.warning("La imagen principal es requerida");
            return;
        }

        // imagenes de galeria obligatorias
        const missingSlots = GALLERY_SLOTS.filter(
            ({ value }) => !formData.gallery.some(item => item.slot === value)
        );
        if (missingSlots.length > 0) {
            showToast.warning(`Faltan imágenes para: ${missingSlots.map(s => s.label).join(", ")}`);
            return;
        }

        const emptyImages = formData.gallery.filter(
            item => !item.image || (typeof item.image === 'string' && item.image.trim() === '')
        );
        if (emptyImages.length > 0) {
            showToast.warning("Todas las imágenes de galería son requeridas");
            return;
        }

        // beneficios y especificaciones obligatorios
        const hasEmptySpecs = formData.specifications.some(spec => spec.trim() === "");
        const hasEmptyBenefits = formData.benefits.some(benefit => benefit.trim() === "");
        if (hasEmptySpecs) {
            showToast.warning("Las especificaciones no pueden estar vacias");
            return;
        }
        if (hasEmptyBenefits) {
            showToast.warning("Los beneficios no pueden estar vacios");
            return;
        }
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-h-[80vh] overflow-y-auto">

            {/* Seccion datos para Dashboard */}
            <FormSection title="Datos para Dashboard (Gestión Interna)">
                <div className="flex gap-4 flex-col md:flex-row">
                    <InputAdmin
                        label="Nombre del Producto"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Ej. Letreros Neón LED"
                        helperText="Máx. 150 caracteres (letras, números y espacios)."
                        maxLength={150}
                        required
                    />

                    <InputAdmin
                        label="Sección/Categoría (Aparece en tabla)"
                        name="category_name"
                        value={formData.categories[0] || ""}
                        onChange={(e) => {
                            const { value } = e.target;
                            setFormData(prev => ({
                                ...prev,
                                categories: value ? [value] : []
                            }));
                        }}
                        placeholder="Ej: Muebles"
                        helperText="Máx. 255 caracteres (letras, números y espacios)."
                        maxLength={255}
                        required
                    />
                </div>

                <div className="flex gap-4 flex-col md:flex-row">
                    <InputAdmin
                        label="Link/URL"
                        name="slug"
                        value={formData.slug || ""}
                        onChange={handleInputChange}
                        placeholder="ej: letreros-neon-led"
                        helperText="Formato obligatorio: palabras en minúscula separadas por guiones. Sin espacios ni tildes. Máx. 160 caracteres."
                        maxLength={160}
                        required
                    />
                    <InputAdmin
                        label="Precio (Aparece en tabla)"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="Ej: 500.00"
                        helperText="Coloca el precio en números (máx. 100 000)."
                        required
                    />
                </div>

                <InputAdmin
                    label="Título Hero (Aparece sobre la imagen hero)"
                    name="hero_title"
                    value={formData.hero_title || ""}
                    onChange={handleInputChange}
                    placeholder="Ej: Letreros Neón LED"
                    helperText="Máx. 255 caracteres (letras, números y espacios)."
                    maxLength={255}
                    required
                />

                <TextareaAdmin
                    label="Descripción (Aparece en 'Información' del producto)"
                    name="description"
                    value={formData.description || ""}
                    onChange={handleInputChange}
                    placeholder="Describe el producto, sus usos y características principales…"
                    helperText="Descripción completa del producto."
                    rows={6}
                    required
                />
            </FormSection>

            <FormSection title="SEO (Optimización para Buscadores)">
                <InputAdmin
                    label="Meta Título"
                    name="meta_title"
                    value={formData.meta_title || ""}
                    onChange={handleInputChange}
                    placeholder="Título para SEO del producto"
                    helperText="Máx. 70 caracteres (letras, números y espacios)."
                    maxLength={70}
                />

                <TextareaAdmin
                    label="Meta Descripción"
                    name="meta_description"
                    value={formData.meta_description || ""}
                    onChange={handleInputChange}
                    placeholder="Descripción breve del producto para SEO…"
                    helperText="Máx. 160 caracteres (letras, números y espacios)."
                    maxLength={160}
                    rows={2}
                />

                <InputListDinamica
                    label="Keywords"
                    items={formData.keywords}
                    onChange={(keywords) => setFormData(prev => ({ ...prev, keywords }))}
                    placeholder="ej: letreros para negocio"
                    addButtonText="+ Agregar keyword"
                    helperText="Palabras clave relevantes para que los buscadores encuentren el producto."
                />
            </FormSection>

            {/* Seccion especificaciones */}
            <FormSection title="Especificaciones (Checkmarks en el producto)">
                <InputListDinamica
                    label="Especificaciones"
                    items={formData.specifications}
                    onChange={(specifications) => setFormData(prev => ({ ...prev, specifications }))}
                    placeholder="Ej: Materiales duraderos"
                    addButtonText="+ Agregar especificación"
                    required
                />
            </FormSection>

            {/* Seccion beneficios */}
            <FormSection title="Beneficios (Checkmarks en el producto)">
                <InputListDinamica
                    label="Beneficios"
                    items={formData.benefits}
                    onChange={(benefits) => setFormData(prev => ({ ...prev, benefits }))}
                    placeholder="Ej: Iluminación con colores vibrantes"
                    addButtonText="+ Agregar beneficio"
                    required
                />
            </FormSection>

            {/* Imagen Principal */}
            <FormSection title="Imagen Principal">
                <ImageUpload
                    label="Imagen Principal del Producto"
                    description="Aparece en la lista de productos. Recomendado: 800 x 800 px (Cuadrado)."
                    altValue={formData.main_image_alt}
                    onAltChange={(alt) => setFormData(prev => ({ ...prev, main_image_alt: alt }))}
                    onFileChange={(file) => setFormData(prev => ({ ...prev, main_image: file }))}
                    currentImage={
                        typeof formData.main_image === "string" && formData.main_image
                            ? formData.main_image
                            : null
                    }
                    required
                />
            </FormSection>

            { /* Galeria */}
            <FormSection title="Galería de Imágenes por Sección">
                <p className="text-gray-500 text-sm mb-4">
                    Asigna una imagen a cada sección de la página del producto.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {GALLERY_SLOTS.map(({ value, label, size, desc  }) => {
                        const existingImage = formData.gallery.find(item => item.slot === value);

                        // se determinar la URL del preview
                        let imageUrl: string | null = null;
                        if (existingImage) {
                            if (typeof existingImage.image === 'string') {
                                // imagen existente
                                imageUrl = existingImage.image;
                            } else {
                                // imagen nueva (File)
                                imageUrl = galleryPreviews.get(value) || null;
                            }
                        }

                        return (
                            <ImageUpload
                                key={value}
                                label={`Imagen para ${label}`}
                                description={`Medida: ${size}. ${desc}`}
                                altValue={existingImage?.alt || ""}
                                required
                                onAltChange={(alt) => {
                                    handleUpdateGalleryAlt(value, alt);
                                }}
                                onFileChange={(file) => {
                                    if (file) {
                                        handleAddGalleryImage(file, value);
                                    }
                                }}
                                currentImage={imageUrl}
                                onRemove={
                                    existingImage
                                        ? () => handleRemoveGalleryImage(value)
                                        : undefined
                                }
                            />
                        );
                    })}
                </div>
            </FormSection>

            {/* Botones de acción */}
            <div className="flex flex-col md:flex-row gap-4 sticky bottom-0 bg-white pt-4 pb-2 px-4 border-t border-gray-200">
                <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="flex-1"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                            <Loader size="sm" color="border-white" />
                            <span>Guardando...</span>
                        </div>
                    ) : (
                        initialData ? "Guardar Cambios" : "Añadir Producto"
                    )}
                </Button>
                <Button
                    type="button"
                    variant="tertiary"
                    size="md"
                    className="flex-1"
                    onClick={onCancel}
                    disabled={isLoading}
                >
                    Cancelar
                </Button>
            </div>
        </form>
    );
}