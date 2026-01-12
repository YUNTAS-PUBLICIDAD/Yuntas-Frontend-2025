import { api, API_ENDPOINTS } from "@/config";
import {
    Contacto,
    ContactoInput,
    ContactoServiceResponse,
} from "@/types/admin/contacto";
import { getToken } from "@/utils/token";

export async function getContactosService(perPage: number = 20): Promise<ContactoServiceResponse<Contacto[]>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const response = await api.get(API_ENDPOINTS.ADMIN.INBOX.CONTACT.GET_ALL+`?perPage=${perPage}`, {
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

export async function getContactoByIdService(id: number): Promise<ContactoServiceResponse<Contacto>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const response = await api.get(API_ENDPOINTS.ADMIN.INBOX.CONTACT.GET_ONE(id), {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return {
            success: true,
            message: response.data.message || "Contacto obtenido exitosamente",
            data: response.data.data
        };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function createContactoService(contactoData: ContactoInput): Promise<ContactoServiceResponse<Contacto>> {
    try {
        const response = await api.post(API_ENDPOINTS.FORMS.CONTACT, contactoData);

        return {
            success: true,
            message: response.data.message || "Contacto creado exitosamente",
            data: response.data.data
        };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function deleteContactoService(id: number): Promise<ContactoServiceResponse> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const response = await api.delete(API_ENDPOINTS.ADMIN.INBOX.CONTACT.DELETE(id), {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return { success: true, message: "Contacto eliminado exitosamente" };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}