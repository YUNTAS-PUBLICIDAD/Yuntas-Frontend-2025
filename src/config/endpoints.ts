export const endpoints = {
    auth: {
        login: "/api/auth/login",
        logout: "/api/auth/logout",
    },
    productos: {
        list: "/api/productos",
        detail: (slug: string) => `/api/productos/${slug}`,
        create: "/api/productos",
        update: (id: number | string) => `/api/productos/${id}`,
        delete: (id: number | string) => `/api/productos/${id}`,
    },
    blogs: {
        list: "/api/blogs",
        detail: (slug: string) => `/api/blogs/${slug}`,
        create: "/api/blogs",
        update: (id: number | string) => `/api/blogs/${id}`,
        delete: (id: number | string) => `/api/blogs/${id}`,
    },
    users: {
        list: "/api/users",
        detail: (id: number | string) => `/api/users/${id}`,
        create: "/api/users",
        update: (id: number | string) => `/api/users/${id}`,
        delete: (id: number | string) => `/api/users/${id}`,
    },
    clientes: {
        list: "/api/clientes",
        detail: (id: number | string) => `/api/clientes/${id}`,
        create: "/api/clientes",
        update: (id: number | string) => `/api/clientes/${id}`,
        delete: (id: number | string) => `/api/clientes/${id}`,
    },
    emailProducto: {
        create: "/api/email-producto/plantilla",
        update: (id: number | string) => `/api/email-producto/plantilla/${id}`,
        plantillaPorProducto: (productoId: string | number) =>
            `/api/email-producto/plantilla/${productoId}`,
    },
    whatsappProducto: {
        create: (productoId: number | string) =>
            `/api/whatsapp-producto/productos/${productoId}/whatsapp-template-basic`,
        get: (productoId: number | string) =>
            `/api/whatsapp-producto/productos/${productoId}/whatsapp-template-basic`,
    },
    information: {
        sendInformation: "/api/send-info",
    },
} as const;