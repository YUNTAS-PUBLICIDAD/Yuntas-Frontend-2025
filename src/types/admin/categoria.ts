export interface Categoria {
    id: number;
    name: string;
    slug: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface CategoriaInput {
    name: string;
    slug: string;
    description: string;
}

export interface CategoriaActionResponse<T> {
    success: boolean;
    message: string;
    data?: T;
};