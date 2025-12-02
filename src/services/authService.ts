import { LoginCredentials, LoginResponse, LogoutResponse, AuthError } from "@/types/auth";
import { apiConfig, endpoints } from "@/config";
    
export async function loginService(credentials: LoginCredentials): Promise<LoginResponse> {
    const url = apiConfig.getUrl(endpoints.auth.login);

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const error: AuthError = await response.json();
        throw new Error(error.message || "Error al iniciar sesión");
    }

    return response.json();
}

export async function logoutService(): Promise<LogoutResponse> {
    const url = apiConfig.getUrl(endpoints.auth.logout);
    const token = getToken();

    if (!token) {
        throw new Error("No hay sesion activa");
    }

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const error: AuthError = await response.json();
        throw new Error(error.message || "Error al cerrar sesión");
    }

    return response.json();
}

export function saveToken(token: string): void {
    if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", token);
    }
}

export function getToken(): string | null {
    if (typeof window !== "undefined") {
        return localStorage.getItem("auth_token");
    }
    return null;
}

export function removeToken(): void {
    if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
    }
}

export function isAuthenticated(): boolean {
    return !!getToken();
}