"use client";

import React from "react";
import Image from "next/image";
import InputAdmin from "@/components/atoms/InputAdmin";
import TextAreaAdmin from "@/components/atoms/TextAreaAdmin";
import Button from "@/components/atoms/Button";
import Loader from "@/components/atoms/Loader";
import Select from "@/components/atoms/Select";
import FormSection from "@/components/molecules/admin/FormSection";
import ImageUpload from "@/components/molecules/admin/ImageUpload";
import InputListDinamica from "@/components/molecules/admin/InputListDinamica";
import SecondaryImagesUpload from "@/components/molecules/admin/SecondaryImagesUpload";

interface BlogFormProps {
    formData: {
        nombre: string;
        productoId: string;
        subtitulo: string;
        meta_titulo?: string;
        meta_descripcion?: string;
        link_amigable?: string;
        imagen_principal: {
            file: File | string;
            alt: string;
        };
        imagenes_secundarias: File[];
        video_url?: string;
        parrafo1: string;
        beneficios: string[];
        parrafo2: string;
    };
    previewSecundarias: string[];
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onBeneficioChange: (index: number, value: string) => void;
    onImageChange: (file: File | null) => void;
    onImageAltChange: (alt: string) => void;
    onSecondaryImageChange: (index: number, file: File) => void;
    onBeneficiosChange: (beneficios: string[]) => void;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
    isLoading?: boolean;
    mode?: "create" | "edit";
    productos: Array<{ id: string; nombre: string }>;
}

export default function BlogForm({
    formData,
    previewSecundarias,
    onInputChange,
    onBeneficioChange,
    onImageChange,
    onImageAltChange,
    onSecondaryImageChange,
    onBeneficiosChange,
    onSubmit,
    onCancel,
    isLoading = false,
    mode = "create",
    productos,
}: BlogFormProps) {

    return (
        <form
            onSubmit={onSubmit}
            className="flex flex-col gap-6 max-h-[70vh] overflow-y-auto pr-2"
        >
            {/* SECCIÓN: INFO PRINCIPAL & SEO */}
            <FormSection title="Información Principal & SEO">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Producto */}
                    <div className="col-span-1 md:col-span-4">
                        <Select
                            label="Producto"
                            name="productoId"
                            value={formData.productoId}
                            onChange={onInputChange}
                            options={productos.map((p) => ({
                                value: p.id,
                                label: p.nombre,
                            }))}
                            placeholder="-- Selecciona un producto --"
                            required
                            helperText="Selecciona el producto relacionado con este blog. Requerido."
                            selectedText="Producto seleccionado"
                        />
                    </div>

                    {/* Subtítulo */}
                    <div className="col-span-1 md:col-span-2">
                        <InputAdmin
                            label="Subtítulo"
                            name="subtitulo"
                            value={formData.subtitulo}
                            onChange={onInputChange}
                            placeholder="Máx. 120 caracteres"
                            maxLength={120}
                            required
                        />

                        <small className="text-gray-500 block mt-1">
                            Máx. 120 caracteres (letras, números y espacios).
                        </small>
                    </div>

                    {/* Meta Título */}
                    <div className="col-span-1 md:col-span-2">
                        <InputAdmin
                            label="Meta Título (SEO)"
                            name="meta_titulo"
                            value={formData.meta_titulo || ""}
                            onChange={onInputChange}
                            placeholder="Título optimizado para SEO"
                            maxLength={70}
                        />

                        <small className="text-gray-500 block mt-1">
                            Máx. 70 caracteres (letras, números y espacios).
                        </small>
                    </div>

                    {/* Meta Descripción */}
                    <div className="col-span-1 md:col-span-4">
                        <TextAreaAdmin
                            label="Meta Descripción (SEO)"
                            name="meta_descripcion"
                            value={formData.meta_descripcion || ""}
                            onChange={onInputChange}
                            placeholder="Descripción optimizada para SEO"
                            maxLength={160}
                            rows={2}
                        />

                        <small className="text-gray-500 block mt-1">
                            Máx. 160 caracteres (letras, números y espacios).
                        </small>
                    </div>

                    {/* Link Amigable */}
                    <div className="col-span-1 md:col-span-4">
                        <InputAdmin
                            label="Link (URL amigable)"
                            name="link_amigable"
                            value={formData.link_amigable || ""}
                            onChange={onInputChange}
                            placeholder="ejemplo: mi-blog-post"
                            maxLength={255}
                        />

                        <small className="text-gray-500">
                            Escribe solo letras y guiones. Máx. 255 caracteres.
                        </small>
                    </div>
                </div>
            </FormSection>

            {/* SECCIÓN: IMÁGENES */}
            <FormSection title="Imagen Principal">
                <ImageUpload
                    label="Imagen Principal del Blog"
                    description="Esta imagen aparece en la lista de blogs."
                    altValue={formData.imagen_principal.alt}
                    onAltChange={onImageAltChange}
                    onFileChange={onImageChange}
                    currentImage={
                        typeof formData.imagen_principal.file === "string"
                            ? formData.imagen_principal.file !== ""
                                ? formData.imagen_principal.file
                                : ""
                            : null
                    }
                    required
                />
            </FormSection>

            {/* Imágenes Secundarias */}
            <FormSection title="Imágenes Secundarias">
                <p className="text-teal-700 text-sm mb-6">
                    Imágenes adicionales del artículo. Se creará un registro por archivo
                    en la tabla imagen_blogs.
                </p>

                <SecondaryImagesUpload
                    previewImages={previewSecundarias}
                    files={formData.imagenes_secundarias}
                    onImageChange={onSecondaryImageChange}
                    maxImages={3}
                />
            </FormSection>

            {/* SECCIÓN: VIDEO */}
            <FormSection title="Video">
                <InputAdmin
                    label="URL del Video"
                    name="video_url"
                    type="url"
                    value={formData.video_url || ""}
                    onChange={onInputChange}
                    placeholder="https://ejemplo.com/video"
                />

                <small className="text-gray-500">
                    Ingresa la URL completa del video. Máx. 255 caracteres.
                </small>
            </FormSection>

            {/* SECCIÓN: CONTENIDO */}
            <FormSection title="Contenido del Blog">
                {/* Párrafo 1 */}
                <div className="mb-8">
                    <TextAreaAdmin
                        label="Párrafo 1 (Introducción)"
                        name="parrafo1"
                        value={formData.parrafo1}
                        onChange={onInputChange}
                        placeholder="Escribe aquí la introducción del blog..."
                        rows={5}
                        required
                    />

                    <small className="text-gray-500 block mt-1">
                        Este párrafo aparecerá en la primera sección del blog.
                    </small>
                </div>

                {/* Beneficios */}
                <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                        Lista de Beneficios <span className="text-red-500">*</span>
                    </h4>

                    <small className="text-gray-500 block mb-4">
                        3 beneficios requeridos. Cada beneficio aparecerá como un ítem en la
                        lista.
                    </small>

                    <InputListDinamica
                        label="Beneficios"
                        items={formData.beneficios}
                        onChange={onBeneficiosChange}
                        placeholder="Describe el beneficio..."
                        addButtonText="+ Agregar beneficio"
                    />
                </div>

                {/* Párrafo 2 */}
                <div>
                    <TextAreaAdmin
                        label="Párrafo 2 (Conclusión/Testimonio)"
                        name="parrafo2"
                        value={formData.parrafo2}
                        onChange={onInputChange}
                        placeholder="Escribe aquí la conclusión o testimonio del blog..."
                        rows={5}
                        required
                    />

                    <small className="text-gray-500 block mt-1">
                        Este párrafo aparecerá en la sección de testimonio del cliente.
                    </small>
                </div>
            </FormSection>

            {/* BOTONES */}
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
                    ) : mode === "create" ? (
                        "Añadir Blog"
                    ) : (
                        "Guarcar Cambios"
                    )}
                </Button>
            </div>
        </form>
    );
}
