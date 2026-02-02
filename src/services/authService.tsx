import { api, API_ENDPOINTS } from "@/config";
import { LoginCredentials, LoginActionResponse } from "@/types/auth";
import { setToken, removeToken } from "@/utils/token";
import { setRole, removeRole } from "@/utils/role";

export async function loginService(credentials: LoginCredentials): Promise<LoginActionResponse> {
    try {
        const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
        const data = response.data;

        const token = data.data?.token || data.token || data.access_token;
        
        const user = data.data?.user || data.user; 
        
        const roleName = user?.role?.name || "user"; 

        if (!token) {
            return { success: false, message: "No se recibió token del servidor." };
        }

        // Guardamos credenciales técnicas
        setToken(token);
        setRole(roleName);

        return {
            success: true,
            message: "Bienvenido",
            user: user, 
            token: token
        };

    } catch (error: any) {
        console.error("Login error:", error);
        const msg = error.response?.data?.message || "Error al conectar con el servidor";
        return { success: false, message: msg };
    }
}

export async function logoutService(): Promise<void> {
    try {

    } catch (error) {
        console.error("Error en logout API", error);
    } finally {
        removeToken();
        removeRole();
    }
}