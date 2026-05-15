import { captureLeadService } from "@/services/leadCaptureService";
import { LeadInput } from "@/types/admin/lead";
import { useCallback, useState } from "react"

export function useLeadCapture(){
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null)

  const captureLead = useCallback(
    async (leadData: LeadInput) => {
     setIsSubmitting(true);
     setError(null);

     try {
       return await captureLeadService(
         leadData
       );
     }catch (e: any){
       setError(
          e?.response?.data?.message || 'Error capturando lead'
       );
       throw e;
     }finally {
       setIsSubmitting(false);
     }
    },
    []
  )

  return {
    captureLead,
    isSubmitting,
    error,
    clearError
  }
}
