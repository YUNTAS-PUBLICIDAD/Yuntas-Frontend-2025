import { api, API_ENDPOINTS } from "@/config";
import {
    Reclamo,
    ReclamoInput,
    ReclamoActionResponse,
} from "@/types/admin/reclamo";
import { getToken } from "@/utils/token";

export async function getReclamosService(perPage: number = 20): Promise<ReclamoActionResponse<Reclamo[]>> {
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
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function getReclamoByIdService(id: number): Promise<ReclamoActionResponse<Reclamo>> {
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
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function createReclamoService(ReclamoData: ReclamoInput): Promise<ReclamoActionResponse<Reclamo>> {
    try {
        const response = await api.post(API_ENDPOINTS.FORMS.CLAIMS, ReclamoData);

        return {
            success: true,
            message: response.data.message || "Reclamo creado exitosamente",
            data: response.data.data
        };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function replyReclamoService(id: number): Promise<ReclamoActionResponse<null>> {
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
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}