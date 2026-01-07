export interface Lead {
    id: number;
    name: string;
    email: string;
    phone: null | string;
    message: null | string;
    product_id: number | null;
    product_name?: string;
    source_id: number | null;
    created_at: string | null;
}

export interface LeadInput {
    id?: number;
    name: string;
    email: string;
    phone?: string;
    message?: string;
    product_id?: number;
    source_id?: number;
}

export interface LeadActionResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
}