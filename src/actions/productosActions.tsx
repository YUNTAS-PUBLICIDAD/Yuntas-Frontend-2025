'use server';

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { apiConfig, endpoints } from "@/config";
import {
    Producto,
    ProductoInput,
    ProductoListResponse,
    ProductoResponse,
    ProductoActionResponse
} from "@/types/admin/producto";

function getToken(): string | null {
    const cookieStore = cookies();
    return cookieStore.get("auth_token")?.value || null;
}

export async function getProductosAction(
    page: number = 1,
    perPage: number = 6
): Promise<ProductoActionResponse<Producto[]>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const url = `${apiConfig.getUrl(endpoints.productos.list)}?page=${page}&perPage=${perPage}`;

        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            cache: "no-store"
        });

        if (!response.ok) {
            const error = await response.json();
            return { success: false, message: error.message || "Error al obtener productos" };
        }

        const result: ProductoListResponse = await response.json();

        return {
            success: true,
            data: result.data,
            meta: {
                current_page: result.current_page,
                per_page: result.per_page,
                total: result.total,
                last_page: result.last_page,
            }
        };
    } catch (error) {
        return { success: false, message: "Error de conexión" };
    }
}

export async function getAllProductosAction(): Promise<ProductoActionResponse<Producto[]>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const url = apiConfig.getUrl(endpoints.productos.all);

        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            cache: "no-store"
        });

        if (!response.ok) {
            const error = await response.json();
            return { success: false, message: error.message || "Error al obtener productos" };
        }

        const result = await response.json();

        return {
            success: true,
            data: result.data
        };
    } catch (error) {
        return { success: false, message: "Error de conexión" };
    }
}

export async function getProductoByIdAction(id: number | string): Promise<ProductoActionResponse<Producto>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const url = apiConfig.getUrl(endpoints.productos.detail(id));

        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            cache: "no-store"
        });

        if (!response.ok) {
            const error = await response.json();
            return { success: false, message: error.message || "Producto no encontrado" };
        }

        const result: ProductoResponse = await response.json();

        return {
            success: true,
            message: result.message,
            data: result.data
        };
    } catch (error) {
        return { success: false, message: "Error de conexión" };
    }
}

export async function getProductoByLinkAction(link: string): Promise<ProductoActionResponse<Producto>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const url = apiConfig.getUrl(endpoints.productos.link(link));

        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            cache: "no-store"
        });

        if (!response.ok) {
            const error = await response.json();
            return { success: false, message: error.message || "Producto no encontrado" };
        }

        const result: ProductoResponse = await response.json();

        return {
            success: true,
            message: result.message,
            data: result.data
        };
    } catch (error) {
        return { success: false, message: "Error de conexión" };
    }
}


export async function createProductoAction(producto: ProductoInput): Promise<ProductoActionResponse<Producto>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const url = apiConfig.getUrl(endpoints.productos.create);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(producto),
        });

        if (!response.ok) {
            const error = await response.json();
            return { success: false, message: error.message || "Error al crear producto" };
        }

        const result: ProductoResponse = await response.json();

        revalidatePath("/admin/productos");

        return {
            success: true,
            message: result.message || "Producto creado exitosamente",
            data: result.data
        };
    } catch (error) {
        return { success: false, message: "Error de conexión" };
    }
}

export async function updateProductoAction(
    id: number | string,
    producto: Partial<ProductoInput>
): Promise<ProductoActionResponse<Producto>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const url = apiConfig.getUrl(endpoints.productos.update(id));

        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(producto),
        });

        if (!response.ok) {
            const error = await response.json();
            return { success: false, message: error.message || "Error al actualizar producto" };
        }

        const result: ProductoResponse = await response.json();

        revalidatePath("/admin/productos");

        return {
            success: true,
            message: result.message || "Producto actualizado exitosamente",
            data: result.data
        };
    } catch (error) {
        return { success: false, message: "Error de conexión" };
    }
}

export async function deleteProductoAction(id: number | string): Promise<ProductoActionResponse> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const url = apiConfig.getUrl(endpoints.productos.delete(id));

        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const error = await response.json();
            return { success: false, message: error.message || "Error al eliminar producto" };
        }

        revalidatePath("/admin/productos");

        return { success: true, message: "Producto eliminado exitosamente" };
    } catch (error) {
        return { success: false, message: "Error de conexión" };
    }
}