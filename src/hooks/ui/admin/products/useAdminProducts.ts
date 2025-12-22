import { useState, useEffect } from 'react';
import api from '@/config/api.config'; 
import { API_ENDPOINTS } from '@/config/endpoints';

export const useAdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await api.get(API_ENDPOINTS.PRODUCTS.GET_ALL);
            
            console.log("📡 Respuesta API Productos:", response); 

            let dataArray = [];
            const payload = response.data;

            if (Array.isArray(payload)) {
                dataArray = payload;
            } else if (payload.data && Array.isArray(payload.data)) {
                dataArray = payload.data;
            } else if (payload.data?.data && Array.isArray(payload.data.data)) {
                dataArray = payload.data.data;
            } else {
                console.warn("⚠️ No se encontró un array de productos en la respuesta:", payload);
                dataArray = [];
            }

            const formattedData = dataArray.map((prod: any) => ({
                id: prod.id,
                nombre: prod.name || prod.nombre || "Sin Nombre", 
                precio: prod.price || prod.precio || 0,
                seccion: prod.categories?.[0]?.name || prod.category_name || "General",
                original: prod 
            }));

            setProducts(formattedData);
            setError(null);
        } catch (err: any) {
            console.error("❌ Error cargando productos:", err);
            setError("Error de conexión al cargar productos.");
            
            if (err.response?.status === 401) {
                setError("Sesión expirada. Por favor inicia sesión.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await api.delete(API_ENDPOINTS.PRODUCTS.DELETE(id));
            alert("Producto eliminado correctamente");
            fetchProducts(); 
        } catch (e) {
            console.error(e);
            alert("No se pudo eliminar el producto. Intente nuevamente.");
        }
    };

    return { products, loading, error, reload: fetchProducts, handleDelete };
};