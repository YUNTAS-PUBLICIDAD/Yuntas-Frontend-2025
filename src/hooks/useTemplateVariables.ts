import { getTemplateVariablesService } from "@/services/templateService";
import { useCallback, useState } from "react"

export const useTemplateVariables =  () => {
  const [variables, setVariables] = useState<string[]>([]);
  const [preview, setPreview] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false)

  const getVariables = useCallback(async () => {
    setLoading(true);

    const res = await getTemplateVariablesService();

    setVariables(res?.variables ?? []);
    setPreview(res?.preview ?? {});

    setLoading(false)
  }, []);

  return {
    variables,
    preview,
    getVariables,
    loading
  }
}
