export const endpoints = {
    auth: {
        login: "/api/auth/login",
        logout: "/api/auth/logout",
    },
    users: {
        list: "/api/admin/users",
        detail: (id: number | string) => `/api/admin/users/${id}`,
        create: "/api/admin/users",
        update: (id: number | string) => `/api/admin/users/${id}`,
        delete: (id: number | string) => `/api/admin/users/${id}`,
    },
    clientes: {
        list: "/api/clientes",
        detail: (id: number | string) => `/api/v1/clientes/${id}`,
        create: "/api/clientes",
        update: (id: number | string) => `/api/v1/clientes/${id}`,
        delete: (id: number | string) => `/api/v1/clientes/${id}`,
    },
    productos: {
        list: "/api/productos",
        all: "/api/productos",
        detail: (id: string | number) => `/api/v1/productos/${id}`,
        link: (link: string) => `/api/v1/productos/link/${link}`,
        create: "/api/productos",
        update: (id: number | string) => `/api/v1/productos/${id}`,
        delete: (id: number | string) => `/api/v1/productos/${id}`,
        info: "/api/solicitar-info-producto",
    },
    emailProducto: {
        create: "/api/email-producto/plantilla",
        update: (id: number | string) => `/api/v1/email-producto/plantilla/${id}`,
        plantillaPorProducto: (productoId: string | number) => 
            `/api/email-producto/plantilla/${productoId}`,
    },
    whatsappProducto: {
        create: (productoId: number | string) =>
            `/api/v1/whatsapp-producto/productos/${productoId}/whatsapp-template-basic`,
        get: (productoId: number | string) =>
            `/api/v1/whatsapp-producto/productos/${productoId}/whatsapp-template-basic`,
    },
    blogs: {
        list: "/api/blogs",
        detail: (id: number | string) => `/api/blogs/${id}`,
        link: (link: string) => `/api/blogs/link/${link}`,
        create: "/api/blogs",
        update: (id: number | string) => `/api/blogs/${id}`,
        delete: (id: number | string) => `/api/blogs/${id}`,
    },
    information: {
        sendInformation: "/api/send-info",
    },
} as const;