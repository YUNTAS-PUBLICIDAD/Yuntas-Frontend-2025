export interface EtiquetaProducto {
    meta_titulo: string;
    meta_descripcion: string;
    keywords: string[];
}

export interface ImagenProducto {
    id?: number;
    title: string;
    url_imagen: string;
    texto_alt_SEO: string;
    file?: File;
}

export interface Producto {
    id: number;
    link: string;
    nombre: string;
    titulo: string;
    descripcion: string;
    seccion: string;
    imagen_principal: string;
    text_alt_principal: string | null;
    especificaciones: string[] | any;
    beneficios: string[];
    imagenes: ImagenProducto[];
    etiqueta: EtiquetaProducto;
    created_at: string;
    updated_at: string;
}

export interface ProductoInput {
    // seccion datos para Dashboard
    nombre: string;
    seccion: string;
    precio: number;
    link: string;
    
    // seccion seo
    meta_titulo: string;
    meta_descripcion: string;
    keywords: string[];
    
    // seccion datos para Frontend
    titulo: string;
    descripcion: string;
    
    // seccion listas
    especificaciones: string[];
    beneficios: string[];
    
    // seccion imagenes
    imagen_principal: File | string | null;
    text_alt_principal: string;
    imagenes: {
        hero: { file: File | string | null; alt: string };
        especificaciones: { file: File | string | null; alt: string };
        beneficios: { file: File | string | null; alt: string };
        popup: { file: File | string | null; alt: string };
    };
}

export interface ProductoListResponse {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    data: Producto[];
}

export interface ProductoActionResponse<T = null> {
    success: boolean;
    message?: string;
    data?: T;
    meta?: {
        current_page: number;
        per_page: number;
        total: number;
        last_page: number;
    };
}

export interface ProductoResponse {
    success: boolean;
    message: string;
    data: Producto;
}