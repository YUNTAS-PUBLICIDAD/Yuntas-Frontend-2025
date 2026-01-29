export interface Rol {
    id: number;
    name: string;
}

export interface RolServiceResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
}