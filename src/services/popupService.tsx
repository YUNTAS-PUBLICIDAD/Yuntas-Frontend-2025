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

const buildBasePopupForm = (popupData: Popup) => {
  const formData = new FormData();

  if (popupData.lead_source_id) {
    formData.append("lead_source_id", String(popupData.lead_source_id));
  }

  if (popupData.product_id) {
    formData.append("product_id", String(popupData.product_id));
  }

  formData.append("title", popupData.title);
  formData.append("button_text", popupData.button_text);
  formData.append("button_color", popupData.button_color || "#6DE1E3");
  formData.append("button_text_color", popupData.button_text_color ?? "#FFFFFF");
  formData.append("page_target", popupData.page_target);
  formData.append("delay_seconds", String(popupData.delay_seconds));
  formData.append("priority", String(popupData.priority));
  formData.append("active", popupData.active ? "1" : "0");

  return formData;
};

export const savePopupService = async (
  popupData: Popup,
  isUpdating: boolean = false
): Promise<PopupServiceResponse<Popup>> => {
  try {

    // =========================
    // UPDATE
    // =========================
    if (isUpdating && popupData.id) {
      const formData = buildBasePopupForm(popupData);
      formData.append("_method", "PATCH");

      popupData.images?.forEach((img, index) => {

  // Solo imágenes nuevas (sin id)
  if (!img.id && img.file instanceof File) {

    formData.append(
      `images[${index}][device]`,
      img.device
    );

    formData.append(
      `images[${index}][slot]`,
      img.slot
    );

    if (img.alt) {
      formData.append(
        `images[${index}][alt]`,
        img.alt
      );
    }

    if (img.title) {
      formData.append(
        `images[${index}][title]`,
        img.title
      );
    }

    formData.append(
      `images[${index}][file]`,
      img.file
    );
  }
});

for (const pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}

      await api.post(
        API_ENDPOINTS.ADMIN.POPUPS.UPDATE(popupData.id),
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (popupData.images?.length) {
        const imagePromises = popupData.images.map((img) => {
          if (!img.id) return Promise.resolve();

          const imgForm = new FormData();
          imgForm.append("_method", "PATCH");
          imgForm.append("device", img.device);
          imgForm.append("slot", img.slot);

          if (img.alt) imgForm.append("alt", img.alt);
          if (img.title) imgForm.append("title", img.title);

          if (img.file instanceof File) {
            imgForm.append("file", img.file);
          }

          return api.post(`/admin/popup-images/${img.id}`, imgForm, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        });

        await Promise.all(imagePromises);
      }

      return {
        success: true,
        message: "Popup e imágenes actualizados exitosamente",
      };
    }

    // =========================
    // CREATE
    // =========================
    const formData = buildBasePopupForm(popupData);

    const images = popupData.images ?? [];

    if (images.length > 0) {
      images.forEach((img, index) => {
        formData.append(`images[${index}][device]`, img.device);
        formData.append(`images[${index}][slot]`, img.slot);

        if (img.alt) formData.append(`images[${index}][alt]`, img.alt);
        if (img.title) formData.append(`images[${index}][title]`, img.title);

        if (img.file instanceof File) {
          formData.append(`images[${index}][file]`, img.file);
        }
      });
    }
    // ❌ NO enviar images vacío
    // Laravel ya interpreta ausencia como null/optional

    const response = await api.post(
      API_ENDPOINTS.ADMIN.POPUPS.CREATE,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    return {
      success: true,
      message: "Popup guardado exitosamente",
      data: response.data,
    };

  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const getPublicPopupService = async (page: string): Promise<PopupServiceResponse<Popup | null>> => {
  try {
    const endpoint = `${API_ENDPOINTS.POPUP.PUBLIC(page)}?_t=${Date.now()}`;

    const response = await api.get(endpoint, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
      },
      skipAuth: true, // 👈 flag custom para el interceptor

    }as any);

    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
