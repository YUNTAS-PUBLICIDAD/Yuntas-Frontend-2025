'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { showToast } from '@/utils/showToast';
import { Template, TemplateContent } from '@/types/admin/template';
import {
  FaArrowLeft, FaUser, FaStore, FaPhone, FaEllipsisVertical,
  FaLock, FaRegFaceSmile, FaPaperclip, FaCamera, FaMicrophone,
} from 'react-icons/fa6';
import { Plus, Save, Trash2, Upload, X, Loader2 } from 'lucide-react';
import 'react-quill/dist/quill.snow.css';

// ─── Dynamic Import ───────────────────────────────────────────────────────────
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

// ─── Constants ────────────────────────────────────────────────────────────────
export const LEAD_SOURCES = {
  INICIO: 1,
  PRODUCTOS: 2,
  PRODUCTO_DETALLE: 3,
  ADMINISTRACION: 4,
} as const;

const MAX_BUTTONS = 3;
const PREVIEW_VARIABLES = { nombre: 'Juan Pérez' };

const QUILL_MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    ['clean'],
  ],
};

// ─── Types ────────────────────────────────────────────────────────────────────
type ButtonItem = {
  id?: number;
  text: string;
  type: 'url';
  payload: { url: string };
  order: number;
  active: boolean;
};

type WhatsappState = {
  id?: number;
  channel: 'whatsapp';
  content: string;
  imageUrl: string;
  imageFile: File | null;
  variables: string[];
  active: boolean;
};

type EmailState = {
  id?: number;
  channel: 'email';
  subject: string;
  content: string;
  imageUrl: string;
  imageFile: File | null;
  variables: string[];
  active: boolean;
  buttons: ButtonItem[];
};

type TemplateState = {
  id?: number;
  name: string;
  lead_source_id: number;
  active: boolean;
};

interface TemplateConfigFormProps {
  initialData?: Template | null;
  onSubmit: (data: Template) => Promise<void>;
  onCancel?: () => void;
  isSaving?: boolean;
}

// ─── Default State Factories ──────────────────────────────────────────────────
const createDefaultTemplate = (): TemplateState => ({
  id: undefined,
  name: '',
  lead_source_id: LEAD_SOURCES.INICIO,
  active: true,
});

const createDefaultWhatsapp = (): WhatsappState => ({
  id: undefined,
  channel: 'whatsapp',
  content: '',
  imageUrl: '',
  imageFile: null,
  variables: ['nombre'],
  active: true,
});

const createDefaultEmail = (): EmailState => ({
  id: undefined,
  channel: 'email',
  subject: '',
  content: '',
  imageUrl: '',
  imageFile: null,
  variables: ['nombre'],
  active: true,
  buttons: [],
});

// ─── Preview Utilities ────────────────────────────────────────────────────────
const replaceDynamicTags = (text: string, variables: Record<string, string>): string => {
  if (!text) return '';
  return text.replace(/\{\{([^{}]+)\}\}/g, (_, rawKey: string) => {
    const key = rawKey.trim();
    return variables[key] ?? `{{${key}}}`;
  });
};

const renderBoldSegments = (line: string) =>
  line
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part, i) => {
      const isBold = part.startsWith('*') && part.endsWith('*') && part.length >= 2;
      return isBold
        ? <strong key={i}>{part.slice(1, -1)}</strong>
        : <span key={i}>{part}</span>;
    });

const renderWhatsappMessage = (message: string, variables: Record<string, string>) =>
  replaceDynamicTags(message, variables)
    .split('\n')
    .map((line, i) =>
      !line.trim()
        ? <span key={i} className="block">&nbsp;</span>
        : <span key={i} className="block">{renderBoldSegments(line)}</span>
    );

// ─── Reusable Sub-components ──────────────────────────────────────────────────

function SectionHeader({
  label,
  active,
  accentColor,
  onToggle,
}: {
  label: React.ReactNode;
  active: boolean;
  accentColor: string;
  onToggle: (val: boolean) => void;
}) {
  return (
    <div className="flex justify-between items-center mb-4 border-b dark:border-gray-700 pb-3">
      <h3 className="font-extrabold text-lg flex items-center gap-2" style={{ color: accentColor }}>
        {label}
      </h3>
      <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer bg-gray-50 dark:bg-gray-800 px-3 py-1 rounded-full select-none">
        Activar
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => onToggle(e.target.checked)}
          className="w-4 h-4"
          style={{ accentColor }}
        />
      </label>
    </div>
  );
}

function ImageUploader({
  imageUrl,
  imageFile,
  inputRef,
  onFileChange,
  onClear,
}: {
  imageUrl: string;
  imageFile: File | null;
  inputRef: React.RefObject<HTMLInputElement>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}) {
  const label = imageFile
    ? imageFile.name
    : imageUrl
    ? 'Imagen guardada'
    : 'Ninguna imagen';

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3 flex-wrap">
        <input
          type="file"
          accept="image/webp"
          onChange={onFileChange}
          ref={inputRef}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md text-sm font-bold transition-colors"
        >
          <Upload className="h-4 w-4" />
          Subir imagen
        </button>

        {(imageUrl || imageFile) && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-2 px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-md text-sm font-bold transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            Quitar
          </button>
        )}

        <span className="text-xs text-gray-400 truncate max-w-[150px]">{label}</span>
      </div>

      <p className="text-[11px] text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-md border border-gray-100 dark:border-gray-700">
        <span className="font-semibold text-gray-600 dark:text-gray-300">Recomendación:</span>{' '}
        usa imagen <strong>WEBP</strong>, cuadrada (1:1) o ligeramente horizontal.
        Tamaño ideal: <strong>≤ 1–2 MB</strong>. Evita banners verticales.
      </p>
    </div>
  );
}

function Toggle({ active, onChange }: { active: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={active}
      className={`${active ? 'bg-[#6DE1E3]' : 'bg-gray-300'} relative inline-flex h-7 w-12 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
    >
      <span
        className={`${active ? 'translate-x-6' : 'translate-x-1'} inline-block h-5 w-5 transform rounded-full bg-white transition mt-1 shadow-sm`}
      />
    </button>
  );
}

// ─── WhatsApp Preview ─────────────────────────────────────────────────────────
function WhatsappPreview({
  imageUrl,
  content,
  active,
}: {
  imageUrl: string;
  content: string;
  active: boolean;
}) {
  return (
    <div className="flex justify-center w-full">
      <div
        className={`w-full max-w-[360px] h-[650px] rounded-[2rem] overflow-hidden shadow-2xl bg-[#efeae2] flex flex-col border-[6px] border-gray-800 transition-all duration-300 ${
          !active ? 'opacity-40 grayscale' : ''
        }`}
      >
        {/* Header */}
        <div className="bg-[#075e54] flex items-center px-4 py-3 gap-3 shadow-md z-10 text-white">
          <FaArrowLeft className="text-lg" />
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg overflow-hidden">
            <FaUser />
          </div>
          <div className="flex-1 flex flex-col">
            <span className="text-[1.1rem] font-semibold">Yuntas Publicidad</span>
            <span className="text-xs text-white/80">en línea</span>
          </div>
          <div className="flex items-center gap-4">
            <FaStore />
            <FaPhone />
            <FaEllipsisVertical />
          </div>
        </div>

        {/* Messages */}
        <div
          className="flex-1 p-4 overflow-y-auto flex flex-col gap-2"
          style={{
            backgroundImage:
              "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
            backgroundSize: 'cover',
          }}
        >
          <div className="self-center bg-[#faeab5] text-[#54656f] text-[0.72rem] px-3 py-2 rounded-lg text-center w-[90%] leading-relaxed shadow-sm mt-2">
            <FaLock className="inline-block text-[0.62rem] mr-1" />
            Los mensajes y las llamadas están cifrados de extremo a extremo.
          </div>

          <div className="self-start max-w-[85%] mt-4">
            <div className="bg-white rounded-lg rounded-tl-none p-1 shadow-sm relative before:content-[''] before:absolute before:top-0 before:-left-2 before:border-t-[10px] before:border-t-white before:border-l-[10px] before:border-l-transparent">
              {imageUrl && (
                <div className="w-full rounded-md mb-2 overflow-hidden bg-[#edeae4]">
                  <img
                    src={imageUrl}
                    alt="Vista previa"
                    className="w-full object-cover max-h-40"
                  />
                </div>
              )}
              <div className="px-2 pb-1 pt-1 text-[0.95rem] text-[#111b21] leading-relaxed whitespace-pre-wrap">
                {content.trim()
                  ? renderWhatsappMessage(content, PREVIEW_VARIABLES)
                  : <p className="text-gray-400 italic text-sm">Sin mensaje configurado.</p>
                }
              </div>
              <div className="text-[0.65rem] text-[#667781] text-right mt-1 mr-2 mb-1">
                1:03 p.m.
              </div>
            </div>
          </div>
        </div>

        {/* Input bar */}
        <div className="p-2 flex items-end gap-2 bg-[#f0f2f5]">
          <div className="flex-1 bg-white rounded-full flex items-center px-4 py-2.5 shadow-sm text-[#54656f]">
            <FaRegFaceSmile className="text-xl mr-3" />
            <span className="text-sm flex-1 text-gray-400">Escribe un mensaje</span>
            <FaPaperclip className="text-lg mr-4" />
            <FaCamera className="text-lg" />
          </div>
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md bg-[#00a884]">
            <FaMicrophone className="text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Email Preview ────────────────────────────────────────────────────────────
function EmailPreview({ email }: { email: EmailState }) {
  return (
    <div className="flex justify-center w-full">
      <div className={`w-full max-w-[420px] bg-[#f4f6f9] p-4 rounded-xl transition-all duration-300 ${!email.active ? 'opacity-40 grayscale' : ''}`}>
        <div className="bg-white rounded-lg overflow-hidden shadow">
          <div className="bg-[#0b1c3f] text-center p-5">
            <h1 className="text-white font-bold text-lg">YUNTAS PUBLICIDAD</h1>
            <p className="text-[#8fd3ff] text-xs">Impulsamos tu negocio</p>
          </div>

          {email.imageUrl && (
            <img src={email.imageUrl} alt="Cabecera" className="w-full" />
          )}

          <div
            className="p-6 text-sm text-gray-700"
            dangerouslySetInnerHTML={{
              __html: replaceDynamicTags(email.content, PREVIEW_VARIABLES),
            }}
          />

          {email.buttons.filter((b) => b.active).length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center pb-6">
              {email.buttons
                .filter((b) => b.active)
                .map((b, i) => (
                  <a
                    key={i}
                    href="#"
                    className="bg-[#0b1c3f] text-white px-4 py-2 rounded text-sm"
                  >
                    {b.text}
                  </a>
                ))}
            </div>
          )}

          <div className="bg-[#0b1c3f] text-center p-4 text-xs text-white">
            © 2026 Yuntas Publicidad
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Button Editor ────────────────────────────────────────────────────────────
function ButtonEditor({
  buttons,
  onAdd,
  onUpdate,
  onRemove,
}: {
  buttons: ButtonItem[];
  onAdd: () => void;
  onUpdate: (index: number, field: string, value: unknown) => void;
  onRemove: (index: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Botones de acción (CTA)
        </label>
        <button
          type="button"
          onClick={onAdd}
          disabled={buttons.length >= MAX_BUTTONS}
          className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 text-white bg-[#203565] hover:bg-[#1a2b52] rounded-md transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-bold"
        >
          <Plus className="h-3.5 w-3.5" />
          Agregar botón
        </button>
      </div>

      <div className="space-y-3">
        {buttons.map((btn, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 space-y-2"
          >
            <input
              type="text"
              value={btn.text}
              onChange={(e) => onUpdate(index, 'text', e.target.value)}
              placeholder="Texto del botón"
              className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-[#203565] outline-none"
            />
            <input
              type="url"
              value={btn.payload.url}
              onChange={(e) => onUpdate(index, 'url', e.target.value)}
              placeholder="https://..."
              className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-[#203565] outline-none"
            />
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={btn.active}
                  onChange={(e) => onUpdate(index, 'active', e.target.checked)}
                  className="accent-[#203565]"
                />
                Activo
              </label>
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="inline-flex items-center gap-1.5 text-red-500 hover:text-red-700 text-xs font-medium transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Eliminar
              </button>
            </div>
          </div>
        ))}

        {buttons.length === 0 && (
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center py-3 border border-dashed border-gray-200 dark:border-gray-700 rounded-md">
            Sin botones configurados. Máximo {MAX_BUTTONS}.
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TemplateConfigForm({
  initialData,
  onSubmit,
  onCancel,
  isSaving,
}: TemplateConfigFormProps) {
  const emailFileInputRef = useRef<HTMLInputElement>(null);
  const waFileInputRef = useRef<HTMLInputElement>(null);

  const [template, setTemplate] = useState<TemplateState>(createDefaultTemplate);
  const [whatsapp, setWhatsapp] = useState<WhatsappState>(createDefaultWhatsapp);
  const [email, setEmail] = useState<EmailState>(createDefaultEmail);

  // ── Load initial data ──
  useEffect(() => {
    if (!initialData) {
      setTemplate(createDefaultTemplate());
      setWhatsapp(createDefaultWhatsapp());
      setEmail(createDefaultEmail());
      return;
    }

    setTemplate({
      id: initialData.id,
      name: initialData.name,
      lead_source_id: initialData.lead_source_id || LEAD_SOURCES.INICIO,
      active: initialData.active,
    });

    const waContent = initialData.contents.find((c) => c.channel === 'whatsapp');
    setWhatsapp(
      waContent
        ? {
            id: waContent.id,
            channel: 'whatsapp',
            content: waContent.content,
            variables: waContent.variables || ['nombre'],
            active: waContent.active,
            imageUrl: waContent.image_url
              ? `${process.env.NEXT_PUBLIC_URL}${waContent.image_url}`
              : '',
            imageFile: null,
          }
        : createDefaultWhatsapp()
    );

    const emContent = initialData.contents.find((c) => c.channel === 'email');
    setEmail(
      emContent
        ? {
            id: emContent.id,
            channel: 'email',
            subject: emContent.subject || '',
            content: emContent.content,
            imageUrl: emContent.image_url
              ? `${process.env.NEXT_PUBLIC_URL}${emContent.image_url}`
              : '',
            imageFile: null,
            variables: emContent.variables || ['nombre'],
            active: emContent.active,
            buttons: (emContent.buttons || []).map((btn, index) => ({
              id: btn.id,
              text: btn.text,
              type: 'url',
              payload: { url: btn.payload?.url || '' },
              order: btn.order ?? index, // ← AQUÍ ESTÁ LA CLAVE
              active: btn.active ?? true,
            }))
          }
        : createDefaultEmail()
    );
  }, [initialData]);

  // ── Image handlers ──
  const validateAndSetImage = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      onValid: (file: File, url: string) => void
    ) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (file.type !== 'image/webp') {
        showToast.error('Solo se permiten imágenes WEBP');
        e.target.value = '';
        return;
      }
      onValid(file, URL.createObjectURL(file));
    },
    []
  );

  const handleWhatsappImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      validateAndSetImage(e, (file, url) =>
        setWhatsapp((prev) => ({ ...prev, imageFile: file, imageUrl: url }))
      ),
    [validateAndSetImage]
  );

  const handleEmailImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      validateAndSetImage(e, (file, url) =>
        setEmail((prev) => ({ ...prev, imageFile: file, imageUrl: url }))
      ),
    [validateAndSetImage]
  );

  const clearWhatsappImage = useCallback(() => {
    setWhatsapp((prev) => ({ ...prev, imageFile: null, imageUrl: '' }));
    if (waFileInputRef.current) waFileInputRef.current.value = '';
  }, []);

  const clearEmailImage = useCallback(() => {
    setEmail((prev) => ({ ...prev, imageFile: null, imageUrl: '' }));
    if (emailFileInputRef.current) emailFileInputRef.current.value = '';
  }, []);

  // ── Button handlers ──
  const addEmailButton = useCallback(() => {
    if (email.buttons.length >= MAX_BUTTONS) {
      showToast.warning(`Máximo ${MAX_BUTTONS} botones permitidos`);
      return;
    }
    setEmail((prev) => ({
      ...prev,
      buttons: [
        ...prev.buttons,
        { text: 'Nuevo botón', type: 'url', payload: { url: '' }, order: prev.buttons.length, active: true },
      ],
    }));
  }, [email.buttons.length]);

  const updateEmailButton = useCallback((index: number, field: string, value: unknown) => {
    setEmail((prev) => {
      const updated = [...prev.buttons];
      if (field === 'url') {
        updated[index] = { ...updated[index], payload: { url: value as string } };
      } else {
        updated[index] = { ...updated[index], [field]: value };
      }
      return { ...prev, buttons: updated };
    });
  }, []);

  const removeEmailButton = useCallback((index: number) => {
    setEmail((prev) => ({
      ...prev,
      buttons: prev.buttons.filter((_, i) => i !== index),
    }));
  }, []);

  // ── Submit ──
  const handleSave = useCallback(async () => {
    if (!template.name.trim()) {
      showToast.warning('El nombre de la plantilla es obligatorio.');
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
        image: whatsapp.imageFile,
      });
    }

    const emailIsEmpty =
      !email.content.trim() || email.content === '<p><br></p>';
    if (!emailIsEmpty) {
      contents.push({
        id: email.id,
        channel: email.channel,
        subject: email.subject,
        content: email.content,
        variables: email.variables,
        active: email.active,
        image: email.imageFile,
        buttons: email.buttons,
      });
    }

    if (contents.length === 0) {
      showToast.warning('Debes configurar al menos un mensaje (WhatsApp o Email).');
      return;
    }

    const payload: Template = {
      id: template.id,
      lead_source_id: template.lead_source_id,
      name: template.name,
      active: template.active,
      contents,
    };

    try {
      await onSubmit(payload);
      showToast.success(
        template.id ? 'Plantilla actualizada correctamente.' : 'Plantilla creada correctamente.'
      );
    } catch (error) {
      console.error('[TemplateConfigForm] Error al guardar:', error);
      showToast.error('Error al guardar la plantilla. Inténtalo de nuevo.');
    }
  }, [template, whatsapp, email, onSubmit]);

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-10 mt-4 animate-fade-in relative pb-28">

      {/* ── Master Header ── */}
      <div className="bg-white dark:bg-[#141A3F] p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="w-full md:w-1/2 flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Nombre interno de la plantilla
          </label>
          <input
            type="text"
            value={template.name}
            onChange={(e) => setTemplate((prev) => ({ ...prev, name: e.target.value }))}
            className="w-full font-bold text-lg bg-transparent border-b border-gray-300 focus:border-[#203565] outline-none pb-1 dark:text-white transition-colors"
            placeholder="Ej: Plantilla de Bienvenida"
          />
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-end gap-3">
          <span className="text-sm font-semibold dark:text-gray-300">Plantilla activa:</span>
          <Toggle
            active={template.active}
            onChange={() => setTemplate((prev) => ({ ...prev, active: !prev.active }))}
          />
        </div>
      </div>

      {/* ── WhatsApp Section ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="bg-white dark:bg-[#141A3F] p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#00a884]" />
          <SectionHeader
            label="📱 WhatsApp"
            active={whatsapp.active}
            accentColor="#00a884"
            onToggle={(val) => setWhatsapp((prev) => ({ ...prev, active: val }))}
          />

          <div className={`space-y-4 transition-opacity duration-200 ${!whatsapp.active ? 'opacity-50 pointer-events-none' : ''}`}>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Imagen adjunta <span className="text-gray-400 font-normal">(opcional)</span>
              </label>
              <ImageUploader
                imageUrl={whatsapp.imageUrl}
                imageFile={whatsapp.imageFile}
                inputRef={waFileInputRef}
                onFileChange={handleWhatsappImageChange}
                onClear={clearWhatsappImage}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cuerpo del mensaje
              </label>
              <textarea
                value={whatsapp.content}
                onChange={(e) => setWhatsapp((prev) => ({ ...prev, content: e.target.value }))}
                rows={12}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00a884] outline-none resize-none text-sm dark:bg-gray-800 dark:text-white transition-shadow"
              />
              <p className="text-xs text-gray-500 mt-2 bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                Usa <code className="text-[#00a884] font-bold">{`{{nombre}}`}</code> para el nombre del cliente.
                Envuelve texto en asteriscos para <strong>*negritas*</strong>.
              </p>
            </div>
          </div>
        </div>

        <WhatsappPreview
          imageUrl={whatsapp.imageUrl}
          content={whatsapp.content}
          active={whatsapp.active}
        />
      </div>

      {/* ── Email Section ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start border-t border-gray-200 dark:border-gray-800 pt-8">
        <div className="bg-white dark:bg-[#141A3F] p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#203565]" />
          <SectionHeader
            label="✉️ Correo electrónico"
            active={email.active}
            accentColor="#203565"
            onToggle={(val) => setEmail((prev) => ({ ...prev, active: val }))}
          />

          <div className={`space-y-5 transition-opacity duration-200 ${!email.active ? 'opacity-50 pointer-events-none' : ''}`}>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Asunto
              </label>
              <input
                type="text"
                value={email.subject}
                onChange={(e) => setEmail((prev) => ({ ...prev, subject: e.target.value }))}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#203565] dark:bg-gray-800 dark:text-white transition-shadow"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Imagen de cabecera
              </label>
              <ImageUploader
                imageUrl={email.imageUrl}
                imageFile={email.imageFile}
                inputRef={emailFileInputRef}
                onFileChange={handleEmailImageChange}
                onClear={clearEmailImage}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cuerpo del correo
              </label>
              <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                <ReactQuill
                  theme="snow"
                  value={email.content}
                  onChange={(content) => setEmail((prev) => ({ ...prev, content }))}
                  modules={QUILL_MODULES}
                  className="h-48 pb-10 text-black dark:text-white"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2 bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                Usa <code className="text-[#203565] font-bold">{`{{nombre}}`}</code> para el nombre del cliente.
              </p>
            </div>

            <ButtonEditor
              buttons={email.buttons}
              onAdd={addEmailButton}
              onUpdate={updateEmailButton}
              onRemove={removeEmailButton}
            />
          </div>
        </div>

        <EmailPreview email={email} />
      </div>

      {/* ── Sticky Action Bar ── */}
      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-[#141A3F] border-t border-gray-200 dark:border-gray-800 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-50 flex justify-center">
        <div className="w-full max-w-4xl flex gap-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSaving}
            className="inline-flex items-center justify-center gap-2 w-1/3 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
          >
            <X className="h-4 w-4" />
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center justify-center gap-2 w-2/3 py-3 bg-[#203565] hover:bg-[#1a2b52] text-white font-bold rounded-lg transition-colors shadow-md disabled:opacity-60"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Guardando…
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Guardar plantilla
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
