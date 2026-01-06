'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginCredentials } from "@/types/auth";
import { loginAction } from "@/actions/authActions";

interface UseAuthReturn {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
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

    if (result.success && result.token) {
      localStorage.setItem("auth_token", result.token);

      router.push("/admin");
    } else {
      setError(result.message || "Error al iniciar sesión");
    }

    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    router.push("/login");
  };

  return { login, logout, isLoading, error };
}
