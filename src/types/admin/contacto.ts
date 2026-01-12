export interface Contacto {
    id : number;
    first_name: string;
    last_name: string;
    phone: string;
    message: string;
}

export interface ContactoInput {
    first_name: string;
    last_name: string;
    phone: string;
    district: string;
    request_detail: string;    
    message: string;
}

export interface ContactoServiceResponse<T = null> {
    success: boolean;
    message?: string;
    data?: T;
}