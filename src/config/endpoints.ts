

export const API_ENDPOINTS = {
  // AUTENTICACIÓN
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/me',
  },

  // PRODUCTOS (Catálogo y Admin)
  PRODUCTS: {
    GET_ALL: '/productos', 
    GET_ONE: (slug: string) => `/productos/${slug}`, 
    GET_BY_ID: (id: number) => `/productos/${id}`,
    CREATE: '/productos', 
    UPDATE: (id: number) => `/productos/${id}`, 
    DELETE: (id: number) => `/productos/${id}`, 
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
    LEAD: '/leads', 
    CONTACT: '/contacto', 
    CLAIMS: '/claims', 
  },

  // ADMINISTRACIÓN (Tablas y Gestión)
  ADMIN: {
    USERS: {
      GET_ALL: '/users',
      CREATE: '/users',
      UPDATE: (id: number) => `/users/${id}`,
      DELETE: (id: number) => `/users/${id}`,
      ASSIGN_ROLE: (id: number) => `/users/${id}/role`,
    },
    CATEGORIES: {
      GET_ALL: '/admin/categorias',
      CREATE: '/admin/categorias',
      UPDATE: (id: number) => `/admin/categorias/${id}`,
      DELETE: (id: number) => `/admin/categorias/${id}`,
    },
    INBOX: {
      LEADS: '/leads',
      CONTACT: {
        GET_ALL: '/admin/contacto',
        GET_ONE: (id: number) => `/admin/contacto/${id}`,
        DELETE: (id: number) => `/admin/contacto/${id}`,
      }, 
      CLAIMS: {
        GET_ALL: '/admin/claims',
        GET_ONE: (id: number) => `/admin/claims/${id}`,
        REPLY:  (id: number) => `/admin/claims/${id}/reply`,
      } 
    }
  }
};
