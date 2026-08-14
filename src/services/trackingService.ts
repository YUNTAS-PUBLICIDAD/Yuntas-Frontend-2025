import { api, API_ENDPOINTS } from "@/config";
 
export interface PageViewPayload {
  route: string;
  session_id?: string;
}
 
/**
 * Registrar una vista de página.
 */
export const registerPageView = async (payload: PageViewPayload) => {
  const response = await api.post(
    API_ENDPOINTS.TRACKING.PAGE_VIEW,
    payload
  );
  return response.data;
};
 
/**
 * Obtener las páginas más vistas del dashboard de administración.
 */
export const getMostViewedPages = async (month?: string) => {
  const response = await api.get(
    API_ENDPOINTS.ADMIN.DASHBOARD.MOST_VIEWED_PAGES,
    {
      params: month ? { month } : undefined,
    }
  );
  return response.data;
};
 
/**
 * Obtener estadísticas por tipo de usuario.
 */
export const getUserTypeStats = async () => {
  const response = await api.get(
    API_ENDPOINTS.ADMIN.DASHBOARD.USER_TYPE_STATS
  );
  return response.data;
};

export interface TopProductApiItem {
  id: number;
  name: string;
  slug: string;
  views_count: number;
}

export interface TopProductsResponse {
  period: string;
  total_views: number;
  products: TopProductApiItem[];
}

/**
 * Obtener el ranking de productos más vistos.
 * GET /dashboard/top-products?days=7|30|90
 */
export const getTopViewedProducts = async (days: number) => {
  const response = await api.get(
    API_ENDPOINTS.ADMIN.DASHBOARD.TOP_PRODUCTS,
    { params: { days } }
  );
  return response.data.data as TopProductsResponse;
};

/**
 * Registrar una vista de producto (para el ranking de más vistos).
 */
export const recordProductView = async (productId: number) => {
  await api.post(API_ENDPOINTS.PRODUCTS.RECORD_VIEW(productId));
};
