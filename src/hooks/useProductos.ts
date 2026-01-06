'use client';

import { useState, useCallback } from "react";
import {
    Producto,
    ProductoInput,
    PaginationMeta,
    PaginationLinks
} from "@/types/admin/producto";
import {
    getProductosService,
    getProductoBySlugService,
    createProductoService,
    updateProductoService,
    deleteProductoService
} from "@/services/productosService";
import { buildProductoFormData } from "@/utils/productFormData";

interface UseProductosReturn {
    productos: Producto[];
    producto: Producto | null;
    meta: PaginationMeta | null;
    links: PaginationLinks | null;
    isLoading: boolean;
    error: string | null;
    getProductos: (perPage?: number) => Promise<void>;
    goToPage: (url: string) => Promise<void>;
    goToNextPage: () => Promise<void>;
    goToPrevPage: () => Promise<void>;
    getProductoBySlug: (slug: string) => Promise<Producto | null>;
    createProducto: (producto: ProductoInput) => Promise<boolean>;
    updateProducto: (id: number | string, producto: ProductoInput) => Promise<boolean>;
    deleteProducto: (id: number | string) => Promise<boolean>;
    clearError: () => void;
    clearProducto: () => void;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export function useProductos(): UseProductosReturn {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [producto, setProducto] = useState<Producto | null>(null);
    const [meta, setMeta] = useState<PaginationMeta | null>(null);
    const [links, setLinks] = useState<PaginationLinks | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPerPage, setCurrentPerPage] = useState(6);

    const clearError = () => setError(null);
    const clearProducto = () => setProducto(null);

    const hasNextPage = links?.next !== null;
    const hasPrevPage = links?.prev !== null;

    const getProductos = useCallback(async (perPage: number = 6) => {
        setIsLoading(true);
        setError(null);
        setCurrentPerPage(perPage);

        const result = await getProductosService(perPage);
        
        if (result.success && result.data) {
            setProductos(result.data);
            setMeta(result.meta || null);
            setLinks(result.links || null);
        } else {
            setError(result.message || 'Error desconocido');
        }

        setIsLoading(false);
    }, []);

    const goToPage = useCallback(async (url: string) => {
        setIsLoading(true);
        setError(null);

        const result = await getProductosService(currentPerPage, url);
        
        if (result.success && result.data) {
            setProductos(result.data);
            setMeta(result.meta || null);
            setLinks(result.links || null);
        } else {
            setError(result.message || 'Error desconocido');
        }

        setIsLoading(false);
    }, [currentPerPage]);

    // ir a la pagina siguiente
    const goToNextPage = useCallback(async () => {
        if (links?.next) {
            await goToPage(links.next);
        }
    }, [links, goToPage]);

    // ir a la pagina anterior
    const goToPrevPage = useCallback(async () => {
        if (links?.prev) {
            await goToPage(links.prev);
        }
    }, [links, goToPage]);


    const getProductoBySlug = useCallback(async (slug: string): Promise<Producto | null> => {
        setIsLoading(true);
        setError(null);

        const result = await getProductoBySlugService(slug);

        if (result.success && result.data) {
            setProducto(result.data);
            setIsLoading(false);
            return result.data;
        } else {
            setError(result.message || 'Error desconocido');
            setIsLoading(false);
            return null;
        }
    }, []);

    const createProducto = useCallback(async (productoData: ProductoInput): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        const formData = buildProductoFormData(productoData);
        const result = await createProductoService(formData);

        if (!result.success) {
            setError(result.message || 'Error desconocido');
        }

        setIsLoading(false);
        return result.success;
    }, []);

    const updateProducto = useCallback(async (
        id: number | string,
        productoData: ProductoInput
    ): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        const formData = buildProductoFormData(productoData);
        const result = await updateProductoService(id, formData);

        if (!result.success) {
            setError(result.message || 'Error desconocido');
        }

        setIsLoading(false);
        return result.success;
    }, []);

    const deleteProducto = useCallback(async (id: number | string): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        const result = await deleteProductoService(id);

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
        links,
        isLoading,
        error,
        getProductos,
        goToPage,
        goToNextPage,
        goToPrevPage,
        getProductoBySlug,
        createProducto,
        updateProducto,
        deleteProducto,
        clearError,
        clearProducto,
        hasNextPage,
        hasPrevPage
    };
}