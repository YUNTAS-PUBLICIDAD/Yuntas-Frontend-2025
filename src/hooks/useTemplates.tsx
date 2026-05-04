import { useEffect, useState } from "react";
import { deleteTemplateService, getTemplatesService } from "@/services/templateService";
import toast from "react-hot-toast";

export const useTemplates = () => {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const load = async () => {
    setLoading(true);

    try {
       const res = await getTemplatesService();

       console.log("👉 RAW RESPONSE:", res);
         console.log("👉 TYPE:", typeof res);
         console.log("👉 DATA:", res?.data);
         console.log("👉 IS ARRAY:", Array.isArray(res?.data));

       // 🔥 blindaje real
       if (!res || !Array.isArray(res.data)) {
         console.error("Respuesta inválida:", res);
         setTemplates([]);
         return;
       }

       setTemplates(res.data);

     } catch (e) {
       console.error("Error cargando templates:", e);
       setTemplates([]);
     } finally {
       setLoading(false);
     }
  };

  useEffect(() => {
    load();
  }, []);

const remove = async (id: number) => {
  const confirm = window.confirm("¿Eliminar este template?");
    if (!confirm) return;

    setDeletingId(id);
    try {

      await deleteTemplateService(id);
      // Actualiza UI
      setTemplates(prev => prev.filter(t => t.id !== id));

      // feedback controlado
      toast.success("Template eliminado");

    } catch (e) {
      console.error(e);
      toast.error("No se puedo eliminar el template")
    }finally {
      setDeletingId(null);
    }
}

  return {
    templates,
    loading,
    reload: load,
    remove,
    deletingId
  };
};
