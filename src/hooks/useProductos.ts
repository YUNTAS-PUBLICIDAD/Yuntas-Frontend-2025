import { useState, useCallback } from "react";
import api from "@/config/api.config"; 
import { API_ENDPOINTS } from "@/config/endpoints";

export interface ProductoFrontend {
    id: number;
    name: string;      
    category: string;  
    price: string | number; 
}

export function useProductos() {
    const [productos, setProductos] = useState<ProductoFrontend[]>([]);
    const [meta, setMeta] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getProductos = useCallback(async (page = 1, perPage = 6) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await api.get(API_ENDPOINTS.PRODUCTS.GET_ALL, {
                params: { page, perPage }
            });

            const responseData = response.data; 
            const listaBackend = responseData.data || responseData; 
            
            if (responseData.current_page) {
                setMeta({
                    current_page: responseData.current_page,
                    last_page: responseData.last_page,
                    total: responseData.total
                });
            }

            const datosFormateados = Array.isArray(listaBackend) ? listaBackend.map((prod: any) => ({
                id: prod.id,
                name: prod.name,
                category: prod.categories && prod.categories.length > 0 
                    ? prod.categories[0].name 
                    : "General",
                price: `S/ ${prod.price}`
            })) : [];

            setProductos(datosFormateados);

        } catch (err: any) {
            console.error("Error:", err);
            setError("Error al cargar productos.");
        } finally {
            setIsLoading(false);
        }
    }, []);
    
    const createProducto = async (formData: FormData) => {
        setIsLoading(true);
        try {
            await api.post(API_ENDPOINTS.PRODUCTS.CREATE, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            await getProductos(1); 
            return true;
        } catch (err: any) {
            console.error(err);
            return false;
        } finally { setIsLoading(false); }
    };

    const deleteProducto = async (id: number) => {
        try {
            await api.delete(API_ENDPOINTS.PRODUCTS.DELETE(id));
            await getProductos(meta?.current_page || 1);
            return true;
        } catch (err) { return false; }
    };

    return {
        productos,
        meta,
        isLoading,
        error,
        getProductos,
        createProducto,
        deleteProducto,
        getAllProductos: getProductos,
        getProductoById: async () => {},
        getProductoByLink: async () => {},
        updateProducto: async () => false,
        clearError: () => setError(null),
        clearProducto: () => {},
        producto: null
    };
}