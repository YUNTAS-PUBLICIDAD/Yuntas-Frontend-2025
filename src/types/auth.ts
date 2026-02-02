
export interface User {
    id: number;
    name: string;
    email: string;
    role_id?: number;
    role?: {
        id: number;
        name: string;
    };
    email_verified_at?: string | null;
    created_at?: string;
    updated_at?: string;
}

// Credenciales para el login
export interface LoginCredentials {
    email: string;
    password: string;
}

// Respuesta cruda del Backend
export interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        token: string;
        user: User;
    };
}

export interface LoginActionResponse {
    success: boolean;
    message: string;
    token?: string;
    user?: User;
}