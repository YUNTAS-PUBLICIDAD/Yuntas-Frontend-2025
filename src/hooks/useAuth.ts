'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginCredentials, LoginResponse, AuthError } from "@/types/auth";
import { loginService, logoutService, saveToken, removeToken } from "@/services/authService";

interface UseAuthReturn {
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
    error: AuthError | null;
}

export function useAuth(): UseAuthReturn {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<AuthError | null>(null);
    const router = useRouter();

    const login = async (credentials: LoginCredentials) => {
        setIsLoading(true);
        setError(null);

        try {
            const response: LoginResponse = await loginService(credentials);
            saveToken(response.data.token);
            router.push("/admin");
        } catch (err) {
            const authError: AuthError = {
                success: false,
                message: err instanceof Error ? err.message : "Error al iniciar sesión",
                errors: null
            };
            setError(authError);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        setError(null);

        try {
            await logoutService();
            removeToken();
            router.push("/login");
        } catch (err) {
            removeToken();

            const authError: AuthError = {
                success: false,
                message: err instanceof Error ? err.message : "Error al cerrar sesión",
                errors: null
            };
            setError(authError);

            router.push("/login");
        } finally {
            setIsLoading(false);
        }
    };

    return { login, logout, isLoading, error };
}