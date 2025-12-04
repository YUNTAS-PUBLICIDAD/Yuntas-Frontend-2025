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

interface ProductFormProps {
    onSubmit: (data: ProductoInput) => void;
    onCancel: () => void;
    isLoading?: boolean;
    initialData?: Producto | null;
    mode?: "create" | "edit";
}

const defaultFormData: ProductoInput = {
    nombre: "",
    seccion: "",
    precio: 0,
    link: "",
    meta_titulo: "",
    meta_descripcion: "",
    keywords: [""],
    titulo: "",
    descripcion: "",
    especificaciones: [""],
    beneficios: [""],
    imagen_principal: null,
    text_alt_principal: "",
    imagenes: {
        hero: { file: null, alt: "" },
        especificaciones: { file: null, alt: "" },
        beneficios: { file: null, alt: "" },
        popup: { file: null, alt: "" },
    }
};

export default function ProductForm({
    onSubmit,
    onCancel,
    isLoading = false,
    initialData = null,
    mode = "create"
}: ProductFormProps) {
    const [formData, setFormData] = useState<ProductoInput>(defaultFormData);

    // Cargar datos iniciales para editar
    useEffect(() => {
        if (initialData && mode === "edit") {
            setFormData({
                nombre: initialData.nombre,
                seccion: initialData.seccion,
                precio: 0, // por mientras, ya que el backend no devuelve el precio
                link: initialData.link,
                meta_titulo: initialData.etiqueta?.meta_titulo || "",
                meta_descripcion: initialData.etiqueta?.meta_descripcion || "",
                keywords: initialData.etiqueta?.keywords?.length > 0 ? initialData.etiqueta.keywords : [""],
                titulo: initialData.titulo,
                descripcion: initialData.descripcion,
                especificaciones: initialData.especificaciones?.length > 0 ? initialData.especificaciones : [""],
                beneficios: initialData.beneficios?.length > 0 ? initialData.beneficios : [""],
                imagen_principal: initialData.imagen_principal,
                text_alt_principal: initialData.text_alt_principal || "",
                imagenes: {
                    hero: {
                        file: initialData.imagenes?.[0]?.url_imagen || null,
                        alt: initialData.imagenes?.[0]?.texto_alt_SEO || ""
                    },
                    especificaciones: {
                        file: initialData.imagenes?.[1]?.url_imagen || null,
                        alt: initialData.imagenes?.[1]?.texto_alt_SEO || ""
                    },
                    beneficios: {
                        file: initialData.imagenes?.[2]?.url_imagen || null,
                        alt: initialData.imagenes?.[2]?.texto_alt_SEO || ""
                    },
                    popup: {
                        file: initialData.imagenes?.[3]?.url_imagen || null,
                        alt: initialData.imagenes?.[3]?.texto_alt_SEO || ""
                    },
                }
            });
        }
    }, [initialData, mode]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === "precio" ? Number(value) : value }));
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
                    name="seccion"
                    value={formData.seccion}
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
                    value={formData.meta_titulo}
                    onChange={handleInputChange}
                    placeholder="Título para SEO del producto"
                    helperText="Máx. 70 caracteres (letras, números y espacios)."
                    maxLength={70}
                />

                <TextareaAdmin
                    label="Meta Descripción (SEO)"
                    name="meta_descripcion"
                    value={formData.meta_descripcion}
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

            {/* Seccion imagenes */}
            <FormSection title="Imágenes del Producto">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-2">
                    <p className="text-blue-800 text-sm font-medium">Estructura de imágenes:</p>
                    <ul className="text-blue-700 text-xs mt-1 list-disc list-inside">
                        <li><strong>Lista Productos:</strong> imagen_principal</li>
                        <li><strong>Hero:</strong> images[0]</li>
                        <li><strong>Especificaciones:</strong> images[1]</li>
                        <li><strong>Beneficios:</strong> images[2]</li>
                        <li><strong>Popups:</strong> images[3]</li>
                    </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ImageUpload
                        label="Imagen para Lista de Productos"
                        description="Esta imagen aparece en la página 'Nuestros Productos' y es obligatoria."
                        altValue={formData.text_alt_principal}
                        onAltChange={(alt) => setFormData(prev => ({ ...prev, text_alt_principal: alt }))}
                        onFileChange={(file) => setFormData(prev => ({ ...prev, imagen_principal: file }))}
                        currentImage={typeof formData.imagen_principal === "string" ? formData.imagen_principal : null}
                        required
                    />

                    <ImageUpload
                        label="Imagen Hero del Producto (Banner Principal)"
                        description="Imagen de fondo grande en la página individual del producto."
                        altValue={formData.imagenes.hero.alt}
                        onAltChange={(alt) => setFormData(prev => ({
                            ...prev,
                            imagenes: { ...prev.imagenes, hero: { ...prev.imagenes.hero, alt } }
                        }))}
                        onFileChange={(file) => setFormData(prev => ({
                            ...prev,
                            imagenes: { ...prev.imagenes, hero: { ...prev.imagenes.hero, file } }
                        }))}
                        currentImage={typeof formData.imagenes.hero.file === "string" ? formData.imagenes.hero.file : null}
                    />

                    <ImageUpload
                        label="Imagen para Especificaciones (Sección Izquierda)"
                        description="Imagen que acompaña la sección de especificaciones."
                        altValue={formData.imagenes.especificaciones.alt}
                        onAltChange={(alt) => setFormData(prev => ({
                            ...prev,
                            imagenes: { ...prev.imagenes, especificaciones: { ...prev.imagenes.especificaciones, alt } }
                        }))}
                        onFileChange={(file) => setFormData(prev => ({
                            ...prev,
                            imagenes: { ...prev.imagenes, especificaciones: { ...prev.imagenes.especificaciones, file } }
                        }))}
                        currentImage={typeof formData.imagenes.especificaciones.file === "string" ? formData.imagenes.especificaciones.file : null}
                    />

                    <ImageUpload
                        label="Imagen para Beneficios (Sección Derecha)"
                        description="Imagen que acompaña la sección de beneficios."
                        altValue={formData.imagenes.beneficios.alt}
                        onAltChange={(alt) => setFormData(prev => ({
                            ...prev,
                            imagenes: { ...prev.imagenes, beneficios: { ...prev.imagenes.beneficios, alt } }
                        }))}
                        onFileChange={(file) => setFormData(prev => ({
                            ...prev,
                            imagenes: { ...prev.imagenes, beneficios: { ...prev.imagenes.beneficios, file } }
                        }))}
                        currentImage={typeof formData.imagenes.beneficios.file === "string" ? formData.imagenes.beneficios.file : null}
                    />

                    <ImageUpload
                        label="Imagen para Popups"
                        description="Imagen que acompaña los popups de registro de clientes."
                        altValue={formData.imagenes.popup.alt}
                        onAltChange={(alt) => setFormData(prev => ({
                            ...prev,
                            imagenes: { ...prev.imagenes, popup: { ...prev.imagenes.popup, alt } }
                        }))}
                        onFileChange={(file) => setFormData(prev => ({
                            ...prev,
                            imagenes: { ...prev.imagenes, popup: { ...prev.imagenes.popup, file } }
                        }))}
                        currentImage={typeof formData.imagenes.popup.file === "string" ? formData.imagenes.popup.file : null}
                    />
                </div>
            </FormSection>

            {/* Botones de accion */}
            <div className="flex gap-4 sticky bottom-0 bg-white pt-4 border-t border-gray-200">
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