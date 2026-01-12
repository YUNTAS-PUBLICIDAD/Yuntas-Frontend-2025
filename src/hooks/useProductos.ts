'use client';

import { useState, useCallback } from "react";
import {
    Producto,
    ProductoInput,
    PaginationMeta,
    PaginationLinks,
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
    meta: PaginationMeta | null;
    links: PaginationLinks | null;
    isLoading: boolean;
    error: string | null;
    getProductos: (perPage?: number) => Promise<void>;
    goToPage: (url: string) => Promise<void>;
    goToNextPage: () => Promise<void>;
    goToPrevPage: () => Promise<void>;
    getProductoBySlug: (slug: string) => Promise<void>;
    createProducto: (producto: ProductoInput) => Promise<ProductoServiceResponse<Producto>>;
    updateProducto: (id: number | string, producto: ProductoInput) => Promise<ProductoServiceResponse<Producto>>;
    deleteProducto: (id: number | string) => Promise<ProductoServiceResponse>;
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
    const [error, setError] = useState<string | null>(null); // error solo se usa cuando se cargan datos
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