import { api, API_ENDPOINTS } from "@/config";
import {
    Producto,
    ProductoServiceResponse,
    ProductoInput,
} from "@/types/admin/producto";
import { buildProductoFormData } from "@/utils/productFormData";
import { getToken } from "@/utils/token";

function formatProduct(apiProduct: any): Producto {
    return {
        ...apiProduct,
        category_name: apiProduct.categories.length > 0 ? apiProduct.categories[0].name : "-",
    };
};

export async function getProductosService(perPage: number = 6, url?: string): Promise<ProductoServiceResponse<Producto[]>> {
    try {
        const response = await api.get(API_ENDPOINTS.PRODUCTS.GET_ALL);

        const formattedProducts = response.data.data.data.map(formatProduct);

        return {
            success: true,
            data: formattedProducts,
            meta: response.data.data.meta,
            links: response.data.data.links
        };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function getProductoBySlugService(slug: string): Promise<ProductoServiceResponse<Producto>> {
    try {
        const response = await api.get(API_ENDPOINTS.PRODUCTS.GET_ONE(slug));

        return {
            success: true,
            message: response.data.message,
            data: formatProduct(response.data.data)
        };
    } catch (error) {
        return { success: false, message: "Error de conexión" };
    }
}

export async function createProductoService(formData: ProductoInput): Promise<ProductoServiceResponse<Producto>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const formattedFormData = buildProductoFormData(formData);

        const response = await api.post(API_ENDPOINTS.PRODUCTS.CREATE, formattedFormData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return {
            success: true,
            message: response.data.message || "Producto creado exitosamente",
            data: formatProduct(response.data.data)
        };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function updateProductoService(id: number | string, formData: ProductoInput): Promise<ProductoServiceResponse<Producto>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const formattedFormData = buildProductoFormData(formData);

        const response = await api.post(API_ENDPOINTS.PRODUCTS.UPDATE(Number(id)), formattedFormData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log(response);

        return {
            success: true,
            message: response.data.message || "Producto actualizado exitosamente",
            data: formatProduct(response.data.data)
        };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function deleteProductoService(id: number | string): Promise<ProductoServiceResponse> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const response = await api.delete(API_ENDPOINTS.PRODUCTS.DELETE(Number(id)));

        return { success: true, message: "Producto eliminado exitosamente" };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}