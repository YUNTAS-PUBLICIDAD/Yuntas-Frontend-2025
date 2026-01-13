'use client';

import { useState, useCallback } from "react";
import { Lead, LeadInput, LeadServiceResponse } from "@/types/admin/lead";
import {
    getLeadsService,
    createLeadService,
    updateLeadService,
    deleteLeadService
} from "@/services/leadsService";

interface UseLeadsReturn {
    leads: Lead[];
    isLoading: boolean;
    error: string | null;
    getLeads: (perPage?: number) => Promise<void>;
    createLead: (lead: LeadInput) => Promise<LeadServiceResponse<Lead>>;
    updateLead: (id: number, lead: LeadInput) => Promise<LeadServiceResponse<Lead>>;
    deleteLead: (id: number) => Promise<LeadServiceResponse>;
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

        const result = await getLeadsService(perPage);

        if (result.success && result.data) {
            setLeads(result.data);
        } else {
            setError(result.message || 'Error desconocido');
            setLeads([]);
        }

        setIsLoading(false);
    }, []);

    const updateLead = useCallback(async (id: number, leadData: LeadInput): Promise<LeadServiceResponse<Lead>> => {
        setIsLoading(true);
        setError(null);

        const result = await updateLeadService(id, leadData);

        setIsLoading(false);
        return result;

    }, []);

    const createLead = useCallback(async (leadData: LeadInput): Promise<LeadServiceResponse<Lead>> => {
        setIsLoading(true);
        setError(null);

        const result = await createLeadService(leadData);

        setIsLoading(false);
        return result;
    }, []);

    const deleteLead = useCallback(async (id: number): Promise<LeadServiceResponse> => {
        setIsLoading(true);
        setError(null);

        const result = await deleteLeadService(id);

        if (!result.success) {
            setError(result.message || 'Error desconocido');
        }

        setIsLoading(false);
        return result;
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