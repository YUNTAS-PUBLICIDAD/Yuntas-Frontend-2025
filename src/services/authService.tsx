import { api, API_ENDPOINTS } from "@/config";
import { LoginCredentials, LoginActionResponse } from "@/types/auth";
import { getToken, removeToken, setToken } from "@/utils/token";
import { AxiosError } from "axios";

export async function loginService(credentials: LoginCredentials): Promise<LoginActionResponse> {
    try {
        const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);

        const data = response.data;
        const token = data.data?.token || data.token;
        const user = data.data?.user || data.user;

        if (!token) {
            return { success: false, message: "Error: No se recibió token del servidor." };
        }

        // Guardar el token en cookies
        setToken(token);

        return {
            success: true,
            message: "Bienvenido",
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,

            },

        };

    } catch (error: any) {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || "Credenciales incorrectas";
            return { success: false, message: errorMessage };
        }

        return { success: false, message: "Error de conexión con el servidor." };
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
    } catch (error) {
        console.error("Error al cerrar sesión en backend", error);
    } finally {
        removeToken();

        return { success: true, message: "Sesión cerrada" };
    }
}
