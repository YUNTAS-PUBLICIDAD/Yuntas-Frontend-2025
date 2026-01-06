import { Producto } from "./producto";

export interface Source {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface Lead {
    id: number;
    name: string;
    email: string;
    phone: null | string;
    message: null | string;
    product_id: number | null;
    source_id: number | null;
    created_at: string | null;
    updated_at: string | null;
    product: Producto | null;
    source: Source | null;
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