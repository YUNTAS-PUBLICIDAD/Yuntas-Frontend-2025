'use server';

import { cookies } from "next/headers";
import { api, API_ENDPOINTS } from "@/config";
import {
    Categoria,
    CategoriaInput,
    CategoriaActionResponse,
} from "@/types/admin/categoria";

function getToken(): string | null {
    const cookieStore = cookies();
    return cookieStore.get("auth_token")?.value || null;
}

export async function getCategoriasAction(): Promise<CategoriaActionResponse<Categoria[]>> {
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
    } catch (error) {
        console.log(error);
        return { success: false, message: "Error de conexión" };
    }
}

export async function createCategoriaAction(categoriaData: CategoriaInput): Promise<CategoriaActionResponse<Categoria>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const response = await api.post(API_ENDPOINTS.PRODUCTS.CREATE, categoriaData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return {
            success: true,
            message: response.data.message || "Categoría creada exitosamente",
            data: response.data.data
        };
    } catch (error) {
        return { success: false, message: "Error de conexión" };
    }
}

export async function updateCategoriaAction(id: number, categoriaData: CategoriaInput): Promise<CategoriaActionResponse<Categoria>> {
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
    } catch (error) {
        console.error(error);
        return { success: false, message: "Error de conexión" };
    }
}

export async function deleteCategoriaAction(id: number): Promise<CategoriaActionResponse<null>> {
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
    } catch (error) {
        return { success: false, message: "Error de conexión" };
    }
}