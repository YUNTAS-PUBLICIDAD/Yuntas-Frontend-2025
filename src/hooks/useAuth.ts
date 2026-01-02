'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginCredentials } from "@/types/auth";
import { loginAction, logoutAction } from "@/actions/authActions";

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

        const result = await loginAction(credentials);

        if (result.success) {
            // ✅ Guardar token en localStorage para frontend
            if (result.user && result.token) {
                localStorage.setItem("token", result.token);
            }

            router.push("/admin");
            router.refresh();
        } else {
            setError(result.message);
        }

        setIsLoading(false);
    };

    const logout = async () => {
        setIsLoading(true);
        setError(null);

        await logoutAction();

        setIsLoading(true);
        router.push("/login");
        router.refresh();
    };

    return { login, logout, isLoading, error };
}