import { api, API_ENDPOINTS } from "@/config";
import { LoginCredentials, LoginActionResponse } from "@/types/auth";
import { getToken, removeToken, setToken } from "@/utils/token";
import { removeRole, setRole } from "@/utils/role";

export async function loginService(credentials: LoginCredentials): Promise<LoginActionResponse> {
    try {
        const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);

        const data = response.data;
       
        const token = data.data?.token || data.token || data.access_token;
        const role = data.data?.user?.role.name || data.user?.role.name;

        if (!token) {
            return { success: false, message: "Error: No se recibió token del servidor." };
        }

        setToken(token);
        setRole(role);

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
    } catch (error: any) {
        return { success: false, message: error.message };
    } finally {
        removeToken();
        removeRole();

        return { success: true, message: "Sesión cerrada" };
    }
}