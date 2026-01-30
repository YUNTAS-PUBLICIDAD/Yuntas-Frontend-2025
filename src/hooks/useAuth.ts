'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginCredentials } from "@/types/auth";
import { loginService, logoutService } from "@/services/authService";

interface UseAuthReturn {
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

export function useAuth(): UseAuthReturn {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const login = async (credentials: LoginCredentials) => {
        setIsLoading(true);
        setError(null);

        const result = await loginService(credentials);

        if (result.success) {
            router.replace("/admin/seguimiento");
        } else {
            setError(result.message || "Error al iniciar sesión");
        }

        setIsLoading(false);
    };

    const logout = async () => {
        setIsLoading(true);

        await logoutService();

        setIsLoading(false);
        router.replace("/login");
    };

    return { login, logout, isLoading, error };
}

export default useAuth;
