'use client';

import React, { useState, useRef, useEffect } from 'react';
import { showToast } from '@/utils/showToast';
import { Template, TemplateContent } from '@/types/admin/template';
import {
  FaArrowLeft,
  FaUser,
  FaStore,
  FaPhone,
  FaEllipsisVertical,
  FaLock,
  FaRegFaceSmile,
  FaPaperclip,
  FaCamera,
  FaMicrophone,
} from 'react-icons/fa6';

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'email'>('whatsapp');
  const [imageError, setImageError] = useState(false);

  // 1. ESTADO MAESTRO
  const [template, setTemplate] = useState({
    id: undefined as number | undefined,
    name: 'Template Inicio',
    lead_source_id: 1, // Por ahora quemado en 1
    active: true,
  });

  // 2. ESTADO WHATSAPP
  const [whatsapp, setWhatsapp] = useState({
    id: undefined as number | undefined,
    channel: 'whatsapp' as const,
    content: '👋 ¡Bienvenido(a) a *Yuntas Publicidad*!\n\nHola *{{nombre}}*, gracias por escribirnos.',
    variables: ['nombre'],
    active: true,
  });

  // 3. ESTADO EMAIL
  const [email, setEmail] = useState({
    id: undefined as number | undefined,
    channel: 'email' as const,
    subject: 'Bienvenido(a) a Yuntas Publicidad ✨',
    content: 'Gracias por contactarnos.\n\nEn Yuntas Publicidad te ayudamos a destacar con productos publicitarios personalizados.',
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
        lead_source_id: initialData.lead_source_id,
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

  const clearEmailImage = () => {
    setEmail({ ...email, imageFile: null, imageUrl: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSave = async () => {
    if (!template.name.trim()) {
      showToast.warning("El nombre de la plantilla es obligatorio.");
      return;
    }

    const contents: TemplateContent[] = [];

    // Validar y agregar WhatsApp si tiene contenido
    if (whatsapp.content.trim()) {
      contents.push({
        id: whatsapp.id,
        channel: whatsapp.channel,
        content: whatsapp.content,
        variables: whatsapp.variables,
        active: whatsapp.active,
      });
    }

    // Validar y agregar Email si tiene contenido
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
    <div className="flex flex-col gap-6 mt-4">
      
      {/* CABECERA MAESTRA */}
      <div className="bg-white dark:bg-[#141A3F] p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="w-full md:w-1/2 flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-500 uppercase">Nombre de la Plantilla</label>
          <input 
            type="text" 
            value={template.name} 
            onChange={(e) => setTemplate({ ...template, name: e.target.value })}
            className="w-full font-bold text-lg bg-transparent border-b border-gray-300 focus:border-[#203565] outline-none pb-1 dark:text-white"
            placeholder="Ej: Plantilla Inicio"
          />
        </div>
        <div className="flex items-center gap-2">
           <span className="text-sm font-semibold dark:text-gray-300">Template Global Activo:</span>
           <button
              type="button"
              onClick={() => setTemplate({ ...template, active: !template.active })}
              className={`${template.active ? 'bg-[#6DE1E3]' : 'bg-gray-300'} relative inline-flex h-6 w-11 rounded-full transition-colors`}
            >
              <span className={`${template.active ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition mt-1`} />
            </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* COLUMNA IZQUIERDA: FORMULARIOS */}
        <div className="w-full md:w-1/2 space-y-4">
          
          {/* TABS */}
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <button 
              onClick={() => setActiveTab('whatsapp')}
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${activeTab === 'whatsapp' ? 'bg-white shadow text-[#00a884]' : 'text-gray-500 hover:text-gray-700'}`}
            >
              📱 WhatsApp
            </button>
            <button 
              onClick={() => setActiveTab('email')}
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${activeTab === 'email' ? 'bg-white shadow text-[#203565]' : 'text-gray-500 hover:text-gray-700'}`}
            >
              ✉️ Email
            </button>
          </div>

          {/* FORMULARIO WHATSAPP */}
          {activeTab === 'whatsapp' && (
             <div className="space-y-4 bg-white dark:bg-[#141A3F] p-5 rounded-xl border border-gray-200 shadow-sm animate-fade-in">
                <div className="flex justify-between items-center mb-2 border-b dark:border-gray-700 pb-2">
                    <h3 className="font-bold text-[#00a884]">Mensaje de WhatsApp</h3>
                    <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                        Activar Canal
                        <input type="checkbox" checked={whatsapp.active} onChange={(e) => setWhatsapp({...whatsapp, active: e.target.checked})} className="accent-[#00a884] w-4 h-4" />
                    </label>
                </div>
                <div className={!whatsapp.active ? 'opacity-50 pointer-events-none' : ''}>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Cuerpo del mensaje</label>
                  <textarea
                    value={whatsapp.content}
                    onChange={(e) => setWhatsapp({...whatsapp, content: e.target.value})}
                    rows={8}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00a884] outline-none resize-none text-sm dark:bg-gray-800 dark:text-white"
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    Usa <code className="bg-gray-100 text-[#00a884] px-1 rounded font-bold">{`{{nombre}}`}</code> para el nombre del cliente.<br/>
                    Envuelve el texto en asteriscos para <strong>*negritas*</strong>.
                  </p>
                </div>
             </div>
          )}

          {/* FORMULARIO EMAIL */}
          {activeTab === 'email' && (
             <div className="space-y-4 bg-white dark:bg-[#141A3F] p-5 rounded-xl border border-gray-200 shadow-sm animate-fade-in">
                <div className="flex justify-between items-center mb-2 border-b dark:border-gray-700 pb-2">
                    <h3 className="font-bold text-[#203565]">Plantilla de Email</h3>
                    <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                        Activar Canal
                        <input type="checkbox" checked={email.active} onChange={(e) => setEmail({...email, active: e.target.checked})} className="accent-[#203565] w-4 h-4" />
                    </label>
                </div>
                
                <div className={`space-y-4 ${!email.active ? 'opacity-50 pointer-events-none' : ''}`}>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Asunto</label>
                    <input type="text" value={email.subject} onChange={(e) => setEmail({...email, subject: e.target.value})} className="w-full p-2 border border-gray-300 rounded-md text-sm outline-none focus:border-[#203565] dark:bg-gray-800 dark:text-white" />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Imagen de Cabecera</label>
                    <div className="flex items-center gap-2">
                      <input type="file" accept="image/*" onChange={handleEmailImageChange} ref={fileInputRef} className="hidden" />
                      <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-xs font-bold whitespace-nowrap">Subir Imagen</button>
                      {(email.imageUrl || email.imageFile) && (
                         <button onClick={clearEmailImage} className="px-3 py-2 bg-red-100 text-red-600 rounded-md text-xs font-bold">Quitar</button>
                      )}
                      <span className="text-xs text-gray-400 truncate">{email.imageFile ? email.imageFile.name : (email.imageUrl ? 'Imagen guardada' : 'Ninguna imagen')}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Cuerpo del correo</label>
                    <textarea value={email.content} onChange={(e) => setEmail({...email, content: e.target.value})} rows={6} className="w-full p-3 border border-gray-300 rounded-md text-sm outline-none focus:border-[#203565] resize-none dark:bg-gray-800 dark:text-white" />
                    <p className="text-xs text-gray-400 mt-1">Usa <code className="bg-gray-100 text-[#203565] px-1 rounded font-bold">{`{{nombre}}`}</code> para el nombre del cliente.</p>
                  </div>
                </div>
             </div>
          )}

          <div className="flex gap-3 pt-2">
            <button onClick={onCancel} disabled={isSaving} className="w-full md:w-auto px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50">
              Cancelar
            </button>
            <button onClick={handleSave} disabled={isSaving} className="flex-1 py-3 bg-[#203565] text-white font-bold rounded-md hover:bg-[#1a2b52] transition-colors shadow-md disabled:opacity-50">
              {isSaving ? 'Guardando...' : (initialData ? 'Actualizar Plantillas' : 'Guardar Plantillas')}
            </button>
          </div>
        </div>

        {/* COLUMNA DERECHA: VISTAS PREVIAS */}
        <div className="w-full md:w-1/2 flex items-start justify-center pt-2">
            
            {activeTab === 'whatsapp' ? (
                /* --- PREVIEW WHATSAPP --- */
                <div className={`mx-auto w-full max-w-[360px] h-[650px] rounded-[20px] overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.2)] bg-[#efeae2] flex flex-col border border-gray-200 transition-opacity ${!whatsapp.active ? 'opacity-40 grayscale-[50%]' : ''}`}>
                  <div className="bg-white flex items-center px-4 py-2 gap-3 shadow-sm z-10">
                    <FaArrowLeft className="text-[#54656f] text-base" />
                    <div className="w-10 h-10 rounded-full bg-[#dfe5e7] flex items-center justify-center text-white text-lg overflow-hidden"><FaUser /></div>
                    <div className="flex-1 flex flex-col">
                      <span className="text-[1.05rem] font-medium text-[#111b21]">Yuntas Publicidad</span>
                      <span className="text-xs text-[#667781]">en línea</span>
                    </div>
                    <div className="flex items-center gap-4 text-[#54656f]"><FaStore className="text-sm" /><FaPhone className="text-sm" /><FaEllipsisVertical className="text-sm" /></div>
                  </div>

                  <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-2" style={{ backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')", backgroundSize: 'cover' }}>
                    <div className="self-center bg-white text-[#667781] text-[0.7rem] px-3 py-1 rounded-[10px] shadow-sm">Hoy</div>
                    <div className="self-center bg-[#faeab5] text-[#54656f] text-[0.72rem] px-3 py-2 rounded-lg text-center w-[90%] leading-relaxed shadow-sm">
                      <FaLock className="inline-block text-[0.62rem] mr-1" /> Los mensajes y las llamadas estan cifrados de extremo a extremo.
                    </div>

                    <div className="self-start max-w-[85%] mt-2 relative">
                      <div className="bg-white rounded-lg rounded-tl-none p-1 shadow-sm relative before:content-[''] before:absolute before:top-0 before:-left-2 before:border-t-[10px] before:border-t-white before:border-l-[10px] before:border-l-transparent">
                        <div className="px-2 pb-1 pt-1 text-[0.92rem] text-[#111b21] leading-relaxed">
                          {renderWhatsappMessage(whatsapp.content, { nombre: 'Juan Pérez' })}
                          {!whatsapp.content.trim() && <p className="text-gray-400 italic">Sin mensaje configurado.</p>}
                        </div>
                        <div className="text-[0.62rem] text-[#667781] text-right mt-1 mr-2 mb-1">1:03 p.m.</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-2 flex items-end gap-2 bg-transparent border-t border-black/5">
                    <div className="flex-1 bg-white rounded-full flex items-center px-4 py-2 min-h-12 shadow-sm">
                      <FaRegFaceSmile className="text-[#8696a0] text-xl" />
                      <div className="w-[2px] h-5 bg-[#00a884] ml-2 animate-pulse" />
                      <input type="text" className="flex-1 bg-transparent border-none outline-none text-sm px-2 text-[#111b21]" placeholder="Mensaje" disabled />
                      <div className="flex items-center gap-3 text-[#8696a0] text-lg"><FaPaperclip /><FaCamera /></div>
                    </div>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow bg-[#00a884]"><FaMicrophone className="text-lg" /></div>
                  </div>
                </div>

            ) : (

                /* --- PREVIEW EMAIL --- */
                <div className={`w-full max-w-[400px] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white shadow-xl flex flex-col h-[650px] transition-opacity ${!email.active ? 'opacity-40 grayscale-[50%]' : ''}`}>
                  <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-white truncate">{email.subject || 'Sin asunto'}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-8 h-8 rounded-full bg-[#203565] flex items-center justify-center text-white font-bold text-sm">Y</div>
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-tight">Yuntas Publicidad</p>
                        <p className="text-xs text-gray-500">para Juan Pérez</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-white flex-grow font-sans text-gray-800 text-sm leading-relaxed overflow-y-auto">
                    {email.imageUrl && !imageError ? (
                      <div className="mb-6 w-full flex justify-center bg-gray-50 rounded border border-gray-100 overflow-hidden relative">
                        <img src={email.imageUrl} alt="Banner Email" className="max-w-full h-auto max-h-48 object-cover" onError={() => setImageError(true)} />
                      </div>
                    ) : (
                      <div className="mb-6 w-full h-32 bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs rounded">
                        {email.imageUrl && imageError ? '[Error al cargar imagen]' : '[Sin imagen de cabecera]'}
                      </div>
                    )}
                    <div className="space-y-4 text-[15px] whitespace-pre-wrap">
                      {replaceDynamicTags(email.content, { nombre: 'Juan Pérez' })}
                      {!email.content.trim() && <p className="text-gray-400 italic">Sin contenido configurado.</p>}
                    </div>
                  </div>
                </div>

            )}
        </div>
      </div>
    </div>
  );
}