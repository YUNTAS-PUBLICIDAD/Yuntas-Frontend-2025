import { api, API_ENDPOINTS } from "@/config";
import { Template } from "@/types/admin/template";

export const getTemplatesService = async () => {
  const { data } = await api.get(API_ENDPOINTS.ADMIN.TEMPLATES.GET_ALL);
  return data;
};

export const getTemplateService = async (id: number) => {
  const { data } = await api.get(API_ENDPOINTS.ADMIN.TEMPLATES.GET_ONE(id));
  return data;
};

export const createTemplateService = async (payload: Partial<Template>) => {
  const { data } = await api.post(API_ENDPOINTS.ADMIN.TEMPLATES.CREATE, payload);
  return data;
};

export const updateTemplateService = async (id: number, payload: Partial<Template>) => {
  const { data } = await api.put(API_ENDPOINTS.ADMIN.TEMPLATES.UPDATE(id), payload);
  return data;
};

export const deleteTemplateService = async (id: number) => {
  const { data } = await api.delete(API_ENDPOINTS.ADMIN.TEMPLATES.DELETE(id));
  return data;
};

export const uploadTemplateImageService = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const {data} = await api.post(
    API_ENDPOINTS.ADMIN.TEMPLATES.UPLOAD_IMAGE,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    }
  );
  return data;
}

export const uploadProductTemplateImageService = async (file:File) => {
  const formData = new FormData();
  formData.append("file", file);

  const {data} = await api.post(
    API_ENDPOINTS.ADMIN.TEMPLATES.PRODUCT_ASSETS.UPLOAD,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
  return data;
}

export const deleteProductTemplateImageService = async (payload: {
  // product_id: number;
  // variant_id: number;
  // key: string;
  path: string
}) => {
  const { data } = await api.delete(
    API_ENDPOINTS.ADMIN.TEMPLATES.PRODUCT_ASSETS.DELETE,
    { data: payload } // 👈 importante en axios
  );

  return data;
};

export const getTemplateVariablesService = async () => {
  const {data} = await api.get(
    API_ENDPOINTS.ADMIN.TEMPLATES.GET_VARIABLES
  );
  return data;
}
