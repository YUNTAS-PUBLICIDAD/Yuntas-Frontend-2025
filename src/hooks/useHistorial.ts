'use client';

import { useState, useCallback } from "react";
import { getActivityLogsService } from "@/services/activitylogService";

export interface Historial {
    action: string;
    section: string;
    date: string;
    hour: string;
}

interface UseHistorialReturn {
    historial: Historial[];
    isLoading: boolean;
    error: string | null;
    getHistorial: () => Promise<void>;
    clearError: () => void;
}

export function useHistorial(): UseHistorialReturn {

    const [historial, setHistorial] = useState<Historial[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const clearError = () => setError(null);

    const getHistorial = useCallback(async () => {

        setIsLoading(true);
        setError(null);

        const result = await getActivityLogsService();

        if (result.success && result.data) {
            setHistorial(result.data);
        } else {
            setError(result.message || "Error desconocido");
            setHistorial([]);
        }

        setIsLoading(false);

    }, []);

    return {
        historial,
        isLoading,
        error,
        getHistorial,
        clearError,
    };
}