import { api, API_ENDPOINTS } from "@/config";
import {
    Categoria,
    CategoriaInput,
    CategoriaActionResponse,
} from "@/types/admin/categoria";
import { getToken } from "@/utils/token";

export async function getCategoriasService(): Promise<CategoriaActionResponse<Categoria[]>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const response = await api.get(API_ENDPOINTS.ADMIN.CATEGORIES.GET_ALL);

        return {
            success: true,
            message: response.data.message || "Categorías obtenidas exitosamente",
            data: response.data.data,
        };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function createCategoriaService(categoriaData: CategoriaInput): Promise<CategoriaActionResponse<Categoria>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const response = await api.post(API_ENDPOINTS.ADMIN.CATEGORIES.CREATE, categoriaData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return {
            success: true,
            message: response.data.message || "Categoría creada exitosamente",
            data: response.data.data
        };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function updateCategoriaService(id: number, categoriaData: CategoriaInput): Promise<CategoriaActionResponse<Categoria>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const response = await api.post(API_ENDPOINTS.ADMIN.CATEGORIES.UPDATE(id), categoriaData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return {
            success: true,
            message: response.data.message || "Categoría actualizada exitosamente",
            data: response.data.data
        };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function deleteCategoriaService(id: number): Promise<CategoriaActionResponse<null>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const response = await api.delete(API_ENDPOINTS.ADMIN.CATEGORIES.DELETE(id), {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return { success: true, message: "Categoría eliminada exitosamente" };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}