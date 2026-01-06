import { Categoria } from "./categoria";

export interface ImagenProducto {
    url: string | null;
    alt: string | null;
    title: string | null;
}

export interface Galeria {
    url:  string;
    alt:  string | null;
    slot: string;
}

export interface SeoProducto {
    meta_titulo: string | null;
    meta_descripcion: string | null;
    keywords: string[];
}

export interface Producto {
    id: number;
    name: string;
    slug: string;
    price: string;
    titulo_corto: string;
    description: string;
    precio: string;
    categories?: string;
    estado: "active" | "inactive";
    main_image: ImagenProducto;
    gallery: ImagenProducto[];
    especificaciones: string[];
    benefits: string[];
    seo: SeoProducto;
    created_at: string;
}

export interface ProductoInput {
    nombre: string;
    link: string;
    titulo: string;
    descripcion: string;
    precio: number;
    categoria?: string;

    imagen_principal: {
        file: File | string | null;
        alt: string;
    };
    galeria: File[];

    especificaciones: string[];
    beneficios: string[];

    meta_titulo: string | null;
    meta_descripcion: string | null;
    keywords: string[];
}

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

// respuesta de acciones
export interface ProductoActionResponse<T = null> {
    success: boolean;
    message?: string;
    data?: T;
    meta?: PaginationMeta;
    links?: PaginationLinks;
}