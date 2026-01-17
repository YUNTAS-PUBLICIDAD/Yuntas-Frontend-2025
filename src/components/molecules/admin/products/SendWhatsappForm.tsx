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
    isConnected: boolean;
}

const defaultFormData: WhatsappPlantillaInput = {
    producto_id: "",
    imagen_principal: null,
    parrafo: "",
};

export default function SendWhatsappForm({ onClose, products, isConnected }: SendWhatsappFormProps) {
    const {
        getWhatsappPlantilla,
        whatsappPlantilla,
        saveWhatsappPlantilla,
        isLoading,
        isSaving,
        isActivating,
        clearWhatsappPlantilla,
        error,
    } = useWhatsapp();

    const [formData, setFormData] = useState<WhatsappPlantillaInput>(defaultFormData);

    // se carga la plantilla cuando cambia el producto
    useEffect(() => {
        clearWhatsappPlantilla();
        if (!formData.producto_id) {
            setFormData(defaultFormData);
            return;
        }

        getWhatsappPlantilla(Number(formData.producto_id));
    }, [formData.producto_id, getWhatsappPlantilla]);

    useEffect(() => {
        if (!whatsappPlantilla) {
            setFormData({
                producto_id: formData.producto_id,
                imagen_principal: null,
                parrafo: "",
            });
            return;
        }

        setFormData({
            producto_id: String(whatsappPlantilla.producto_id),
            imagen_principal: whatsappPlantilla.imagen_principal,
            parrafo: whatsappPlantilla.parrafo,
        });
    }, [whatsappPlantilla]);

    // Guardar plantilla
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.producto_id) {
            alert("Selecciona un producto");
            return;
        }
        if (!formData.imagen_principal) {
            alert("La imagen principal es requerida");
            return;
        }
        if (!formData.parrafo.trim()) {
            alert("El párrafo no puede estar vacío");
            return;
        }

        const result = await saveWhatsappPlantilla(formData);

        if (result.success) {
            onClose();
            alert("Plantilla guardada correctamente");
        } else {
            alert(result.message || "Error guardando plantilla");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-h-[75vh] overflow-y-auto">
            {!isConnected && (
                <div className="text-yellow-800 text-sm text-center">
                    WhatsApp no está conectado. Ve a la pestaña <strong>Conexión</strong> para escanear el código QR.
                </div>
            )}
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

            {/* Sección de Whatsapp */}
            <FormSection title={`Sección Whatsapp`}>
                {/* Principal */}
                <ImageUpload
                    label="Imagen Principal"
                    description="Esta imagen aparece como "
                    altValue=""
                    onAltChange={() => { }}
                    onFileChange={(file) => setFormData(prev => ({ ...prev, imagen_principal: file }))}
                    currentImage={
                        typeof formData.imagen_principal === "string" && formData.imagen_principal
                            ? formData.imagen_principal
                            : null
                    }
                    required
                    showAltInput={false}
                />

                <TextareaAdmin
                    label="Párrafo"
                    name="parrafo"
                    value={formData.parrafo}
                    onChange={(e) => setFormData(prev => ({ ...prev, parrafo: e.target.value }))}
                    placeholder="Escribe el párrafo"
                    helperText="Descripción o contenido de la sección."
                    rows={4}
                    required
                />
            </FormSection>

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

                {/* <Button
                    type="button"
                    variant="primary"
                    size="md"
                    className="flex-1"
                    onClick={() => {}}
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
                </Button> */}

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