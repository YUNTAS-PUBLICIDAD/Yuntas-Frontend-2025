export interface ImagenProducto {
    url: string | null;
    alt: string | null;
    title: string | null;
}

export interface Galeria {
    url: string;
    alt: string | null;
    slot: "Hero" | "Specs" | "Benefits" | "Popups";
}

export interface Producto {
    id: number;
    name: string;
    slug: string;
    price: string;
    hero_title: string;
    description: string;
    status: "active" | "inactive";
    meta_title: string | null;
    meta_description: string | null;
    keywords: string[];
    main_image: ImagenProducto;
    gallery: Galeria[];
    category_name: string | null;
    specifications: string[];
    benefits: string[];
    created_at: string;
}

export interface ProductoInput {
    name: string;
    slug?: string;
    price: string;
    hero_title: string;
    description: string;
    status?: 'active' | 'inactive';

    meta_title: string;
    meta_description: string;
    keywords: string[];

    main_image: File | string | null;
    main_image_alt: string;
    gallery: Array<{
        slot: 'Hero' | 'Specs' | 'Benefits' | 'Popups';
        image: File | string;
        alt: string;
    }>;

    categories: string[];
    specifications: string[];
    benefits: string[];
}

export interface ProductoExport {
    nombre: string;
    categorias: number;
};

// links de la paginacion
export interface PaginationLinks {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
}

// meta de la paginacion
export interface PaginationMeta {
    current_page: number;
    from: number | null;
    last_page: number;
    per_page: number;
    to: number | null;
    total: number;
    path: string;
}

// lista de productos
export interface ProductoListResponse {
    success: boolean;
    data: {
        data: Producto[];
        links: PaginationLinks;
        meta: PaginationMeta;
    };
}

//un solo producto
export interface ProductoResponse {
    success: boolean;
    message?: string;
    data: Producto;
}

// respuesta de service
export interface ProductoServiceResponse<T = null> {
    success: boolean;
    message?: string;
    data?: T;
    meta?: PaginationMeta;
    links?: PaginationLinks;
}