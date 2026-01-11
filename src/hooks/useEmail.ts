'use client';

import { useState, useCallback } from "react";
import {
    emailPlantilla,
    EmailFormData,
    emailPlantillaServiceResponse,
    sendEmailCampanaResponse,
} from "@/types/admin/emailPlantilla";
import {
    getEmailPlantillaByProductService,
    saveEmailPlantillaService,
    sendEmailCampanaService,
} from "@/services/emailService";

interface UseEmailReturn {
    emailPlantillas: emailPlantilla[];
    isLoading: boolean;
    isSaving: boolean;
    isActivating: boolean;
    error: string | null;
    getEmailPlantillas: (product_id: number) => Promise<void>;
    saveEmailPlantilla: (emailData: EmailFormData) => Promise<emailPlantillaServiceResponse<emailPlantilla>>;
    sendEmailCampana: (product_id: number) => Promise<sendEmailCampanaResponse>;
    clearError: () => void;
    clearEmailPlantillas: () => void;
}

export function useEmail(): UseEmailReturn {
    const [emailPlantillas, setEmailPlantillas] = useState<emailPlantilla[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isActivating, setIsActivating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const clearError = () => setError(null);
    const clearEmailPlantillas = () => setEmailPlantillas([]);

    const getEmailPlantillas = useCallback(async (product_id: number) => {
        setIsLoading(true);
        setError(null);

        const result = await getEmailPlantillaByProductService(product_id);
        if (result.success && result.data) {
            setEmailPlantillas(result.data);
        } else {
            setError(result.message || 'Error desconocido');
            setEmailPlantillas([]);
        }

        setIsLoading(false);
    }, []);

    const saveEmailPlantilla = useCallback(async (emailData: EmailFormData): Promise<emailPlantillaServiceResponse<emailPlantilla>> => {
        setIsSaving(true);
        setError(null);

        const result = await saveEmailPlantillaService(emailData);

        setIsSaving(false);
        return result;
    }, []);

    const sendEmailCampana = useCallback(async (product_id: number): Promise<sendEmailCampanaResponse> => {
        setIsActivating(true);
        setError(null);

        const result = await sendEmailCampanaService(product_id);

        setIsActivating(false);
        return result;
    }, []);

    return {
        emailPlantillas,
        isLoading,
        isSaving,
        isActivating,
        error,
        getEmailPlantillas,
        saveEmailPlantilla,
        sendEmailCampana,
        clearError,
        clearEmailPlantillas,
    };
}