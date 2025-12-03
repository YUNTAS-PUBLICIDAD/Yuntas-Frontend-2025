'use client';

import { useState, useCallback } from "react";
import { Producto, ProductoInput } from "@/types/admin/producto";
import {
    getProductosAction,
    getAllProductosAction,
    getProductoByIdAction,
    getProductoByLinkAction,
    createProductoAction,
    updateProductoAction,
    deleteProductoAction
} from "@/actions/productosActions";

interface PaginationMeta {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
}

interface UseProductosReturn {
    productos: Producto[];
    producto: Producto | null;
    meta: PaginationMeta | null;
    isLoading: boolean;
    error: string | null;
    getProductos: (page?: number, perPage?: number) => Promise<void>;
    getAllProductos: () => Promise<void>;
    getProductoById: (id: number | string) => Promise<void>;
    getProductoByLink: (link: string) => Promise<void>;
    createProducto: (producto: ProductoInput) => Promise<boolean>;
    updateProducto: (id: number | string, producto: Partial<ProductoInput>) => Promise<boolean>;
    deleteProducto: (id: number | string) => Promise<boolean>;
    clearError: () => void;
    clearProducto: () => void;
}

export function useProductos(): UseProductosReturn {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [producto, setProducto] = useState<Producto | null>(null);
    const [meta, setMeta] = useState<PaginationMeta | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const clearError = () => setError(null);
    const clearProducto = () => setProducto(null);

    const getProductos = useCallback(async (page: number = 1, perPage: number = 6) => {
        setIsLoading(true);
        setError(null);

        const result = await getProductosAction(page, perPage);

        if (result.success && result.data) {
            setProductos(result.data);
            setMeta(result.meta || null);
        } else {
            setError(result.message || 'Error desconocido');
        }

        setIsLoading(false);
    }, []);

    const getAllProductos = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        const result = await getAllProductosAction();

        if (result.success && result.data) {
            setProductos(result.data);
            setMeta(null);
        } else {
            setError(result.message || 'Error desconocido');
        }

        setIsLoading(false);
    }, []);

    const getProductoById = useCallback(async (id: number | string) => {
        setIsLoading(true);
        setError(null);

        const result = await getProductoByIdAction(id);

        if (result.success && result.data) {
            setProducto(result.data);
        } else {
            setError(result.message || 'Error desconocido');
        }

        setIsLoading(false);
    }, []);

    const getProductoByLink = useCallback(async (link: string) => {
        setIsLoading(true);
        setError(null);

        const result = await getProductoByLinkAction(link);

        if (result.success && result.data) {
            setProducto(result.data);
        } else {
            setError(result.message || 'Error desconocido');
        }

        setIsLoading(false);
    }, []);


    const createProducto = useCallback(async (productoData: ProductoInput): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        const result = await createProductoAction(productoData);

        if (!result.success) {
            setError(result.message || 'Error desconocido');
        }

        setIsLoading(false);
        return result.success;
    }, []);

    const updateProducto = useCallback(async (
        id: number | string,
        productoData: Partial<ProductoInput>
    ): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        const result = await updateProductoAction(id, productoData);

        if (!result.success) {
            setError(result.message || 'Error desconocido');
        }

        setIsLoading(false);
        return result.success;
    }, []);

    const deleteProducto = useCallback(async (id: number | string): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        const result = await deleteProductoAction(id);

        if (!result.success) {
            setError(result.message || 'Error desconocido');
        }

        setIsLoading(false);
        return result.success;
    }, []);

    return {
        productos,
        producto,
        meta,
        isLoading,
        error,
        getProductos,
        getAllProductos,
        getProductoById,
        getProductoByLink,
        createProducto,
        updateProducto,
        deleteProducto,
        clearError,
        clearProducto
    };
}