'use client';

import { useState, useCallback } from "react";
import { Contacto, ContactoInput } from "@/types/admin/contacto";
import {
    getContactosAction,
    getContactoByIdAction,
    createContactoAction,
    deleteContactoAction
} from "@/actions/contactosActions";

interface UseContactosReturn {
    contactos: Contacto[];
    contacto: Contacto | null;
    isLoading: boolean;
    error: string | null;
    getContactos: (perPage?: number) => Promise<void>;
    getContactoById: (id: number) => Promise<Contacto | null>;
    createContacto: (contacto: ContactoInput) => Promise<boolean>;
    deleteContacto: (id: number) => Promise<boolean>;
    clearError: () => void;
    clearContacto: () => void;
}

export function useContactos(): UseContactosReturn {
    const [contactos, setContactos] = useState<Contacto[]>([]);
    const [contacto, setContacto] = useState<Contacto | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const clearError = () => setError(null);
    const clearContacto = () => setContacto(null);

    const getContactos = useCallback(async (perPage: number = 20) => {
        setIsLoading(true);
        setError(null);

        const result = await getContactosAction(perPage);

        if (result.success && result.data) {
            setContactos(result.data);
        } else {
            setError(result.message || 'Error desconocido');
        }

        setIsLoading(false);
    }, []);

    const getContactoById = useCallback(async (id: number): Promise<Contacto | null> => {
        setIsLoading(true);
        setError(null);

        const result = await getContactoByIdAction(id);
        if (result.success && result.data) {
            setContacto(result.data);
            setIsLoading(false);
            return result.data;
        } else {
            setError(result.message || 'Error desconocido');
            setIsLoading(false);
            return null;
        }
    }, []);

    const createContacto = useCallback(async (contactoData: ContactoInput): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        const result = await createContactoAction(contactoData);
        if (!result.success) {
            setError(result.message || 'Error desconocido');
        }

        setIsLoading(false);
        return result.success;
    }, []);

    const deleteContacto = useCallback(async (id: number): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        const result = await deleteContactoAction(id);

        if (!result.success) {
            setError(result.message || 'Error desconocido');
        }

        setIsLoading(false);
        return result.success;
    }, []);

    return {
        contactos,
        contacto,
        isLoading,
        error,
        getContactos,
        getContactoById,
        createContacto,
        deleteContacto,
        clearError,
        clearContacto,
    };
}