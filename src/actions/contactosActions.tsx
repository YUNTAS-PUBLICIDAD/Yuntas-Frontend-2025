'use server';

import { cookies } from "next/headers";
import { api, API_ENDPOINTS } from "@/config";
import {
    Contacto,
    ContactoInput,
    ContactoActionResponse,
} from "@/types/admin/contacto";

function getToken(): string | null {
    const cookieStore = cookies();
    return cookieStore.get("auth_token")?.value || null;
}

export async function getContactosAction(perPage: number = 20): Promise<ContactoActionResponse<Contacto[]>> {
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
    } catch (error) {
        return { success: false, message: "Error de conexión" };
    }
}

export async function getContactoByIdAction(id: number): Promise<ContactoActionResponse<Contacto>> {
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
    } catch (error) {
        return { success: false, message: "Error de conexión" };
    }
}

export async function createContactoAction(contactoData: ContactoInput): Promise<ContactoActionResponse<Contacto>> {
    try {
        const response = await api.post(API_ENDPOINTS.FORMS.CONTACT, contactoData);

        return {
            success: true,
            message: response.data.message || "Contacto creado exitosamente",
            data: response.data.data
        };
    } catch (error) {
        return { success: false, message: "No se pudo enviar el mensaje" };
    }
}

export async function deleteContactoAction(id: number): Promise<ContactoActionResponse<null>> {
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
    } catch (error) {
        return { success: false, message: "Error de conexión" };
    }
}