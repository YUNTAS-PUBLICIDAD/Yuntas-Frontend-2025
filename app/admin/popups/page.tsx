'use client';

import React, { useEffect, useState } from 'react'; 
import { usePopups } from '@/hooks/usePopups';
import { useTemplates } from '@/hooks/useTemplates';
import { Popup } from '@/types/admin/popup';
import { Template } from '@/types/admin/template';
import { showToast } from '@/utils/showToast';
import PopupForm from '@/components/molecules/admin/popups/PopupConfigForm'; 
import TemplateConfigForm from './TemplateConfigForm';

export default function PopupsConfigPage() {
  // Hook de Popups
  const { popups, getPopups, savePopup, isLoading: isLoadingPopups, isSaving: isSavingPopup } = usePopups();
  
  // Hook DE TEMPLATES
  const { templates, getTemplates, saveTemplate, isLoading: isLoadingTemplates, isSaving: isSavingTemplate } = useTemplates();
  
  // ESTADO PARA LOS TABS PRINCIPALES
  const [activeTab, setActiveTab] = useState('popup');

  // Cargar los datos de ambos servicios al entrar a la página
  useEffect(() => {
    getPopups();
    getTemplates();
  }, [getPopups, getTemplates]);

  // Función para guardar POPUPS
  const handleSavePopup = async (popupData: Popup) => {
    const isUpdating = !!popupData.id;
    const result = await savePopup(popupData, isUpdating);

    if (result.success) {
      showToast.success(isUpdating ? "Popup actualizado correctamente" : "Popup guardado exitosamente");
      getPopups(); 
    } else {
      showToast.error(result.message || "Error al guardar el popup");
    }
  };

  // Función para guardar templates
  const handleSaveTemplate = async (templateData: Template) => {
    const isUpdating = !!templateData.id;
    const result = await saveTemplate(templateData, isUpdating);

    if (result.success) {
      showToast.success(isUpdating ? "Plantillas actualizadas correctamente" : "Plantillas guardadas exitosamente");
      getTemplates(); // Recarga para obtener las nuevas URLs de las imágenes
    } else {
      showToast.error(result.message || "Error al guardar las plantillas");
    }
  };

  // Pantalla de carga unificada
  if ((isLoadingPopups && !popups.length) || (isLoadingTemplates && !templates.length)) {
    return <div className="p-10 text-center animate-pulse text-[#203565]">Cargando configuración...</div>;
  }

  // Por ahora, se asume que se edita el primero de la base de datos
  const currentPopup = popups.length > 0 ? popups[0] : null;
  const currentTemplate = templates.length > 0 ? templates[0] : null;

  return (
    <div className="p-2 md:p-4 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#203565] dark:text-white">Configuración de Captación</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Administra el diseño del popup y las plantillas automáticas de seguimiento.</p>
      </div>

      {/* TABS PRINCIPALES */}
      <div className="flex space-x-8 border-b border-gray-200 dark:border-gray-700 mb-8">
        <button
          onClick={() => setActiveTab('popup')}
          className={`py-3 flex items-center gap-2 border-b-2 font-bold text-sm transition-colors ${
            activeTab === 'popup'
              ? 'border-[#203565] text-[#203565] dark:border-white dark:text-white'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <span className="text-lg">✱</span> POP-UP
        </button>
        
        <button
          onClick={() => setActiveTab('plantillas')}
          className={`py-3 flex items-center gap-2 border-b-2 font-bold text-sm transition-colors ${
            activeTab === 'plantillas'
              ? 'border-[#203565] text-[#203565] dark:border-white dark:text-white'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <span className="text-lg">📄</span> PLANTILLAS
        </button>
      </div>

      {/* RENDERIZADO POPUP */}
      {activeTab === 'popup' && (
        <PopupForm 
          initialData={currentPopup} 
          onSubmit={handleSavePopup}
          onCancel={() => {
            getPopups();
            showToast.info("Se restauraron los datos originales");
          }}
          isSaving={isSavingPopup}
        />
      )}

      {/* RENDERIZADO TEMPLATE (Sin tabs internos) */}
      {activeTab === 'plantillas' && (
        <TemplateConfigForm 
          initialData={currentTemplate}
          onSubmit={handleSaveTemplate}
          onCancel={() => {
            getTemplates();
            showToast.info("Se restauraron los datos originales");
          }}
          isSaving={isSavingTemplate}
        />
      )}

    </div>
  );
}