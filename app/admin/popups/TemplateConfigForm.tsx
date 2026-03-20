'use client';

import React, { useState, useRef, useEffect } from 'react';
import { showToast } from '@/utils/showToast';
import { Template, TemplateContent } from '@/types/admin/template';
import {
  FaArrowLeft, FaUser, FaStore, FaPhone, FaEllipsisVertical, FaLock, 
  FaRegFaceSmile, FaPaperclip, FaCamera, FaMicrophone
} from 'react-icons/fa6';

// --- ENUM DE FUENTES DE LEADS ---
export const sourceData = {
  INICIO: 1,
  PRODUCTOS: 2,
  PRODUCTO_DETALLE: 3,
  ADMINISTRACION: 4,
};

// --- UTILIDADES DE VISTA PREVIA ---
const replaceDynamicTags = (text: string, variables: Record<string, string>): string => {
  return text.replace(/\{\{([^{}]+)\}\}/g, (_, rawKey: string) => {
    const key = rawKey.trim();
    return variables[key] ?? `{{${key}}}`;
  });
};

const renderBoldSegments = (line: string) => {
  const parts = line.split(/(\*[^*]+\*)/g).filter((part) => part.length > 0);
  return parts.map((part, index) => {
    const isBold = part.startsWith('*') && part.endsWith('*') && part.length >= 2;
    if (!isBold) return <span key={`normal-${index}`}>{part}</span>;
    return <strong key={`bold-${index}`}>{part.slice(1, -1)}</strong>;
  });
};

const renderWhatsappMessage = (message: string, variables: Record<string, string>) => {
  const messageWithVariables = replaceDynamicTags(message, variables);
  const lines = messageWithVariables.split('\n');
  return lines.map((line, index) => {
    if (!line.trim()) return <span key={`line-${index}`} className="block">&nbsp;</span>;
    return <span key={`line-${index}`} className="block">{renderBoldSegments(line)}</span>;
  });
};

// --- INTERFAZ DEL COMPONENTE ---
interface TemplateConfigFormProps {
  initialData?: Template | null;
  onSubmit: (data: Template) => Promise<void>;
  onCancel: () => void;
  isSaving?: boolean;
}

export default function TemplateConfigForm({ initialData, onSubmit, onCancel, isSaving }: TemplateConfigFormProps) {
  const emailFileInputRef = useRef<HTMLInputElement>(null);
  const waFileInputRef = useRef<HTMLInputElement>(null);
  
  const [imageError, setImageError] = useState(false);

  // 1. ESTADO MAESTRO
  const [template, setTemplate] = useState({
    id: undefined as number | undefined,
    name: 'Template Inicio',
    lead_source_id: sourceData.INICIO, 
    active: true,
  });

  // 2. ESTADO WHATSAPP
  const [whatsapp, setWhatsapp] = useState({
    id: undefined as number | undefined,
    channel: 'whatsapp' as const,
    content: `👋 ¡Bienvenido(a) a *Yuntas Publicidad*!

Hola, *{{nombre}}*, gracias por visitarnos y mostrar interés en nuestros servicios.

🎯 *Somos tu aliado en publicidad*
Nos especializamos en soluciones publicitarias personalizadas que ayudan a destacar tu marca.

📌 *Podemos apoyarte con:*
• Productos publicitarios personalizados
• Cotizaciones sin compromiso

En breve te enviamos información detallada 📩
Estamos aquí para resolver todas tus dudas. ¡No dudes en escribirnos! 😊

✨ *Yuntas Publicidad*`,
    imageUrl: '',
    imageFile: null as File | null,
    variables: ['nombre'],
    active: true,
  });

  // 3. ESTADO EMAIL
  const [email, setEmail] = useState({
    id: undefined as number | undefined,
    channel: 'email' as const,
    subject: '¡Bienvenido(a) a Yuntas Publicidad! ✨',
    content: `Hola {{nombre}},

¡Bienvenido(a) a Yuntas Publicidad! Gracias por visitarnos y mostrar interés en nuestros servicios.

🎯 Somos tu aliado en publicidad
Nos especializamos en soluciones publicitarias personalizadas que ayudan a destacar tu marca.

📌 Podemos apoyarte con:
• Productos publicitarios personalizados
• Cotizaciones sin compromiso

En breve te enviamos información detallada 📩
Estamos aquí para resolver todas tus dudas. ¡No dudes en responder a este correo! 😊

✨ Yuntas Publicidad`,
    imageUrl: '', 
    imageFile: null as File | null, 
    variables: ['nombre'],
    active: true,
  });

  // Cargar datos iniciales si existen
  useEffect(() => {
    if (initialData) {
      setTemplate({
        id: initialData.id,
        name: initialData.name,
        lead_source_id: initialData.lead_source_id || sourceData.INICIO,
        active: initialData.active,
      });

      const waContent = initialData.contents.find(c => c.channel === 'whatsapp');
      if (waContent) {
        setWhatsapp({
          id: waContent.id,
          channel: 'whatsapp',
          content: waContent.content,
          variables: waContent.variables || ['nombre'],
          active: waContent.active,
          imageUrl: waContent.image_url ? `${process.env.NEXT_PUBLIC_URL || "http://localhost:8000"}${waContent.image_url.startsWith('/') ? '' : '/'}${waContent.image_url}` : '',
          imageFile: null,
        });
      }

      const emContent = initialData.contents.find(c => c.channel === 'email');
      if (emContent) {
        setEmail({
          id: emContent.id,
          channel: 'email',
          subject: emContent.subject || '',
          content: emContent.content,
          imageUrl: emContent.image_url ? `${process.env.NEXT_PUBLIC_URL || "http://localhost:8000"}${emContent.image_url.startsWith('/') ? '' : '/'}${emContent.image_url}` : '',
          imageFile: null,
          variables: emContent.variables || ['nombre'],
          active: emContent.active,
        });
      }
    }
  }, [initialData]);

  const handleEmailImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEmail({ ...email, imageFile: file, imageUrl: URL.createObjectURL(file) });
      setImageError(false);
    }
  };

  const handleWhatsappImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setWhatsapp({ ...whatsapp, imageFile: file, imageUrl: URL.createObjectURL(file) });
    }
  };

  const clearWhatsappImage = () => {
    setWhatsapp({ ...whatsapp, imageFile: null, imageUrl: '' });
    if (waFileInputRef.current) waFileInputRef.current.value = '';
  };

  const clearEmailImage = () => {
    setEmail({ ...email, imageFile: null, imageUrl: '' });
    if (emailFileInputRef.current) emailFileInputRef.current.value = '';
  };

  const handleSave = async () => {
    if (!template.name.trim()) {
      showToast.warning("El nombre de la plantilla es obligatorio.");
      return;
    }

    const contents: TemplateContent[] = [];

    if (whatsapp.content.trim()) {
      contents.push({
        id: whatsapp.id,
        channel: whatsapp.channel,
        content: whatsapp.content,
        variables: whatsapp.variables,
        active: whatsapp.active,
        image: whatsapp.imageFile
      });
    }

    if (email.content.trim()) {
      contents.push({
        id: email.id,
        channel: email.channel,
        subject: email.subject,
        content: email.content,
        variables: email.variables,
        active: email.active,
        image: email.imageFile 
      });
    }

    if (contents.length === 0) {
      showToast.warning("Debes configurar al menos un mensaje (WhatsApp o Email).");
      return;
    }

    const payload: Template = {
      id: template.id,
      lead_source_id: template.lead_source_id,
      name: template.name,
      active: template.active,
      contents: contents
    };

    await onSubmit(payload);
  };

  return (
    <div className="flex flex-col gap-10 mt-4 animate-fade-in relative pb-24">
      
      {/* --- CABECERA MAESTRA CON SELECTOR --- */}
      <div className="bg-white dark:bg-[#141A3F] p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="w-full md:w-1/3 flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-500 uppercase">Origen del Lead (Página)</label>
          <select 
            value={template.lead_source_id}
            onChange={(e) => setTemplate({ ...template, lead_source_id: Number(e.target.value) })}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent dark:text-white outline-none focus:border-[#203565]"
          >
            <option value={sourceData.INICIO}>Inicio</option>
            <option value={sourceData.PRODUCTOS}>Productos</option>
            <option value={sourceData.PRODUCTO_DETALLE}>Producto Detalle</option>
            <option value={sourceData.ADMINISTRACION}>Administración</option>
          </select>
        </div>

        <div className="w-full md:w-1/3 flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-500 uppercase">Nombre Interno de Plantilla</label>
          <input 
            type="text" 
            value={template.name} 
            onChange={(e) => setTemplate({ ...template, name: e.target.value })}
            className="w-full font-bold text-lg bg-transparent border-b border-gray-300 focus:border-[#203565] outline-none pb-1 dark:text-white"
            placeholder="Ej: Template Inicio"
          />
        </div>

        <div className="w-full md:w-1/3 flex items-center justify-end gap-3">
           <span className="text-sm font-semibold dark:text-gray-300">Template Activo:</span>
           <button
              type="button"
              onClick={() => setTemplate({ ...template, active: !template.active })}
              className={`${template.active ? 'bg-[#6DE1E3]' : 'bg-gray-300'} relative inline-flex h-7 w-12 rounded-full transition-colors`}
            >
              <span className={`${template.active ? 'translate-x-6' : 'translate-x-1'} inline-block h-5 w-5 transform rounded-full bg-white transition mt-1`} />
            </button>
        </div>
      </div>

      {/* --- GRID DE CONTENIDO (WhatsApp) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* FORMULARIO WHATSAPP */}
        <div className="bg-white dark:bg-[#141A3F] p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden h-full">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#00a884]"></div>
          <div className="flex justify-between items-center mb-4 border-b dark:border-gray-700 pb-3">
              <h3 className="font-extrabold text-lg text-[#00a884] flex items-center gap-2">📱 WhatsApp</h3>
              <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer bg-gray-50 dark:bg-gray-800 px-3 py-1 rounded-full">
                  Activar
                  <input type="checkbox" checked={whatsapp.active} onChange={(e) => setWhatsapp({...whatsapp, active: e.target.checked})} className="accent-[#00a884] w-4 h-4" />
              </label>
          </div>
          
          <div className={`transition-opacity ${!whatsapp.active ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Imagen Adjunta (Opcional)</label>
              <div className="flex items-center gap-3">
                <input type="file" accept="image/*" onChange={handleWhatsappImageChange} ref={waFileInputRef} className="hidden" />
                <button type="button" onClick={() => waFileInputRef.current?.click()} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm font-bold transition-colors">Subir Imagen</button>
                {(whatsapp.imageUrl || whatsapp.imageFile) && (
                    <button type="button" onClick={clearWhatsappImage} className="px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-md text-sm font-bold transition-colors">Quitar</button>
                )}
                <span className="text-xs text-gray-400 truncate max-w-[150px]">{whatsapp.imageFile ? whatsapp.imageFile.name : (whatsapp.imageUrl ? 'Imagen guardada' : 'Ninguna imagen')}</span>
              </div>
            </div>

            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cuerpo del mensaje</label>
            <textarea
              value={whatsapp.content}
              onChange={(e) => setWhatsapp({...whatsapp, content: e.target.value})}
              rows={12}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00a884] outline-none resize-none text-sm dark:bg-gray-800 dark:text-white"
            />
            <p className="text-xs text-gray-500 mt-2 bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
              Usa <code className="text-[#00a884] font-bold">{`{{nombre}}`}</code> para el nombre del cliente. Envuelve el texto en asteriscos para <strong>*negritas*</strong>.
            </p>
          </div>
        </div>

        {/* PREVIEW WHATSAPP */}
        <div className="flex justify-center w-full">
          <div className={`w-full max-w-[360px] h-[650px] rounded-[2rem] overflow-hidden shadow-2xl bg-[#efeae2] flex flex-col border-[6px] border-gray-800 transition-opacity ${!whatsapp.active ? 'opacity-40 grayscale-[50%]' : ''}`}>
            <div className="bg-[#075e54] flex items-center px-4 py-3 gap-3 shadow-md z-10 text-white">
              <FaArrowLeft className="text-white text-lg" />
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white text-lg overflow-hidden"><FaUser /></div>
              <div className="flex-1 flex flex-col">
                <span className="text-[1.1rem] font-semibold">Yuntas Publicidad</span>
                <span className="text-xs text-white/80">en línea</span>
              </div>
              <div className="flex items-center gap-4"><FaStore /><FaPhone /><FaEllipsisVertical /></div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-2" style={{ backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')", backgroundSize: 'cover' }}>
              <div className="self-center bg-[#faeab5] text-[#54656f] text-[0.72rem] px-3 py-2 rounded-lg text-center w-[90%] leading-relaxed shadow-sm mt-2">
                <FaLock className="inline-block text-[0.62rem] mr-1" /> Los mensajes y las llamadas estan cifrados de extremo a extremo.
              </div>

              <div className="self-start max-w-[85%] mt-4 relative">
                <div className="bg-white rounded-lg rounded-tl-none p-1 shadow-sm relative before:content-[''] before:absolute before:top-0 before:-left-2 before:border-t-[10px] before:border-t-white before:border-l-[10px] before:border-l-transparent">
                  {whatsapp.imageUrl && (
                    <div className="w-full rounded-md mb-2 overflow-hidden bg-[#edeae4]">
                      <img src={whatsapp.imageUrl} alt="Preview WA" className="w-full h-full object-cover max-h-40" />
                    </div>
                  )}
                  <div className="px-2 pb-1 pt-1 text-[0.95rem] text-[#111b21] leading-relaxed whitespace-pre-wrap">
                    {/*TEXTO LIMPIO SOLO CON NOMBRE */}
                    {renderWhatsappMessage(whatsapp.content, { nombre: 'Juan Pérez' })}
                    {!whatsapp.content.trim() && <p className="text-gray-400 italic text-sm">Sin mensaje configurado.</p>}
                  </div>
                  <div className="text-[0.65rem] text-[#667781] text-right mt-1 mr-2 mb-1">1:03 p.m.</div>
                </div>
              </div>
            </div>

            <div className="p-2 flex items-end gap-2 bg-[#f0f2f5]">
              <div className="flex-1 bg-white rounded-full flex items-center px-4 py-2.5 shadow-sm text-[#54656f]">
                <FaRegFaceSmile className="text-xl mr-3" />
                <span className="text-sm flex-1 text-gray-400">Escribe un mensaje</span>
                <FaPaperclip className="text-lg mr-4" />
                <FaCamera className="text-lg" />
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md bg-[#00a884]"><FaMicrophone className="text-xl" /></div>
            </div>
          </div>
        </div>

      </div>

      {/* --- GRID DE CONTENIDO (Email) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start border-t border-gray-200 dark:border-gray-800 pt-8">
        
        {/* FORMULARIO EMAIL */}
        <div className="bg-white dark:bg-[#141A3F] p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden h-full">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#203565]"></div>
          <div className="flex justify-between items-center mb-4 border-b dark:border-gray-700 pb-3">
              <h3 className="font-extrabold text-lg text-[#203565] dark:text-blue-400 flex items-center gap-2">✉️ Correo Electrónico</h3>
              <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer bg-gray-50 dark:bg-gray-800 px-3 py-1 rounded-full">
                  Activar
                  <input type="checkbox" checked={email.active} onChange={(e) => setEmail({...email, active: e.target.checked})} className="accent-[#203565] w-4 h-4" />
              </label>
          </div>
          
          <div className={`space-y-5 transition-opacity ${!email.active ? 'opacity-50 pointer-events-none' : ''}`}>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Asunto</label>
              <input type="text" value={email.subject} onChange={(e) => setEmail({...email, subject: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#203565] dark:bg-gray-800 dark:text-white" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Imagen de Cabecera</label>
              <div className="flex items-center gap-3">
                <input type="file" accept="image/*" onChange={handleEmailImageChange} ref={emailFileInputRef} className="hidden" />
                <button type="button" onClick={() => emailFileInputRef.current?.click()} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm font-bold transition-colors">Subir Imagen</button>
                {(email.imageUrl || email.imageFile) && (
                    <button type="button" onClick={clearEmailImage} className="px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-md text-sm font-bold transition-colors">Quitar</button>
                )}
                <span className="text-xs text-gray-400 truncate max-w-[150px]">{email.imageFile ? email.imageFile.name : (email.imageUrl ? 'Imagen guardada' : 'Ninguna imagen')}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cuerpo del correo</label>
              <textarea value={email.content} onChange={(e) => setEmail({...email, content: e.target.value})} rows={8} className="w-full p-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#203565] resize-none dark:bg-gray-800 dark:text-white" />
              <p className="text-xs text-gray-500 mt-2 bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                Usa <code className="text-[#203565] font-bold">{`{{nombre}}`}</code> para el nombre del cliente.
              </p>
            </div>
          </div>
        </div>

        {/* PREVIEW EMAIL */}
        <div className="flex justify-center w-full">
          <div className={`w-full max-w-[400px] border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white shadow-2xl flex flex-col h-[650px] transition-opacity ${!email.active ? 'opacity-40 grayscale-[50%]' : ''}`}>
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white truncate">{email.subject || 'Sin asunto'}</h3>
              <div className="flex items-center gap-3 mt-3">
                <div className="w-10 h-10 rounded-full bg-[#203565] flex items-center justify-center text-white font-bold text-lg">Y</div>
                <div>
                  <p className="text-sm font-bold text-gray-800 dark:text-gray-200 leading-tight">Yuntas Publicidad</p>
                  <p className="text-xs text-gray-500">para Juan Pérez</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white flex-grow font-sans text-gray-800 text-sm leading-relaxed overflow-y-auto">
              {email.imageUrl && !imageError ? (
                <div className="mb-6 w-full flex justify-center bg-gray-50 rounded-lg border border-gray-100 overflow-hidden relative shadow-sm">
                  <img src={email.imageUrl} alt="Banner Email" className="max-w-full h-auto max-h-48 object-cover" onError={() => setImageError(true)} />
                </div>
              ) : (
                <div className="mb-6 w-full h-32 bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 text-xs rounded-lg">
                  {email.imageUrl && imageError ? '[Error al cargar imagen]' : 'No se ha adjuntado imagen'}
                </div>
              )}
              <div className="space-y-4 text-[15px] whitespace-pre-wrap">
                {/*TEXTO LIMPIO SOLO CON NOMBRE */}
                {replaceDynamicTags(email.content, { nombre: 'Juan Pérez' })}
                {!email.content.trim() && <p className="text-gray-400 italic text-center mt-10">El cuerpo del correo está vacío.</p>}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* --- BOTONES DE ACCIÓN (Sticky Flotante) --- */}
      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-[#141A3F] border-t border-gray-200 dark:border-gray-800 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 flex justify-center">
         <div className="w-full max-w-4xl flex gap-4">
            <button type="button" onClick={onCancel} disabled={isSaving} className="w-1/3 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50">
              Cancelar
            </button>
            <button type="button" onClick={handleSave} disabled={isSaving} className="w-2/3 py-3 bg-[#203565] text-white font-bold rounded-lg hover:bg-[#1a2b52] transition-colors shadow-md disabled:opacity-50 flex justify-center items-center gap-2">
              {isSaving ? 'Guardando...' : '💾 Guardar Ambas Plantillas'}
            </button>
         </div>
      </div>

    </div>
  );
}