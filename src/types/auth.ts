export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        token: string;
        user: {
            id: number;
            name: string;
            email: string;
            email_verified_at: null | string;
            celular: string;
            created_at: string;
            updated_at: string;
        };
    };
}

export interface LogoutResponse {
    success: boolean;
    message: string;
    data: null;
}

export interface AuthError {
    success?: boolean;
    message: string;
    errors?: null | number;
}