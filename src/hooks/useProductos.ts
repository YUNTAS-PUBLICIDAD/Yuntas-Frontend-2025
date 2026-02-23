'use client';

import { useState, useCallback } from "react";
import {
    Producto,
    ProductoInput,
    ProductoServiceResponse
} from "@/types/admin/producto";
import {
    getProductosService,
    getProductoBySlugService,
    createProductoService,
    updateProductoService,
    deleteProductoService
} from "@/services/productosService";

interface UseProductosReturn {
    productos: Producto[];
    producto: Producto | null;
    isLoading: boolean;
    error: string | null;
    getProductos: (perPage?: number) => Promise<void>;
    getProductoBySlug: (slug: string) => Promise<void>;
    createProducto: (producto: ProductoInput) => Promise<ProductoServiceResponse<Producto>>;
    updateProducto: (id: number | string, producto: ProductoInput) => Promise<ProductoServiceResponse<Producto>>;
    deleteProducto: (id: number | string) => Promise<ProductoServiceResponse>;
    clearError: () => void;
    clearProducto: () => void;
}

export function useProductos(): UseProductosReturn {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [producto, setProducto] = useState<Producto | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null); // error solo se usa cuando se cargan datos

    const clearError = () => setError(null);
    const clearProducto = () => setProducto(null);

    const getProductos = useCallback(async (perPage: number = 6) => {
        setIsLoading(true);
        setError(null);

        const result = await getProductosService(perPage);

        if (result.success && result.data) {
            setProductos(result.data);
        } else {
            setError(result.message || 'Error desconocido');
        }

        setIsLoading(false);
    }, []);

    const getProductoBySlug = useCallback(async (slug: string): Promise<void> => {
        setIsLoading(true);
        setError(null);

        const result = await getProductoBySlugService(slug);

        if (result.success && result.data) {
            setProducto(result.data);
            setIsLoading(false);
        } else {
            setError(result.message || 'Error desconocido');
            setIsLoading(false);
        }
    }, []);

    const createProducto = useCallback(async (productoData: ProductoInput): Promise<ProductoServiceResponse<Producto>> => {
        setIsLoading(true);
        setError(null);

        const result = await createProductoService(productoData);

        setIsLoading(false);
        return result;
    }, []);

    const updateProducto = useCallback(async (id: number | string, productoData: ProductoInput): Promise<ProductoServiceResponse<Producto>> => {
        setIsLoading(true);
        setError(null);

        const result = await updateProductoService(id, productoData);

        setIsLoading(false);
        return result;
    }, []);

    const deleteProducto = useCallback(async (id: number | string): Promise<ProductoServiceResponse> => {
        setIsLoading(true);
        setError(null);

        const result = await deleteProductoService(id);

        setIsLoading(false);
        return result;
    }, []);

    return {
        productos,
        producto,
        isLoading,
        error,
        getProductos,
        getProductoBySlug,
        createProducto,
        updateProducto,
        deleteProducto,
        clearError,
        clearProducto,
    };
}