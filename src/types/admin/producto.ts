export interface ImagenProducto {
    url: string | null;
    alt: string | null;
    title: string | null;
}

export interface Galeria {
    url:  string;
    alt:  string | null;
    slot: "Hero" | "Specs" | "Benefits" | "Popups";
}

export interface Producto {
    id: number;
    name: string;
    slug: string;
    price: string;
    short_description: string;
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

// respuesta de acciones
export interface ProductoActionResponse<T = null> {
    success: boolean;
    message?: string;
    data?: T;
    meta?: PaginationMeta;
    links?: PaginationLinks;
}