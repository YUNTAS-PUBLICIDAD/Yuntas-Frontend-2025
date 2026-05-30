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
