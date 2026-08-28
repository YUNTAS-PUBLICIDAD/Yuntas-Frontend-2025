import { api, API_ENDPOINTS } from "@/config";
import { LoginCredentials, LoginActionResponse } from "@/types/auth";
import { getToken, removeToken, setToken } from "@/utils/token";
import { removeRole, setRole } from "@/utils/role";
import { removePermissions, setPermissions } from "@/utils/permission";

export async function loginService(credentials: LoginCredentials): Promise<LoginActionResponse> {
    try {
        const sessionId = typeof window !== 'undefined' ? localStorage.getItem('visitor_session_id') : null;
        const payload = {
            ...credentials,
            session_id: sessionId || undefined
        };
        const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, payload);

        const data = response.data;

        const token = data.data?.token || data.token || data.access_token;

        const user = data.data?.user || data.user;

        const role = user?.role?.name;

        const permissions = user?.permissions || [];

        if (!token) {
            return {
                success: false,
                message: "Error: No se recibió token del servidor."
            };
        }

        setToken(token);
        setRole(role);
        setPermissions(permissions);

        return {
            success: true,
            message: "Bienvenido",
        };

    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function logoutService(): Promise<LoginActionResponse> {
    try {

        const token = getToken();

        if (token) {
            await api.post(API_ENDPOINTS.AUTH.LOGOUT, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        removeToken();
        removeRole();
        removePermissions();

        return { success: true, message: "Sesión cerrada" };

    } catch (error: any) {
        removeToken();
        removeRole();
        removePermissions();

        return { success: false, message: error?.message || "Error al cerrar sesión" };
    }
}