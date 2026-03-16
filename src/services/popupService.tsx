import { api, API_ENDPOINTS } from "@/config";
import { Popup, PopupServiceResponse } from "@/types/admin/popup";

export const getPopupsService = async (): Promise<PopupServiceResponse<Popup[]>> => {
  try {
    const response = await api.get(API_ENDPOINTS.ADMIN.POPUPS.GET_ALL);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const savePopupService = async (popupData: Popup, isUpdating: boolean = false): Promise<PopupServiceResponse<Popup>> => {
  try {
    const formData = new FormData();
    
    // Mapear los datos al FormData
    formData.append('title', popupData.title);
    formData.append('button_text', popupData.button_text);
    formData.append('image_alt', popupData.image_alt || '');
    if (popupData.image_title) formData.append('image_title', popupData.image_title);
    formData.append('page_target', popupData.page_target);
    formData.append('delay_seconds', String(popupData.delay_seconds));
    formData.append('priority', String(popupData.priority));
    
    // Booleanos y fechas
    formData.append('active', popupData.active ? '1' : '0');
    if (popupData.start_date) formData.append('start_date', popupData.start_date);
    if (popupData.end_date) formData.append('end_date', popupData.end_date);

    // Adjuntar imagen solo si es un archivo nuevo
    if (popupData.image instanceof File) {
      formData.append('image', popupData.image);
    }

    let response;

    if (isUpdating && popupData.id) {
      // TRUCO LARAVEL: Para enviar archivos en un Update, se usa POST con _method=PUT
      formData.append('_method', 'PUT');
      response = await api.post(API_ENDPOINTS.ADMIN.POPUPS.UPDATE(popupData.id), formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    } else {
      // Creación normal
      response = await api.post(API_ENDPOINTS.ADMIN.POPUPS.CREATE, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    }

    return { success: true, message: 'Popup guardado exitosamente', data: response.data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};