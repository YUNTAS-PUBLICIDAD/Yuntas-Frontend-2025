'use client';

import React, { useEffect, useState } from "react";
import Button from "@/components/atoms/Button";
import FormSection from "../FormSection";
import ImageUpload from "../ImageUpload"; 
import TextareaAdmin from "@/components/atoms/TextAreaAdmin";
import Loader from "@/components/atoms/Loader";
import SelectForm from "@/components/atoms/SelectForm";
import { Producto } from "@/types/admin/producto";
import { WhatsappPlantillaInput } from "@/types/admin/whatsappPlantilla";
import { useWhatsapp } from "@/hooks/useWhatsapp";

interface SendWhatsappFormProps {
    onClose: () => void;
    products: Producto[];
}

const defaultFormData: WhatsappPlantillaInput = {
    producto_id: "",
    imagen_principal: null,
    parrafo: "",
};

export default function SendWhatsappForm({ onClose, products }: SendWhatsappFormProps) {
    const {
        getWhatsappPlantilla,
        whatsappPlantilla,
        saveWhatsappPlantilla,
        isLoading,
        isSaving,
        clearWhatsappPlantilla,
        error,
    } = useWhatsapp();

    const [formData, setFormData] = useState<WhatsappPlantillaInput>(defaultFormData);

    //  Cargar plantilla
    useEffect(() => {
        clearWhatsappPlantilla();
        if (!formData.producto_id) {
            setFormData(prev => ({...defaultFormData, producto_id: prev.producto_id})); 
            return;
        }
        getWhatsappPlantilla(Number(formData.producto_id));
    }, [formData.producto_id, getWhatsappPlantilla]);

    // Llenar datos
    useEffect(() => {
        if (whatsappPlantilla) {
            setFormData({
                producto_id: String(whatsappPlantilla.producto_id),
                imagen_principal: whatsappPlantilla.imagen_principal,
                parrafo: whatsappPlantilla.parrafo,
            });
        } else {
            setFormData(prev => ({
                producto_id: prev.producto_id,
                imagen_principal: null,
                parrafo: "",
            }));
        }
    }, [whatsappPlantilla]);

    // Guardar
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.producto_id) {
            alert("Selecciona un producto");
            return;
        }
        if (!formData.parrafo.trim()) {
            alert("El párrafo no puede estar vacío");
            return;
        }
        
        if (!formData.imagen_principal) {
             alert("La imagen es requerida");
             return;
        }

        const result = await saveWhatsappPlantilla(formData);

        if (result.success) {
            alert("Plantilla guardada correctamente");
            onClose(); 
        } else {
            alert(result.message || "Error guardando plantilla");
        }
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            
            className="flex flex-col gap-6 max-h-[80vh] w-full overflow-y-auto overflow-x-hidden p-2"
        >
            
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

            {error && (<div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>)}

            <FormSection title="Configuración del Mensaje">
                <ImageUpload
                    label="Imagen Promocional"
                    description="Imagen que se enviará junto al texto."
                    altValue="Imagen Whatsapp"
                    onAltChange={() => { }}
                    onFileChange={(file) => setFormData(prev => ({ ...prev, imagen_principal: file }))}
                    currentImage={
                        typeof formData.imagen_principal === "string" 
                            ? formData.imagen_principal 
                            : (formData.imagen_principal instanceof File ? URL.createObjectURL(formData.imagen_principal) : null)
                    }
                    required={!formData.imagen_principal}
                    showAltInput={false}
                />

                <TextareaAdmin
                    label="Mensaje del WhatsApp"
                    name="parrafo"
                    value={formData.parrafo}
                    onChange={(e) => setFormData(prev => ({ ...prev, parrafo: e.target.value }))}
                    placeholder="Hola! Te envío información sobre..."
                    helperText="Este texto llegará al cliente junto con la imagen."
                    rows={6}
                    required
                />
            </FormSection>

            
            <div className="flex flex-col md:flex-row gap-4 sticky bottom-0 bg-white pt-4 pb-2 px-4 border-t border-gray-200 -mx-2 -mb-2 mt-auto z-10">
                <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="flex-1"
                    disabled={isLoading || isSaving}
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
                    variant="tertiary"
                    size="md"
                    className="flex-1"
                    onClick={onClose}
                    disabled={isSaving}
                >
                    Cancelar
                </Button>
            </div>
        </form>
    );
}