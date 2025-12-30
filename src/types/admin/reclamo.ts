export interface Reclamo {
    id : number;
    first_name: string;
    last_name: string;
    email: string;
    detail: string;
    status: string;
}

export interface ReclamoInput {
    first_name: string;
    last_name: string;
    document_type_id: number;
    document_number: string;
    email: string; 
    phone?: string;
    claim_type_id: number;
    detail: string;
    product_id?: number;
    purchase_date?: string;    
    claimed_amount?: number;
}

export interface ReclamoActionResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
}