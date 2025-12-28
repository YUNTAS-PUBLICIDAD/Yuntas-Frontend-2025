'use server';

import { cookies } from "next/headers";
import { api, API_ENDPOINTS } from "@/config";
import {
    Reclamo,
    ReclamoInput,
    ReclamoActionResponse,
} from "@/types/admin/reclamo";

function getToken(): string | null {
    const cookieStore = cookies();
    return cookieStore.get("auth_token")?.value || null;
}

export async function getReclamosAction(perPage: number = 20): Promise<ReclamoActionResponse<Reclamo[]>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const response = await api.get(API_ENDPOINTS.ADMIN.INBOX.CLAIMS.GET_ALL+`?perPage=${perPage}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return {
            success: true,
            data: response.data.data.data,
        };
    } catch (error) {
        return { success: false, message: "Error de conexión" };
    }
}

export async function getReclamoByIdAction(id: number): Promise<ReclamoActionResponse<Reclamo>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const response = await api.get(API_ENDPOINTS.ADMIN.INBOX.CLAIMS.GET_ONE(id), {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return {
            success: true,
            message: response.data.message || "Reclamo obtenido exitosamente",
            data: response.data.data
        };
    } catch (error) {
        return { success: false, message: "Error de conexión" };
    }
}

export async function createReclamoAction(ReclamoData: ReclamoInput): Promise<ReclamoActionResponse<Reclamo>> {
    try {
        const response = await api.post(API_ENDPOINTS.FORMS.CLAIMS, ReclamoData);

        return {
            success: true,
            message: response.data.message || "Reclamo creado exitosamente",
            data: response.data.data
        };
    } catch (error) {
        return { success: false, message: "No se pudo crear el reclamo" };
    }
}

export async function replyReclamoAction(id: number): Promise<ReclamoActionResponse<null>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const response = await api.post(API_ENDPOINTS.ADMIN.INBOX.CLAIMS.REPLY(id), {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return { success: true, message: "Reclamo respondido exitosamente" };
    } catch (error) {
        return { success: false, message: "Error de conexión" };
    }
}