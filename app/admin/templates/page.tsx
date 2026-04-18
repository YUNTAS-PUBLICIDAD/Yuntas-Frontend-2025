"use client";

import { useTemplates } from "@/hooks/useTemplates";
import { useEffect } from "react";
import TemplateConfigForm from "../popups/TemplateConfigForm";

export default function TemplatesPage(){
  const {templates, getTemplates, saveTemplate, isLoading, isSaving} = useTemplates();

  useEffect(() => {
    getTemplates();
  }, []);

  const handleSave = async (data: any) => {
    const isUpdate = !!data.id;
    await saveTemplate(data, isUpdate);
    getTemplates();
  };

  return (
    <TemplateConfigForm initialData={templates[0]} onSubmit={handleSave} isSaving={isSaving}/>
  )
}
