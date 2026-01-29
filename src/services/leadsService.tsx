import { api, API_ENDPOINTS } from "@/config";
import {
    Lead,
    LeadInput,
    LeadServiceResponse,
} from "@/types/admin/lead";
import { getToken } from "@/utils/token";
import { formatDate } from "@/utils/formatDate";

function formatLead(apiLead: any): Lead {
    return {
        ...apiLead,
        product_name: apiLead.product?.name || "-",
        source_name: apiLead.source?.name || "-",
        created_at: formatDate(apiLead.created_at || ""),
        email_messages: apiLead.stats?.email?.popup?.total_mensajes || 0,
        email_messages_last: formatDate(apiLead.stats?.email?.popup?.ultimo_envio || ""),
        email_campaigns: apiLead.stats?.email?.campaign?.total_campanas || 0,
        email_campaigns_last: formatDate(apiLead.stats?.email?.campaign?.ultimo_envio || ""),
        whatsapp_messages: apiLead.stats?.whatsapp?.popup?.total_mensajes || 0,
        whatsapp_messages_last: formatDate(apiLead.stats?.whatsapp?.popup?.ultimo_envio || ""),
        whatsapp_campaigns: apiLead.stats?.whatsapp?.campaign?.total_campanas || 0,
        whatsapp_campaigns_last: formatDate(apiLead.stats?.whatsapp?.campaign?.ultimo_envio || ""),
    };
}

export async function getLeadsService(perPage: number = 20): Promise<LeadServiceResponse<Lead[]>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const response = await api.get(API_ENDPOINTS.ADMIN.INBOX.LEADS.GET_ALL + `?perPage=${perPage}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        const transformedLeads = response.data.data.data.map(formatLead);

        return {
            success: true,
            data: transformedLeads,
        };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function createLeadService(leadData: LeadInput): Promise<LeadServiceResponse<Lead>> {
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
            data: formatLead(response.data.data)
        };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function updateLeadService(id: number, leadData: LeadInput): Promise<LeadServiceResponse<Lead>> {
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
            data: formatLead(response.data.data)
        };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function deleteLeadService(id: number): Promise<LeadServiceResponse<null>> {
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
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}