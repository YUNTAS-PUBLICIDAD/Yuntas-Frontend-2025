'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import Button from "@/components/atoms/Button";
import Loader from "@/components/atoms/Loader";
import InputAdmin from "@/components/atoms/InputAdmin";
import TextareaAdmin from "@/components/atoms/TextAreaAdmin";
import FormSection from "@/components/molecules/admin/FormSection";
import InputListDinamica from "@/components/molecules/admin/InputListDinamica";
import ImageUpload from "@/components/molecules/admin/ImageUpload";
import { Producto, ProductoInput } from "@/types/admin/producto";


interface ProductFormProps {
    onSubmit: (data: ProductoInput) => void;
    onCancel: () => void;
    isLoading?: boolean;
    initialData?: Producto | null;
    mode?: "create" | "edit";
}

const defaultFormData: ProductoInput = {
    nombre: "",
    link: "",
    titulo: "",
    descripcion: "",
    precio: 0,
    categoria: "",
    imagen_principal: {
        file: "",
        alt: ""
    },
    galeria: [],
    especificaciones: [""],
    beneficios: [""],
    meta_titulo: "",
    meta_descripcion: "",
    keywords: [""]
};

export default function ProductForm({
    onSubmit,
    onCancel,
    isLoading = false,
    initialData = null,
    mode = "create"
}: ProductFormProps) {
    const [formData, setFormData] = useState<ProductoInput>(defaultFormData);

    const [galeriaExistente, setGaleriaExistente] = useState<string[]>([]);

    // imagenes nueva a subir
    const [galeriaPreview, setGaleriaPreview] = useState<string[]>([]);

    // Cargar datos iniciales para editar
    useEffect(() => {
        if (initialData && mode === "edit") {
            setFormData({
                nombre: initialData.nombre,
                link: initialData.slug,
                titulo: initialData.titulo_corto,
                descripcion: initialData.descripcion,
                precio: Number(initialData.precio),
                categoria: initialData.categoria || "",
                imagen_principal: {
                    file: initialData.imagen_principal?.url || null,
                    alt: initialData.imagen_principal?.alt || ""
                },
                galeria: [],
                meta_titulo: initialData.seo.meta_titulo || "",
                meta_descripcion: initialData.seo.meta_descripcion || "",
                keywords: initialData.seo.keywords?.length > 0 ? initialData.seo.keywords : [""],
                especificaciones: initialData.especificaciones?.length > 0 ? initialData.especificaciones : [""],
                beneficios: initialData.beneficios?.length > 0 ? initialData.beneficios : [""],
            });

            const urlsGaleria = initialData.galeria
                ?.map(img => img.url)
                .filter((url): url is string => url !== null) || [];

            console.log(initialData.galeria)
            setGaleriaExistente(urlsGaleria);
        }
    }, [initialData, mode]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === "precio" ? Number(value) : value }));
    };

    const handleAddGaleriaImage = (file: File | null) => {
        if (file) {
            setFormData(prev => ({
                ...prev,
                galeria: [...prev.galeria, file]
            }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setGaleriaPreview(prev => [...prev, reader.result as string]);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveNewImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            galeria: prev.galeria.filter((_, i) => i !== index)
        }));
        setGaleriaPreview(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-h-[70vh] overflow-y-auto pr-2">

            {/* Seccion datos para Dashboard */}
            <FormSection title="Datos para Dashboard (Gestión Interna)">
                <InputAdmin
                    label="Nombre del Producto"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Nombre del producto"
                    helperText="Máx. 255 caracteres (letras, números y espacios)."
                    maxLength={255}
                    required
                />

                <InputAdmin
                    label="Sección/Categoría"
                    name="categoria"
                    value={formData.categoria || ""}
                    onChange={handleInputChange}
                    placeholder="Ej: Letreros LED, Sillas LED, Pisos LED, etc."
                    helperText="Máx. 255 caracteres (letras, números y espacios)."
                    maxLength={255}
                    required
                />

                <InputAdmin
                    label="Precio"
                    name="precio"
                    type="number"
                    value={formData.precio}
                    onChange={handleInputChange}
                    placeholder="Ej: $500.00"
                    helperText="Coloca el precio en números (máx. 100 000)."
                    required
                />

                <InputAdmin
                    label="Link/URL"
                    name="link"
                    value={formData.link}
                    onChange={handleInputChange}
                    placeholder="ej: letreros-neon-led"
                    helperText="Solo minúsculas y guiones. Hasta 255 letras, números o espacios."
                    maxLength={255}
                    required
                />

                <InputAdmin
                    label="Meta Título (SEO)"
                    name="meta_titulo"
                    value={formData.meta_titulo || ""}
                    onChange={handleInputChange}
                    placeholder="Título para SEO del producto"
                    helperText="Máx. 70 caracteres (letras, números y espacios)."
                    maxLength={70}
                />

                <TextareaAdmin
                    label="Meta Descripción (SEO)"
                    name="meta_descripcion"
                    value={formData.meta_descripcion || ""}
                    onChange={handleInputChange}
                    placeholder="Descripción breve del producto para SEO…"
                    helperText="Máx. 160 caracteres (letras, números y espacios)."
                    maxLength={160}
                    rows={2}
                />

                <InputListDinamica
                    label="Keywords (SEO)"
                    items={formData.keywords}
                    onChange={(keywords) => setFormData(prev => ({ ...prev, keywords }))}
                    placeholder="ej: letreros para negocio"
                    addButtonText="+ Agregar keyword"
                    helperText="Palabras clave relevantes para que los buscadores encuentren el producto."
                />
            </FormSection>

            {/* Seccion datos para Frontend */}
            <FormSection title="Datos para Página de Producto (Frontend)">
                <InputAdmin
                    label="Título Hero (Aparece sobre la imagen principal)"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleInputChange}
                    placeholder="Ej: Letreros Neón LED"
                    helperText="Máx. 255 caracteres (letras, números y espacios)."
                    maxLength={255}
                    required
                />

                <TextareaAdmin
                    label="Descripción (Sección 'Información')"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    placeholder="Describe el producto, sus usos y características principales…"
                    helperText="Descripción detallada. 300–600 palabras."
                    rows={6}
                    required
                />
            </FormSection>

            {/* Seccion especificaciones */}
            <FormSection title="Especificaciones (Checkmarks en el producto)">
                <InputListDinamica
                    label="Especificaciones"
                    items={formData.especificaciones}
                    onChange={(especificaciones) => setFormData(prev => ({ ...prev, especificaciones }))}
                    placeholder="Ej: Materiales duraderos"
                    addButtonText="+ Agregar especificación"
                />
            </FormSection>

            {/* Seccion beneficios */}
            <FormSection title="Beneficios (Lista en el producto)">
                <InputListDinamica
                    label="Beneficios"
                    items={formData.beneficios}
                    onChange={(beneficios) => setFormData(prev => ({ ...prev, beneficios }))}
                    placeholder="Ej: Iluminación con colores vibrantes"
                    addButtonText="+ Agregar beneficio"
                />
            </FormSection>

            { /* Galeria */}
            {mode === "edit" && galeriaExistente.length > 0 && (
                <FormSection title="Galería Actual">
                    <p className="text-gray-500 text-sm mb-3">
                        Imágenes actuales del producto.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {galeriaExistente.map((url, index) => (
                            <div
                                key={index}
                                className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200"
                            >
                                <Image
                                    src={"http://127.0.0.1:8000"+url}
                                    alt={`Imagen galería ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </FormSection>
            )}

            {/* Seccion imagenes */}
            <FormSection title="Imágenes del Producto">
                {/* Preview de imágenes nuevas */}
                {galeriaPreview.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
                        {galeriaPreview.map((preview, index) => (
                            <div
                                key={index}
                                className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-green-300"
                            >
                                <Image
                                    src={preview}
                                    alt={`Nueva imagen ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveNewImage(index)}
                                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                >
                                    <IoClose size={14} />
                                </button>
                                <span className="absolute bottom-1 left-1 bg-green-500 text-white text-xs px-2 py-0.5 rounded">
                                    Nueva
                                </span>
                            </div>
                        ))}
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ImageUpload
                        label="Imagen para Lista de Productos"
                        description="Esta imagen aparece en la página 'Nuestros Productos' y es obligatoria."
                        altValue={formData.imagen_principal.alt}
                        onAltChange={(alt) => setFormData(prev => ({ ...prev, imagen_principal: { ...prev.imagen_principal, alt } }))}
                        onFileChange={(file) => setFormData(prev => ({ ...prev, imagen_principal: { ...prev.imagen_principal, file } }))}
                        currentImage={typeof formData.imagen_principal.file === "string" ? formData.imagen_principal.file !== ""  ? "http://127.0.0.1:8000"+formData.imagen_principal.file : "" : null}
                        required
                    />

                    <ImageUpload
                        label="Imagen Hero del Producto (Banner Principal)"
                        description="Imagen de fondo grande en la página individual del producto."
                        altValue={""}
                        onAltChange={(alt) => { }}
                        onFileChange={(file) => {
                            if (file) {
                                setFormData(prev => ({
                                    ...prev,
                                    galeria: [...prev.galeria, file]
                                }));
                            }
                        }}
                        currentImage={""}
                    />

                    <ImageUpload
                        label="Imagen para Especificaciones (Sección Izquierda)"
                        description="Imagen que acompaña la sección de especificaciones."
                        altValue={""}
                        onAltChange={(alt) => { }}
                        onFileChange={(file) => {
                            if (file) {
                                setFormData(prev => ({
                                    ...prev,
                                    galeria: [...prev.galeria, file]
                                }));
                            }
                        }}
                        currentImage={""}
                    />

                    <ImageUpload
                        label="Imagen para Beneficios (Sección Derecha)"
                        description="Imagen que acompaña la sección de beneficios."
                        altValue={""}
                        onAltChange={(alt) => { }}
                        onFileChange={(file) => {
                            if (file) {
                                setFormData(prev => ({
                                    ...prev,
                                    galeria: [...prev.galeria, file]
                                }));
                            }
                        }}
                        currentImage={""}
                    />

                    <ImageUpload
                        label="Imagen para Popups"
                        description="Imagen que acompaña los popups de registro de clientes."
                        altValue={""}
                        onAltChange={(alt) => { }}
                        onFileChange={(file) => {
                            if (file) {
                                setFormData(prev => ({
                                    ...prev,
                                    galeria: [...prev.galeria, file]
                                }));
                            }
                        }}
                        currentImage={""}
                    />
                </div>
            </FormSection>

            {/* Botones de accion */}
            <div className="flex gap-4 sticky bottom-0 bg-white pt-4 pb-2 border-t border-gray-200 mx-4">
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
                        mode === "create" ? "Añadir Producto" : "Guardar Cambios"
                    )}
                </Button>
            </div>
        </form>
    );
}