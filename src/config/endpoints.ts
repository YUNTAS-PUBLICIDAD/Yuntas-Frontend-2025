export const API_ENDPOINTS = {
  // AUTENTICACIÓN
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/me',
  },

  // PRODUCTOS
  PRODUCTS: {
    GET_ALL: '/productos',
    GET_ONE: (slug: string) => `/productos/${slug}`,
  },

  // BLOG 
  BLOG: {
    GET_ALL: '/blogs',
    GET_ONE: (slug: string) => `/blogs/${slug}`,
    CREATE: '/blogs',
    UPDATE: (id: number) => `/blogs/${id}`,
    DELETE: (id: number) => `/blogs/${id}`,
  },

  // FORMULARIOS PÚBLICOS
  FORMS: {
    CONTACT: '/contacto',
    CLAIMS: '/claims',
  },

  // ADMINISTRACIÓN (Tablas y Gestión)
  ADMIN: {
    USERS: {
      GET_ALL: '/admin/users',
      CREATE: '/admin/users',
      UPDATE: (id: number) => `/admin/users/${id}`,
      DELETE: (id: number) => `/admin/users/${id}`,
    },
    PRODUCTS: {
      CREATE: '/admin/productos',
      UPDATE: (id: number) => `/admin/productos/${id}`,
      DELETE: (id: number) => `/admin/productos/${id}`,
    },
    CAMPANA: {
      EMAILS: {
        SAVE: '/admin/email-productos', // para crear y actualizar
        GET_ONE_BY_PRODUCT: (product_id: number) => `/admin/email-productos?producto_id=${product_id}`,
        SEND_ONE: '/email-campanas/enviar',
        SEND_CAMPANA: '/admin/email-campanas/enviar-campana',
      },
      WHATSAPP: {
        SAVE: '/admin/whatsapp-productos', // para crear y actualizar plantilla de whatsapp de un producto
        SAVE_DEFAULT: '/admin/whatsapp-productos/default', // para crear y actualizar plantilla por defecto
        GET_ONE_BY_PRODUCT: (product_id: number) => `/admin/whatsapp-productos?producto_id=${product_id}`,
        GET_ONE_DEFAULT: '/admin/whatsapp-productos/default',
        REQUEST_QR: '/admin/whatsapp-campanas/pedir-qr',
        RESET_SESSION: '/admin/whatsapp-campanas/reset',
        SEND_ONE: '/whatsapp-campanas/enviar',
        SEND_CAMPANA: '/admin/whatsapp-campanas/enviar-campana',
      }
    },

    CATEGORIES: {
      GET_ALL: '/admin/categorias',
      CREATE: '/admin/categorias',
      UPDATE: (id: number) => `/admin/categorias/${id}`,
      DELETE: (id: number) => `/admin/categorias/${id}`,
    },
    INBOX: {
      LEADS: {
        GET_ALL: '/admin/leads',
        CREATE: '/admin/leads',
        UPDATE: (id: number) => `/admin/leads/${id}`,
        DELETE: (id: number) => `/admin/leads/${id}`,
      },
      CONTACT: {
        GET_ALL: '/admin/contacto',
        GET_ONE: (id: number) => `/admin/contacto/${id}`,
        DELETE: (id: number) => `/admin/contacto/${id}`,
      },
      CLAIMS: {
        GET_ALL: '/admin/claims',
        GET_ONE: (id: number) => `/admin/claims/${id}`,
        REPLY: (id: number) => `/admin/claims/${id}/reply`,
      }
    }
  }
};
