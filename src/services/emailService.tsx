import { api, API_ENDPOINTS } from "@/config";
import {
    emailPlantilla,
    EmailFormInput,
    emailPlantillaServiceResponse,
    sendEmailCampanaResponse,
} from "@/types/admin/emailPlantilla";
import { LeadInput } from "@/types/admin/lead";
import { buildEmailFormData } from "@/utils/emailFormData";
import { getImg } from "@/utils/getImg";
import { getToken } from "@/utils/token";

function formatPlantilla(apiPlantilla: emailPlantilla[]): emailPlantilla[] {
    let img_secundarias: (string[] | null)[] = apiPlantilla.map((item) => {
        return typeof item.imagenes_secundarias === "string"
            ? JSON.parse(item.imagenes_secundarias).map((img: string) => getImg("/" + img))
            : item.imagenes_secundarias;
    });

    return apiPlantilla.map((item, index) => ({
        ...item,
        imagen_principal: item.imagen_principal ? getImg("/" + item.imagen_principal) : null,
        imagenes_secundarias: img_secundarias[index] || null,
    }))
};

export async function getEmailPlantillaByProductService(product_id: number): Promise<emailPlantillaServiceResponse<emailPlantilla[]>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const response = await api.get(API_ENDPOINTS.ADMIN.CAMPANA.EMAILS.GET_ONE_BY_PRODUCT(product_id), {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return {
            success: true,
            message: response.data.message || "Plantilla Email obtenida exitosamente",
            data: formatPlantilla(response.data)
        };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

// para crear y actualizar una plantilla
export async function saveEmailPlantillaService(emailData: EmailFormInput): Promise<emailPlantillaServiceResponse<emailPlantilla>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        for (let paso = 0; paso < emailData.sections.length; paso++) {
            const formData = buildEmailFormData(emailData.producto_id,emailData.sections[paso],paso);

            await api.post(API_ENDPOINTS.ADMIN.CAMPANA.EMAILS.SAVE, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
        }

        return {
            success: true,
            message: "Plantilla Email creada exitosamente",
        };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function sendEmailService(
  leadData: LeadInput
): Promise<emailPlantillaServiceResponse<null>> {
  try {
    const payload = {
      nombre: leadData.name,
      correo: leadData.email,
      telefono: leadData.phone,
      producto_id: leadData.product_id,
    };

    const response = await api.post('/email/send', payload);

    return {
      success: true,
      message: response.data.message || "Email enviado exitosamente",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}

export async function sendEmailCampanaService(product_id: number): Promise<sendEmailCampanaResponse> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const response = await api.post(API_ENDPOINTS.ADMIN.CAMPANA.EMAILS.SEND_CAMPANA, { producto_id: product_id },{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return {
            success: true,
            message: response.data.message || "Campañas por email enviadas exitosamente",
            total_correos: response.data.total_correos,
            total_leads: response.data.total_leads,
        };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}