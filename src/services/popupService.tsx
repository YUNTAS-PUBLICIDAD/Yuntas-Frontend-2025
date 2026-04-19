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

    if (isUpdating && popupData.id) {
      // 1. Actualizamos datos principales
      const popupFormData = new FormData();
      popupFormData.append('_method', 'PATCH');
      if (popupData.lead_source_id) popupFormData.append('lead_source_id', String(popupData.lead_source_id));
      popupFormData.append('title', popupData.title);
      popupFormData.append('button_text', popupData.button_text);
      popupFormData.append('button_color', popupData.button_color || '#6DE1E3');
      popupFormData.append('page_target', popupData.page_target);
      popupFormData.append('product_id', popupData.product_id !== undefined && popupData.product_id !== null ? String(popupData.product_id) : '');
      popupFormData.append('delay_seconds', String(popupData.delay_seconds));
      popupFormData.append('priority', String(popupData.priority));
      popupFormData.append('active', popupData.active ? '1' : '0');

      await api.post(API_ENDPOINTS.ADMIN.POPUPS.UPDATE(popupData.id), popupFormData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Actualizamos imagenes
      if (popupData.images && popupData.images.length > 0) {
        const imagePromises = popupData.images.map(img => {
          // Si la imagen no tiene ID (es decir, no existía antes), la ignoramos para actualizar
          if (!img.id) return Promise.resolve();

          const imgForm = new FormData();
          imgForm.append('_method', 'PATCH'); // Requerido por Laravel
          imgForm.append('device', img.device);
          imgForm.append('slot', img.slot);

          if (img.alt) imgForm.append('alt', img.alt);
          if (img.title) imgForm.append('title', img.title);

          // Solo adjuntamos el archivo si subiste uno nuevo
          if (img.file instanceof File) {
            imgForm.append('file', img.file);
          }

          // manda la petición al ID de la imagen
          return api.post(`/admin/popup-images/${img.id}`, imgForm, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
        });

        // Esperamos a que todas las imágenes terminen de actualizarse
        await Promise.all(imagePromises);
      }

      return { success: true, message: 'Popup e imágenes actualizados exitosamente' };

    } else {
      const formData = new FormData();

      if (popupData.lead_source_id) formData.append('lead_source_id', String(popupData.lead_source_id));
      formData.append('title', popupData.title);
      formData.append('button_text', popupData.button_text);
      formData.append('button_color', popupData.button_color || '#6DE1E3');
      formData.append('page_target', popupData.page_target);
      formData.append('delay_seconds', String(popupData.delay_seconds));
      formData.append('priority', String(popupData.priority));
      formData.append('active', popupData.active ? '1' : '0');
      // product_id
      // if (popupData.product_id) formData.append('product_id', String(popupData.product_id));
      if (popupData.product_id !== undefined && popupData.product_id !== null) formData.append('product_id', String(popupData.product_id));

      // Mapeamos el arreglo de imágenes
      if (popupData.images && popupData.images.length > 0) {
        popupData.images.forEach((img, index) => {
          formData.append(`images[${index}][device]`, img.device);
          formData.append(`images[${index}][slot]`, img.slot);

          if (img.alt) formData.append(`images[${index}][alt]`, img.alt);
          if (img.title) formData.append(`images[${index}][title]`, img.title);

          if (img.file instanceof File) {
            formData.append(`images[${index}][file]`, img.file);
          }
        });
      }

      const response = await api.post(API_ENDPOINTS.ADMIN.POPUPS.CREATE, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      return { success: true, message: 'Popup guardado exitosamente', data: response.data };
    }

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
