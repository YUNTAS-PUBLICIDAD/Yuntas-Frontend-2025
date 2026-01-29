'use client';

import { useState, useCallback } from "react";
import { Rol } from "@/types/admin/rol";
import {
    getRolesService,
} from "@/services/rolesService";

interface UseRolesReturn {
    roles: Rol[];
    isLoading: boolean;
    error: string | null;
    getRoles: (perPage?: number) => Promise<void>;
    clearError: () => void;
    clearRoles: () => void;
}

export function useRoles(): UseRolesReturn {
    const [roles, setRoles] = useState<Rol[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const clearError = () => setError(null);
    const clearRoles = () => setRoles([]);

    const getRoles = useCallback(async (perPage: number = 20) => {
        setIsLoading(true);
        setError(null);

        const result = await getRolesService(perPage);

        if (result.success && result.data) {
            setRoles(result.data);
        } else {
            setError(result.message || 'Error desconocido');
            setRoles([]);
        }

        setIsLoading(false);
    }, []);

    return {
        roles,
        isLoading,
        error,
        getRoles,
        clearError,
        clearRoles,
    };
}