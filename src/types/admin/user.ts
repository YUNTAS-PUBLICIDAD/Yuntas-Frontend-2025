export interface UserRole {
    id: number;
    name: string;
}

export interface User {
    id: number;
    role_id: number | null;
    name: string;
    email: string;
    role: UserRole | null;
    created_at: string | null;
}

export interface UserInput {
    id?: number;
    name: string;
    email: string;
    password?: string;
    role_id?: number;
}

export interface UserServiceResponse<T = null> {
    success: boolean;
    message?: string;
    data?: T;
}

export interface UserExport {
    ID: number;
    Nombre: string;
    Email: string;
    Rol: string;
    "Fecha de Creación": string;
}