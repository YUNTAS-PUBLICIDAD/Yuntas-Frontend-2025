'use client';

import { useState, useCallback } from "react";
import { Reclamo, ReclamoInput } from "@/types/admin/reclamo";
import {
    getReclamosService,
    getReclamoByIdService,
    createReclamoService,
    replyReclamoService
} from "@/services/reclamosService";

interface UseReclamosReturn {
    reclamos: Reclamo[];
    reclamo: Reclamo | null;
    isLoading: boolean;
    error: string | null;
    getReclamos: (perPage?: number) => Promise<void>;
    getReclamoById: (id: number) => Promise<Reclamo | null>;
    createReclamo: (reclamo: ReclamoInput) => Promise<boolean>;
    replyReclamo: (id: number) => Promise<boolean>;
    clearError: () => void;
    clearReclamo: () => void;
}

export function useReclamos(): UseReclamosReturn {
    const [reclamos, setReclamos] = useState<Reclamo[]>([]);
    const [reclamo, setReclamo] = useState<Reclamo | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const clearError = () => setError(null);
    const clearReclamo = () => setReclamo(null);

    const getReclamos = useCallback(async (perPage: number = 20) => {
        setIsLoading(true);
        setError(null);

        const result = await getReclamosService(perPage);

        if (result.success && result.data) {
            setReclamos(result.data);
        } else {
            setError(result.message || 'Error desconocido');
        }

        setIsLoading(false);
    }, []);

    const getReclamoById = useCallback(async (id: number): Promise<Reclamo | null> => {
        setIsLoading(true);
        setError(null);

        const result = await getReclamoByIdService(id);
        if (result.success && result.data) {
            setReclamo(result.data);
            setIsLoading(false);
            return result.data;
        } else {
            setError(result.message || 'Error desconocido');
            setIsLoading(false);
            return null;
        }
    }, []);

    const createReclamo = useCallback(async (reclamoData: ReclamoInput): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        const result = await createReclamoService(reclamoData);
        if (!result.success) {
            setError(result.message || 'Error desconocido');
        }

        setIsLoading(false);
        return result.success;
    }, []);

    const replyReclamo = useCallback(async (id: number): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        const result = await replyReclamoService(id);

        if (!result.success) {
            setError(result.message || 'Error desconocido');
        }

        setIsLoading(false);
        return result.success;
    }, []);

    return {
        reclamos,
        reclamo,
        isLoading,
        error,
        getReclamos,
        getReclamoById,
        createReclamo,
        replyReclamo,
        clearError,
        clearReclamo,
    };
}