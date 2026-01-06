import { api, API_ENDPOINTS } from "@/config";
import {
    Lead,
    LeadInput,
    LeadActionResponse,
} from "@/types/admin/lead";
import { getToken } from "@/utils/token";

export async function getLeadsService(perPage: number = 20): Promise<LeadActionResponse<Lead[]>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const response = await api.get(API_ENDPOINTS.ADMIN.INBOX.LEADS.GET_ALL+`?perPage=${perPage}`, {
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

export async function createLeadService(leadData: LeadInput): Promise<LeadActionResponse<Lead>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const response = await api.post(API_ENDPOINTS.ADMIN.INBOX.LEADS.CREATE, leadData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        
        return {
            success: true,
            message: response.data.message || "Lead creado exitosamente",
            data: response.data.data
        };
    } catch (error) {
        console.log(error)
        return { success: false, message: "No se pudo crear el lead" };
    }
}

export async function updateLeadService(id: number, leadData: LeadInput): Promise<LeadActionResponse<Lead>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const response = await api.put(API_ENDPOINTS.ADMIN.INBOX.LEADS.UPDATE(id), leadData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return {
            success: true,
            message: response.data.message || "Lead actualizado exitosamente",
            data: response.data.data
        };
    } catch (error) {
        console.log(error)
        return { success: false, message: "No se pudo actualizar el lead" };
    }
}

export async function deleteLeadService(id: number): Promise<LeadActionResponse<null>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const response = await api.delete(API_ENDPOINTS.ADMIN.INBOX.LEADS.DELETE(id), {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return { success: true, message: "Lead eliminado exitosamente" };
    } catch (error) {
        return { success: false, message: "Error de conexión" };
    }
}