'use client';

import React, { useState, useEffect } from 'react';
import Button from "@/components/atoms/Button";
import { Popup } from '@/types/admin/popup';
import { showToast } from '@/utils/showToast';

const BACKEND_URL = (process.env.NEXT_PUBLIC_URL || "http://localhost:8000").replace(/\/$/, "");

interface PopupConfigFormProps {
  initialData?: Popup | null;
  onSubmit: (data: Popup) => Promise<void>;
  onCancel: () => void;
  isSaving?: boolean;
}

export default function PopupConfigForm({ initialData, onSubmit, onCancel, isSaving }: PopupConfigFormProps) {
  // --- ESTADOS MAPEADOS AL MODELO ---
  const [active, setActive] = useState(false);
  const [title, setTitle] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [buttonColor, setButtonColor] = useState('#6DE1E3');
  
  const [pageTarget, setPageTarget] = useState('all');
  const [delaySeconds, setDelaySeconds] = useState('5');
  
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [imgSrc, setImgSrc] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageAlt, setImageAlt] = useState('');
  const [imageTitle, setImageTitle] = useState('');

  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [textImgSrc, setTextImgSrc] = useState('');     // Imagen de texto (Desktop)
  const [mobileImgSrc, setMobileImgSrc] = useState(''); // Imagen principal (Móvil)

  // Llenar el formulario si estamos editando (initialData)
  useEffect(() => {
    if (initialData) {
      setActive(initialData.active !== undefined ? initialData.active : false);
      setTitle(initialData.title || '');
      setButtonText(initialData.button_text || '');
      setPageTarget(initialData.page_target || 'all');
      setDelaySeconds(initialData.delay_seconds?.toString() || '5');
      setImageAlt(initialData.image_alt || '');
      setImageTitle(initialData.image_title || '');
      setButtonColor(initialData.button_color || '#6DE1E3');
      
      if (initialData.image_url) {
        setImgSrc(initialData.image_url);
      } else if (typeof initialData.image === 'string') {
        const cleanPath = initialData.image.startsWith('/') ? initialData.image : `/${initialData.image}`;
        setImgSrc(`${BACKEND_URL}${cleanPath}`); 
      }

      if (initialData.start_date) setStartDate(initialData.start_date.substring(0, 16));
      if (initialData.end_date) setEndDate(initialData.end_date.substring(0, 16));
    } else {
      // Si es un nuevo popup, limpiamos los campos (por si se re-abre el modal)
      setActive(false);
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
      setButtonColor('#6DE1E3');
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

  const handleTextImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setTextImgSrc(URL.createObjectURL(e.target.files[0]));
  };
  const handleMobileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setMobileImgSrc(URL.createObjectURL(e.target.files[0]));
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
      button_color: buttonColor,
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
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Retardo al aparecer <span className="text-red-500">*</span>
                </label>
                <select 
                  value={delaySeconds} 
                  onChange={(e) => setDelaySeconds(e.target.value)}
                  disabled={!active}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-transparent dark:text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed"
                >
                  <option value="3">3 segundos</option>
                  <option value="5">5 segundos (Recomendado)</option>
                  <option value="8">8 segundos (Máximo)</option>
                </select>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Texto del Botón <span className="text-red-500">*</span></label>
      <input type="text" value={buttonText} onChange={(e) => setButtonText(e.target.value)} disabled={!active}
        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-transparent dark:text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed" />
    </div>

    {/*INPUTS DE PRUEBA */}
          <div className={`bg-blue-50 dark:bg-[#1A2359] p-4 rounded-lg border border-blue-200 dark:border-blue-800 flex flex-col gap-4 ${!active ? 'opacity-50' : ''}`}>
            <h3 className="text-sm font-bold text-blue-800 dark:text-blue-300">Imágenes Extra (Para pruebas de diseño)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Imagen de Texto (Escritorio)</label>
                <input type="file" accept="image/*" onChange={handleTextImageChange} disabled={!active} className="text-xs" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Imagen Principal (Móvil)</label>
                <input type="file" accept="image/*" onChange={handleMobileImageChange} disabled={!active} className="text-xs" />
              </div>
            </div>
          </div>

    {/*  COLOR DEL BOTÓN*/}
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Color del Botón</label>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={buttonColor}
          onChange={(e) => setButtonColor(e.target.value)}
          disabled={!active}
          className="h-10 w-14 cursor-pointer rounded border border-gray-300 dark:border-gray-600 p-1 disabled:cursor-not-allowed"
        />
        <span className="text-sm font-mono text-gray-500 dark:text-gray-400">{buttonColor}</span>
      </div>
    </div>
  </div>
          </div>

          {/* IMAGEN */}
          <div className={`bg-gray-50 dark:bg-[#0D1030] p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col gap-4 ${!active ? 'opacity-50' : ''}`}>
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">Imagen <span className="text-red-500">*</span></h3>
              {/* MENSAJE DE INFORMACION SOBRE LA CARGA DE IMAGEN*/}
              {initialData?.image && !imageFile && (
                <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded">Imagen actual cargada</span>
              )}
            </div>
            
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
      <div className="lg:col-span-5 bg-gray-100 dark:bg-[#0D1030] p-6 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden">
        
        {/* Etiquetas superiores */}
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          <span className="bg-white text-gray-800 text-xs font-bold px-3 py-1 rounded-full uppercase shadow-sm">
            {pageTarget} ({delaySeconds}s)
          </span>
          {active ? (
             <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase shadow-sm">ACTIVO</span>
          ) : (
             <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full uppercase shadow-sm">INACTIVO</span>
          )}
        </div>

        {/* SWITCH DESKTOP / MOBILE */}
        <div className="flex gap-2 mb-6 relative z-20 mt-8">
            <button 
              type="button"
              onClick={() => setPreviewMode('desktop')}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${previewMode === 'desktop' ? 'bg-[#6DE1E3] text-gray-900 shadow-md' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}`}
            >
              🖥️ Escritorio
            </button>
            <button 
              type="button"
              onClick={() => setPreviewMode('mobile')}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${previewMode === 'mobile' ? 'bg-[#6DE1E3] text-gray-900 shadow-md' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}`}
            >
              📱 Móvil
            </button>
        </div>

        {/* CONTENEDOR DE LA VISTA PREVIA CONDICIONAL */}
        {previewMode === 'desktop' ? (
            // 🖥️ DISEÑO ESCRITORIO
            <div className={`bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative z-10 transition-opacity duration-300 flex flex-row border-[6px] border-white ${active ? 'opacity-100' : 'opacity-40 grayscale-[50%]'}`}>
                <button type="button" className="absolute top-3 right-3 text-gray-400 hover:text-black font-bold text-lg px-2 z-20 bg-white/80 rounded-full h-8 w-8 flex items-center justify-center">✕</button>
                
                {/* Lado Izquierdo: Imagen del Producto */}
                <div className="w-1/2 bg-[#5EC8C6] flex items-center justify-center relative overflow-hidden p-6 rounded-l-xl">
                    {imgSrc ? (
                        <img src={imgSrc} alt="Vista previa" className="w-full h-auto object-contain drop-shadow-2xl" />
                    ) : (
                        <span className="text-white font-medium text-sm text-center px-4">[Imagen Máquina]</span>
                    )}
                </div>

                {/* Lado Derecho: Textos y Formulario */}
                <div className="w-1/2 p-8 flex flex-col justify-center gap-4 bg-white relative">
                    {textImgSrc ? (
                        <img src={textImgSrc} alt="Texto Gigante" className="w-full h-auto object-contain max-h-32 mb-2" />
                    ) : (
                        <h4 className="text-[26px] font-extrabold text-gray-400 text-center uppercase leading-none tracking-tight">
                           {title || 'TU INVERSIÓN EN MAQUINARIA, RESPALDADA POR EXPERTOS'}
                        </h4>
                    )}
                    
                    <div className="flex flex-col gap-2 w-full max-w-[200px] mx-auto mt-2">
                        <div className="h-8 bg-gray-100 rounded-full border border-gray-200 w-full flex items-center px-4 text-xs text-gray-500">Nombre</div>
                        <div className="h-8 bg-gray-100 rounded-full border border-gray-200 w-full flex items-center px-4 text-xs text-gray-500">Teléfono</div>
                        <div className="h-8 bg-gray-100 rounded-full border border-gray-200 w-full flex items-center px-4 text-xs text-gray-500">Correo</div>
                        
                        <button type="button" style={{ backgroundColor: buttonColor }} className="w-max mx-auto px-6 py-2 mt-2 rounded-full font-extrabold text-white text-xs uppercase shadow-md transition-all">
                            {buttonText || 'CONOCER MÁS'}
                        </button>
                    </div>
                </div>
            </div>
        ) : (
            // 📱 DISEÑO MÓVIL
            <div className={`bg-white w-[280px] rounded-[2rem] shadow-2xl overflow-hidden relative z-10 transition-opacity duration-300 border-[8px] border-black ${active ? 'opacity-100' : 'opacity-40 grayscale-[50%]'}`}>
                <button type="button" className="absolute top-3 right-3 text-gray-400 hover:text-black font-bold text-lg px-2 z-20 bg-white/80 rounded-full h-8 w-8 flex items-center justify-center">✕</button>
                
                {/* Imagen Superior con borde redondeado asimétrico (simulado) */}
                <div className="h-48 bg-gray-200 flex items-center justify-center relative overflow-hidden rounded-bl-[3rem] shadow-sm">
                    {mobileImgSrc || imgSrc ? (
                        <img src={mobileImgSrc || imgSrc} alt="Vista previa móvil" className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-gray-500 font-medium text-sm text-center px-4">[Imagen Principal Móvil]</span>
                    )}
                </div>
                
                <div className="p-6 text-center flex flex-col gap-3 bg-white">
                    <h4 className="text-lg font-bold text-gray-600 text-left leading-tight">
                        {title || 'Tu inversión en maquinaria, respaldada por expertos'}
                    </h4>
                    
                    <div className="flex flex-col gap-2 mt-1">
                        <div className="h-9 bg-gray-100 rounded-lg border border-gray-200 w-full flex items-center px-3 text-xs text-gray-500">Nombre</div>
                        <div className="h-9 bg-gray-100 rounded-lg border border-gray-200 w-full flex items-center px-3 text-xs text-gray-500">Teléfono</div>
                        <div className="h-9 bg-gray-100 rounded-lg border border-gray-200 w-full flex items-center px-3 text-xs text-gray-500">Correo</div>
                    </div>
                    
                    <button type="button" style={{ backgroundColor: buttonColor }} className="w-full py-2.5 rounded-xl font-extrabold mt-2 text-white text-sm uppercase shadow-md transition-all">
                        {buttonText || 'CONOCER MÁS'}
                    </button>
                </div>
            </div>
        )}

      </div>
    </div>
  );
}