'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { LoginCredentials, User } from "@/types/auth"; 
import { loginService, logoutService } from "@/services/authService";
import { getToken } from "@/utils/token";

interface AuthContextType {
    user: User | null;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    //  Al recargar la página, recuperamos el usuario
    useEffect(() => {
        const token = getToken();
        const storedUser = localStorage.getItem('yuntas_user_data');
        
        if (token && storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error('Error al recuperar datos del usuario:', e);
                localStorage.removeItem('yuntas_user_data');
            }
        }
    }, []);

    const login = async (credentials: LoginCredentials) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await loginService(credentials);

            if (result.success && result.user) {
                //  Guardamos usuario en estado
                setUser(result.user);
                // Guardamos en LocalStorage 
                localStorage.setItem('yuntas_user_data', JSON.stringify(result.user));
                
                // Redirección
                router.replace("/admin/seguimiento");
            } else {
                setError(result.message || "Credenciales incorrectas");
            }
        } catch (err) {
            console.error('Error en login:', err);
            setError("Error inesperado al iniciar sesión");
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        await logoutService();
        
        // Limpiamos todo
        setUser(null);
        localStorage.removeItem('yuntas_user_data');
        router.replace("/login");
        setIsLoading(false);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading, error }}>
            {children}
        </AuthContext.Provider>
    );
}