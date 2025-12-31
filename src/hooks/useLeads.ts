'use client';

import { useState, useCallback } from "react";
import { Lead, LeadInput } from "@/types/admin/lead";
import {
    getLeadsAction,
    createLeadAction,
    updateLeadAction,
    deleteLeadAction
} from "@/actions/leadsActions";

interface UseLeadsReturn {
    leads: Lead[];
    isLoading: boolean;
    error: string | null;
    getLeads: (perPage?: number) => Promise<void>;
    createLead: (lead: LeadInput) => Promise<boolean>;
    updateLead: (id: number, lead: LeadInput) => Promise<boolean>;
    deleteLead: (id: number) => Promise<boolean>;
    clearError: () => void;
}

export function useLeads(): UseLeadsReturn {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const clearError = () => setError(null);

    const getLeads = useCallback(async (perPage: number = 20) => {
        setIsLoading(true);
        setError(null);

        const result = await getLeadsAction(perPage);
        console.log(result)

        if (result.success && result.data) {
            setLeads(result.data);
        } else {
            setError(result.message || 'Error desconocido');
        }

        setIsLoading(false);
    }, []);

    const updateLead = useCallback(async (id: number, leadData: LeadInput): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        const result = await updateLeadAction(id, leadData);
        if (!result.success) {
            setError(result.message || 'Error desconocido');
        }

        setIsLoading(false);
        return result.success;

    }, []);

    const createLead = useCallback(async (leadData: LeadInput): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        const result = await createLeadAction(leadData);
        if (!result.success) {
            setError(result.message || 'Error desconocido');
        }

        setIsLoading(false);
        return result.success;
    }, []);

    const deleteLead = useCallback(async (id: number): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        const result = await deleteLeadAction(id);

        if (!result.success) {
            setError(result.message || 'Error desconocido');
        }

        setIsLoading(false);
        return result.success;
    }, []);

    return {
        leads,
        isLoading,
        error,
        getLeads,
        createLead,
        updateLead,
        deleteLead,
        clearError,
    };
}