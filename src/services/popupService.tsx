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

    if (popupData.lead_source_id) formData.append('lead_source_id', String(popupData.lead_source_id));
    
    formData.append('title', popupData.title);
    formData.append('button_text', popupData.button_text);
    formData.append('button_color', popupData.button_color || '#6DE1E3');
    formData.append('page_target', popupData.page_target);
    formData.append('delay_seconds', String(popupData.delay_seconds));
    formData.append('priority', String(popupData.priority));
    
    formData.append('active', popupData.active ? '1' : '0');
    if (popupData.start_date) formData.append('start_date', popupData.start_date);
    if (popupData.end_date) formData.append('end_date', popupData.end_date);

    // MAPEAMOS EL ARREGLO DE IMÁGENES EXACTAMENTE COMO LO PIDE EL BACKEND
    if (popupData.images && popupData.images.length > 0) {
      popupData.images.forEach((img, index) => {
        formData.append(`images[${index}][device]`, img.device);
        formData.append(`images[${index}][slot]`, img.slot);
        
        if (img.alt) formData.append(`images[${index}][alt]`, img.alt);
        if (img.title) formData.append(`images[${index}][title]`, img.title);
        
        // Adjuntamos el archivo físico si el usuario subió uno
        if (img.file instanceof File) {
          formData.append(`images[${index}][file]`, img.file);
        }
      });
    }

    let response;

    if (isUpdating && popupData.id) {
      formData.append('_method', 'PATCH');
      response = await api.post(API_ENDPOINTS.ADMIN.POPUPS.UPDATE(popupData.id), formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    } else {
      response = await api.post(API_ENDPOINTS.ADMIN.POPUPS.CREATE, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    }

    return { success: true, message: 'Popup guardado exitosamente', data: response.data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const getPublicPopupService = async (page: string): Promise<PopupServiceResponse<Popup | null>> => {
  try {
    const response = await api.get(API_ENDPOINTS.POPUP.PUBLIC(page));
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};