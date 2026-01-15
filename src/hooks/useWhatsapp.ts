'use client';

import { useState, useCallback } from "react";
import {
    WhatsappPlantilla,
    WhatsappPlantillaInput,
    WhatsappPlantillaServiceResponse,
} from "@/types/admin/whatsappPlantilla";
import {
    getWhatsappPlantillaByProductService,
    saveWhatsappPlantillaService,
} from "@/services/whatsappService";

interface UseWhatsappReturn {
    whatsappPlantilla: WhatsappPlantilla | null;
    isLoading: boolean;
    isSaving: boolean;
    isActivating: boolean;
    error: string | null;
    getWhatsappPlantilla: (product_id: number) => Promise<void>;
    saveWhatsappPlantilla: (whatsappData: WhatsappPlantillaInput) => Promise<WhatsappPlantillaServiceResponse<WhatsappPlantilla>>;
    clearError: () => void;
    clearWhatsappPlantilla: () => void;
}

export function useWhatsapp(): UseWhatsappReturn {
    const [whatsappPlantilla, setWhatsappPlantilla] = useState<WhatsappPlantilla | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isActivating, setIsActivating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const clearError = () => setError(null);
    const clearWhatsappPlantilla = () => setWhatsappPlantilla(null);

    const getWhatsappPlantilla = useCallback(async (product_id: number) : Promise<void> => {
        setIsLoading(true);
        setError(null);

        const result = await getWhatsappPlantillaByProductService(product_id);
        if (result.success) {
            setWhatsappPlantilla(result.data ?? null);
        } else {
            setError(result.message || 'Error desconocido');
            setWhatsappPlantilla(null);
        }

        setIsLoading(false);
    }, []);

    const saveWhatsappPlantilla = useCallback(async (whatsappData: WhatsappPlantillaInput): Promise<WhatsappPlantillaServiceResponse<WhatsappPlantilla>> => {
        setIsSaving(true);
        setError(null);

        const result = await saveWhatsappPlantillaService(whatsappData);
        setIsSaving(false);
        return result;
    }, []);

    return {
        whatsappPlantilla,
        isLoading,
        isSaving,
        isActivating,
        error,
        getWhatsappPlantilla,
        saveWhatsappPlantilla,
        clearError,
        clearWhatsappPlantilla,
    };
}