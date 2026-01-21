'use client';

import React, { useEffect, useState } from "react";
import Button from "@/components/atoms/Button";
import FormSection from "../FormSection";
import InputAdmin from "@/components/atoms/InputAdmin";
import ImageUpload from "../ImageUpload";
import TextareaAdmin from "@/components/atoms/TextAreaAdmin";
import Loader from "@/components/atoms/Loader";
import SelectForm from "@/components/atoms/SelectForm";
import { Producto } from "@/types/admin/producto";
import { showToast } from '@/utils/showToast'
import { EmailFormInput, EmailSectionInput } from "@/types/admin/emailPlantilla";
import { useEmail } from "@/hooks/useEmail";
import { parseEmailPlantillaData, createEmptySection, isSectionEmpty, isSectionComplete } from "@/utils/emailFormData";

interface SendEmailFormProps {
    onClose: () => void;
    products: Producto[];
}

const defaultFormData: EmailFormInput = {
    producto_id: "",
    sections: [
        createEmptySection(),
        createEmptySection(),
        createEmptySection(),
    ],
};

export default function SendEmailForm({ onClose, products }: SendEmailFormProps) {
    const {
        getEmailPlantillas,
        emailPlantillas,
        sendEmailCampana,
        saveEmailPlantilla,
        isLoading,
        isSaving,
        isActivating,
        clearEmailPlantillas,
        error,
    } = useEmail();

    const [formData, setFormData] = useState<EmailFormInput>(defaultFormData);
    const [imagePreviews, setImagePreviews] = useState<Map<string, string>>(new Map());

    // se carga la plantilla cuando cambia el producto
    useEffect(() => {

        clearEmailPlantillas();
        setImagePreviews(new Map());

        if (!formData.producto_id) {
            setFormData(prev => ({
                ...prev,
                sections: [createEmptySection(), createEmptySection(), createEmptySection()]
            }));
            return;
        }

        // Resetear a secciones vacias primero 
        setFormData(prev => ({
            ...prev,
            sections: [createEmptySection(), createEmptySection(), createEmptySection()]
        }));

        getEmailPlantillas(Number(formData.producto_id));
    }, [formData.producto_id, getEmailPlantillas]);

    useEffect(() => {
        if (!emailPlantillas || emailPlantillas.length === 0) return;

        const parsedSections = parseEmailPlantillaData(emailPlantillas);
        setFormData(prev => ({
            ...prev,
            sections: parsedSections
        }));
    }, [emailPlantillas]);

    // para cambios de texto (inputs y textareas)
    const handleInputChange = (index: number, field: "title" | "paragraph", value: string) => {
        setFormData(prev => {
            const newSections = [...prev.sections];
            newSections[index] = {
                ...newSections[index],
                [field]: value
            };
            return { ...prev, sections: newSections };
        });
    };

    // para cambio en imagenes
    const handleImageChange = (
        index: number,
        field: "mainImage" | "secondaryImage1" | "secondaryImage2",
        file: File | null
    ) => {
        setFormData(prev => {
            const newSections = [...prev.sections];
            const currentSection = { ...newSections[index] };

            // Si file es null, entonces se esta eliminando la imagen
            if (file === null) {
                currentSection[field] = null;
                const previewField = `${field}Preview` as keyof EmailSectionInput;
                currentSection[previewField] = "" as any;
            } else {
                // nueva imagen
                currentSection[field] = file;
            }

            newSections[index] = currentSection;
            return { ...prev, sections: newSections };
        });

        if (file instanceof File) {
            const previewKey = `${index}-${field}`;
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews(prev => {
                    const newMap = new Map(prev);
                    newMap.set(previewKey, reader.result as string);
                    return newMap;
                });
            };
            reader.readAsDataURL(file);
        } else if (file === null) {
            // Limpiar preview cuando se elimina
            const previewKey = `${index}-${field}`;
            setImagePreviews(prev => {
                const newMap = new Map(prev);
                newMap.delete(previewKey);
                return newMap;
            });
        }
    };

    const getImagePreview = (index: number, field: "mainImage" | "secondaryImage1" | "secondaryImage2"): string | null => {
        const section = formData.sections[index];
        const image = section[field];

        if (image instanceof File) {
            const previewKey = `${index}-${field}`;
            return imagePreviews.get(previewKey) || null;
        }

        if (typeof image === "string" && image) {
            return image;
        }

        const previewField = `${field}Preview` as keyof EmailSectionInput;
        return (section[previewField] as string) || null;
    };

    // Validaciones
    const validateForm = (): string | null => {
        if (!formData.producto_id) return "Selecciona un producto";

        const completeSections = formData.sections.filter(section => !isSectionEmpty(section));
        if (completeSections.length === 0) {
            return "Debes completar al menos una sección";
        }

        // se verifica que las secciones con datos esten completas
        for (let i = 0; i < formData.sections.length; i++) {
            const section = formData.sections[i];

            // Saltar secciones vacías
            if (isSectionEmpty(section)) continue;

            // Validar secciones parcialmente llenas
            if (!section.title.trim()) {
                return `El título es requerido en la sección ${i + 1}`;
            }
            if (!section.paragraph.trim()) {
                return `El párrafo es requerido en la sección ${i + 1}`;
            }

            const hasMainImage = section.mainImage instanceof File ||
                (typeof section.mainImage === 'string' && section.mainImage.length > 0) ||
                section.mainImagePreview.length > 0;

            if (!hasMainImage) {
                return `La imagen principal es requerida en la sección ${i + 1}`;
            }
        }

        return null;
    };

    // Guardar plantilla
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const error = validateForm();
        if (error) {
            showToast.warning(error);
            return;
        }

        // Filtrar solo secciones completas
        const sectionsToSave = formData.sections.filter(section => !isSectionEmpty(section));

        if (sectionsToSave.length === 0) {
            showToast.warning("No hay secciones completas para guardar");
            return;
        }

        const dataToSave: EmailFormInput = {
            producto_id: formData.producto_id,
            sections: sectionsToSave
        };

        const result = await saveEmailPlantilla(dataToSave);

        if (result.success) {
            showToast.success("Plantilla guardada correctamente");
            onClose();
        } else {
            showToast.error(result.message || "Error guardando plantilla");
        }
    };

    // Activar campaña
    const handleActivateCampaign = async () => {
        const error = validateForm();
        if (error) {
            showToast.warning(error);
            return;
        }

        // se verifica que haya al menos una seccion completa
        const completeSections = formData.sections.filter(section => isSectionComplete(section));

        if (completeSections.length === 0) {
            showToast.warning("Debes completar al menos una sección antes de activar la campaña");
            return;
        }

        const result = await sendEmailCampana(Number(formData.producto_id));

        if (result.success) {
            onClose();
            showToast.success(`Campaña enviada\n\nLeads: ${result.total_leads}\nCorreos: ${result.total_correos}`);
        } else {
            showToast.error(result.message || "Error enviando campaña");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-h-[80vh] overflow-y-auto">
            <FormSection title="Selección de Producto">
                <SelectForm
                    label="Selecciona un producto"
                    name="producto"
                    value={formData.producto_id}
                    onChange={(e) => setFormData(prev => ({ ...prev, producto_id: e.target.value }))}
                    required
                    options={products}
                />
            </FormSection>

            {error && (<span className="text-red-500 text-sm">{error}</span>)}

            {/* Secciones de Email */}
            {formData.sections.map((section, index) => (
                <FormSection key={index} title={`Sección Email ${index + 1}`}>
                    {/* Principal */}
                    <ImageUpload
                        label="Imagen Principal"
                        description="Esta imagen aparece como encabezado de la sección"
                        altValue=""
                        onAltChange={() => { }}
                        onFileChange={(file) => handleImageChange(index, "mainImage", file)}
                        currentImage={getImagePreview(index, "mainImage")}
                        showAltInput={false}
                    />

                    {/* Secundarias */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ImageUpload
                            label="Imagen Secundaria 1"
                            description="Primera imagen de apoyo"
                            altValue=""
                            onAltChange={() => { }}
                            onFileChange={(file) => handleImageChange(index, "secondaryImage1", file)}
                            currentImage={getImagePreview(index, "secondaryImage1")}
                            showAltInput={false}
                        />

                        <ImageUpload
                            label="Imagen Secundaria 2"
                            description="Segunda imagen de apoyo"
                            altValue=""
                            onAltChange={() => { }}
                            onFileChange={(file) => handleImageChange(index, "secondaryImage2", file)}
                            currentImage={getImagePreview(index, "secondaryImage2")}
                            showAltInput={false}
                        />
                    </div>

                    <InputAdmin
                        label="Título"
                        name={`title-${index}`}
                        value={section.title}
                        onChange={(e) => handleInputChange(index, "title", e.target.value)}
                        placeholder="Ej. Descubre nuestros productos"
                        helperText="Título principal de la sección del email."
                        maxLength={150}
                    />

                    <TextareaAdmin
                        label="Párrafo"
                        name={`paragraph-${index}`}
                        value={section.paragraph}
                        onChange={(e) => handleInputChange(index, "paragraph", e.target.value)}
                        placeholder="Describe el contenido de esta sección del email..."
                        helperText="Descripción o contenido de la sección."
                        rows={4}
                    />
                </FormSection>
            ))}

            <div className="flex flex-col md:flex-row gap-4 sticky bottom-0 bg-white pt-4 pb-2 px-4 border-t border-gray-200">
                <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="flex-1"
                    disabled={isLoading || isSaving || isActivating}
                >
                    {isSaving ? (
                        <div className="flex items-center justify-center gap-2">
                            <Loader size="sm" color="border-white" />
                            <span>Guardando...</span>
                        </div>
                    ) : (
                        "Guardar Plantilla"
                    )}
                </Button>

                <Button
                    type="button"
                    variant="primary"
                    size="md"
                    className="flex-1"
                    onClick={handleActivateCampaign}
                    disabled={isLoading || isSaving || isActivating}
                >
                    {isActivating ? (
                        <div className="flex items-center justify-center gap-2">
                            <Loader size="sm" color="border-white" />
                            <span>Activando...</span>
                        </div>
                    ) : (
                        "Activar Campaña"
                    )}
                </Button>

                <Button
                    type="button"
                    variant="tertiary"
                    size="md"
                    className="flex-1"
                    onClick={onClose}
                    disabled={isLoading || isSaving || isActivating}
                >
                    Cancelar
                </Button>
            </div>
        </form>
    );
}