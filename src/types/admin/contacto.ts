export interface Contacto {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    district: string | null;       
    request_detail: string | null; 
    message: string | null;        
    created_at: string;            
    updated_at?: string;
}

export interface ContactoInput {
    first_name: string;
    last_name: string;
    phone: string;
    district: string;
    request_detail: string;    
    message: string;
}

export interface ContactoServiceResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
}