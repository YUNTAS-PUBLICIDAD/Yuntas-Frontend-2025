import { api, API_ENDPOINTS } from "@/config";
import { Template, TemplateServiceResponse } from "@/types/admin/template";

export const getTemplatesService = async (): Promise<TemplateServiceResponse<Template[]>> => {
  try {
    const response = await api.get(API_ENDPOINTS.ADMIN.TEMPLATES.GET_ALL);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const getTemplateByIdService = async (id: number): Promise<TemplateServiceResponse<Template>> => {
  try {
    const response = await api.get(API_ENDPOINTS.ADMIN.TEMPLATES.GET_ONE(id));
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const saveTemplateService = async (templateData: Template, isUpdating: boolean = false): Promise<TemplateServiceResponse<Template>> => {
  try {
    const formData = new FormData();

    // Mapear los datos principales del Template
    formData.append('lead_source_id', String(templateData.lead_source_id));
    formData.append('name', templateData.name);
    formData.append('active', templateData.active ? '1' : '0');

    // Mapear los contenidos (WhatsApp y Email)
    templateData.contents.forEach((content, index) => {
      // Si se esta actualizando y el contenido ya existía, envia su ID
      if (isUpdating && content.id) {
        formData.append(`contents[${index}][id]`, String(content.id));
      }

      formData.append(`contents[${index}][channel]`, content.channel);
      formData.append(`contents[${index}][content]`, content.content);
      formData.append(`contents[${index}][active]`, content.active ? '1' : '0');

      if (content.subject) {
        formData.append(`contents[${index}][subject]`, content.subject);
      }

      // =========================
      // VARIABLES (ARRAY SIMPLE)
      // =========================
      // content.variables?.forEach((variable, varIndex) => {
      //   formData.append(`contents[${index}][variables][${varIndex}]`, variable);
      // });
      (
        content.variables || []
        ).forEach((variable, varIndex) => {
          formData.append(
            `contents[${index}][variables][${varIndex}]`,
            variable
          );
        });

     (content.buttons || []).forEach((button, btnIndex) => {
        if(isUpdating && button.id){
          formData.append(`contents[${index}][buttons][${btnIndex}][id]`, String(button.id));
        }

        formData.append(`contents[${index}][buttons][${btnIndex}][text]`, button.text);
            formData.append(`contents[${index}][buttons][${btnIndex}][type]`, button.type);
            formData.append(`contents[${index}][buttons][${btnIndex}][active]`, button.active ? '1' : '0');
            formData.append(`contents[${index}][buttons][${btnIndex}][order]`, String(button.order ?? btnIndex));

            Object.entries(button.payload || {}).forEach(([key, value]) => {
              formData.append(
                `contents[${index}][buttons][${btnIndex}][payload][${key}]`,
                String(value)
              );
            });
      });

      // IMAGEN
    //   if (content.image instanceof File) {
    //     if (isUpdating) {
    //        // En actualización, Laravel (según el backend) espera 'contents_0_image'
    //        formData.append(`contents[${index}][image]`, content.image);
    //     } else {
    //        // En creación, espera 'contents[0][image]'
    //        formData.append(`contents[${index}][image]`, content.image);
    //     }
    //   }
    // });

    // =========================
    // IMAGE (IMPORTANTE: SIEMPRE IGUAL)
    // =========================
    if (content.image instanceof File) {
          formData.append(
            `contents[${index}][image]`,
            content.image
          );
        }
      });

    // =========================
    // REQUEST
    // =========================
    let response;

    if (isUpdating && templateData.id) {
      // TRUCO LARAVEL: Para enviar archivos en un Update, se usa POST con _method=PUT
      formData.append('_method', 'PUT');
      response = await api.post(API_ENDPOINTS.ADMIN.TEMPLATES.UPDATE(templateData.id), formData);
    } else {
      // Creación normal
      response = await api.post(API_ENDPOINTS.ADMIN.TEMPLATES.CREATE, formData,
      //   {
      //   headers: { 'Content-Type': 'multipart/form-data' }
      // }
      );
    }

    return { success: true, message: 'Plantilla guardada exitosamente', data: response.data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const deleteTemplateService = async (id: number): Promise<TemplateServiceResponse<null>> => {
  try {
    await api.delete(API_ENDPOINTS.ADMIN.TEMPLATES.DELETE(id));
    return { success: true, message: 'Plantilla eliminada exitosamente' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
