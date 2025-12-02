export const endpoints = {
    auth: {
        login: "/api/v1/auth/login",
        logout: "/api/v1/auth/logout",
    },
    users: {
        list: "/api/v1/users",
        detail: (id: number | string) => `/api/v1/users/${id}`,
        create: "/api/v1/users",
        update: (id: number | string) => `/api/v1/users/${id}`,
        delete: (id: number | string) => `/api/v1/users/${id}`,
    },
    clientes: {
        list: "/api/v1/clientes",
        detail: (id: number | string) => `/api/v1/clientes/${id}`,
        create: "/api/v1/clientes",
        update: (id: number | string) => `/api/v1/clientes/${id}`,
        delete: (id: number | string) => `/api/v1/clientes/${id}`,
    },
    productos: {
        list: "/api/v1/productos",
        all: "/api/v1/productos/all",
        detail: (id: string | number) => `/api/v1/productos/${id}`,
        link: (link: string) => `/api/v1/productos/link/${link}`,
        create: "/api/v1/productos",
        update: (id: number | string) => `/api/v1/productos/${id}`,
        delete: (id: number | string) => `/api/v1/productos/${id}`,
        info: "/api/v1/solicitar-info-producto",
    },
    emailProducto: {
        create: "/api/v1/email-producto/plantilla",
        update: (id: number | string) => `/api/v1/email-producto/plantilla/${id}`,
        plantillaPorProducto: (productoId: string | number) => 
            `/api/v1/email-producto/plantilla/${productoId}`,
    },
    whatsappProducto: {
        create: (productoId: number | string) =>
            `/api/v1/whatsapp-producto/productos/${productoId}/whatsapp-template-basic`,
        get: (productoId: number | string) =>
            `/api/v1/whatsapp-producto/productos/${productoId}/whatsapp-template-basic`,
    },
    blogs: {
        list: "/api/v1/blogs",
        detail: (id: number | string) => `/api/v1/blogs/${id}`,
        link: (link: string) => `/api/v1/blogs/link/${link}`,
        create: "/api/v1/blogs",
        update: (id: number | string) => `/api/v1/blogs/${id}`,
        delete: (id: number | string) => `/api/v1/blogs/${id}`,
    },
    information: {
        sendInformation: "/api/v1/send-info",
    },
};