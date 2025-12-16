'use server';

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { api, API_ENDPOINTS } from "@/config";
import {
    Producto,
    ProductoInput,
    ProductoListResponse,
    ProductoResponse,
    ProductoActionResponse,
} from "@/types/admin/producto";

function getToken(): string | null {
    const cookieStore = cookies();
    return cookieStore.get("auth_token")?.value || null;
}

export async function getProductosAction(
    perPage: number = 6,
    url?: string
): Promise<ProductoActionResponse<Producto[]>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const response = await api.get(API_ENDPOINTS.PRODUCTS.GET_ALL);

        return {
            success: true,
            data: response.data.data.data,
            meta: response.data.data.meta,
            links: response.data.data.links
        };
    } catch (error) {
        return { success: false, message: "Error de conexión" };
    }
}

export async function getProductoBySlugAction(slug: string): Promise<ProductoActionResponse<Producto>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const response = await api.get(API_ENDPOINTS.PRODUCTS.GET_ONE(slug));

        return {
            success: true,
            message: response.data.message,
            data: response.data.data
        };
    } catch (error) {
        return { success: false, message: "Error de conexión" };
    }
}

export async function createProductoAction(formData: FormData): Promise<ProductoActionResponse<Producto>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const response = await api.post(API_ENDPOINTS.PRODUCTS.CREATE, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        revalidatePath("/admin/productos");

        return {
            success: true,
            message: response.data.data.message || "Producto creado exitosamente",
            data: response.data.data.data
        };
    } catch (error) {
        return { success: false, message: "Error de conexión" };
    }
}

export async function updateProductoAction(
    id: number | string,
    formData: FormData
): Promise<ProductoActionResponse<Producto>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const response = await api.post(API_ENDPOINTS.PRODUCTS.UPDATE(Number(id)), formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        revalidatePath("/admin/productos");

        return {
            success: true,
            message: response.data.data.message || "Producto actualizado exitosamente",
            data: response.data.data.data
        };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Error de conexión" };
    }
}

export async function deleteProductoAction(id: number | string): Promise<ProductoActionResponse> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const response = await api.delete(API_ENDPOINTS.PRODUCTS.DELETE(Number(id)));

        revalidatePath("/admin/productos");

        return { success: true, message: "Producto eliminado exitosamente" };
    } catch (error) {
        return { success: false, message: "Error de conexión" };
    }
}