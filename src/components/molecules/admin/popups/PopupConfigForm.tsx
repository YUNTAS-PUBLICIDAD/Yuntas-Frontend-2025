'use client';

import React, { useState, useEffect } from 'react';
import Button from "@/components/atoms/Button";
import { Popup } from '@/types/admin/popup';
import { showToast } from '@/utils/showToast';

interface PopupConfigFormProps {
  initialData?: Popup | null;
  onSubmit: (data: Popup) => Promise<void>;
  onCancel: () => void;
  isSaving?: boolean;
}

export default function PopupConfigForm({ initialData, onSubmit, onCancel, isSaving }: PopupConfigFormProps) {
  // --- ESTADOS MAPEADOS AL MODELO ---
  const [active, setActive] = useState(true);
  const [title, setTitle] = useState('');
  const [buttonText, setButtonText] = useState('');
  
  const [pageTarget, setPageTarget] = useState('all');
  const [delaySeconds, setDelaySeconds] = useState('5');
  
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [imgSrc, setImgSrc] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageAlt, setImageAlt] = useState('');
  const [imageTitle, setImageTitle] = useState('');

  // Llenar el formulario si estamos editando (initialData)
  useEffect(() => {
    if (initialData) {
      setActive(initialData.active ?? true);
      setTitle(initialData.title || '');
      setButtonText(initialData.button_text || '');
      setPageTarget(initialData.page_target || 'all');
      setDelaySeconds(initialData.delay_seconds?.toString() || '5');
      setImageAlt(initialData.image_alt || '');
      setImageTitle(initialData.image_title || '');
      
      if (initialData.image_url) setImgSrc(initialData.image_url);

      if (initialData.start_date) setStartDate(initialData.start_date.substring(0, 16));
      if (initialData.end_date) setEndDate(initialData.end_date.substring(0, 16));
    } else {
      // Si es un nuevo popup, limpiamos los campos (por si se re-abre el modal)
      setActive(true);
      setTitle('');
      setButtonText('');
      setPageTarget('all');
      setDelaySeconds('5');
      setImageAlt('');
      setImageTitle('');
      setImgSrc('');
      setImageFile(null);
      setStartDate('');
      setEndDate('');
    }
  }, [initialData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const objectUrl = URL.createObjectURL(file);
      setImgSrc(objectUrl);
    } else {
      setImageFile(null);
    }
  };

  const handleSave = async () => {
    if (!title || !buttonText || !imageAlt || !pageTarget || !delaySeconds) {
      showToast.warning("Por favor completa todos los campos obligatorios (*)");
      return;
    }
    if (!imgSrc && !imageFile) {
      showToast.warning("Por favor sube una imagen (*)");
      return;
    }

    const popupData: Popup = {
      id: initialData?.id, // Mantenemos el ID si estamos editando
      title,
      button_text: buttonText,
      page_target: pageTarget,
      delay_seconds: parseInt(delaySeconds) || 0,
      priority: 1, // Fijo por ahora
      start_date: startDate || null,
      end_date: endDate || null,
      active,
      image_alt: imageAlt,
      image_title: imageTitle,
      image: imageFile || undefined 
    };

    // Llama a la función del padre (la página que contiene la tabla)
    await onSubmit(popupData);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      {/* ==========================================
          COLUMNA IZQUIERDA: EL FORMULARIO
          ========================================== */}
      <div className="lg:col-span-7 bg-white dark:bg-[#141A3F] p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 max-h-[75vh] overflow-y-auto">
        <div className="flex flex-col gap-6">

          {/* ESTADO */}
          <div className="flex items-center justify-between bg-gray-50 dark:bg-[#0D1030] p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-800 dark:text-white">Estado (active) <span className="text-red-500">*</span></span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Activar o desactivar este popup</span>
            </div>
            <button
              type="button"
              onClick={() => setActive(!active)}
              className={`${active ? 'bg-[#6DE1E3]' : 'bg-gray-300 dark:bg-gray-600'} relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
            >
              <span className={`${active ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`} />
            </button>
          </div>

          {/* REGLAS DE VISUALIZACIÓN */}
          <div className={`flex flex-col gap-4 ${!active ? 'opacity-50' : ''}`}>
            <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 border-b dark:border-gray-700 pb-1">Reglas de Visualización</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Página destino <span className="text-red-500">*</span></label>
                <select 
                  value={pageTarget} 
                  onChange={(e) => setPageTarget(e.target.value)}
                  disabled={!active}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-transparent dark:text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed"
                >
                  <option value="all">Todas las páginas</option>
                  <option value="inicio">Inicio</option>
                  <option value="productos">Productos</option>
                  <option value="contacto">Contacto</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Retardo en segundos <span className="text-red-500">*</span></label>
                <input 
                  type="number" min="0" max="60"
                  value={delaySeconds}
                  onChange={(e) => setDelaySeconds(e.target.value)}
                  disabled={!active}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-transparent dark:text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed" 
                />
              </div>
            </div>

            {/* Fechas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Fecha Inicio <span className="font-normal text-gray-400">(Opcional)</span></label>
                <input 
                  type="datetime-local" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  disabled={!active}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-transparent dark:text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed text-sm" 
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Fecha Fin <span className="font-normal text-gray-400">(Opcional)</span></label>
                <input 
                  type="datetime-local" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  disabled={!active}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-transparent dark:text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed text-sm" 
                />
              </div>
            </div>
          </div>

          {/* TEXTOS */}
          <div className={`flex flex-col gap-4 ${!active ? 'opacity-50' : ''}`}>
            <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 border-b dark:border-gray-700 pb-1">Textos del Pop-up</h3>
            
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Título <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={!active}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-transparent dark:text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed" 
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Texto del Botón <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                disabled={!active}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-transparent dark:text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed" 
              />
            </div>
          </div>

          {/* IMAGEN */}
          <div className={`bg-gray-50 dark:bg-[#0D1030] p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col gap-4 ${!active ? 'opacity-50' : ''}`}>
            <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">Imagen <span className="text-red-500">*</span></h3>
            
            <input 
              type="file" accept="image/*" onChange={handleImageChange} disabled={!active}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-transparent dark:text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:cursor-not-allowed" 
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Alt de imagen <span className="text-red-500">*</span></label>
                <input 
                  type="text" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} disabled={!active}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-transparent dark:text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed" 
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Título hover <span className="font-normal text-gray-400">(Opcional)</span></label>
                <input 
                  type="text" value={imageTitle} onChange={(e) => setImageTitle(e.target.value)} disabled={!active}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-transparent dark:text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed" 
                />
              </div>
            </div>
          </div>

          {/* BOTONES ACCIÓN */}
          <div className="pt-2 flex flex-col md:flex-row gap-3">
            <Button size="md" variant="secondary" className="w-full" onClick={onCancel} disabled={isSaving}>
              Cancelar
            </Button>
            <Button size="md" variant="primary" className="w-full" onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Guardando...' : (initialData ? 'Actualizar Pop-up' : 'Crear Pop-up')}
            </Button>
          </div>
        </div>
      </div>

      {/* ==========================================
          COLUMNA DERECHA: LA VISTA PREVIA
          ========================================== */}
      <div className="lg:col-span-5 bg-gray-50 dark:bg-[#0D1030] p-6 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden">
        
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          <span className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            Destino: {pageTarget} ({delaySeconds}s)
          </span>
          {active ? (
             <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">ACTIVO</span>
          ) : (
             <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">INACTIVO</span>
          )}
        </div>

        <div className={`bg-white w-full max-w-sm rounded-xl shadow-2xl overflow-hidden relative z-10 mt-8 transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-40 grayscale-[50%]'}`}>
          <button className="absolute top-3 right-3 text-gray-400 hover:text-black font-bold text-lg px-2 z-20 bg-white/80 rounded-full h-8 w-8 flex items-center justify-center">✕</button>
          
          <div className="h-44 bg-gray-200 flex items-center justify-center relative overflow-hidden">
            {imgSrc ? (
              <img src={imgSrc} alt={imageAlt || "Vista previa"} title={imageTitle} className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-500 font-medium text-sm text-center px-4">[image]</span>
            )}
          </div>
          
          <div className="p-6 text-center flex flex-col gap-3">
            <h4 className="text-xl font-bold text-[#04041C]">{title || 'Escribe un título...'}</h4>
            <p className="text-sm text-gray-600">Déjanos tus datos y te enviaremos la información.</p>
            
            <div className="h-10 bg-gray-50 rounded border border-gray-200 w-full mt-2"></div>
            <div className="h-10 bg-gray-50 rounded border border-gray-200 w-full"></div>
            
            <button className="w-full py-3 rounded font-bold mt-2 transition-all uppercase bg-[#6DE1E3] text-[#04041C]">
              {buttonText || 'BOTÓN'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}