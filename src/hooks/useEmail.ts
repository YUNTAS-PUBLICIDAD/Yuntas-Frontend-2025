'use client';

import { useState, useCallback } from "react";
import {
    emailPlantilla,
    EmailFormInput,
    emailPlantillaServiceResponse,
    sendEmailCampanaResponse,
} from "@/types/admin/emailPlantilla";
import {
    getEmailPlantillaByProductService,
    saveEmailPlantillaService,
    sendEmailService,
    sendEmailCampanaService,
    deleteEmailPlantillaService,
} from "@/services/emailService";
import { LeadInput } from "@/types/admin/lead";

interface UseEmailReturn {
    emailPlantillas: emailPlantilla[];
    isLoading: boolean;
    isSaving: boolean;
    isActivating: boolean;
    error: string | null;
    getEmailPlantillas: (product_id: number) => Promise<void>;
    saveEmailPlantilla: (emailData: EmailFormInput) => Promise<emailPlantillaServiceResponse<emailPlantilla>>;
    sendEmail: (leadData: LeadInput) => Promise<emailPlantillaServiceResponse<null>>;
    sendEmailCampana: (product_id: number) => Promise<sendEmailCampanaResponse>;
    deleteEmailPlantilla: (product_id: number, paso: number) => Promise<emailPlantillaServiceResponse<null>>;
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

    const getEmailPlantillas = useCallback(async (product_id: number): Promise<void> => {
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

    const saveEmailPlantilla = useCallback(async (emailData: EmailFormInput): Promise<emailPlantillaServiceResponse<emailPlantilla>> => {
        setIsSaving(true);
        setError(null);

        const result = await saveEmailPlantillaService(emailData);

        setIsSaving(false);
        return result;
    }, []);

    const sendEmail = useCallback(async (leadData: LeadInput): Promise<emailPlantillaServiceResponse<null>> => {
        setIsActivating(true);
        setError(null);

        const result = await sendEmailService(leadData);
        setIsActivating(false);
        return result;
    }, []);

    const sendEmailCampana = useCallback(async (product_id: number): Promise<sendEmailCampanaResponse> => {
        setIsActivating(true);
        setError(null);

        const result = await sendEmailCampanaService(product_id);

        setIsActivating(false);
        return result;
    }, []);

    const deleteEmailPlantilla = useCallback(async (product_id: number, paso: number): Promise<emailPlantillaServiceResponse<null>> => {
        setIsSaving(true);
        setError(null);

        const result = await deleteEmailPlantillaService(product_id, paso);

        setIsSaving(false);
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
        sendEmail,
        sendEmailCampana,
        deleteEmailPlantilla,
        clearError,
        clearEmailPlantillas,
    };
}