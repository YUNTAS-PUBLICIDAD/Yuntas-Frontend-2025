import { useState, useCallback } from 'react';
import { Template } from '@/types/admin/template';
import { getTemplatesService, saveTemplateService, deleteTemplateService } from '@/services/templateService';

export const useTemplates = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const getTemplates = useCallback(async () => {
    setIsLoading(true);
    const result = await getTemplatesService();
    if (result.success && result.data) {
      setTemplates(result.data);
    }
    setIsLoading(false);
  }, []);

  const saveTemplate = async (templateData: Template, isUpdating: boolean = false) => {
    setIsSaving(true);
    const result = await saveTemplateService(templateData, isUpdating);
    setIsSaving(false);
    return result;
  };

  const deleteTemplate = async (id: number) => {
    return await deleteTemplateService(id);
  };

  return {
    templates,
    getTemplates,
    saveTemplate,
    deleteTemplate,
    isLoading,
    isSaving
  };
};