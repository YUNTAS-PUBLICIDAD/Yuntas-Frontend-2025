import { api, API_ENDPOINTS } from "@/config";
import { LeadInput } from "@/types/admin/lead";

export const captureLeadService = async (
  data: LeadInput
) => {
  const response = await api.post(
    API_ENDPOINTS.LEADS.CAPTURE,
    data
  );

  return response.data;
}
