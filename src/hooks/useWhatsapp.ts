'use client';

import { useState, useCallback } from "react";
import {
    WhatsappPlantilla,
    WhatsappPlantillaInput,
    WhatsappPlantillaServiceResponse,
    sendWhatsappCampanaResponse,
} from "@/types/admin/whatsappPlantilla";
import {
    getWhatsappPlantillaByProductService,
    saveWhatsappPlantillaService,
    sendWhatsappService,
    sendWhatsappCampanaService,
    requestQRService,
    resetSessionService,
} from "@/services/whatsappService";
import { LeadInput } from "@/types/admin/lead";

interface UseWhatsappReturn {
    whatsappPlantilla: WhatsappPlantilla | null;
    isLoading: boolean;
    isRequesting: boolean;
    isSaving: boolean;
    isActivating: boolean;
    error: string | null;
    getWhatsappPlantilla: (product_id: number) => Promise<void>;
    saveWhatsappPlantilla: (whatsappData: WhatsappPlantillaInput) => Promise<WhatsappPlantillaServiceResponse<WhatsappPlantilla>>;
    sendWhatsapp: (leadData: LeadInput) => Promise<WhatsappPlantillaServiceResponse<null>>;
    sendWhatsappCampana: (product_id: number) => Promise<sendWhatsappCampanaResponse>;
    clearError: () => void;
    clearWhatsappPlantilla: () => void;
    requestQR: () => Promise<WhatsappPlantillaServiceResponse<null>>;
    resetSession: () => Promise<WhatsappPlantillaServiceResponse<null>>;
}

export function useWhatsapp(): UseWhatsappReturn {
    const [whatsappPlantilla, setWhatsappPlantilla] = useState<WhatsappPlantilla | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isActivating, setIsActivating] = useState(false);
    const [isRequesting, setIsRequesting] = useState(false); // estado para solicitudes relacionadas a whatsapp
    const [error, setError] = useState<string | null>(null);

    const clearError = () => setError(null);
    const clearWhatsappPlantilla = () => setWhatsappPlantilla(null);

    const getWhatsappPlantilla = useCallback(async (product_id: number): Promise<void> => {
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

    const sendWhatsapp = useCallback(async (leadData: LeadInput): Promise<WhatsappPlantillaServiceResponse<null>> => {
        setIsActivating(true);
        setError(null);

        const result = await sendWhatsappService(leadData);
        setIsActivating(false);
        return result;
    }, []);

    const sendWhatsappCampana = useCallback(async (product_id: number): Promise<sendWhatsappCampanaResponse> => {
        setIsActivating(true);
        setError(null);

        const result = await sendWhatsappCampanaService(product_id);

        setIsActivating(false);
        return result;
    }, []);

    const requestQR = useCallback(async (): Promise<WhatsappPlantillaServiceResponse<null>> => {
        setIsRequesting(true);
        setError(null);

        const result = await requestQRService();
        setIsRequesting(false);
        return result;
    }, []);

    const resetSession = useCallback(async (): Promise<WhatsappPlantillaServiceResponse<null>> => {
        setIsRequesting(true);
        setError(null);

        const result = await resetSessionService();
        setIsRequesting(false);
        return result;
    }, []);

    return {
        whatsappPlantilla,
        isLoading,
        isSaving,
        isActivating,
        isRequesting,
        error,
        getWhatsappPlantilla,
        saveWhatsappPlantilla,
        sendWhatsapp,
        sendWhatsappCampana,
        clearError,
        clearWhatsappPlantilla,
        requestQR,
        resetSession
    };
}